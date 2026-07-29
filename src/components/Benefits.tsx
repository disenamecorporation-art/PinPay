import React from 'react';
import { ShieldCheck, Zap, TrendingDown, Headphones, Globe, Lock } from 'lucide-react';

export const Benefits: React.FC = () => {
  const benefitsList = [
    {
      title: 'Comisiones Transparentes y Bajas',
      description: 'Sin sorpresas ni cargos ocultos. Ahorra hasta un 8% en comparación con la banca tradicional.',
      icon: TrendingDown,
      color: 'text-emerald-600 bg-emerald-500/10 border-emerald-500/20'
    },
    {
      title: 'Velocidad Insuperable',
      description: 'El 95% de nuestras transferencias se acreditan en menos de 5 minutos directamente al destino.',
      icon: Zap,
      color: 'text-[#f43a8e] bg-[#f43a8e]/10 border-[#f43a8e]/20'
    },
    {
      title: 'Seguridad de Nivel Bancario',
      description: 'Utilizamos encriptación SSL de 256 bits y estrictos controles antifraude para proteger cada centavo.',
      icon: Lock,
      color: 'text-[#00aeef] bg-[#00aeef]/10 border-[#00aeef]/20'
    },
    {
      title: 'Soporte Humano 24/7',
      description: 'Nuestro equipo de atención al cliente está siempre disponible vía chat y WhatsApp para ayudarte.',
      icon: Headphones,
      color: 'text-amber-600 bg-amber-500/10 border-amber-500/20'
    },
    {
      title: 'Cobertura Global en Expansión',
      description: 'Envía dinero a más de 50 países con múltiples métodos de entrega: bancos, efectivo y billeteras.',
      icon: Globe,
      color: 'text-cyan-600 bg-cyan-500/10 border-cyan-500/20'
    },
    {
      title: 'Regulado y Confiable',
      description: 'Operamos bajo estrictas normativas financieras internacionales con licencias vigentes.',
      icon: ShieldCheck,
      color: 'text-indigo-600 bg-indigo-500/10 border-indigo-500/20'
    }
  ];

  return (
    <section id="beneficios" className="py-24 bg-white text-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
            Ventajas competitivas de <span className="text-[#00aeef]">PinPay</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Diseñamos cada función pensando en ti y en tu familia, garantizando que tu esfuerzo llegue íntegro a su destino.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefitsList.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index} 
                className="bg-slate-50 border border-slate-200 rounded-3xl p-8 hover:border-[#00aeef]/40 transition-all shadow-xl group hover:-translate-y-1"
              >
                <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center mb-6 ${item.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
