import React from 'react';

const services = [
  'Communication Service',
  'Marketplace',
  'School Service', // Always third
  'Grant Service', // Now fourth
  'Cryptocurrency Wallet', // Now fifth
  'Payment',
  'Common Library',
  'Android App',
  'Social Media',
];

export default function ServicesList({ onServiceClick }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 40 }}>
      <h2>All Services</h2>
      {services.map(service => (
        <button
          key={service}
          onClick={() => onServiceClick(service)}
          style={{
            margin: '12px 0',
            padding: '16px 32px',
            fontSize: 18,
            borderRadius: 8,
            border: 'none',
            background: 'linear-gradient(90deg, #4CAF50 0%, #2196F3 100%)',
            color: '#fff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            cursor: 'pointer',
            width: 320,
            transition: 'transform 0.1s',
          }}
          onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.03)')}
          onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          {service}
        </button>
      ))}
    </div>
  );
}
