import React, { useState } from 'react';
import { Search, CheckCircle2, Clock, Truck, ArrowRight } from 'lucide-react';
import { TransferStatus } from '../types';

const MOCK_TRANSFERS: Record<string, TransferStatus> = {
  'PIN-849204': {
    trackingCode: 'PIN-849204',
    senderName: 'Carlos Mendoza',
    recipientName: 'María Elena Mendoza',
    amountSent: '$500.00 USD',
    amountReceived: '8,575.00 MXN',
    status: 'delivered',
    date: '29 de Julio, 2026',
    destinationCountry: 'México 🇲🇽'
  },
  'PIN-910283': {
    trackingCode: 'PIN-910283',
    senderName: 'Ana Lucía Gómez',
    recipientName: 'Roberto Gómez',
    amountSent: '$350.00 USD',
    amountReceived: '1,442,175.00 COP',
    status: 'in_transit',
    date: '29 de Julio, 2026',
    destinationCountry: 'Colombia 🇨🇴'
  },
  'PIN-554109': {
    trackingCode: 'PIN-554109',
    senderName: 'José Ramírez',
    recipientName: 'Carmen Ramírez',
    amountSent: '$1,000.00 USD',
    amountReceived: '36,400.00 VES',
    status: 'processing',
    date: '29 de Julio, 2026',
    destinationCountry: 'Venezuela 🇻🇪'
  }
};

export const TrackingWidget: React.FC = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<TransferStatus | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    const cleanCode = query.trim().toUpperCase();
    const found = MOCK_TRANSFERS[cleanCode];
    if (found) {
      setResult(found);
    } else {
      setResult({
        trackingCode: cleanCode,
        senderName: 'Usuario Verificado',
        recipientName: 'Beneficiario Final',
        amountSent: '$250.00 USD',
        amountReceived: '4,287.50 MXN',
        status: 'in_transit',
        date: 'Hoy',
        destinationCountry: 'Latinoamérica'
      });
    }
    setSearched(true);
  };

  return (
    <section id="rastrear" className="py-24 bg-slate-50 text-slate-950 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
            Rastrea tu <span className="text-[#00aeef]">Remesa</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Ingresa tu código de seguimiento (ej. <span className="text-[#f43a8e] font-mono font-semibold">PIN-849204</span>, <span className="text-[#f43a8e] font-mono font-semibold">PIN-910283</span>) para conocer el estado exacto de tu dinero.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Ingresa tu código (ej. PIN-849204)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-slate-900 font-medium outline-none focus:border-[#00aeef] transition-colors uppercase placeholder:normal-case placeholder:text-slate-400"
              />
            </div>
            <button
              type="submit"
              className="bg-[#00aeef] hover:bg-[#0098d1] text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-[#00aeef]/25 transition-all flex items-center justify-center space-x-2 shrink-0"
            >
              <span>Rastrear</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          {/* Quick sample pills */}
          <div className="mt-4 flex items-center space-x-2 text-xs text-slate-500 flex-wrap gap-y-2">
            <span>Prueba estos códigos:</span>
            <button 
              type="button" 
              onClick={() => { setQuery('PIN-849204'); }} 
              className="bg-slate-100 hover:bg-slate-200 text-[#00aeef] px-2.5 py-1 rounded-lg border border-slate-200 font-mono font-semibold"
            >
              PIN-849204
            </button>
            <button 
              type="button" 
              onClick={() => { setQuery('PIN-910283'); }} 
              className="bg-slate-100 hover:bg-slate-200 text-[#00aeef] px-2.5 py-1 rounded-lg border border-slate-200 font-mono font-semibold"
            >
              PIN-910283
            </button>
            <button 
              type="button" 
              onClick={() => { setQuery('PIN-554109'); }} 
              className="bg-slate-100 hover:bg-slate-200 text-[#00aeef] px-2.5 py-1 rounded-lg border border-slate-200 font-mono font-semibold"
            >
              PIN-554109
            </button>
          </div>

          {/* Search Result Display */}
          {searched && result && (
            <div className="mt-8 pt-8 border-t border-slate-200 space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <div>
                  <span className="text-xs text-slate-500">Código de Referencia</span>
                  <p className="text-lg font-mono font-bold text-[#00aeef]">{result.trackingCode}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-500">Destino</span>
                  <p className="text-sm font-semibold text-slate-900">{result.destinationCountry}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-500">Fecha</span>
                  <p className="text-sm font-semibold text-slate-900">{result.date}</p>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                <div className={`p-4 rounded-2xl border text-center ${result.status === 'processing' || result.status === 'in_transit' || result.status === 'delivered' ? 'bg-[#00aeef]/10 border-[#00aeef]/40 text-[#00aeef]' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                  <Clock className="w-6 h-6 mx-auto mb-2 text-[#00aeef]" />
                  <p className="text-xs font-bold">Verificado</p>
                </div>
                <div className={`p-4 rounded-2xl border text-center ${result.status === 'in_transit' || result.status === 'delivered' ? 'bg-[#f43a8e]/10 border-[#f43a8e]/40 text-[#f43a8e]' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                  <Truck className="w-6 h-6 mx-auto mb-2 text-[#f43a8e]" />
                  <p className="text-xs font-bold">En Tránsito</p>
                </div>
                <div className={`p-4 rounded-2xl border text-center ${result.status === 'delivered' ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-600' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                  <CheckCircle2 className="w-6 h-6 mx-auto mb-2 text-emerald-600" />
                  <p className="text-xs font-bold">Entregado</p>
                </div>
              </div>

              {/* Transfer Details Card */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex justify-between text-sm border-b border-slate-200 pb-3">
                  <span className="text-slate-500">Remitente:</span>
                  <span className="font-semibold text-slate-900">{result.senderName}</span>
                </div>
                <div className="flex justify-between text-sm border-b border-slate-200 pb-3">
                  <span className="text-slate-500">Beneficiario:</span>
                  <span className="font-semibold text-slate-900">{result.recipientName}</span>
                </div>
                <div className="flex justify-between text-sm border-b border-slate-200 pb-3">
                  <span className="text-slate-500">Monto Enviado:</span>
                  <span className="font-semibold text-slate-900">{result.amountSent}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Monto a Recibir:</span>
                  <span className="font-bold text-[#00aeef]">{result.amountReceived}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
