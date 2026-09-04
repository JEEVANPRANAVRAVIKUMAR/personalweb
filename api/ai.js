// api/ai.js - AI Engineer Track Modular API Endpoint
const { getFullUserData, saveFullUserData } = require('./lib/db');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const username = req.query.username || 'JeevanPranav';

  // GET: Fetch AI Data
  if (req.method === 'GET') {
    try {
      const userState = await getFullUserData(username);
      const data = userState.data || {};
      return res.status(200).json({
        success: true,
        days: data.days || [],
        doubts: data.doubts || [],
        projects: data.projects || [],
        checkpoints: data.checkpoints || [],
        sessions: data.sessions || [],
        settings: data.settings || {}
      });
    } catch (e) {
      return res.status(500).json({ success: false, error: e.message });
    }
  }

  // POST: Update AI Day / Doubt / Project
  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
      const { action, dayNum, updates, doubt, project, checkpoint } = body;

      const userState = await getFullUserData(username);
      const data = userState.data || {};

      let days = Array.isArray(data.days) ? [...data.days] : [];
      let doubts = Array.isArray(data.doubts) ? [...data.doubts] : [];
      let projects = Array.isArray(data.projects) ? [...data.projects] : [];
      let checkpoints = Array.isArray(data.checkpoints) ? [...data.checkpoints] : [];

      if (action === 'update_day' && dayNum) {
        const idx = days.findIndex(d => d.day === Number(dayNum));
        if (idx !== -1) {
          days[idx] = { ...days[idx], ...updates };
        } else {
          days.push({ day: Number(dayNum), ...updates });
        }
      } else if (action === 'add_doubt' && doubt) {
        doubts.unshift(doubt);
      } else if (action === 'resolve_doubt' && doubt) {
        const idx = doubts.findIndex(d => d.id === doubt.id);
        if (idx !== -1) doubts[idx] = { ...doubts[idx], ...doubt };
      } else if (action === 'update_project' && project) {
        const idx = projects.findIndex(p => p.id === project.id);
        if (idx !== -1) projects[idx] = { ...projects[idx], ...project };
        else projects.push(project);
      }

      await saveFullUserData(username, { ...data, days, doubts, projects, checkpoints });
      return res.status(200).json({ success: true, message: "AI State updated successfully" });
    } catch (e) {
      return res.status(500).json({ success: false, error: e.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
};
