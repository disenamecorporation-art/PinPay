import React from 'react';
import { Smartphone, CheckCircle, BarChart3, Globe } from 'lucide-react';

export const VisualShowcase: React.FC = () => {
  return (
    <section className="py-24 bg-white text-slate-900 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
            Diseñado para conectar continentes <span className="text-[#00aeef]">con total transparencia</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Nuestra plataforma combina la potencia de la aplicación móvil de última generación con herramientas financieras profesionales para empresas y particulares.
          </p>
        </div>

        {/* Two main showcase container cards with the requested images */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          
          {/* Container 1: Mobile App & Global Connectivity (Image 1: cels.png) */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-[#00aeef]/40 transition-all">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00aeef]/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="space-y-6 relative z-10">
              <div className="w-12 h-12 bg-[#00aeef]/10 border border-[#00aeef]/20 rounded-2xl flex items-center justify-center text-[#00aeef]">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Tu dinero en la palma de tu mano
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Envía remesas desde cualquier lugar con nuestra app móvil optimizada. Notificaciones en tiempo real, autenticación biométrica y seguimiento satelital de cada transacción.
              </p>

              <ul className="space-y-3 pt-2">
                <li className="flex items-center space-x-3 text-sm text-slate-700 font-medium">
                  <CheckCircle className="w-5 h-5 text-[#f43a8e] shrink-0" />
                  <span>Historial detallado y recibos digitales automáticos</span>
                </li>
                <li className="flex items-center space-x-3 text-sm text-slate-700 font-medium">
                  <CheckCircle className="w-5 h-5 text-[#f43a8e] shrink-0" />
                  <span>Guardado rápido de contactos y beneficiarios frecuentes</span>
                </li>
                <li className="flex items-center space-x-3 text-sm text-slate-700 font-medium">
                  <CheckCircle className="w-5 h-5 text-[#f43a8e] shrink-0" />
                  <span>Alertas instantáneas cuando el dinero llega a su destino</span>
                </li>
              </ul>
            </div>

            {/* Image Container 1 */}
            <div className="mt-8 pt-6 border-t border-slate-200 relative overflow-hidden rounded-2xl bg-white p-6 flex items-center justify-center shadow-xs">
              <img 
                src="https://i.postimg.cc/3xvF0VYB/cels.png" 
                alt="PinPay Mobile App Preview" 
                className="max-h-72 w-auto object-contain transform transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
          </div>

          {/* Container 2: PinPay Professional Dashboard & Branding (Image 2: PROPUESTA-3-5-PINPAY.jpg) */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-[#f43a8e]/40 transition-all">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#f43a8e]/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="space-y-6 relative z-10">
              <div className="w-12 h-12 bg-[#f43a8e]/10 border border-[#f43a8e]/20 rounded-2xl flex items-center justify-center text-[#f43a8e]">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Infraestructura financiera corporativa
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Diseñado bajo estrictos estándares de la industria. Panel de control intuitivo con análisis de tipos de cambio históricos, reportes contables y liquidación de divisas en tiempo récord.
              </p>

              <ul className="space-y-3 pt-2">
                <li className="flex items-center space-x-3 text-sm text-slate-700 font-medium">
                  <CheckCircle className="w-5 h-5 text-[#00aeef] shrink-0" />
                  <span>Tasas preferenciales para envíos frecuentes o corporativos</span>
                </li>
                <li className="flex items-center space-x-3 text-sm text-slate-700 font-medium">
                  <CheckCircle className="w-5 h-5 text-[#00aeef] shrink-0" />
                  <span>Conexión directa con más de 120 bancos en Latinoamérica</span>
                </li>
                <li className="flex items-center space-x-3 text-sm text-slate-700 font-medium">
                  <CheckCircle className="w-5 h-5 text-[#00aeef] shrink-0" />
                  <span>Soporte dedicado 24/7 para cuentas VIP y socios</span>
                </li>
              </ul>
            </div>

            {/* Image Container 2 */}
            <div className="mt-8 pt-6 border-t border-slate-200 relative overflow-hidden rounded-2xl bg-white p-6 flex items-center justify-center shadow-xs">
              <img 
                src="https://i.postimg.cc/s2C9YmgY/PROPUESTA-3-5-PINPAY.jpg" 
                alt="PinPay Brand Proposal & Dashboard" 
                className="max-h-72 w-auto object-contain rounded-xl transform transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
