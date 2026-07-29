import React, { useState } from 'react';
import { Globe, Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onOpenAuth: (mode: 'login' | 'register') => void;
  onOpenTransfer: () => void;
  activeTab: 'home' | 'calculator' | 'admin' | 'dashboard';
  onSelectTab: (tab: 'home' | 'calculator' | 'admin' | 'dashboard') => void;
  isLoggedIn?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth, onOpenTransfer, activeTab, onSelectTab, isLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState('ES');

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 text-slate-800 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo only - no text subtitle */}
          <div className="flex items-center cursor-pointer py-2" onClick={() => { onSelectTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <img 
              src="https://i.postimg.cc/3w21V6cf/logoweb.png" 
              alt="PinPay Logo" 
              className="h-11 sm:h-12 w-auto object-contain"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => { onSelectTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`text-sm font-semibold transition-colors ${activeTab === 'home' ? 'text-[#00aeef] font-bold' : 'text-slate-600 hover:text-[#00aeef]'}`}
            >
              Inicio
            </button>
            <button 
              onClick={() => onSelectTab('calculator')}
              className={`text-sm font-semibold transition-colors px-3 py-1.5 rounded-xl border ${activeTab === 'calculator' ? 'bg-[#00aeef]/10 border-[#00aeef] text-[#00aeef]' : 'border-slate-200 text-slate-700 bg-slate-50 hover:bg-slate-100'}`}
            >
              Calculadora P2P
            </button>
            <button 
              onClick={() => onSelectTab('admin')}
              className={`text-sm font-semibold transition-colors px-3 py-1.5 rounded-xl border ${activeTab === 'admin' ? 'bg-slate-900 text-white border-slate-900' : 'border-slate-200 text-slate-700 bg-slate-50 hover:bg-slate-100'}`}
            >
              Panel Admin
            </button>
            <button 
              onClick={() => onSelectTab('dashboard')}
              className={`text-sm font-semibold transition-colors px-3 py-1.5 rounded-xl border ${activeTab === 'dashboard' ? 'bg-[#00aeef] text-white border-[#00aeef]' : 'border-slate-200 text-slate-700 bg-slate-50 hover:bg-slate-100'}`}
            >
              Mi Dashboard
            </button>
            <a href="#como-funciona" onClick={() => onSelectTab('home')} className="text-sm font-semibold text-slate-600 hover:text-[#00aeef] transition-colors">Cómo Funciona</a>
            <a href="#beneficios" onClick={() => onSelectTab('home')} className="text-sm font-semibold text-slate-600 hover:text-[#00aeef] transition-colors">Ventajas</a>
            <a href="#rastrear" onClick={() => onSelectTab('home')} className="text-sm font-semibold text-slate-600 hover:text-[#00aeef] transition-colors">Rastrear Envío</a>
            <a href="#testimonios" onClick={() => onSelectTab('home')} className="text-sm font-semibold text-slate-600 hover:text-[#00aeef] transition-colors">Testimonios</a>
          </div>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-1 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-700">
              <Globe className="w-3.5 h-3.5 text-[#00aeef]" />
              <span>{lang}</span>
            </div>

            <button 
              onClick={() => onOpenAuth('login')}
              className="text-sm font-semibold text-slate-700 hover:text-[#00aeef] px-3 py-2 transition-colors"
            >
              Iniciar Sesión
            </button>

            <button 
              onClick={onOpenTransfer}
              className="bg-[#00aeef] hover:bg-[#0098d1] text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-[#00aeef]/25 transition-all transform hover:-translate-y-0.5 flex items-center space-x-2"
            >
              <span>Enviar Dinero</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-700 hover:text-slate-900 p-2 rounded-lg bg-slate-100 border border-slate-200"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <button 
            onClick={() => { setIsOpen(false); onSelectTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="w-full text-left px-3 py-2 rounded-lg text-base font-semibold text-slate-700 hover:bg-slate-100"
          >
            Inicio
          </button>
          <button 
            onClick={() => { setIsOpen(false); onSelectTab('calculator'); }}
            className="w-full text-left px-3 py-2 rounded-lg text-base font-semibold text-[#00aeef] bg-[#00aeef]/10"
          >
            Calculadora P2P
          </button>
          <button 
            onClick={() => { setIsOpen(false); onSelectTab('admin'); }}
            className="w-full text-left px-3 py-2 rounded-lg text-base font-semibold text-white bg-slate-900"
          >
            Panel Admin (Gestión)
          </button>
          <button 
            onClick={() => { setIsOpen(false); onSelectTab('dashboard'); }}
            className="w-full text-left px-3 py-2 rounded-lg text-base font-semibold text-white bg-[#00aeef]"
          >
            Mi Dashboard (Usuario)
          </button>
          <a 
            href="#como-funciona" 
            onClick={() => { setIsOpen(false); onSelectTab('home'); }}
            className="block px-3 py-2 rounded-lg text-base font-semibold text-slate-700 hover:bg-slate-100"
          >
            Cómo Funciona
          </a>
          <a 
            href="#beneficios" 
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-semibold text-slate-700 hover:bg-slate-100"
          >
            Ventajas
          </a>
          <a 
            href="#rastrear" 
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-semibold text-slate-700 hover:bg-slate-100"
          >
            Rastrear Envío
          </a>
          <a 
            href="#testimonios" 
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-semibold text-slate-700 hover:bg-slate-100"
          >
            Testimonios
          </a>
          <div className="pt-4 border-t border-slate-200 flex flex-col space-y-3">
            <button 
              onClick={() => { setIsOpen(false); onOpenAuth('login'); }}
              className="w-full text-center py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold"
            >
              Iniciar Sesión
            </button>
            <button 
              onClick={() => { setIsOpen(false); onOpenTransfer(); }}
              className="w-full text-center py-2.5 rounded-xl bg-[#00aeef] hover:bg-[#0098d1] text-white font-bold shadow-md shadow-[#00aeef]/25"
            >
              Enviar Dinero Ahora
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
