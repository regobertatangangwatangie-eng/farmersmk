import React, { useState } from 'react';

const accountTypes = [
  { key: 'transit', label: 'Transit/Transportation Company', fee: 20 },
  { key: 'buyer', label: 'Company Buyer', fee: 50 },
  { key: 'farmerscompany', label: 'Farmers Company', fee: 25 }
];

export default function CompanyAccount() {
  const [accountType, setAccountType] = useState(null);
  const [wallet, setWallet] = useState(0);
  const [verified, setVerified] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', price: '', minOrder: '', delivery: '', image: null });
  const [products, setProducts] = useState([]);
  const [orders] = useState([]);
  const [transactions, setTransactions] = useState([]);
  // Security uploads for withdrawal
  const [securityDocs, setSecurityDocs] = useState({
    transitReceipt: null,
    videoFarmer: null,
    videoBuyer: null,
    buyerSign: null,
    farmerSign: null,
    idPapers: null,
    depositReceipt: null,
    unusedReceipt: null,
    notSuppliedProof: null
  });
  // Marketplace listing fee for Farmers Company
  const [marketplacePaid, setMarketplacePaid] = useState(false);

  // Helper: check if all required docs for withdrawal are uploaded
  function canWithdraw() {
    if (accountType === 'transit') {
      return securityDocs.transitReceipt && securityDocs.videoFarmer && securityDocs.videoBuyer && securityDocs.buyerSign && securityDocs.farmerSign && wallet > 0;
    }
    if (accountType === 'buyer') {
      return securityDocs.idPapers && securityDocs.depositReceipt && securityDocs.unusedReceipt && securityDocs.notSuppliedProof && wallet > 0;
    }
    if (accountType === 'farmerscompany') {
      return securityDocs.transitReceipt && securityDocs.videoFarmer && securityDocs.videoBuyer && securityDocs.buyerSign && securityDocs.farmerSign && securityDocs.idPapers && wallet > 0;
    }
    return false;
  }

  function handleFormChange(e) {
    const { name, value, files } = e.target;
    setForm(f => ({ ...f, [name]: files ? files[0] : value }));
  }

  function handleAddProduct(e) {
    e.preventDefault();
    setProducts([...products, { ...form }]);
    setShowForm(false);
    setForm({ name: '', price: '', minOrder: '', delivery: '', image: null });
  }

  function handleSecurityUpload(e) {
    const { name, files } = e.target;
    setSecurityDocs(d => ({ ...d, [name]: files && files[0] }));
  }

  // Simulate account creation fee payment
  function payAccountFee() {
    setVerified(true);
    setTransactions(t => [...t, { amount: accountTypes.find(a => a.key === accountType).fee, type: 'Account Creation Fee', date: new Date().toISOString().slice(0,10) }]);
  }

  // Simulate deposit for buyer
  function depositFunds(amount) {
    setWallet(w => w + parseFloat(amount));
    setTransactions(t => [...t, { amount, type: 'Deposit', date: new Date().toISOString().slice(0,10) }]);
  }

  // Simulate refund for buyer
  function refundFunds(amount) {
    setWallet(w => w + parseFloat(amount));
    setTransactions(t => [...t, { amount, type: 'Refund', date: new Date().toISOString().slice(0,10) }]);
  }

  // Simulate paying $5 for marketplace listing (Farmers Company)
  function payMarketplaceFee() {
    setMarketplacePaid(true);
    setTransactions(t => [...t, { amount: 5, type: 'Marketplace Listing Fee', date: new Date().toISOString().slice(0,10) }]);
  }

  return (
    <div>
      <h3>Company Account</h3>
      {/* Mini dashboard for account type selection */}
      {!accountType && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, margin: '32px 0' }}>
          <button style={{ width: 320, padding: '18px 0', fontSize: 18, borderRadius: 8, border: 'none', background: 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)', color: '#fff', marginBottom: 8, cursor: 'pointer' }} onClick={() => setAccountType('transit')}>
            Transit Company Account
          </button>
          <button style={{ width: 320, padding: '18px 0', fontSize: 18, borderRadius: 8, border: 'none', background: 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)', color: '#fff', marginBottom: 8, cursor: 'pointer' }} onClick={() => setAccountType('buyer')}>
            Buyers Company Account
          </button>
          <button style={{ width: 320, padding: '18px 0', fontSize: 18, borderRadius: 8, border: 'none', background: 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)', color: '#fff', cursor: 'pointer' }} onClick={() => setAccountType('farmerscompany')}>
            Sellers Company Account
          </button>
        </div>
      )}
      {/* Show account details only after type is selected */}
      {accountType && (
        <>
          <div style={{ margin: '12px 0' }}>
            <b>Account Type:</b> {accountTypes.find(a => a.key === accountType).label}
            <button style={{ marginLeft: 16, padding: '6px 16px', background: verified ? '#ccc' : '#4CAF50', color: '#fff', border: 'none', borderRadius: 6 }} disabled={verified} onClick={payAccountFee}>
              Pay ${accountTypes.find(a => a.key === accountType).fee} Account Fee
            </button>
            {accountType === 'farmerscompany' && (
              <button style={{ marginLeft: 16, padding: '6px 16px', background: marketplacePaid ? '#ccc' : '#2196F3', color: '#fff', border: 'none', borderRadius: 6 }} disabled={marketplacePaid} onClick={payMarketplaceFee}>
                Pay $5 Marketplace Listing
              </button>
            )}
            <button style={{ marginLeft: 16, padding: '6px 16px', background: '#888', color: '#fff', border: 'none', borderRadius: 6 }} onClick={() => setAccountType(null)}>
              Back
            </button>
          </div>
          <div style={{ margin: '16px 0' }}>
            <b>Wallet Balance:</b> ${wallet.toLocaleString(undefined, {minimumFractionDigits:2})} USD
            <button style={{ marginLeft: 16, padding: '6px 16px', background: canWithdraw() ? '#FF9800' : '#ccc', color: '#fff', border: 'none', borderRadius: 6 }} disabled={!canWithdraw()}>
              Withdraw
            </button>
            <span style={{ marginLeft: 16, fontSize: 13, color: '#888' }}>(Wallet supports local & crypto)</span>
          </div>
          {/* Security requirements for withdrawal */}
          <div style={{ margin: '18px 0', background: '#f9f9f9', padding: 16, borderRadius: 8 }}>
            <b>Withdrawal Security Requirements</b>
            {accountType === 'transit' && (
              <ul style={{ margin: '8px 0 12px 0', fontSize: 15 }}>
                <li>1. Upload receipts for transporting goods</li>
                <li>2. Upload video: manager, farmer, and goods</li>
                <li>3. Upload video: buyer, goods received</li>
                <li>4. Buyer signs delivery document</li>
                <li>5. Farmer signs handover document</li>
              </ul>
            )}
            {accountType === 'buyer' && (
              <ul style={{ margin: '8px 0 12px 0', fontSize: 15 }}>
                <li>1. Identification papers</li>
                <li>2. Receipts showing deposit</li>
                <li>3. Receipts showing money couldn't be used</li>
                <li>4. Proof products not supplied</li>
              </ul>
            )}
            {accountType === 'farmerscompany' && (
              <ul style={{ margin: '8px 0 12px 0', fontSize: 15 }}>
                <li>1. All documents required for individual farmer withdrawal</li>
                <li>2. Company identification</li>
              </ul>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
              {accountType === 'transit' && <>
                <label>Transit Receipt: <input type="file" name="transitReceipt" onChange={handleSecurityUpload} required /></label>
                <label>Video (Farmer & Goods): <input type="file" name="videoFarmer" onChange={handleSecurityUpload} required /></label>
                <label>Video (Buyer & Goods): <input type="file" name="videoBuyer" onChange={handleSecurityUpload} required /></label>
                <label>Buyer Signed Doc: <input type="file" name="buyerSign" onChange={handleSecurityUpload} required /></label>
                <label>Farmer Signed Doc: <input type="file" name="farmerSign" onChange={handleSecurityUpload} required /></label>
              </>}
              {accountType === 'buyer' && <>
                <label>ID Papers: <input type="file" name="idPapers" onChange={handleSecurityUpload} required /></label>
                <label>Deposit Receipt: <input type="file" name="depositReceipt" onChange={handleSecurityUpload} required /></label>
                <label>Unused Receipt: <input type="file" name="unusedReceipt" onChange={handleSecurityUpload} required /></label>
                <label>Not Supplied Proof: <input type="file" name="notSuppliedProof" onChange={handleSecurityUpload} required /></label>
              </>}
              {accountType === 'farmerscompany' && <>
                <label>Transit Receipt: <input type="file" name="transitReceipt" onChange={handleSecurityUpload} required /></label>
                <label>Video (Farmer & Goods): <input type="file" name="videoFarmer" onChange={handleSecurityUpload} required /></label>
                <label>Video (Buyer & Goods): <input type="file" name="videoBuyer" onChange={handleSecurityUpload} required /></label>
                <label>Buyer Signed Doc: <input type="file" name="buyerSign" onChange={handleSecurityUpload} required /></label>
                <label>Farmer Signed Doc: <input type="file" name="farmerSign" onChange={handleSecurityUpload} required /></label>
                <label>Company ID Papers: <input type="file" name="idPapers" onChange={handleSecurityUpload} required /></label>
              </>}
            </div>
            <div style={{ marginTop: 8, color: canWithdraw() ? 'green' : 'red', fontWeight: 500 }}>
              {canWithdraw() ? 'All security documents uploaded. Withdrawal enabled.' : 'Upload all required documents to enable withdrawal.'}
            </div>
          </div>
          {/* Deposit/Refund for Buyer */}
          {accountType === 'buyer' && (
            <div style={{ margin: '18px 0' }}>
              <b>Deposit Funds</b>
              <button style={{ marginLeft: 16, padding: '6px 16px', background: '#4CAF50', color: '#fff', border: 'none', borderRadius: 6 }} onClick={() => depositFunds(100)}>
                Deposit $100
              </button>
              <button style={{ marginLeft: 8, padding: '6px 16px', background: '#FF9800', color: '#fff', border: 'none', borderRadius: 6 }} onClick={() => refundFunds(100)}>
                Refund $100
              </button>
            </div>
          )}
          {/* Products Listed (Farmers Company only after marketplace fee paid) */}
          {accountType === 'farmerscompany' && marketplacePaid && (
            <div style={{ margin: '18px 0' }}>
              <b>Products Listed</b>
              <button style={{ marginLeft: 16, padding: '6px 16px', background: '#4CAF50', color: '#fff', border: 'none', borderRadius: 6 }} onClick={() => setShowForm(f => !f)}>
                {showForm ? 'Cancel' : 'Add Product'}
              </button>
              {showForm && (
                <form onSubmit={handleAddProduct} style={{ marginTop: 16, background: '#f9f9f9', padding: 16, borderRadius: 8 }}>
                  <input name="name" placeholder="Product Name" value={form.name} onChange={handleFormChange} required style={{ margin: 4, padding: 8 }} />
                  <input name="price" placeholder="Bulk Price" value={form.price} onChange={handleFormChange} required style={{ margin: 4, padding: 8 }} />
                  <input name="minOrder" placeholder="Min Order Qty" value={form.minOrder} onChange={handleFormChange} required style={{ margin: 4, padding: 8 }} />
                  <input name="delivery" placeholder="Delivery Terms" value={form.delivery} onChange={handleFormChange} required style={{ margin: 4, padding: 8 }} />
                  <input name="image" type="file" accept="image/*" onChange={handleFormChange} style={{ margin: 4, padding: 8 }} />
                  <button type="submit" style={{ margin: 4, padding: '6px 16px', background: '#2196F3', color: '#fff', border: 'none', borderRadius: 6 }}>Save</button>
                </form>
              )}
              <ul style={{ marginTop: 12 }}>
                {products.map((p, i) => (
                  <li key={i} style={{ margin: '8px 0', padding: 8, borderBottom: '1px solid #eee' }}>
                    <b>{p.name}</b> — ${p.price} USD — Min: {p.minOrder} — Delivery: {p.delivery}
                    {p.image && <span style={{ marginLeft: 8, color: '#888' }}>[Image]</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Transaction History */}
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
        </>
      )}
    </div>
  );
}