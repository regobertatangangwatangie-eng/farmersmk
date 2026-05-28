const commonFunctions = [
  { label: 'Account Statement', icon: '💵' },
  { label: 'Add Funds', icon: '💳' },
  { label: 'Demo Trading', icon: '🎮' },
  { label: 'Disable Account', icon: '🚫' },
  { label: 'Transfer', icon: '🔀' },
  { label: 'Binance Wallet', icon: '👛' },
  { label: 'Launchpool', icon: '🚀' },
  { label: 'Referral', icon: '👥' },
  { label: 'Pay', icon: '💸' },
  { label: 'Orders', icon: '📄' },
  { label: 'Sell to Fiat', icon: '💱' },
  { label: 'Withdraw Fiat', icon: '🏧' },
  { label: 'Security', icon: '🔒' },
];

const giftCampaign = [
  { label: 'Word of the Day', icon: '🔤' },
  { label: 'BNB Button', icon: '🟡' },
  { label: 'New Listing Promos', icon: '➕' },
  { label: 'Win 1 BTC', icon: '🎁' },
  { label: 'Refer2Earn', icon: '👥' },
  { label: 'Spot Colosseum', icon: '🏟️' },
  { label: 'Trade Futures & Win', icon: '⚔️' },
  { label: 'Monthly Challenge', icon: '📊' },
  { label: 'Rewards Hub', icon: '⭐' },
  { label: 'Futures Masters', icon: '🗡️' },
  { label: 'My Gifts', icon: '🎁' },
  { label: 'Learn & Earn', icon: '📚' },
  { label: 'Red Packet', icon: '🧧' },
  { label: 'Transfer & Win', icon: '🔄' },
  { label: 'Alpha Events', icon: '📅' },
  {}, {}, {}
];

const trade = [
  { label: 'Convert', icon: '🔄' },
  { label: 'Alpha', icon: '🅰️' },
  { label: 'Smart Money', icon: '💡' },
  { label: 'Spot', icon: '📈' },
  { label: 'Prediction', icon: '🔮' },
  { label: 'Margin', icon: '📊' },
  { label: 'Copy Trading', icon: '👥' },
  { label: 'Futures', icon: '📈' },
  { label: 'OTC', icon: '🏦' },
  { label: 'P2P', icon: '👫' },
  { label: 'Trading Bots', icon: '🤖' },
  { label: 'Convert Recurring', icon: '🔁' },
  { label: 'Options', icon: '📄' },
  {}, {}, {}
];

const earn = [
  { label: 'Earn', icon: '👜' },
  { label: 'Simple Earn', icon: '🪙' },
  { label: 'Staking', icon: '📈' },
  { label: 'USD Yield Hub', icon: '💵' },
  { label: 'Yield Arena', icon: '🏟️' },
  { label: 'Pool', icon: '🏊' },
  { label: 'Dual Investment', icon: '⚖️' },
  { label: 'Discount Buy', icon: '💲' },
  {}, {}, {}
];
import React, { useState } from 'react';

// Simple API utility for wallet endpoints
const API_BASE = 'http://localhost:8082/api/wallet';
async function walletApi(path, method = 'GET', body = null, token = null) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) throw new Error(data.message || 'Error');
}

const finance = [
  { label: 'Loans', icon: '🪙' },
  { label: 'VIP Loan', icon: '👜' },
  { label: 'Binance Wealth', icon: '📈' },
  // Empty slots for grid alignment
  {}, {}, {}, {},
];

const info = [
  { label: 'Chat', icon: '💬' },
  { label: `ABC's of Crypto`, icon: '📒' },
  { label: 'Square', icon: '🟨' },
  { label: 'Binance Academy', icon: '🎓' },
  { label: 'Research', icon: '🔬' },
  { label: 'Futures Chatroom', icon: '💬' },
  { label: 'Deposit & Withdrawal ...', icon: '📄' },
  { label: 'Airdrop', icon: '🎈' },
  { label: 'Proof of Reserves', icon: '🔍' },
  // Empty slots for grid alignment
  {}, {}, {},
];

const helpSupport = [
  { label: 'Binance Ai', icon: '🤖' },
  { label: 'Action Required', icon: '⚠️' },
  { label: 'Binance Verify', icon: '✅' },
  { label: 'Support', icon: '😊' },
  { label: 'Customer Service', icon: '👨‍💼' },
  { label: 'Product Feedback', icon: '📝' },
  { label: 'Self Service', icon: '🛠️' },
  // Empty slots for grid alignment
  {}, {}, {},
];

const tabs = [
  { label: 'Common Function', key: 'common' },
  { label: 'Gift & Campaign', key: 'gift' },
  { label: 'Trade', key: 'trade' },
  { label: 'Earn', key: 'earn' },
  { label: 'Finance', key: 'finance' },
  { label: 'Information', key: 'info' },
  { label: 'Help & Support', key: 'help' },
  { label: 'Others', key: 'others' },
];
const others = [
  { label: 'Affiliate', icon: '🧑‍🤝‍🧑' },
  { label: 'Binance Junior', icon: '🌱' },
  { label: 'Third-party Account', icon: '📁' },
  { label: 'Megadrop', icon: '🎁' },
  { label: 'Token Unlock', icon: '🔓' },
  { label: 'Gift Card', icon: '🎫' },
  { label: 'Trading Insight', icon: '📊' },
  { label: 'API Management', icon: '🔗' },
  { label: 'Fan Token', icon: '🏅' },
  { label: 'Binance NFT', icon: '🖼️' },
  { label: 'Marketplace', icon: '🏪' },
  { label: 'BABT', icon: '🛡️' },
  { label: 'Send Cash', icon: '💸' },
  { label: 'Charity', icon: '🤲' },
  // Empty slots for grid alignment
  {}, {},
];


export default function CryptoServicesDashboard({ onBack }) {
  const [activeTab, setActiveTab] = useState('common');
  const [search, setSearch] = useState('');
  const [jwt, setJwt] = useState(localStorage.getItem('wallet_jwt') || '');
  const [email, setEmail] = useState(localStorage.getItem('wallet_email') || '');
  const [modal, setModal] = useState(null); // e.g., 'deposit', 'send', etc.
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [amount, setAmount] = useState('');

  // Example: handle Add Funds/Deposit
  async function handleDeposit() {
    setLoading(true);
    setMessage('');
    try {
      await walletApi('/deposit', 'POST', { email, amount: parseFloat(amount), password: '' }, jwt);
      setMessage('Deposit successful!');
    } catch (e) {
      setMessage(e.message);
    }
    setLoading(false);
  }

  return (
    <div style={{background:'#fff',minHeight:'100vh',display:'flex',flexDirection:'column'}}>
      {/* Top Bar */}
      <div style={{display:'flex',alignItems:'center',padding:'16px 0 0 8px'}}>
        <button style={iconBtn} onClick={onBack}>←</button>
        <span style={{fontWeight:700,fontSize:20,marginLeft:16}}>Services</span>
      </div>

      {/* Deposit Modal Example */}
      {modal==='deposit' && (
        <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.2)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div style={{background:'#fff',padding:32,borderRadius:12,minWidth:320}}>
            <h3>Deposit Funds</h3>
            <input type="number" placeholder="Amount" value={amount} onChange={e=>setAmount(e.target.value)} style={{width:'100%',marginBottom:12,padding:8}} />
            <button onClick={handleDeposit} disabled={loading || !amount} style={{padding:'8px 24px',background:'#4CAF50',color:'#fff',border:'none',borderRadius:6,marginRight:8}}>{loading?'Processing...':'Deposit'}</button>
            <button onClick={()=>setModal(null)} style={{padding:'8px 24px',background:'#888',color:'#fff',border:'none',borderRadius:6}}>Cancel</button>
            {message && <div style={{marginTop:12,color:message.includes('success')?'green':'red'}}>{message}</div>}
          </div>
        </div>
      )}
      {/* Search Bar */}
      <div style={{padding:'12px 16px'}}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search more services" style={{width:'100%',padding:'10px 16px',borderRadius:8,border:'1px solid #eee',fontSize:16}} />
      </div>
      {/* Tabs */}
      <div style={{display:'flex',gap:24,padding:'0 16px',marginBottom:8}}>
        {tabs.map(tab => (
          <span key={tab.key} style={{fontWeight:activeTab===tab.key?700:400,color:activeTab===tab.key?'#f3c41c':'#888',borderBottom:activeTab===tab.key?'2px solid #f3c41c':'none',paddingBottom:4,cursor:'pointer'}} onClick={()=>setActiveTab(tab.key)}>{tab.label}</span>
        ))}
      </div>
      {/* Services Grid */}
      {activeTab==='common' && (
        <div style={{display:'flex',flexWrap:'wrap',gap:16,padding:'16px'}}>
          {commonFunctions.map(s => (
            <button key={s.label} style={serviceBtn} onClick={()=>{
              if (s.label==='Add Funds') setModal('deposit');
              else alert(s.label+' clicked');
            }}>{s.icon}<div style={{fontSize:13,marginTop:4}}>{s.label}</div></button>
          ))}
        </div>
      )}
      {activeTab==='gift' && (
        <>
        <div style={{fontWeight:600,fontSize:16,padding:'0 16px 8px'}}>Gift & Campaign</div>
        <div style={{display:'flex',flexWrap:'wrap',gap:16,padding:'0 16px'}}>
          {giftCampaign.map((s, i) => (
            s.label ? (
              <button key={s.label} style={serviceBtn} onClick={()=>alert(s.label+' clicked')}>{s.icon}<div style={{fontSize:13,marginTop:4}}>{s.label}</div></button>
            ) : (
              <div key={i} style={serviceBtn}></div>
            )
          ))}
        </div>
        <div style={{fontWeight:600,fontSize:16,padding:'24px 16px 8px'}}>Trade</div>
        <div style={{display:'flex',flexWrap:'wrap',gap:16,padding:'0 16px'}}>
          {trade.map((s, i) => (
            s.label ? (
              <button key={s.label} style={serviceBtn} onClick={()=>alert(s.label+' clicked')}>{s.icon}<div style={{fontSize:13,marginTop:4}}>{s.label}</div></button>
            ) : (
              <div key={i} style={serviceBtn}></div>
            )
          ))}
        </div>
        </>
      )}
      {activeTab==='trade' && (
        <>
        <div style={{fontWeight:600,fontSize:16,padding:'0 16px 8px'}}>Trade</div>
        <div style={{display:'flex',flexWrap:'wrap',gap:16,padding:'0 16px'}}>
          {trade.map((s, i) => (
            s.label ? (
              <button key={s.label} style={serviceBtn} onClick={()=>alert(s.label+' clicked')}>{s.icon}<div style={{fontSize:13,marginTop:4}}>{s.label}</div></button>
            ) : (
              <div key={i} style={serviceBtn}></div>
            )
          ))}
        </div>
        <div style={{fontWeight:600,fontSize:16,padding:'24px 16px 8px'}}>Earn</div>
        <div style={{display:'flex',flexWrap:'wrap',gap:16,padding:'0 16px'}}>
          {earn.map((s, i) => (
            s.label ? (
              <button key={s.label} style={serviceBtn} onClick={()=>alert(s.label+' clicked')}>{s.icon}<div style={{fontSize:13,marginTop:4}}>{s.label}</div></button>
            ) : (
              <div key={i} style={serviceBtn}></div>
            )
          ))}
        </div>
        </>
      )}
      {activeTab==='info' && (
        <>
        <div style={{fontWeight:600,fontSize:16,padding:'0 16px 8px'}}>Information</div>
        <div style={{display:'flex',flexWrap:'wrap',gap:16,padding:'0 16px'}}>
          {info.map((s, i) => (
            s.label ? (
              <button key={s.label} style={serviceBtn} onClick={()=>alert(s.label+' clicked')}>{s.icon}<div style={{fontSize:13,marginTop:4}}>{s.label}</div></button>
            ) : (
              <div key={i} style={serviceBtn}></div>
            )
          ))}
        </div>
        </>
      )}
      {/* Bottom Bar Placeholder */}
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
const serviceBtn = {
  background:'#fafafa',
  border:'none',
  borderRadius:16,
  width:72,
  height:72,
  display:'flex',
  flexDirection:'column',
  alignItems:'center',
  justifyContent:'center',
  fontSize:24,
  cursor:'pointer',
  boxShadow:'0 1px 4px rgba(0,0,0,0.04)'
};
