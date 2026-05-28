import React, { useState } from 'react';

const initialBalances = {
  earn: 0.04035807,
  spot: 0.00006392,
  funding: 0.00000004,
  futures: 0.0,
};

export default function CryptoWalletDashboard({ user, onSwitchExchange, onShowProfile }) {
  const [showBalance, setShowBalance] = useState(true);
  const [activeTab, setActiveTab] = useState('Overview');
  const [accountTab, setAccountTab] = useState('Account');
  const [modal, setModal] = useState(null); // 'add', 'send', 'transfer', 'chart'
  const [balances] = useState(initialBalances);

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

  const totalValue = Object.values(balances).reduce((a, b) => a + b, 0);

  return (
    <div style={{background:'#fff',minHeight:'100vh',display:'flex',flexDirection:'column'}}>
        {/* Top Bar with Exchange/Wallet toggle */}
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 16px 0 16px'}}>
          <button style={iconBtn} onClick={onShowProfile}>👤</button>
          <div style={{display:'flex',borderRadius:24,background:'#f5f5f5',overflow:'hidden'}}>
            <button style={toggleBtn} onClick={onSwitchExchange}>Exchange</button>
            <button style={{...toggleBtn,background:'#fff',fontWeight:600}}>Wallet</button>
          </div>
          <span />
        </div>
        {/* Tabs */}
      <div style={{display:'flex',justifyContent:'space-around',borderBottom:'1px solid #eee',padding:'16px 0',fontWeight:600}}>
        {['Overview','Earn','Spot','Funding','Futures'].map(tab => (
          <span key={tab} style={{color:activeTab===tab?'#222':'#888',borderBottom:activeTab===tab?'2px solid #f3c41c':'none',paddingBottom:4,cursor:'pointer'}} onClick={()=>setActiveTab(tab)}>{tab}</span>
        ))}
      </div>
      {/* Balance Section */}
      <div style={{padding:24,display:'flex',flexDirection:'column',alignItems:'center',position:'relative'}}>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <span style={{fontSize:16,color:'#888'}}>Est. Total Value</span>
          <button aria-label="toggle-balance" style={{background:'none',border:'none',cursor:'pointer'}} onClick={()=>setShowBalance(v=>!v)}>
            {showBalance ? '👁️' : '🙈'}
          </button>
        </div>
        <div style={{fontSize:32,fontWeight:700,margin:'8px 0'}}>
          {showBalance ? `$${totalValue.toFixed(8)} USD` : '****'}
        </div>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <span style={{color:'#888'}}>Today's PNL --</span>
          <button aria-label="chart" style={{background:'none',border:'none',cursor:'pointer'}} onClick={()=>setModal('chart')}>📈</button>
        </div>
        {/* Main Buttons */}
        <div style={{display:'flex',gap:16,marginTop:24}}>
          <button style={mainBtnStyle} onClick={()=>setModal('add')}>Add Funds</button>
          <button style={mainBtnStyle} onClick={()=>setModal('send')}>Send</button>
          <button style={mainBtnStyle} onClick={()=>setModal('transfer')}>Transfer</button>
        </div>
      </div>
      {/* Account/Crypto Toggle */}
      <div style={{display:'flex',justifyContent:'center',gap:32,margin:'16px 0'}}>
        <span style={{color:'#888'}}>Crypto</span>
        <span style={{fontWeight:600,borderBottom:'2px solid #f3c41c'}}>Account</span>
        <button aria-label="settings" style={{background:'none',border:'none',cursor:'pointer',marginLeft:16}}>⚙️</button>
      </div>
      {/* Account Table */}
      <div style={{maxWidth:400,margin:'0 auto',width:'100%'}}>
        <div style={{display:'flex',justifyContent:'space-between',padding:'8px 0',fontWeight:600}}>
          <span>Earn</span>
          <span>${balances.earn}</span>
        </div>
        <div style={{display:'flex',justifyContent:'space-between',padding:'8px 0'}}>
          <span>Spot</span>
          <span>${balances.spot}</span>
        </div>
        <div style={{display:'flex',justifyContent:'space-between',padding:'8px 0'}}>
          <span>Funding</span>
          <span>${balances.funding}</span>
        </div>
        <div style={{display:'flex',justifyContent:'space-between',padding:'8px 0'}}>
          <span>Futures</span>
          <span>${balances.futures}</span>
        </div>
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
          <div key={nav.label} style={{display:'flex',flexDirection:'column',alignItems:'center',color:nav.label==='Assets'?'#f3c41c':'#888',fontWeight:nav.label==='Assets'?700:400}}>
            <span style={{fontSize:22}}>{nav.icon}</span>
            <span style={{fontSize:12}}>{nav.label}</span>
          </div>
        ))}
      </div>
      {/* Modals */}
      {modal && <Modal onClose={()=>setModal(null)} type={modal} />}
    </div>
  );
}

function Modal({ onClose, type }) {
  let content;
  if (type==='add') content = <div>Add Funds form (placeholder)</div>;
  else if (type==='send') content = <div>Send Crypto form (placeholder)</div>;
  else if (type==='transfer') content = <div>Transfer form (placeholder)</div>;
  else if (type==='chart') content = <div>Chart modal (placeholder)</div>;
  else content = null;
  return (
    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.2)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000}}>
      <div style={{background:'#fff',padding:32,borderRadius:12,minWidth:320}}>
        {content}
        <button style={{marginTop:24}} onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

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
