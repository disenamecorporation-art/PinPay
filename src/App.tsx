import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { VisualShowcase } from './components/VisualShowcase';
import { HowItWorks } from './components/HowItWorks';
import { Benefits } from './components/Benefits';
import { TrackingWidget } from './components/TrackingWidget';
import { Testimonials } from './components/Testimonials';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { TransferModal } from './components/TransferModal';
import { AuthModal } from './components/AuthModal';
import { ChatAssistant } from './components/ChatAssistant';
import { StandaloneCalculator } from './components/StandaloneCalculator';
import { AdminPanel } from './components/AdminPanel';
import { UserDashboard } from './components/UserDashboard';
import { WhitepaperView } from './components/WhitepaperView';

export default function App() {
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'calculator' | 'admin' | 'dashboard' | 'vision'>('home');
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string, role?: 'admin' | 'user' } | null>(null);
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'login' | 'register' }>({
    isOpen: false,
    mode: 'login'
  });

  const handleOpenAuth = (mode: 'login' | 'register') => {
    setAuthModal({ isOpen: true, mode });
  };

  const handleCloseAuth = () => {
    setAuthModal((prev) => ({ ...prev, isOpen: false }));
  };

  const handleSuccessLogin = (name: string, email: string, role?: 'admin' | 'user') => {
    const finalRole = role || (email.toLowerCase().includes('admin') ? 'admin' : 'user');
    setCurrentUser({ name, email, role: finalRole });
    setActiveTab(finalRole === 'admin' ? 'admin' : 'dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab('home');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-[#00aeef] selection:text-white font-sans antialiased">
      {/* Navbar */}
      <Navbar 
        onOpenAuth={handleOpenAuth} 
        onOpenTransfer={() => setIsTransferOpen(true)}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {activeTab === 'home' ? (
        <>
          {/* Hero & Interactive Calculator */}
          <HeroSection 
            onOpenTransfer={() => setIsTransferOpen(true)} 
          />

          {/* Visual Showcase (Containing user's requested images & branding) */}
          <VisualShowcase />

          {/* How it works */}
          <HowItWorks />

          {/* Benefits */}
          <Benefits />

          {/* Live Tracking Widget */}
          <TrackingWidget />

          {/* Testimonials */}
          <Testimonials />

          {/* Final CTA */}
          <FinalCTA 
            onOpenTransfer={() => setIsTransferOpen(true)}
            onOpenRegister={() => handleOpenAuth('register')}
          />
        </>
      ) : activeTab === 'calculator' ? (
        <StandaloneCalculator />
      ) : activeTab === 'admin' ? (
        <AdminPanel />
      ) : activeTab === 'vision' ? (
        <WhitepaperView />
      ) : (
        <UserDashboard 
          userName={currentUser?.name || 'Carlos Mendoza'}
          userEmail={currentUser?.email || 'carlos.mendoza@gmail.com'}
          onOpenTransfer={() => setIsTransferOpen(true)}
        />
      )}

      {/* Footer */}
      <Footer onSelectTab={setActiveTab} currentUser={currentUser} />

      {/* Modals & Chat Assistant */}
      <TransferModal 
        isOpen={isTransferOpen} 
        onClose={() => setIsTransferOpen(false)} 
      />

      <AuthModal 
        isOpen={authModal.isOpen} 
        initialMode={authModal.mode} 
        onClose={handleCloseAuth} 
        onSuccessLogin={handleSuccessLogin}
      />

      <ChatAssistant />
    </div>
  );
}
