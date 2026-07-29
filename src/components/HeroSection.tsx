import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Zap, Globe2, Sparkles, TrendingUp } from 'lucide-react';

interface HeroSectionProps {
  onOpenTransfer: () => void;
}

const COUNTRIES = [
  { code: 'MXN', name: 'México (Peso)', rate: 17.15, flag: '🇲🇽', time: 'En minutos', fee: 0.99 },
  { code: 'COP', name: 'Colombia (Peso)', rate: 4120.50, flag: '🇨🇴', time: 'En minutos', fee: 1.49 },
  { code: 'VES', name: 'Venezuela (Bolívar)', rate: 36.40, flag: '🇻🇪', time: 'Inmediato', fee: 0.99 },
  { code: 'DOP', name: 'Rep. Dominicana (Peso)', rate: 59.20, flag: '🇩🇴', time: 'En minutos', fee: 1.99 },
  { code: 'PEN', name: 'Perú (Sol)', rate: 3.72, flag: '🇵🇪', time: 'En minutos', fee: 0.99 },
  { code: 'ARS', name: 'Argentina (Peso)', rate: 980.00, flag: '🇦🇷', time: 'En 1 hora', fee: 2.49 },
  { code: 'GTQ', name: 'Guatemala (Quetzal)', rate: 7.82, flag: '🇬🇹', time: 'En minutos', fee: 0.99 },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenTransfer }) => {
  const [sendAmount, setSendAmount] = useState<number>(500);
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [deliveryMethod, setDeliveryMethod] = useState<'bank' | 'cash' | 'wallet'>('bank');

  const calculatedReceive = (sendAmount * selectedCountry.rate).toFixed(2);

  return (
    <section id="inicio" className="relative bg-gradient-to-b from-white via-slate-50 to-white text-slate-900 pt-16 pb-28 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#00aeef]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-[#f43a8e]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <h1 className="text-4xl sm:text-6xl tracking-tight leading-tight text-slate-900">
              <span className="font-light">Envía dinero a casa con</span> <span className="font-black bg-gradient-to-r from-[#00aeef] to-[#f43a8e] bg-clip-text text-transparent">confianza y velocidad</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Conecta con tus seres queridos al instante. Tipo de cambio real sin comisiones ocultas, respaldado por tecnología de última generación.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onOpenTransfer}
                className="w-full sm:w-auto bg-[#00aeef] hover:bg-[#0098d1] text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-[#00aeef]/30 transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-3 text-base"
              >
                <span>Envía dinero ahora</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <a
                href="#como-funciona"
                className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-8 py-4 rounded-2xl border border-slate-200 transition-all text-center text-base"
              >
                Cómo funciona
              </a>
            </div>

            {/* Trust badges */}
            <div className="pt-6 border-t border-slate-200 grid grid-cols-3 gap-4 text-left">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-slate-900">100% Seguro</p>
                  <p className="text-[11px] text-slate-500">Regulado y cifrado</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-[#f43a8e] shrink-0" />
                <div>
                  <p className="text-xs font-bold text-slate-900">Transferencias</p>
                  <p className="text-[11px] text-slate-500">En minutos</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-[#00aeef] shrink-0" />
                <div>
                  <p className="text-xs font-bold text-slate-900">Mejor Tasa</p>
                  <p className="text-[11px] text-slate-500">Sin sobreprecios</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Calculator Card */}
          <div className="lg:col-span-5" id="calculadora">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl relative backdrop-blur-xl">
              <div className="absolute -top-3 right-6 bg-gradient-to-r from-[#00aeef] to-[#f43a8e] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                Tasa en Vivo
              </div>

              <h3 className="text-xl font-extrabold text-slate-900 mb-6 flex items-center justify-between">
                <span>Calcula tu Envío</span>
                <span className="text-xs text-[#f43a8e] font-semibold">Cero comisiones ocultas</span>
              </h3>

              <div className="space-y-5">
                {/* Send amount input */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 transition-all focus-within:border-[#00aeef]">
                  <div className="flex justify-between text-xs text-slate-500 mb-1 font-semibold">
                    <span>Tú envías</span>
                    <span>USD ($)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <input
                      type="number"
                      value={sendAmount}
                      onChange={(e) => setSendAmount(Math.max(1, Number(e.target.value)))}
                      className="bg-transparent text-2xl sm:text-3xl font-black text-slate-900 w-full outline-none"
                      min="1"
                    />
                    <div className="flex items-center space-x-2 bg-white border border-slate-200 px-3 py-1.5 rounded-xl font-bold text-sm shadow-xs">
                      <span>🇺🇸 USD</span>
                    </div>
                  </div>
                </div>

                {/* Destination Country Selector */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <label className="block text-xs text-slate-500 mb-1 font-semibold">Destino del envío</label>
                  <select
                    value={selectedCountry.code}
                    onChange={(e) => {
                      const found = COUNTRIES.find(c => c.code === e.target.value);
                      if (found) setSelectedCountry(found);
                    }}
                    className="w-full bg-transparent text-slate-900 font-bold text-base outline-none cursor-pointer"
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code} className="bg-white text-slate-900">
                        {c.flag} {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Delivery Method */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setDeliveryMethod('bank')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      deliveryMethod === 'bank'
                        ? 'bg-[#00aeef] text-white border-[#00aeef] shadow-md shadow-[#00aeef]/25'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    🏦 Banco
                  </button>
                  <button
                    onClick={() => setDeliveryMethod('cash')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      deliveryMethod === 'cash'
                        ? 'bg-[#00aeef] text-white border-[#00aeef] shadow-md shadow-[#00aeef]/25'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    💵 Efectivo
                  </button>
                  <button
                    onClick={() => setDeliveryMethod('wallet')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      deliveryMethod === 'wallet'
                        ? 'bg-[#00aeef] text-white border-[#00aeef] shadow-md shadow-[#00aeef]/25'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    📱 Billetera
                  </button>
                </div>

                {/* Calculation breakdown */}
                <div className="bg-slate-50 rounded-2xl p-4 space-y-2.5 text-xs text-slate-600 border border-slate-200">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Tipo de cambio:</span>
                    <span className="font-bold text-slate-900">1 USD = {selectedCountry.rate} {selectedCountry.code}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Comisión de transferencia:</span>
                    <span className="font-bold text-emerald-600">${selectedCountry.fee} USD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Tiempo estimado:</span>
                    <span className="font-bold text-[#f43a8e]">{selectedCountry.time}</span>
                  </div>
                </div>

                {/* Receiver Gets Box */}
                <div className="bg-gradient-to-r from-slate-900 to-[#0A192F] text-white rounded-2xl p-4 flex items-center justify-between shadow-lg">
                  <div>
                    <span className="text-xs text-[#00aeef] block font-bold uppercase tracking-wider">Destinatario recibe</span>
                    <span className="text-2xl sm:text-3xl font-black text-white">
                      {Number(calculatedReceive).toLocaleString()} {selectedCountry.code}
                    </span>
                  </div>
                  <div className="text-3xl">{selectedCountry.flag}</div>
                </div>

                <button
                  onClick={onOpenTransfer}
                  className="w-full bg-gradient-to-r from-[#00aeef] to-[#f43a8e] hover:opacity-95 text-white font-bold py-4 rounded-2xl shadow-xl shadow-[#00aeef]/25 transition-all text-base flex items-center justify-center space-x-2"
                >
                  <span>Continuar con el Envío</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
