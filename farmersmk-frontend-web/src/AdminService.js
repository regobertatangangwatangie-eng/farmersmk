import React from 'react';

const panels = [
  {
    title: 'Platform Health',
    value: 'Stable',
    description: 'Core Farmers MK services are available for onboarding, transactions, and content access.',
    accent: '#0f766e',
  },
  {
    title: 'Active Service Areas',
    value: '8+',
    description: 'Marketplace, school, communication, grants, payment, wallet, library, Android, and social tools.',
    accent: '#0284c7',
  },
  {
    title: 'Admin Focus',
    value: 'Oversight',
    description: 'Track registrations, monitor transactions, and review the status of platform-facing service flows.',
    accent: '#7c3aed',
  },
];

export default function AdminService() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #eff6ff 0%, #f8fafc 100%)', padding: '48px 20px' }}>
      <div style={{ maxWidth: 980, margin: '0 auto', display: 'grid', gap: 20 }}>
        <section style={{ background: '#fff', borderRadius: 24, padding: 32, boxShadow: '0 18px 50px rgba(15, 23, 42, 0.08)' }}>
          <div style={{ display: 'inline-flex', padding: '8px 14px', borderRadius: 999, background: '#dbeafe', color: '#1d4ed8', fontWeight: 700, marginBottom: 16 }}>
            Admin Service
          </div>
          <h2 style={{ margin: '0 0 12px', fontSize: 34, color: '#0f172a' }}>Administrative overview for Farmers MK.</h2>
          <p style={{ margin: 0, fontSize: 17, lineHeight: 1.7, color: '#475569' }}>
            Use the admin service to oversee platform activity, understand service health, and keep the operational picture of Farmers MK visible from one place.
          </p>
        </section>
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
          {panels.map((panel) => (
            <div key={panel.title} style={{ background: '#fff', borderRadius: 20, padding: 22, boxShadow: '0 12px 30px rgba(15, 23, 42, 0.06)', borderTop: `4px solid ${panel.accent}` }}>
              <div style={{ fontSize: 13, color: '#64748b', marginBottom: 10 }}>{panel.title}</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: panel.accent, marginBottom: 10 }}>{panel.value}</div>
              <div style={{ color: '#334155', lineHeight: 1.6 }}>{panel.description}</div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}