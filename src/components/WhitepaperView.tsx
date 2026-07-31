import React from 'react';
import { 
  Network, 
  ShieldCheck, 
  Cpu, 
  Fingerprint, 
  Globe, 
  Coins, 
  HeartHandshake, 
  Database,
  Lock,
  Zap,
  Activity,
  Users,
  BarChart,
  ArrowRight
} from 'lucide-react';

export const WhitepaperView: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen pb-24 text-slate-900 selection:bg-[#00aeef] selection:text-white">
      
      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#00aeef]/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full text-xs font-semibold text-[#00aeef] mb-6">
            <Globe className="w-4 h-4" />
            <span>Visión y Tecnología</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
            La evolución definitiva de los <span className="text-[#00aeef]">pagos internacionales</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
            Fusionando la descentralización blockchain con la accesibilidad financiera tradicional. Eliminamos intermediarios para reducir costos en un 60-80% y acelerar transacciones de días a minutos.
          </p>
          <div className="mt-8 text-sm font-semibold text-slate-400 uppercase tracking-widest">
            "Donde tu reputación es tu riqueza, y cada transacción construye confianza."
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 -mt-10 relative z-20">
        
        {/* 3 Pillars & Microservices */}
        <section className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 sm:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-900 mb-4">Arquitectura Core</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">El sistema se fundamenta en tres pilares interconectados operando sobre una red descentralizada de operadores ATM.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <div className="w-12 h-12 bg-[#00aeef]/10 rounded-xl flex items-center justify-center text-[#00aeef] mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Módulo de Remesas</h3>
              <p className="text-sm text-slate-600">Transferencias internacionales simples, rápidas y económicas para usuarios finales.</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <div className="w-12 h-12 bg-[#f43a8e]/10 rounded-xl flex items-center justify-center text-[#f43a8e] mb-4">
                <Network className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Marketplace P2P</h3>
              <p className="text-sm text-slate-600">Estilo "El Dorado Modernizado" para intercambio libre y transparente de divisas.</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-600 mb-4">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Checkout Comercial</h3>
              <p className="text-sm text-slate-600">Interfaces de pago y APIs integrables para transacciones empresariales e e-commerce.</p>
            </div>
          </div>

          <h3 className="text-lg font-bold mb-6 text-center">12 Microservicios Especializados</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              "Identity & KYC", "Matching Engine", "Payment Orchestrator", "P2P Marketplace",
              "Checkout Service", "AI Prediction", "Notification", "Reputation (Blockchain)",
              "Risk Management", "Compliance", "Geo Visualization", "Admin Core"
            ].map((service, idx) => (
              <div key={idx} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center text-xs font-bold text-slate-600">{idx + 1}</div>
                <span className="text-sm font-semibold text-slate-800">{service}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Matching Engine & Reputation */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00aeef]/10 rounded-full blur-3xl"></div>
            <h2 className="text-3xl font-black mb-6">Matching Engine Algorítmico</h2>
            <p className="text-slate-300 mb-8 text-sm leading-relaxed">
              Nuestro algoritmo inteligente conecta usuarios con operadores ATM evaluando variables multidimensionales en tiempo real para garantizar la mejor ejecución.
            </p>
            
            <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 font-mono text-xs mb-8">
              <div className="text-slate-400 mb-2">// Fórmula de Puntuación (Matching Score)</div>
              <div className="text-[#00aeef]">Score =</div>
              <div className="pl-4 text-emerald-400">(0.20 × GeoScore) +</div>
              <div className="pl-4 text-emerald-400">(0.30 × ReputationScore) +</div>
              <div className="pl-4 text-emerald-400">(0.25 × EfficiencyScore) +</div>
              <div className="pl-4 text-emerald-400">(0.15 × EconomicScore) +</div>
              <div className="pl-4 text-emerald-400">(0.10 × PredictiveScore)</div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-[#00aeef]">Proceso en 4 Fases:</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-slate-300">
                <li>Filtrado inicial por geografía y capacidad.</li>
                <li>Scoring multidimensional y ranking.</li>
                <li>Selección con timeout de 30s (fallback automático).</li>
                <li>Ejecución física y monitoreo en vivo.</li>
              </ol>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xl">
            <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-600 mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-6">Sistema de Reputación</h2>
            <p className="text-slate-600 mb-8 text-sm leading-relaxed">
              Un Trust Score descentralizado (0-1000 puntos) que determina la confiabilidad de cada actor en el ecosistema.
            </p>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm font-bold mb-1">
                  <span>Historial Transaccional</span>
                  <span className="text-[#00aeef]">40%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2"><div className="bg-[#00aeef] h-2 rounded-full w-[40%]"></div></div>
                <p className="text-xs text-slate-500 mt-1">Volumen, éxito y disputas resueltas.</p>
              </div>
              <div>
                <div className="flex justify-between text-sm font-bold mb-1">
                  <span>Comportamiento Social</span>
                  <span className="text-indigo-500">25%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2"><div className="bg-indigo-500 h-2 rounded-full w-[25%]"></div></div>
                <p className="text-xs text-slate-500 mt-1">Referidos y participación en la comunidad.</p>
              </div>
              <div>
                <div className="flex justify-between text-sm font-bold mb-1">
                  <span>Verificación KYC</span>
                  <span className="text-emerald-500">20%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2"><div className="bg-emerald-500 h-2 rounded-full w-[20%]"></div></div>
                <p className="text-xs text-slate-500 mt-1">Consistencia de datos y validación de identidad.</p>
              </div>
              <div>
                <div className="flex justify-between text-sm font-bold mb-1">
                  <span>Actividad Constante</span>
                  <span className="text-amber-500">15%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2"><div className="bg-amber-500 h-2 rounded-full w-[15%]"></div></div>
                <p className="text-xs text-slate-500 mt-1">Engagement regular con la plataforma.</p>
              </div>
            </div>
          </div>
        </section>

        {/* P2P Flow */}
        <section className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 sm:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-900 mb-4">Flujo de Transacción P2P con ATM</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">El proceso de ejecución física y verificación descentralizada paso a paso.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <div className="w-8 h-8 bg-[#00aeef] text-white rounded-full flex items-center justify-center font-bold mb-4">1</div>
              <h4 className="font-bold text-sm mb-2">Creación de Solicitud</h4>
              <p className="text-xs text-slate-600">Usuario define monto, divisas y método de pago preferido.</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <div className="w-8 h-8 bg-[#00aeef] text-white rounded-full flex items-center justify-center font-bold mb-4">2</div>
              <h4 className="font-bold text-sm mb-2">Matching Inteligente</h4>
              <p className="text-xs text-slate-600">Algoritmo evalúa operadores ATM según proximidad, reputación, eficiencia, etc.</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <div className="w-8 h-8 bg-[#00aeef] text-white rounded-full flex items-center justify-center font-bold mb-4">3</div>
              <h4 className="font-bold text-sm mb-2">Asignación</h4>
              <p className="text-xs text-slate-600">Sistema asigna a mejor operador y notifica a ambas partes.</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <div className="w-8 h-8 bg-[#00aeef] text-white rounded-full flex items-center justify-center font-bold mb-4">4</div>
              <h4 className="font-bold text-sm mb-2">Ejecución Física</h4>
              <p className="text-xs text-slate-600">Operador ATM recibe fondos y entrega efectivo o documentación correspondiente.</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <div className="w-8 h-8 bg-[#00aeef] text-white rounded-full flex items-center justify-center font-bold mb-4">5</div>
              <h4 className="font-bold text-sm mb-2">Verificación y Liquidación</h4>
              <p className="text-xs text-slate-600">Ambas partes confirman, el sistema libera los fondos bloqueados (Escrow).</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <div className="w-8 h-8 bg-[#00aeef] text-white rounded-full flex items-center justify-center font-bold mb-4">6</div>
              <h4 className="font-bold text-sm mb-2">Actualización de Reputación</h4>
              <p className="text-xs text-slate-600">Sistema recalcula scores de confianza basado en la experiencia.</p>
            </div>
          </div>
        </section>

        {/* Security Architecture */}
        <section className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 sm:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-900 mb-4">Seguridad Multicapa y AML</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Diseñados bajo filosofía Zero-Trust con cumplimiento regulatorio automático integrado en el core.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <Fingerprint className="w-6 h-6 text-slate-700 mb-3" />
              <h4 className="font-bold text-sm mb-2">1. Dispositivo</h4>
              <ul className="text-xs text-slate-600 space-y-1">
                <li>• Encriptación AES-256</li>
                <li>• Biometría crítica</li>
                <li>• Anti-Jailbreak</li>
              </ul>
            </div>
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <Network className="w-6 h-6 text-slate-700 mb-3" />
              <h4 className="font-bold text-sm mb-2">2. Comunicación</h4>
              <ul className="text-xs text-slate-600 space-y-1">
                <li>• TLS 1.3 Forward Secrecy</li>
                <li>• Certificate Pinning</li>
                <li>• WebSocket seguro</li>
              </ul>
            </div>
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <Cpu className="w-6 h-6 text-slate-700 mb-3" />
              <h4 className="font-bold text-sm mb-2">3. Aplicación</h4>
              <ul className="text-xs text-slate-600 space-y-1">
                <li>• Rate Limiting</li>
                <li>• Validación estricta</li>
                <li>• Anti-inyecciones</li>
              </ul>
            </div>
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <Globe className="w-6 h-6 text-slate-700 mb-3" />
              <h4 className="font-bold text-sm mb-2">4. Infraestructura</h4>
              <ul className="text-xs text-slate-600 space-y-1">
                <li>• Zero-Trust</li>
                <li>• Micro-segmentación</li>
                <li>• WAF & DDoS Protect</li>
              </ul>
            </div>
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <Lock className="w-6 h-6 text-slate-700 mb-3" />
              <h4 className="font-bold text-sm mb-2">5. Datos</h4>
              <ul className="text-xs text-slate-600 space-y-1">
                <li>• Reposo y tránsito</li>
                <li>• Backups seguros</li>
                <li>• Purgado y anonimización</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Compliance and Admin */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 sm:p-12">
            <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-500" />
              Cumplimiento Automatizado
            </h2>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-slate-800 mb-2">Proceso KYC/AML</h4>
                <p className="text-xs text-slate-600 mb-2">Verificación escalonada, integración global, monitoreo continuo y generación automática de reportes (CTR, SAR).</p>
              </div>
              <div>
                <h4 className="font-bold text-slate-800 mb-2">Detección de Fraude (AI)</h4>
                <p className="text-xs text-slate-600 mb-2">Machine learning para patrones anómalos, análisis de grafos y alertas en tiempo real con XGBoost & Isolation Forest.</p>
              </div>
              <div>
                <h4 className="font-bold text-slate-800 mb-2">Sistema de Disputas</h4>
                <p className="text-xs text-slate-600 mb-2">Descentralizado con jurados aleatorios, staking económico y resolución promedio menor a 24 horas.</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-3xl shadow-xl p-8 sm:p-12 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-[#f43a8e]/10 rounded-full blur-3xl"></div>
             <h2 className="text-2xl font-black mb-6 flex items-center gap-3 relative z-10">
              <Activity className="w-6 h-6 text-[#f43a8e]" />
              Plataforma Administrativa
            </h2>
            <div className="space-y-6 relative z-10">
              <div>
                <h4 className="font-bold text-slate-200 mb-2">Dashboard Global (Mapa Interactivo)</h4>
                <p className="text-xs text-slate-400 mb-2">Visualización en vivo, heatmaps de liquidez, conexiones animadas y alertas geográficas para control total.</p>
              </div>
              <div>
                <h4 className="font-bold text-slate-200 mb-2">Módulos Administrativos Core</h4>
                <p className="text-xs text-slate-400 mb-2">Gestión de Usuarios, Monitoreo Transaccional, Red ATM, Riesgo, Finanzas y Cumplimiento Regulatorio integrados.</p>
              </div>
              <div>
                <h4 className="font-bold text-slate-200 mb-2">Reportes y Analytics Predictivo</h4>
                <p className="text-xs text-slate-400 mb-2">Exportaciones automáticas y pronósticos de demanda con modelos Time Series Forecasting (LSTM + Prophet).</p>
              </div>
            </div>
          </div>
        </section>

        {/* Incentives & Values */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-200">
            <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
              <Coins className="w-6 h-6 text-[#00aeef]" />
              Modelo Económico
            </h2>
            <div className="space-y-8">
              <div>
                <h4 className="font-bold text-slate-800 mb-3 border-b border-slate-100 pb-2">Para Usuarios Finales</h4>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2"><ArrowRight className="w-4 h-4 text-[#00aeef] shrink-0 mt-0.5" /> Puntos por transacción (1 pt / $100)</li>
                  <li className="flex items-start gap-2"><ArrowRight className="w-4 h-4 text-[#00aeef] shrink-0 mt-0.5" /> Niveles de lealtad con beneficios escalados</li>
                  <li className="flex items-start gap-2"><ArrowRight className="w-4 h-4 text-[#00aeef] shrink-0 mt-0.5" /> Staking con APY 5-25% anual</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-800 mb-3 border-b border-slate-100 pb-2">Para Operadores ATM</h4>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2"><ArrowRight className="w-4 h-4 text-[#00aeef] shrink-0 mt-0.5" /> Comisiones escalonadas por volumen procesado</li>
                  <li className="flex items-start gap-2"><ArrowRight className="w-4 h-4 text-[#00aeef] shrink-0 mt-0.5" /> Bonificaciones extra por mantener un rating impecable</li>
                  <li className="flex items-start gap-2"><ArrowRight className="w-4 h-4 text-[#00aeef] shrink-0 mt-0.5" /> Acceso prioritario a nuevas rutas y servicios</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-200">
            <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
              <HeartHandshake className="w-6 h-6 text-[#f43a8e]" />
              Valores y Filosofía
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-sm text-slate-800 mb-1">Confianza Descentralizada</h4>
                <p className="text-xs text-slate-500">Ganada, no asumida. Basada en acciones verificables por la comunidad.</p>
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-800 mb-1">Transparencia Radical</h4>
                <p className="text-xs text-slate-500">Todo es visible y auditable. Sin cajas negras operativas.</p>
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-800 mb-1">Inclusión Universal</h4>
                <p className="text-xs text-slate-500">Diseñado para bancarizados y poblaciones no bancarizadas por igual.</p>
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-800 mb-1">Comunidad como Dueño</h4>
                <p className="text-xs text-slate-500">Los usuarios participan activamente en la gobernanza y dirección.</p>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-sm font-bold text-slate-900 italic">
                "Descentralizado pero regulado por la comunidad. Rápido, económico, seguro, simple y transparente."
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
