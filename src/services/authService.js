// authService.js - Supabase Authentication & Multi-Device Session Management
import { supabase } from './supabaseClient.js';

export const AUTH_CONFIG = {
  USERNAME: "JeevanPranav",
  PASSWORD: "Kangeyam(890)",
  EMAIL: "jeevanpranav@engineer.local",
  DISPLAY_NAME: "JeevanPranav"
};

const SESSION_KEY = "jeevanpranav_supabase_session";
const TRACK_KEY = "jeevanpranav_selected_track";

class AuthService {
  constructor() {
    this.subscribers = [];
    this.currentUser = null;
    this.session = null;
    this.init();
  }

  async init() {
    try {
      // 1. Restore local cache for instant UI rendering
      const cached = this.getCachedSession();
      if (cached && cached.authenticated) {
        this.currentUser = cached.user;
        this.session = cached;
      }

      // 2. Fetch live Supabase Auth session
      if (supabase && supabase.auth) {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (session && session.user) {
          this.currentUser = {
            id: session.user.id,
            email: session.user.email,
            username: AUTH_CONFIG.USERNAME,
            name: AUTH_CONFIG.DISPLAY_NAME,
            loginTime: new Date().toISOString()
          };
          this.session = {
            authenticated: true,
            user: this.currentUser,
            token: session.access_token
          };
          this.cacheSession(this.session);
          this.notify();
        }

        // Listen for Supabase auth state transitions
        supabase.auth.onAuthStateChange((event, session) => {
          if (event === 'SIGNED_IN' && session) {
            this.currentUser = {
              id: session.user.id,
              email: session.user.email,
              username: AUTH_CONFIG.USERNAME,
              name: AUTH_CONFIG.DISPLAY_NAME,
              loginTime: new Date().toISOString()
            };
            this.session = { authenticated: true, user: this.currentUser, token: session.access_token };
            this.cacheSession(this.session);
            this.notify();
          } else if (event === 'SIGNED_OUT') {
            this.currentUser = null;
            this.session = null;
            this.clearCachedSession();
            this.notify();
          }
        });
      }
    } catch (e) {
      console.warn("Auth initialization note:", e.message);
    }
  }

  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  notify() {
    const sess = this.getSession();
    this.subscribers.forEach(cb => {
      try { cb(sess); } catch (e) {}
    });
  }

  async login(usernameOrEmail, password) {
    const rawInput = (usernameOrEmail || '').trim();
    if (!rawInput || !password) {
      return { success: false, error: "Please enter both username and password." };
    }

    // Verify personal credentials
    const isMatchingUsername = rawInput.toLowerCase() === AUTH_CONFIG.USERNAME.toLowerCase();
    const isMatchingEmail = rawInput.toLowerCase() === AUTH_CONFIG.EMAIL.toLowerCase();
    const isPasswordValid = password === AUTH_CONFIG.PASSWORD;

    if (!isPasswordValid || (!isMatchingUsername && !isMatchingEmail)) {
      return {
        success: false,
        error: "Invalid username or password. Access restricted to authorized engineer."
      };
    }

    const email = isMatchingEmail ? rawInput : AUTH_CONFIG.EMAIL;

    try {
      // 1. Attempt Supabase Auth SignIn
      let authUser = null;
      let token = null;

      if (supabase && supabase.auth) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (!error && data?.user) {
          authUser = data.user;
          token = data.session?.access_token;
        } else if (error && (error.message.includes('Invalid login') || error.message.includes('User not found'))) {
          // If user does not exist in Supabase auth yet, auto-provision
          const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                username: AUTH_CONFIG.USERNAME,
                display_name: AUTH_CONFIG.DISPLAY_NAME
              }
            }
          });
          if (!signUpError && signUpData?.user) {
            authUser = signUpData.user;
            token = signUpData.session?.access_token;
          }
        }
      }

      // Build authenticated session object
      this.currentUser = {
        id: authUser?.id || "jeevanpranav-primary-user",
        username: AUTH_CONFIG.USERNAME,
        email: email,
        name: AUTH_CONFIG.DISPLAY_NAME,
        loginTime: new Date().toISOString()
      };

      this.session = {
        authenticated: true,
        user: this.currentUser,
        token: token
      };

      this.cacheSession(this.session);
      this.notify();

      return { success: true, user: this.currentUser };
    } catch (err) {
      console.error("Login process error:", err);
      // Resilient fallback with valid credential
      this.currentUser = {
        id: "jeevanpranav-primary-user",
        username: AUTH_CONFIG.USERNAME,
        email: AUTH_CONFIG.EMAIL,
        name: AUTH_CONFIG.DISPLAY_NAME,
        loginTime: new Date().toISOString()
      };
      this.session = { authenticated: true, user: this.currentUser };
      this.cacheSession(this.session);
      this.notify();
      return { success: true, user: this.currentUser };
    }
  }

  async logout() {
    try {
      if (supabase && supabase.auth) {
        await supabase.auth.signOut();
      }
    } catch (e) {
      console.warn("Supabase signOut error:", e);
    }

    this.currentUser = null;
    this.session = null;
    this.clearCachedSession();
    this.notify();
  }

  getSession() {
    if (this.session && this.session.authenticated) {
      return this.session;
    }
    const cached = this.getCachedSession();
    if (cached && cached.authenticated) {
      this.session = cached;
      this.currentUser = cached.user;
      return cached;
    }
    return { authenticated: false, user: null };
  }

  isAuthenticated() {
    return this.getSession().authenticated;
  }

  getCurrentUser() {
    return this.getSession().user;
  }

  getUserId() {
    const user = this.getCurrentUser();
    return user ? (user.id || user.username || "JeevanPranav") : "JeevanPranav";
  }

  getCachedSession() {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return null;
  }

  cacheSession(session) {
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } catch (e) {}
  }

  clearCachedSession() {
    try {
      localStorage.removeItem(SESSION_KEY);
      localStorage.removeItem(TRACK_KEY);
    } catch (e) {}
  }

  getSelectedTrack() {
    try {
      return localStorage.getItem(TRACK_KEY) || null;
    } catch (e) {
      return null;
    }
  }

  setSelectedTrack(track) {
    try {
      if (track) localStorage.setItem(TRACK_KEY, track);
      else localStorage.removeItem(TRACK_KEY);
    } catch (e) {}
    this.notify();
  }
}

export const authService = new AuthService();

if (typeof window !== 'undefined') {
  window.authService = authService;
}
