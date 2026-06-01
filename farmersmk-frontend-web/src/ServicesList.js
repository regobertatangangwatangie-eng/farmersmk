import React from 'react';

const services = [
  { name: 'Communication Service', blurb: 'Messages, groups, communities, and real-time updates.', gradient: 'linear-gradient(135deg, #4CAF50 0%, #2196F3 100%)' },
  { name: 'Marketplace', blurb: 'Farmer, buyer, company, and security workflows.', gradient: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)' },
  { name: 'School Service', blurb: 'Registration, class lists, fees, teachers, and payslips.', gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)' },
  { name: 'Grant Service', blurb: 'Registration, voting flow, and pitching submission.', gradient: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)' },
  { name: 'Cryptocurrency Wallet', blurb: 'Wallet access, profile, and crypto service tools.', gradient: 'linear-gradient(135deg, #0ea5e9 0%, #14b8a6 100%)' },
  { name: 'Payment', blurb: 'Collections, subscriptions, recurring billing, and transaction history.', gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' },
  { name: 'Common Library', blurb: 'Training, certification, books, and audio resources.', gradient: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)' },
  { name: 'Android App', blurb: 'Android subscriptions and white-label mobile app offerings.', gradient: 'linear-gradient(135deg, #f97316 0%, #fb7185 100%)' },
  { name: 'Social Media', blurb: 'Sponsored content, communities, events, and promotion.', gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' },
  { name: 'Subscription Plans', blurb: 'Platform pricing tiers for Farmers MK access.', gradient: 'linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)' },
  { name: 'Admin Service', blurb: 'Operational oversight, service status, and platform monitoring.', gradient: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)' },
];

export default function ServicesList({ onServiceClick }) {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #f8fafc 0%, #eef7f0 100%)', padding: '48px 20px' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <h2 style={{ margin: '0 0 10px', color: '#0f172a' }}>All Services</h2>
        <p style={{ margin: '0 0 28px', color: '#475569', lineHeight: 1.7 }}>
          Choose a Farmers MK service to open its current working dashboard or catalog.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
          {services.map((service) => (
            <button
              key={service.name}
              onClick={() => onServiceClick(service.name)}
              style={{
                padding: '20px 18px',
                fontSize: 18,
                borderRadius: 18,
                border: 'none',
                background: service.gradient,
                color: '#fff',
                boxShadow: '0 16px 30px rgba(15,23,42,0.14)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'transform 0.1s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <div style={{ fontWeight: 800, marginBottom: 8 }}>{service.name}</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.92)', lineHeight: 1.6 }}>{service.blurb}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
