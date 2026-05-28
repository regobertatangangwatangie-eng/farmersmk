import React, { useState } from 'react';

export default function BuyersAccount() {
  const [products] = useState([
    { name: 'Fresh Tomatoes', price: '16.00', seller: 'Farmer John' },
    { name: 'Cassava Tubers', price: '12.00', seller: 'Farmer Jane' }
  ]);
  const [cart, setCart] = useState([]);
  const [orders] = useState([
    { product: 'Fresh Tomatoes', qty: 2, total: '32.00', status: 'Delivered' }
  ]);
  const [wallet, setWallet] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [verified, setVerified] = useState(false);
  // Security uploads for withdrawal
  const [securityDocs, setSecurityDocs] = useState({
    idPapers: null,
    depositReceipt: null,
    unusedReceipt: null,
    notSuppliedProof: null
  });

  // Helper: check if all required docs for withdrawal are uploaded
  function canWithdraw() {
    return securityDocs.idPapers && securityDocs.depositReceipt && securityDocs.unusedReceipt && securityDocs.notSuppliedProof && wallet > 0;
  }

  function handleSecurityUpload(e) {
    const { name, files } = e.target;
    setSecurityDocs(d => ({ ...d, [name]: files && files[0] }));
  }

  function payAccountFee() {
    setVerified(true);
    setTransactions(t => [...t, { amount: 10, type: 'Account Creation Fee', date: new Date().toISOString().slice(0,10) }]);
  }

  function depositFunds(amount) {
    setWallet(w => w + parseFloat(amount));
    setTransactions(t => [...t, { amount, type: 'Deposit', date: new Date().toISOString().slice(0,10) }]);
  }

  function refundFunds(amount) {
    setWallet(w => w + parseFloat(amount));
    setTransactions(t => [...t, { amount, type: 'Refund', date: new Date().toISOString().slice(0,10) }]);
  }

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  const addToCart = product => setCart([...cart, product]);

  return (
    <div>
      <h3>Individual Buyer Account</h3>
      <div style={{ margin: '12px 0' }}>
        <button style={{ padding: '6px 16px', background: verified ? '#ccc' : '#4CAF50', color: '#fff', border: 'none', borderRadius: 6 }} disabled={verified} onClick={payAccountFee}>
          Pay $10 Account Fee
        </button>
      </div>
      <div style={{ margin: '16px 0' }}>
        <b>Wallet Balance:</b> ${wallet.toLocaleString(undefined, {minimumFractionDigits:2})} USD
        <button style={{ marginLeft: 16, padding: '6px 16px', background: canWithdraw() ? '#FF9800' : '#ccc', color: '#fff', border: 'none', borderRadius: 6 }} disabled={!canWithdraw()}>
          Withdraw
        </button>
      </div>
      {/* Security requirements for withdrawal */}
      <div style={{ margin: '18px 0', background: '#f9f9f9', padding: 16, borderRadius: 8 }}>
        <b>Withdrawal Security Requirements</b>
        <ul style={{ margin: '8px 0 12px 0', fontSize: 15 }}>
          <li>1. Identification papers</li>
          <li>2. Receipts showing deposit</li>
          <li>3. Receipts showing money couldn't be used</li>
          <li>4. Proof products not supplied</li>
        </ul>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
          <label>ID Papers: <input type="file" name="idPapers" onChange={handleSecurityUpload} required /></label>
          <label>Deposit Receipt: <input type="file" name="depositReceipt" onChange={handleSecurityUpload} required /></label>
          <label>Unused Receipt: <input type="file" name="unusedReceipt" onChange={handleSecurityUpload} required /></label>
          <label>Not Supplied Proof: <input type="file" name="notSuppliedProof" onChange={handleSecurityUpload} required /></label>
        </div>
        <div style={{ marginTop: 8, color: canWithdraw() ? 'green' : 'red', fontWeight: 500 }}>
          {canWithdraw() ? 'All security documents uploaded. Withdrawal enabled.' : 'Upload all required documents to enable withdrawal.'}
        </div>
      </div>
      {/* Deposit/Refund */}
      <div style={{ margin: '18px 0' }}>
        <b>Deposit Funds</b>
        <button style={{ marginLeft: 16, padding: '6px 16px', background: '#4CAF50', color: '#fff', border: 'none', borderRadius: 6 }} onClick={() => depositFunds(50)}>
          Deposit $50
        </button>
        <button style={{ marginLeft: 8, padding: '6px 16px', background: '#FF9800', color: '#fff', border: 'none', borderRadius: 6 }} onClick={() => refundFunds(50)}>
          Refund $50
        </button>
      </div>
      <div style={{ margin: '18px 0' }}>
        <b>Search Products</b>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name..." style={{ marginLeft: 8, padding: 6, borderRadius: 4, border: '1px solid #ccc' }} />
        <ul style={{ marginTop: 12 }}>
          {filteredProducts.map((p, i) => (
            <li key={i} style={{ margin: '8px 0', padding: 8, borderBottom: '1px solid #eee' }}>
              <b>{p.name}</b> — ${p.price} USD — Seller: {p.seller}
              <button style={{ marginLeft: 12, padding: '4px 12px', background: '#4CAF50', color: '#fff', border: 'none', borderRadius: 4 }} onClick={() => addToCart(p)}>Add to Cart</button>
              <button style={{ marginLeft: 8, padding: '4px 12px', background: '#2196F3', color: '#fff', border: 'none', borderRadius: 4 }}>Chat</button>
            </li>
          ))}
        </ul>
      </div>
      <div style={{ margin: '18px 0' }}>
        <b>Cart</b>
        <ul style={{ marginTop: 8 }}>
          {cart.map((p, i) => (
            <li key={i} style={{ margin: '6px 0', padding: 6, borderBottom: '1px solid #eee' }}>
              {p.name} — ${p.price} USD
            </li>
          ))}
        </ul>
      </div>
      <div style={{ margin: '18px 0' }}>
        <b>Order History</b>
        <ul style={{ marginTop: 8 }}>
          {orders.map((o, i) => (
            <li key={i} style={{ margin: '6px 0', padding: 6, borderBottom: '1px solid #eee' }}>
              {o.qty} x {o.product} — <b>${o.total} USD</b> [{o.status}]
            </li>
          ))}
        </ul>
      </div>
      <div style={{ margin: '18px 0' }}>
        <b>Transaction History</b>
        <ul style={{ marginTop: 8 }}>
          {transactions.map((t, i) => (
            <li key={i} style={{ margin: '6px 0', padding: 6, borderBottom: '1px solid #eee' }}>
              {t.type}: ${t.amount} USD on {t.date}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}