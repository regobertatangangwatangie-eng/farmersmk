import React, { useState } from 'react';

const coins = [
  { name: 'BNB', price: 635.56, change: -2.89 },
  { name: 'BTC', price: 73029.40, change: -3.45 },
  { name: 'ETH', price: 1979.46, change: -4.52 },
  { name: 'SOL', price: 80.77, change: -3.54 },
];

export default function CryptoExchangeDashboard({ onSwitchWallet, onShowProfile }) {
  const [activeTab, setActiveTab] = useState('Hot');
  const [showPromo, setShowPromo] = useState(true);
  const [search, setSearch] = useState('');

  return (
    <div style={{background:'#fff',minHeight:'100vh',display:'flex',flexDirection:'column'}}>
      {/* Top Bar */}
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 16px 0 16px'}}>
        <button style={iconBtn} onClick={onShowProfile}>👤</button>
        <div style={{display:'flex',borderRadius:24,background:'#f5f5f5',overflow:'hidden'}}>
          <button style={{...toggleBtn,background:'#fff',fontWeight:600}}>Exchange</button>
          <button style={toggleBtn} onClick={onSwitchWallet}>Wallet</button>
        </div>
        <div style={{display:'flex',gap:8}}>
          <button style={iconBtn}>📷</button>
          <button style={iconBtn}>💬<span style={{color:'#f3c41c',fontWeight:700}}>99+</span></button>
        </div>
      </div>
      {/* Search Bar */}
      <div style={{padding:'12px 16px'}}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search" style={{width:'100%',padding:'10px 16px',borderRadius:8,border:'1px solid #eee',fontSize:16}} />
      </div>
      {/* Balance Section */}
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 16px'}}>
        <div>
          <div style={{fontSize:14,color:'#888'}}>Est. Total Value(USD)</div>
          <div style={{fontSize:28,fontWeight:700}}>$0.04036424</div>
          <div style={{fontSize:14,color:'#e74c3c',fontWeight:600}}>Today's PNL -$0.00127797 (-3.07%)</div>
        </div>
        <button style={mainBtnStyle}>Add Funds</button>
      </div>
      {/* Promo Banner */}
      {showPromo && (
        <div style={{background:'#f5f7fa',margin:'16px',padding:'16px',borderRadius:12,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div>
            <div style={{fontSize:13,color:'#888'}}>Pizza Day Is Better Together</div>
            <div style={{fontWeight:600}}>Deposit 100 USDC, Earn Up to 50 USDC</div>
          </div>
          <button style={promoBtn} onClick={()=>alert('Promo join placeholder')}>Join</button>
          <button style={{background:'none',border:'none',fontSize:18,marginLeft:8,cursor:'pointer'}} onClick={()=>setShowPromo(false)}>×</button>
        </div>
      )}
      {/* Tabs */}
      <div style={{display:'flex',gap:24,padding:'0 16px',marginBottom:8}}>
        {['Favorites','Hot','Alpha','New','Gainers'].map(tab => (
          <span key={tab} style={{fontWeight:activeTab===tab?700:400,color:activeTab==='Hot'?'#f3c41c':'#888',borderBottom:activeTab===tab?'2px solid #f3c41c':'none',paddingBottom:4,cursor:'pointer'}} onClick={()=>setActiveTab(tab)}>{tab}</span>
        ))}
      </div>
      {/* Crypto Table */}
      <div style={{margin:'0 16px',background:'#fff',borderRadius:12,boxShadow:'0 2px 8px rgba(0,0,0,0.04)',padding:8}}>
        <div style={{display:'flex',fontWeight:600,padding:'8px 0',borderBottom:'1px solid #eee'}}>
          <span style={{flex:2}}>Crypto</span>
          <span style={{flex:2}}>Name</span>
          <span style={{flex:2}}>Last Price</span>
          <span style={{flex:2}}>24h chg%</span>
        </div>
        {coins.map(coin => (
          <div key={coin.name} style={{display:'flex',alignItems:'center',padding:'10px 0',borderBottom:'1px solid #f7f7f7',cursor:'pointer'}}>
            <span style={{flex:2}}>{coin.name} <span role="img" aria-label="fire">🔥</span></span>
            <span style={{flex:2}}>{coin.name}</span>
            <span style={{flex:2}}>${coin.price}</span>
            <span style={{flex:2,color:coin.change<0?'#e74c3c':'#2ecc71'}}>{coin.change}%</span>
          </div>
        ))}
      </div>
      {/* Bottom Navigation */}
      <div style={{position:'fixed',bottom:0,left:0,right:0,background:'#fff',borderTop:'1px solid #eee',display:'flex',justifyContent:'space-around',padding:'12px 0'}}>
        {[
          {label:'Home',icon:'🏠'},
          {label:'Markets',icon:'📈'},
          {label:'Trade',icon:'🔄'},
          {label:'Futures',icon:'📊'},
          {label:'Assets',icon:'💼'},
        ].map(nav => (
          <div key={nav.label} style={{display:'flex',flexDirection:'column',alignItems:'center',color:nav.label==='Home'?'#f3c41c':'#888',fontWeight:nav.label==='Home'?700:400}}>
            <span style={{fontSize:22}}>{nav.icon}</span>
            <span style={{fontSize:12}}>{nav.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const iconBtn = {
  background:'none',
  border:'none',
  fontSize:22,
  cursor:'pointer',
  padding:4,
};
const toggleBtn = {
  border:'none',
  background:'#f5f5f5',
  padding:'8px 24px',
  fontSize:16,
  cursor:'pointer',
  color:'#888',
};
const mainBtnStyle = {
  background:'#f3c41c',
  color:'#222',
  border:'none',
  borderRadius:8,
  padding:'12px 24px',
  fontWeight:600,
  fontSize:16,
  cursor:'pointer',
  boxShadow:'0 2px 8px rgba(0,0,0,0.08)'
};
const promoBtn = {
  background:'#f3c41c',
  color:'#222',
  border:'none',
  borderRadius:8,
  padding:'8px 16px',
  fontWeight:600,
  fontSize:14,
  cursor:'pointer',
  marginLeft:16,
};
