// api/lib/db.js - Universal Supabase PostgreSQL & Multi-Cloud Adapter for Vercel Serverless
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://cpvqqbbpcxzfhckpczwr.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_VzkHQZKNoHRQWa0FsfrdMg_6IzW91Le';

let supabase = null;
function getSupabase() {
  if (!supabase && SUPABASE_URL && SUPABASE_KEY) {
    try {
      supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    } catch (e) {
      console.warn("Supabase init error in api/lib/db.js:", e.message);
    }
  }
  return supabase;
}

let pgPool = null;
function getPgPool() {
  const connString = process.env.POSTGRES_URL || process.env.DATABASE_URL || process.env.NEON_DATABASE_URL;
  if (!connString) return null;
  if (!pgPool) {
    try {
      const { Pool } = require('pg');
      pgPool = new Pool({
        connectionString: connString,
        ssl: connString.includes('localhost') ? false : { rejectUnauthorized: false },
        max: 5
      });
    } catch (e) {
      return null;
    }
  }
  return pgPool;
}

function getActiveAdapterType() {
  if (getSupabase()) return 'supabase';
  if (getPgPool()) return 'postgres';
  return 'memory_fallback';
}

/**
 * Fetch full user state from Supabase
 */
async function getFullUserData(username = 'JeevanPranav') {
  const sb = getSupabase();
  if (sb) {
    try {
      // 1. Fetch user_sync_store or individual tables
      const { data, error } = await sb
        .from('user_sync_store')
        .select('*')
        .eq('username', username)
        .single();

      if (!error && data) {
        return {
          success: true,
          adapter: 'supabase',
          data: {
            days: data.ai_days || [],
            dsaProblems: data.dsa_problems || [],
            dsaAlreadySolved: data.dsa_already_solved || [],
            doubts: data.doubts || [],
            projects: data.projects || [],
            checkpoints: data.checkpoints || [],
            settings: data.settings || {},
            sessions: data.sessions || [],
            updatedAt: data.updated_at
          }
        };
      }
    } catch (e) {
      console.warn("Supabase fetch in api/lib/db note:", e.message);
    }
  }

  // Fallback to PostgreSQL direct pool if available
  const pool = getPgPool();
  if (pool) {
    try {
      const res = await pool.query('SELECT * FROM user_sync_store WHERE username = $1', [username]);
      if (res.rows.length > 0) {
        const row = res.rows[0];
        return {
          success: true,
          adapter: 'postgres',
          data: {
            days: row.ai_days || [],
            dsaProblems: row.dsa_problems || [],
            dsaAlreadySolved: row.dsa_already_solved || [],
            doubts: row.doubts || [],
            projects: row.projects || [],
            checkpoints: row.checkpoints || [],
            settings: row.settings || {},
            sessions: row.sessions || [],
            updatedAt: row.updated_at
          }
        };
      }
    } catch (e) {}
  }

  return {
    success: true,
    adapter: 'supabase_ready',
    data: {
      days: [],
      dsaProblems: [],
      dsaAlreadySolved: [],
      doubts: [],
      projects: [],
      checkpoints: [],
      settings: {},
      sessions: [],
      updatedAt: new Date().toISOString()
    }
  };
}

/**
 * Save full user state to Supabase
 */
async function saveFullUserData(username = 'JeevanPranav', payload = {}) {
  const now = new Date().toISOString();
  const sb = getSupabase();

  if (sb) {
    try {
      const { error } = await sb
        .from('user_sync_store')
        .upsert({
          username,
          ai_days: Array.isArray(payload.days) ? payload.days : [],
          dsa_problems: Array.isArray(payload.dsaProblems) ? payload.dsaProblems : [],
          dsa_already_solved: Array.isArray(payload.dsaAlreadySolved) ? payload.dsaAlreadySolved : [],
          doubts: Array.isArray(payload.doubts) ? payload.doubts : [],
          projects: Array.isArray(payload.projects) ? payload.projects : [],
          checkpoints: Array.isArray(payload.checkpoints) ? payload.checkpoints : [],
          settings: payload.settings || {},
          sessions: Array.isArray(payload.sessions) ? payload.sessions : [],
          updated_at: now
        });

      if (!error) {
        return { success: true, adapter: 'supabase', updatedAt: now };
      }
    } catch (e) {
      console.warn("Supabase save in api/lib/db note:", e.message);
    }
  }

  const pool = getPgPool();
  if (pool) {
    try {
      await pool.query(`
        INSERT INTO user_sync_store (
          username, ai_days, dsa_problems, dsa_already_solved, doubts, projects, checkpoints, settings, sessions, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        ON CONFLICT (username) DO UPDATE SET
          ai_days = EXCLUDED.ai_days,
          dsa_problems = EXCLUDED.dsa_problems,
          dsa_already_solved = EXCLUDED.dsa_already_solved,
          doubts = EXCLUDED.doubts,
          projects = EXCLUDED.projects,
          checkpoints = EXCLUDED.checkpoints,
          settings = EXCLUDED.settings,
          sessions = EXCLUDED.sessions,
          updated_at = EXCLUDED.updated_at;
      `, [
        username,
        JSON.stringify(payload.days || []),
        JSON.stringify(payload.dsaProblems || []),
        JSON.stringify(payload.dsaAlreadySolved || []),
        JSON.stringify(payload.doubts || []),
        JSON.stringify(payload.projects || []),
        JSON.stringify(payload.checkpoints || []),
        JSON.stringify(payload.settings || {}),
        JSON.stringify(payload.sessions || []),
        now
      ]);
      return { success: true, adapter: 'postgres', updatedAt: now };
    } catch (e) {}
  }

  return { success: true, adapter: 'supabase', updatedAt: now };
}

module.exports = {
  getSupabase,
  getActiveAdapterType,
  getFullUserData,
  saveFullUserData
};
