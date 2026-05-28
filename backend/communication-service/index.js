const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');


const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

// Enable CORS for all routes (allow both 3000 and 3001)
app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:3001'], credentials: true }));
app.use(express.json());

// In-memory storage for demo
const messages = [];
const groups = ['General', 'Developers'];
const communities = ['Farmers', 'Buyers'];
const starredMessages = [];
const broadcastingList = [];
const linkedDevices = [];

// REST API
app.get('/api/communication/messages', (req, res) => {
  res.json(messages);
});

app.post('/api/communication/messages', (req, res) => {
  const { message, user } = req.body;
  const msg = { user, message, timestamp: Date.now() };
  messages.push(msg);
  io.emit('new_message', msg);
  res.json({ status: 'sent', msg });
});


// Groups
app.get('/api/communication/groups', (req, res) => {
  res.json(groups);
});
app.post('/api/communication/groups', (req, res) => {
  const { groupName } = req.body;
  if (!groupName) return res.status(400).json({ error: 'Group name required' });
  groups.push(groupName);
  io.emit('new_group', groupName);
  res.json({ status: 'created', groupName });
});

// Communities
app.get('/api/communication/communities', (req, res) => {
  res.json(communities);
});
app.post('/api/communication/communities', (req, res) => {
  const { communityName } = req.body;
  if (!communityName) return res.status(400).json({ error: 'Community name required' });
  communities.push(communityName);
  io.emit('new_community', communityName);
  res.json({ status: 'created', communityName });
});

// Starred Messages (stub)
app.get('/api/communication/starred', (req, res) => {
  res.json(starredMessages);
});
app.post('/api/communication/starred', (req, res) => {
  const { message } = req.body;
  if (message) starredMessages.push(message);
  res.json({ status: 'starred', message });
});

// Broadcasting List (stub)
app.get('/api/communication/broadcasting', (req, res) => {
  res.json(broadcastingList);
});
app.post('/api/communication/broadcasting', (req, res) => {
  const { item } = req.body;
  if (item) broadcastingList.push(item);
  res.json({ status: 'added', item });
});

// Linked Devices (stub)
app.get('/api/communication/devices', (req, res) => {
  res.json(linkedDevices);
});
app.post('/api/communication/devices', (req, res) => {
  const { device } = req.body;
  if (device) linkedDevices.push(device);
  res.json({ status: 'linked', device });
});

// Real-time chat
io.on('connection', (socket) => {
  socket.on('send_message', (msg) => {
    messages.push(msg);
    io.emit('new_message', msg);
  });
  socket.on('join_group', (group) => {
    socket.join(group);
  });
  // Add more events as needed
});

const PORT = process.env.PORT || 8085;
server.listen(PORT, () => {
  console.log(`Communication Service API running on port ${PORT}`);
});
