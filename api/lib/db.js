// api/lib/db.js - Universal Database Adapter for Vercel Serverless Functions
// Supports: PostgreSQL (Vercel Postgres/Neon/Supabase), MongoDB Atlas, Upstash Redis/Vercel KV, and Graceful Fallback

let memoryStore = {
  user: "JeevanPranav",
  updatedAt: new Date().toISOString(),
  aiState: {},
  dsaState: {},
  doubts: [],
  projects: [],
  settings: {}
};

// --- POSTGRES CLIENT HELPER ---
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
        max: 5,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 5000,
      });
    } catch (e) {
      console.warn("pg module not initialized:", e.message);
      return null;
    }
  }
  return pgPool;
}

// --- SUPABASE CLIENT HELPER ---
let supabaseClient = null;
function getSupabaseClient() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  if (!supabaseClient) {
    try {
      const { createClient } = require('@supabase/supabase-js');
      supabaseClient = createClient(url, key);
    } catch (e) {
      console.warn("supabase client not initialized:", e.message);
      return null;
    }
  }
  return supabaseClient;
}

// --- UPSTASH REDIS / VERCEL KV HELPER ---
let redisClient = null;
function getRedisClient() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  if (!redisClient) {
    try {
      const { Redis } = require('@upstash/redis');
      redisClient = new Redis({ url, token });
    } catch (e) {
      console.warn("upstash redis not initialized:", e.message);
      return null;
    }
  }
  return redisClient;
}

// --- MONGODB HELPER ---
let mongoClient = null;
let mongoDb = null;
async function getMongoDb() {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URL;
  if (!uri) return null;
  if (!mongoDb) {
    try {
      const { MongoClient } = require('mongodb');
      mongoClient = new MongoClient(uri);
      await mongoClient.connect();
      mongoDb = mongoClient.db(process.env.MONGODB_DB || 'personal_tracker');
    } catch (e) {
      console.warn("mongodb not connected:", e.message);
      return null;
    }
  }
  return mongoDb;
}

// --- DETECT ACTIVE ADAPTER ---
function getActiveAdapterType() {
  if (getPgPool()) return 'postgres';
  if (getSupabaseClient()) return 'supabase';
  if (getRedisClient()) return 'upstash_kv';
  if (process.env.MONGODB_URI) return 'mongodb';
  return 'memory_fallback';
}

// --- INIT SCHEMA IF POSTGRES ---
let schemaInitialized = false;
async function ensurePgSchema(pool) {
  if (schemaInitialized || !pool) return;
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_sync_store (
        username VARCHAR(100) PRIMARY KEY,
        ai_days JSONB DEFAULT '[]'::jsonb,
        dsa_problems JSONB DEFAULT '[]'::jsonb,
        dsa_already_solved JSONB DEFAULT '[]'::jsonb,
        doubts JSONB DEFAULT '[]'::jsonb,
        projects JSONB DEFAULT '[]'::jsonb,
        checkpoints JSONB DEFAULT '[]'::jsonb,
        settings JSONB DEFAULT '{}'::jsonb,
        sessions JSONB DEFAULT '[]'::jsonb,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
    schemaInitialized = true;
  } catch (e) {
    console.warn("Failed to ensure postgres schema:", e.message);
  }
}

// ==========================================
// UNIFIED CRUD OPERATIONS
// ==========================================

async function getFullUserData(username = 'JeevanPranav') {
  const adapter = getActiveAdapterType();

  // 1. PostgreSQL (Vercel Postgres / Neon / Supabase direct SQL)
  if (adapter === 'postgres') {
    const pool = getPgPool();
    await ensurePgSchema(pool);
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
    } catch (e) {
      console.error("Postgres get error:", e.message);
    }
  }

  // 2. Supabase Client
  if (adapter === 'supabase') {
    const supabase = getSupabaseClient();
    try {
      const { data, error } = await supabase
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
      console.error("Supabase get error:", e.message);
    }
  }

  // 3. Upstash Redis / Vercel KV
  if (adapter === 'upstash_kv') {
    const redis = getRedisClient();
    try {
      const data = await redis.get(`user_store:${username}`);
      if (data) {
        return { success: true, adapter: 'upstash_kv', data };
      }
    } catch (e) {
      console.error("Upstash Redis get error:", e.message);
    }
  }

  // 4. MongoDB Atlas
  if (adapter === 'mongodb') {
    try {
      const db = await getMongoDb();
      if (db) {
        const doc = await db.collection('user_sync_store').findOne({ username });
        if (doc) {
          return {
            success: true,
            adapter: 'mongodb',
            data: {
              days: doc.ai_days || [],
              dsaProblems: doc.dsa_problems || [],
              dsaAlreadySolved: doc.dsa_already_solved || [],
              doubts: doc.doubts || [],
              projects: doc.projects || [],
              checkpoints: doc.checkpoints || [],
              settings: doc.settings || {},
              sessions: doc.sessions || [],
              updatedAt: doc.updated_at
            }
          };
        }
      }
    } catch (e) {
      console.error("MongoDB get error:", e.message);
    }
  }

  // 5. Memory Fallback
  return {
    success: true,
    adapter: 'memory_fallback',
    data: memoryStore,
    isLocalFallback: true
  };
}

async function saveFullUserData(username = 'JeevanPranav', payload = {}) {
  const adapter = getActiveAdapterType();
  const now = new Date().toISOString();

  // Clean data structure
  const cleanData = {
    days: Array.isArray(payload.days) ? payload.days : [],
    dsaProblems: Array.isArray(payload.dsaProblems) ? payload.dsaProblems : [],
    dsaAlreadySolved: Array.isArray(payload.dsaAlreadySolved) ? payload.dsaAlreadySolved : [],
    doubts: Array.isArray(payload.doubts) ? payload.doubts : [],
    projects: Array.isArray(payload.projects) ? payload.projects : [],
    checkpoints: Array.isArray(payload.checkpoints) ? payload.checkpoints : [],
    settings: payload.settings || {},
    sessions: Array.isArray(payload.sessions) ? payload.sessions : [],
    updatedAt: now
  };

  // 1. PostgreSQL
  if (adapter === 'postgres') {
    const pool = getPgPool();
    await ensurePgSchema(pool);
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
        JSON.stringify(cleanData.days),
        JSON.stringify(cleanData.dsaProblems),
        JSON.stringify(cleanData.dsaAlreadySolved),
        JSON.stringify(cleanData.doubts),
        JSON.stringify(cleanData.projects),
        JSON.stringify(cleanData.checkpoints),
        JSON.stringify(cleanData.settings),
        JSON.stringify(cleanData.sessions),
        now
      ]);
      return { success: true, adapter: 'postgres', updatedAt: now };
    } catch (e) {
      console.error("Postgres save error:", e.message);
    }
  }

  // 2. Supabase Client
  if (adapter === 'supabase') {
    const supabase = getSupabaseClient();
    try {
      const { error } = await supabase
        .from('user_sync_store')
        .upsert({
          username,
          ai_days: cleanData.days,
          dsa_problems: cleanData.dsaProblems,
          dsa_already_solved: cleanData.dsaAlreadySolved,
          doubts: cleanData.doubts,
          projects: cleanData.projects,
          checkpoints: cleanData.checkpoints,
          settings: cleanData.settings,
          sessions: cleanData.sessions,
          updated_at: now
        });
      if (!error) {
        return { success: true, adapter: 'supabase', updatedAt: now };
      }
    } catch (e) {
      console.error("Supabase save error:", e.message);
    }
  }

  // 3. Upstash Redis
  if (adapter === 'upstash_kv') {
    const redis = getRedisClient();
    try {
      await redis.set(`user_store:${username}`, cleanData);
      return { success: true, adapter: 'upstash_kv', updatedAt: now };
    } catch (e) {
      console.error("Upstash Redis save error:", e.message);
    }
  }

  // 4. MongoDB Atlas
  if (adapter === 'mongodb') {
    try {
      const db = await getMongoDb();
      if (db) {
        await db.collection('user_sync_store').updateOne(
          { username },
          {
            $set: {
              username,
              ai_days: cleanData.days,
              dsa_problems: cleanData.dsaProblems,
              dsa_already_solved: cleanData.dsaAlreadySolved,
              doubts: cleanData.doubts,
              projects: cleanData.projects,
              checkpoints: cleanData.checkpoints,
              settings: cleanData.settings,
              sessions: cleanData.sessions,
              updated_at: now
            }
          },
          { upsert: true }
        );
        return { success: true, adapter: 'mongodb', updatedAt: now };
      }
    } catch (e) {
      console.error("MongoDB save error:", e.message);
    }
  }

  // 5. Memory Fallback
  memoryStore = { ...cleanData, user: username };
  return { success: true, adapter: 'memory_fallback', updatedAt: now, isLocalFallback: true };
}

module.exports = {
  getActiveAdapterType,
  getFullUserData,
  saveFullUserData
};
