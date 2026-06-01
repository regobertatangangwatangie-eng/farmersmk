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
import AdminService from './AdminService';
import PaymentService from './PaymentService';
import ServiceCatalogPage from './ServiceCatalogPage';

const landingHighlights = [
  {
    title: 'School Service',
    description: 'Registration, class list, fees, and school dashboard',
  },
  {
    title: 'Communication Service',
    description: 'Messages, coordination, and updates',
  },
  {
    title: 'Marketplace',
    description: 'Trading and service visibility',
  },
  {
    title: 'Grant Service',
    description: 'Support and funding workflows',
  },
  {
    title: 'Admin Service',
    description: 'Platform administration and monitoring',
  },
  {
    title: 'Payment Service',
    description: 'Collections, transfers, and transaction pricing',
  },
  {
    title: 'Cryptocurrency Wallet',
    description: 'Digital payments and account actions',
  },
  {
    title: 'Farmer Tools',
    description: 'Business services that connect producers, buyers, and partners',
  },
];

const catalogServiceSlugs = {
  'Subscription Plans': 'subscription-plans',
  'Common Library': 'common-library',
  'Android App': 'android-app',
  'Social Media': 'social-media',
};

function ServiceBackButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'fixed',
        top: 18,
        left: 18,
        zIndex: 50,
        border: 'none',
        borderRadius: 999,
        padding: '10px 14px',
        background: '#0f172a',
        color: '#fff',
        cursor: 'pointer',
        boxShadow: '0 12px 24px rgba(15, 23, 42, 0.2)',
      }}
    >
      ← All Services
    </button>
  );
}

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
  if (activeService === 'Payment') {
    return (
      <>
        <ServiceBackButton onClick={() => setActiveService(null)} />
        <PaymentService />
      </>
    );
  }
  if (activeService === 'Admin Service') {
    return (
      <>
        <ServiceBackButton onClick={() => setActiveService(null)} />
        <AdminService />
      </>
    );
  }
  if (catalogServiceSlugs[activeService]) {
    return (
      <>
        <ServiceBackButton onClick={() => setActiveService(null)} />
        <ServiceCatalogPage slug={catalogServiceSlugs[activeService]} />
      </>
    );
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
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #eef7f0 0%, #f8fafc 100%)', padding: '48px 20px' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 28, alignItems: 'stretch' }}>
        <section style={{ borderRadius: 24, padding: 32, boxShadow: '0 18px 50px rgba(15, 33, 55, 0.10)', background: '#f7fff8' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 14px', borderRadius: 999, background: '#eaf7ee', color: '#146c43', fontWeight: 700, marginBottom: 18 }}>
            Farmers MK Platform
          </div>
          <h1 style={{ fontSize: 56, lineHeight: 1.02, margin: '0 0 16px', color: '#0f172a' }}>Welcome to Farmers MK</h1>
          <p style={{ fontSize: 18, lineHeight: 1.7, color: '#334155', maxWidth: 700, marginBottom: 24 }}>
            A connected platform for school services, communication, marketplace activity, grants, payments, and digital tools.
            Sign in or sign up to continue into the services dashboard.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 28 }}>
            {landingHighlights.map((item) => (
              <div key={item.title} style={{ background: '#fff', borderRadius: 18, padding: 16, border: '1px solid #e2e8f0', boxShadow: '0 8px 24px rgba(15, 23, 42, 0.05)' }}>
                <div style={{ fontWeight: 800, color: '#0f172a', marginBottom: 6 }}>{item.title}</div>
                <div style={{ color: '#475569', fontSize: 14, lineHeight: 1.5 }}>{item.description}</div>
              </div>
            ))}
          </div>
          <AdDisplay />
        </section>
        <aside style={{ background: '#fff', borderRadius: 24, padding: 32, boxShadow: '0 18px 50px rgba(15, 33, 55, 0.10)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 24 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#0f766e', marginBottom: 12 }}>
              What Farmers MK is about
            </div>
            <h2 style={{ fontSize: 28, lineHeight: 1.2, margin: '0 0 12px', color: '#0f172a' }}>
              One place for farmers, schools, buyers, and partner services.
            </h2>
            <p style={{ margin: 0, color: '#475569', lineHeight: 1.7, fontSize: 15 }}>
              Farmers MK brings together trading, communication, education, grants, payments, and wallet features so users can move from discovery to action without leaving the platform.
            </p>
          </div>
          <div style={{ display: 'grid', gap: 12 }}>
            <div style={{ padding: 14, borderRadius: 16, background: '#f8fafc', border: '1px solid #e2e8f0', color: '#1e293b' }}>
              Track services, discover opportunities, and manage transactions from a single dashboard.
            </div>
            <div style={{ padding: 14, borderRadius: 16, background: '#f8fafc', border: '1px solid #e2e8f0', color: '#1e293b' }}>
              Use Sign Up if you are new to Farmers MK, or Sign In to continue where you left off.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <SignupButton onClick={() => setMode('signup')} />
            <SigninButton onClick={() => setMode('signin')} />
          </div>
        </aside>
      </div>
    </div>
  );
}
