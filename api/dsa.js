// api/dsa.js - DSA Track Modular API Endpoint
const { getFullUserData, saveFullUserData } = require('./lib/db');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const username = req.query.username || 'JeevanPranav';

  // GET: Fetch DSA Data
  if (req.method === 'GET') {
    try {
      const userState = await getFullUserData(username);
      const data = userState.data || {};
      return res.status(200).json({
        success: true,
        dsaProblems: data.dsaProblems || [],
        dsaAlreadySolved: data.dsaAlreadySolved || [],
        dsaSettings: data.settings?.dsa || {}
      });
    } catch (e) {
      return res.status(500).json({ success: false, error: e.message });
    }
  }

  // POST: Update DSA Problem / Settings
  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
      const { action, problemId, updates, settings } = body;

      const userState = await getFullUserData(username);
      const data = userState.data || {};

      let dsaProblems = Array.isArray(data.dsaProblems) ? [...data.dsaProblems] : [];

      if (action === 'update_problem' && problemId) {
        const idx = dsaProblems.findIndex(p => String(p.id) === String(problemId) || String(p.lcNumber) === String(problemId));
        if (idx !== -1) {
          dsaProblems[idx] = { ...dsaProblems[idx], ...updates };
        }
      }

      await saveFullUserData(username, { ...data, dsaProblems, settings: { ...data.settings, ...(settings ? { dsa: settings } : {}) } });
      return res.status(200).json({ success: true, message: "DSA State updated successfully" });
    } catch (e) {
      return res.status(500).json({ success: false, error: e.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
};
