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
const ads = [
  {
    id: 1,
    type: 'banner',
    title: 'Farmers MK Services',
    content: 'Explore school, marketplace, communication, grants, and wallet services from one place.',
  },
  {
    id: 2,
    type: 'banner',
    title: 'Platform Access Plans',
    content: 'Review the Farmers MK subscription tiers and choose the package that fits your service usage.',
  },
];
const serviceCatalogs = {
  'subscription-plans': {
    slug: 'subscription-plans',
    title: 'Subscription Plans',
    description: 'Subscription pricing for platform access tiers across Farmers MK services.',
    accent: '#0891b2',
    note: 'Choose the plan that matches your current service needs and scale up as usage grows.',
    items_json: [
      ['Free', '$0'],
      ['Standard', '$3'],
      ['Premium', '$2'],
      ['Business', '$5'],
      ['Enterprise', '$10'],
    ],
  },
  'common-library': {
    slug: 'common-library',
    title: 'Common Library',
    description: 'Common learning and resource access for books, courses, certifications, and audio content.',
    accent: '#8b5cf6',
    note: 'Use this catalog to find training materials, learning tracks, and premium resources.',
    items_json: [
      ['Monthly Access', '$2/month'],
      ['Annual Access', '$15/year'],
      ['E-books', '$1-$5'],
      ['Training Courses', '$10-$30'],
      ['Certification Courses', '$40'],
      ['Audio Books', '$2'],
    ],
  },
  'android-app': {
    slug: 'android-app',
    title: 'Android App',
    description: 'Android app service for subscriptions and white-label mobile apps for institutions and businesses.',
    accent: '#f97316',
    note: 'Ideal for organizations that want a branded Android experience managed through Farmers MK.',
    items_json: [
      ['Premium Subscription', '$3/yearly'],
      ['White-label School App', '$250'],
      ['White-label Church App', '$250'],
      ['White-label Business App', '$400'],
      ['Institution Setup Fee', '$80'],
      ['Sponsored Section', '$15/month'],
    ],
  },
  'social-media': {
    slug: 'social-media',
    title: 'Social Media',
    description: 'Social media integration for promotion, premium communities, live events, and business visibility inside Farmers MK.',
    accent: '#7c3aed',
    note: 'Promote products, events, and community activity across the Farmers MK audience.',
    items_json: [
      ['Sponsored Post', '$3'],
      ['Business Advertisement', '$2/month'],
      ['Homepage Banner', '$5/week'],
      ['Premium Community', '$2/month'],
      ['Live Event Streaming', '$5/event'],
      ['Product Promotion', '$3'],
    ],
  },
};
const paymentAccounts = {
  'demo-user': {
    userId: 'demo-user',
    status: 'registered',
    trialActive: true,
    recurringEnabled: false,
    paymentMethod: 'MTN Mobile Money',
    updatedAt: new Date().toISOString(),
  },
};
const paymentTransactions = [
  {
    id: 1,
    userId: 'demo-user',
    serviceName: 'Payment Service',
    featureName: 'Starter Trial',
    amount: 0,
    paymentMethod: 'Trial Access',
    status: 'paid',
    createdAt: new Date().toISOString(),
  },
];

app.get('/api/ads/random', (req, res) => {
  const ad = ads[Math.floor(Math.random() * ads.length)];
  res.json(ad);
});

app.get('/api/catalogs/:slug', (req, res) => {
  const catalog = serviceCatalogs[req.params.slug];
  if (!catalog) {
    return res.status(404).json({ error: 'Catalog not found' });
  }
  res.json(catalog);
});

app.get('/api/payments/account/:userId', (req, res) => {
  const { userId } = req.params;
  if (!paymentAccounts[userId]) {
    paymentAccounts[userId] = {
      userId,
      status: 'registered',
      trialActive: true,
      recurringEnabled: false,
      paymentMethod: 'MTN Mobile Money',
      updatedAt: new Date().toISOString(),
    };
  }
  res.json(paymentAccounts[userId]);
});

app.post('/api/payments/account/:userId', (req, res) => {
  const { userId } = req.params;
  const current = paymentAccounts[userId] || {
    userId,
    status: 'registered',
    trialActive: true,
    recurringEnabled: false,
    paymentMethod: 'MTN Mobile Money',
  };
  paymentAccounts[userId] = {
    ...current,
    ...req.body,
    userId,
    updatedAt: new Date().toISOString(),
  };
  res.json(paymentAccounts[userId]);
});

app.get('/api/payments/transactions/:userId', (req, res) => {
  const { userId } = req.params;
  res.json(paymentTransactions.filter((transaction) => transaction.userId === userId));
});

app.post('/api/payments/transactions', (req, res) => {
  const { userId, serviceName, featureName, amount, paymentMethod } = req.body;
  if (!userId || !serviceName || !featureName) {
    return res.status(400).json({ error: 'userId, serviceName, and featureName are required' });
  }
  const transaction = {
    id: paymentTransactions.length + 1,
    userId,
    serviceName,
    featureName,
    amount: Number(amount || 0),
    paymentMethod: paymentMethod || 'MTN Mobile Money',
    status: 'paid',
    createdAt: new Date().toISOString(),
  };
  paymentTransactions.unshift(transaction);
  paymentAccounts[userId] = {
    ...(paymentAccounts[userId] || { userId }),
    status: 'registered',
    trialActive: false,
    recurringEnabled: paymentAccounts[userId]?.recurringEnabled || false,
    paymentMethod: transaction.paymentMethod,
    updatedAt: new Date().toISOString(),
  };
  res.status(201).json(transaction);
});

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
