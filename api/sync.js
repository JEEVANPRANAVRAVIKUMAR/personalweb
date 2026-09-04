// api/sync.js - Full State Bidirectional Cloud Synchronization Endpoint
const { getFullUserData, saveFullUserData, getActiveAdapterType } = require('./lib/db');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const username = req.query.username || 'JeevanPranav';

  // 1. GET: Pull Full State from Cloud Database
  if (req.method === 'GET') {
    try {
      const result = await getFullUserData(username);
      return res.status(200).json(result);
    } catch (e) {
      console.error("Sync GET error:", e);
      return res.status(500).json({ success: false, error: e.message });
    }
  }

  // 2. POST: Push / Sync State to Cloud Database
  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
      const result = await saveFullUserData(username, body);
      return res.status(200).json(result);
    } catch (e) {
      console.error("Sync POST error:", e);
      return res.status(500).json({ success: false, error: e.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
};
