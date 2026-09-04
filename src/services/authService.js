// authService.js - Personal Authentication & Session Management
export const AUTH_CONFIG = {
  USERNAME: "JeevanPranav",
  PASSWORD: "Kangeyam(890)",
  DISPLAY_NAME: "JeevanPranav"
};

const SESSION_KEY = "jeevanpranav_auth_session";
const TRACK_KEY = "jeevanpranav_selected_track";

class AuthService {
  constructor() {
    this.subscribers = [];
  }

  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  notify() {
    this.subscribers.forEach(cb => cb(this.getSession()));
  }

  login(username, password) {
    if (!username || !password) {
      return { success: false, error: "Please enter both username and password." };
    }

    if (username.trim() === AUTH_CONFIG.USERNAME && password === AUTH_CONFIG.PASSWORD) {
      const session = {
        authenticated: true,
        user: {
          username: AUTH_CONFIG.USERNAME,
          name: AUTH_CONFIG.DISPLAY_NAME,
          loginTime: new Date().toISOString()
        }
      };
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      this.notify();
      return { success: true, user: session.user };
    }

    return { success: false, error: "Invalid username or password. Access restricted to authorized engineer." };
  }

  logout() {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(TRACK_KEY);
    this.notify();
  }

  getSession() {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.authenticated) {
          return parsed;
        }
      }
    } catch (e) {}
    return { authenticated: false, user: null };
  }

  isAuthenticated() {
    return this.getSession().authenticated;
  }

  getCurrentUser() {
    return this.getSession().user;
  }

  getSelectedTrack() {
    try {
      return localStorage.getItem(TRACK_KEY) || null; // 'AI', 'DSA', or null
    } catch (e) {
      return null;
    }
  }

  setSelectedTrack(track) {
    if (track) {
      localStorage.setItem(TRACK_KEY, track);
    } else {
      localStorage.removeItem(TRACK_KEY);
    }
    this.notify();
  }
}

export const authService = new AuthService();

if (typeof window !== 'undefined') {
  window.authService = authService;
}
