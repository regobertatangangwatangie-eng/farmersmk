import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { FaCamera, FaEllipsisV, FaSearch, FaArrowLeft } from 'react-icons/fa';

const menuOptions = [
  'New Group',
  'New Community',
  'Broadcasting List',
  'Linked Devices',
  'Starred Messages',
  'Settings',
];

// Dummy user list (static for now)
const users = [
  { id: 1, number: '+1234567890', name: 'Alice', profilePic: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { id: 2, number: '+1987654321', name: 'Bob', profilePic: 'https://randomuser.me/api/portraits/men/2.jpg' },
  { id: 3, number: '+1122334455', name: 'Carol', profilePic: 'https://randomuser.me/api/portraits/women/3.jpg' },
];

// Vertical service list (order enforced)
const services = [
  { key: 'communication', label: 'Communication Service', icon: '💬' },
  { key: 'marketplace', label: 'Marketplace Services', icon: '🛒' },
];

const filterTabs = ['All', 'Unread', 'Favorited'];
const mainTabs = ['Message', 'Update', 'Community', 'Calls', 'Go Live', 'Reels'];

export default function CommunicationDashboard() {
  const [showMenu, setShowMenu] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeTab, setActiveTab] = useState('Message');
  const [search, setSearch] = useState('');
  // Real-time chat state
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [modal, setModal] = useState(null); // For menu actions
  const [modalData, setModalData] = useState({}); // For forms
  const [activeService, setActiveService] = useState('communication');
  const [groupList, setGroupList] = useState([]);
  const [communityList, setCommunityList] = useState([]);
  const socketRef = useRef(null);
  // Fetch groups and communities on mount
  useEffect(() => {
    fetch('http://localhost:8085/api/communication/groups')
      .then(res => res.json())
      .then(data => setGroupList(Array.isArray(data) ? data : []));
    fetch('http://localhost:8085/api/communication/communities')
      .then(res => res.json())
      .then(data => setCommunityList(Array.isArray(data) ? data : []));
  }, []);

  // Connect to Socket.IO backend
  useEffect(() => {
    if (activeTab !== 'Message') return;
    if (!socketRef.current) {
      socketRef.current = io('http://localhost:8085');
      socketRef.current.on('new_message', msg => {
        setMessages(prev => [...prev, msg]);
      });
    }
    // Fetch initial messages
    fetch('http://localhost:8085/api/communication/messages')
      .then(res => res.json())
      .then(data => setMessages(Array.isArray(data) ? data : []));
    return () => {
      // Optionally disconnect socket on tab switch
      // socketRef.current?.disconnect();
    };
  }, [activeTab]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const msg = { user: 'You', message: input, timestamp: Date.now() };
    socketRef.current.emit('send_message', msg);
    setInput('');
  };

  // Menu action handler
  const handleMenuAction = (action) => {
    setShowMenu(false);
    setModal(action);
    setModalData({});
  };

  // Group creation handler (integrated)
  const handleCreateGroup = async (e) => {
    e.preventDefault();
    const groupName = modalData.groupName;
    if (!groupName) return;
    const res = await fetch('http://localhost:8085/api/communication/groups', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ groupName })
    });
    const data = await res.json();
    if (data.status === 'created') {
      setGroupList(prev => [...prev, groupName]);
      alert('Group "' + groupName + '" created!');
    } else {
      alert('Failed to create group.');
    }
    setModal(null);
  };
  // Community creation handler (integrated)
  const handleCreateCommunity = async (e) => {
    e.preventDefault();
    const communityName = modalData.communityName;
    if (!communityName) return;
    const res = await fetch('http://localhost:8085/api/communication/communities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ communityName })
    });
    const data = await res.json();
    if (data.status === 'created') {
      setCommunityList(prev => [...prev, communityName]);
      alert('Community "' + communityName + '" created!');
    } else {
      alert('Failed to create community.');
    }
    setModal(null);
  };

  return (
    <div className="communication-dashboard" style={{ display: 'flex', maxWidth: 900, margin: '0 auto', fontFamily: 'sans-serif' }}>
      {/* Vertical Service List */}
      <div style={{ width: 200, borderRight: '1px solid #eee', background: '#fafbfc', paddingTop: 24 }}>
        <div style={{ fontWeight: 'bold', fontSize: 15, color: '#555', marginBottom: 10, marginLeft: 12 }}>Services</div>
        <div>
          {/* Communication Service always first */}
          <div
            key={services[0].key}
            onClick={() => setActiveService(services[0].key)}
            style={{
              padding: '18px 12px',
              cursor: 'pointer',
              background: activeService === services[0].key ? '#e6f0fa' : 'transparent',
              fontWeight: activeService === services[0].key ? 'bold' : 'normal',
              display: 'flex', alignItems: 'center', gap: 10, fontSize: 17
            }}
          >
            <span style={{ fontSize: 22 }}>{services[0].icon}</span> {services[0].label}
          </div>
          {/* Marketplace Service always second */}
          <div
            key={services[1].key}
            onClick={() => setActiveService(services[1].key)}
            style={{
              padding: '18px 12px',
              cursor: 'pointer',
              background: activeService === services[1].key ? '#e6f0fa' : 'transparent',
              fontWeight: activeService === services[1].key ? 'bold' : 'normal',
              display: 'flex', alignItems: 'center', gap: 10, fontSize: 17
            }}
          >
            <span style={{ fontSize: 22 }}>{services[1].icon}</span> {services[1].label}
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div style={{ flex: 1 }}>
      {/* Top Bar with Back Arrow */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '16px 8px 8px 8px', borderBottom: '1px solid #eee' }}>
        <FaArrowLeft style={{ fontSize: 22, marginRight: 16, cursor: 'pointer' }} title="Back" onClick={() => window.history.back()} />
        <span style={{ fontWeight: 'bold', fontSize: 20, marginRight: 16 }}>Communication</span>
        <FaCamera style={{ fontSize: 20, marginRight: 16, cursor: 'pointer' }} title="Camera (stub)" />
        <div style={{ position: 'relative' }}>
          <FaEllipsisV style={{ fontSize: 20, cursor: 'pointer' }} onClick={() => setShowMenu((v) => !v)} title="Menu" />
          {showMenu && (
            <div style={{ position: 'absolute', top: 24, left: 0, background: '#fff', border: '1px solid #ccc', borderRadius: 4, zIndex: 10, minWidth: 180 }}>
              {menuOptions.map((opt) => (
                <div key={opt} style={{ padding: '8px 16px', cursor: 'pointer', borderBottom: '1px solid #eee' }} onClick={() => handleMenuAction(opt)}>{opt}</div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Three Dots Menu */}
      <div style={{ position: 'relative' }}>
        <FaEllipsisV style={{ fontSize: 20, cursor: 'pointer' }} onClick={() => setShowMenu((v) => !v)} />
        {showMenu && (
          <div style={{ position: 'absolute', top: 24, right: 0, background: '#fff', border: '1px solid #ddd', borderRadius: 4, zIndex: 10, minWidth: 180, boxShadow: '0 2px 8px #0001' }}>
            {menuOptions.map((opt) => (
              <div key={opt} style={{ padding: '8px 16px', cursor: 'pointer', borderBottom: '1px solid #f0f0f0' }}
                onClick={() => { setShowMenu(false); alert(opt + ' (stub)'); }}>
                {opt}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Search Bar */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '8px', borderBottom: '1px solid #eee' }}>
        <FaSearch style={{ marginRight: 8 }} />
        <input
          type="text"
          placeholder="Search numbers, contacts, ..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ flex: 1, border: 'none', outline: 'none', fontSize: 16 }}
        />
      </div>
      {/* Filter Tabs and User List */}
      <div style={{ borderBottom: '1px solid #eee', background: '#fafafa' }}>
        <div style={{ display: 'flex' }}>
          {filterTabs.map(tab => (
            <div
              key={tab}
              onClick={() => setActiveFilter(tab)}
              style={{
                flex: 1,
                textAlign: 'center',
                padding: '10px 0',
                cursor: 'pointer',
                fontWeight: activeFilter === tab ? 'bold' : 'normal',
                borderBottom: activeFilter === tab ? '2px solid #007bff' : 'none',
                color: activeFilter === tab ? '#007bff' : '#333',
              }}
            >
              {tab}
            </div>
          ))}
        </div>
        {/* User List */}
        <div style={{ maxHeight: 90, overflowY: 'auto', background: '#fff', borderBottom: '1px solid #eee', display: 'flex', flexDirection: 'column' }}>
          {users.map(user => (
            <div key={user.id} style={{ display: 'flex', alignItems: 'center', padding: '6px 12px', borderBottom: '1px solid #f5f5f5', cursor: 'pointer' }}>
              <img src={user.profilePic} alt={user.name} style={{ width: 36, height: 36, borderRadius: '50%', marginRight: 12 }} />
              <div>
                <div style={{ fontWeight: 'bold', fontSize: 15 }}>{user.name}</div>
                <div style={{ color: '#888', fontSize: 13 }}>{user.number}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Main Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid #eee', background: '#f5f5f5' }}>
        {mainTabs.map(tab => (
          <div
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              flex: 1,
              textAlign: 'center',
              padding: '12px 0',
              cursor: 'pointer',
              fontWeight: activeTab === tab ? 'bold' : 'normal',
              borderBottom: activeTab === tab ? '2px solid #28a745' : 'none',
              color: activeTab === tab ? '#28a745' : '#333',
            }}
          >
            {tab}
          </div>
        ))}
      </div>
      {/* Tab Content */}
      <div style={{ padding: 24, minHeight: 200 }}>
        {activeTab === 'Message' ? (
          <div>
            <h3>Messages</h3>
            <div style={{ maxHeight: 220, overflowY: 'auto', background: '#f9f9f9', borderRadius: 8, padding: 12, marginBottom: 12, border: '1px solid #eee' }}>
              {messages.length === 0 && <div style={{ color: '#aaa' }}>No messages yet.</div>}
              {messages.map((msg, idx) => (
                <div key={idx} style={{ marginBottom: 8 }}>
                  <b>{msg.user || 'User'}:</b> {msg.message}
                  <span style={{ color: '#aaa', fontSize: 12, marginLeft: 8 }}>{new Date(msg.timestamp).toLocaleTimeString()}</span>
                </div>
              ))}
            </div>
            <form onSubmit={handleSend} style={{ display: 'flex', gap: 8 }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type a message..."
                style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
              />
              <button type="submit" style={{ padding: '8px 18px', background: '#007bff', color: '#fff', border: 'none', borderRadius: 6 }}>Send</button>
            </form>
            {/* Show groups and communities for demo */}
            <div style={{ marginTop: 24 }}>
              <h4>Groups</h4>
              <ul>
                {groupList.map((g, i) => <li key={i}>{g}</li>)}
              </ul>
              <h4>Communities</h4>
              <ul>
                {communityList.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </div>
          </div>
        ) : (
          <>
            <h3>{activeTab}</h3>
            <p>Feature coming soon: {activeTab} functionality will be available here.</p>
          </>
        )}
      </div>

      {/* Modals for menu actions */}
      {modal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#0005', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setModal(null)}>
          <div style={{ background: '#fff', padding: 32, borderRadius: 10, minWidth: 340 }} onClick={e => e.stopPropagation()}>
            <h2>{modal}</h2>
            <div style={{ margin: '16px 0' }}>
              {modal === 'New Group' && (
                <form onSubmit={handleCreateGroup}>
                  <input
                    type="text"
                    placeholder="Group Name"
                    value={modalData.groupName || ''}
                    onChange={e => setModalData({ ...modalData, groupName: e.target.value })}
                    style={{ width: '100%', padding: 8, marginBottom: 16, borderRadius: 6, border: '1px solid #ccc' }}
                    required
                  />
                  <button type="submit" style={{ padding: '8px 18px', background: '#007bff', color: '#fff', border: 'none', borderRadius: 6 }}>Create Group</button>
                </form>
              )}
              {modal === 'New Community' && (
                <form onSubmit={handleCreateCommunity}>
                  <input
                    type="text"
                    placeholder="Community Name"
                    value={modalData.communityName || ''}
                    onChange={e => setModalData({ ...modalData, communityName: e.target.value })}
                    style={{ width: '100%', padding: 8, marginBottom: 16, borderRadius: 6, border: '1px solid #ccc' }}
                    required
                  />
                  <button type="submit" style={{ padding: '8px 18px', background: '#007bff', color: '#fff', border: 'none', borderRadius: 6 }}>Create Community</button>
                </form>
              )}
              {modal === 'Broadcasting List' && (
                <div>
                  <p>Broadcasting list feature coming soon.</p>
                  <button onClick={() => alert('Broadcasting list opened!')} style={{ padding: '8px 18px', background: '#28a745', color: '#fff', border: 'none', borderRadius: 6 }}>Open List</button>
                </div>
              )}
              {modal === 'Linked Devices' && (
                <div>
                  <p>Link a new device by scanning the QR code (feature coming soon).</p>
                  <button onClick={() => alert('Device linking started!')} style={{ padding: '8px 18px', background: '#17a2b8', color: '#fff', border: 'none', borderRadius: 6 }}>Link Device</button>
                </div>
              )}
              {modal === 'Starred Messages' && (
                <div>
                  <p>Starred messages feature coming soon.</p>
                  <button onClick={() => alert('Starred messages opened!')} style={{ padding: '8px 18px', background: '#ffc107', color: '#333', border: 'none', borderRadius: 6 }}>Show Starred</button>
                </div>
              )}
              {modal === 'Settings' && (
                <div>
                  <p>Settings page feature coming soon.</p>
                  <button onClick={() => alert('Settings opened!')} style={{ padding: '8px 18px', background: '#6c757d', color: '#fff', border: 'none', borderRadius: 6 }}>Open Settings</button>
                </div>
              )}
            </div>
            <button onClick={() => setModal(null)} style={{ padding: '8px 18px', background: '#007bff', color: '#fff', border: 'none', borderRadius: 6, marginTop: 10 }}>Close</button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
