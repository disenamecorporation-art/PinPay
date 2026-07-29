import React, { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'login' | 'register';
  onClose: () => void;
  onSuccessLogin?: (name: string, email: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, initialMode, onClose, onSuccessLogin }) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = name.trim() || (email ? email.split('@')[0] : 'Usuario PinPay');
    if (onSuccessLogin) {
      onSuccessLogin(finalName, email || 'usuario@pinpay.com');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-md p-6 sm:p-8 text-slate-900 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-700 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <img 
              src="https://i.postimg.cc/3w21V6cf/logoweb.png" 
              alt="PinPay" 
              className="h-9 w-auto object-contain"
            />
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            {mode === 'login' ? 'Inicia sesión en tu cuenta' : 'Crea tu cuenta gratis'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {mode === 'login' ? 'Gestiona tus remesas con seguridad' : 'Tu primer envío sin comisiones'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Nombre Completo</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Carlos Mendoza"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-sm text-slate-900 outline-none focus:border-[#00aeef]"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Correo Electrónico</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                placeholder="tu@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-sm text-slate-900 outline-none focus:border-[#00aeef]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-sm text-slate-900 outline-none focus:border-[#00aeef]"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#00aeef] hover:bg-[#0098d1] text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-[#00aeef]/25 transition-all text-sm flex items-center justify-center space-x-2 mt-2"
          >
            <span>{mode === 'login' ? 'Iniciar Sesión' : 'Registrarse Gratis'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-500">
          {mode === 'login' ? (
            <p>
              ¿No tienes cuenta?{' '}
              <button onClick={() => setMode('register')} className="text-[#00aeef] font-bold hover:underline">
                Regístrate aquí
              </button>
            </p>
          ) : (
            <p>
              ¿Ya tienes cuenta?{' '}
              <button onClick={() => setMode('login')} className="text-[#00aeef] font-bold hover:underline">
                Inicia sesión
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
