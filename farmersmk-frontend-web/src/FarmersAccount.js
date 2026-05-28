import React, { useState } from 'react';

export default function FarmersAccount() {
  const [products, setProducts] = useState([
    { name: 'Fresh Tomatoes', price: '16.00', quantity: 100, image: null },
    { name: 'Cassava Tubers', price: '12.00', quantity: 50, image: null }
  ]);
  const [orders] = useState([
    { buyer: 'John Doe', product: 'Fresh Tomatoes', qty: 10, total: '160.00', status: 'Paid' },
    { buyer: 'Jane Smith', product: 'Cassava Tubers', qty: 5, total: '60.00', status: 'Paid' }
  ]);
  const [payments, setPayments] = useState([]);
  // Wallet starts at $0. $0.50 creation fee is paid to Farmers MK, not deducted from wallet.
  const [wallet, setWallet] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', price: '', quantity: '', image: null });
  // Withdrawal security uploads
  const [securityDocs, setSecurityDocs] = useState({
    liveVideo: null,
    verificationVideo: null,
    transitReceipt: null,
    idPapers: null,
    mkReceipt: null
  });
  // Track if all security docs are uploaded
  const allSecurityUploaded = Object.values(securityDocs).every(Boolean);

  const handleFormChange = e => {
    const { name, value, files } = e.target;
    setForm(f => ({ ...f, [name]: files ? files[0] : value }));
  };

  // Simulate receiving payment from buyer
  function receivePayment(amount) {
    setWallet(w => w + parseFloat(amount));
    setPayments(p => [...p, { amount: amount, date: new Date().toISOString().slice(0,10) }]);
  }

  // Handle security doc upload
  function handleSecurityUpload(e) {
    const { name, files } = e.target;
    setSecurityDocs(d => ({ ...d, [name]: files && files[0] }));
  }

  const handleAddProduct = e => {
    e.preventDefault();
    setProducts([...products, { ...form }]);
    setShowForm(false);
    setForm({ name: '', price: '', quantity: '', image: null });
  };

  // No automatic charge to farmer's wallet. $0.50 is paid to Farmers MK during registration (not tracked here).

  return (
    <div>
      <h3>Farmers Account</h3>
      <div style={{ margin: '16px 0' }}>
        <b>Wallet Balance:</b> ${wallet.toLocaleString(undefined, {minimumFractionDigits:2})} USD
        <button
          style={{ marginLeft: 16, padding: '6px 16px', background: allSecurityUploaded && wallet > 0 ? '#FF9800' : '#ccc', color: '#fff', border: 'none', borderRadius: 6 }}
          disabled={!allSecurityUploaded || wallet <= 0}
        >
          Withdraw
        </button>
        <span style={{ marginLeft: 8, fontSize: 13, color: '#888' }}>
          (Withdrawals require all security documents)
        </span>
      </div>
      <div style={{ margin: '18px 0', background: '#f9f9f9', padding: 16, borderRadius: 8 }}>
        <b>Withdrawal Security Requirements</b>
        <ul style={{ margin: '8px 0 12px 0', fontSize: 15 }}>
          <li>1. Live video during production/gathering</li>
          <li>2. Verification video with transit company</li>
          <li>3. Receipts with transit company</li>
          <li>4. Identification papers</li>
          <li>5. Signed receipt from Farmers MK director</li>
        </ul>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label>Live Video: <input type="file" name="liveVideo" accept="video/*" onChange={handleSecurityUpload} required /></label>
          <label>Verification Video: <input type="file" name="verificationVideo" accept="video/*" onChange={handleSecurityUpload} required /></label>
          <label>Transit Receipt: <input type="file" name="transitReceipt" accept="application/pdf,image/*" onChange={handleSecurityUpload} required /></label>
          <label>ID Papers: <input type="file" name="idPapers" accept="application/pdf,image/*" onChange={handleSecurityUpload} required /></label>
          <label>Farmers MK Receipt: <input type="file" name="mkReceipt" accept="application/pdf,image/*" onChange={handleSecurityUpload} required /></label>
        </div>
        <div style={{ marginTop: 8, color: allSecurityUploaded ? 'green' : 'red', fontWeight: 500 }}>
          {allSecurityUploaded ? 'All security documents uploaded. Withdrawal enabled.' : 'Upload all required documents to enable withdrawal.'}
        </div>
      </div>
      <div style={{ margin: '18px 0' }}>
        <b>Products Listed</b>
        <button style={{ marginLeft: 16, padding: '6px 16px', background: '#4CAF50', color: '#fff', border: 'none', borderRadius: 6 }} onClick={() => setShowForm(f => !f)}>
          {showForm ? 'Cancel' : 'Add Product'}
        </button>
        {showForm && (
          <form onSubmit={handleAddProduct} style={{ marginTop: 16, background: '#f9f9f9', padding: 16, borderRadius: 8 }}>
            <input name="name" placeholder="Product Name" value={form.name} onChange={handleFormChange} required style={{ margin: 4, padding: 8 }} />
            <input name="price" placeholder="Price" value={form.price} onChange={handleFormChange} required style={{ margin: 4, padding: 8 }} />
            <input name="quantity" placeholder="Quantity" value={form.quantity} onChange={handleFormChange} required style={{ margin: 4, padding: 8 }} />
            <input name="image" type="file" accept="image/*" onChange={handleFormChange} style={{ margin: 4, padding: 8 }} />
            <button type="submit" style={{ margin: 4, padding: '6px 16px', background: '#2196F3', color: '#fff', border: 'none', borderRadius: 6 }}>Save</button>
          </form>
        )}
        <ul style={{ marginTop: 12 }}>
          {products.map((p, i) => (
            <li key={i} style={{ margin: '8px 0', padding: 8, borderBottom: '1px solid #eee' }}>
                <b>{p.name}</b> — ${p.price} USD — Qty: {p.quantity}
              {p.image && <span style={{ marginLeft: 8, color: '#888' }}>[Image]</span>}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ margin: '18px 0' }}>
        <b>Orders</b>
        <ul style={{ marginTop: 8 }}>
          {orders.map((o, i) => (
            <li key={i} style={{ margin: '6px 0', padding: 6, borderBottom: '1px solid #eee' }}>
                {o.qty} x {o.product} for {o.buyer} — <b>${o.total} USD</b> [{o.status}]
            </li>
          ))}
        </ul>
      </div>
      <div style={{ margin: '18px 0' }}>
        <b>Payments Received</b>
        <button style={{ marginLeft: 16, padding: '6px 16px', background: '#4CAF50', color: '#fff', border: 'none', borderRadius: 6 }} onClick={() => receivePayment(50)}>
          Simulate Buyer Payment ($50)
        </button>
        <ul style={{ marginTop: 8 }}>
          {payments.map((p, i) => (
            <li key={i} style={{ margin: '6px 0', padding: 6, borderBottom: '1px solid #eee' }}>
                ${p.amount} USD on {p.date}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ margin: '18px 0' }}>
        <b>Invoices</b>
        <ul style={{ marginTop: 8 }}>
          <li>Invoice #001 (auto-generated after sale)</li>
        </ul>
      </div>
    </div>
  );
}
