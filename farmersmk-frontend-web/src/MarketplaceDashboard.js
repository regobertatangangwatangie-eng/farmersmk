import FarmersAccount from './FarmersAccount';
import CompanyAccount from './CompanyAccount';
import BuyersAccount from './BuyersAccount';
import SecurityArea from './SecurityArea';

const sections = [
  { key: 'marketplace', label: 'Marketplace' },
  { key: 'farmers', label: "Farmers Account" },
  { key: 'company', label: "Company Account" },
  { key: 'buyers', label: "Individual Buyers Account" },
  { key: 'security', label: "Security Area" }
];

function SectionButton({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        margin: '10px 0',
        padding: '14px 28px',
        fontSize: 17,
        borderRadius: 8,
        border: 'none',
        background: 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)',
        color: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        cursor: 'pointer',
        width: 300,
        transition: 'transform 0.1s',
      }}
      onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.03)')}
      onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
    >
      {label}
    </button>
  );
}

export default function MarketplaceDashboard() {
  const [active, setActive] = useState('marketplace');
  // Track navigation stack for back arrow
  const [navStack, setNavStack] = useState([]);

  function handleSectionChange(section) {
    setNavStack(stack => [...stack, active]);
    setActive(section);
  }

  function handleBack() {
    setNavStack(stack => {
      if (stack.length === 0) return stack;
      const prev = stack[stack.length - 1];
      setActive(prev);
      return stack.slice(0, -1);
    });
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', minHeight: '100vh', background: '#f5f7fa' }}>
      {/* Main content area (center) */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ margin: '32px 0 16px' }}>Marketplace Service</h2>
        {/* Universal Back Arrow */}
        {navStack.length > 0 && (
          <button onClick={handleBack} style={{ position: 'absolute', left: 32, top: 32, background: 'none', border: 'none', color: '#2196F3', fontSize: 28, cursor: 'pointer', zIndex: 10 }} title="Go Back">←</button>
        )}
        <div style={{ width: 400, minHeight: 300, background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: 24, margin: '0 auto', position: 'relative' }}>
          {active === 'marketplace' && <MarketplaceMain />}
          {active === 'farmers' && <FarmersAccount />}
          {active === 'company' && <CompanyAccount />}
          {active === 'buyers' && <BuyersAccount />}
          {active === 'security' && <SecurityArea />}
        </div>
      </div>
      {/* Button group (right) */}
      <div style={{ width: 320, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-start', padding: '48px 32px 0 0', gap: 16 }}>
        {sections.map(s => (
          <SectionButton key={s.key} label={s.label} onClick={() => handleSectionChange(s.key)} />
        ))}
      </div>
    </div>
  );
}


import React, { useState } from 'react';
import ChatWidget from './ChatWidget';

function MarketplaceMain() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filter, setFilter] = useState('');
  const [products, setProducts] = useState([
    { name: 'Fresh Tomatoes', price: '16.00', category: 'Vegetable', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=facearea&w=80&h=80' },
    { name: 'Cassava Tubers', price: '12.00', category: 'Root', image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=facearea&w=80&h=80' },
    { name: 'Plantain Bunch', price: '8.00', category: 'Fruit', image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=80&h=80' }
  ]);
  const [uploadForm, setUploadForm] = useState({ name: '', price: '', category: '', image: null, imageUrl: '' });
  const [uploading, setUploading] = useState(false);

  const filtered = products.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()) || p.category.toLowerCase().includes(filter.toLowerCase()));

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadForm(f => ({ ...f, image: file, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  }

  function handleUploadChange(e) {
    const { name, value } = e.target;
    setUploadForm(f => ({ ...f, [name]: value }));
  }

  function handleUploadSubmit(e) {
    e.preventDefault();
    if (!uploadForm.name || !uploadForm.price || !uploadForm.category || !uploadForm.imageUrl) return;
    setUploading(true);
    setTimeout(() => {
      setProducts(prev => [
        {
          name: uploadForm.name,
          price: uploadForm.price,
          category: uploadForm.category,
          image: uploadForm.imageUrl,
          owner: 'me' // Mark as owned by current user for demo
        },
        ...prev
      ]);
      setUploadForm({ name: '', price: '', category: '', image: null, imageUrl: '' });
      setUploading(false);
    }, 800);
  }

  // Security check placeholder (replace with real auth)
  function canDeleteProduct(product) {
    return product.owner === 'me';
  }

  function handleDeleteProduct(idx) {
    // Security confirmation (replace with real security)
    if (!window.confirm('Are you sure you want to delete this product? This action is secured and cannot be undone.')) return;
    setProducts(prev => prev.filter((_, i) => i !== idx));
  }

  return (
    <div>
      <h3>Marketplace</h3>
      {/* Product upload form for farmers */}
      <form onSubmit={handleUploadSubmit} style={{ background: '#f9f9f9', padding: 16, borderRadius: 8, marginBottom: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <b>Upload Your Product</b>
        <input name="name" placeholder="Product Name" value={uploadForm.name} onChange={handleUploadChange} required style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
        <input name="price" placeholder="Price (USD)" value={uploadForm.price} onChange={handleUploadChange} required style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc' }} type="number" min="0" step="0.01" />
        <input name="category" placeholder="Category (e.g. Vegetable, Fruit)" value={uploadForm.category} onChange={handleUploadChange} required style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
        <input name="image" type="file" accept="image/*" onChange={handleImageChange} required style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
        {uploadForm.imageUrl && <img src={uploadForm.imageUrl} alt="preview" style={{ width: 60, height: 60, borderRadius: 8, marginTop: 6 }} />}
        <button type="submit" disabled={uploading} style={{ padding: '8px 18px', background: '#4CAF50', color: '#fff', border: 'none', borderRadius: 6, marginTop: 6 }}>{uploading ? 'Uploading...' : 'Upload Product'}</button>
      </form>
      <input
        placeholder="Filter by name or category"
        value={filter}
        onChange={e => setFilter(e.target.value)}
        style={{ marginBottom: 12, padding: 8, borderRadius: 6, border: '1px solid #ccc', width: '100%' }}
      />
      {!selectedProduct ? (
        <div>
          {filtered.map((p, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '8px 0', padding: 8, borderBottom: '1px solid #eee', cursor: 'pointer' }} onClick={() => setSelectedProduct(p)}>
              <img src={p.image} alt={p.name} style={{ width: 48, height: 48, borderRadius: 8, marginRight: 12 }} />
              <span style={{ flex: 1 }}>{p.name} <span style={{ color: '#888', fontSize: 13 }}>({p.category})</span></span>
              <span style={{ fontWeight: 'bold', color: '#2196F3', marginRight: 16 }}>${parseFloat(p.price).toFixed(2)}</span>
              <button style={{ padding: '6px 14px', background: '#2196F3', color: '#fff', border: 'none', borderRadius: 6 }}>View</button>
              {canDeleteProduct(p) && (
                <button onClick={e => { e.stopPropagation(); handleDeleteProduct(i); }} style={{ marginLeft: 8, padding: '6px 10px', background: '#e53935', color: '#fff', border: 'none', borderRadius: 6, fontSize: 13 }}>Delete</button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <ProductDetails product={selectedProduct} onBack={() => setSelectedProduct(null)} />
      )}
    </div>
  );
}

function ProductDetails({ product, onBack }) {
  const [showChat, setShowChat] = useState(false);
  return (
    <div>
      <button onClick={onBack} style={{ marginBottom: 12, background: 'none', border: 'none', color: '#2196F3', cursor: 'pointer' }}>← Back to list</button>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
        <img src={product.image} alt={product.name} style={{ width: 80, height: 80, borderRadius: 12, marginRight: 18 }} />
        <div>
          <h4 style={{ margin: 0 }}>{product.name}</h4>
          <div style={{ color: '#888', fontSize: 14 }}>{product.category}</div>
          <div style={{ fontWeight: 'bold', color: '#2196F3', fontSize: 18 }}>{product.price}</div>
        </div>
      </div>
      <div style={{ marginBottom: 12 }}>Product description and details go here.</div>
      <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
        <button style={{ padding: '8px 18px', background: '#4CAF50', color: '#fff', border: 'none', borderRadius: 6 }}>Order</button>
        <button style={{ padding: '8px 18px', background: '#2196F3', color: '#fff', border: 'none', borderRadius: 6 }} onClick={() => setShowChat(true)}>💬 Chat</button>
      </div>
      {showChat && <div style={{ marginTop: 12 }}><ChatWidget username="Buyer" room={product.name} onClose={() => setShowChat(false)} /></div>}
    </div>
  );
}



function DepositWithdraw() {
  return (
    <div style={{ margin: '16px 0' }}>
      <button style={{ marginRight: 8, padding: '8px 16px', background: '#4CAF50', color: '#fff', border: 'none', borderRadius: 6 }}>Deposit</button>
      <button style={{ padding: '8px 16px', background: '#FF9800', color: '#fff', border: 'none', borderRadius: 6 }}>Withdraw</button>
      <div style={{ marginTop: 8, fontSize: 13, color: '#888' }}>
        Deposit: MTN Mobile Money, Orange Money, Visa, MasterCard, MTN card<br />
        Withdrawals require strict verification.
      </div>
    </div>
  );
}








