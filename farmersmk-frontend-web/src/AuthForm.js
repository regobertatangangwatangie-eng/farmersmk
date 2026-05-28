import React, { useState } from 'react';

export default function AuthForm({ mode, onSubmit }) {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      background: '#fff', padding: 32, borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', minWidth: 320
    }}>
      <h2>{mode === 'signup' ? 'Sign Up' : 'Sign In'}</h2>
      <input
        name="username"
        type="text"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
        required
        style={{ margin: '12px 0', padding: 10, width: '100%', borderRadius: 6, border: '1px solid #ccc' }}
      />
      {mode === 'signup' && (
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={{ margin: '12px 0', padding: 10, width: '100%', borderRadius: 6, border: '1px solid #ccc' }}
        />
      )}
      <div style={{ position: 'relative', width: '100%' }}>
        <input
          name="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          style={{ margin: '12px 0', padding: 10, width: '100%', borderRadius: 6, border: '1px solid #ccc' }}
        />
        <span
          onClick={() => setShowPassword(v => !v)}
          style={{ position: 'absolute', right: 16, top: 22, cursor: 'pointer', color: '#888' }}
          title={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? '👁️' : '👁'}
        </span>
      </div>
      {mode === 'signup' && (
        <div style={{ position: 'relative', width: '100%' }}>
          <input
            name="confirmPassword"
            type={showConfirm ? 'text' : 'password'}
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            style={{ margin: '12px 0', padding: 10, width: '100%', borderRadius: 6, border: '1px solid #ccc' }}
          />
          <span
            onClick={() => setShowConfirm(v => !v)}
            style={{ position: 'absolute', right: 16, top: 22, cursor: 'pointer', color: '#888' }}
            title={showConfirm ? 'Hide password' : 'Show password'}
          >
            {showConfirm ? '👁️' : '👁'}
          </span>
        </div>
      )}
      <button type="submit" style={{ margin: '18px 0 0', padding: '10px 24px', background: '#4CAF50', color: '#fff', border: 'none', borderRadius: 6, fontSize: 16 }}>
        Enter
      </button>
    </form>
  );
}
