import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Testimonial } from '../types';

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Alejandro Morales',
    role: 'Ingeniero de Software',
    location: 'Madrid ➔ Bogotá',
    comment: 'Llevo más de un año usando PinPay para enviar dinero a mis padres en Colombia. Las transferencias llegan en menos de 5 minutos y el tipo de cambio es imbatible.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: '2',
    name: 'Valeria Cárdenas',
    role: 'Emprendedora',
    location: 'Miami ➔ Ciudad de México',
    comment: 'La transparencia es total. No hay comisiones ocultas como en los bancos tradicionales. Además, la interfaz es súper elegante y fácil de usar.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: '3',
    name: 'Mateo Fernández',
    role: 'Arquitecto',
    location: 'Santiago ➔ Caracas',
    comment: 'Excelente servicio de atención al cliente. Tuve una duda con los datos del banco receptor y me resolvieron por chat en menos de 2 minutos. 100% recomendado.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonios" className="py-24 bg-white text-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
            Lo que dicen nuestros <span className="text-[#00aeef]">usuarios</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Miles de personas confían en PinPay todos los días para apoyar a sus familias y negocios.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div 
              key={t.id} 
              className="bg-slate-50 border border-slate-200 rounded-3xl p-8 relative flex flex-col justify-between shadow-xl hover:border-[#00aeef]/40 transition-all"
            >
              <div className="absolute top-6 right-6 text-[#00aeef]/20">
                <Quote className="w-10 h-10" />
              </div>

              <div className="space-y-4 relative z-10">
                <div className="flex items-center space-x-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#f43a8e] text-[#f43a8e]" />
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed italic font-medium">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200 flex items-center space-x-4">
                <img 
                  src={t.avatar} 
                  alt={t.name} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#00aeef]/40"
                />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{t.name}</h4>
                  <p className="text-xs text-slate-500">{t.role} • <span className="text-[#00aeef] font-semibold">{t.location}</span></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
