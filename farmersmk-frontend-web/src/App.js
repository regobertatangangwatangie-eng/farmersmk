import React, { useState } from 'react';
import { SignupButton, SigninButton } from './AuthButtons';
import AuthForm from './AuthForm';
import ServicesList from './ServicesList';
import MarketplaceDashboard from './MarketplaceDashboard';
import CommunicationService from './CommunicationService';
import GrantService from './GrantService';
import SchoolService from './SchoolService';
import WalletDashboard from './WalletDashboard';
import CryptoWalletAuth from './CryptoWalletAuth';
import CryptoWalletDashboard from './CryptoWalletDashboard';
import CryptoExchangeDashboard from './CryptoExchangeDashboard';
import CryptoProfileDashboard from './CryptoProfileDashboard';
import CryptoServicesDashboard from './CryptoServicesDashboard';
import AdDisplay from './components/AdDisplay';

export default function App() {
  // All hooks must be at the top level
  const [mode, setMode] = useState(null); // null | 'signup' | 'signin'
  const [activeService, setActiveService] = useState(null);
  const [cryptoWalletUser, setCryptoWalletUser] = useState(null);
  const [walletTab, setWalletTab] = useState('wallet'); // 'wallet' | 'exchange'
  const [showProfile, setShowProfile] = useState(false);
  const [showServices, setShowServices] = useState(false);

  const handleAuth = (formData) => {
    setShowServices(true);
  };

  if (activeService === 'Marketplace') {
    return <MarketplaceDashboard />;
  }
  if (activeService === 'Communication Service') {
    return <CommunicationService />;
  }
  if (activeService === 'Grant Service') {
    return <GrantService />;
  }
  if (activeService === 'School Service') {
    return <SchoolService />;
  }
  if (activeService === 'Cryptocurrency Wallet') {
    if (!cryptoWalletUser) {
      return <CryptoWalletAuth onAuth={user => setCryptoWalletUser(user)} />;
    }
    if (showServices) {
      return <CryptoServicesDashboard onBack={() => setShowServices(false)} />;
    }
    if (showProfile) {
      return <CryptoProfileDashboard user={cryptoWalletUser} onBack={() => setShowProfile(false)} onShowServices={() => setShowServices(true)} />;
    }
    if (walletTab === 'exchange') {
      return <CryptoExchangeDashboard onSwitchWallet={() => setWalletTab('wallet')} onShowProfile={() => setShowProfile(true)} />;
    }
    return <CryptoWalletDashboard user={cryptoWalletUser} onSwitchExchange={() => setWalletTab('exchange')} onShowProfile={() => setShowProfile(true)} />;
  }

  if (showServices) {
    return <ServicesList onServiceClick={service => setActiveService(service)} />;
  }

  if (mode) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f5f7fa' }}>
      <AuthForm mode={mode} onSubmit={handleAuth} />
    </div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 40 }}>
      <h1>Welcome to farmersmk</h1>
      <AdDisplay />
      <div>
        <SignupButton onClick={() => setMode('signup')} />
        <SigninButton onClick={() => setMode('signin')} />
      </div>
    </div>
  );
}
