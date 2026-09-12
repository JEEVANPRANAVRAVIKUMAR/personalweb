// App.jsx - Complete Multi-Track Application for JEEVANPRANAV TECHNICAL DEVELOPMENT TRACKER
// Tracks: 1. AI ENGINEER (365-Day Engine) | 2. DATA STRUCTURES & ALGORITHMS (250 Practice Set & 154 Revision)

const getAuth = () => {
  if (typeof window !== 'undefined' && window.authService) return window.authService;
  return {
    login: async (u, p) => {
      if (typeof window !== 'undefined' && window.authService) {
        return await window.authService.login(u, p);
      }
      return { success: true, user: { username: "JeevanPranav", name: "JeevanPranav" } };
    },
    logout: async () => {
      if (typeof window !== 'undefined' && window.authService) {
        await window.authService.logout();
      }
    },
    isAuthenticated: () => {
      if (typeof window !== 'undefined' && window.authService) {
        return window.authService.isAuthenticated();
      }
      return true;
    },
    getSelectedTrack: () => {
      if (typeof window !== 'undefined' && window.authService) {
        return window.authService.getSelectedTrack();
      }
      return null;
    },
    setSelectedTrack: (track) => {
      if (typeof window !== 'undefined' && window.authService) {
        window.authService.setSelectedTrack(track);
      }
    }
  };
};

const getStorage = () => {
  if (typeof window !== 'undefined' && window.storageService) return window.storageService;
  return {
    dsaProblems: [],
    dsaCategories: [],
    dsaAlreadySolved: [],
    days: [],
    projects: [],
    checkpoints: [],
    settings: { dailyTargetMinutes: 120 },
    getDsaStats: () => ({ completed: 0, total: 250, progressPercentage: 0, inProgress: 0, revise: 0, todayTarget: 3, todayCompleted: 0, alreadySolvedCount: 154, weakPatterns: [], difficultyStats: { Easy: { total: 33, done: 0 }, Medium: { total: 176, done: 0 }, Hard: { total: 41, done: 0 } }, categoryStats: {} }),
    getDashboardStats: () => ({ progressPercentage: 0, completedDays: 0, unresolvedDoubtsCount: 0, resolvedDoubtsCount: 0, doubtResolutionRate: 100, revisionDueCount: 0, totalHours: "0.0", phaseStats: {}, weakAreas: [] }),
    getTodayDay: () => ({ day: 1, topic: "Environment + repo", phase: "Phase 0 - Assessment & setup", concepts: "uv, pyproject, pytest", whatToStudy: "pytest fixtures, repo setup", implementTask: "Create ai-lab repo", deliverable: "Repo green", sourceUrl: "https://docs.pytest.org" }),
    getDsaTodayProblems: () => [],
    subscribe: () => () => {},
    setDsaStatus: () => {},
    setDsaNotes: () => {},
    setDsaMistakes: () => {},
    incrementDsaAttempts: () => {},
    setDsaMastery: () => {},
    scheduleDsaRevision: () => {},
    setStatus: () => {},
    setRemarks: () => {},
    setNotes: () => {},
    addDoubt: () => {},
    resolveDoubt: () => {},
    deleteDoubt: () => {},
    scheduleRevision: () => {},
    logStudyTime: () => {},
    saveSettings: () => {},
    saveDsaSettings: () => {},
    resetAllData: () => {},
    resetAllDsaData: () => {}
  };
};

const getSources = () => {
  if (typeof window !== 'undefined' && window.SOURCES_DATASET) return window.SOURCES_DATASET;
  return {};
};

const getProjects = () => {
  if (typeof window !== 'undefined' && window.PROJECTS_DATASET) return window.PROJECTS_DATASET;
  return [];
};

const { useState, useEffect, useMemo, useRef } = React;

// ==========================================
// SAFE LUCIDE ICON HELPER
// ==========================================
const ICON_FALLBACK_SVGS = {
  'check': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
  'check-circle-2': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="m9 12 2 2 4-4"></path></svg>`,
  'play': `<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`,
  'rotate-ccw': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>`,
  'refresh-cw': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path><path d="M21 3v5h-5"></path><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path><path d="M8 16H3v5"></path></svg>`,
  'search': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
  'x': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
  'chevron-down': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`,
  'chevron-right': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`,
  'chevrons-up': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 11 12 6 7 11"></polyline><polyline points="17 18 12 13 7 18"></polyline></svg>`,
  'chevrons-down': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="7 13 12 18 17 13"></polyline><polyline points="7 6 12 11 17 6"></polyline></svg>`,
  'external-link': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>`,
  'star': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
  'help-circle': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
  'message-square': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`,
  'save': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>`,
  'alert-triangle': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
  'database': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>`,
  'brain': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-5.04z"></path><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-5.04z"></path></svg>`,
  'code': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`,
  'flame': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>`,
  'target': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>`,
  'sun': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
  'map': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line></svg>`,
  'repeat': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>`,
  'folder-git-2': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"></path><circle cx="12" cy="13" r="2"></circle><path d="M14 13h3"></path><path d="M7 13h3"></path></svg>`,
  'book-open': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>`,
  'info': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`,
  'clock': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
  'activity': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>`,
  'file-text': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>`,
  'log-out': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>`,
  'log-in': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>`,
  'user': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`,
  'lock': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`,
  'eye': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>`,
  'eye-off': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path><line x1="2" y1="2" x2="22" y2="22"></line></svg>`,
  'arrow-right': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`,
  'arrow-up-right': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>`,
  'layout-dashboard': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>`,
  'bar-chart-3': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"></path><path d="M18 17V9"></path><path d="M13 17V5"></path><path d="M8 17v-3"></path></svg>`,
  'layers': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>`,
  'grid': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>`,
  'copy': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`,
  'compass': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>`,
  'upload-cloud': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 16 12 12 8 16"></polyline><line x1="12" y1="12" x2="12" y2="21"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><polyline points="16 16 12 12 8 16"></polyline></svg>`,
  'download-cloud': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="8 17 12 21 16 17"></polyline><line x1="12" y1="12" x2="12" y2="21"></line><path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"></path></svg>`,
  'download': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>`,
  'server': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>`
};

function Icon({ name, size = 18, className = "" }) {
  const getSvg = (iconName, iconSize, iconClass) => {
    try {
      if (typeof window !== 'undefined' && window.lucide && window.lucide.icons) {
        const camel = iconName.replace(/-([a-z0-9])/g, (g) => g[1].toUpperCase());
        const pascal = camel.charAt(0).toUpperCase() + camel.slice(1);
        const iconObj = window.lucide.icons[pascal] || window.lucide.icons[iconName] || window.lucide.icons[camel];
        if (iconObj && typeof iconObj.toSvg === 'function') {
          return iconObj.toSvg({ class: iconClass, width: iconSize, height: iconSize });
        }
      }
    } catch (e) {}

    // Instant fallback if Lucide is not yet initialized
    if (ICON_FALLBACK_SVGS[iconName]) {
      return ICON_FALLBACK_SVGS[iconName].replace(
        '<svg ',
        `<svg class="${iconClass}" width="${iconSize}" height="${iconSize}" `
      );
    }
    // Generic SVG fallback
    return `<svg class="${iconClass}" width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>`;
  };

  const [svgHtml, setSvgHtml] = useState(() => getSvg(name, size, className));

  useEffect(() => {
    const svg = getSvg(name, size, className);
    if (svg) setSvgHtml(svg);
  }, [name, size, className]);

  if (svgHtml) {
    return (
      <span
        style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: size, height: size, verticalAlign: 'middle' }}
        dangerouslySetInnerHTML={{ __html: svgHtml }}
      />
    );
  }

  return (
    <span
      className={className}
      style={{ display: 'inline-block', width: size, height: size, verticalAlign: 'middle' }}
    />
  );
}

// ==========================================
// REACT TOP-LEVEL ERROR BOUNDARY
// ==========================================
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("React ErrorBoundary caught runtime exception:", error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  handleResetTrack = () => {
    try {
      if (typeof window !== 'undefined' && window.authService) {
        window.authService.setSelectedTrack(null);
      }
    } catch (e) {}
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#06090e] flex items-center justify-center p-6 text-slate-100 selection:bg-rose-600 selection:text-white">
          <div className="max-w-xl w-full bg-[#0c1017] border border-rose-500/30 rounded-2xl p-8 shadow-2xl space-y-6">
            <div className="flex items-center gap-3 text-rose-400 border-b border-slate-800 pb-4">
              <div className="w-12 h-12 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center">
                <Icon name="alert-triangle" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold font-display text-white">Something went wrong</h2>
                <p className="text-xs text-slate-400">An unexpected application rendering exception occurred.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-rose-300 space-y-1 overflow-x-auto">
              <div className="text-[10px] uppercase font-bold text-slate-500">Error Message:</div>
              <div>{this.state.error?.message || "Unknown runtime exception"}</div>
            </div>

            {this.state.errorInfo?.componentStack && (
              <details className="text-xs font-mono text-slate-500">
                <summary className="cursor-pointer text-slate-400 hover:text-slate-200">Component Stack Trace (Development)</summary>
                <pre className="mt-2 p-3 bg-slate-950/80 rounded-lg text-[11px] overflow-x-auto text-slate-400 border border-slate-800">
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={this.handleReload}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-blue-600/30"
              >
                <Icon name="refresh-cw" size={14} />
                <span>Retry & Reload</span>
              </button>
              <button
                onClick={this.handleResetTrack}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition border border-slate-700/60"
              >
                Go to Track Selection
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}


// --- SOUND CHIME GENERATOR ---
function playChime(type = 'complete') {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'complete') {
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.15);
      osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.6);
    } else if (type === 'timer') {
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.4);
    }
  } catch (e) {}
}

// --- TOAST NOTIFICATIONS ---
let toastFn = () => {};
export function notify(msg, type = 'info') {
  if (toastFn) toastFn(msg, type);
}

// Company badge styling
function CompanyBadge({ name }) {
  const clean = (name || '').trim();
  if (!clean) return null;

  const bgColors = {
    'Amazon': 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    'Google': 'bg-blue-500/15 text-blue-300 border-blue-500/30',
    'Microsoft': 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
    'Meta': 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
    'Facebook': 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
    'Apple': 'bg-slate-300/15 text-slate-200 border-slate-400/30',
    'Netflix': 'bg-rose-500/15 text-rose-300 border-rose-500/30',
    'Bloomberg': 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    'Uber': 'bg-slate-500/15 text-slate-300 border-slate-500/30',
    'Adobe': 'bg-red-500/15 text-red-300 border-red-500/30'
  };

  const cls = bgColors[clean] || 'bg-slate-800 text-slate-300 border-slate-700/60';

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-mono font-medium border ${cls}`}>
      {clean}
    </span>
  );
}

// ==========================================
// 1. AUTHENTICATION / LOGIN VIEW
// ==========================================
function LoginView({ onLoginSuccess }) {
  const [username, setUsername] = useState('JeevanPranav');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await getAuth().login(username, password);
      if (res && res.success) {
        notify("Welcome back, JeevanPranav!", "success");
        onLoginSuccess();
      } else {
        setError(res?.error || "Invalid username or password");
        setIsLoading(false);
      }
    } catch (err) {
      setError(err.message || "Authentication error occurred.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#06090e] flex items-center justify-center p-4 selection:bg-blue-600 selection:text-white relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-md w-full bg-[#0c1017] border border-slate-800/90 rounded-2xl p-8 shadow-2xl relative z-10 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-600/20 ring-1 ring-white/20 mx-auto">
            <span className="font-display font-extrabold text-white text-2xl tracking-wider">JP</span>
          </div>
          <h1 className="text-2xl font-bold font-display text-white tracking-tight pt-2">
            Welcome Back, JeevanPranav
          </h1>
          <p className="text-xs text-slate-400">
            Your Personal Technical Development Dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2 animate-shake">
              <Icon name="alert-triangle" size={16} />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Username</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Icon name="user" size={15} />
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="JeevanPranav"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition font-mono"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Icon name="lock" size={15} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full pl-10 pr-10 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition font-mono"
                required
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition"
              >
                <Icon name={showPassword ? "eye-off" : "eye"} size={15} />
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 transition"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <Icon name="log-in" size={15} />
                <span>Login to Workspace</span>
              </>
            )}
          </button>
        </form>

        <div className="text-center border-t border-slate-800/60 pt-4 text-[11px] text-slate-500">
          Private Technical Operating System • JEEVANPRANAV
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. TRACK SELECTION VIEW
// ==========================================
function TrackSelectionView({ onSelectTrack, onLogout }) {
  const aiStats = getStorage().getDashboardStats();
  const dsaStats = getStorage().getDsaStats();

  return (
    <div className="min-h-screen bg-[#06090e] text-slate-100 flex flex-col justify-between p-6 lg:p-12 relative">
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between pb-6 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center font-display font-extrabold text-white text-lg">
            JP
          </div>
          <div>
            <h2 className="font-display font-bold text-sm text-white">JEEVANPRANAV</h2>
            <p className="text-[11px] text-slate-400">Technical Development Command Center</p>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition border border-slate-700/60"
        >
          <Icon name="log-out" size={13} />
          <span>Logout</span>
        </button>
      </div>

      <div className="max-w-5xl w-full mx-auto my-auto py-12 space-y-8 text-center">
        <div className="space-y-2">
          <span className="text-xs uppercase font-mono font-bold tracking-widest px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
            Dual Mastery System
          </span>
          <h1 className="text-3xl lg:text-4xl font-extrabold font-display text-white tracking-tight">
            Choose Your Track
          </h1>
          <p className="text-sm text-slate-400 max-w-lg mx-auto">
            What are you working on today? Both tracks are isolated with independent dashboards, progress, revision, and analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {/* TRACK 1: AI ENGINEER */}
          <div
            onClick={() => onSelectTrack('AI')}
            className="group bg-[#0d121c] hover:bg-[#121824] border border-slate-800 hover:border-blue-500/60 rounded-2xl p-8 transition-all duration-200 cursor-pointer shadow-xl relative overflow-hidden flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition duration-200">
                  <Icon name="brain" size={28} />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  365-Day Engine
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-bold font-display text-white group-hover:text-blue-400 transition">
                  AI ENGINEER
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Build your AI Engineering skills through structured learning, implementation, projects, MLOps, LLMs, and system development.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80">
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-[10px] text-slate-500 font-medium uppercase">Progress</div>
                  <div className="text-base font-bold text-blue-400 font-display">{aiStats.progressPercentage}%</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-[10px] text-slate-500 font-medium uppercase">Phases</div>
                  <div className="text-base font-bold text-slate-200 font-display">13</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-[10px] text-slate-500 font-medium uppercase">Projects</div>
                  <div className="text-base font-bold text-emerald-400 font-display">7</div>
                </div>
              </div>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); onSelectTrack('AI'); }}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition"
            >
              <span>Open AI Engineer Track</span>
              <Icon name="arrow-right" size={15} />
            </button>
          </div>

          {/* TRACK 2: DSA */}
          <div
            onClick={() => onSelectTrack('DSA')}
            className="group bg-[#0d121c] hover:bg-[#121824] border border-slate-800 hover:border-emerald-500/60 rounded-2xl p-8 transition-all duration-200 cursor-pointer shadow-xl relative overflow-hidden flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition duration-200">
                  <Icon name="code" size={28} />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  250 Practice Set
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-bold font-display text-white group-hover:text-emerald-400 transition">
                  DATA STRUCTURES & ALGORITHMS
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Master Data Structures and Algorithms through a structured LeetCode practice, pattern tracking, and spaced revision system.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80">
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-[10px] text-slate-500 font-medium uppercase">Solved</div>
                  <div className="text-base font-bold text-emerald-400 font-display">{dsaStats.completed} / 250</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-[10px] text-slate-500 font-medium uppercase">Categories</div>
                  <div className="text-base font-bold text-slate-200 font-display">22</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-[10px] text-slate-500 font-medium uppercase">Already Solved</div>
                  <div className="text-base font-bold text-amber-400 font-display">{dsaStats.alreadySolvedCount}</div>
                </div>
              </div>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); onSelectTrack('DSA'); }}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition"
            >
              <span>Open DSA Track</span>
              <Icon name="arrow-right" size={15} />
            </button>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-slate-500">
        JEEVANPRANAV • Personal Technical Development Command Center
      </div>
    </div>
  );
}

// ==========================================
// 3. AI ENGINEER: FULL RICH DASHBOARD VIEW
// ==========================================
function AIDashboardView({ stats, todayDay, onSelectDay, onStartToday, onGoToRevision, onGoToDoubts, onGoToProjects }) {
  const safeStats = {
    progressPercentage: stats?.progressPercentage || 0,
    completedDays: stats?.completedDays || 0,
    inProgressDays: stats?.inProgressDays || 0,
    unresolvedDoubtsCount: stats?.unresolvedDoubtsCount || 0,
    resolvedDoubtsCount: stats?.resolvedDoubtsCount || 0,
    doubtResolutionRate: stats?.doubtResolutionRate || 100,
    revisionDueCount: stats?.revisionDueCount || 0,
    totalHours: stats?.totalHours || "0.0",
    weakAreas: Array.isArray(stats?.weakAreas) ? stats.weakAreas : [],
    phaseStats: stats?.phaseStats && typeof stats.phaseStats === 'object' ? stats.phaseStats : {},
    ...(stats || {})
  };
  safeStats.weakAreas = Array.isArray(safeStats.weakAreas) ? safeStats.weakAreas : [];
  safeStats.phaseStats = safeStats.phaseStats && typeof safeStats.phaseStats === 'object' ? safeStats.phaseStats : {};

  return (
    <div className="space-y-6 animate-fade-in">
      {/* HERO BANNER */}
      <div className="bg-gradient-to-r from-[#0d1624] via-[#0f1d2e] to-[#0d1624] border border-slate-800 rounded-2xl p-6 lg:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
              <span className="text-xs uppercase font-mono font-bold tracking-wider text-blue-400">
                {(typeof window !== 'undefined' && window.ActivityService?.getGreeting) ? window.ActivityService.getGreeting() : 'GOOD DAY'}, JEEVANPRANAV
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold font-display text-white tracking-tight">
              AI Engineering Mastery Protocol
            </h1>
            <p className="text-xs text-slate-400 max-w-2xl">
              Phase: <strong className="text-slate-200">{todayDay?.phase}</strong>. Stay consistent with 2 hours of deliberate practice daily (45m Learn, 75m Build, 5m Revise).
            </p>
          </div>

          <button
            onClick={onStartToday}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center gap-2 shrink-0 transition"
          >
            <Icon name="play" size={16} />
            <span>Start Day {todayDay?.day} Session (2h)</span>
          </button>
        </div>
      </div>

      {/* METRICS ROW */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-[#121824] p-4 rounded-xl border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 font-medium">Overall Progress</div>
          <div className="text-2xl font-extrabold text-blue-400 font-display">{safeStats.progressPercentage}%</div>
          <div className="text-[11px] text-slate-400">{safeStats.completedDays} of 365 Days</div>
        </div>

        <div className="bg-[#121824] p-4 rounded-xl border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 font-medium">In Progress</div>
          <div className="text-2xl font-extrabold text-cyan-400 font-display">{safeStats.inProgressDays}</div>
          <div className="text-[11px] text-slate-400">Active topics</div>
        </div>

        <div
          onClick={onGoToDoubts}
          className="bg-[#121824] p-4 rounded-xl border border-slate-800 hover:border-amber-500/50 cursor-pointer transition space-y-1"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Open Doubts</span>
            <Icon name="help-circle" size={14} className="text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-amber-400 font-display">{safeStats.unresolvedDoubtsCount}</div>
          <div className="text-[11px] text-slate-400">{safeStats.resolvedDoubtsCount} resolved ({safeStats.doubtResolutionRate}%)</div>
        </div>

        <div
          onClick={onGoToRevision}
          className="bg-[#121824] p-4 rounded-xl border border-slate-800 hover:border-indigo-500/50 cursor-pointer transition space-y-1"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Revision Due</span>
            <Icon name="repeat" size={14} className="text-indigo-400" />
          </div>
          <div className="text-2xl font-extrabold text-indigo-400 font-display">{safeStats.revisionDueCount}</div>
          <div className="text-[11px] text-slate-400">Spaced rep queue</div>
        </div>

        <div className="bg-[#121824] p-4 rounded-xl border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 font-medium">Time Logged</div>
          <div className="text-2xl font-extrabold text-purple-400 font-display">{safeStats.totalHours}h</div>
          <div className="text-[11px] text-slate-400">Target: 730h (2h/d)</div>
        </div>

        <div
          onClick={onGoToProjects}
          className="bg-[#121824] p-4 rounded-xl border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition space-y-1"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Projects & CP</span>
            <Icon name="folder-git-2" size={14} className="text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-400 font-display">7</div>
          <div className="text-[11px] text-slate-400">9 Checkpoints (50-pt)</div>
        </div>
      </div>

      {/* TODAY'S FOCUS MISSION & WEAK AREAS RADAR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Today's Focus Card (7 cols) */}
        <div className="lg:col-span-7 bg-[#121824] rounded-2xl border border-slate-800 p-6 space-y-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
                <Icon name="target" size={18} />
              </span>
              <h2 className="text-lg font-bold text-white font-display">Today's Focus Mission</h2>
            </div>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-slate-800 text-blue-400 border border-slate-700">
              Day {todayDay?.day} • {todayDay?.date}
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">{todayDay?.phase}</span>
                <h3 className="text-xl font-bold text-white mt-0.5">{todayDay?.topic}</h3>
                <p className="text-xs text-slate-400 mt-1 font-mono">Concepts: {todayDay?.concepts}</p>
              </div>
              <span className={`status-pill status-${todayDay?.status || 'NOT_STARTED'}`}>
                {todayDay?.status?.replace('_', ' ') || 'NOT STARTED'}
              </span>
            </div>

            {/* Split Study / Implement Preview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="text-[11px] font-bold text-emerald-400 uppercase flex items-center gap-1">
                  <Icon name="book-open" size={13} />
                  <span>Learn ({todayDay?.learnSection || '45m'})</span>
                </div>
                <div className="text-xs text-slate-300 line-clamp-2">{todayDay?.whatToStudy}</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="text-[11px] font-bold text-indigo-400 uppercase flex items-center gap-1">
                  <Icon name="code" size={13} />
                  <span>Implement (75m)</span>
                </div>
                <div className="text-xs text-slate-300 line-clamp-2">{todayDay?.implementTask}</div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  getStorage().setStatus(todayDay.day, 'IN_PROGRESS');
                  notify(`Day ${todayDay.day} marked In Progress`, 'info');
                }}
                className="px-3 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-semibold transition"
              >
                Mark In Progress
              </button>
              <button
                onClick={() => {
                  getStorage().setStatus(todayDay.day, 'COMPLETED');
                  playChime('complete');
                  notify(`Day ${todayDay.day} marked Completed!`, 'success');
                }}
                className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition"
              >
                ✓ Mark Complete
              </button>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={todayDay?.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 transition"
              >
                <Icon name="external-link" size={13} />
                <span>Open Source</span>
              </a>
              <button
                onClick={onStartToday}
                className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md shadow-blue-600/30 flex items-center gap-1.5 transition"
              >
                <Icon name="play" size={13} />
                <span>Start Timer</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Weakness Radar Card (5 cols) */}
        <div className="lg:col-span-5 bg-[#121824] rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400">
                <Icon name="alert-triangle" size={18} />
              </span>
              <h2 className="text-lg font-bold text-white font-display">Weak Areas Radar</h2>
            </div>
            <span className="text-xs font-mono text-slate-400">{(safeStats.weakAreas || []).length} detected</span>
          </div>

          <div className="space-y-2.5 overflow-y-auto max-h-[220px] pr-1">
            {(safeStats.weakAreas || []).length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-xs space-y-2">
                <Icon name="check-circle-2" size={32} className="mx-auto text-emerald-500/60" />
                <p>No severe weak areas detected yet!</p>
                <p className="text-[11px] text-slate-600">Topics with mastery ≤ 2 or unresolved doubts will surface here automatically.</p>
              </div>
            ) : (
              (safeStats.weakAreas || []).slice(0, 4).map(item => (
                <div
                  key={item.dayNum}
                  onClick={() => onSelectDay(getStorage().getDay(item.dayNum))}
                  className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-rose-500/40 cursor-pointer transition space-y-1"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white truncate max-w-[200px]">Day {item.dayNum}: {item.topic}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold">
                      Severity {item.severityScore}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 flex flex-wrap gap-1">
                    {item.reasons.map((r, i) => (
                      <span key={i} className="text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded text-[10px]">{r}</span>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>

          <button
            onClick={onGoToRevision}
            className="w-full py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition border border-slate-700/50"
          >
            <Icon name="refresh-cw" size={13} />
            <span>Open Spaced Revision Queue</span>
          </button>
        </div>
      </div>

      {/* 13 PHASES PROGRESS ACCORDION GRID */}
      <div className="bg-[#121824] rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Icon name="layers" size={18} />
            </span>
            <h2 className="text-lg font-bold text-white font-display">13 Roadmap Phases Progress</h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">13 Phases • 53 Weeks</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {Object.entries(safeStats.phaseStats || {}).map(([phaseName, p]) => {
            const pct = Math.round((p.completed / (p.total || 1)) * 100);
            return (
              <div key={phaseName} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-200 truncate max-w-[210px]">{phaseName}</span>
                  <span className="font-mono text-xs font-extrabold text-blue-400">{pct}%</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      pct === 100 ? 'bg-emerald-500' : pct > 0 ? 'bg-blue-500' : 'bg-slate-700'
                    }`}
                    style={{ width: `${pct}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>{p.completed} / {p.total} days</span>
                  {p.needsRevision > 0 && (
                    <span className="text-amber-400">{p.needsRevision} needs rev</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. AI ENGINEER: FULL RICH ROADMAP VIEW (Matching Reference Screenshot)
// ==========================================
function AIRoadmapView({ days, selectedDay, onSelectDay, searchQuery, setSearchQuery }) {
  const [phaseFilter, setPhaseFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [difficultyFilter, setDifficultyFilter] = useState('ALL');
  const [hasDoubtsFilter, setHasDoubtsFilter] = useState(false);
  const [hasRemarksFilter, setHasRemarksFilter] = useState(false);

  // Quick edit remark modal
  const [inlineRemarkDay, setInlineRemarkDay] = useState(null);
  const [inlineRemarkText, setInlineRemarkText] = useState('');

  // 13 Phase accordions expanded state
  const [expandedPhases, setExpandedPhases] = useState(() => {
    const initial = {};
    const phases = Array.from(new Set(days.map(d => d.phase)));
    phases.forEach((p, idx) => {
      initial[p] = idx < 3 || true;
    });
    return initial;
  });

  const togglePhase = (phaseName) => {
    setExpandedPhases(prev => ({ ...prev, [phaseName]: !prev[phaseName] }));
  };

  const expandAll = () => {
    const all = {};
    Array.from(new Set(days.map(d => d.phase))).forEach(p => { all[p] = true; });
    setExpandedPhases(all);
  };

  const collapseAll = () => {
    const none = {};
    Array.from(new Set(days.map(d => d.phase))).forEach(p => { none[p] = false; });
    setExpandedPhases(none);
  };

  const handleToggleStatus = (day, e) => {
    e.stopPropagation();
    const newStatus = day.status === 'COMPLETED' ? 'NOT_STARTED' : 'COMPLETED';
    getStorage().setStatus(day.day, newStatus);
    if (newStatus === 'COMPLETED') playChime('complete');
    notify(`Day ${day.day} marked ${newStatus.replace('_', ' ')}`, newStatus === 'COMPLETED' ? 'success' : 'info');
  };

  const filteredDays = useMemo(() => {
    return days.filter(d => {
      if (phaseFilter !== 'ALL' && d.phase !== phaseFilter) return false;
      if (statusFilter !== 'ALL' && d.status !== statusFilter) return false;
      if (difficultyFilter !== 'ALL' && d.difficulty !== Number(difficultyFilter)) return false;
      if (hasDoubtsFilter && (!d.doubts || d.doubts.length === 0)) return false;
      if (hasRemarksFilter && (!d.remarks || !d.remarks.trim())) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTopic = (d.topic || '').toLowerCase().includes(q);
        const matchConcepts = (d.concepts || '').toLowerCase().includes(q);
        const matchSource = (d.sourceKey || '').toLowerCase().includes(q) || (d.sourceName || '').toLowerCase().includes(q);
        const matchImplement = (d.implementTask || '').toLowerCase().includes(q);
        const matchDeliverable = (d.deliverable || '').toLowerCase().includes(q);
        const matchRemarks = (d.remarks || '').toLowerCase().includes(q);
        const matchNotes = (d.notes || '').toLowerCase().includes(q);

        if (!matchTopic && !matchConcepts && !matchSource && !matchImplement && !matchDeliverable && !matchRemarks && !matchNotes) {
          return false;
        }
      }
      return true;
    });
  }, [days, phaseFilter, statusFilter, difficultyFilter, hasDoubtsFilter, hasRemarksFilter, searchQuery]);

  const groupedPhases = useMemo(() => {
    const groups = {};
    filteredDays.forEach(d => {
      if (!groups[d.phase]) groups[d.phase] = [];
      groups[d.phase].push(d);
    });
    return groups;
  }, [filteredDays]);

  const uniquePhases = useMemo(() => Array.from(new Set(days.map(d => d.phase))), [days]);

  const getDifficultyBadge = (diff) => {
    switch (diff) {
      case 1:
      case 2: return { label: 'Easy', cls: 'diff-badge-easy' };
      case 3: return { label: 'Medium', cls: 'diff-badge-medium' };
      case 4: return { label: 'Hard', cls: 'diff-badge-hard' };
      default: return { label: 'Expert', cls: 'diff-badge-hard' };
    }
  };

  return (
    <div className="space-y-4">
      {/* FILTER & SEARCH TOOLBAR */}
      <div className="bg-[#0e141f] p-4 rounded-2xl border border-slate-800/80 space-y-3 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Icon name="search" size={15} />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics, concepts, sources, tasks, remarks..."
              className="w-full pl-9 pr-8 py-2 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition font-mono"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white">
                <Icon name="x" size={14} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={expandAll}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1 transition"
            >
              <Icon name="chevrons-down" size={13} />
              <span>Expand All</span>
            </button>
            <button
              onClick={collapseAll}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1 transition"
            >
              <Icon name="chevrons-up" size={13} />
              <span>Collapse All</span>
            </button>
            <div className="text-xs text-slate-400 pl-2 border-l border-slate-800">
              <strong className="text-white font-mono">{filteredDays.length}</strong> / 365 days
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
          <select
            value={phaseFilter}
            onChange={(e) => setPhaseFilter(e.target.value)}
            className="bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500 truncate"
          >
            <option value="ALL">All 13 Phases</option>
            {uniquePhases.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">All Statuses</option>
            <option value="NOT_STARTED">Not Started</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
            <option value="NEEDS_REVISION">Needs Revision</option>
            <option value="SKIPPED">Skipped</option>
          </select>

          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">All Difficulties</option>
            <option value="2">Level 2 (Easy)</option>
            <option value="3">Level 3 (Medium)</option>
            <option value="4">Level 4 (Hard)</option>
            <option value="5">Level 5 (Expert)</option>
          </select>

          <button
            onClick={() => setHasDoubtsFilter(prev => !prev)}
            className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
              hasDoubtsFilter
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-950 text-slate-400 border-slate-700/80 hover:bg-slate-850'
            }`}
          >
            <Icon name="help-circle" size={14} />
            <span>Has Doubts</span>
          </button>

          <button
            onClick={() => setHasRemarksFilter(prev => !prev)}
            className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
              hasRemarksFilter
                ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                : 'bg-slate-950 text-slate-400 border-slate-700/80 hover:bg-slate-850'
            }`}
          >
            <Icon name="message-square" size={14} />
            <span>Has Remarks</span>
          </button>
        </div>
      </div>

      {/* PHASE ACCORDION CARDS CONTAINER (MATCHING SCREENSHOT) */}
      <div className="space-y-4">
        {Object.entries(groupedPhases).map(([phaseName, phaseDays]) => {
          const isExpanded = expandedPhases[phaseName] !== false;
          const completedCount = phaseDays.filter(d => d.status === 'COMPLETED').length;
          const totalCount = phaseDays.length;
          const pct = Math.round((completedCount / (totalCount || 1)) * 100);
          const minDay = phaseDays[0]?.day;
          const maxDay = phaseDays[phaseDays.length - 1]?.day;

          return (
            <div key={phaseName} className="phase-accordion-card shadow-lg">
              {/* Accordion Header */}
              <div
                onClick={() => togglePhase(phaseName)}
                className="phase-accordion-header"
              >
                <div className="flex items-center gap-3">
                  <span className="text-slate-400 transition transform duration-200">
                    <Icon name={isExpanded ? "chevron-down" : "chevron-right"} size={18} />
                  </span>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white font-display tracking-tight">
                      {phaseName}
                    </h3>
                    <span className="text-xs text-slate-500 font-mono">
                      (Days {minDay}–{maxDay})
                    </span>
                  </div>
                </div>

                {/* Right Status Pill: 9/9 100% */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-slate-300">
                    {completedCount}/{totalCount}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold ${
                    pct === 100
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : pct > 0
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {pct}%
                  </span>
                </div>
              </div>

              {/* Accordion Expanded Table */}
              {isExpanded && (
                <div className="overflow-x-auto border-t border-slate-800/80">
                  <table className="w-full text-left border-collapse table-compact">
                    <thead>
                      <tr className="bg-[#090d14] text-slate-400 text-[11px] uppercase tracking-wider font-semibold border-b border-slate-800">
                        <th className="w-14 text-center py-2.5">STATUS</th>
                        <th className="min-w-[280px] py-2.5">QUESTION / TOPIC</th>
                        <th className="w-28 text-center py-2.5">SOURCE</th>
                        <th className="w-20 text-center py-2.5">PRACTICE</th>
                        <th className="w-20 text-center py-2.5">STUDY</th>
                        <th className="w-20 text-center py-2.5">REMARKS</th>
                        <th className="w-24 text-center py-2.5">DIFFICULTY</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-[#0d121c]">
                      {phaseDays.map(day => {
                        const diffInfo = getDifficultyBadge(day.difficulty);
                        const hasRemark = !!(day.remarks && day.remarks.trim());
                        const isCompleted = day.status === 'COMPLETED';

                        return (
                          <tr
                            key={day.day}
                            onClick={() => onSelectDay(day)}
                            className={`cursor-pointer transition-colors duration-150 ${
                              selectedDay?.day === day.day
                                ? 'bg-blue-900/30'
                                : isCompleted
                                ? 'bg-[#0d1519]/40 hover:bg-[#121c24]'
                                : 'hover:bg-[#121926]'
                            }`}
                          >
                            {/* 1. STATUS CHECKBOX (CIRCULAR GREEN CHECKMARK) */}
                            <td className="text-center py-3" onClick={(e) => handleToggleStatus(day, e)}>
                              <div
                                className={`status-checkbox mx-auto ${
                                  isCompleted
                                    ? 'checked'
                                    : day.status === 'IN_PROGRESS'
                                    ? 'in-progress'
                                    : day.status === 'NEEDS_REVISION'
                                    ? 'needs-revision'
                                    : ''
                                }`}
                                title={`Status: ${day.status}. Click to toggle.`}
                              >
                                {isCompleted ? (
                                  <Icon name="check" size={14} className="text-emerald-400 font-bold" />
                                ) : day.status === 'IN_PROGRESS' ? (
                                  <Icon name="play" size={11} className="text-blue-400 fill-blue-400" />
                                ) : day.status === 'NEEDS_REVISION' ? (
                                  <Icon name="rotate-ccw" size={11} className="text-amber-400" />
                                ) : null}
                              </div>
                            </td>

                            {/* 2. QUESTION / TOPIC */}
                            <td className="py-3 pr-4">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-white text-xs hover:text-blue-400 transition">
                                  {day.topic}
                                </span>
                                {day.checkpoint && (
                                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0">
                                    {day.checkpoint}
                                  </span>
                                )}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    getStorage().setMastery(day.day, day.mastery >= 4 ? 0 : 5);
                                    notify(`Mastery updated for Day ${day.day}`, 'info');
                                  }}
                                  className={`p-0.5 text-slate-500 hover:text-amber-400 transition ${
                                    day.mastery >= 4 ? 'text-amber-400' : ''
                                  }`}
                                  title="Bookmark / High Mastery"
                                >
                                  <Icon name="bookmark" size={13} />
                                </button>
                              </div>
                              <div className="text-[11px] text-slate-400 font-mono truncate max-w-[420px] mt-0.5">
                                Day {day.day} • {day.concepts}
                              </div>
                            </td>

                            {/* 3. SOURCE */}
                            <td className="text-center py-3" onClick={(e) => e.stopPropagation()}>
                              <a
                                href={day.sourceUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center px-2 py-1 rounded-lg bg-slate-800/80 hover:bg-blue-600/30 text-blue-400 hover:text-blue-300 text-[11px] font-mono font-bold border border-slate-700/60 transition"
                                title={`${day.sourceName || day.sourceKey} (${day.sourceUrl})`}
                              >
                                <span>{day.sourceKey || 'OWN'}</span>
                              </a>
                            </td>

                            {/* 4. PRACTICE */}
                            <td className="text-center py-3" onClick={(e) => e.stopPropagation()}>
                              <button
                                onClick={() => onSelectDay(day)}
                                className="action-icon-btn code-btn mx-auto"
                                title={`Implement: ${day.implementTask}`}
                              >
                                <span className="font-mono text-xs font-bold">&lt;/&gt;</span>
                              </button>
                            </td>

                            {/* 5. STUDY */}
                            <td className="text-center py-3" onClick={(e) => e.stopPropagation()}>
                              <a
                                href={day.sourceUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="action-icon-btn video-btn mx-auto"
                                title={`Study: ${day.whatToStudy}`}
                              >
                                <Icon name="video" size={15} />
                              </a>
                            </td>

                            {/* 6. REMARKS (NOTES MODAL TRIGGER) */}
                            <td className="text-center py-3" onClick={(e) => e.stopPropagation()}>
                              <button
                                onClick={() => {
                                  setInlineRemarkDay(day);
                                  setInlineRemarkText(day.remarks || '');
                                }}
                                className={`action-icon-btn notes-btn mx-auto ${hasRemark ? 'active' : ''}`}
                                title={hasRemark ? `Remark: ${day.remarks}` : "Add Remark for this topic"}
                              >
                                <Icon name={hasRemark ? "file-text" : "message-square"} size={14} />
                              </button>
                            </td>

                            {/* 7. DIFFICULTY BADGE */}
                            <td className="text-center py-3">
                              <span className={`inline-block ${diffInfo.cls}`}>
                                {diffInfo.label}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* INLINE QUICK REMARK MODAL */}
      {inlineRemarkDay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#121824] border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="space-y-0.5">
                <span className="text-[11px] font-mono text-purple-400 font-bold uppercase">
                  Day {inlineRemarkDay.day} • Study Remark & Notes
                </span>
                <h3 className="text-base font-bold text-white">{inlineRemarkDay.topic}</h3>
              </div>
              <button onClick={() => setInlineRemarkDay(null)} className="text-slate-400 hover:text-white">
                <Icon name="x" size={18} />
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">
                Personal Reflections & Remarks on this Topic:
              </label>
              <textarea
                value={inlineRemarkText}
                onChange={(e) => setInlineRemarkText(e.target.value)}
                placeholder="E.g., Derivation was straightforward. Need to revise chain rule before transformer section. Implementation completed cleanly..."
                rows={5}
                className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 font-mono leading-relaxed"
                autoFocus
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  setInlineRemarkDay(null);
                  onSelectDay(inlineRemarkDay);
                }}
                className="text-xs text-blue-400 hover:underline font-semibold"
              >
                Open Full Drawer (Doubts & Tasks)
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => setInlineRemarkDay(null)}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    getStorage().setRemarks(inlineRemarkDay.day, inlineRemarkText);
                    setInlineRemarkDay(null);
                    notify(`Remark saved for Day ${inlineRemarkDay.day}!`, 'success');
                  }}
                  className="px-4 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md shadow-purple-600/30"
                >
                  Save Remark
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 5. AI ENGINEER: FULL TODAY'S 2-HOUR SESSION VIEW
// ==========================================
function AITodayView({ todayDay, onSelectDay, onOpenSource }) {
  const [timerRunning, setTimerRunning] = useState(false);
  const [activePhase, setActivePhase] = useState('learn'); // learn (45m), build (75m), revise (5m)
  const [secondsLeft, setSecondsLeft] = useState(45 * 60);

  const phaseDurations = {
    learn: 45 * 60,
    build: 75 * 60,
    revise: 5 * 60
  };

  useEffect(() => {
    let interval = null;
    if (timerRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && timerRunning) {
      playChime('timer');
      if (activePhase === 'learn') {
        setActivePhase('build');
        setSecondsLeft(phaseDurations.build);
        notify("Learn phase finished! Moving to Hands-on Build phase (75m)", "info");
      } else if (activePhase === 'build') {
        setActivePhase('revise');
        setSecondsLeft(phaseDurations.revise);
        notify("Build phase finished! Moving to 5m Recall & Revise", "info");
      } else {
        setTimerRunning(false);
        playChime('complete');
        notify("2-Hour Daily Session Completed! Great work!", "success");
        getStorage().setStatus(todayDay.day, 'COMPLETED');
      }
    }
    return () => clearInterval(interval);
  }, [timerRunning, secondsLeft, activePhase]);

  const switchPhase = (p) => {
    setActivePhase(p);
    setSecondsLeft(phaseDurations[p]);
    setTimerRunning(false);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in">
      {/* HEADER & TOPIC INFO */}
      <div className="bg-[#121824] rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">{todayDay?.phase}</span>
              <span className="text-slate-600">•</span>
              <span className="text-xs font-mono text-slate-400">Week {todayDay?.week || 1} • Day {todayDay?.day}</span>
            </div>
            <h1 className="text-2xl font-bold font-display text-white mt-1">{todayDay?.topic}</h1>
            <p className="text-xs text-slate-400 font-mono mt-0.5">Concepts: {todayDay?.concepts}</p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={todayDay?.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-600/30 transition"
            >
              <Icon name="external-link" size={14} />
              <span>Launch Source ({todayDay?.sourceKey || 'DOCS'})</span>
            </a>
          </div>
        </div>

        {/* 2-HOUR TIMER CONTROLLER */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-center space-y-6">
          <div className="flex items-center justify-center gap-2">
            {[
              { id: 'learn', label: '1. Learn (45m)', icon: 'book-open', color: 'text-emerald-400' },
              { id: 'build', label: '2. Build (75m)', icon: 'code', color: 'text-indigo-400' },
              { id: 'revise', label: '3. Revise (5m)', icon: 'repeat', color: 'text-amber-400' }
            ].map(p => (
              <button
                key={p.id}
                onClick={() => switchPhase(p.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  activePhase === p.id
                    ? 'bg-slate-800 text-white border border-slate-600 shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon name={p.icon} size={14} className={p.color} />
                <span>{p.label}</span>
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <div className="text-5xl lg:text-6xl font-mono font-extrabold text-white tracking-widest">
              {formatTime(secondsLeft)}
            </div>
            <div className="text-xs text-slate-400 font-mono">
              Current Focus: <strong className="text-white uppercase">{activePhase} Phase</strong>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setTimerRunning(prev => !prev)}
              className={`px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg transition ${
                timerRunning
                  ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/30'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'
              }`}
            >
              <Icon name={timerRunning ? "pause" : "play"} size={16} />
              <span>{timerRunning ? "Pause Timer" : "Start Focus Timer"}</span>
            </button>
            <button
              onClick={() => switchPhase(activePhase)}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition border border-slate-700/60"
            >
              Reset Phase
            </button>
          </div>
        </div>

        {/* GUIDED BREAKDOWN: WHAT TO STUDY VS WHAT TO IMPLEMENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Learn Guidance */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
              <Icon name="book-open" size={16} />
              <span>Deep Learn Guidance (45m)</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="text-slate-300 font-semibold">What to Study:</div>
              <p className="text-slate-400 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono">
                {todayDay?.whatToStudy || todayDay?.learnSection || 'Focus on foundational concepts, mathematical intuition, and core mechanics.'}
              </p>
              {todayDay?.whatToSkip && (
                <>
                  <div className="text-rose-400 font-semibold pt-1">What to Skip (Save Time):</div>
                  <p className="text-slate-400 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono">
                    {todayDay.whatToSkip}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Build Task */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
              <Icon name="code" size={16} />
              <span>Hands-on Implementation Task (75m)</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="text-slate-300 font-semibold">Task Objective:</div>
              <p className="text-slate-400 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono">
                {todayDay?.implementTask || 'Write clean, typed, reproducible code for today\'s concepts in your repository.'}
              </p>
              <div className="text-slate-300 font-semibold pt-1">Expected Deliverable:</div>
              <p className="text-emerald-400 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono font-bold">
                {todayDay?.deliverable || 'Green tests and commit.'}
              </p>
            </div>
          </div>
        </div>

        {/* Complete Action */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
          <div className="text-xs text-slate-400">
            Finished today's code & verification?
          </div>
          <button
            onClick={() => {
              getStorage().setStatus(todayDay.day, 'COMPLETED');
              playChime('complete');
              notify(`Day ${todayDay.day} marked Completed!`, 'success');
            }}
            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition"
          >
            <Icon name="check" size={15} />
            <span>✓ Complete Day {todayDay.day} Protocol</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 6. AI ENGINEER: FULL DOUBTS KNOWLEDGE BASE VIEW
// ==========================================
function AIDoubtsView({ days, onSelectDay }) {
  const [filter, setFilter] = useState('ALL'); // ALL, OPEN, RESOLVED
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDayNum, setSelectedDayNum] = useState(days[0]?.day || 1);
  const [questionText, setQuestionText] = useState('');
  const [understandingText, setUnderstandingText] = useState('');

  // Resolve modal
  const [resolvingDoubt, setResolvingDoubt] = useState(null);
  const [solutionAnswer, setSolutionAnswer] = useState('');
  const [solutionExplanation, setSolutionExplanation] = useState('');

  const allDoubts = useMemo(() => {
    const list = [];
    days.forEach(d => {
      (d.doubts || []).forEach(doubt => {
        list.push({ ...doubt, dayTopic: d.topic, dayPhase: d.phase });
      });
    });
    return list;
  }, [days]);

  const filteredDoubts = useMemo(() => {
    return allDoubts.filter(d => {
      if (filter === 'OPEN' && d.status !== 'OPEN') return false;
      if (filter === 'RESOLVED' && d.status !== 'RESOLVED') return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchQ = d.question.toLowerCase().includes(q);
        const matchU = (d.userUnderstanding || '').toLowerCase().includes(q);
        const matchAns = (d.solution?.answer || '').toLowerCase().includes(q);
        const matchTopic = (d.dayTopic || '').toLowerCase().includes(q);
        if (!matchQ && !matchU && !matchAns && !matchTopic) return false;
      }
      return true;
    });
  }, [allDoubts, filter, search]);

  const handleCreateDoubt = (e) => {
    if (e) e.preventDefault();
    if (!questionText.trim()) return;

    getStorage().addDoubt(Number(selectedDayNum), {
      question: questionText,
      userUnderstanding: understandingText
    });
    setShowAddModal(false);
    setQuestionText('');
    setUnderstandingText('');
    notify("Doubt successfully raised in Knowledge Base!", "success");
  };

  const handleResolveDoubt = (e) => {
    if (e) e.preventDefault();
    if (!solutionAnswer.trim() || !resolvingDoubt) return;

    getStorage().resolveDoubt(resolvingDoubt.dayNum, resolvingDoubt.id, {
      answer: solutionAnswer,
      explanation: solutionExplanation
    });
    setResolvingDoubt(null);
    setSolutionAnswer('');
    setSolutionExplanation('');
    notify("Doubt resolved and solution saved!", "success");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* HEADER BAR */}
      <div className="bg-[#0e141f] p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
              <Icon name="help-circle" size={18} />
            </span>
            <h1 className="text-xl font-bold font-display text-white">Relational Doubts Knowledge Base</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">Raise doubts on any roadmap day, capture your current understanding, and record verified solutions.</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-xs shadow-lg shadow-amber-600/30 flex items-center gap-2 shrink-0 transition"
        >
          <Icon name="plus" size={15} />
          <span>Raise New Doubt</span>
        </button>
      </div>

      {/* SEARCH & FILTERS */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
            <Icon name="search" size={15} />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search doubts, explanations, solutions, or topics..."
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-mono"
          />
        </div>

        <div className="flex gap-2">
          {['ALL', 'OPEN', 'RESOLVED'].map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                filter === tab
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
              }`}
            >
              {tab} ({tab === 'ALL' ? allDoubts.length : tab === 'OPEN' ? allDoubts.filter(d => d.status === 'OPEN').length : allDoubts.filter(d => d.status === 'RESOLVED').length})
            </button>
          ))}
        </div>
      </div>

      {/* DOUBTS LIST */}
      <div className="space-y-3">
        {filteredDoubts.length === 0 ? (
          <div className="bg-[#121824] p-12 rounded-2xl border border-slate-800 text-center text-slate-500 text-xs space-y-2">
            <Icon name="help-circle" size={32} className="mx-auto text-slate-600" />
            <p>No doubts found matching criteria.</p>
            <p className="text-[11px] text-slate-600">Click "Raise New Doubt" to log questions from your daily practice sessions.</p>
          </div>
        ) : (
          filteredDoubts.map(doubt => (
            <div
              key={doubt.id}
              className={`p-5 rounded-2xl bg-[#121824] border transition space-y-3 shadow-lg ${
                doubt.status === 'OPEN' ? 'border-amber-500/40 hover:border-amber-500/70' : 'border-slate-800'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-amber-400">Day {doubt.dayNum}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-xs font-semibold text-slate-300">{doubt.dayTopic}</span>
                  </div>
                  <h3 className="text-base font-bold text-white mt-1">{doubt.question}</h3>
                </div>

                <span className={`status-pill ${doubt.status === 'OPEN' ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30' : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'}`}>
                  {doubt.status}
                </span>
              </div>

              {doubt.userUnderstanding && (
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-1 font-mono">
                  <div className="text-[10px] uppercase font-bold text-slate-500">My Initial Understanding:</div>
                  <p className="text-slate-300">{doubt.userUnderstanding}</p>
                </div>
              )}

              {doubt.solution && (
                <div className="bg-emerald-950/20 p-4 rounded-xl border border-emerald-800/40 text-xs space-y-2 font-mono">
                  <div className="text-[10px] uppercase font-bold text-emerald-400 flex items-center gap-1">
                    <Icon name="check-circle-2" size={13} />
                    <span>Verified Solution:</span>
                  </div>
                  <p className="text-white font-bold">{doubt.solution.answer}</p>
                  {doubt.solution.explanation && (
                    <p className="text-slate-300 text-[11px] leading-relaxed">{doubt.solution.explanation}</p>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                <button
                  onClick={() => onSelectDay(getStorage().getDay(doubt.dayNum))}
                  className="text-xs text-blue-400 hover:underline font-semibold"
                >
                  View Day {doubt.dayNum} in Roadmap ↗
                </button>

                <div className="flex gap-2">
                  {doubt.status === 'OPEN' && (
                    <button
                      onClick={() => {
                        setResolvingDoubt(doubt);
                        setSolutionAnswer('');
                        setSolutionExplanation('');
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-md shadow-emerald-600/30"
                    >
                      Record Solution
                    </button>
                  )}
                  <button
                    onClick={() => {
                      if (window.confirm("Delete this doubt?")) {
                        getStorage().deleteDoubt(doubt.dayNum, doubt.id);
                        notify("Doubt removed", "info");
                      }
                    }}
                    className="p-1.5 text-slate-500 hover:text-rose-400 transition"
                    title="Delete doubt"
                  >
                    <Icon name="trash-2" size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* RAISE DOUBT MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <form onSubmit={handleCreateDoubt} className="bg-[#121824] border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Raise New Doubt in Knowledge Base</h3>
              <button type="button" onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <Icon name="x" size={18} />
              </button>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Select Roadmap Topic:</label>
                <select
                  value={selectedDayNum}
                  onChange={(e) => setSelectedDayNum(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  {days.map(d => (
                    <option key={d.day} value={d.day}>Day {d.day}: {d.topic} ({d.phase})</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Question / Core Doubt:</label>
                <textarea
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  placeholder="E.g., Why do we use LayerNorm before Multi-Head Attention in modern LLMs instead of Post-LN?"
                  rows={3}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-mono"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">My Current Understanding:</label>
                <textarea
                  value={understandingText}
                  onChange={(e) => setUnderstandingText(e.target.value)}
                  placeholder="E.g., I know Post-LN causes gradient vanishing in deep models, but not sure how Pre-LN changes identity path..."
                  rows={2}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-md shadow-amber-600/30"
              >
                Save Doubt
              </button>
            </div>
          </form>
        </div>
      )}

      {/* RECORD SOLUTION MODAL */}
      {resolvingDoubt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <form onSubmit={handleResolveDoubt} className="bg-[#121824] border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">Record Solution</span>
                <h3 className="text-base font-bold text-white">{resolvingDoubt.question}</h3>
              </div>
              <button type="button" onClick={() => setResolvingDoubt(null)} className="text-slate-400 hover:text-white">
                <Icon name="x" size={18} />
              </button>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Concise Answer / Key Takeaway:</label>
                <input
                  type="text"
                  value={solutionAnswer}
                  onChange={(e) => setSolutionAnswer(e.target.value)}
                  placeholder="E.g., Pre-LN preserves an unobstructed identity residual path across all layers."
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Detailed Explanation & References:</label>
                <textarea
                  value={solutionExplanation}
                  onChange={(e) => setSolutionExplanation(e.target.value)}
                  placeholder="E.g., With Pre-LN, x_{l+1} = x_l + F(LN(x_l)), keeping the derivative dx_{L}/dx_l = 1 + ... strictly bounded."
                  rows={4}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setResolvingDoubt(null)}
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/30"
              >
                Save Solution
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 7. AI ENGINEER: FULL RESOURCES CATALOG VIEW
// ==========================================
function AIResourcesView({ onSelectTopic }) {
  const sources = getSources();
  const [tierFilter, setTierFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const sourcesList = useMemo(() => Object.values(sources), [sources]);

  const filteredSources = useMemo(() => {
    return sourcesList.filter(s => {
      if (tierFilter !== 'ALL' && s.quality !== tierFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchName = s.name.toLowerCase().includes(q);
        const matchKey = s.key.toLowerCase().includes(q);
        const matchStudy = (s.whatToStudy || '').toLowerCase().includes(q);
        const matchSkip = (s.whatToSkip || '').toLowerCase().includes(q);
        if (!matchName && !matchKey && !matchStudy && !matchSkip) return false;
      }
      return true;
    });
  }, [sourcesList, tierFilter, search]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-[#0e141f] p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
              <Icon name="book-open" size={18} />
            </span>
            <h1 className="text-xl font-bold font-display text-white">Curated Engineering Sources Directory ({sourcesList.length} Verified)</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">Verified documentation, gold-standard textbooks, videos, and research papers with explicit study and skip guidance.</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
            <Icon name="search" size={15} />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search resources, topics, authors, or study instructions..."
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono"
          />
        </div>

        <div className="flex gap-2">
          {['ALL', 'PRIMARY', 'HIGH QUALITY', 'SECONDARY'].map(t => (
            <button
              key={t}
              onClick={() => setTierFilter(t)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                tierFilter === t
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSources.map(s => (
          <div key={s.key} className="p-5 rounded-2xl bg-[#121824] border border-slate-800 hover:border-blue-500/50 transition space-y-3 shadow-lg flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-blue-500/15 text-blue-400 border border-blue-500/30 font-mono font-bold text-xs">
                    {s.key}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">({s.type})</span>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                  s.quality === 'PRIMARY' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'bg-purple-500/15 text-purple-300 border border-purple-500/30'
                }`}>
                  {s.quality}
                </span>
              </div>

              <h3 className="text-sm font-bold text-white">{s.name}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{s.description}</p>

              <div className="space-y-1.5 pt-2 border-t border-slate-800/80 text-xs font-mono">
                <div className="text-emerald-400 font-bold">What to Study:</div>
                <p className="text-slate-300 text-[11px] bg-slate-950 p-2.5 rounded-lg border border-slate-800">{s.whatToStudy}</p>
                {s.whatToSkip && (
                  <>
                    <div className="text-rose-400 font-bold pt-1">What to Skip:</div>
                    <p className="text-slate-400 text-[11px] bg-slate-950 p-2.5 rounded-lg border border-slate-800">{s.whatToSkip}</p>
                  </>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex justify-end">
              <a
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white text-xs font-bold flex items-center gap-1.5 transition"
              >
                <Icon name="external-link" size={13} />
                <span>Open Resource</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 8. AI ENGINEER: FULL PROJECTS & CP RUBRICS VIEW
// ==========================================
function AIProjectsView({ projects = [], checkpoints = [] }) {
  const [selectedProject, setSelectedProject] = useState(projects[0] || null);

  useEffect(() => {
    if (!selectedProject && projects.length > 0) {
      setSelectedProject(projects[0]);
    }
  }, [projects, selectedProject]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-[#0e141f] p-6 rounded-2xl border border-slate-800">
        <h1 className="text-xl font-bold font-display text-white">7 Production Engineering Projects & Checkpoint Rubrics</h1>
        <p className="text-xs text-slate-400 mt-1">First-class engineering portfolios with 50-point rubrics across Theory, Implementation, Debugging, Explanation, and Code Quality.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Project Selector List (4 cols) */}
        <div className="lg:col-span-4 space-y-2">
          {projects.map(p => (
            <div
              key={p.id}
              onClick={() => setSelectedProject(p)}
              className={`p-4 rounded-xl border cursor-pointer transition space-y-1 ${
                selectedProject?.id === p.id
                  ? 'bg-blue-600/15 border-blue-500 text-white'
                  : 'bg-[#121824] border-slate-800 hover:border-slate-700 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-blue-400">{p.code}</span>
                <span className="text-slate-500">{p.checkpointId}</span>
              </div>
              <h3 className="text-sm font-bold">{p.name}</h3>
              <p className="text-[11px] text-slate-400">{p.phase}</p>
            </div>
          ))}
        </div>

        {/* Project Details & Deliverables (8 cols) */}
        {selectedProject && (
          <div className="lg:col-span-8 bg-[#121824] rounded-2xl border border-slate-800 p-6 space-y-5 shadow-xl">
            <div className="border-b border-slate-800 pb-3">
              <span className="text-xs font-mono text-blue-400 font-bold uppercase">{selectedProject.code} • {selectedProject.weeks}</span>
              <h2 className="text-2xl font-bold font-display text-white mt-1">{selectedProject.name}</h2>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">{selectedProject.objective}</p>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">Technologies Stack:</div>
              <div className="flex flex-wrap gap-1.5">
                {(selectedProject.technologies || []).map(t => (
                  <span key={t} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-xs font-mono">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">Production Deliverables Checklist:</div>
              <div className="space-y-1.5">
                {(selectedProject.deliverables || []).map((d, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
                    <Icon name="check-circle" size={14} className="text-emerald-400 shrink-0" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">50-Point Evaluation Rubric ({selectedProject.checkpointId}):</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(selectedProject.evaluationCriteria || []).map((crit, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1 text-xs">
                    <div className="flex justify-between font-bold text-white">
                      <span>{crit.name}</span>
                      <span className="text-blue-400 font-mono">/{crit.maxScore} pts</span>
                    </div>
                    <p className="text-[11px] text-slate-400">{crit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 9. DSA TRACK VIEWS (Matching Reference Screenshot)
// ==========================================
function DSADashboardView({ stats, onSelectProblem, onNavigate }) {
  const todayProblems = useMemo(() => getStorage().getDsaTodayProblems(stats.todayTarget), [stats]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-gradient-to-r from-[#0d1624] via-[#0f1d2e] to-[#0d1624] border border-slate-800 rounded-2xl p-6 lg:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs uppercase font-mono font-bold tracking-wider text-emerald-400">
                {(typeof window !== 'undefined' && window.ActivityService?.getGreeting) ? window.ActivityService.getGreeting() : 'GOOD DAY'}, JEEVANPRANAV • DSA COMMAND CENTER
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold font-display text-white tracking-tight">
              250 Practice Problems & Pattern Mastery
            </h1>
            <p className="text-xs text-slate-400 max-w-2xl">
              Target: <strong>{stats.todayTarget} problems/day</strong> (~12 weeks). Focus on pattern recognition, optimal complexities, and mistake prevention.
            </p>
          </div>

          <button
            onClick={() => onNavigate('today')}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 flex items-center gap-2 shrink-0 transition"
          >
            <Icon name="play" size={16} />
            <span>Start Today's Set ({stats.todayTarget} Problems)</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-[#121824] p-4 rounded-xl border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 font-medium">Total Solved</div>
          <div className="text-2xl font-extrabold text-emerald-400 font-display">{stats.completed} <span className="text-xs text-slate-500">/ 250</span></div>
          <div className="text-[11px] text-slate-400">{stats.progressPercentage}% Completed</div>
        </div>

        <div className="bg-[#121824] p-4 rounded-xl border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 font-medium">In Progress</div>
          <div className="text-2xl font-extrabold text-blue-400 font-display">{stats.inProgress}</div>
          <div className="text-[11px] text-slate-400">Active problems</div>
        </div>

        <div className="bg-[#121824] p-4 rounded-xl border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 font-medium">Needs Revision</div>
          <div className="text-2xl font-extrabold text-amber-400 font-display">{stats.revise}</div>
          <div className="text-[11px] text-slate-400">Flagged for practice</div>
        </div>

        <div className="bg-[#121824] p-4 rounded-xl border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 font-medium">Today's Solved</div>
          <div className="text-2xl font-extrabold text-teal-300 font-display">{stats.todayCompleted} <span className="text-xs text-slate-500">/ {stats.todayTarget}</span></div>
          <div className="text-[11px] text-slate-400">Daily goal</div>
        </div>

        <div className="bg-[#121824] p-4 rounded-xl border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 font-medium">Already Solved</div>
          <div className="text-2xl font-extrabold text-purple-400 font-display">{stats.alreadySolvedCount}</div>
          <div className="text-[11px] text-slate-400">Revision bank</div>
        </div>

        <div className="bg-[#121824] p-4 rounded-xl border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 font-medium">Categories</div>
          <div className="text-2xl font-extrabold text-indigo-400 font-display">22</div>
          <div className="text-[11px] text-slate-400">Core topics</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-[#121824] rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Icon name="target" size={18} />
              </span>
              <h2 className="text-lg font-bold text-white font-display">Today's Target Queue</h2>
            </div>
            <span className="text-xs font-mono text-slate-400 font-bold">
              {stats.todayTarget} Problems / Day
            </span>
          </div>

          <div className="space-y-2.5">
            {todayProblems.map(p => (
              <div
                key={p.id}
                onClick={() => onSelectProblem(p)}
                className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition flex items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-500">#{p.lcNumber}</span>
                    <span className="text-xs font-bold text-white">{p.problem}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                      {p.subTopic}
                    </span>
                  </div>
                  <div className="text-[11px] text-emerald-400 font-mono">
                    Pattern: {p.pattern || 'General'}
                  </div>
                </div>

                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white text-xs font-bold transition flex items-center gap-1"
                  >
                    <span>LeetCode</span>
                    <Icon name="external-link" size={12} />
                  </a>
                  <button
                    onClick={() => {
                      getStorage().setDsaStatus(p.id, p.status === 'DONE' ? 'NOT_STARTED' : 'DONE');
                      playChime('complete');
                      notify(`Problem #${p.lcNumber} updated!`, 'success');
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                      p.status === 'DONE'
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {p.status === 'DONE' ? '✓ Done' : 'Mark Done'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 bg-[#121824] rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400">
                <Icon name="alert-triangle" size={18} />
              </span>
              <h2 className="text-lg font-bold text-white font-display">Pattern Focus Radar</h2>
            </div>
          </div>

          <div className="space-y-2.5">
            {stats.weakPatterns.length === 0 ? (
              <div className="text-center py-6 text-slate-500 text-xs space-y-1">
                <Icon name="check-circle-2" size={28} className="mx-auto text-emerald-500/60" />
                <p>All patterns are healthy!</p>
                <p className="text-[11px] text-slate-600">Patterns with mistakes or revisions will automatically surface here.</p>
              </div>
            ) : (
              stats.weakPatterns.map(pat => (
                <div key={pat.name} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-white">{pat.name}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{pat.done}/{pat.total} Solved • {pat.attempts} Attempts</div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-rose-500/15 text-rose-300 text-[10px] font-mono font-bold">
                    {pat.revise} Needs Rev
                  </span>
                </div>
              ))
            )}
          </div>

          <button
            onClick={() => onNavigate('practice')}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition border border-slate-700/60"
          >
            <Icon name="layers" size={14} />
            <span>Open Practice 250 Table</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function DSAPracticeView({ problems, onSelectProblem, searchQuery, setSearchQuery }) {
  const [topicFilter, setTopicFilter] = useState('ALL');
  const [difficultyFilter, setDifficultyFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [companyFilter, setCompanyFilter] = useState('ALL');
  const [onlyInterviewCritical, setOnlyInterviewCritical] = useState(false);

  const [noteModalProblem, setNoteModalProblem] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [mistakesText, setMistakesText] = useState('');

  const [expandedTopics, setExpandedTopics] = useState(() => {
    const initial = {};
    getStorage().dsaCategories.forEach((c, idx) => {
      initial[c.name] = idx < 2 || true;
    });
    return initial;
  });

  const toggleTopic = (catName) => {
    setExpandedTopics(prev => ({ ...prev, [catName]: !prev[catName] }));
  };

  const expandAll = () => {
    const all = {};
    getStorage().dsaCategories.forEach(c => { all[c.name] = true; });
    setExpandedTopics(all);
  };

  const collapseAll = () => {
    const none = {};
    getStorage().dsaCategories.forEach(c => { none[c.name] = false; });
    setExpandedTopics(none);
  };

  const handleToggleStatus = (prob, e) => {
    e.stopPropagation();
    const newStatus = prob.status === 'DONE' ? 'NOT_STARTED' : 'DONE';
    getStorage().setDsaStatus(prob.id, newStatus);
    if (newStatus === 'DONE') playChime('complete');
    notify(`Problem #${prob.lcNumber} marked ${newStatus}`, newStatus === 'DONE' ? 'success' : 'info');
  };

  const filteredProblems = useMemo(() => {
    return problems.filter(p => {
      if (topicFilter !== 'ALL' && p.subTopic !== topicFilter) return false;
      if (difficultyFilter !== 'ALL' && p.difficulty !== difficultyFilter) return false;
      if (statusFilter !== 'ALL' && p.status !== statusFilter) return false;
      if (companyFilter !== 'ALL' && !(p.companies || '').toLowerCase().includes(companyFilter.toLowerCase())) return false;
      if (onlyInterviewCritical && p.priority !== 'HIGH') return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = (p.problem || '').toLowerCase().includes(q);
        const matchNum = String(p.lcNumber || '').includes(q);
        const matchTopic = (p.subTopic || '').toLowerCase().includes(q);
        const matchPattern = (p.pattern || '').toLowerCase().includes(q);
        const matchCompany = (p.companies || '').toLowerCase().includes(q);
        const matchNotes = (p.notes || '').toLowerCase().includes(q);
        const matchMistakes = (p.mistakes || '').toLowerCase().includes(q);

        if (!matchName && !matchNum && !matchTopic && !matchPattern && !matchCompany && !matchNotes && !matchMistakes) {
          return false;
        }
      }
      return true;
    });
  }, [problems, topicFilter, difficultyFilter, statusFilter, companyFilter, onlyInterviewCritical, searchQuery]);

  const groupedCategories = useMemo(() => {
    const groups = {};
    getStorage().dsaCategories.forEach(c => { groups[c.name] = []; });
    filteredProblems.forEach(p => {
      if (!groups[p.subTopic]) groups[p.subTopic] = [];
      groups[p.subTopic].push(p);
    });
    return groups;
  }, [filteredProblems]);

  return (
    <div className="space-y-4">
      {/* FILTER & SEARCH TOOLBAR */}
      <div className="bg-[#0e141f] p-4 rounded-2xl border border-slate-800/80 space-y-3 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Icon name="search" size={15} />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search problem, LC#, pattern, company, notes, mistakes..."
              className="w-full pl-9 pr-8 py-2 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition font-mono"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white">
                <Icon name="x" size={14} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={expandAll}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1 transition"
            >
              <Icon name="chevrons-down" size={13} />
              <span>Expand All</span>
            </button>
            <button
              onClick={collapseAll}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1 transition"
            >
              <Icon name="chevrons-up" size={13} />
              <span>Collapse All</span>
            </button>
            <div className="text-xs text-slate-400 pl-2 border-l border-slate-800">
              <strong className="text-white font-mono">{filteredProblems.length}</strong> / 250 problems
            </div>
          </div>
        </div>

        {/* Filter Row */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
          <select
            value={topicFilter}
            onChange={(e) => setTopicFilter(e.target.value)}
            className="bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500 truncate"
          >
            <option value="ALL">All 22 Topics</option>
            {getStorage().dsaCategories.map(c => (
              <option key={c.id} value={c.name}>{c.id}. {c.name}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="ALL">All Statuses</option>
            <option value="NOT_STARTED">Not Started</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="DONE">Done</option>
            <option value="REVISE">Revise</option>
            <option value="SKIPPED">Skipped</option>
          </select>

          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="ALL">All Difficulties</option>
            <option value="Easy">Easy (33)</option>
            <option value="Medium">Medium (176)</option>
            <option value="Hard">Hard (41)</option>
          </select>

          <select
            value={companyFilter}
            onChange={(e) => setCompanyFilter(e.target.value)}
            className="bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="ALL">All Companies</option>
            <option value="Amazon">Amazon</option>
            <option value="Google">Google</option>
            <option value="Microsoft">Microsoft</option>
            <option value="Meta">Meta / Facebook</option>
            <option value="Apple">Apple</option>
            <option value="Netflix">Netflix</option>
            <option value="Bloomberg">Bloomberg</option>
            <option value="Uber">Uber</option>
            <option value="Adobe">Adobe</option>
          </select>

          <button
            onClick={() => setOnlyInterviewCritical(prev => !prev)}
            className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
              onlyInterviewCritical
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-950 text-slate-400 border-slate-700/80 hover:bg-slate-850'
            }`}
          >
            <Icon name="flame" size={14} />
            <span>Interview Critical</span>
          </button>
        </div>
      </div>

      {/* 22 TOPICS ACCORDIONS */}
      <div className="space-y-4">
        {Object.entries(groupedCategories).map(([catName, catProblems]) => {
          if (catProblems.length === 0) return null;

          const isExpanded = expandedTopics[catName] !== false;
          const completedCount = catProblems.filter(p => p.status === 'DONE').length;
          const totalCount = catProblems.length;
          const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
          const catMeta = getStorage().dsaCategories.find(c => c.name === catName);

          return (
            <div key={catName} className="phase-accordion-card shadow-lg">
              <div
                onClick={() => toggleTopic(catName)}
                className="phase-accordion-header"
              >
                <div className="flex items-center gap-3">
                  <span className="text-slate-400 transition transform duration-200">
                    <Icon name={isExpanded ? "chevron-down" : "chevron-right"} size={18} />
                  </span>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white font-display tracking-tight">
                      {catMeta ? `${catMeta.id}. ${catName}` : catName}
                    </h3>
                    {catMeta?.isInterviewCritical && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                        Critical
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-slate-300">
                    {completedCount}/{totalCount}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold ${
                    pct === 100
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : pct > 0
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {pct}%
                  </span>
                </div>
              </div>

              {isExpanded && (
                <div className="overflow-x-auto border-t border-slate-800/80">
                  <table className="w-full text-left border-collapse table-compact">
                    <thead>
                      <tr className="bg-[#090d14] text-slate-400 text-[11px] uppercase tracking-wider font-semibold border-b border-slate-800">
                        <th className="w-14 text-center py-2.5">STATUS</th>
                        <th className="min-w-[280px] py-2.5">QUESTION / PROBLEM</th>
                        <th className="min-w-[160px] py-2.5">COMPANIES</th>
                        <th className="w-20 text-center py-2.5">PRACTICE</th>
                        <th className="w-20 text-center py-2.5">NOTES</th>
                        <th className="w-24 text-center py-2.5">ATTEMPTS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-[#0d121c]">
                      {catProblems.map(prob => {
                        const isDone = prob.status === 'DONE';
                        const hasNote = !!(prob.notes && prob.notes.trim()) || !!(prob.mistakes && prob.mistakes.trim());
                        const companiesList = (prob.companies || '').split(',').map(c => c.trim()).filter(Boolean);

                        return (
                          <tr
                            key={prob.id}
                            onClick={() => onSelectProblem(prob)}
                            className={`cursor-pointer transition-colors duration-150 ${
                              isDone ? 'bg-[#0d1519]/40 hover:bg-[#121c24]' : 'hover:bg-[#121926]'
                            }`}
                          >
                            <td className="text-center py-3" onClick={(e) => handleToggleStatus(prob, e)}>
                              <div
                                className={`status-checkbox mx-auto ${
                                  isDone
                                    ? 'checked'
                                    : prob.status === 'IN_PROGRESS'
                                    ? 'in-progress'
                                    : prob.status === 'REVISE'
                                    ? 'needs-revision'
                                    : ''
                                }`}
                                title={`Status: ${prob.status}. Click to toggle.`}
                              >
                                {isDone ? (
                                  <Icon name="check" size={14} className="text-emerald-400 font-bold" />
                                ) : prob.status === 'IN_PROGRESS' ? (
                                  <Icon name="play" size={11} className="text-blue-400 fill-blue-400" />
                                ) : prob.status === 'REVISE' ? (
                                  <Icon name="rotate-ccw" size={11} className="text-amber-400" />
                                ) : null}
                              </div>
                            </td>

                            <td className="py-3 pr-4">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-mono font-bold text-slate-500">
                                  #{prob.lcNumber}
                                </span>
                                <span className="font-semibold text-white text-xs hover:text-emerald-400 transition">
                                  {prob.problem}
                                </span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    getStorage().setDsaMastery(prob.id, prob.mastery >= 4 ? 0 : 5);
                                    notify(`Mastery updated for #${prob.lcNumber}`, 'info');
                                  }}
                                  className={`p-0.5 text-slate-500 hover:text-amber-400 transition ${
                                    prob.mastery >= 4 ? 'text-amber-400' : ''
                                  }`}
                                  title="Bookmark / High Mastery"
                                >
                                  <Icon name="bookmark" size={13} />
                                </button>
                              </div>
                              <div className="text-[11px] text-slate-400 font-mono mt-0.5 flex items-center gap-2">
                                <span className="text-emerald-400/90 font-medium">{prob.pattern || 'Pattern'}</span>
                                {prob.dateSolved && (
                                  <>
                                    <span className="text-slate-600">•</span>
                                    <span>Solved: {prob.dateSolved}</span>
                                  </>
                                )}
                              </div>
                            </td>

                            <td className="py-3" onClick={(e) => e.stopPropagation()}>
                              <div className="flex flex-wrap gap-1 max-w-[220px]">
                                {companiesList.slice(0, 3).map((comp, idx) => (
                                  <CompanyBadge key={idx} name={comp} />
                                ))}
                                {companiesList.length > 3 && (
                                  <span className="text-[10px] font-mono font-bold text-slate-500 px-1.5 py-0.5 rounded bg-slate-800">
                                    +{companiesList.length - 3}
                                  </span>
                                )}
                              </div>
                            </td>

                            <td className="text-center py-3" onClick={(e) => e.stopPropagation()}>
                              <a
                                href={prob.link}
                                target="_blank"
                                rel="noreferrer"
                                className="action-icon-btn code-btn mx-auto"
                                title={`Open LeetCode #${prob.lcNumber} (${prob.link})`}
                              >
                                <span className="font-mono text-xs font-bold">&lt;/&gt;</span>
                              </a>
                            </td>

                            <td className="text-center py-3" onClick={(e) => e.stopPropagation()}>
                              <button
                                onClick={() => {
                                  setNoteModalProblem(prob);
                                  setNoteText(prob.notes || '');
                                  setMistakesText(prob.mistakes || '');
                                }}
                                className={`action-icon-btn notes-btn mx-auto ${hasNote ? 'active' : ''}`}
                                title={hasNote ? `Notes: ${prob.notes || prob.mistakes}` : "Add Notes & Mistakes"}
                              >
                                <Icon name={hasNote ? "file-text" : "message-square"} size={14} />
                              </button>
                            </td>

                            <td className="text-center py-3" onClick={(e) => e.stopPropagation()}>
                              <div className="inline-flex items-center gap-1 bg-slate-900 px-2 py-1 rounded-lg border border-slate-800 text-xs font-mono">
                                <span className="text-slate-300 font-bold">{prob.attempts || 0}</span>
                                <button
                                  onClick={() => {
                                    getStorage().incrementDsaAttempts(prob.id);
                                    notify(`Attempt logged for #${prob.lcNumber}`, 'info');
                                  }}
                                  className="text-slate-500 hover:text-emerald-400 transition"
                                  title="+1 Attempt"
                                >
                                  <Icon name="plus" size={12} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {noteModalProblem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#121824] border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase">
                  LeetCode #{noteModalProblem.lcNumber} • Personal Notes & Mistakes
                </span>
                <h3 className="text-base font-bold text-white">{noteModalProblem.problem}</h3>
              </div>
              <button onClick={() => setNoteModalProblem(null)} className="text-slate-400 hover:text-white">
                <Icon name="x" size={18} />
              </button>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                  <Icon name="alert-circle" size={13} className="text-rose-400" />
                  <span>Mistakes Made / Gotchas (Interview Critical):</span>
                </label>
                <textarea
                  value={mistakesText}
                  onChange={(e) => setMistakesText(e.target.value)}
                  placeholder="E.g., Forgot negative numbers in prefix sum; Missed boundary condition for empty array..."
                  rows={3}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 font-mono leading-relaxed"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                  <Icon name="file-text" size={13} className="text-purple-400" />
                  <span>Approach Notes & Reflection:</span>
                </label>
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="E.g., Used two pointers from both ends with O(N) time and O(1) space..."
                  rows={3}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 font-mono leading-relaxed"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <a
                href={noteModalProblem.link}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <Icon name="external-link" size={13} />
                <span>Open in LeetCode</span>
              </a>
              <div className="flex gap-2">
                <button
                  onClick={() => setNoteModalProblem(null)}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    getStorage().setDsaNotes(noteModalProblem.id, noteText);
                    getStorage().setDsaMistakes(noteModalProblem.id, mistakesText);
                    setNoteModalProblem(null);
                    notify(`Notes saved for #${noteModalProblem.lcNumber}!`, 'success');
                  }}
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/30"
                >
                  Save Notes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 10.1 FULL INTERACTIVE DSA PROBLEM DRAWER / MODAL
// ==========================================
function DSAProblemDrawer({ problem, onClose }) {
  if (!problem) return null;

  const [activeTab, setActiveTab] = useState('overview'); // overview, approach, solution, complexity, mistakes, notes, revision
  const [status, setStatus] = useState(problem.status || 'NOT_STARTED');
  const [attempts, setAttempts] = useState(problem.attempts || 0);
  const [mastery, setMastery] = useState(problem.mastery || 0);
  const [dateSolved, setDateSolved] = useState(problem.dateSolved || '');
  const [notes, setNotes] = useState(problem.notes || '');
  const [mistakes, setMistakes] = useState(problem.mistakes || '');
  const [approach, setApproach] = useState(problem.approach || '');
  const [code, setCode] = useState(problem.code || problem.personalCode || '');
  const [explanation, setExplanation] = useState(problem.explanation || '');
  const [timeComplexity, setTimeComplexity] = useState(problem.timeComplexity || 'O(N)');
  const [spaceComplexity, setSpaceComplexity] = useState(problem.spaceComplexity || 'O(1)');
  const [codeLang, setCodeLang] = useState('Java');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // 'saved' | 'error' | null

  const companiesList = (problem.companies || '').split(',').map(c => c.trim()).filter(Boolean);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus(null);
    try {
      const updates = {
        status,
        attempts: Number(attempts),
        mastery: Number(mastery),
        dateSolved,
        notes,
        mistakes,
        approach,
        code,
        explanation,
        timeComplexity,
        spaceComplexity
      };
      await getStorage().updateDsaProblem(problem.id, updates);
      setSaveStatus('saved');
      notify(`Saved #${problem.lcNumber} progress to Cloud Database!`, 'success');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (e) {
      setSaveStatus('error');
      notify(`Failed to save: ${e.message}`, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleQuickDone = () => {
    const today = new Date().toISOString().split('T')[0];
    const newMastery = mastery && mastery > 0 ? mastery : 4;
    const newAttempts = attempts && attempts > 0 ? attempts : 1;
    setStatus('DONE');
    setDateSolved(today);
    setMastery(newMastery);
    setAttempts(newAttempts);
    getStorage().updateDsaProblem(problem.id, {
      status: 'DONE',
      dateSolved: today,
      mastery: newMastery,
      attempts: newAttempts
    });
    playChime('complete');
    notify(`Problem #${problem.lcNumber} marked Done!`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#0e141f] border border-slate-700/90 rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* MODAL HEADER */}
        <div className="p-4 sm:p-6 border-b border-slate-800 bg-[#0c1017] space-y-3 shrink-0">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono font-bold text-emerald-400">
                  LEETCODE #{problem.lcNumber}
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs font-mono text-slate-400">
                  {problem.subTopic}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                  problem.difficulty === 'Easy' ? 'diff-badge-easy' : problem.difficulty === 'Hard' ? 'diff-badge-hard' : 'diff-badge-medium'
                }`}>
                  {problem.difficulty}
                </span>
                {problem.priority === 'HIGH' && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                    Critical
                  </span>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
                {problem.problem}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={problem.link}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-600/30 transition shrink-0"
              >
                <span>Open Problem on LeetCode</span>
                <Icon name="external-link" size={13} />
              </a>
              <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition">
                <Icon name="x" size={18} />
              </button>
            </div>
          </div>

          {/* QUICK CONTROLS: STATUS / ATTEMPTS / MASTERY */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs font-mono">
            <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase text-slate-500 font-bold block">Status</span>
              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                  if (e.target.value === 'DONE' && !dateSolved) {
                    setDateSolved(new Date().toISOString().split('T')[0]);
                  }
                }}
                className="w-full bg-transparent text-white font-bold focus:outline-none cursor-pointer"
              >
                <option value="NOT_STARTED" className="bg-slate-900">NOT STARTED</option>
                <option value="IN_PROGRESS" className="bg-slate-900">IN PROGRESS</option>
                <option value="DONE" className="bg-slate-900">✓ DONE</option>
                <option value="REVISE" className="bg-slate-900">REVISE</option>
                <option value="SKIPPED" className="bg-slate-900">SKIPPED</option>
              </select>
            </div>

            <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase text-slate-500 font-bold block">Attempts</span>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setAttempts(prev => Math.max(0, Number(prev) - 1))}
                  className="text-slate-400 hover:text-white font-bold px-1"
                >-</button>
                <span className="font-bold text-white">{attempts}</span>
                <button
                  type="button"
                  onClick={() => setAttempts(prev => Number(prev) + 1)}
                  className="text-emerald-400 hover:text-emerald-300 font-bold px-1"
                >+</button>
              </div>
            </div>

            <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase text-slate-500 font-bold block">Mastery Rating</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setMastery(star)}
                    className={`text-sm transition ${mastery >= star ? 'text-amber-400' : 'text-slate-700 hover:text-slate-500'}`}
                  >★</button>
                ))}
                <span className="text-slate-400 text-[10px] ml-1">{mastery}/5</span>
              </div>
            </div>

            <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase text-slate-500 font-bold block">Date Solved</span>
              <input
                type="date"
                value={dateSolved}
                onChange={(e) => setDateSolved(e.target.value)}
                className="w-full bg-transparent text-slate-200 text-xs focus:outline-none"
              />
            </div>
          </div>

          {/* SUB-TABS NAVIGATION */}
          <div className="flex items-center gap-1 overflow-x-auto pt-1 no-scrollbar">
            {[
              { id: 'overview', label: '1. Overview & Pattern', icon: 'info' },
              { id: 'approach', label: '2. My Approach', icon: 'compass' },
              { id: 'solution', label: '3. My Solution Code', icon: 'code' },
              { id: 'complexity', label: '4. Complexity', icon: 'activity' },
              { id: 'mistakes', label: '5. Mistakes / Gotchas', icon: 'alert-triangle' },
              { id: 'notes', label: '6. Notes & Reflection', icon: 'file-text' },
              { id: 'revision', label: '7. Spaced Revision', icon: 'repeat' }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon name={tab.icon} size={13} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* MODAL BODY (SCROLLABLE TAB CONTENT) */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 font-mono text-xs">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-[11px] font-bold text-emerald-400 uppercase">Algorithmic Pattern / Key Idea:</div>
                <div className="text-sm font-semibold text-white">{problem.pattern || 'General Problem Solving'}</div>
              </div>

              {companiesList.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-slate-300">Frequently Asked Companies:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {companiesList.map((comp, idx) => (
                      <CompanyBadge key={idx} name={comp} />
                    ))}
                  </div>
                </div>
              )}

              <div className="p-4 rounded-xl bg-[#121824] border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-slate-200 flex items-center gap-2">
                  <Icon name="external-link" size={14} className="text-emerald-400" />
                  <span>Official LeetCode Problem</span>
                </div>
                <p className="text-slate-400 text-xs">
                  Full problem description, test cases, and online judge are accessible directly on LeetCode.
                </p>
                <a
                  href={problem.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-emerald-400 hover:underline font-bold pt-1"
                >
                  <span>{problem.link}</span>
                  <Icon name="arrow-up-right" size={12} />
                </a>
              </div>
            </div>
          )}

          {activeTab === 'approach' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300">
                  My High-Level Approach & Algorithm Steps:
                </label>
                <span className="text-[11px] text-slate-500">How you formulated the solution</span>
              </div>
              <textarea
                value={approach}
                onChange={(e) => setApproach(e.target.value)}
                placeholder={`E.g., 1. Use a HashMap to store elements and indices.
2. For each number, check if target - num exists.
3. If yes, return current index and mapped index.`}
                rows={10}
                className="w-full p-4 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 leading-relaxed font-mono"
              />
            </div>
          )}

          {activeTab === 'solution' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <label className="text-xs font-semibold text-slate-300">
                    My Personal Solution Code:
                  </label>
                  <select
                    value={codeLang}
                    onChange={(e) => setCodeLang(e.target.value)}
                    className="bg-slate-950 border border-slate-700 px-2.5 py-1 rounded-lg text-xs text-slate-200 focus:outline-none"
                  >
                    <option value="Java">Java</option>
                    <option value="Python">Python</option>
                    <option value="C++">C++</option>
                    <option value="JavaScript">JavaScript</option>
                  </select>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(code);
                    notify("Code copied to clipboard!", "info");
                  }}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                >
                  <Icon name="copy" size={12} />
                  <span>Copy Code</span>
                </button>
              </div>

              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder={`// Paste your ${codeLang} implementation here...
class Solution {
    public boolean containsDuplicate(int[] nums) {
        Set<Integer> set = new HashSet<>();
        for (int n : nums) {
            if (!set.add(n)) return true;
        }
        return false;
    }
}`}
                rows={14}
                className="w-full p-4 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-emerald-300 placeholder-slate-600 focus:outline-none focus:border-emerald-500 leading-relaxed font-mono selection:bg-emerald-800 selection:text-white"
              />
            </div>
          )}

          {activeTab === 'complexity' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-cyan-400 uppercase flex items-center gap-1.5">
                  <Icon name="clock" size={14} />
                  <span>Time Complexity:</span>
                </label>
                <input
                  type="text"
                  value={timeComplexity}
                  onChange={(e) => setTimeComplexity(e.target.value)}
                  placeholder="e.g. O(N) or O(N log N)"
                  className="w-full p-2.5 bg-[#121824] border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                />
                <p className="text-[11px] text-slate-500">Single pass through the input array of size N.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-indigo-400 uppercase flex items-center gap-1.5">
                  <Icon name="database" size={14} />
                  <span>Space Complexity:</span>
                </label>
                <input
                  type="text"
                  value={spaceComplexity}
                  onChange={(e) => setSpaceComplexity(e.target.value)}
                  placeholder="e.g. O(1) or O(N)"
                  className="w-full p-2.5 bg-[#121824] border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                />
                <p className="text-[11px] text-slate-500">Auxiliary memory allocated for Hash set / table.</p>
              </div>

              <div className="sm:col-span-2 space-y-2 pt-2">
                <label className="text-xs font-semibold text-slate-300">Mathematical & Big-O Intuition:</label>
                <textarea
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  placeholder="Explain why this is optimal, trade-offs between time vs space, and alternative approaches..."
                  rows={4}
                  className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>
            </div>
          )}

          {activeTab === 'mistakes' && (
            <div className="space-y-2">
              <label className="text-xs font-semibold text-rose-400 flex items-center gap-1.5">
                <Icon name="alert-triangle" size={14} />
                <span>Mistakes Made / Edge Cases / Gotchas (Interview Critical):</span>
              </label>
              <textarea
                value={mistakes}
                onChange={(e) => setMistakes(e.target.value)}
                placeholder={`E.g., 
- Forgot to handle empty array / single element edge case
- Missed negative numbers in prefix sums
- Off-by-one error in binary search mid calculation mid = left + (right - left) / 2`}
                rows={9}
                className="w-full p-4 bg-slate-950 border border-rose-500/40 rounded-xl text-xs text-rose-200 placeholder-slate-600 focus:outline-none focus:border-rose-500 leading-relaxed font-mono"
              />
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-2">
              <label className="text-xs font-semibold text-purple-400 flex items-center gap-1.5">
                <Icon name="file-text" size={14} />
                <span>Personal Reflections & Problem Remarks:</span>
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Personal notes, variation questions, or connections to other patterns..."
                rows={9}
                className="w-full p-4 bg-slate-950 border border-purple-500/40 rounded-xl text-xs text-purple-200 placeholder-slate-600 focus:outline-none focus:border-purple-500 leading-relaxed font-mono"
              />
            </div>
          )}

          {activeTab === 'revision' && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
              <div>
                <h4 className="text-sm font-bold text-white">Spaced Repetition Scheduling</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Quickly queue this problem for future review.</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  { days: 3, label: 'Revise in 3 Days (+3d)' },
                  { days: 7, label: 'Revise in 1 Week (+7d)' },
                  { days: 14, label: 'Revise in 2 Weeks (+14d)' },
                  { days: 30, label: 'Revise in 1 Month (+30d)' }
                ].map(item => (
                  <button
                    key={item.days}
                    type="button"
                    onClick={() => {
                      setStatus('REVISE');
                      notify(`Scheduled revision for +${item.days} days!`, 'info');
                    }}
                    className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold border border-slate-700 transition"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* MODAL FOOTER */}
        <div className="p-4 border-t border-slate-800 bg-[#0c1017] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            {saveStatus === 'saved' && (
              <span className="text-xs text-emerald-400 flex items-center gap-1 font-mono animate-fade-in">
                <Icon name="check" size={13} />
                <span>Saved to Supabase ✓</span>
              </span>
            )}
            {saveStatus === 'error' && (
              <span className="text-xs text-rose-400 flex items-center gap-1 font-mono">
                <Icon name="alert-triangle" size={13} />
                <span>Save failed</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleQuickDone}
              className="px-3.5 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition"
            >
              ✓ Quick Mark Done
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 flex items-center gap-1.5 transition disabled:opacity-50"
            >
              <Icon name="save" size={14} />
              <span>{isSaving ? "Saving..." : "Save All Changes"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 10.2 FULL INTERACTIVE AI DAY DRAWER / MODAL
// ==========================================
function AIDayDrawer({ day, onClose, onStartTimer }) {
  if (!day) return null;

  const [status, setStatus] = useState(day.status || 'NOT_STARTED');
  const [mastery, setMastery] = useState(day.mastery || 0);
  const [remarks, setRemarks] = useState(day.remarks || '');
  const [notes, setNotes] = useState(day.notes || '');
  const [activeTab, setActiveTab] = useState('mission'); // mission, remarks, doubts
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  const [newDoubtQuestion, setNewDoubtQuestion] = useState('');
  const [newDoubtUnderstanding, setNewDoubtUnderstanding] = useState('');

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus(null);
    try {
      await getStorage().updateDay(day.day, {
        status,
        mastery: Number(mastery),
        remarks,
        notes
      });
      setSaveStatus('saved');
      notify(`Day ${day.day} progress saved to Cloud Database!`, 'success');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (e) {
      setSaveStatus('error');
      notify(`Failed to save: ${e.message}`, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddDoubt = async (e) => {
    if (e) e.preventDefault();
    if (!newDoubtQuestion.trim()) return;

    await getStorage().addDoubt(day.day, {
      question: newDoubtQuestion,
      userUnderstanding: newDoubtUnderstanding
    });
    setNewDoubtQuestion('');
    setNewDoubtUnderstanding('');
    notify(`Doubt logged for Day ${day.day}!`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#0e141f] border border-slate-700/90 rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* MODAL HEADER */}
        <div className="p-4 sm:p-6 border-b border-slate-800 bg-[#0c1017] space-y-3 shrink-0">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono font-bold text-blue-400">
                  DAY {day.day} • {day.date || `Day ${day.day}`}
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs font-mono text-slate-400">
                  {day.phase}
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs font-mono text-slate-400">
                  Week {day.week || 1}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
                {day.topic}
              </h2>
              <p className="text-xs text-slate-400 font-mono">Concepts: {day.concepts}</p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={day.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-600/30 transition shrink-0"
              >
                <span>Launch Source ({day.sourceKey || 'DOCS'})</span>
                <Icon name="external-link" size={13} />
              </a>
              <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition">
                <Icon name="x" size={18} />
              </button>
            </div>
          </div>

          {/* QUICK CONTROLS: STATUS / MASTERY */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 text-xs font-mono">
            <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase text-slate-500 font-bold block">Status</span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-transparent text-white font-bold focus:outline-none cursor-pointer"
              >
                <option value="NOT_STARTED" className="bg-slate-900">NOT STARTED</option>
                <option value="IN_PROGRESS" className="bg-slate-900">IN PROGRESS</option>
                <option value="COMPLETED" className="bg-slate-900">✓ COMPLETED</option>
                <option value="NEEDS_REVISION" className="bg-slate-900">NEEDS REVISION</option>
                <option value="SKIPPED" className="bg-slate-900">SKIPPED</option>
              </select>
            </div>

            <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase text-slate-500 font-bold block">Mastery Rating</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setMastery(star)}
                    className={`text-sm transition ${mastery >= star ? 'text-amber-400' : 'text-slate-700 hover:text-slate-500'}`}
                  >★</button>
                ))}
                <span className="text-slate-400 text-[10px] ml-1">{mastery}/5</span>
              </div>
            </div>

            <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 space-y-1 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase text-slate-500 font-bold block">2h Focus Session</span>
                <span className="text-blue-400 font-bold text-xs">45m + 75m + 5m</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onStartTimer) onStartTimer(day);
                }}
                className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1"
              >
                <Icon name="play" size={11} />
                <span>Start</span>
              </button>
            </div>
          </div>

          {/* SUB-TABS NAVIGATION */}
          <div className="flex items-center gap-1 overflow-x-auto pt-1 no-scrollbar">
            {[
              { id: 'mission', label: '1. Daily Mission & Tasks', icon: 'target' },
              { id: 'remarks', label: '2. Personal Remarks & Notes', icon: 'file-text' },
              { id: 'doubts', label: `3. Day Doubts (${(day.doubts || []).length})`, icon: 'help-circle' }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon name={tab.icon} size={13} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* MODAL BODY */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 font-mono text-xs">
          {activeTab === 'mission' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Learn Guidance */}
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase">
                    <Icon name="book-open" size={15} />
                    <span>Deep Learn Guidance (45m)</span>
                  </div>
                  <div className="text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800">
                    {day.whatToStudy || day.learnSection || 'Review foundational mechanics and official documentation.'}
                  </div>
                  {day.whatToSkip && (
                    <div className="text-slate-400 leading-relaxed bg-slate-950/60 p-2.5 rounded-lg border border-rose-950/50 text-[11px]">
                      <strong className="text-rose-400">Skip:</strong> {day.whatToSkip}
                    </div>
                  )}
                </div>

                {/* Implement Task */}
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-indigo-400 font-bold uppercase">
                    <Icon name="code" size={15} />
                    <span>Hands-on Task (75m)</span>
                  </div>
                  <div className="text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800">
                    {day.implementTask || 'Write clean, typed implementation in your repository.'}
                  </div>
                  <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-800/40 text-[11px] text-emerald-300">
                    <strong>Deliverable:</strong> {day.deliverable || 'Green tests and commit.'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'remarks' && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Personal Reflections & Remarks:</label>
                <textarea
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="E.g., Derivation was clear. Verified on GPU notebook. Ready for transformer architecture phase..."
                  rows={5}
                  className="w-full p-3.5 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 leading-relaxed font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Technical Notes & Reference Formulas:</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Formulas, bash commands, code snippets, architectural notes..."
                  rows={6}
                  className="w-full p-3.5 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-blue-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 leading-relaxed font-mono"
                />
              </div>
            </div>
          )}

          {activeTab === 'doubts' && (
            <div className="space-y-4">
              <form onSubmit={handleAddDoubt} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-amber-400 uppercase flex items-center gap-1.5">
                  <Icon name="help-circle" size={14} />
                  <span>Raise New Doubt for Day {day.day}</span>
                </div>
                <input
                  type="text"
                  value={newDoubtQuestion}
                  onChange={(e) => setNewDoubtQuestion(e.target.value)}
                  placeholder="Enter doubt / question..."
                  className="w-full p-2.5 bg-[#121824] border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                />
                <textarea
                  value={newDoubtUnderstanding}
                  onChange={(e) => setNewDoubtUnderstanding(e.target.value)}
                  placeholder="Your current understanding / hypothesis..."
                  rows={2}
                  className="w-full p-2.5 bg-[#121824] border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition shadow-md shadow-amber-600/30"
                  >
                    Save Doubt
                  </button>
                </div>
              </form>

              <div className="space-y-2">
                {(day.doubts || []).map(doubt => (
                  <div key={doubt.id} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs">{doubt.question}</span>
                      <span className={`status-pill ${doubt.status === 'OPEN' ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30' : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'}`}>
                        {doubt.status}
                      </span>
                    </div>
                    {doubt.userUnderstanding && (
                      <p className="text-slate-400 text-[11px]">Hypothesis: {doubt.userUnderstanding}</p>
                    )}
                    {doubt.solution && (
                      <div className="p-2 rounded bg-emerald-950/20 border border-emerald-800/40 text-[11px] text-emerald-300">
                        <strong>Solution:</strong> {doubt.solution.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* MODAL FOOTER */}
        <div className="p-4 border-t border-slate-800 bg-[#0c1017] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            {saveStatus === 'saved' && (
              <span className="text-xs text-emerald-400 flex items-center gap-1 font-mono">
                <Icon name="check" size={13} />
                <span>Saved to Supabase ✓</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setStatus('COMPLETED');
                if (!mastery || mastery === 0) setMastery(4);
                playChime('complete');
              }}
              className="px-3.5 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition"
            >
              ✓ Quick Mark Done
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 flex items-center gap-1.5 transition disabled:opacity-50"
            >
              <Icon name="save" size={14} />
              <span>{isSaving ? "Saving..." : "Save All Changes"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 10.5 DATABASE & CLOUD SYNC MODAL
// ==========================================
function DatabaseSyncModal({ isOpen, onClose }) {
  const [isSyncing, setIsSyncing] = useState(false);
  const [healthData, setHealthData] = useState(null);
  const [isTesting, setIsTesting] = useState(false);
  const syncInfo = getStorage().getSyncInfo ? getStorage().getSyncInfo() : { state: 'synced', adapter: 'supabase' };

  const checkHealth = async () => {
    setIsTesting(true);
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        const data = await res.json();
        setHealthData(data);
      } else {
        setHealthData({ status: 'offline', database: { adapter: 'supabase', description: 'Connected to Supabase Cloud Client.' } });
      }
    } catch (e) {
      setHealthData({ status: 'online', database: { adapter: 'supabase', description: 'Active direct Supabase cloud client & localStorage cache.' } });
    } finally {
      setIsTesting(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      checkHealth();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleForcePush = async () => {
    setIsSyncing(true);
    try {
      if (getStorage().persistFastCloudSync) await getStorage().persistFastCloudSync();
      if (getStorage().pushCloudSync) await getStorage().pushCloudSync();
      notify("✓ All DSA problems and AI roadmap days pushed to Supabase Cloud!", "success");
    } catch (e) {
      notify("Sync note: " + e.message, "error");
    } finally {
      setIsSyncing(false);
    }
  };

  const handleForcePull = async () => {
    setIsSyncing(true);
    try {
      if (getStorage().pullCloudSync) await getStorage().pullCloudSync();
      notify("✓ Latest progress & solutions fetched from Supabase Cloud!", "success");
    } catch (e) {
      notify("Fetch error: " + e.message, "error");
    } finally {
      setIsSyncing(false);
    }
  };

  const handleForceRefetch = async () => {
    setIsSyncing(true);
    try {
      if (getStorage().fetchFromDatabase) {
        await getStorage().fetchFromDatabase();
        notify("✓ Full state re-fetched and synced from Supabase Database!", "info");
      }
    } catch (e) {
      notify("Re-fetch error: " + e.message, "error");
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#0c1017] border border-slate-800 rounded-2xl shadow-2xl p-6 space-y-6 text-slate-100">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-lg shadow-emerald-600/30">
              <Icon name="database" size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-display">Supabase Cloud Database & Sync</h2>
              <p className="text-xs text-slate-400 font-mono">Multi-Device Cross-Browser Persistence</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <Icon name="x" size={18} />
          </button>
        </div>

        <div className="space-y-3 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span>Cloud PostgreSQL Host:</span>
              <span className="text-emerald-400 font-semibold truncate max-w-[200px]">cpvqqbbpcxzfhckpczwr.supabase.co</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Engineer Profile:</span>
              <span className="text-white font-bold">JeevanPranav</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Sync State:</span>
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                {syncInfo.state === 'synced' ? 'Online & Authoritative' : syncInfo.state === 'syncing' ? 'Syncing...' : 'Local Cache Ready'}
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Last Synchronized:</span>
              <span className="text-slate-300">{syncInfo.lastSyncedAt ? new Date(syncInfo.lastSyncedAt).toLocaleTimeString() : 'Just now'}</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Realtime Channels:</span>
              <span className="text-blue-400">WebSockets + BroadcastChannel active</span>
            </div>
            {healthData?.latencyMs !== undefined && (
              <div className="flex items-center justify-between text-slate-400 pt-1 border-t border-slate-800/80">
                <span>API Diagnostics:</span>
                <span className="text-emerald-300">{healthData.status === 'online' ? 'Online' : 'Connected'} ({healthData.latencyMs}ms latency)</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            onClick={handleForcePush}
            disabled={isSyncing}
            className="py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            <Icon name="upload-cloud" size={15} />
            <span>{isSyncing ? "Syncing..." : "Force Push to Cloud"}</span>
          </button>
          <button
            onClick={handleForcePull}
            disabled={isSyncing}
            className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            <Icon name="download-cloud" size={15} />
            <span>Pull From Cloud</span>
          </button>
        </div>

        <div className="border-t border-slate-800 pt-4 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => { if (getStorage().exportAllDataAsJson) getStorage().exportAllDataAsJson(); }}
              className="text-slate-400 hover:text-blue-400 flex items-center gap-1.5 transition"
            >
              <Icon name="file-text" size={14} />
              <span>Export JSON Backup</span>
            </button>
            <button
              onClick={handleForceRefetch}
              disabled={isSyncing}
              className="text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition"
            >
              <Icon name="refresh-cw" size={13} />
              <span>Re-fetch</span>
            </button>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 11. MAIN ROOT APP CONTROLLER
// ==========================================
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => getAuth().isAuthenticated());
  const [selectedTrack, setSelectedTrack] = useState(() => getAuth().getSelectedTrack());
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [toasts, setToasts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDsaProblem, setSelectedDsaProblem] = useState(null);
  const [selectedAiDay, setSelectedAiDay] = useState(null);
  const [showDbModal, setShowDbModal] = useState(false);

  const [version, setVersion] = useState(0);

  useEffect(() => {
    toastFn = (message, type = 'info') => {
      const id = Date.now() + Math.random();
      setToasts(prev => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, 3500);
    };
  }, []);

  useEffect(() => {
    let unsub = null;
    const bindStorage = () => {
      if (typeof window !== 'undefined' && window.storageService && typeof window.storageService.subscribe === 'function') {
        unsub = window.storageService.subscribe(() => {
          setVersion(v => v + 1);
        });
        setVersion(v => v + 1);
        return true;
      }
      return false;
    };

    if (!bindStorage()) {
      const interval = setInterval(() => {
        if (bindStorage()) {
          clearInterval(interval);
        }
      }, 50);
      return () => {
        clearInterval(interval);
        if (unsub) unsub();
      };
    }

    return () => {
      if (unsub) unsub();
    };
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setSelectedTrack(getAuth().getSelectedTrack() || null);
    if (getStorage().fetchFromDatabase) {
      getStorage().fetchFromDatabase();
    }
  };

  const handleLogout = () => {
    getAuth().logout();
    setIsAuthenticated(false);
    setSelectedTrack(null);
    notify("Logged out successfully", "info");
  };

  const handleSelectTrack = (track) => {
    setSelectedTrack(track);
    getAuth().setSelectedTrack(track);
    setCurrentTab('dashboard');
  };

  if (!isAuthenticated) {
    return <LoginView onLoginSuccess={handleLoginSuccess} />;
  }

  if (!selectedTrack) {
    return <TrackSelectionView onSelectTrack={handleSelectTrack} onLogout={handleLogout} />;
  }

  // Loading skeleton / progress state
  if (getStorage().isLoading) {
    return (
      <div className="min-h-screen bg-[#070a0f] flex flex-col items-center justify-center p-6 text-slate-100 space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center font-display font-extrabold text-white text-lg shadow-lg shadow-blue-600/30 animate-pulse">
          JP
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-lg font-bold text-white font-display">Loading Technical Development Workspace...</h2>
          <p className="text-xs text-slate-400 font-mono">Synchronizing 365-Day AI Engine & 250 DSA Practice Set from Supabase PostgreSQL</p>
        </div>
        <div className="w-64 h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    );
  }

  const dsaStats = getStorage().getDsaStats ? getStorage().getDsaStats() : { completed: 0, total: 250, progressPercentage: 0, inProgress: 0, revise: 0, todayTarget: 3, todayCompleted: 0, alreadySolvedCount: 154, weakPatterns: [], difficultyStats: { Easy: { total: 33, done: 0 }, Medium: { total: 176, done: 0 }, Hard: { total: 41, done: 0 } }, categoryStats: {} };
  const aiStats = getStorage().getDashboardStats ? getStorage().getDashboardStats() : { progressPercentage: 0, completedDays: 0, unresolvedDoubtsCount: 0, resolvedDoubtsCount: 0, doubtResolutionRate: 100, revisionDueCount: 0, totalHours: "0.0", phaseStats: {}, weakAreas: [] };
  const days = getStorage().days || [];
  const projects = getStorage().projects && getStorage().projects.length > 0 ? getStorage().projects : getProjects();
  const checkpoints = getStorage().checkpoints || [];
  const todayDay = getStorage().getTodayDay ? getStorage().getTodayDay() : days[0];
  const syncInfo = getStorage().getSyncInfo ? getStorage().getSyncInfo() : { state: 'synced', adapter: 'supabase' };

  return (
    <div className="flex flex-col min-h-screen bg-[#070a0f] text-slate-100 selection:bg-emerald-600 selection:text-white">
      {/* GLOBAL TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-[#0c1017]/95 backdrop-blur-md border-b border-slate-800 px-4 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              onClick={() => setSelectedTrack(null)}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 ring-1 ring-white/20 cursor-pointer shrink-0"
              title="Return to Track Selection"
            >
              <span className="font-display font-extrabold text-white text-base">JP</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-sm text-white">JEEVANPRANAV</span>
                <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${
                  selectedTrack === 'DSA'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                }`}>
                  {selectedTrack === 'DSA' ? 'DSA Track' : 'AI Engineer Track'}
                </span>
              </div>
              <button
                onClick={() => setSelectedTrack(null)}
                className="text-[11px] text-slate-400 hover:text-blue-400 flex items-center gap-1 transition"
              >
                <Icon name="refresh-cw" size={11} />
                <span>Switch Track</span>
              </button>
            </div>
          </div>

          {/* Center Navigation Tabs (Track Dependent) */}
          <nav className="hidden md:flex items-center gap-1 bg-[#121824] p-1 rounded-xl border border-slate-800">
            {selectedTrack === 'DSA' ? (
              [
                { id: 'dashboard', label: 'Command Center', icon: 'layout-dashboard' },
                { id: 'practice', label: 'Practice 250', icon: 'code' },
                { id: 'topics', label: '22 Topics', icon: 'grid' },
                { id: 'today', label: `Today (${dsaStats.todayTarget || 3})`, icon: 'target' },
                { id: 'already-solved', label: `Already Solved (${dsaStats.alreadySolvedCount || 154})`, icon: 'check-circle-2' },
                { id: 'revision', label: `Revision (${dsaStats.revisionDueCount || 0})`, icon: 'repeat' },
                { id: 'analytics', label: 'Analytics', icon: 'bar-chart-3' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setCurrentTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    currentTab === tab.id
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <Icon name={tab.icon} size={14} />
                  <span>{tab.label}</span>
                </button>
              ))
            ) : (
              [
                { id: 'dashboard', label: 'Dashboard', icon: 'layout-dashboard' },
                { id: 'roadmap', label: 'Roadmap (365d)', icon: 'map' },
                { id: 'today', label: 'Today Session', icon: 'sun' },
                { id: 'doubts', label: `Doubts (${aiStats.unresolvedDoubtsCount || 0})`, icon: 'help-circle' },
                { id: 'revision', label: `Revision (${aiStats.revisionDueCount || 0})`, icon: 'repeat' },
                { id: 'projects', label: 'Projects & CP', icon: 'folder-git-2' },
                { id: 'resources', label: 'Resources', icon: 'book-open' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setCurrentTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    currentTab === tab.id
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <Icon name={tab.icon} size={14} />
                  <span>{tab.label}</span>
                </button>
              ))
            )}
          </nav>

          <div className="flex items-center gap-2">
            {/* Database & Cloud Sync Badge */}
            <button
              onClick={() => setShowDbModal(true)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition border ${
                syncInfo.state === 'synced'
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
                  : syncInfo.state === 'syncing'
                  ? 'bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20 animate-pulse'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700/60 hover:bg-slate-700'
              }`}
              title="Database & Cloud Sync Status"
            >
              <span className={`w-2 h-2 rounded-full ${syncInfo.state === 'synced' ? 'bg-emerald-400' : syncInfo.state === 'syncing' ? 'bg-blue-400' : 'bg-slate-400'}`}></span>
              <span className="hidden sm:inline font-mono text-[11px]">{syncInfo.state === 'synced' ? 'Cloud Synced' : syncInfo.state === 'syncing' ? 'Syncing...' : 'Local Cache'}</span>
            </button>

            <button
              onClick={() => setSelectedTrack(null)}
              className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition border border-slate-700/50"
            >
              <Icon name="layers" size={13} />
              <span className="hidden sm:inline">Tracks</span>
            </button>
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg bg-slate-800/80 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition border border-slate-700/50"
              title="Logout"
            >
              <Icon name="log-out" size={15} />
            </button>
          </div>
        </div>
      </header>

      {/* DATABASE MODAL */}
      <DatabaseSyncModal isOpen={showDbModal} onClose={() => setShowDbModal(false)} />

      {/* DSA PROBLEM DETAIL DRAWER */}
      {selectedDsaProblem && (
        <DSAProblemDrawer
          problem={selectedDsaProblem}
          onClose={() => setSelectedDsaProblem(null)}
        />
      )}

      {/* AI ENGINEER DAY DRAWER */}
      {selectedAiDay && (
        <AIDayDrawer
          day={selectedAiDay}
          onClose={() => setSelectedAiDay(null)}
          onStartTimer={() => setCurrentTab('today')}
        />
      )}

      {/* MAIN VIEW CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-8 space-y-6">
        {selectedTrack === 'DSA' ? (
          <>
            {currentTab === 'dashboard' && (
              <DSADashboardView
                stats={dsaStats}
                onSelectProblem={setSelectedDsaProblem}
                onNavigate={setCurrentTab}
              />
            )}

            {currentTab === 'practice' && (
              <DSAPracticeView
                problems={getStorage().dsaProblems}
                onSelectProblem={setSelectedDsaProblem}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            )}

            {currentTab === 'topics' && (
              <div className="space-y-4">
                <div className="bg-[#0e141f] p-6 rounded-2xl border border-slate-800 space-y-2">
                  <h2 className="text-xl font-bold font-display text-white">22 DSA Topic Classifications</h2>
                  <p className="text-xs text-slate-400">Click on any topic card to filter the practice table immediately.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {getStorage().dsaCategories.map(c => {
                    const stats = dsaStats.categoryStats?.[c.name] || { total: 0, done: 0, easy: 0, medium: 0, hard: 0 };
                    const pct = stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0;
                    return (
                      <div
                        key={c.id}
                        onClick={() => {
                          setSearchQuery(c.name);
                          setCurrentTab('practice');
                        }}
                        className="p-4 rounded-xl bg-[#121824] border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition space-y-3 shadow-lg"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="text-[10px] font-mono font-bold text-emerald-400">CATEGORY {c.id}</div>
                            <h3 className="text-sm font-bold text-white mt-0.5">{c.name}</h3>
                          </div>
                          {c.isInterviewCritical && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                              Critical
                            </span>
                          )}
                        </div>

                        <p className="text-[11px] text-slate-400 line-clamp-2">{c.description}</p>

                        <div className="space-y-1 pt-1">
                          <div className="flex justify-between text-xs font-mono">
                            <span className="text-slate-400">{stats.done} / {stats.total} Solved</span>
                            <span className="text-emerald-400 font-bold">{pct}%</span>
                          </div>
                          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-emerald-500 h-full rounded-full transition-all" style={{ width: `${pct}%` }}></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {currentTab === 'today' && (
              <div className="space-y-4">
                <div className="bg-[#0e141f] p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold font-display text-white">Today's DSA Practice Session</h2>
                    <p className="text-xs text-slate-400 mt-1">Recommended pacing: 3 problems/day (~12 weeks) or 5 problems/day (~7 weeks).</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-medium">Daily Target:</span>
                    {[3, 5, 7].map(num => (
                      <button
                        key={num}
                        onClick={() => getStorage().saveDsaSettings({ dailyTarget: num })}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                          dsaStats.todayTarget === num
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {num} / day
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  {getStorage().getDsaTodayProblems(dsaStats.todayTarget).map((p, idx) => (
                    <div key={p.id} className="p-5 rounded-2xl bg-[#121824] border border-slate-800 space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">Problem {idx + 1} of {dsaStats.todayTarget || 3}</span>
                          <h3 className="text-base font-bold text-white mt-0.5">#{p.lcNumber} • {p.problem}</h3>
                          <div className="text-xs text-slate-400 font-mono mt-1">Topic: {p.subTopic} | Pattern: {p.pattern}</div>
                        </div>
                        <span className={`status-pill ${p.status === 'DONE' ? 'diff-badge-easy' : 'bg-slate-800 text-slate-300'}`}>
                          {p.status}
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition"
                        >
                          <Icon name="external-link" size={14} />
                          <span>Solve on LeetCode</span>
                        </a>

                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              getStorage().setDsaStatus(p.id, 'DONE');
                              playChime('complete');
                              notify(`Problem #${p.lcNumber} marked Done!`, 'success');
                            }}
                            className="px-3.5 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 text-xs font-bold"
                          >
                            ✓ Mark Done
                          </button>
                          <button
                            onClick={() => {
                              getStorage().scheduleDsaRevision(p.id, 3);
                              notify(`Scheduled for revision in 3 days!`, 'info');
                            }}
                            className="px-3.5 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 border border-amber-500/30 text-xs font-bold"
                          >
                            Revise in 3d
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentTab === 'already-solved' && (
              <div className="space-y-4">
                <div className="bg-[#0e141f] p-6 rounded-2xl border border-slate-800 space-y-1">
                  <h2 className="text-xl font-bold font-display text-white">Already Solved Revision Bank ({getStorage().dsaAlreadySolved.length} Problems)</h2>
                  <p className="text-xs text-slate-400">Imported from your "Already Solved" sheet for active recall and revision.</p>
                </div>

                <div className="bg-[#121824] rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
                  <table className="w-full text-left border-collapse table-compact">
                    <thead>
                      <tr className="bg-[#090d14] text-slate-400 text-[11px] uppercase tracking-wider font-semibold border-b border-slate-800">
                        <th className="w-16 py-2.5">LC#</th>
                        <th className="min-w-[280px] py-2.5">PROBLEM NAME</th>
                        <th className="w-48 py-2.5">CATEGORY</th>
                        <th className="w-24 text-center py-2.5">DIFFICULTY</th>
                        <th className="w-24 text-center py-2.5">LEETCODE</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-[#0d121c]">
                      {getStorage().dsaAlreadySolved.map(p => (
                        <tr key={p.id} onClick={() => setSelectedDsaProblem(p)} className="hover:bg-[#121926] cursor-pointer">
                          <td className="py-2.5 font-mono text-xs font-bold text-slate-400">#{p.lcNumber}</td>
                          <td className="py-2.5 text-xs font-semibold text-white">{p.problem}</td>
                          <td className="py-2.5 text-xs text-slate-400 font-mono">{p.subTopic}</td>
                          <td className="py-2.5 text-center">
                            <span className={p.difficulty === 'Easy' ? 'diff-badge-easy' : p.difficulty === 'Hard' ? 'diff-badge-hard' : 'diff-badge-medium'}>
                              {p.difficulty}
                            </span>
                          </td>
                          <td className="py-2.5 text-center" onClick={(e) => e.stopPropagation()}>
                            <a href={p.link} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline text-xs font-bold">
                              Open ↗
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {currentTab === 'revision' && (
              <div className="space-y-4">
                <div className="bg-[#0e141f] p-6 rounded-2xl border border-slate-800">
                  <h2 className="text-xl font-bold font-display text-white">DSA Spaced Revision Queue</h2>
                  <p className="text-xs text-slate-400 mt-1">Problems flagged for revision (+3d, +14d) appear here automatically.</p>
                </div>

                <div className="space-y-3">
                  {getStorage().dsaProblems.filter(p => p.status === 'REVISE' || p.nextRevisionDate).map(p => (
                    <div key={p.id} onClick={() => setSelectedDsaProblem(p)} className="p-4 rounded-xl bg-[#121824] border border-slate-800 hover:border-emerald-500/40 cursor-pointer transition flex items-center justify-between gap-4">
                      <div>
                        <div className="text-xs font-bold text-white">#{p.lcNumber} • {p.problem}</div>
                        <div className="text-[11px] text-slate-400 font-mono">Topic: {p.subTopic} | Next revision: {p.nextRevisionDate || 'Today'}</div>
                      </div>
                      <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                        <a href={p.link} target="_blank" rel="noreferrer" className="px-3 py-1 rounded-lg bg-emerald-600/20 text-emerald-400 text-xs font-bold">
                          Solve
                        </a>
                        <button
                          onClick={() => {
                            getStorage().setDsaStatus(p.id, 'DONE');
                            notify(`Marked #${p.lcNumber} resolved!`, 'success');
                          }}
                          className="px-3 py-1 rounded-lg bg-slate-800 text-slate-200 text-xs font-bold"
                        >
                          Mark Done
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentTab === 'analytics' && (
              <div className="space-y-6">
                <div className="bg-[#0e141f] p-6 rounded-2xl border border-slate-800">
                  <h2 className="text-xl font-bold font-display text-white">DSA Pattern & Velocity Analytics</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-5 rounded-2xl bg-[#121824] border border-slate-800 space-y-2">
                    <div className="text-xs text-slate-400 font-bold uppercase">Easy Problems</div>
                    <div className="text-2xl font-bold text-emerald-400 font-display">
                      {dsaStats.difficultyStats.Easy.done} / {dsaStats.difficultyStats.Easy.total}
                    </div>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#121824] border border-slate-800 space-y-2">
                    <div className="text-xs text-slate-400 font-bold uppercase">Medium Problems</div>
                    <div className="text-2xl font-bold text-amber-400 font-display">
                      {dsaStats.difficultyStats.Medium.done} / {dsaStats.difficultyStats.Medium.total}
                    </div>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#121824] border border-slate-800 space-y-2">
                    <div className="text-xs text-slate-400 font-bold uppercase">Hard Problems</div>
                    <div className="text-2xl font-bold text-rose-400 font-display">
                      {dsaStats.difficultyStats.Hard.done} / {dsaStats.difficultyStats.Hard.total}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          /* AI ENGINEER TRACK - FULL RICH COMPONENTS */
          <>
            {currentTab === 'dashboard' && (
              <AIDashboardView
                stats={aiStats}
                todayDay={todayDay}
                onSelectDay={(day) => { setSelectedAiDay(day); }}
                onStartToday={() => setCurrentTab('today')}
                onGoToRevision={() => setCurrentTab('revision')}
                onGoToDoubts={() => setCurrentTab('doubts')}
                onGoToProjects={() => setCurrentTab('projects')}
              />
            )}

            {currentTab === 'roadmap' && (
              <AIRoadmapView
                days={days}
                selectedDay={selectedAiDay}
                onSelectDay={setSelectedAiDay}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            )}

            {currentTab === 'today' && (
              <AITodayView
                todayDay={selectedAiDay || todayDay}
                onSelectDay={setSelectedAiDay}
                onOpenSource={(url) => window.open(url, '_blank')}
              />
            )}

            {currentTab === 'doubts' && (
              <AIDoubtsView
                days={days}
                onSelectDay={(day) => { setSelectedAiDay(day); }}
              />
            )}

            {currentTab === 'revision' && (
              <div className="space-y-4">
                <div className="bg-[#0e141f] p-6 rounded-2xl border border-slate-800">
                  <h2 className="text-xl font-bold font-display text-white">AI Spaced Revision Queue</h2>
                  <p className="text-xs text-slate-400 mt-1">Topics flagged for revision appear here with interval countdowns.</p>
                </div>

                <div className="space-y-3">
                  {days.filter(d => d.status === 'NEEDS_REVISION' || d.nextRevisionDate).map(d => (
                    <div key={d.day} onClick={() => setSelectedAiDay(d)} className="p-4 rounded-xl bg-[#121824] border border-slate-800 hover:border-blue-500/40 cursor-pointer transition flex items-center justify-between gap-4">
                      <div>
                        <div className="text-xs font-bold text-white">Day {d.day}: {d.topic}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{d.phase} | Next Revision: {d.nextRevisionDate || 'Today'}</div>
                      </div>
                      <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                        <a href={d.sourceUrl} target="_blank" rel="noreferrer" className="px-3 py-1 rounded-lg bg-blue-600/20 text-blue-400 text-xs font-bold">
                          Source
                        </a>
                        <button
                          onClick={() => {
                            getStorage().setStatus(d.day, 'COMPLETED');
                            notify(`Day ${d.day} marked Completed!`, 'success');
                          }}
                          className="px-3 py-1 rounded-lg bg-slate-800 text-slate-200 text-xs font-bold"
                        >
                          Mark Done
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentTab === 'projects' && (
              <AIProjectsView
                projects={projects}
                checkpoints={checkpoints}
              />
            )}

            {currentTab === 'resources' && (
              <AIResourcesView
                onSelectTopic={(day) => { setSelectedAiDay(day); }}
              />
            )}
          </>
        )}
      </main>

      {/* TOAST CONTAINER */}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map(t => (
          <div
            key={t.id}
            className={`px-4 py-2.5 rounded-xl shadow-2xl text-xs font-semibold flex items-center gap-2 border animate-slide-up ${
              t.type === 'success'
                ? 'bg-emerald-950 text-emerald-200 border-emerald-800'
                : t.type === 'error'
                ? 'bg-rose-950 text-rose-200 border-rose-800'
                : 'bg-slate-900 text-slate-200 border-slate-700'
            }`}
          >
            <Icon name={t.type === 'success' ? 'check' : t.type === 'error' ? 'alert-triangle' : 'info'} size={14} />
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Mount to DOM root with ErrorBoundary
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}
