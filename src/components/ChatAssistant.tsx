import React from 'react';
import { MessageSquare } from 'lucide-react';

export const ChatAssistant: React.FC = () => {
  const whatsappUrl = "https://wa.me/584123946476?text=Hola%20PinPay,%20necesito%20soporte%20con%20una%20remesa.";

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#00aeef] hover:bg-[#0098d1] text-white p-4 rounded-full shadow-2xl shadow-[#00aeef]/40 flex items-center space-x-2 transition-all transform hover:scale-105"
        title="Soporte WhatsApp PinPay"
      >
        <MessageSquare className="w-6 h-6" />
        <span className="text-sm font-bold pr-1 hidden sm:inline">Soporte PinPay</span>
      </a>
    </div>
  );
};

