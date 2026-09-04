// App.jsx - Complete Multi-Track Application for JEEVANPRANAV TECHNICAL DEVELOPMENT TRACKER
// Tracks: 1. AI ENGINEER (365-Day Engine) | 2. DATA STRUCTURES & ALGORITHMS (250 Practice Set & 154 Revision)

const getAuth = () => {
  if (typeof window !== 'undefined' && window.authService) return window.authService;
  return {
    login: (u, p) => {
      if ((u || '').trim() === "JeevanPranav" && p === "Kangeyam(890)") {
        const session = { authenticated: true, user: { username: "JeevanPranav", name: "JeevanPranav", loginTime: new Date().toISOString() } };
        localStorage.setItem("jeevanpranav_auth_session", JSON.stringify(session));
        return { success: true, user: session.user };
      }
      return { success: false, error: "Invalid username or password. Access restricted to authorized engineer." };
    },
    logout: () => {
      localStorage.removeItem("jeevanpranav_auth_session");
      localStorage.removeItem("jeevanpranav_selected_track");
    },
    isAuthenticated: () => {
      try {
        const raw = localStorage.getItem("jeevanpranav_auth_session");
        return raw ? JSON.parse(raw).authenticated : false;
      } catch (e) { return false; }
    },
    getSelectedTrack: () => {
      try { return localStorage.getItem("jeevanpranav_selected_track"); } catch (e) { return null; }
    },
    setSelectedTrack: (track) => {
      if (track) localStorage.setItem("jeevanpranav_selected_track", track);
      else localStorage.removeItem("jeevanpranav_selected_track");
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
    return '';
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

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const res = getAuth().login(username, password);
      if (res.success) {
        notify("Welcome back, JeevanPranav!", "success");
        onLoginSuccess();
      } else {
        setError(res.error || "Invalid username or password");
        setIsLoading(false);
      }
    }, 150);
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
  return (
    <div className="space-y-6 animate-fade-in">
      {/* HERO BANNER */}
      <div className="bg-gradient-to-r from-[#0d1624] via-[#0f1d2e] to-[#0d1624] border border-slate-800 rounded-2xl p-6 lg:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
              <span className="text-xs uppercase font-mono font-bold tracking-wider text-blue-400">
                GOOD EVENING, JEEVANPRANAV
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
          <div className="text-2xl font-extrabold text-blue-400 font-display">{stats.progressPercentage}%</div>
          <div className="text-[11px] text-slate-400">{stats.completedDays} of 365 Days</div>
        </div>

        <div className="bg-[#121824] p-4 rounded-xl border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 font-medium">In Progress</div>
          <div className="text-2xl font-extrabold text-cyan-400 font-display">{stats.inProgressDays}</div>
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
          <div className="text-2xl font-extrabold text-amber-400 font-display">{stats.unresolvedDoubtsCount}</div>
          <div className="text-[11px] text-slate-400">{stats.resolvedDoubtsCount} resolved ({stats.doubtResolutionRate}%)</div>
        </div>

        <div
          onClick={onGoToRevision}
          className="bg-[#121824] p-4 rounded-xl border border-slate-800 hover:border-indigo-500/50 cursor-pointer transition space-y-1"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Revision Due</span>
            <Icon name="repeat" size={14} className="text-indigo-400" />
          </div>
          <div className="text-2xl font-extrabold text-indigo-400 font-display">{stats.revisionDueCount}</div>
          <div className="text-[11px] text-slate-400">Spaced rep queue</div>
        </div>

        <div className="bg-[#121824] p-4 rounded-xl border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 font-medium">Time Logged</div>
          <div className="text-2xl font-extrabold text-purple-400 font-display">{stats.totalHours}h</div>
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
            <span className="text-xs font-mono text-slate-400">{stats.weakAreas.length} detected</span>
          </div>

          <div className="space-y-2.5 overflow-y-auto max-h-[220px] pr-1">
            {stats.weakAreas.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-xs space-y-2">
                <Icon name="check-circle-2" size={32} className="mx-auto text-emerald-500/60" />
                <p>No severe weak areas detected yet!</p>
                <p className="text-[11px] text-slate-600">Topics with mastery ≤ 2 or unresolved doubts will surface here automatically.</p>
              </div>
            ) : (
              stats.weakAreas.slice(0, 4).map(item => (
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
          {Object.entries(stats.phaseStats).map(([phaseName, p]) => {
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
function AIProjectsView({ projects, checkpoints }) {
  const [selectedProject, setSelectedProject] = useState(projects[0] || null);

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
                DSA Command Center • LeetCode 250
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
          if (catProblems.length === 0 && topicFilter !== 'ALL') return null;

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
// 10. MAIN ROOT APP CONTROLLER
// ==========================================
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => getAuth().isAuthenticated());
  const [selectedTrack, setSelectedTrack] = useState(() => getAuth().getSelectedTrack());
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [toasts, setToasts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDsaProblem, setSelectedDsaProblem] = useState(null);
  const [selectedAiDay, setSelectedAiDay] = useState(null);

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
    const unsubscribe = getStorage().subscribe(() => {
      setVersion(v => v + 1);
    });
    return unsubscribe;
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setSelectedTrack(getAuth().getSelectedTrack() || null);
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

  const dsaStats = getStorage().getDsaStats();
  const aiStats = getStorage().getDashboardStats();
  const days = getStorage().days;
  const projects = getStorage().projects.length > 0 ? getStorage().projects : getProjects();
  const checkpoints = getStorage().checkpoints;
  const todayDay = getStorage().getTodayDay();

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
                { id: 'today', label: `Today (${dsaStats.todayTarget})`, icon: 'target' },
                { id: 'already-solved', label: `Already Solved (${dsaStats.alreadySolvedCount})`, icon: 'check-circle-2' },
                { id: 'revision', label: `Revision (${dsaStats.revisionDueCount})`, icon: 'repeat' },
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
                { id: 'doubts', label: `Doubts (${aiStats.unresolvedDoubtsCount})`, icon: 'help-circle' },
                { id: 'revision', label: `Revision (${aiStats.revisionDueCount})`, icon: 'repeat' },
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
                    const stats = dsaStats.categoryStats[c.name] || { total: 0, done: 0, easy: 0, medium: 0, hard: 0 };
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
                          <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">Problem {idx + 1} of {dsaStats.todayTarget}</span>
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
                        <tr key={p.id} className="hover:bg-[#121926]">
                          <td className="py-2.5 font-mono text-xs font-bold text-slate-400">#{p.lcNumber}</td>
                          <td className="py-2.5 text-xs font-semibold text-white">{p.problem}</td>
                          <td className="py-2.5 text-xs text-slate-400 font-mono">{p.subTopic}</td>
                          <td className="py-2.5 text-center">
                            <span className={p.difficulty === 'Easy' ? 'diff-badge-easy' : p.difficulty === 'Hard' ? 'diff-badge-hard' : 'diff-badge-medium'}>
                              {p.difficulty}
                            </span>
                          </td>
                          <td className="py-2.5 text-center">
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
                    <div key={p.id} className="p-4 rounded-xl bg-[#121824] border border-slate-800 flex items-center justify-between gap-4">
                      <div>
                        <div className="text-xs font-bold text-white">#{p.lcNumber} • {p.problem}</div>
                        <div className="text-[11px] text-slate-400 font-mono">Topic: {p.subTopic} | Next revision: {p.nextRevisionDate || 'Today'}</div>
                      </div>
                      <div className="flex gap-2">
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
                onSelectDay={(day) => { setSelectedAiDay(day); setCurrentTab('roadmap'); }}
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
                onSelectDay={(day) => { setSelectedAiDay(day); setCurrentTab('roadmap'); }}
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
                    <div key={d.day} className="p-4 rounded-xl bg-[#121824] border border-slate-800 flex items-center justify-between gap-4">
                      <div>
                        <div className="text-xs font-bold text-white">Day {d.day}: {d.topic}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{d.phase} | Next Revision: {d.nextRevisionDate || 'Today'}</div>
                      </div>
                      <div className="flex gap-2">
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
                onSelectTopic={(day) => { setSelectedAiDay(day); setCurrentTab('roadmap'); }}
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

// Mount to DOM root
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
