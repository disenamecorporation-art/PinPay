import React from 'react';
import { UserPlus, Send, CheckCircle2, Wallet } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Regístrate Gratis',
      description: 'Crea tu cuenta en menos de 2 minutos con verificación de identidad rápida y segura.',
      icon: UserPlus,
      color: 'from-[#00aeef] to-blue-600'
    },
    {
      step: '02',
      title: 'Configura tu Envío',
      description: 'Ingresa el monto, selecciona el país de destino y añade los datos de tu beneficiario.',
      icon: Send,
      color: 'from-[#f43a8e] to-rose-600'
    },
    {
      step: '03',
      title: 'Paga con Confianza',
      description: 'Paga con tarjeta débito/crédito o transferencia bancaria con tasa fija garantizada.',
      icon: Wallet,
      color: 'from-blue-600 to-indigo-600'
    },
    {
      step: '04',
      title: 'Dinero Entregado',
      description: 'Tu familiar recibe el dinero en su cuenta bancaria o retiro en efectivo al instante.',
      icon: CheckCircle2,
      color: 'from-emerald-500 to-teal-600'
    }
  ];

  return (
    <section id="como-funciona" className="py-24 bg-slate-50 text-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
            ¿Cómo funciona <span className="text-[#00aeef]">PinPay</span>?
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Enviar dinero al extranjero nunca había sido tan fácil, transparente y seguro. Sigue estos 4 sencillos pasos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index} 
                className="bg-white border border-slate-200 rounded-3xl p-8 relative flex flex-col justify-between shadow-xl hover:border-[#00aeef]/40 transition-all group"
              >
                <div className="absolute top-6 right-6 text-4xl font-black text-slate-200 group-hover:text-[#00aeef]/20 transition-colors">
                  {item.step}
                </div>

                <div className="space-y-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center text-xs font-bold text-[#00aeef]">
                  <span>Paso {index + 1} de 4</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
