import React, { useState } from 'react';

export default function CryptoWalletAuth({ onAuth }) {
  const [mode, setMode] = useState('signin'); // 'signin' or 'signup'
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Here you would call your backend API for sign in or sign up
    if (!form.username || !form.password || (mode === 'signup' && !form.email)) {
      setError('Please fill all fields');
      return;
    }
    setError('');
    // Simulate success
    onAuth(form.username);
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', padding: 24, background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
      <h2 style={{ textAlign: 'center' }}>{mode === 'signin' ? 'Sign In to Crypto Wallet' : 'Sign Up for Crypto Wallet'}</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <input name="username" value={form.username} onChange={handleChange} placeholder="Username" style={{ width: '100%', padding: 8 }} />
        </div>
        {mode === 'signup' && (
          <div style={{ marginBottom: 16 }}>
            <input name="email" value={form.email} onChange={handleChange} placeholder="Email" style={{ width: '100%', padding: 8 }} />
          </div>
        )}
        <div style={{ marginBottom: 16 }}>
          <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" style={{ width: '100%', padding: 8 }} />
        </div>
        {error && <div style={{ color: 'red', marginBottom: 16 }}>{error}</div>}
        <button type="submit" style={{ width: '100%', padding: 10, background: '#007bff', color: '#fff', border: 'none', borderRadius: 4 }}>
          {mode === 'signin' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
      <div style={{ marginTop: 16, textAlign: 'center' }}>
        {mode === 'signin' ? (
          <span>Don&apos;t have an account? <button style={{ color: '#007bff', background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => setMode('signup')}>Sign Up</button></span>
        ) : (
          <span>Already have an account? <button style={{ color: '#007bff', background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => setMode('signin')}>Sign In</button></span>
        )}
      </div>
    </div>
  );
}
