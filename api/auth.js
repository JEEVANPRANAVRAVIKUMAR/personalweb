// api/auth.js - Authentication & Session Token Endpoint with Native Crypto Fallback
const crypto = require('crypto');

const JWT_SECRET = process.env.JWT_SECRET || 'jeevanpranav_ai_os_secret_2026_jwt_token_key';
const VALID_USERNAME = process.env.APP_USERNAME || 'JeevanPranav';
const VALID_PASSWORD = process.env.APP_PASSWORD || 'Kangeyam(890)';

// Native lightweight JWT implementation using built-in crypto
function base64UrlEncode(str) {
  return Buffer.from(str).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function base64UrlDecode(str) {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) str += '=';
  return Buffer.from(str, 'base64').toString('utf8');
}

function generateToken(payload, secret = JWT_SECRET) {
  try {
    const jwt = require('jsonwebtoken');
    return jwt.sign(payload, secret, { expiresIn: '30d' });
  } catch (e) {
    // Native fallback
    const header = base64UrlEncode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const exp = Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60);
    const body = base64UrlEncode(JSON.stringify({ ...payload, exp }));
    const signature = crypto.createHmac('sha256', secret).update(`${header}.${body}`).digest('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    return `${header}.${body}.${signature}`;
  }
}

function verifyToken(token, secret = JWT_SECRET) {
  try {
    const jwt = require('jsonwebtoken');
    return jwt.verify(token, secret);
  } catch (e) {
    // Native fallback verification
    const parts = (token || '').split('.');
    if (parts.length !== 3) throw new Error("Invalid token format");
    const [header, body, sig] = parts;
    const expectedSig = crypto.createHmac('sha256', secret).update(`${header}.${body}`).digest('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    if (sig !== expectedSig) throw new Error("Invalid token signature");
    const payload = JSON.parse(base64UrlDecode(body));
    if (payload.exp && Math.floor(Date.now() / 1000) > payload.exp) {
      throw new Error("Token expired");
    }
    return payload;
  }
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 1. POST: Login
  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
      const { username, password } = body;

      if ((username || '').trim() === VALID_USERNAME && password === VALID_PASSWORD) {
        const user = {
          username: VALID_USERNAME,
          name: "JeevanPranav",
          role: "Engineer",
          loginTime: new Date().toISOString()
        };

        const token = generateToken({ user });

        return res.status(200).json({
          success: true,
          message: "Authentication successful",
          token,
          user
        });
      }

      return res.status(401).json({
        success: false,
        error: "Invalid username or password. Access restricted to authorized engineer."
      });
    } catch (e) {
      return res.status(500).json({ success: false, error: e.message });
    }
  }

  // 2. GET: Verify Token
  if (req.method === 'GET') {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, error: "Missing authentication token" });
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = verifyToken(token);
      return res.status(200).json({ success: true, user: decoded.user });
    } catch (e) {
      return res.status(401).json({ success: false, error: e.message || "Invalid session token" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
};
