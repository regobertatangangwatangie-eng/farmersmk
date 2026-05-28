import React from 'react';
import './WalletDashboard.css'; // Optional: for custom styles

// Placeholder for fetching wallet data from backend (to be implemented)
const dummyWalletData = {
  totalValue: 0,
  pnl: 0,
  assets: [],
};

function WalletDashboard() {
  // In a real app, fetch wallet data from backend API here
  // Example: useEffect(() => { fetchWalletData() }, []);

  return (
    <div className="wallet-dashboard">
      <header className="wallet-dashboard__header">
        <h2>Wallet Overview</h2>
      </header>
      <section className="wallet-dashboard__summary">
        <div className="wallet-dashboard__total-value">
          <span>Total Value</span>
          <h3>${dummyWalletData.totalValue.toFixed(2)}</h3>
        </div>
        <div className="wallet-dashboard__pnl">
          <span>PNL</span>
          <h3>{dummyWalletData.pnl >= 0 ? '+' : ''}{dummyWalletData.pnl.toFixed(2)}</h3>
        </div>
      </section>
      <nav className="wallet-dashboard__tabs">
        <button className="active">Assets</button>
        <button disabled>Overview</button>
        {/* Add more tabs as needed */}
      </nav>
      <section className="wallet-dashboard__assets">
        <h4>Assets</h4>
        <table>
          <thead>
            <tr>
              <th>Asset</th>
              <th>Balance</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {dummyWalletData.assets.length === 0 ? (
              <tr><td colSpan="3">No assets found.</td></tr>
            ) : (
              dummyWalletData.assets.map(asset => (
                <tr key={asset.symbol}>
                  <td>{asset.name} ({asset.symbol})</td>
                  <td>{asset.balance}</td>
                  <td>${asset.value.toFixed(2)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
      {/* Add action buttons, charts, and navigation as needed */}
    </div>
  );
}

export default WalletDashboard;
