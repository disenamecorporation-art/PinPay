import React from 'react';
import { Shield, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          
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
              La plataforma líder en remesas internacionales. Conectando familias y potenciando economías con tecnología segura, transparente y rápida.
            </p>
            <div className="flex items-center space-x-3 text-xs text-slate-400">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Regulado y certificado internacionalmente</span>
            </div>
          </div>

          {/* Quick links 1 */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">Compañía</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#inicio" className="hover:text-[#00aeef] transition-colors">Quiénes somos</a></li>
              <li><a href="#como-funciona" className="hover:text-[#00aeef] transition-colors">Cómo funciona</a></li>
              <li><a href="#beneficios" className="hover:text-[#00aeef] transition-colors">Ventajas</a></li>
              <li><a href="#testimonios" className="hover:text-[#00aeef] transition-colors">Testimonios</a></li>
            </ul>
          </div>

          {/* Quick links 2 */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">Soporte</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#rastrear" className="hover:text-[#00aeef] transition-colors">Rastrear envío</a></li>
              <li><a href="#calculadora" className="hover:text-[#00aeef] transition-colors">Calculadora de tasas</a></li>
              <li><a href="#ayuda" className="hover:text-[#00aeef] transition-colors">Preguntas frecuentes (FAQ)</a></li>
              <li><a href="#contacto" className="hover:text-[#00aeef] transition-colors">Centro de ayuda</a></li>
            </ul>
          </div>

          {/* Legal / Social */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">Legal & Privacidad</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#terminos" className="hover:text-[#00aeef] transition-colors">Términos y condiciones</a></li>
              <li><a href="#privacidad" className="hover:text-[#00aeef] transition-colors">Política de privacidad</a></li>
              <li><a href="#cookies" className="hover:text-[#00aeef] transition-colors">Política de cookies</a></li>
              <li><a href="#cumplimiento" className="hover:text-[#00aeef] transition-colors">Cumplimiento AML</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} PinPay Technologies Inc. Todos los derechos reservados.</p>
          <div className="flex items-center space-x-1">
            <span>Hecho con</span>
            <Heart className="w-3.5 h-3.5 text-[#f43a8e] fill-[#f43a8e]" />
            <span>para conectar al mundo.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
