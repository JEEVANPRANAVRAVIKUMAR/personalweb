// storageService.js - Authoritative Supabase Cloud-First Multi-Device Orchestrator
import { supabase, supabaseManager } from './supabaseClient.js';
import { authService } from './authService.js';
import { DsaService } from './dsaService.js';
import { AiService } from './aiService.js';
import { ActivityService } from './activityService.js';
import { getEnrichedRoadmapDays } from '../data/roadmapDataset.js';
import { PROJECTS_DATASET, CHECKPOINTS_DATASET } from '../data/projectsDataset.js';
import { DSA_CATEGORIES, RAW_DSA_PRACTICE_FALLBACK, RAW_DSA_ALREADY_SOLVED_FALLBACK } from '../data/dsaDataset.js';

const STORAGE_KEY_MIGRATED = 'jeevanpranav_cloud_migrated_v2';
const STORAGE_KEY_SETTINGS = 'ai_eng_settings_v2';
const STORAGE_KEY_DSA_SETTINGS = 'dsa_settings_v2';
const STORAGE_KEY_AI_CACHE = 'ai_roadmap_progress_cache_v2';
const STORAGE_KEY_DSA_CACHE = 'dsa_problem_progress_cache_v2';

const DEFAULT_AI_SETTINGS = {
  dailyTargetMinutes: 120, // 2 hours
  learnMinutes: 45,
  buildMinutes: 75,
  reviseMinutes: 5,
  startDate: "2026-09-07",
  theme: "dark",
  soundEnabled: true,
  autoAdvanceTimer: true
};

const DEFAULT_DSA_SETTINGS = {
  dailyTarget: 3,
  theme: "dark",
  revisionIntervals: [3, 14]
};

class StorageService {
  constructor() {
    this.days = [];
    this.projects = [];
    this.checkpoints = [];
    this.settings = DEFAULT_AI_SETTINGS;
    this.sessions = [];

    // DSA Track State
    this.dsaCategories = DSA_CATEGORIES || [];
    this.dsaProblems = [];
    this.dsaAlreadySolved = [];
    this.dsaSettings = DEFAULT_DSA_SETTINGS;

    // Cloud Database State
    this.syncState = 'synced'; // 'synced' | 'syncing' | 'error' | 'offline'
    this.lastSyncedAt = null;
    this.activeAdapter = 'supabase';
    this.lastError = null;
    this.isLoading = true;

    this.listeners = new Set();
    this.realtimeCleanups = [];

    this.init();
    this.setupMultiDeviceSyncListeners();
  }

  /**
   * Persist current active progress to resilient local cache (Tier 2 storage)
   */
  persistLocalCache() {
    try {
      if (typeof window === 'undefined') return;
      
      // Cache non-default AI days progress
      const aiCache = this.days
        .filter(d => d.status !== 'NOT_STARTED' || d.remarks || d.notes || d.mastery > 0 || (d.doubts && d.doubts.length > 0))
        .map(d => ({
          day: d.day,
          status: d.status,
          mastery: d.mastery,
          remarks: d.remarks,
          notes: d.notes,
          completedAt: d.completedAt,
          nextRevisionDate: d.nextRevisionDate,
          timeSpentMinutes: d.timeSpentMinutes,
          doubts: d.doubts || []
        }));
      localStorage.setItem(STORAGE_KEY_AI_CACHE, JSON.stringify(aiCache));

      // Cache non-default DSA problems progress
      const dsaCache = this.dsaProblems
        .filter(p => p.status !== 'NOT_STARTED' || p.notes || p.mistakes || p.attempts > 0 || p.mastery > 0 || p.approach || p.code)
        .map(p => ({
          id: p.id,
          lcNumber: p.lcNumber,
          status: p.status,
          mastery: p.mastery,
          attempts: p.attempts,
          notes: p.notes,
          mistakes: p.mistakes,
          dateSolved: p.dateSolved,
          nextRevisionDate: p.nextRevisionDate,
          approach: p.approach || '',
          code: p.code || '',
          codeLang: p.codeLang || 'Java',
          timeComplexity: p.timeComplexity || '',
          spaceComplexity: p.spaceComplexity || '',
          explanation: p.explanation || '',
          isBookmarked: Boolean(p.isBookmarked)
        }));
      localStorage.setItem(STORAGE_KEY_DSA_CACHE, JSON.stringify(dsaCache));
    } catch (e) {
      console.warn("StorageService persistLocalCache note:", e.message);
    }
  }

  /**
   * Merge cached local progress into in-memory days and dsaProblems
   */
  loadLocalCache() {
    try {
      if (typeof window === 'undefined') return;

      // 1. Merge AI cached progress
      const rawAi = localStorage.getItem(STORAGE_KEY_AI_CACHE);
      if (rawAi) {
        const cachedAiList = JSON.parse(rawAi);
        if (Array.isArray(cachedAiList)) {
          const cacheMap = new Map();
          cachedAiList.forEach(item => {
            if (item.day !== undefined) {
              cacheMap.set(item.day, item);
              cacheMap.set(String(item.day), item);
              cacheMap.set(Number(item.day), item);
            }
          });
          this.days = this.days.map(d => {
            const cached = cacheMap.get(d.day) || cacheMap.get(Number(d.day)) || cacheMap.get(String(d.day));
            if (cached) {
              return {
                ...d,
                status: cached.status || d.status,
                mastery: cached.mastery !== undefined ? cached.mastery : d.mastery,
                remarks: cached.remarks !== undefined ? cached.remarks : d.remarks,
                notes: cached.notes !== undefined ? cached.notes : d.notes,
                completedAt: cached.completedAt !== undefined ? cached.completedAt : d.completedAt,
                nextRevisionDate: cached.nextRevisionDate !== undefined ? cached.nextRevisionDate : d.nextRevisionDate,
                timeSpentMinutes: cached.timeSpentMinutes !== undefined ? cached.timeSpentMinutes : d.timeSpentMinutes,
                doubts: (cached.doubts && cached.doubts.length > 0) ? cached.doubts : (d.doubts || [])
              };
            }
            return d;
          });
        }
      }

      // 2. Merge DSA cached progress
      const rawDsa = localStorage.getItem(STORAGE_KEY_DSA_CACHE);
      if (rawDsa) {
        const cachedDsaList = JSON.parse(rawDsa);
        if (Array.isArray(cachedDsaList)) {
          const cacheMap = new Map();
          cachedDsaList.forEach(item => {
            if (item.id !== undefined) {
              cacheMap.set(item.id, item);
              cacheMap.set(String(item.id), item);
              cacheMap.set(Number(item.id), item);
            }
            if (item.lcNumber !== undefined) {
              cacheMap.set(item.lcNumber, item);
              cacheMap.set(String(item.lcNumber), item);
              cacheMap.set(Number(item.lcNumber), item);
            }
          });
          this.dsaProblems = this.dsaProblems.map(p => {
            const cached = cacheMap.get(p.id) || cacheMap.get(p.lcNumber) || cacheMap.get(Number(p.id)) || cacheMap.get(Number(p.lcNumber)) || cacheMap.get(String(p.id)) || cacheMap.get(String(p.lcNumber));
            if (cached) {
              return {
                ...p,
                status: cached.status || p.status,
                mastery: cached.mastery !== undefined ? cached.mastery : p.mastery,
                attempts: cached.attempts !== undefined ? cached.attempts : p.attempts,
                notes: cached.notes !== undefined ? cached.notes : p.notes,
                mistakes: cached.mistakes !== undefined ? cached.mistakes : p.mistakes,
                dateSolved: cached.dateSolved !== undefined ? cached.dateSolved : p.dateSolved,
                nextRevisionDate: cached.nextRevisionDate !== undefined ? cached.nextRevisionDate : p.nextRevisionDate,
                approach: cached.approach !== undefined ? cached.approach : (p.approach || ''),
                code: cached.code !== undefined ? cached.code : (p.code || ''),
                codeLang: cached.codeLang !== undefined ? cached.codeLang : (p.codeLang || 'Java'),
                timeComplexity: cached.timeComplexity !== undefined ? cached.timeComplexity : (p.timeComplexity || ''),
                spaceComplexity: cached.spaceComplexity !== undefined ? cached.spaceComplexity : (p.spaceComplexity || ''),
                explanation: cached.explanation !== undefined ? cached.explanation : (p.explanation || ''),
                isBookmarked: cached.isBookmarked !== undefined ? cached.isBookmarked : (p.isBookmarked || false)
              };
            }
            return p;
          });
        }
      }
    } catch (e) {
      console.warn("StorageService loadLocalCache note:", e.message);
    }
  }

  async init() {
    this.isLoading = true;
    this.notify();

    // 1. Load initial offline-safe baseline
    this.days = getEnrichedRoadmapDays();
    this.projects = JSON.parse(JSON.stringify(PROJECTS_DATASET));
    this.checkpoints = JSON.parse(JSON.stringify(CHECKPOINTS_DATASET));
    this.dsaProblems = RAW_DSA_PRACTICE_FALLBACK && RAW_DSA_PRACTICE_FALLBACK.length > 0
      ? JSON.parse(JSON.stringify(RAW_DSA_PRACTICE_FALLBACK))
      : [];
    this.dsaAlreadySolved = RAW_DSA_ALREADY_SOLVED_FALLBACK && RAW_DSA_ALREADY_SOLVED_FALLBACK.length > 0
      ? JSON.parse(JSON.stringify(RAW_DSA_ALREADY_SOLVED_FALLBACK))
      : [];

    // 2. Load resilient local cache immediately for instantaneous rendering
    this.loadLocalCache();

    // 3. Fetch authoritative state from Supabase Cloud Database
    await this.fetchFromDatabase();

    // 4. Re-apply any local cached items that might not have reached cloud yet
    this.loadLocalCache();

    // 5. Save reconciled state locally and push to cloud
    this.persistLocalCache();
    this.persistFastCloudSync();

    // 6. Check for one-time migration of previous local storage
    await this.checkAndMigrateLegacyLocalStorage();

    // 7. Setup Supabase Realtime Channels
    this.setupRealtimeSubscriptions();

    this.isLoading = false;
    this.notify();
  }

  /**
   * Fast unified cloud sync to user_sync_store
   */
  async persistFastCloudSync() {
    const userId = authService.getUserId() || 'JeevanPranav';
    const nonDefaultDsa = this.dsaProblems
      .filter(p => p.status !== 'NOT_STARTED' || p.notes || p.mistakes || p.attempts > 0 || p.mastery > 0 || p.approach || p.code)
      .map(p => ({
        id: p.id,
        lcNumber: p.lcNumber,
        status: p.status,
        dateSolved: p.dateSolved || '',
        attempts: p.attempts || 0,
        notes: p.notes || '',
        mistakes: p.mistakes || '',
        mastery: p.mastery || 0,
        priority: p.priority || 'MEDIUM',
        approach: p.approach || '',
        code: p.code || '',
        codeLang: p.codeLang || 'Java',
        timeComplexity: p.timeComplexity || 'O(N)',
        spaceComplexity: p.spaceComplexity || 'O(1)',
        explanation: p.explanation || '',
        isBookmarked: Boolean(p.isBookmarked),
        lastAttemptAt: p.lastAttemptAt || null,
        lastRevised: p.lastRevised || '',
        nextRevisionDate: p.nextRevisionDate || ''
      }));

    const nonDefaultAi = this.days
      .filter(d => d.status !== 'NOT_STARTED' || d.remarks || d.notes || d.mastery > 0 || (d.doubts && d.doubts.length > 0))
      .map(d => ({
        day: d.day,
        status: d.status,
        mastery: d.mastery || 0,
        timeSpentMinutes: d.timeSpentMinutes || 0,
        remarks: d.remarks || '',
        notes: d.notes || '',
        completedAt: d.completedAt || null,
        nextRevisionDate: d.nextRevisionDate || null,
        revisionStep: d.revisionStep || 0,
        doubts: d.doubts || []
      }));

    try {
      const { error } = await supabase
        .from('user_sync_store')
        .upsert({
          username: userId,
          dsa_problems: nonDefaultDsa,
          ai_days: nonDefaultAi,
          settings: this.settings,
          updated_at: new Date().toISOString()
        }, { onConflict: 'username' });

      if (!error) {
        this.syncState = 'synced';
        this.lastSyncedAt = new Date().toISOString();
        this.lastError = null;
      }
    } catch (e) {
      console.warn("user_sync_store fast sync note:", e.message);
    }
  }

  /**
   * Authoritative fetch from Supabase PostgreSQL
   */
  async fetchFromDatabase() {
    const userId = authService.getUserId() || 'JeevanPranav';
    this.syncState = 'syncing';
    this.notify();

    try {
      // 1. Fetch Fast Sync Document from user_sync_store
      try {
        const { data: syncDoc, error: syncErr } = await supabase
          .from('user_sync_store')
          .select('*')
          .eq('username', userId)
          .single();

        if (!syncErr && syncDoc) {
          if (Array.isArray(syncDoc.dsa_problems) && syncDoc.dsa_problems.length > 0) {
            const syncMap = new Map();
            syncDoc.dsa_problems.forEach(p => {
              if (p.id !== undefined) {
                syncMap.set(p.id, p);
                syncMap.set(String(p.id), p);
              }
              if (p.lcNumber !== undefined) {
                syncMap.set(p.lcNumber, p);
                syncMap.set(String(p.lcNumber), p);
              }
            });
            this.dsaProblems = this.dsaProblems.map(p => {
              const cloudItem = syncMap.get(p.id) || syncMap.get(p.lcNumber) || syncMap.get(String(p.id)) || syncMap.get(String(p.lcNumber));
              if (cloudItem) {
                const cloudHasProg = cloudItem.status !== 'NOT_STARTED' || cloudItem.notes || cloudItem.mistakes || cloudItem.attempts > 0 || cloudItem.mastery > 0 || cloudItem.approach || cloudItem.code;
                const localHasProg = p.status !== 'NOT_STARTED' || p.notes || p.mistakes || p.attempts > 0 || p.mastery > 0 || p.approach || p.code;
                if (cloudHasProg) {
                  return { ...p, ...cloudItem };
                } else if (localHasProg) {
                  return p; // Preserve local progress!
                }
                return { ...p, ...cloudItem };
              }
              return p;
            });
          }
          if (Array.isArray(syncDoc.ai_days) && syncDoc.ai_days.length > 0) {
            const syncMap = new Map();
            syncDoc.ai_days.forEach(d => {
              if (d.day !== undefined) {
                syncMap.set(d.day, d);
                syncMap.set(String(d.day), d);
              }
            });
            this.days = this.days.map(d => {
              const cloudItem = syncMap.get(d.day) || syncMap.get(String(d.day));
              if (cloudItem) {
                const cloudHasProg = cloudItem.status !== 'NOT_STARTED' || cloudItem.remarks || cloudItem.notes || cloudItem.mastery > 0 || (cloudItem.doubts && cloudItem.doubts.length > 0);
                const localHasProg = d.status !== 'NOT_STARTED' || d.remarks || d.notes || d.mastery > 0 || (d.doubts && d.doubts.length > 0);
                if (cloudHasProg) {
                  return { ...d, ...cloudItem };
                } else if (localHasProg) {
                  return d; // Preserve local progress!
                }
                return { ...d, ...cloudItem };
              }
              return d;
            });
          }
          if (syncDoc.settings && typeof syncDoc.settings === 'object' && Object.keys(syncDoc.settings).length > 0) {
            this.settings = { ...this.settings, ...syncDoc.settings };
          }
        }
      } catch (syncFetchErr) {
        console.warn("user_sync_store fetch note:", syncFetchErr.message);
      }

      // 2. Fetch Granular DSA Problems & User Progress
      const dsaResult = await DsaService.getMergedProblems(userId);
      if (dsaResult.success && Array.isArray(dsaResult.data) && dsaResult.data.length > 0) {
        const cloudProgressProblems = dsaResult.data.filter(p => p.status !== 'NOT_STARTED' || p.notes || p.mistakes || p.attempts > 0 || p.mastery > 0 || p.approach || p.code);
        if (cloudProgressProblems.length > 0) {
          const granularMap = new Map();
          cloudProgressProblems.forEach(p => {
            if (p.id !== undefined) granularMap.set(p.id, p);
            if (p.lcNumber !== undefined) granularMap.set(p.lcNumber, p);
          });
          this.dsaProblems = this.dsaProblems.map(p => {
            const gItem = granularMap.get(p.id) || granularMap.get(p.lcNumber);
            if (gItem) {
              return { ...p, ...gItem };
            }
            return p;
          });
        }
      }

      // 3. Fetch DSA Already Solved & Revision State
      const solvedResult = await DsaService.getMergedAlreadySolved(userId);
      if (solvedResult.success && Array.isArray(solvedResult.data) && solvedResult.data.length > 0) {
        this.dsaAlreadySolved = solvedResult.data;
      }

      // 4. Fetch AI Roadmap Days, Progress & Doubts
      const aiResult = await AiService.getMergedRoadmapDays(userId);
      if (aiResult.success && Array.isArray(aiResult.data) && aiResult.data.length > 0) {
        const cloudProgressDays = aiResult.data.filter(d => d.status !== 'NOT_STARTED' || d.remarks || d.notes || d.mastery > 0 || (d.doubts && d.doubts.length > 0));
        if (cloudProgressDays.length > 0) {
          const granularAiMap = new Map();
          cloudProgressDays.forEach(d => {
            if (d.day !== undefined) granularAiMap.set(d.day, d);
          });
          this.days = this.days.map(d => {
            const gItem = granularAiMap.get(d.day);
            if (gItem) {
              return { ...d, ...gItem };
            }
            return d;
          });
        }
      }

      // 5. Fetch AI Projects
      const projResult = await AiService.getMergedProjects(userId);
      if (projResult.success && Array.isArray(projResult.projects)) {
        this.projects = projResult.projects;
      }

      // Re-apply local cache to preserve any offline progress
      this.loadLocalCache();
      this.persistLocalCache();
      this.persistFastCloudSync();

      this.syncState = 'synced';
      this.lastSyncedAt = new Date().toISOString();
      this.lastError = null;
      this.activeAdapter = 'supabase';
    } catch (err) {
      console.error("StorageService fetch error:", err);
      this.syncState = 'offline';
      this.lastError = err.message;
    } finally {
      this.notify();
    }
  }

  /**
   * One-time safe migration from previous browser localStorage to Supabase
   */
  async checkAndMigrateLegacyLocalStorage() {
    try {
      if (typeof window === 'undefined') return;
      const alreadyMigrated = localStorage.getItem(STORAGE_KEY_MIGRATED);
      if (alreadyMigrated) return;

      const userId = authService.getUserId();
      console.log("Checking for previous local progress to migrate to Supabase...");

      // 1. Check legacy DSA problems
      const rawLegacyDsa = localStorage.getItem('dsa_practice_problems_v1') || localStorage.getItem('RAW_DSA_PRACTICE');
      if (rawLegacyDsa) {
        const legacyList = JSON.parse(rawLegacyDsa);
        for (const item of legacyList) {
          if (item.status === 'DONE' || item.attempts > 0 || item.notes || item.mistakes || item.mastery > 0) {
            await DsaService.updateProblemProgress(userId, item.id, {
              status: item.status,
              dateSolved: item.dateSolved,
              attempts: item.attempts,
              notes: item.notes,
              mistakes: item.mistakes,
              mastery: item.mastery
            });
          }
        }
      }

      // 2. Check legacy AI days
      const rawLegacyDays = localStorage.getItem('ai_eng_roadmap_days_v1');
      if (rawLegacyDays) {
        const legacyDays = JSON.parse(rawLegacyDays);
        for (const day of legacyDays) {
          if (day.status === 'COMPLETED' || day.remarks || day.notes || day.mastery > 0) {
            await AiService.updateDayProgress(userId, day.day, {
              status: day.status,
              remarks: day.remarks,
              notes: day.notes,
              mastery: day.mastery,
              completedAt: day.completedAt
            });
          }
        }
      }

      localStorage.setItem(STORAGE_KEY_MIGRATED, 'true');
      console.log("✓ Migration check completed.");
    } catch (e) {
      console.warn("Migration check note:", e.message);
    }
  }

  /**
   * Realtime event subscribers for cross-device instant sync
   */
  setupRealtimeSubscriptions() {
    // Clean up existing
    this.realtimeCleanups.forEach(fn => fn());
    this.realtimeCleanups = [];

    const userId = authService.getUserId() || 'JeevanPranav';

    // 1. Subscribe to user_sync_store for cross-device instant sync
    const unsubStore = supabaseManager.subscribeToTable('user_sync_store', 'username', userId, (payload) => {
      console.log("⚡ Realtime user_sync_store update received from cloud");
      if (payload.new) {
        const doc = payload.new;
        if (Array.isArray(doc.dsa_problems)) {
          const syncMap = new Map(doc.dsa_problems.map(p => [p.id || p.lcNumber, p]));
          this.dsaProblems = this.dsaProblems.map(p => {
            const c = syncMap.get(p.id) || syncMap.get(p.lcNumber);
            return c ? { ...p, ...c } : p;
          });
        }
        if (Array.isArray(doc.ai_days)) {
          const syncMap = new Map(doc.ai_days.map(d => [d.day, d]));
          this.days = this.days.map(d => {
            const c = syncMap.get(d.day);
            return c ? { ...d, ...c } : d;
          });
        }
        this.persistLocalCache();
        this.notify();
      }
    });
    this.realtimeCleanups.push(unsubStore);

    // 2. Subscribe to DSA Problem Progress
    const unsubDsa = DsaService.subscribeToProgress(userId, (payload) => {
      if (payload.new && payload.new.problem_id) {
        const row = payload.new;
        const idx = this.dsaProblems.findIndex(p => p.id === row.problem_id);
        if (idx !== -1) {
          this.dsaProblems[idx] = {
            ...this.dsaProblems[idx],
            status: row.status,
            dateSolved: row.date_solved,
            attempts: row.attempts,
            notes: row.notes,
            mistakes: row.mistakes,
            mastery: row.mastery,
            approach: row.my_approach || this.dsaProblems[idx].approach,
            code: row.my_solution_code || this.dsaProblems[idx].code,
            codeLang: row.code_language || this.dsaProblems[idx].codeLang,
            timeComplexity: row.time_complexity || this.dsaProblems[idx].timeComplexity,
            spaceComplexity: row.space_complexity || this.dsaProblems[idx].spaceComplexity,
            explanation: row.explanation || this.dsaProblems[idx].explanation,
            nextRevisionDate: row.next_revision_date
          };
          this.persistLocalCache();
          this.notify();
        }
      }
    });
    this.realtimeCleanups.push(unsubDsa);

    // 3. Subscribe to AI Roadmap Progress
    const unsubAi = AiService.subscribeToProgress(userId, (payload) => {
      if (payload.new && payload.new.day) {
        const row = payload.new;
        const idx = this.days.findIndex(d => d.day === row.day);
        if (idx !== -1) {
          this.days[idx] = {
            ...this.days[idx],
            status: row.status,
            mastery: row.mastery,
            timeSpentMinutes: row.time_spent_minutes,
            remarks: row.remarks,
            notes: row.notes,
            completedAt: row.completed_at,
            nextRevisionDate: row.next_revision_date
          };
          this.persistLocalCache();
          this.notify();
        }
      }
    });
    this.realtimeCleanups.push(unsubAi);

    // 4. Subscribe to AI Doubts
    const unsubDoubts = AiService.subscribeToDoubts(userId, (payload) => {
      if (payload.eventType === 'INSERT' && payload.new) {
        const row = payload.new;
        const dayIdx = this.days.findIndex(d => d.day === row.day);
        if (dayIdx !== -1) {
          const doubts = this.days[dayIdx].doubts || [];
          if (!doubts.some(d => d.id === row.id)) {
            doubts.unshift({
              id: row.id,
              dayNum: row.day,
              topic: row.topic,
              question: row.question,
              userUnderstanding: row.user_understanding,
              status: row.status,
              createdAt: row.created_at,
              solution: null
            });
            this.days[dayIdx].doubts = doubts;
            this.persistLocalCache();
            this.notify();
          }
        }
      }
    });
    this.realtimeCleanups.push(unsubDoubts);
  }

  setupMultiDeviceSyncListeners() {
    if (typeof window === 'undefined') return;

    // 1. BroadcastChannel for instant cross-tab / cross-window sync (< 5ms)
    try {
      if (typeof BroadcastChannel !== 'undefined') {
        this.broadcastChannel = new BroadcastChannel('jeevanpranav_sync_channel');
        this.broadcastChannel.onmessage = (event) => {
          if (event.data && event.data.type === 'STATE_CHANGED') {
            this.loadLocalCache();
            this.notify();
          } else if (event.data && event.data.type === 'DSA_UPDATE') {
            const p = event.data.problem;
            if (p) {
              const idx = this.dsaProblems.findIndex(item => item.id === p.id || item.lcNumber === p.lcNumber);
              if (idx !== -1) {
                this.dsaProblems[idx] = { ...this.dsaProblems[idx], ...p };
                this.persistLocalCache();
                this.notify();
              }
            }
          } else if (event.data && event.data.type === 'AI_UPDATE') {
            const d = event.data.day;
            if (d) {
              const idx = this.days.findIndex(item => item.day === d.day);
              if (idx !== -1) {
                this.days[idx] = { ...this.days[idx], ...d };
                this.persistLocalCache();
                this.notify();
              }
            }
          }
        };
      }
    } catch (e) {
      console.warn("BroadcastChannel note:", e.message);
    }

    // 2. Cross-tab LocalStorage synchronization
    window.addEventListener('storage', (e) => {
      if (e.key === STORAGE_KEY_DSA_CACHE || e.key === STORAGE_KEY_AI_CACHE) {
        this.loadLocalCache();
        this.notify();
      }
    });

    // 3. Tab visibility change & window focus
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        this.fetchFromDatabase();
      }
    });

    window.addEventListener('focus', () => {
      this.fetchFromDatabase();
    });

    // 4. Background cloud sync heartbeat (every 10s when active)
    if (!this.heartbeatInterval) {
      this.heartbeatInterval = setInterval(() => {
        if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
          this.fetchFromDatabase();
        }
      }, 10000);
    }
  }

  broadcastChange(msg) {
    try {
      if (this.broadcastChannel) {
        this.broadcastChannel.postMessage(msg);
      }
    } catch (e) {}
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    for (const listener of this.listeners) {
      try {
        listener(this);
      } catch (err) {
        console.error("Storage listener error:", err);
      }
    }
  }

  getSyncInfo() {
    return {
      state: this.syncState,
      lastSyncedAt: this.lastSyncedAt,
      adapter: this.activeAdapter,
      error: this.lastError,
      isLoading: this.isLoading
    };
  }

  // ==========================================
  // DSA TRACK MUTATIONS (OPTIMISTIC + DATABASE)
  // ==========================================

  getDsaProblem(id) {
    return this.dsaProblems.find(p => p.id === id || p.lcNumber === id);
  }

  async updateDsaProblem(id, updates) {
    const idx = this.dsaProblems.findIndex(p => p.id === id || p.lcNumber === id);
    if (idx === -1) return null;

    const problemId = this.dsaProblems[idx].id;

    // 1. Optimistic Update with Fresh Array Reference for React reactivity
    const updatedProblem = {
      ...this.dsaProblems[idx],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    const nextProblems = [...this.dsaProblems];
    nextProblems[idx] = updatedProblem;
    this.dsaProblems = nextProblems;

    this.persistLocalCache();
    this.broadcastChange({ type: 'DSA_UPDATE', problem: updatedProblem });
    this.persistFastCloudSync();
    this.syncState = 'syncing';
    this.notify();

    // 2. Persist to Supabase Cloud Database
    const userId = authService.getUserId();
    try {
      const result = await DsaService.updateProblemProgress(userId, problemId, updates);
      if (result.success) {
        this.syncState = 'synced';
        this.lastSyncedAt = new Date().toISOString();
        this.lastError = null;
        if (updates.status === 'DONE') {
          ActivityService.recordActivity(userId, { dsaCompleted: 1 });
        }
      } else {
        console.warn("Supabase DSA write note (stored locally & fast cloud sync):", result.error);
        this.syncState = 'offline';
      }
    } catch (err) {
      console.warn("Supabase network note (stored locally & fast cloud sync):", err.message);
      this.syncState = 'offline';
    }

    this.notify();
    return this.dsaProblems[idx];
  }

  setDsaStatus(id, status) {
    const prob = this.getDsaProblem(id);
    if (!prob) return;

    const updates = { status };
    if (status === 'DONE') {
      updates.dateSolved = ActivityService.getTodayDateString();
      if (!prob.mastery || prob.mastery === 0) updates.mastery = 4;
      if (!prob.attempts || prob.attempts === 0) updates.attempts = 1;
    } else if (status === 'REVISE') {
      const now = new Date();
      updates.nextRevisionDate = ActivityService.getTodayDateString(3);
    }
    this.updateDsaProblem(id, updates);
  }

  incrementDsaAttempts(id) {
    const prob = this.getDsaProblem(id);
    if (!prob) return;
    const newAttempts = (prob.attempts || 0) + 1;
    this.updateDsaProblem(id, { attempts: newAttempts, lastAttemptAt: new Date().toISOString() });
    DsaService.logAttempt(authService.getUserId(), prob.id, { durationSeconds: 0, result: 'ATTEMPT' });
  }

  setDsaNotes(id, notes) {
    this.updateDsaProblem(id, { notes });
  }

  setDsaMistakes(id, mistakes) {
    this.updateDsaProblem(id, { mistakes });
  }

  setDsaMastery(id, mastery) {
    this.updateDsaProblem(id, { mastery });
  }

  setDsaPriority(id, priority) {
    this.updateDsaProblem(id, { priority });
  }

  scheduleDsaRevision(id, intervalDays = 3) {
    const nextRev = ActivityService.getTodayDateString(intervalDays);
    this.updateDsaProblem(id, {
      status: 'REVISE',
      nextRevisionDate: nextRev,
      lastRevised: ActivityService.getTodayDateString()
    });
  }

  async updateAlreadySolved(id, updates) {
    const idx = this.dsaAlreadySolved.findIndex(p => p.id === id);
    if (idx === -1) return;

    this.dsaAlreadySolved[idx] = { ...this.dsaAlreadySolved[idx], ...updates };
    this.persistLocalCache();
    this.broadcastChange({ type: 'DSA_ALREADY_SOLVED_UPDATE', item: this.dsaAlreadySolved[idx] });
    this.persistFastCloudSync();
    this.notify();

    const userId = authService.getUserId();
    await DsaService.updateAlreadySolvedProgress(userId, id, updates);
  }

  getDsaStats() {
    const total = this.dsaProblems.length;
    const completed = this.dsaProblems.filter(p => p.status === 'DONE').length;
    const inProgress = this.dsaProblems.filter(p => p.status === 'IN_PROGRESS').length;
    const revise = this.dsaProblems.filter(p => p.status === 'REVISE').length;
    const skipped = this.dsaProblems.filter(p => p.status === 'SKIPPED').length;
    const notStarted = Math.max(0, total - (completed + inProgress + revise + skipped));

    const diffStats = {
      Easy: { total: 0, done: 0 },
      Medium: { total: 0, done: 0 },
      Hard: { total: 0, done: 0 }
    };

    const categoryStats = {};
    const patternStats = {};

    this.dsaProblems.forEach(p => {
      const diff = p.difficulty || 'Medium';
      if (diffStats[diff]) {
        diffStats[diff].total += 1;
        if (p.status === 'DONE') diffStats[diff].done += 1;
      }

      const cat = p.subTopic || 'General';
      if (!categoryStats[cat]) {
        categoryStats[cat] = { total: 0, done: 0, easy: 0, medium: 0, hard: 0, revise: 0 };
      }
      categoryStats[cat].total += 1;
      if (p.status === 'DONE') categoryStats[cat].done += 1;
      if (p.status === 'REVISE') categoryStats[cat].revise += 1;
      if (p.difficulty === 'Easy') categoryStats[cat].easy += 1;
      if (p.difficulty === 'Medium') categoryStats[cat].medium += 1;
      if (p.difficulty === 'Hard') categoryStats[cat].hard += 1;

      const pat = (p.pattern || '').trim();
      if (pat) {
        if (!patternStats[pat]) patternStats[pat] = { name: pat, total: 0, done: 0, revise: 0, attempts: 0 };
        patternStats[pat].total += 1;
        if (p.status === 'DONE') patternStats[pat].done += 1;
        if (p.status === 'REVISE') patternStats[pat].revise += 1;
        patternStats[pat].attempts += (p.attempts || 0);
      }
    });

    const weakPatterns = Object.values(patternStats)
      .filter(p => p.total >= 3 && (p.done / p.total) < 0.5)
      .sort((a, b) => (a.done / a.total) - (b.done / b.total))
      .slice(0, 5);

    const todayStr = ActivityService.getTodayDateString();
    const todayCompleted = this.dsaProblems.filter(p => p.status === 'DONE' && p.dateSolved === todayStr).length;

    return {
      total,
      completed,
      inProgress,
      revise,
      skipped,
      notStarted,
      progressPercentage: total > 0 ? Math.round((completed / total) * 100) : 0,
      difficultyStats: diffStats,
      categoryStats,
      weakPatterns,
      todayTarget: this.dsaSettings.dailyTarget || 3,
      todayCompleted,
      alreadySolvedCount: this.dsaAlreadySolved.length
    };
  }

  getDsaTodayProblems(limit) {
    const target = (typeof limit === 'number' && limit > 0) ? limit : (this.dsaSettings.dailyTarget || 3);
    const pending = this.dsaProblems.filter(p => p.status === 'NOT_STARTED' || p.status === 'IN_PROGRESS');
    return pending.slice(0, target);
  }

  // ==========================================
  // AI ENGINEER TRACK MUTATIONS (OPTIMISTIC + DATABASE)
  // ==========================================

  getDay(dayNum) {
    return this.days.find(d => d.day === dayNum);
  }

  async updateDay(dayNum, updates) {
    const idx = this.days.findIndex(d => d.day === dayNum);
    if (idx === -1) return null;

    // 1. Optimistic Update with Fresh Array Reference for React reactivity
    const updatedDay = {
      ...this.days[idx],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    const nextDays = [...this.days];
    nextDays[idx] = updatedDay;
    this.days = nextDays;

    this.persistLocalCache();
    this.broadcastChange({ type: 'AI_UPDATE', day: updatedDay });
    this.persistFastCloudSync();
    this.syncState = 'syncing';
    this.notify();

    // 2. Persist to Supabase Cloud Database
    const userId = authService.getUserId();
    try {
      const result = await AiService.updateDayProgress(userId, dayNum, updates);
      if (result.success) {
        this.syncState = 'synced';
        this.lastSyncedAt = new Date().toISOString();
        this.lastError = null;
        if (updates.status === 'COMPLETED') {
          ActivityService.recordActivity(userId, { aiCompleted: 1 });
        }
      } else {
        console.warn("Supabase AI write note (stored locally & fast cloud sync):", result.error);
        this.syncState = 'offline';
      }
    } catch (err) {
      console.warn("Supabase network note (stored locally & fast cloud sync):", err.message);
      this.syncState = 'offline';
    }

    this.notify();
    return this.days[idx];
  }

  setStatus(dayNum, status) {
    const day = this.getDay(dayNum);
    if (!day) return;

    const updates = { status };
    if (status === 'COMPLETED') {
      updates.completedAt = new Date().toISOString();
      if (!day.mastery || day.mastery === 0) updates.mastery = 4;
    }
    this.updateDay(dayNum, updates);
  }

  setRemarks(dayNum, remarks) {
    this.updateDay(dayNum, { remarks });
  }

  setNotes(dayNum, notes) {
    this.updateDay(dayNum, { notes });
  }

  setMastery(dayNum, mastery) {
    this.updateDay(dayNum, { mastery });
  }

  async addDoubt(dayNum, { question, userUnderstanding }) {
    const day = this.getDay(dayNum);
    if (!day) return null;

    const userId = authService.getUserId();
    const tempId = `doubt_${Date.now()}`;
    const newDoubt = {
      id: tempId,
      dayNum,
      topic: day.topic,
      question: question.trim(),
      userUnderstanding: (userUnderstanding || '').trim(),
      status: 'OPEN',
      createdAt: new Date().toISOString(),
      solution: null
    };

    const doubts = day.doubts || [];
    day.doubts = [newDoubt, ...doubts];
    this.persistLocalCache();
    this.broadcastChange({ type: 'AI_UPDATE', day });
    this.persistFastCloudSync();
    this.notify();

    const result = await AiService.addDoubt(userId, {
      dayNum,
      topic: day.topic,
      question,
      userUnderstanding
    });

    if (result.success && result.doubt) {
      newDoubt.id = result.doubt.id;
      this.persistLocalCache();
      this.persistFastCloudSync();
      ActivityService.recordActivity(userId, { doubts: 1 });
    }
    return newDoubt;
  }

  async resolveDoubt(dayNum, doubtId, { answer, explanation }) {
    const day = this.getDay(dayNum);
    if (!day || !day.doubts) return false;

    const idx = day.doubts.findIndex(d => d.id === doubtId);
    if (idx !== -1) {
      day.doubts[idx].status = 'RESOLVED';
      day.doubts[idx].solution = {
        answer: answer.trim(),
        explanation: (explanation || '').trim(),
        verifiedAt: new Date().toISOString()
      };
      this.persistLocalCache();
      this.broadcastChange({ type: 'AI_UPDATE', day });
      this.persistFastCloudSync();
      this.notify();
    }

    const userId = authService.getUserId();
    await AiService.resolveDoubt(userId, doubtId, { answer, explanation });
    return true;
  }

  async deleteDoubt(dayNum, doubtId) {
    const day = this.getDay(dayNum);
    if (!day || !day.doubts) return false;

    day.doubts = day.doubts.filter(d => d.id !== doubtId);
    this.persistLocalCache();
    this.broadcastChange({ type: 'AI_UPDATE', day });
    this.persistFastCloudSync();
    this.notify();

    const userId = authService.getUserId();
    await AiService.deleteDoubt(userId, doubtId);
    return true;
  }

  scheduleRevision(dayNum, intervalDays = 1) {
    const nextRev = ActivityService.getTodayDateString(intervalDays);
    this.updateDay(dayNum, {
      status: 'NEEDS_REVISION',
      nextRevisionDate: nextRev
    });
  }

  logStudyTime(dayNum, minutes, phase = 'build') {
    const day = this.getDay(dayNum);
    if (!day) return;

    const currentMins = day.timeSpentMinutes || 0;
    this.updateDay(dayNum, { timeSpentMinutes: currentMins + minutes });

    const userId = authService.getUserId();
    AiService.logSession(userId, { dayNum, minutes, phase });
    ActivityService.recordActivity(userId, { studyMinutes: minutes });
  }

  getDashboardStats() {
    const totalDays = this.days.length || 365;
    const completedDays = this.days.filter(d => d.status === 'COMPLETED').length;
    const inProgressDays = this.days.filter(d => d.status === 'IN_PROGRESS').length;
    const progressPercentage = totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0;

    let unresolvedDoubtsCount = 0;
    let resolvedDoubtsCount = 0;
    let totalMinutes = 0;

    const activityDates = [];
    const phaseStats = {};
    const weakAreas = [];

    this.days.forEach(d => {
      // Phase Stats
      const phase = d.phase || 'Phase 0 - Setup';
      if (!phaseStats[phase]) {
        phaseStats[phase] = { total: 0, completed: 0, needsRevision: 0 };
      }
      phaseStats[phase].total++;
      if (d.status === 'COMPLETED') phaseStats[phase].completed++;
      if (d.status === 'NEEDS_REVISION') phaseStats[phase].needsRevision++;

      // Doubts & time
      if (d.doubts && Array.isArray(d.doubts)) {
        d.doubts.forEach(doubt => {
          if (doubt.status === 'RESOLVED') resolvedDoubtsCount++;
          else unresolvedDoubtsCount++;
        });
      }
      totalMinutes += (d.timeSpentMinutes || 0);
      if (d.completedAt) {
        activityDates.push(d.completedAt.split('T')[0]);
      }

      // Weak areas calculation:
      // Severity based on unresolved doubts, mastery <= 2, or NEEDS_REVISION
      const reasons = [];
      let severity = 0;
      const dayDoubts = (d.doubts || []).filter(doubt => doubt.status !== 'RESOLVED');
      if (dayDoubts.length > 0) {
        severity += dayDoubts.length * 2;
        reasons.push(`${dayDoubts.length} open doubt${dayDoubts.length > 1 ? 's' : ''}`);
      }
      if (d.mastery && d.mastery > 0 && d.mastery <= 2) {
        severity += (3 - d.mastery) * 2;
        reasons.push(`Low mastery (${d.mastery}/5)`);
      }
      if (d.status === 'NEEDS_REVISION') {
        severity += 2;
        reasons.push('Marked for revision');
      }
      if (severity > 0) {
        weakAreas.push({
          dayNum: d.day,
          topic: d.topic || `Day ${d.day}`,
          severityScore: severity,
          reasons
        });
      }
    });

    weakAreas.sort((a, b) => b.severityScore - a.severityScore);

    this.dsaProblems.forEach(p => {
      if (p.dateSolved) activityDates.push(p.dateSolved);
    });

    const streak = ActivityService.calculateStreak(activityDates);
    const totalDoubts = unresolvedDoubtsCount + resolvedDoubtsCount;
    const doubtResolutionRate = totalDoubts > 0 ? Math.round((resolvedDoubtsCount / totalDoubts) * 100) : 100;

    const todayStr = ActivityService.getTodayDateString();
    const revisionDueCount = this.days.filter(d => d.status === 'NEEDS_REVISION' || (d.nextRevisionDate && d.nextRevisionDate <= todayStr)).length
      + this.dsaProblems.filter(p => p.status === 'REVISE' || (p.nextRevisionDate && p.nextRevisionDate <= todayStr)).length;

    return {
      progressPercentage,
      completedDays,
      inProgressDays,
      totalDays,
      unresolvedDoubtsCount,
      resolvedDoubtsCount,
      doubtResolutionRate,
      revisionDueCount,
      totalHours: (totalMinutes / 60).toFixed(1),
      streak,
      phaseStats,
      weakAreas
    };
  }

  getTodayDay() {
    // Determine active day by first non-completed day or Day 1
    const active = this.days.find(d => d.status !== 'COMPLETED');
    if (active) return active;
    if (this.days.length > 0) return this.days[0];
    return {
      day: 1,
      date: ActivityService.getTodayDateString(),
      week: 1,
      phase: "Phase 0 - Assessment & Setup",
      topic: "Environment + Repository Setup & Testing Baseline",
      concepts: "uv, pyproject.toml, pytest, ruff, git hooks",
      learnSection: "LEARN (45 min) - uv docs, pytest fixtures",
      sourceKey: "OWN",
      sourceName: "Python Packaging & Testing",
      sourceUrl: "https://docs.astral.sh/uv/",
      whatToStudy: "Study pyproject.toml configuration, pytest fixture scopes, virtual environment management.",
      whatToSkip: "Complex legacy setuptools packaging.",
      quality: "PRIMARY",
      implementTask: "Initialize ai-lab repository, configure pytest test runner and pre-commit hooks.",
      reviseTask: "Review virtual env commands.",
      deliverable: "Repo with green test suite",
      difficulty: 1,
      status: "NOT_STARTED",
      mastery: 0,
      timeSpentMinutes: 0,
      remarks: "",
      notes: "",
      doubts: []
    };
  }

  async pushCloudSync() {
    this.syncState = 'syncing';
    this.notify();
    const userId = authService.getUserId();
    try {
      // 1. Push non-default DSA problem progress
      for (const p of this.dsaProblems) {
        if (p.status !== 'NOT_STARTED' || p.notes || p.mistakes || p.attempts > 0 || p.mastery > 0 || p.approach || p.code) {
          await DsaService.updateProblemProgress(userId, p.id, {
            status: p.status,
            dateSolved: p.dateSolved,
            attempts: p.attempts,
            notes: p.notes,
            mistakes: p.mistakes,
            mastery: p.mastery,
            approach: p.approach,
            code: p.code,
            codeLang: p.codeLang,
            timeComplexity: p.timeComplexity,
            spaceComplexity: p.spaceComplexity,
            explanation: p.explanation,
            nextRevisionDate: p.nextRevisionDate
          });
        }
      }
      // 2. Push non-default AI days progress
      for (const d of this.days) {
        if (d.status !== 'NOT_STARTED' || d.remarks || d.notes || d.mastery > 0) {
          await AiService.updateDayProgress(userId, d.day, {
            status: d.status,
            remarks: d.remarks,
            notes: d.notes,
            mastery: d.mastery,
            timeSpentMinutes: d.timeSpentMinutes,
            completedAt: d.completedAt,
            nextRevisionDate: d.nextRevisionDate
          });
        }
      }
      this.syncState = 'synced';
      this.lastSyncedAt = new Date().toISOString();
      this.lastError = null;
    } catch (e) {
      this.syncState = 'offline';
      this.lastError = e.message;
    }
    this.notify();
  }

  async pullCloudSync() {
    await this.fetchFromDatabase();
  }

  saveSettings(newSettings) {
    this.settings = { ...this.settings, ...newSettings };
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(this.settings));
    this.notify();
  }

  saveDsaSettings(newSettings) {
    this.dsaSettings = { ...this.dsaSettings, ...newSettings };
    localStorage.setItem(STORAGE_KEY_DSA_SETTINGS, JSON.stringify(this.dsaSettings));
    this.notify();
  }

  // ==========================================
  // DATA EXPORT & BACKUP
  // ==========================================
  exportAllDataAsJson() {
    const fullBackup = {
      exportDate: new Date().toISOString(),
      user: authService.getCurrentUser(),
      dsaTrack: {
        problems: this.dsaProblems,
        alreadySolved: this.dsaAlreadySolved,
        categories: this.dsaCategories,
        settings: this.dsaSettings
      },
      aiTrack: {
        days: this.days,
        projects: this.projects,
        checkpoints: this.checkpoints,
        settings: this.settings
      }
    };
    const blob = new Blob([JSON.stringify(fullBackup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jeevanpranav_os_backup_${ActivityService.getTodayDateString()}.json`;
    a.click();
  }
}

export const storageService = new StorageService();

if (typeof window !== 'undefined') {
  window.storageService = storageService;
}
