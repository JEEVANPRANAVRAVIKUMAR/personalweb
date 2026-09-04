// api/health.js - Backend & Database Health Check Endpoint
const { getActiveAdapterType } = require('./lib/db');

module.exports = async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const startTime = Date.now();
  const adapter = getActiveAdapterType();

  const isConnected = adapter !== 'memory_fallback';

  return res.status(200).json({
    status: 'online',
    version: '1.0.0',
    service: 'JEEVANPRANAV Technical Development Tracker OS',
    timestamp: new Date().toISOString(),
    database: {
      adapter,
      connected: isConnected,
      mode: isConnected ? 'cloud_database' : 'local_fallback_cache',
      description: isConnected
        ? `Connected to live ${adapter.toUpperCase()} cloud database.`
        : 'Running in Local Fallback Cache mode. Connect Vercel Postgres, Supabase, Neon, MongoDB, or Upstash KV in Vercel to enable cloud sync across all devices.'
    },
    latencyMs: Date.now() - startTime
  });
};
