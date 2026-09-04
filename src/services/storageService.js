// storageService.js - Real-World Multi-Device Synchronized Storage Engine
import { getEnrichedRoadmapDays } from '../data/roadmapDataset.js';
import { PROJECTS_DATASET, CHECKPOINTS_DATASET } from '../data/projectsDataset.js';
import { SOURCES_DATASET } from '../data/sourcesDataset.js';
import { DSA_CATEGORIES, RAW_DSA_PRACTICE_FALLBACK, RAW_DSA_ALREADY_SOLVED_FALLBACK } from '../data/dsaDataset.js';

// STORAGE KEYS
const STORAGE_KEY_DAYS = 'ai_eng_roadmap_days_v1';
const STORAGE_KEY_PROJECTS = 'ai_eng_projects_v1';
const STORAGE_KEY_CHECKPOINTS = 'ai_eng_checkpoints_v1';
const STORAGE_KEY_SETTINGS = 'ai_eng_settings_v1';
const STORAGE_KEY_SESSIONS = 'ai_eng_sessions_v1';

const STORAGE_KEY_DSA_PROBLEMS = 'dsa_practice_problems_v1';
const STORAGE_KEY_DSA_ALREADY_SOLVED = 'dsa_already_solved_v1';
const STORAGE_KEY_DSA_SETTINGS = 'dsa_settings_v1';
const STORAGE_KEY_SYNC_META = 'tracker_sync_meta_v1';

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
  dailyTarget: 3, // 3 problems/day (~12 weeks) or 5 problems/day (~7 weeks)
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

    // Cloud Sync State
    this.syncState = 'synced'; // 'synced' | 'syncing' | 'offline' | 'local_fallback'
    this.lastSyncedAt = null;
    this.activeAdapter = 'local';
    this.syncTimeout = null;
    this.isPulling = false;

    this.listeners = new Set();
    this.init();
    this.setupMultiDeviceSyncListeners();
  }

  init() {
    try {
      const getDays = typeof getEnrichedRoadmapDays !== 'undefined' ? getEnrichedRoadmapDays : (window.getEnrichedRoadmapDays || (() => []));
      const projs = typeof PROJECTS_DATASET !== 'undefined' ? PROJECTS_DATASET : (window.PROJECTS_DATASET || []);
      const cps = typeof CHECKPOINTS_DATASET !== 'undefined' ? CHECKPOINTS_DATASET : (window.CHECKPOINTS_DATASET || []);

      // 1. AI: Load days
      const rawDays = localStorage.getItem(STORAGE_KEY_DAYS);
      if (rawDays) {
        this.days = JSON.parse(rawDays);
      } else {
        this.days = getDays();
        this.saveDays(false);
      }

      // 2. AI: Load projects
      const rawProjects = localStorage.getItem(STORAGE_KEY_PROJECTS);
      if (rawProjects) {
        this.projects = JSON.parse(rawProjects);
      } else {
        this.projects = JSON.parse(JSON.stringify(projs));
        this.saveProjects(false);
      }

      // 3. AI: Load checkpoints
      const rawCPs = localStorage.getItem(STORAGE_KEY_CHECKPOINTS);
      if (rawCPs) {
        this.checkpoints = JSON.parse(rawCPs);
      } else {
        this.checkpoints = cps.map(cp => ({
          ...cp,
          status: "PENDING",
          scores: { theory: 0, implementation: 0, debugging: 0, explanation: 0, project: 0 },
          totalScore: 0,
          remarks: "",
          reviewedAt: null
        }));
        this.saveCheckpoints(false);
      }

      // 4. AI: Load settings
      const rawSettings = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (rawSettings) {
        this.settings = { ...DEFAULT_AI_SETTINGS, ...JSON.parse(rawSettings) };
      }

      // 5. AI: Load sessions
      const rawSessions = localStorage.getItem(STORAGE_KEY_SESSIONS);
      if (rawSessions) {
        this.sessions = JSON.parse(rawSessions);
      }

      // 6. DSA: Load practice problems
      const rawDsa = localStorage.getItem(STORAGE_KEY_DSA_PROBLEMS);
      if (rawDsa) {
        this.dsaProblems = JSON.parse(rawDsa);
      } else {
        const rawPracticeCache = localStorage.getItem('RAW_DSA_PRACTICE');
        if (rawPracticeCache) {
          this.dsaProblems = JSON.parse(rawPracticeCache);
        } else if (RAW_DSA_PRACTICE_FALLBACK && RAW_DSA_PRACTICE_FALLBACK.length > 0) {
          this.dsaProblems = JSON.parse(JSON.stringify(RAW_DSA_PRACTICE_FALLBACK));
        } else {
          this.dsaProblems = [];
        }
        if (this.dsaProblems.length > 0) this.saveDsaProblems(false);
      }

      // 7. DSA: Load already solved problems
      const rawAlreadySolved = localStorage.getItem(STORAGE_KEY_DSA_ALREADY_SOLVED);
      if (rawAlreadySolved) {
        this.dsaAlreadySolved = JSON.parse(rawAlreadySolved);
      } else {
        const rawSolvedCache = localStorage.getItem('RAW_DSA_ALREADY_SOLVED');
        if (rawSolvedCache) {
          this.dsaAlreadySolved = JSON.parse(rawSolvedCache);
        } else if (RAW_DSA_ALREADY_SOLVED_FALLBACK && RAW_DSA_ALREADY_SOLVED_FALLBACK.length > 0) {
          this.dsaAlreadySolved = JSON.parse(JSON.stringify(RAW_DSA_ALREADY_SOLVED_FALLBACK));
        } else {
          this.dsaAlreadySolved = [];
        }
        if (this.dsaAlreadySolved.length > 0) this.saveDsaAlreadySolved(false);
      }

      // 8. DSA: Load settings
      const rawDsaSettings = localStorage.getItem(STORAGE_KEY_DSA_SETTINGS);
      if (rawDsaSettings) {
        this.dsaSettings = { ...DEFAULT_DSA_SETTINGS, ...JSON.parse(rawDsaSettings) };
      }

      // 9. Load Sync Meta
      const rawSyncMeta = localStorage.getItem(STORAGE_KEY_SYNC_META);
      if (rawSyncMeta) {
        const meta = JSON.parse(rawSyncMeta);
        this.lastSyncedAt = meta.lastSyncedAt;
        this.activeAdapter = meta.activeAdapter || 'local';
      }

      // 10. Initial pull from Cloud Database
      setTimeout(() => this.pullCloudSync(true), 300);

    } catch (e) {
      console.error("StorageService init error:", e);
      this.days = getEnrichedRoadmapDays();
      this.projects = JSON.parse(JSON.stringify(PROJECTS_DATASET));
      this.checkpoints = JSON.parse(JSON.stringify(CHECKPOINTS_DATASET));
      this.settings = DEFAULT_AI_SETTINGS;
    }
  }

  setupMultiDeviceSyncListeners() {
    if (typeof window === 'undefined') return;

    // Auto-pull whenever user focuses window or returns to tab on another device
    window.addEventListener('focus', () => {
      this.pullCloudSync(true);
    });

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        this.pullCloudSync(true);
      }
    });

    // Periodic sync every 45 seconds (like Google Docs / Notion)
    setInterval(() => {
      if (document.visibilityState === 'visible') {
        this.pullCloudSync(true);
      }
    }, 45000);

    // Flush any pending changes immediately before closing/switching app
    window.addEventListener('beforeunload', () => {
      if (this.syncTimeout) {
        clearTimeout(this.syncTimeout);
        this.pushCloudSyncSync();
      }
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

  // ==========================================
  // REAL-TIME MULTI-DEVICE CLOUD SYNC
  // ==========================================

  scheduleCloudSync() {
    if (this.syncTimeout) clearTimeout(this.syncTimeout);
    this.syncState = 'syncing';
    this.notify();

    // Fast 300ms debounce for instant cross-device synchronization
    this.syncTimeout = setTimeout(async () => {
      await this.pushCloudSync();
    }, 300);
  }

  getPayload() {
    return {
      days: this.days,
      dsaProblems: this.dsaProblems,
      dsaAlreadySolved: this.dsaAlreadySolved,
      doubts: this.getAllDoubtsList(),
      projects: this.projects,
      checkpoints: this.checkpoints,
      settings: { ai: this.settings, dsa: this.dsaSettings },
      sessions: this.sessions
    };
  }

  async pushCloudSync() {
    try {
      const payload = this.getPayload();
      const res = await fetch('/api/sync?username=JeevanPranav', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const data = await res.json();
        this.syncState = 'synced';
        this.lastSyncedAt = data.updatedAt || new Date().toISOString();
        this.activeAdapter = data.adapter || 'cloud';
        localStorage.setItem(STORAGE_KEY_SYNC_META, JSON.stringify({
          lastSyncedAt: this.lastSyncedAt,
          activeAdapter: this.activeAdapter
        }));
      } else {
        this.syncState = 'local_fallback';
      }
    } catch (e) {
      this.syncState = 'offline';
    } finally {
      this.notify();
    }
  }

  pushCloudSyncSync() {
    try {
      const payload = this.getPayload();
      const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/sync?username=JeevanPranav', blob);
      }
    } catch (e) {}
  }

  async pullCloudSync(silent = false) {
    if (this.isPulling) return;
    this.isPulling = true;
    try {
      const res = await fetch('/api/sync?username=JeevanPranav');
      if (res.ok) {
        const result = await res.json();
        if (result.success && result.data) {
          const cloud = result.data;
          let changed = false;

          // 1. SMART MERGE: AI Days
          if (Array.isArray(cloud.days) && cloud.days.length === 365) {
            cloud.days.forEach(cloudDay => {
              const localDay = this.days.find(d => d.day === cloudDay.day);
              if (localDay) {
                // If cloud day is COMPLETED or has newer remarks/mastery, apply to local
                if (cloudDay.status === 'COMPLETED' && localDay.status !== 'COMPLETED') {
                  localDay.status = 'COMPLETED';
                  localDay.completedAt = cloudDay.completedAt || new Date().toISOString();
                  changed = true;
                } else if (cloudDay.status && cloudDay.status !== localDay.status && localDay.status === 'NOT_STARTED') {
                  localDay.status = cloudDay.status;
                  changed = true;
                }

                if (cloudDay.remarks && cloudDay.remarks !== localDay.remarks) {
                  localDay.remarks = cloudDay.remarks;
                  changed = true;
                }
                if (cloudDay.notes && cloudDay.notes !== localDay.notes) {
                  localDay.notes = cloudDay.notes;
                  changed = true;
                }
                if (cloudDay.mastery && cloudDay.mastery !== localDay.mastery) {
                  localDay.mastery = cloudDay.mastery;
                  changed = true;
                }
                if (Array.isArray(cloudDay.doubts) && cloudDay.doubts.length > (localDay.doubts?.length || 0)) {
                  localDay.doubts = cloudDay.doubts;
                  changed = true;
                }
              }
            });
            if (changed) {
              localStorage.setItem(STORAGE_KEY_DAYS, JSON.stringify(this.days));
            }
          }

          // 2. SMART MERGE: DSA Problems
          if (Array.isArray(cloud.dsaProblems) && cloud.dsaProblems.length > 0) {
            cloud.dsaProblems.forEach(cloudP => {
              const localP = this.dsaProblems.find(p => p.id === cloudP.id);
              if (localP) {
                if (cloudP.status === 'DONE' && localP.status !== 'DONE') {
                  localP.status = 'DONE';
                  localP.dateSolved = cloudP.dateSolved || new Date().toISOString().split('T')[0];
                  changed = true;
                } else if (cloudP.status && cloudP.status !== localP.status && localP.status === 'NOT_STARTED') {
                  localP.status = cloudP.status;
                  changed = true;
                }

                if ((cloudP.attempts || 0) > (localP.attempts || 0)) {
                  localP.attempts = cloudP.attempts;
                  changed = true;
                }
                if (cloudP.notes && cloudP.notes !== localP.notes) {
                  localP.notes = cloudP.notes;
                  changed = true;
                }
                if (cloudP.mistakes && cloudP.mistakes !== localP.mistakes) {
                  localP.mistakes = cloudP.mistakes;
                  changed = true;
                }
                if (cloudP.mastery && cloudP.mastery !== localP.mastery) {
                  localP.mastery = cloudP.mastery;
                  changed = true;
                }
              }
            });
            if (changed) {
              localStorage.setItem(STORAGE_KEY_DSA_PROBLEMS, JSON.stringify(this.dsaProblems));
            }
          }

          // 3. Projects & Checkpoints Merge
          if (Array.isArray(cloud.projects) && cloud.projects.length > 0) {
            this.projects = cloud.projects;
            localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(this.projects));
            changed = true;
          }
          if (Array.isArray(cloud.checkpoints) && cloud.checkpoints.length > 0) {
            this.checkpoints = cloud.checkpoints;
            localStorage.setItem(STORAGE_KEY_CHECKPOINTS, JSON.stringify(this.checkpoints));
            changed = true;
          }

          this.syncState = 'synced';
          this.lastSyncedAt = cloud.updatedAt || new Date().toISOString();
          this.activeAdapter = result.adapter || 'cloud';
          localStorage.setItem(STORAGE_KEY_SYNC_META, JSON.stringify({
            lastSyncedAt: this.lastSyncedAt,
            activeAdapter: this.activeAdapter
          }));

          if (changed) this.notify();
        }
      }
    } catch (e) {
      this.syncState = 'offline';
      if (!silent) this.notify();
    } finally {
      this.isPulling = false;
    }
  }

  getSyncInfo() {
    return {
      state: this.syncState,
      lastSyncedAt: this.lastSyncedAt,
      adapter: this.activeAdapter
    };
  }

  getAllDoubtsList() {
    const list = [];
    this.days.forEach(d => {
      if (d.doubts && Array.isArray(d.doubts)) {
        list.push(...d.doubts);
      }
    });
    return list;
  }

  // ==========================================
  // AI ENGINEER TRACK METHODS
  // ==========================================
  saveDays(shouldSync = true) {
    try {
      localStorage.setItem(STORAGE_KEY_DAYS, JSON.stringify(this.days));
      this.notify();
      if (shouldSync) this.scheduleCloudSync();
    } catch (e) {
      console.error("Failed to save AI days to localStorage:", e);
    }
  }

  saveProjects(shouldSync = true) {
    try {
      localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(this.projects));
      this.notify();
      if (shouldSync) this.scheduleCloudSync();
    } catch (e) {
      console.error("Failed to save AI projects:", e);
    }
  }

  saveCheckpoints(shouldSync = true) {
    try {
      localStorage.setItem(STORAGE_KEY_CHECKPOINTS, JSON.stringify(this.checkpoints));
      this.notify();
      if (shouldSync) this.scheduleCloudSync();
    } catch (e) {
      console.error("Failed to save AI checkpoints:", e);
    }
  }

  saveSettings(newSettings) {
    this.settings = { ...this.settings, ...newSettings };
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(this.settings));
    this.notify();
    this.scheduleCloudSync();
  }

  saveSessions() {
    try {
      localStorage.setItem(STORAGE_KEY_SESSIONS, JSON.stringify(this.sessions));
      this.notify();
      this.scheduleCloudSync();
    } catch (e) {
      console.error("Failed to save AI sessions:", e);
    }
  }

  getDay(dayNum) {
    return this.days.find(d => d.day === dayNum);
  }

  updateDay(dayNum, updates) {
    const idx = this.days.findIndex(d => d.day === dayNum);
    if (idx !== -1) {
      this.days[idx] = { ...this.days[idx], ...updates };
      this.saveDays();
      return this.days[idx];
    }
    return null;
  }

  setStatus(dayNum, status) {
    const day = this.getDay(dayNum);
    if (!day) return;

    const updates = { status };
    if (status === 'COMPLETED') {
      updates.completedAt = new Date().toISOString();
      if (!day.mastery || day.mastery === 0) updates.mastery = 3;
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

  addDoubt(dayNum, { question, userUnderstanding }) {
    const day = this.getDay(dayNum);
    if (!day) return null;

    const doubt = {
      id: `doubt_${dayNum}_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      dayNum,
      topic: day.topic,
      question: question.trim(),
      userUnderstanding: (userUnderstanding || '').trim(),
      status: 'OPEN',
      createdAt: new Date().toISOString(),
      solution: null
    };

    const doubts = day.doubts || [];
    this.updateDay(dayNum, { doubts: [...doubts, doubt] });
    return doubt;
  }

  resolveDoubt(dayNum, doubtId, { answer, explanation }) {
    const day = this.getDay(dayNum);
    if (!day || !day.doubts) return false;

    const updatedDoubts = day.doubts.map(d => {
      if (d.id === doubtId) {
        return {
          ...d,
          status: 'RESOLVED',
          resolvedAt: new Date().toISOString(),
          solution: {
            answer: answer.trim(),
            explanation: (explanation || '').trim(),
            verifiedAt: new Date().toISOString()
          }
        };
      }
      return d;
    });

    this.updateDay(dayNum, { doubts: updatedDoubts });
    return true;
  }

  deleteDoubt(dayNum, doubtId) {
    const day = this.getDay(dayNum);
    if (!day || !day.doubts) return false;

    const updatedDoubts = day.doubts.filter(d => d.id !== doubtId);
    this.updateDay(dayNum, { doubts: updatedDoubts });
    return true;
  }

  scheduleRevision(dayNum, intervalDays = 1) {
    const day = this.getDay(dayNum);
    if (!day) return;

    const now = new Date();
    const scheduledDate = new Date(now.setDate(now.getDate() + intervalDays)).toISOString().split('T')[0];

    const currentIntervals = day.revisionSchedule || [];
    const newSchedule = [
      ...currentIntervals,
      {
        intervalDays,
        scheduledDate,
        createdAt: new Date().toISOString(),
        completed: false
      }
    ];

    this.updateDay(dayNum, {
      status: 'NEEDS_REVISION',
      revisionSchedule: newSchedule,
      nextRevisionDate: scheduledDate
    });
  }

  logStudyTime(dayNum, minutes, phase = 'build') {
    const day = this.getDay(dayNum);
    if (!day) return;

    const currentMins = day.timeSpentMinutes || 0;
    const sessionLog = {
      id: `session_${Date.now()}`,
      dayNum,
      minutes,
      phase,
      timestamp: new Date().toISOString()
    };

    this.sessions.push(sessionLog);
    this.saveSessions();

    this.updateDay(dayNum, {
      timeSpentMinutes: currentMins + minutes,
      lastStudiedAt: new Date().toISOString()
    });
  }

  getDashboardStats() {
    const totalDays = this.days.length;
    const completedDays = this.days.filter(d => d.status === 'COMPLETED').length;
    const inProgressDays = this.days.filter(d => d.status === 'IN_PROGRESS').length;
    const needsRevisionDays = this.days.filter(d => d.status === 'NEEDS_REVISION').length;
    const skippedDays = this.days.filter(d => d.status === 'SKIPPED').length;
    const notStartedDays = totalDays - (completedDays + inProgressDays + needsRevisionDays + skippedDays);

    let allDoubts = [];
    this.days.forEach(d => {
      if (d.doubts && Array.isArray(d.doubts)) {
        allDoubts.push(...d.doubts);
      }
    });
    const unresolvedDoubts = allDoubts.filter(d => d.status === 'OPEN');
    const resolvedDoubts = allDoubts.filter(d => d.status === 'RESOLVED');

    const totalMinutes = this.days.reduce((acc, d) => acc + (d.timeSpentMinutes || 0), 0);
    const totalHours = (totalMinutes / 60).toFixed(1);

    const ratedDays = this.days.filter(d => d.mastery && d.mastery > 0);
    const avgMastery = ratedDays.length > 0
      ? (ratedDays.reduce((acc, d) => acc + d.mastery, 0) / ratedDays.length).toFixed(1)
      : '0.0';

    const todayStr = new Date().toISOString().split('T')[0];
    const revisionDue = this.days.filter(d => {
      if (d.status === 'NEEDS_REVISION') return true;
      if (d.nextRevisionDate && d.nextRevisionDate <= todayStr) return true;
      return false;
    });

    const phaseStats = {};
    this.days.forEach(d => {
      if (!phaseStats[d.phase]) {
        phaseStats[d.phase] = { total: 0, completed: 0, inProgress: 0, needsRevision: 0 };
      }
      phaseStats[d.phase].total += 1;
      if (d.status === 'COMPLETED') phaseStats[d.phase].completed += 1;
      if (d.status === 'IN_PROGRESS') phaseStats[d.phase].inProgress += 1;
      if (d.status === 'NEEDS_REVISION') phaseStats[d.phase].needsRevision += 1;
    });

    const weakAreas = [];
    this.days.forEach(d => {
      const openDoubtsCount = (d.doubts || []).filter(doubt => doubt.status === 'OPEN').length;
      const isLowMastery = (d.mastery && d.mastery <= 2);
      const isRevision = d.status === 'NEEDS_REVISION';

      if (openDoubtsCount > 0 || isLowMastery || isRevision) {
        let severityScore = 0;
        const reasons = [];

        if (openDoubtsCount > 0) {
          severityScore += openDoubtsCount * 3;
          reasons.push(`${openDoubtsCount} open doubt${openDoubtsCount > 1 ? 's' : ''}`);
        }
        if (isLowMastery) {
          severityScore += (3 - (d.mastery || 0)) * 2;
          reasons.push(`Low mastery rating (${d.mastery}/5)`);
        }
        if (isRevision) {
          severityScore += 2;
          reasons.push(`Flagged for revision`);
        }

        weakAreas.push({
          dayNum: d.day,
          topic: d.topic,
          phase: d.phase,
          severityScore,
          reasons
        });
      }
    });

    weakAreas.sort((a, b) => b.severityScore - a.severityScore);

    return {
      totalDays,
      completedDays,
      inProgressDays,
      needsRevisionDays,
      skippedDays,
      notStartedDays,
      progressPercentage: Math.round((completedDays / (totalDays || 1)) * 100),
      unresolvedDoubtsCount: unresolvedDoubts.length,
      resolvedDoubtsCount: resolvedDoubts.length,
      doubtResolutionRate: allDoubts.length > 0 ? Math.round((resolvedDoubts.length / allDoubts.length) * 100) : 100,
      totalHours,
      avgMastery,
      revisionDueCount: revisionDue.length,
      phaseStats,
      weakAreas
    };
  }

  getTodayDay() {
    const startDate = new Date(this.settings.startDate || "2026-09-07");
    const today = new Date();
    const diffTime = today.getTime() - startDate.getTime();
    const diffDays = Math.max(1, Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1);

    const targetDay = this.days.find(d => d.day === diffDays);
    if (!targetDay || targetDay.status === 'COMPLETED') {
      const activeDay = this.days.find(d => d.status === 'IN_PROGRESS' || d.status === 'NEEDS_REVISION' || d.status === 'NOT_STARTED');
      if (activeDay) return activeDay;
    }
    return targetDay || this.days[0];
  }

  // ==========================================
  // DSA TRACK METHODS
  // ==========================================
  saveDsaProblems(shouldSync = true) {
    try {
      localStorage.setItem(STORAGE_KEY_DSA_PROBLEMS, JSON.stringify(this.dsaProblems));
      this.notify();
      if (shouldSync) this.scheduleCloudSync();
    } catch (e) {
      console.error("Failed to save DSA problems:", e);
    }
  }

  saveDsaAlreadySolved(shouldSync = true) {
    try {
      localStorage.setItem(STORAGE_KEY_DSA_ALREADY_SOLVED, JSON.stringify(this.dsaAlreadySolved));
      this.notify();
      if (shouldSync) this.scheduleCloudSync();
    } catch (e) {
      console.error("Failed to save DSA already solved:", e);
    }
  }

  saveDsaSettings(newSettings) {
    this.dsaSettings = { ...this.dsaSettings, ...newSettings };
    localStorage.setItem(STORAGE_KEY_DSA_SETTINGS, JSON.stringify(this.dsaSettings));
    this.notify();
    this.scheduleCloudSync();
  }

  getDsaProblem(id) {
    return this.dsaProblems.find(p => p.id === id);
  }

  updateDsaProblem(id, updates) {
    const idx = this.dsaProblems.findIndex(p => p.id === id);
    if (idx !== -1) {
      this.dsaProblems[idx] = { ...this.dsaProblems[idx], ...updates, updatedAt: new Date().toISOString() };
      this.saveDsaProblems();
      return this.dsaProblems[idx];
    }
    return null;
  }

  setDsaStatus(id, status) {
    const prob = this.getDsaProblem(id);
    if (!prob) return;

    const updates = { status };
    if (status === 'DONE') {
      updates.dateSolved = new Date().toISOString().split('T')[0];
      if (!prob.mastery || prob.mastery === 0) updates.mastery = 4;
      if (!prob.attempts || prob.attempts === 0) updates.attempts = 1;
    } else if (status === 'REVISE') {
      const now = new Date();
      const nextRev = new Date(now.setDate(now.getDate() + 3)).toISOString().split('T')[0];
      updates.nextRevisionDate = nextRev;
    }
    this.updateDsaProblem(id, updates);
  }

  incrementDsaAttempts(id) {
    const prob = this.getDsaProblem(id);
    if (!prob) return;
    this.updateDsaProblem(id, { attempts: (prob.attempts || 0) + 1 });
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
    const now = new Date();
    const nextRev = new Date(now.setDate(now.getDate() + intervalDays)).toISOString().split('T')[0];
    this.updateDsaProblem(id, {
      status: 'REVISE',
      nextRevisionDate: nextRev,
      lastRevised: new Date().toISOString().split('T')[0]
    });
  }

  getDsaStats() {
    const total = this.dsaProblems.length;
    const completed = this.dsaProblems.filter(p => p.status === 'DONE').length;
    const inProgress = this.dsaProblems.filter(p => p.status === 'IN_PROGRESS').length;
    const revise = this.dsaProblems.filter(p => p.status === 'REVISE').length;
    const skipped = this.dsaProblems.filter(p => p.status === 'SKIPPED').length;
    const notStarted = total - (completed + inProgress + revise + skipped);

    const diffStats = {
      Easy: { total: 0, done: 0 },
      Medium: { total: 0, done: 0 },
      Hard: { total: 0, done: 0 }
    };

    const categoryStats = {};
    const patternStats = {};

    this.dsaProblems.forEach(p => {
      // Difficulty
      const diff = p.difficulty || 'Medium';
      if (diffStats[diff]) {
        diffStats[diff].total += 1;
        if (p.status === 'DONE') diffStats[diff].done += 1;
      }

      // Category
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

      // Pattern
      const pat = (p.pattern || '').trim();
      if (pat) {
        if (!patternStats[pat]) patternStats[pat] = { name: pat, total: 0, done: 0, revise: 0, attempts: 0 };
        patternStats[pat].total += 1;
        if (p.status === 'DONE') patternStats[pat].done += 1;
        if (p.status === 'REVISE') patternStats[pat].revise += 1;
        patternStats[pat].attempts += (p.attempts || 0);
      }
    });

    const todayStr = new Date().toISOString().split('T')[0];
    const todaySolved = this.dsaProblems.filter(p => p.dateSolved === todayStr && p.status === 'DONE').length;
    const revisionDue = this.dsaProblems.filter(p => p.status === 'REVISE' || (p.nextRevisionDate && p.nextRevisionDate <= todayStr));

    // Weak & Strong Patterns
    const patternsList = Object.values(patternStats);
    const weakPatterns = [...patternsList].filter(p => p.revise > 0 || (p.total > 1 && p.done / p.total < 0.5)).sort((a, b) => b.revise - a.revise).slice(0, 5);
    const strongPatterns = [...patternsList].filter(p => p.done > 0 && p.done / p.total >= 0.7).sort((a, b) => b.done - a.done).slice(0, 5);

    return {
      total,
      completed,
      inProgress,
      revise,
      skipped,
      notStarted,
      progressPercentage: Math.round((completed / (total || 1)) * 100),
      difficultyStats: diffStats,
      categoryStats,
      todayTarget: this.dsaSettings.dailyTarget || 3,
      todayCompleted: todaySolved,
      revisionDueCount: revisionDue.length,
      weakPatterns,
      strongPatterns,
      alreadySolvedCount: this.dsaAlreadySolved.length
    };
  }

  getDsaTodayProblems(count = 3) {
    const active = this.dsaProblems.filter(p => p.status === 'IN_PROGRESS' || p.status === 'REVISE');
    if (active.length >= count) return active.slice(0, count);

    const notStarted = this.dsaProblems.filter(p => p.status === 'NOT_STARTED');
    return [...active, ...notStarted.slice(0, count - active.length)];
  }

  // ==========================================
  // BACKUP, EXPORT & RESTORE
  // ==========================================
  exportDsaJSON() {
    return JSON.stringify({
      version: "1.0",
      track: "DSA",
      exportedAt: new Date().toISOString(),
      settings: this.dsaSettings,
      problems: this.dsaProblems,
      alreadySolved: this.dsaAlreadySolved
    }, null, 2);
  }

  exportDsaCSV() {
    const headers = ["ID", "SubTopic", "LC#", "Problem", "Difficulty", "Pattern", "Companies", "Status", "DateSolved", "Attempts", "Notes", "Mistakes", "Mastery", "Link"];
    const escape = (str) => `"${String(str || '').replace(/"/g, '""')}"`;
    const rows = this.dsaProblems.map(p => [
      p.id,
      escape(p.subTopic),
      p.lcNumber,
      escape(p.problem),
      p.difficulty,
      escape(p.pattern),
      escape(p.companies),
      p.status,
      escape(p.dateSolved),
      p.attempts || 0,
      escape(p.notes),
      escape(p.mistakes),
      p.mastery || 0,
      escape(p.link)
    ].join(','));
    return [headers.join(','), ...rows].join('\n');
  }

  resetAllDsaData() {
    const rawPracticeCache = localStorage.getItem('RAW_DSA_PRACTICE');
    if (rawPracticeCache) {
      this.dsaProblems = JSON.parse(rawPracticeCache);
    } else {
      this.dsaProblems = JSON.parse(JSON.stringify(RAW_DSA_PRACTICE_FALLBACK));
    }
    this.saveDsaProblems();
  }
}

export const storageService = new StorageService();

if (typeof window !== 'undefined') {
  window.storageService = storageService;
}
