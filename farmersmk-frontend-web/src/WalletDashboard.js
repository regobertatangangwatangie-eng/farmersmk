import React, { useEffect, useState } from 'react';

function WalletDashboard() {
  const [walletData, setWalletData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Update this URL to your backend wallet API endpoint
    fetch('http://localhost:8080/api/wallet')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch wallet data');
        return res.json();
      })
      .then(data => {
        setWalletData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading wallet...</div>;
  if (error) return <div style={{color:'red'}}>Error: {error}</div>;
  if (!walletData) return <div>No wallet data found.</div>;

  return (
    <div style={{maxWidth:600,margin:'40px auto',padding:24,background:'#fff',borderRadius:12,boxShadow:'0 2px 12px rgba(0,0,0,0.08)'}}>
      <h2>Wallet Dashboard</h2>
      <div style={{marginBottom:24}}>
        <strong>Total Value:</strong> ${walletData.totalValue?.toFixed(2) || 0}
      </div>
      <div style={{marginBottom:24}}>
        <strong>PNL:</strong> {walletData.pnl >= 0 ? '+' : ''}{walletData.pnl?.toFixed(2) || 0}
      </div>
      <h3>Assets</h3>
      <table style={{width:'100%',marginBottom:24}}>
        <thead>
          <tr>
            <th align="left">Asset</th>
            <th align="right">Balance</th>
            <th align="right">Value</th>
          </tr>
        </thead>
        <tbody>
          {walletData.assets && walletData.assets.length > 0 ? walletData.assets.map(asset => (
            <tr key={asset.symbol}>
              <td>{asset.name} ({asset.symbol})</td>
              <td align="right">{asset.balance}</td>
              <td align="right">${asset.value.toFixed(2)}</td>
            </tr>
          )) : <tr><td colSpan="3">No assets found.</td></tr>}
        </tbody>
      </table>
      {/* Add more wallet features here: deposit, withdraw, history, etc. */}
    </div>
  );
}

export default WalletDashboard;
