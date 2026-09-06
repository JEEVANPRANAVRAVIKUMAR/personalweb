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

    // 2. Fetch authoritative state from Supabase Cloud Database
    await this.fetchFromDatabase();

    // 3. Check for one-time migration of previous local storage
    await this.checkAndMigrateLegacyLocalStorage();

    // 4. Setup Supabase Realtime Channels
    this.setupRealtimeSubscriptions();

    this.isLoading = false;
    this.notify();
  }

  /**
   * Authoritative fetch from Supabase PostgreSQL
   */
  async fetchFromDatabase() {
    const userId = authService.getUserId();
    this.syncState = 'syncing';
    this.notify();

    try {
      // 1. Fetch DSA Problems & User Progress
      const dsaResult = await DsaService.getMergedProblems(userId);
      if (dsaResult.success && Array.isArray(dsaResult.data) && dsaResult.data.length > 0) {
        this.dsaProblems = dsaResult.data;
      }

      // 2. Fetch DSA Already Solved & Revision State
      const solvedResult = await DsaService.getMergedAlreadySolved(userId);
      if (solvedResult.success && Array.isArray(solvedResult.data) && solvedResult.data.length > 0) {
        this.dsaAlreadySolved = solvedResult.data;
      }

      // 3. Fetch AI Roadmap Days, Progress & Doubts
      const aiResult = await AiService.getMergedRoadmapDays(userId);
      if (aiResult.success && Array.isArray(aiResult.data) && aiResult.data.length > 0) {
        this.days = aiResult.data;
      }

      // 4. Fetch AI Projects
      const projResult = await AiService.getMergedProjects(userId);
      if (projResult.success && Array.isArray(projResult.projects)) {
        this.projects = projResult.projects;
      }

      this.syncState = 'synced';
      this.lastSyncedAt = new Date().toISOString();
      this.lastError = null;
      this.activeAdapter = 'supabase';
    } catch (err) {
      console.error("StorageService fetch error:", err);
      this.syncState = 'error';
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

    const userId = authService.getUserId();

    // 1. Subscribe to DSA Problem Progress
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
            nextRevisionDate: row.next_revision_date
          };
          this.notify();
        }
      }
    });
    this.realtimeCleanups.push(unsubDsa);

    // 2. Subscribe to AI Roadmap Progress
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
          this.notify();
        }
      }
    });
    this.realtimeCleanups.push(unsubAi);

    // 3. Subscribe to AI Doubts
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
            this.notify();
          }
        }
      }
    });
    this.realtimeCleanups.push(unsubDoubts);
  }

  setupMultiDeviceSyncListeners() {
    if (typeof window === 'undefined') return;

    // Refresh data whenever tab/phone screen becomes visible
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        this.fetchFromDatabase();
      }
    });

    window.addEventListener('focus', () => {
      this.fetchFromDatabase();
    });
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

    const previousState = { ...this.dsaProblems[idx] };
    const problemId = this.dsaProblems[idx].id;

    // 1. Optimistic Update
    this.dsaProblems[idx] = {
      ...this.dsaProblems[idx],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.syncState = 'syncing';
    this.notify();

    // 2. Persist to Supabase
    const userId = authService.getUserId();
    const result = await DsaService.updateProblemProgress(userId, problemId, updates);

    if (result.success) {
      this.syncState = 'synced';
      this.lastSyncedAt = new Date().toISOString();
      this.lastError = null;
      if (updates.status === 'DONE') {
        ActivityService.recordActivity(userId, { dsaCompleted: 1 });
      }
    } else {
      // Rollback on failure
      console.error("Failed to save DSA update, rolling back:", result.error);
      this.dsaProblems[idx] = previousState;
      this.syncState = 'error';
      this.lastError = result.error || "Failed to save to cloud database.";
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

  getDsaTodayProblems() {
    const target = this.dsaSettings.dailyTarget || 3;
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

    const previousState = { ...this.days[idx] };

    // 1. Optimistic Update
    this.days[idx] = {
      ...this.days[idx],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.syncState = 'syncing';
    this.notify();

    // 2. Persist to Supabase
    const userId = authService.getUserId();
    const result = await AiService.updateDayProgress(userId, dayNum, updates);

    if (result.success) {
      this.syncState = 'synced';
      this.lastSyncedAt = new Date().toISOString();
      this.lastError = null;
      if (updates.status === 'COMPLETED') {
        ActivityService.recordActivity(userId, { aiCompleted: 1 });
      }
    } else {
      console.error("Failed to save AI day update, rolling back:", result.error);
      this.days[idx] = previousState;
      this.syncState = 'error';
      this.lastError = result.error || "Failed to save to cloud database.";
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
    this.notify();

    const result = await AiService.addDoubt(userId, {
      dayNum,
      topic: day.topic,
      question,
      userUnderstanding
    });

    if (result.success && result.doubt) {
      newDoubt.id = result.doubt.id;
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
    const progressPercentage = Math.round((completedDays / totalDays) * 100);

    let unresolvedDoubtsCount = 0;
    let resolvedDoubtsCount = 0;
    let totalMinutes = 0;

    const activityDates = [];

    this.days.forEach(d => {
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
    });

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
      totalDays,
      unresolvedDoubtsCount,
      resolvedDoubtsCount,
      doubtResolutionRate,
      revisionDueCount,
      totalHours: (totalMinutes / 60).toFixed(1),
      streak
    };
  }

  getTodayDay() {
    // Determine active day by first non-completed day or Day 1
    const active = this.days.find(d => d.status !== 'COMPLETED');
    return active || this.days[0];
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
