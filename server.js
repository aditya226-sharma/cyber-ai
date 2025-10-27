const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Threat detection algorithms
const threatPatterns = {
  dangerous: ['paypal-secure', 'bank-verify', 'urgent', 'verify account', 'click here', 'wire transfer', 'fraud', 'scam'],
  warning: ['password', 'update', 'login', 'suspicious', '555', '000', '111', '999']
};

const calculateThreatScore = (input, type) => {
  let score = 0;
  const lower = input.toLowerCase();
  
  threatPatterns.dangerous.forEach(pattern => {
    if (lower.includes(pattern)) score += 30;
  });
  
  threatPatterns.warning.forEach(pattern => {
    if (lower.includes(pattern)) score += 15;
  });
  
  if (type === 'url' && !input.startsWith('https://')) score += 20;
  
  return Math.min(score, 100);
};

// API Routes
app.post('/api/scan/url', (req, res) => {
  const { url } = req.body;
  const score = calculateThreatScore(url, 'url');
  
  let status = 'safe';
  if (score >= 50) status = 'dangerous';
  else if (score >= 20) status = 'warning';
  
  res.json({
    url,
    status,
    score,
    timestamp: new Date().toISOString(),
    details: {
      ssl: url.startsWith('https://'),
      reputation: status === 'safe' ? 'good' : status === 'warning' ? 'questionable' : 'bad'
    }
  });
});

app.post('/api/scan/message', (req, res) => {
  const { message } = req.body;
  const score = calculateThreatScore(message, 'message');
  
  let status = 'safe';
  if (score >= 40) status = 'dangerous';
  else if (score >= 15) status = 'warning';
  
  res.json({
    message: message.substring(0, 100) + '...',
    status,
    score,
    timestamp: new Date().toISOString(),
    analysis: {
      phishing: score > 30,
      spam: score > 20,
      sentiment: status === 'safe' ? 'neutral' : 'suspicious'
    }
  });
});

app.post('/api/scan/phone', (req, res) => {
  const { phone } = req.body;
  const score = calculateThreatScore(phone, 'phone');
  
  let status = 'safe';
  if (score >= 30) status = 'dangerous';
  else if (score >= 15) status = 'warning';
  
  res.json({
    phone,
    status,
    score,
    timestamp: new Date().toISOString(),
    info: {
      type: status === 'dangerous' ? 'spam' : status === 'warning' ? 'suspicious' : 'legitimate',
      carrier: 'Unknown'
    }
  });
});

app.get('/api/dashboard/stats', (req, res) => {
  res.json({
    scansToday: Math.floor(Math.random() * 2000) + 1000,
    threatsBlocked: Math.floor(Math.random() * 100) + 50,
    activeThreats: Math.floor(Math.random() * 50) + 10,
    systemStatus: 'operational',
    lastUpdate: new Date().toISOString()
  });
});

app.post('/api/ai/chat', (req, res) => {
  const { message } = req.body;
  const responses = {
    'phishing': 'Phishing emails often contain urgent language, suspicious links, and requests for personal information. Always verify sender identity.',
    'password': 'Use strong, unique passwords with 12+ characters, including numbers, symbols, and mixed case. Enable 2FA when possible.',
    '2fa': 'Two-factor authentication adds an extra security layer by requiring a second verification method beyond your password.',
    'default': 'I can help with cybersecurity questions about phishing, passwords, 2FA, malware, and online safety best practices.'
  };
  
  const key = Object.keys(responses).find(k => message.toLowerCase().includes(k)) || 'default';
  
  res.json({
    response: responses[key],
    timestamp: new Date().toISOString(),
    confidence: 0.95
  });
});

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`CyberShield AI Backend running on port ${PORT}`);
});