-- ==============================================================================
-- BASE DE DATOS PINPAY - SUPABASE SQL SCHEMA COMPLETO
-- Este script inicializa toda la base de datos de PinPay con las funciones
-- y métricas necesarias para la aplicación, sin requerir RLS (Row Level Security)
-- y permitiendo registros sin confirmación por correo electrónico.
-- ==============================================================================

-- ==========================================
-- 1. CONFIGURACIÓN INICIAL Y EXTENSIONES
-- ==========================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- 2. TABLAS PRINCIPALES
-- ==========================================

-- Tabla de Usuarios (Sincronizada con auth.users de Supabase)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    kyc_level INTEGER DEFAULT 0, -- 0: Básico, 1: Verificado
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Tabla de Operadores ATM (P2P)
CREATE TABLE IF NOT EXISTS public.atm_operators (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    country_code TEXT NOT NULL,
    available_liquidity_usd DECIMAL(12,2) DEFAULT 0.00,
    reputation_score INTEGER DEFAULT 1000 CHECK (reputation_score BETWEEN 0 AND 1000),
    efficiency_score DECIMAL(5,2) DEFAULT 100.00,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Tabla de Transacciones (Remesas)
CREATE TABLE IF NOT EXISTS public.transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tracking_code TEXT UNIQUE NOT NULL,
    sender_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    atm_operator_id UUID REFERENCES public.atm_operators(id) ON DELETE SET NULL,
    amount_usd DECIMAL(12,2) NOT NULL,
    fee_usd DECIMAL(12,2) NOT NULL,
    destination_currency TEXT NOT NULL,
    amount_received DECIMAL(12,2) NOT NULL,
    recipient_name TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'in_transit', 'delivered', 'disputed', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Tabla de Disputas
CREATE TABLE IF NOT EXISTS public.disputes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    transaction_id UUID REFERENCES public.transactions(id) ON DELETE CASCADE,
    raised_by_user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    reason TEXT NOT NULL,
    status TEXT DEFAULT 'open' CHECK (status IN ('open', 'resolved', 'closed')),
    resolution_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- ==========================================
-- 3. FUNCIONES DE AUTOMATIZACIÓN (TRIGGERS)
-- ==========================================

-- A) Trigger para crear perfil de usuario al registrarse en Auth
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, role)
    VALUES (
        new.id, 
        new.email, 
        new.raw_user_meta_data->>'full_name',
        -- Asigna rol de admin si el email contiene "admin"
        CASE WHEN new.email ILIKE '%admin%' THEN 'admin' ELSE 'user' END
    );
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enlazar Trigger al registro de Auth
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- B) Actualizar fecha de actualización (updated_at)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = now(); 
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_transactions_updated_at BEFORE UPDATE ON public.transactions FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- ==========================================
-- 4. VISTAS PARA EL PANEL ADMIN (DASHBOARD)
-- ==========================================

-- Vista: Métricas Globales (Admin)
CREATE OR REPLACE VIEW public.admin_metrics AS
SELECT 
    (SELECT count(*) FROM public.profiles WHERE role = 'user') as total_users,
    (SELECT count(*) FROM public.atm_operators) as total_atms,
    (SELECT count(*) FROM public.transactions WHERE status = 'delivered') as total_successful_transactions,
    (SELECT coalesce(sum(amount_usd), 0) FROM public.transactions WHERE status = 'delivered') as total_volume_usd,
    (SELECT coalesce(sum(fee_usd), 0) FROM public.transactions WHERE status = 'delivered') as total_revenue_usd,
    (SELECT count(*) FROM public.disputes WHERE status = 'open') as open_disputes;

-- Vista: Rendimiento por Operador ATM
CREATE OR REPLACE VIEW public.atm_performance AS
SELECT 
    a.id as operator_id,
    p.full_name,
    a.country_code,
    a.reputation_score,
    count(t.id) as total_assigned_transactions,
    sum(CASE WHEN t.status = 'delivered' THEN 1 ELSE 0 END) as successful_transactions,
    coalesce(sum(t.amount_usd), 0) as total_volume_handled
FROM public.atm_operators a
JOIN public.profiles p ON a.profile_id = p.id
LEFT JOIN public.transactions t ON t.atm_operator_id = a.id
GROUP BY a.id, p.full_name, a.country_code, a.reputation_score;

-- ==========================================
-- 5. FUNCIONES PARA LA APLICACIÓN (API PLPGSQL)
-- ==========================================

-- Función: Algoritmo de Matching Engine (Simulado en SQL para selección de ATM)
CREATE OR REPLACE FUNCTION get_best_atm_match(target_country TEXT, tx_amount_usd DECIMAL)
RETURNS TABLE (
    operator_id UUID,
    trust_score DECIMAL,
    liquidity DECIMAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        a.id,
        -- Fórmula de Matching PinPay (Trust Score Calculado)
        (0.40 * (a.reputation_score / 10.0) + 0.30 * a.efficiency_score + 0.30 * 100.0) as match_score,
        a.available_liquidity_usd
    FROM public.atm_operators a
    WHERE a.country_code = target_country 
      AND a.is_active = true
      AND a.available_liquidity_usd >= tx_amount_usd
    ORDER BY match_score DESC
    LIMIT 1;
END;
$$ LANGUAGE plpgsql;

-- ==========================================
-- 6. CONFIGURACIÓN DE SEGURIDAD Y PERMISOS
-- ==========================================
-- Deshabilitar RLS temporalmente por requerimientos
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.atm_operators DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.disputes DISABLE ROW LEVEL SECURITY;

-- Nota para Supabase Auth Settings:
-- Asegúrate de ir a Supabase Dashboard -> Authentication -> Providers -> Email
-- Y desactivar "Confirm email" para permitir registro directo sin verificación de correo.
