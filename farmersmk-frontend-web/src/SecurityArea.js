import React, { useState } from 'react';

export default function SecurityArea() {
  const [docs, setDocs] = useState([
    { name: 'ID Card.pdf', uploaded: '2026-05-20' },
    { name: 'Business License.pdf', uploaded: '2026-05-21' }
  ]);
  const [file, setFile] = useState(null);

  const handleUpload = e => {
    e.preventDefault();
    if (file) {
      setDocs([...docs, { name: file.name, uploaded: new Date().toISOString().slice(0,10) }]);
      setFile(null);
    }
  };

  return (
    <div>
      <h3>Security Area</h3>
      <form onSubmit={handleUpload} style={{ margin: '16px 0', background: '#f9f9f9', padding: 16, borderRadius: 8 }}>
        <input type="file" onChange={e => setFile(e.target.files[0])} />
        <button type="submit" style={{ marginLeft: 8, padding: '6px 16px', background: '#2196F3', color: '#fff', border: 'none', borderRadius: 6 }}>Upload</button>
      </form>
      <div style={{ margin: '18px 0' }}>
        <b>Uploaded Documents</b>
        <ul style={{ marginTop: 8 }}>
          {docs.map((d, i) => (
            <li key={i} style={{ margin: '6px 0', padding: 6, borderBottom: '1px solid #eee' }}>
              {d.name} (Uploaded: {d.uploaded}) <button style={{ marginLeft: 8, padding: '2px 10px', background: '#607D8B', color: '#fff', border: 'none', borderRadius: 4 }}>Download</button>
            </li>
          ))}
        </ul>
      </div>
      <div style={{ margin: '18px 0', fontSize: 13, color: '#888' }}>
        Documents are used for account verification, withdrawal limits, and official receipts.<br />
        All files are stored securely and can be downloaded anytime.
      </div>
    </div>
  );
}