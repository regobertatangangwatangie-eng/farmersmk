
import React, { useState, useEffect, useRef } from 'react';
const API_BASE = 'http://localhost:8080/api/chat';


export default function ChatWidget({ username = 'User', room = 'general', onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  // Fetch chat history on mount or when room changes
  useEffect(() => {
    fetch(`${API_BASE}/history/${encodeURIComponent(room)}`)
      .then(res => res.json())
      .then(data => setMessages(Array.isArray(data) ? data : []))
      .catch(() => setMessages([{ system: true, text: 'Failed to load chat history.' }]));
  }, [room]);


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  const sendMessage = () => {
    if (input.trim()) {
      fetch(`${API_BASE}/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ room, username, text: input })
      })
        .then(res => res.json())
        .then(res => {
          // If backend returns invoice, show confirmation and simulate sending
          if (res && res.invoice) {
            setMessages(msgs => [
              ...msgs,
              res.message,
              {
                system: true,
                text: `Invoice generated for $${res.invoice.price} on product "${res.invoice.product}". Sent to: Buyer (${res.invoice.buyer}), Farmer (${res.invoice.farmer}), Transit (${res.invoice.transitCompany}), Company (${res.invoice.company}).`
              }
            ]);
          } else {
            setMessages(msgs => [...msgs, res]);
          }
        })
        .catch(() => setMessages(msgs => [...msgs, { system: true, text: 'Failed to send message.' }]));
      setInput('');
    }
  };

  return (
    <div style={{ width: 340, height: 420, background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.12)', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ padding: 12, borderBottom: '1px solid #eee', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Chat
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#888', fontSize: 18, cursor: 'pointer' }}>×</button>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: 12 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ margin: '6px 0', color: msg.system ? '#888' : '#222' }}>
            {msg.system ? (
              <i>{msg.text}</i>
            ) : (
              <>
                <b>{msg.username}:</b> {msg.text}
                {msg.timestamp && (
                  <span style={{ color: '#aaa', fontSize: 11, marginLeft: 8 }}>
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </span>
                )}
              </>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div style={{ display: 'flex', borderTop: '1px solid #eee', padding: 8 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} style={{ marginLeft: 8, padding: '8px 16px', background: '#2196F3', color: '#fff', border: 'none', borderRadius: 6 }}>Send</button>
      </div>
    </div>
  );
}
