import React, { useState } from 'react';
import { X, ArrowRight, CheckCircle2, CreditCard, Building, User } from 'lucide-react';

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TransferModal: React.FC<TransferModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [amount, setAmount] = useState('500');
  const [country, setCountry] = useState('México (MXN)');
  const [recipientName, setRecipientName] = useState('');
  const [recipientAccount, setRecipientAccount] = useState('');
  const [bankName, setBankName] = useState('BBVA Bancomer');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank'>('card');
  const [trackingCode, setTrackingCode] = useState('');

  if (!isOpen) return null;

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (!recipientName || !recipientAccount) {
        alert('Por favor complete los datos del beneficiario.');
        return;
      }
      setStep(3);
    } else if (step === 3) {
      const randomCode = 'PIN-' + Math.floor(100000 + Math.random() * 900000);
      setTrackingCode(randomCode);
      setStep(4);
    }
  };

  const resetAndClose = () => {
    setStep(1);
    setRecipientName('');
    setRecipientAccount('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-xl p-6 sm:p-8 text-slate-900 relative shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        <button
          onClick={resetAndClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-700 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 text-[#00aeef] text-xs font-bold uppercase tracking-wider mb-1">
            <span>PinPay Express Transfer</span>
            <span>•</span>
            <span>Paso {step} de 4</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900">
            {step === 1 && 'Detalles del Envío'}
            {step === 2 && 'Datos del Beneficiario'}
            {step === 3 && 'Método de Pago y Confirmación'}
            {step === 4 && '¡Envío Exitoso!'}
          </h2>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-2 rounded-full mb-8 overflow-hidden">
          <div 
            className="bg-[#00aeef] h-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          ></div>
        </div>

        <form onSubmit={handleNext} className="space-y-6">
          {step === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-2">Monto a Enviar (USD)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-slate-900 font-bold text-lg outline-none focus:border-[#00aeef]"
                  required
                  min="10"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-2">País y Divisa de Destino</label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-slate-900 font-semibold outline-none"
                >
                  <option>México (MXN) - 1 USD = 17.15 MXN</option>
                  <option>Colombia (COP) - 1 USD = 4,120.50 COP</option>
                  <option>Venezuela (VES) - 1 USD = 36.40 VES</option>
                  <option>Rep. Dominicana (DOP) - 1 USD = 59.20 DOP</option>
                  <option>Perú (PEN) - 1 USD = 3.72 PEN</option>
                </select>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">Comisión:</span>
                  <span className="text-emerald-600 font-bold">$0.99 USD (Promoción primer envío)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Total a pagar:</span>
                  <span className="text-slate-900 font-bold">${(Number(amount) + 0.99).toFixed(2)} USD</span>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-2">Nombre completo del Beneficiario</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Ej. María Elena Rodríguez"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-slate-900 font-medium outline-none focus:border-[#00aeef]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-2">Banco Destino</label>
                <select
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-slate-900 font-semibold outline-none"
                >
                  <option>BBVA Bancomer</option>
                  <option>Banco de Bogotá</option>
                  <option>Bancolombia</option>
                  <option>Banco Mercantil</option>
                  <option>Banco BHD</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-2">Número de Cuenta / CLABE / IBAN</label>
                <div className="relative">
                  <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Ej. 012180001234567890"
                    value={recipientAccount}
                    onChange={(e) => setRecipientAccount(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-slate-900 font-medium outline-none focus:border-[#00aeef] font-mono"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === 'card' ? 'bg-[#00aeef]/10 border-[#00aeef] text-slate-900' : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  <CreditCard className="w-6 h-6 text-[#00aeef] mb-2" />
                  <span className="font-bold text-sm">Tarjeta Débito/Crédito</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('bank')}
                  className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === 'bank' ? 'bg-[#00aeef]/10 border-[#00aeef] text-slate-900' : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  <Building className="w-6 h-6 text-[#f43a8e] mb-2" />
                  <span className="font-bold text-sm">Transferencia Bancaria</span>
                </button>
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <input
                    type="text"
                    placeholder="Número de Tarjeta (4532 •••• •••• 8921)"
                    defaultValue="4532 8920 1293 8921"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-mono text-sm outline-none"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="MM/AA"
                      defaultValue="08/28"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-mono text-sm outline-none"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      defaultValue="389"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-mono text-sm outline-none"
                    />
                  </div>
                </div>
              )}

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2 text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">Monto a enviar:</span>
                  <span className="font-bold text-slate-900">${amount} USD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Beneficiario:</span>
                  <span className="font-bold text-slate-900">{recipientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Banco:</span>
                  <span className="font-bold text-slate-900">{bankName}</span>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center space-y-6 animate-fadeIn py-4">
              <div className="w-20 h-20 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center text-emerald-600 mx-auto animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-slate-900">¡Transferencia en Proceso!</h3>
                <p className="text-sm text-slate-600">
                  Tu dinero ha sido procesado de forma segura y está en camino hacia tu beneficiario.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 inline-block">
                <span className="text-xs text-slate-500 block mb-1">Tu código de seguimiento</span>
                <span className="text-xl font-mono font-bold text-[#00aeef]">{trackingCode}</span>
              </div>

              <button
                type="button"
                onClick={resetAndClose}
                className="w-full bg-[#00aeef] hover:bg-[#0098d1] text-white font-bold py-4 rounded-2xl shadow-xl shadow-[#00aeef]/25 transition-all"
              >
                Finalizar y Ver Estado
              </button>
            </div>
          )}

          {step < 4 && (
            <div className="flex space-x-3 pt-4">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep((s) => (s - 1) as any)}
                  className="w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3.5 rounded-2xl border border-slate-200 transition-all text-sm"
                >
                  Anterior
                </button>
              )}
              <button
                type="submit"
                className={`${step > 1 ? 'w-2/3' : 'w-full'} bg-[#00aeef] hover:bg-[#0098d1] text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-[#00aeef]/25 transition-all flex items-center justify-center space-x-2 text-sm`}
              >
                <span>{step === 3 ? 'Confirmar y Enviar' : 'Continuar'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
