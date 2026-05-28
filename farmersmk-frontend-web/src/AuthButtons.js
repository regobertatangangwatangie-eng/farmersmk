// Simple React signup and signin buttons
import React from 'react';

export function SignupButton({ onClick }) {
  return (
    <button onClick={onClick} style={{ margin: '0 8px', padding: '8px 16px', background: '#4CAF50', color: '#fff', border: 'none', borderRadius: 4 }}>
      Sign Up
    </button>
  );
}

export function SigninButton({ onClick }) {
  return (
    <button onClick={onClick} style={{ margin: '0 8px', padding: '8px 16px', background: '#2196F3', color: '#fff', border: 'none', borderRadius: 4 }}>
      Sign In
    </button>
  );
}
