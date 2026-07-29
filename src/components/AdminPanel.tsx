import React, { useState } from 'react';
import { 
  Users, 
  ArrowLeftRight, 
  TrendingUp, 
  ShieldAlert, 
  DollarSign, 
  Search, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Plus, 
  Settings, 
  BarChart2, 
  FileText,
  RefreshCw,
  Sliders
} from 'lucide-react';

interface UserRecord {
  id: string;
  name: string;
  email: string;
  country: string;
  status: 'active' | 'suspended' | 'pending';
  joinedDate: string;
  totalSent: string;
}

interface TransactionRecord {
  id: string;
  code: string;
  sender: string;
  recipient: string;
  destination: string;
  amountUSD: string;
  amountReceived: string;
  status: 'delivered' | 'in_transit' | 'processing' | 'flagged';
  date: string;
}

interface ExchangeRateRecord {
  code: string;
  name: string;
  p2pRate: number;
  lastUpdated: string;
}

const INITIAL_USERS: UserRecord[] = [
  { id: 'u-1', name: 'Carlos Mendoza', email: 'carlos.mendoza@gmail.com', country: 'México 🇲🇽', status: 'active', joinedDate: '12 Ene 2026', totalSent: '$4,500.00' },
  { id: 'u-2', name: 'María Elena Gómez', email: 'maria.gomez@outlook.com', country: 'Colombia 🇨🇴', status: 'active', joinedDate: '19 Feb 2026', totalSent: '$2,150.00' },
  { id: 'u-3', name: 'José Alejandro Ramírez', email: 'jose.ramirez@yahoo.es', country: 'Venezuela 🇻🇪', status: 'active', joinedDate: '04 Mar 2026', totalSent: '$8,900.00' },
  { id: 'u-4', name: 'Valeria Cárdenas', email: 'valeria.card@empresa.com', country: 'Estados Unidos 🇺🇸', status: 'suspended', joinedDate: '22 Mar 2026', totalSent: '$150.00' },
  { id: 'u-5', name: 'Mateo Fernández', email: 'mateo.arch@gmail.com', country: 'Chile 🇨🇱', status: 'active', joinedDate: '10 Abr 2026', totalSent: '$1,200.00' },
];

const INITIAL_TRANSACTIONS: TransactionRecord[] = [
  { id: 'tx-101', code: 'PIN-849204', sender: 'Carlos Mendoza', recipient: 'Rosa Mendoza', destination: 'México (MXN)', amountUSD: '$500.00', amountReceived: '8,575.00 MXN', status: 'delivered', date: '29 Jul 2026' },
  { id: 'tx-102', code: 'PIN-910283', sender: 'María Elena Gómez', recipient: 'Pedro Gómez', destination: 'Colombia (COP)', amountUSD: '$350.00', amountReceived: '1,442,175.00 COP', status: 'in_transit', date: '29 Jul 2026' },
  { id: 'tx-103', code: 'PIN-554109', sender: 'José Alejandro Ramírez', recipient: 'Carmen Soto', destination: 'Venezuela (VES)', amountUSD: '$1,000.00', amountReceived: '62,500.00 VES', status: 'processing', date: '28 Jul 2026' },
  { id: 'tx-104', code: 'PIN-773829', sender: 'Mateo Fernández', recipient: 'Lucia Fernández', destination: 'Chile (CLP)', amountUSD: '$750.00', amountReceived: '701,250.00 CLP', status: 'delivered', date: '27 Jul 2026' },
  { id: 'tx-105', code: 'PIN-332910', sender: 'Sofía Valdés', recipient: 'Marcos Valdés', destination: 'Argentina (ARS)', amountUSD: '$200.00', amountReceived: '196,000.00 ARS', status: 'flagged', date: '26 Jul 2026' },
];

const INITIAL_RATES: ExchangeRateRecord[] = [
  { code: 'USD', name: 'Dólar Estadounidense', p2pRate: 1.00, lastUpdated: 'Hace 5 min' },
  { code: 'EUR', name: 'Euro', p2pRate: 0.92, lastUpdated: 'Hace 5 min' },
  { code: 'MXN', name: 'Peso Mexicano', p2pRate: 17.15, lastUpdated: 'Hace 2 min' },
  { code: 'COP', name: 'Peso Colombiano', p2pRate: 4120.00, lastUpdated: 'Hace 1 min' },
  { code: 'VES', name: 'Bolívar Venezolano (Binance P2P)', p2pRate: 62.50, lastUpdated: 'En vivo (Binance P2P)' },
  { code: 'ARS', name: 'Peso Argentino', p2pRate: 980.00, lastUpdated: 'Hace 10 min' },
  { code: 'BRL', name: 'Real Brasileño', p2pRate: 5.45, lastUpdated: 'Hace 4 min' },
  { code: 'CLP', name: 'Peso Chileno', p2pRate: 935.00, lastUpdated: 'Hace 7 min' },
  { code: 'PEN', name: 'Sol Peruano', p2pRate: 3.72, lastUpdated: 'Hace 12 min' },
  { code: 'PAB', name: 'Balboa Panameño', p2pRate: 1.00, lastUpdated: 'Hace 1 min' },
  { code: 'DOP', name: 'Peso Dominicano', p2pRate: 59.20, lastUpdated: 'Hace 15 min' },
];

export const AdminPanel: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'users' | 'transactions' | 'rates' | 'reports'>('overview');
  const [users, setUsers] = useState<UserRecord[]>(INITIAL_USERS);
  const [transactions, setTransactions] = useState<TransactionRecord[]>(INITIAL_TRANSACTIONS);
  const [rates, setRates] = useState<ExchangeRateRecord[]>(INITIAL_RATES);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRateCode, setSelectedRateCode] = useState('VES');
  const [newRateValue, setNewRateValue] = useState('62.50');
  const [successMsg, setSuccessMsg] = useState('');

  const handleUpdateRate = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(newRateValue);
    if (isNaN(val)) return;

    setRates(rates.map(r => r.code === selectedRateCode ? { ...r, p2pRate: val, lastUpdated: 'Actualizado ahora' } : r));
    setSuccessMsg(`Tasa P2P para ${selectedRateCode} actualizada exitosamente a ${val}.`);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const toggleUserStatus = (id: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'suspended' : 'active' } : u));
  };

  return (
    <div className="py-12 bg-slate-100 min-h-screen text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Header */}
        <div className="bg-gradient-to-r from-slate-900 to-[#0A192F] text-white rounded-3xl p-6 sm:p-10 mb-8 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 bg-[#00aeef]/20 border border-[#00aeef]/40 px-3 py-1 rounded-full text-xs font-bold text-[#00aeef] mb-3">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Panel de Control Administrativo PinPay</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white">Gestión y Operaciones</h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">Control centralizado de usuarios, transacciones P2P, tasas de cambio y reportes financieros.</p>
          </div>
          
          <div className="flex items-center space-x-3 bg-white/10 border border-white/20 px-4 py-3 rounded-2xl">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></div>
            <div className="text-xs">
              <span className="text-slate-300 block">Sistema Operativo</span>
              <span className="font-bold text-white">Servidores Binance P2P En Línea</span>
            </div>
          </div>
        </div>

        {successMsg && (
          <div className="mb-6 bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 p-4 rounded-2xl flex items-center space-x-3 text-sm font-semibold animate-fadeIn">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Admin Navigation Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8">
          <button
            onClick={() => setActiveSubTab('overview')}
            className={`px-5 py-3 rounded-2xl font-bold text-sm transition-all flex items-center space-x-2 shrink-0 ${
              activeSubTab === 'overview' ? 'bg-[#00aeef] text-white shadow-lg shadow-[#00aeef]/25' : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            <BarChart2 className="w-4 h-4" />
            <span>Resumen y Estadísticas</span>
          </button>
          <button
            onClick={() => setActiveSubTab('users')}
            className={`px-5 py-3 rounded-2xl font-bold text-sm transition-all flex items-center space-x-2 shrink-0 ${
              activeSubTab === 'users' ? 'bg-[#00aeef] text-white shadow-lg shadow-[#00aeef]/25' : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Gestión de Usuarios ({users.length})</span>
          </button>
          <button
            onClick={() => setActiveSubTab('transactions')}
            className={`px-5 py-3 rounded-2xl font-bold text-sm transition-all flex items-center space-x-2 shrink-0 ${
              activeSubTab === 'transactions' ? 'bg-[#00aeef] text-white shadow-lg shadow-[#00aeef]/25' : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            <ArrowLeftRight className="w-4 h-4" />
            <span>Movimientos y Transacciones</span>
          </button>
          <button
            onClick={() => setActiveSubTab('rates')}
            className={`px-5 py-3 rounded-2xl font-bold text-sm transition-all flex items-center space-x-2 shrink-0 ${
              activeSubTab === 'rates' ? 'bg-[#00aeef] text-white shadow-lg shadow-[#00aeef]/25' : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            <RefreshCw className="w-4 h-4" />
            <span>Tasas y Binance P2P (VES)</span>
          </button>
          <button
            onClick={() => setActiveSubTab('reports')}
            className={`px-5 py-3 rounded-2xl font-bold text-sm transition-all flex items-center space-x-2 shrink-0 ${
              activeSubTab === 'reports' ? 'bg-[#00aeef] text-white shadow-lg shadow-[#00aeef]/25' : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Reportes Financieros</span>
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeSubTab === 'overview' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-slate-500 uppercase">Volumen Total (Mes)</span>
                  <div className="w-10 h-10 bg-[#00aeef]/10 rounded-xl flex items-center justify-center text-[#00aeef]">
                    <DollarSign className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-3xl font-black text-slate-900">$1,482,900</h3>
                <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center space-x-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+18.4% vs mes anterior</span>
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-slate-500 uppercase">Transacciones Exitosas</span>
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-600">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-3xl font-black text-slate-900">12,480</h3>
                <p className="text-xs text-emerald-600 font-semibold mt-1">99.4% tasa de efectividad</p>
              </div>

              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-slate-500 uppercase">Usuarios Registrados</span>
                  <div className="w-10 h-10 bg-[#f43a8e]/10 rounded-xl flex items-center justify-center text-[#f43a8e]">
                    <Users className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-3xl font-black text-slate-900">512,890</h3>
                <p className="text-xs text-[#00aeef] font-semibold mt-1">+3,200 esta semana</p>
              </div>

              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-slate-500 uppercase">Comisiones Generadas (7%)</span>
                  <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-600">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-3xl font-black text-slate-900">$103,803</h3>
                <p className="text-xs text-emerald-600 font-semibold mt-1">Margen operativo óptimo</p>
              </div>
            </div>

            {/* Quick Activity & VES Status */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Últimas Transacciones del Sistema</h3>
                <div className="space-y-4">
                  {transactions.slice(0, 4).map(tx => (
                    <div key={tx.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-mono font-bold text-[#00aeef] text-xs">{tx.code}</span>
                          <span className="text-xs text-slate-500">• {tx.destination}</span>
                        </div>
                        <h4 className="font-bold text-slate-900 text-sm mt-0.5">{tx.sender}</h4>
                      </div>
                      <div className="text-right">
                        <span className="font-black text-slate-900 text-sm">{tx.amountUSD}</span>
                        <span className={`text-[10px] block font-bold ${tx.status === 'delivered' ? 'text-emerald-600' : 'text-amber-600'}`}>
                          {tx.status === 'delivered' ? 'Entregado' : 'En Tránsito'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
                <h3 className="text-lg font-bold text-slate-900">Estado de Divisas y Binance P2P (VES)</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  El tipo de cambio del Bolívar Venezolano (VES) se actualiza automáticamente mediante sintonía directa con cotizaciones P2P en USDT de Binance y promedios de mercado.
                </p>

                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Divisa Principal:</span>
                    <span className="font-bold text-slate-900">Bolívar Venezolano (VES)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Tasa P2P Actual (1 USD):</span>
                    <span className="font-bold text-[#00aeef] text-base">62.50 VES</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Última Sincronización:</span>
                    <span className="font-semibold text-emerald-600">Hace 2 minutos (Automática)</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveSubTab('rates')}
                  className="w-full bg-[#00aeef] hover:bg-[#0098d1] text-white font-bold py-3.5 rounded-2xl transition-all shadow-lg shadow-[#00aeef]/25 text-sm"
                >
                  Modificar Tasas o Ajustar VES Manualmente
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Users Management */}
        {activeSubTab === 'users' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <h3 className="text-xl font-black text-slate-900">Directorio de Usuarios Registrados</h3>
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar usuario..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 outline-none focus:border-[#00aeef]"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-xs font-bold text-slate-500 uppercase bg-slate-50">
                    <th className="p-4 rounded-l-xl">Usuario / Email</th>
                    <th className="p-4">País</th>
                    <th className="p-4">Fecha Registro</th>
                    <th className="p-4">Volumen Enviado</th>
                    <th className="p-4">Estado</th>
                    <th className="p-4 rounded-r-xl text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {users.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase())).map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-slate-900">{u.name}</div>
                        <div className="text-xs text-slate-500">{u.email}</div>
                      </td>
                      <td className="p-4 font-semibold text-slate-700">{u.country}</td>
                      <td className="p-4 text-xs text-slate-600">{u.joinedDate}</td>
                      <td className="p-4 font-bold text-[#00aeef]">{u.totalSent}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          u.status === 'active' ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-600 border border-rose-500/20'
                        }`}>
                          {u.status === 'active' ? 'Activo' : 'Suspendido'}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => toggleUserStatus(u.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                            u.status === 'active' ? 'bg-rose-50 hover:bg-rose-100 text-rose-600' : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-600'
                          }`}
                        >
                          {u.status === 'active' ? 'Suspender' : 'Activar'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Transactions */}
        {activeSubTab === 'transactions' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-black text-slate-900">Control de Movimientos y Remesas</h3>
              <span className="text-xs bg-[#00aeef]/10 text-[#00aeef] px-3 py-1 rounded-full font-bold">Total: {transactions.length} registros</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-xs font-bold text-slate-500 uppercase bg-slate-50">
                    <th className="p-4 rounded-l-xl">Código</th>
                    <th className="p-4">Remitente / Destinatario</th>
                    <th className="p-4">Destino</th>
                    <th className="p-4">Monto Envío</th>
                    <th className="p-4">Monto Recibido</th>
                    <th className="p-4">Estado</th>
                    <th className="p-4 rounded-r-xl text-right">Fecha</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-mono font-bold text-[#00aeef]">{tx.code}</td>
                      <td className="p-4">
                        <div className="font-bold text-slate-900">{tx.sender}</div>
                        <div className="text-xs text-slate-500">Para: {tx.recipient}</div>
                      </td>
                      <td className="p-4 font-semibold text-slate-700">{tx.destination}</td>
                      <td className="p-4 font-bold text-slate-900">{tx.amountUSD}</td>
                      <td className="p-4 font-bold text-[#00aeef]">{tx.amountReceived}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          tx.status === 'delivered' ? 'bg-emerald-500/10 text-emerald-600' :
                          tx.status === 'in_transit' ? 'bg-[#00aeef]/10 text-[#00aeef]' :
                          tx.status === 'processing' ? 'bg-amber-500/10 text-amber-600' :
                          'bg-rose-500/10 text-rose-600'
                        }`}>
                          {tx.status === 'delivered' ? 'Entregado' : tx.status === 'in_transit' ? 'En Tránsito' : tx.status === 'processing' ? 'Procesando' : 'Revisión'}
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

        {/* Tab 4: Rates & Binance P2P VES */}
        {activeSubTab === 'rates' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn">
            <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
              <h3 className="text-xl font-black text-slate-900">Actualización de Tasa Binance P2P (Especial VES)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Aquí puedes actualizar manualmente la cotización del Bolívar Venezolano (VES) u otras monedas basándote en la tasa de USDT en Binance P2P o DolarToday / EnParaleloVzla.
              </p>

              <form onSubmit={handleUpdateRate} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-2">Seleccionar Moneda</label>
                  <select
                    value={selectedRateCode}
                    onChange={(e) => {
                      setSelectedRateCode(e.target.value);
                      const found = rates.find(r => r.code === e.target.value);
                      if (found) setNewRateValue(found.p2pRate.toString());
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 font-bold outline-none"
                  >
                    {rates.map(r => (
                      <option key={r.code} value={r.code}>{r.code} - {r.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-2">Nueva Tasa P2P por 1 USD</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newRateValue}
                    onChange={(e) => setNewRateValue(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 font-bold text-lg outline-none focus:border-[#00aeef]"
                    required
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">Ejemplo actual Binance P2P VES: ~62.50 Bs por 1 USD.</span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#00aeef] hover:bg-[#0098d1] text-white font-bold py-4 rounded-2xl shadow-lg shadow-[#00aeef]/25 transition-all text-sm"
                >
                  Guardar y Sincronizar Tasa Global
                </button>
              </form>
            </div>

            <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
              <h3 className="text-xl font-black text-slate-900">Listado de Tasas Activas</h3>
              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                {rates.map(r => (
                  <div key={r.code} className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{r.code} - {r.name}</h4>
                      <span className="text-[11px] text-slate-500">{r.lastUpdated}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-black text-[#00aeef] text-base">{r.p2pRate.toFixed(2)}</span>
                      <span className="text-[10px] text-slate-400 block">por 1 USD</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Reports */}
        {activeSubTab === 'reports' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 animate-fadeIn">
            <h3 className="text-xl font-black text-slate-900">Reportes Financieros y Estadísticos</h3>
            <p className="text-xs text-slate-600">Genera reportes detallados en formato CSV o PDF para contabilidad y cumplimiento AML.</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
                <h4 className="font-bold text-slate-900 text-base">Reporte de Transacciones Mensual</h4>
                <p className="text-xs text-slate-600">Detalle completo de todas las remesas enviadas y recibidas en Julio 2026.</p>
                <button 
                  onClick={() => alert('Reporte CSV descargado exitosamente: Reporte_Transacciones_PinPay_Julio2026.csv')}
                  className="w-full bg-[#00aeef] hover:bg-[#0098d1] text-white font-bold py-3 rounded-xl text-xs transition-all shadow-md"
                >
                  Descargar CSV / Excel
                </button>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
                <h4 className="font-bold text-slate-900 text-base">Auditoría de Comisiones (7%)</h4>
                <p className="text-xs text-slate-600">Resumen de ingresos por comisiones operativas y márgenes cambiarios.</p>
                <button 
                  onClick={() => alert('Reporte de Auditoría descargado: Auditoria_Comisiones_PinPay.pdf')}
                  className="w-full bg-[#00aeef] hover:bg-[#0098d1] text-white font-bold py-3 rounded-xl text-xs transition-all shadow-md"
                >
                  Descargar PDF Oficial
                </button>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
                <h4 className="font-bold text-slate-900 text-base">Cumplimiento AML y KYC</h4>
                <p className="text-xs text-slate-600">Registro de usuarios verificados y alertas de seguridad procesadas.</p>
                <button 
                  onClick={() => alert('Reporte AML descargado: Reporte_Cumplimiento_AML.pdf')}
                  className="w-full bg-[#00aeef] hover:bg-[#0098d1] text-white font-bold py-3 rounded-xl text-xs transition-all shadow-md"
                >
                  Descargar Reporte AML
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
