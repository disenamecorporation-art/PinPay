import React, { useState } from 'react';
import { 
  DollarSign, 
  ArrowLeftRight, 
  TrendingUp, 
  ShieldCheck, 
  Clock, 
  CheckCircle, 
  Calculator, 
  Send, 
  Globe, 
  FileText,
  User,
  ExternalLink
} from 'lucide-react';

interface UserDashboardProps {
  userEmail?: string;
  userName?: string;
  onOpenTransfer: () => void;
}

interface UserTransaction {
  id: string;
  code: string;
  recipient: string;
  destination: string;
  amountUSD: string;
  amountReceived: string;
  status: 'delivered' | 'in_transit' | 'processing';
  date: string;
}

const USER_TRANSACTIONS: UserTransaction[] = [
  { id: 'tx-01', code: 'PIN-849204', recipient: 'Rosa Mendoza', destination: 'México (MXN)', amountUSD: '$500.00', amountReceived: '8,575.00 MXN', status: 'delivered', date: '29 Jul 2026' },
  { id: 'tx-02', code: 'PIN-910283', recipient: 'Carlos Gómez', destination: 'Colombia (COP)', amountUSD: '$350.00', amountReceived: '1,442,175.00 COP', status: 'in_transit', date: '25 Jul 2026' },
  { id: 'tx-03', code: 'PIN-554109', recipient: 'Carmen Soto', destination: 'Venezuela (VES)', amountUSD: '$1,000.00', amountReceived: '62,500.00 VES', status: 'delivered', date: '12 Jul 2026' }
];

const CURRENCIES = [
  { code: 'USD', name: 'Dólar Estadounidense', symbol: '$', p2pRate: 1.00 },
  { code: 'EUR', name: 'Euro', symbol: '€', p2pRate: 0.92 },
  { code: 'MXN', name: 'Peso Mexicano', symbol: '$', p2pRate: 17.15 },
  { code: 'COP', name: 'Peso Colombiano', symbol: 'COL$', p2pRate: 4120.00 },
  { code: 'VES', name: 'Bolívar Venezolano (Binance P2P)', symbol: 'Bs.', p2pRate: 62.50 },
  { code: 'ARS', name: 'Peso Argentino', symbol: '$', p2pRate: 980.00 },
  { code: 'CLP', name: 'Peso Chileno', symbol: '$', p2pRate: 935.00 },
  { code: 'PEN', name: 'Sol Peruano', symbol: 'S/', p2pRate: 3.72 },
];

export const UserDashboard: React.FC<UserDashboardProps> = ({ 
  userEmail = 'carlos.mendoza@gmail.com', 
  userName = 'Carlos Mendoza', 
  onOpenTransfer 
}) => {
  const [sendCurr, setSendCurr] = useState('USD');
  const [recvCurr, setRecvCurr] = useState('MXN');
  const [calcAmount, setCalcAmount] = useState<number>(300);
  const [activeTab, setActiveTab] = useState<'overview' | 'calculator' | 'history'>('overview');

  const fromObj = CURRENCIES.find(c => c.code === sendCurr) || CURRENCIES[0];
  const toObj = CURRENCIES.find(c => c.code === recvCurr) || CURRENCIES[2];

  const inUSD = calcAmount / fromObj.p2pRate;
  const baseRecv = inUSD * toObj.p2pRate;
  const withMarkup = baseRecv * 1.07; // 7% markup

  return (
    <div className="py-12 bg-slate-50 min-h-screen text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-slate-900 via-[#0A192F] to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 bg-[#00aeef]/20 border border-[#00aeef]/40 px-3 py-1 rounded-full text-xs font-bold text-[#00aeef]">
              <User className="w-3.5 h-3.5" />
              <span>Panel de Usuario Verificado</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black">Bienvenido, {userName}</h1>
            <p className="text-slate-300 text-xs sm:text-sm">Gestiona tus remesas, revisa estadísticas en tiempo real y realiza envíos instantáneos.</p>
          </div>

          <button
            onClick={onOpenTransfer}
            className="bg-[#00aeef] hover:bg-[#0098d1] text-white font-bold px-6 py-4 rounded-2xl shadow-xl shadow-[#00aeef]/30 transition-all flex items-center space-x-2 text-sm shrink-0"
          >
            <Send className="w-4 h-4" />
            <span>Enviar Remesa Ahora</span>
          </button>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center space-x-3 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
              activeTab === 'overview' ? 'bg-[#00aeef] text-white shadow-md' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Resumen General y Estadísticas
          </button>
          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
              activeTab === 'calculator' ? 'bg-[#00aeef] text-white shadow-md' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Calculadora P2P y Tasas
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
              activeTab === 'history' ? 'bg-[#00aeef] text-white shadow-md' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Mis Movimientos ({USER_TRANSACTIONS.length})
          </button>
        </div>

        {/* Tab 1: Overview & Statistical Controls */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl">
                <span className="text-xs font-bold text-slate-500 uppercase block mb-2">Total Enviado (Histórico)</span>
                <h3 className="text-3xl font-black text-slate-900">$1,850.00</h3>
                <p className="text-xs text-emerald-600 font-semibold mt-1">3 remesas completadas</p>
              </div>

              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl">
                <span className="text-xs font-bold text-slate-500 uppercase block mb-2">Ahorro Estimado vs Bancos</span>
                <h3 className="text-3xl font-black text-[#00aeef]">$129.50</h3>
                <p className="text-xs text-slate-600 mt-1">Gracias a la tarifa óptima del 7%</p>
              </div>

              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl">
                <span className="text-xs font-bold text-slate-500 uppercase block mb-2">Nivel de Cuenta</span>
                <h3 className="text-2xl font-black text-slate-900">VIP Nivel 1</h3>
                <p className="text-xs text-emerald-600 font-semibold mt-1">Identidad Verificada (KYC)</p>
              </div>

              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl">
                <span className="text-xs font-bold text-slate-500 uppercase block mb-2">Tiempo Promedio Entrega</span>
                <h3 className="text-3xl font-black text-slate-900">8 min</h3>
                <p className="text-xs text-emerald-600 font-semibold mt-1">Sintonía Binance P2P activa</p>
              </div>
            </div>

            {/* Recent Activity & Quick Calculator Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-slate-900">Mis Últimas Transacciones</h3>
                  <button onClick={() => setActiveTab('history')} className="text-xs font-bold text-[#00aeef] hover:underline">Ver todas</button>
                </div>

                <div className="space-y-4">
                  {USER_TRANSACTIONS.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-mono font-bold text-[#00aeef] text-xs">{tx.code}</span>
                          <span className="text-xs text-slate-500">• {tx.destination}</span>
                        </div>
                        <h4 className="font-bold text-slate-900 text-sm mt-0.5">Para: {tx.recipient}</h4>
                      </div>
                      <div className="text-right">
                        <span className="font-black text-slate-900 text-sm">{tx.amountUSD}</span>
                        <span className="text-[11px] text-[#00aeef] font-bold block">{tx.amountReceived}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
                <h3 className="text-lg font-bold text-slate-900">Cotizador Rápido P2P</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-500 block mb-1">Monto a Enviar (USD)</label>
                    <input
                      type="number"
                      value={calcAmount}
                      onChange={(e) => setCalcAmount(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-lg text-slate-900 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-500 block mb-1">Moneda Destino</label>
                      <select
                        value={recvCurr}
                        onChange={(e) => setRecvCurr(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 font-bold text-xs text-slate-900 outline-none"
                      >
                        {CURRENCIES.map(c => (
                          <option key={c.code} value={c.code}>{c.code}</option>
                        ))}
                      </select>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col justify-center">
                      <span className="text-[10px] text-slate-500 font-bold">Destinatario Recibe:</span>
                      <span className="font-black text-sm text-[#00aeef] truncate">{withMarkup.toLocaleString(undefined, { maximumFractionDigits: 2 })} {recvCurr}</span>
                    </div>
                  </div>

                  <button
                    onClick={onOpenTransfer}
                    className="w-full bg-slate-900 hover:bg-[#00aeef] text-white font-bold py-3.5 rounded-xl transition-all text-xs"
                  >
                    Iniciar Envío con esta Cotización
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Calculator & Rates */}
        {activeTab === 'calculator' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8 animate-fadeIn">
            <div className="max-w-xl">
              <h3 className="text-2xl font-black text-slate-900 mb-2">Calculadora Avanzada PinPay P2P</h3>
              <p className="text-xs text-slate-600">Tasas sincronizadas en vivo con el mercado P2P de Binance e instituciones asociadas.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200">
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2">Monto en USD</label>
                  <input
                    type="number"
                    value={calcAmount}
                    onChange={(e) => setCalcAmount(Number(e.target.value))}
                    className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 font-black text-xl text-slate-900 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2">Divisa Destino</label>
                  <select
                    value={recvCurr}
                    onChange={(e) => setRecvCurr(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 font-bold text-sm text-slate-900 outline-none"
                  >
                    {CURRENCIES.map(c => (
                      <option key={c.code} value={c.code}>{c.code} - {c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Tasa Base P2P:</span>
                  <span className="font-bold text-slate-900">1 USD = {toObj.p2pRate} {toObj.code}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Tarifa Operativa (+7%):</span>
                  <span className="font-bold text-[#f43a8e]">+ 7.00%</span>
                </div>
                <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
                  <span className="font-bold text-slate-900 text-sm">Total a Recibir:</span>
                  <span className="font-black text-xl text-[#00aeef]">{withMarkup.toLocaleString(undefined, { maximumFractionDigits: 2 })} {toObj.code}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 text-base">Tabla de Tasas de Referencia P2P</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {CURRENCIES.map(c => (
                  <div key={c.code} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex justify-between items-center">
                    <div>
                      <span className="font-bold text-slate-900 text-sm">{c.code}</span>
                      <p className="text-[11px] text-slate-500 truncate max-w-[130px]">{c.name}</p>
                    </div>
                    <span className="font-bold text-xs text-[#00aeef]">{(c.p2pRate * 1.07).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: History */}
        {activeTab === 'history' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 animate-fadeIn">
            <h3 className="text-xl font-black text-slate-900">Historial Completo de Transacciones</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-xs font-bold text-slate-500 uppercase bg-slate-50">
                    <th className="p-4 rounded-l-xl">Código</th>
                    <th className="p-4">Beneficiario</th>
                    <th className="p-4">Destino</th>
                    <th className="p-4">Monto Enviado</th>
                    <th className="p-4">Monto Recibido</th>
                    <th className="p-4">Estado</th>
                    <th className="p-4 rounded-r-xl text-right">Fecha</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {USER_TRANSACTIONS.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-mono font-bold text-[#00aeef]">{tx.code}</td>
                      <td className="p-4 font-bold text-slate-900">{tx.recipient}</td>
                      <td className="p-4 font-semibold text-slate-700">{tx.destination}</td>
                      <td className="p-4 font-bold text-slate-900">{tx.amountUSD}</td>
                      <td className="p-4 font-bold text-[#00aeef]">{tx.amountReceived}</td>
                      <td className="p-4">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600">
                          Entregado
                        </span>
                      </td>
                      <td className="p-4 text-right text-xs text-slate-600">{tx.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
