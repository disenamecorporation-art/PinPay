import React from 'react';
import { Shield, Heart } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: 'home' | 'calculator' | 'admin' | 'dashboard' | 'vision') => void;
  currentUser?: { name: string; email: string, role?: 'admin' | 'user' } | null;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, currentUser }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="https://i.postimg.cc/3w21V6cf/logoweb.png" 
                alt="PinPay Logo" 
                className="h-9 w-auto object-contain bg-white/10 p-1.5 rounded-xl"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              La plataforma líder en remesas internacionales y cálculo P2P automatizado. Conectando familias con seguridad y velocidad.
            </p>
            <div className="flex items-center space-x-3 text-xs text-slate-400">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Regulado y certificado internacionalmente</span>
            </div>
          </div>

          {/* Header Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">Navegación</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => { onSelectTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#00aeef] transition-colors text-left">
                  Inicio
                </button>
              </li>
              <li>
                <button onClick={() => { onSelectTab('calculator'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#00aeef] transition-colors text-left">
                  Calculadora P2P
                </button>
              </li>
              {currentUser?.role === 'admin' && (
                <li>
                  <button onClick={() => { onSelectTab('admin'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#00aeef] transition-colors text-left">
                    Panel Admin
                  </button>
                </li>
              )}
              {currentUser?.role === 'user' && (
                <li>
                  <button onClick={() => { onSelectTab('dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#00aeef] transition-colors text-left">
                    Mi Dashboard
                  </button>
                </li>
              )}
              <li>
                <button onClick={() => { onSelectTab('vision'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#00aeef] transition-colors text-left">
                  Tecnología & Visión
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Sections */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">Secciones</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#como-funciona" onClick={() => onSelectTab('home')} className="hover:text-[#00aeef] transition-colors">Cómo Funciona</a></li>
              <li><a href="#beneficios" onClick={() => onSelectTab('home')} className="hover:text-[#00aeef] transition-colors">Ventajas</a></li>
              <li><a href="#rastrear" onClick={() => onSelectTab('home')} className="hover:text-[#00aeef] transition-colors">Rastrear Envío</a></li>
              <li><a href="#testimonios" onClick={() => onSelectTab('home')} className="hover:text-[#00aeef] transition-colors">Testimonios</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} PinPay. Hecho por Legaint. Todos los derechos reservados.</p>
          <div className="flex items-center space-x-1">
            <span>Diseñado con excelencia para conectar continentes.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

