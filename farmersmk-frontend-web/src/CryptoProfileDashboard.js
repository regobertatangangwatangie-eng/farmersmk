import React from 'react';

const shortcuts = [
  { label: 'Chat', icon: '💬' },
  { label: 'Spot', icon: '📈' },
  { label: 'Simple Earn', icon: '🪙' },
  { label: 'Rewards Hub', icon: '⭐' },
  { label: 'Edit', icon: '✏️' },
];
const recommends = [
  { label: 'Simple Earn', icon: '🪙' },
  { label: 'Referral', icon: '➕' },
  { label: 'Add Funds', icon: '💵' },
  { label: 'Square', icon: '◼️' },
  { label: 'Alpha Events', icon: '📅' },
  { label: 'BNB Button', icon: '🟡' },
];

export default function CryptoProfileDashboard({ user, onBack, onShowServices }) {
  return (
    <div style={{background:'#fff',minHeight:'100vh',display:'flex',flexDirection:'column'}}>
      {/* Top Bar */}
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px'}}>
        <button style={iconBtn} onClick={onBack}>←</button>
        <div style={{display:'flex',gap:12}}>
          <button style={iconBtn}>📷</button>
          <button style={iconBtn}>🎧</button>
          <button style={iconBtn}>⚙️</button>
        </div>
      </div>
      {/* User Info */}
      <div style={{display:'flex',alignItems:'center',gap:16,padding:'0 16px'}}>
        <img src="https://bin.bnbstatic.com/static/images/common/logo.png" alt="avatar" style={{width:56,height:56,borderRadius:'50%',background:'#eee'}} />
        <div>
          <div style={{fontSize:13,color:'#888'}}>ID: 451560775</div>
          <div style={{fontSize:20,fontWeight:700}}>Regobert2004</div>
          <div style={{display:'flex',gap:8,marginTop:4}}>
            <span style={badgeStyle}>Regular</span>
            <span style={{...badgeStyle,background:'#e0f7fa',color:'#009688'}}>Verified</span>
          </div>
        </div>
      </div>
      {/* Shortcuts */}
      <div style={{margin:'32px 0 0 0'}}>
        <div style={{fontWeight:600,fontSize:16,padding:'0 16px 8px'}}>Shortcut</div>
        <div style={{display:'flex',flexWrap:'wrap',gap:16,padding:'0 16px'}}>
          {shortcuts.map(s => (
            <button key={s.label} style={shortcutBtn} onClick={()=>alert(s.label+' clicked')}>{s.icon}<div style={{fontSize:13,marginTop:4}}>{s.label}</div></button>
          ))}
        </div>
      </div>
      {/* Recommend */}
      <div style={{margin:'32px 0 0 0'}}>
        <div style={{fontWeight:600,fontSize:16,padding:'0 16px 8px'}}>Recommend</div>
        <div style={{display:'flex',flexWrap:'wrap',gap:16,padding:'0 16px'}}>
          {recommends.map(s => (
            <button key={s.label} style={shortcutBtn} onClick={()=>alert(s.label+' clicked')}>{s.icon}<div style={{fontSize:13,marginTop:4}}>{s.label}</div></button>
          ))}
        </div>
      </div>
      {/* More Services */}
      <div style={{display:'flex',justifyContent:'center',margin:'32px 0'}}>
        <button style={moreBtn} onClick={onShowServices}>More Services</button>
      </div>
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
const badgeStyle = {
  background:'#f3f3f3',
  color:'#222',
  borderRadius:8,
  padding:'2px 10px',
  fontSize:12,
  fontWeight:600,
};
const shortcutBtn = {
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
const moreBtn = {
  background:'#eee',
  color:'#222',
  border:'none',
  borderRadius:8,
  padding:'12px 32px',
  fontWeight:600,
  fontSize:16,
  cursor:'pointer',
};
