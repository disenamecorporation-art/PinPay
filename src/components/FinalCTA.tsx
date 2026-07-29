import React from 'react';
import { ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface FinalCTAProps {
  onOpenTransfer: () => void;
  onOpenRegister: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenTransfer, onOpenRegister }) => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-100 text-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#00aeef]/5 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[#f43a8e]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="bg-gradient-to-br from-slate-900 to-[#0A192F] text-white border border-[#00aeef]/30 rounded-3xl p-10 sm:p-16 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00aeef]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Únete a más de <span className="text-[#00aeef]">500,000 usuarios</span> que ya confían en PinPay
            </h2>
            <p className="text-slate-300 text-base sm:text-lg">
              Tu primer envío es totalmente gratis. Experimenta la velocidad, seguridad y las mejores tasas del mercado internacional.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={onOpenTransfer}
                className="w-full sm:w-auto bg-[#00aeef] hover:bg-[#0098d1] text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-[#00aeef]/30 transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-3 text-base"
              >
                <span>Realizar primer envío</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onOpenRegister}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-2xl border border-white/20 transition-all text-center text-base"
              >
                Crear cuenta gratis
              </button>
            </div>

            <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Protección contra fraude</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-[#f43a8e]" />
                <span>Acreditación inmediata</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
