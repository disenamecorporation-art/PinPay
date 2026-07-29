import React, { useState } from 'react';
import { ArrowRight, RefreshCw, ShieldCheck, Zap, Info, TrendingUp, Calculator } from 'lucide-react';

interface CurrencyInfo {
  code: string;
  name: string;
  symbol: string;
  flag: string;
  p2pRateToUSD: number; // 1 USD = X Local Currency on Binance P2P
}

const CURRENCIES: CurrencyInfo[] = [
  { code: 'USD', name: 'Dólar Estadounidense', symbol: '$', flag: '🇺🇸', p2pRateToUSD: 1.00 },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺', p2pRateToUSD: 0.92 },
  { code: 'MXN', name: 'Peso Mexicano', symbol: '$', flag: '🇲🇽', p2pRateToUSD: 17.15 },
  { code: 'COP', name: 'Peso Colombiano', symbol: 'COL$', flag: '🇨🇴', p2pRateToUSD: 4120.00 },
  { code: 'ARS', name: 'Peso Argentino', symbol: '$', flag: '🇦🇷', p2pRateToUSD: 980.00 },
  { code: 'BRL', name: 'Real Brasileño', symbol: 'R$', flag: '🇧🇷', p2pRateToUSD: 5.45 },
  { code: 'CLP', name: 'Peso Chileno', symbol: '$', flag: '🇨🇱', p2pRateToUSD: 935.00 },
  { code: 'PEN', name: 'Sol Peruano', symbol: 'S/', flag: '🇵🇪', p2pRateToUSD: 3.72 },
  { code: 'VES', name: 'Bolívar Venezolano', symbol: 'Bs.', flag: '🇻🇪', p2pRateToUSD: 36.40 },
  { code: 'PAB', name: 'Balboa Panameño', symbol: 'B/.', flag: '🇵🇦', p2pRateToUSD: 1.00 },
  { code: 'DOP', name: 'Peso Dominicano', symbol: 'RD$', flag: '🇩🇴', p2pRateToUSD: 59.20 },
  { code: 'ECS', name: 'Dólar (Ecuador)', symbol: '$', flag: '🇪🇨', p2pRateToUSD: 1.00 },
];

export const StandaloneCalculator: React.FC<{ onBackToHome?: () => void }> = () => {
  const [sendCurrency, setSendCurrency] = useState<string>('USD');
  const [receiveCurrency, setReceiveCurrency] = useState<string>('MXN');
  const [amount, setAmount] = useState<number>(500);

  const fromCurr = CURRENCIES.find(c => c.code === sendCurrency) || CURRENCIES[0];
  const toCurr = CURRENCIES.find(c => c.code === receiveCurrency) || CURRENCIES[2];

  const amountInUSD = amount / fromCurr.p2pRateToUSD;
  const baseReceive = amountInUSD * toCurr.p2pRateToUSD;
  const feeMarkup = baseReceive * 0.07;
  const finalReceive = baseReceive + feeMarkup;
  const effectiveRate = (toCurr.p2pRateToUSD / fromCurr.p2pRateToUSD) * 1.07;

  return (
    <div className="py-16 bg-slate-50 min-h-screen text-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
            Calculadora Avanzada <span className="text-[#00aeef]">PinPay P2P</span>
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Cotización exacta sincronizada con mercados P2P internacionales y aplicación de tarifa operativa del 7%.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
            <div className="absolute -top-3 right-6 bg-gradient-to-r from-[#00aeef] to-[#f43a8e] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
              P2P + 7% Activo
            </div>

            <div className="space-y-6">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 transition-all focus-within:border-[#00aeef]">
                <div className="flex justify-between text-xs text-slate-500 mb-2 font-semibold">
                  <span>Envías (Origen)</span>
                  <span>{fromCurr.code}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Math.max(1, Number(e.target.value)))}
                    className="bg-transparent text-2xl sm:text-3xl font-black text-slate-900 w-full outline-none"
                    min="1"
                  />
                  <select
                    value={sendCurrency}
                    onChange={(e) => setSendCurrency(e.target.value)}
                    className="bg-white border border-slate-200 text-slate-900 font-bold text-sm rounded-xl px-3 py-2 outline-none cursor-pointer shadow-xs"
                  >
                    {CURRENCIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.flag} {c.code} - {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-center -my-3 relative z-10">
                <button
                  onClick={() => {
                    const temp = sendCurrency;
                    setSendCurrency(receiveCurrency);
                    setReceiveCurrency(temp);
                  }}
                  className="bg-slate-900 hover:bg-[#00aeef] text-white p-3 rounded-full shadow-lg transition-all transform hover:rotate-180 duration-300"
                  title="Intercambiar divisas"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                <div className="flex justify-between text-xs text-slate-500 mb-2 font-semibold">
                  <span>Destinatario Recibe (Destino)</span>
                  <span>{toCurr.code}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="text-2xl sm:text-3xl font-black text-[#00aeef] truncate">
                    {toCurr.symbol} {finalReceive.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <select
                    value={receiveCurrency}
                    onChange={(e) => setReceiveCurrency(e.target.value)}
                    className="bg-white border border-slate-200 text-slate-900 font-bold text-sm rounded-xl px-3 py-2 outline-none cursor-pointer shadow-xs"
                  >
                    {CURRENCIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.flag} {c.code} - {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-5 space-y-3 border border-slate-200 text-xs text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Cotización Base Binance P2P:</span>
                  <span className="font-bold text-slate-900">1 {fromCurr.code} = {(toCurr.p2pRateToUSD / fromCurr.p2pRateToUSD).toFixed(4)} {toCurr.code}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Factor Operativo y Ajuste (+7%):</span>
                  <span className="font-bold text-[#f43a8e]">+ 7.00%</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200">
                  <span className="text-slate-900 font-bold">Tipo de Cambio Efectivo Aplicado:</span>
                  <span className="font-bold text-[#00aeef]">1 {fromCurr.code} = {effectiveRate.toFixed(4)} {toCurr.code}</span>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 flex items-start space-x-3 text-xs text-emerald-900">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-emerald-800">Garantía PinPay P2P</p>
                  <p className="text-emerald-700 mt-0.5">Tasa asegurada por 15 minutos al iniciar tu transferencia. Sin comisiones ocultas.</p>
                </div>
              </div>

            </div>
          </div>

          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl">
            <h3 className="text-lg font-extrabold text-slate-900 mb-4 flex items-center justify-between">
              <span>Tasas P2P de Referencia</span>
              <span className="text-xs text-slate-500 font-normal">Base USD (Incl. +7%)</span>
            </h3>

            <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
              {CURRENCIES.map((curr) => {
                const effectiveUSDValue = curr.p2pRateToUSD * 1.07;
                return (
                  <div key={curr.code} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 hover:border-[#00aeef]/50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{curr.flag}</span>
                      <div>
                        <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{curr.code}</h4>
                        <p className="text-[11px] text-slate-500 truncate max-w-[140px]">{curr.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-xs sm:text-sm text-slate-900">{effectiveUSDValue.toFixed(2)}</span>
                      <span className="text-[10px] text-slate-400 block">por 1 USD</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
