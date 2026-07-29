import React, { useState } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';

export const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string }>>([
    { sender: 'bot', text: '¡Hola! Soy tu asistente virtual de PinPay 🤖. ¿Cómo puedo ayudarte hoy con tus remesas o tipos de cambio?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');

    setTimeout(() => {
      let botReply = 'Entiendo perfectamente. Para envíos internacionales con PinPay, garantizamos tasa fija y entrega en minutos. ¿Te gustaría realizar una cotización?';
      const lower = userMsg.toLowerCase();
      if (lower.includes('comision') || lower.includes('costo') || lower.includes('tarifa')) {
        botReply = '¡Nuestros envíos tienen una tarifa muy baja desde $0.99 USD, y tu primer envío es totalmente gratis!';
      } else if (lower.includes('tiempo') || lower.includes('tarda') || lower.includes('cuanto')) {
        botReply = 'El 95% de nuestras remesas llegan en menos de 5 minutos directamente al banco o punto de retiro de tu beneficiario.';
      } else if (lower.includes('seguro') || lower.includes('confianza')) {
        botReply = 'Sí, PinPay está regulado internacionalmente y utiliza encriptación bancaria SSL de 256 bits para proteger tus transacciones.';
      }

      setMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#00aeef] hover:bg-[#0098d1] text-white p-4 rounded-full shadow-2xl shadow-[#00aeef]/40 flex items-center space-x-2 transition-all transform hover:scale-105"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="text-sm font-bold pr-1 hidden sm:inline">Soporte PinPay</span>
        </button>
      )}

      {isOpen && (
        <div className="bg-white border border-slate-200 rounded-3xl w-80 sm:w-96 shadow-2xl overflow-hidden flex flex-col h-[480px] animate-fadeIn text-slate-900">
          {/* Header */}
          <div className="bg-slate-900 p-4 border-b border-slate-800 flex items-center justify-between text-white">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-[#00aeef]/20 border border-[#00aeef]/40 rounded-full flex items-center justify-center text-[#00aeef]">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Asistente PinPay</h4>
                <p className="text-[11px] text-emerald-400 flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>En línea 24/7</span>
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#00aeef] text-white rounded-br-none font-medium'
                      : 'bg-white text-slate-700 border border-slate-200 rounded-bl-none shadow-xs'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex items-center space-x-2">
            <input
              type="text"
              placeholder="Escribe tu consulta..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 outline-none focus:border-[#00aeef]"
            />
            <button
              type="submit"
              className="bg-[#00aeef] hover:bg-[#0098d1] text-white p-2.5 rounded-xl transition-colors shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
