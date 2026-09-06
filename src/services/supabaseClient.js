// supabaseClient.js - Robust Client & Realtime Manager for Supabase Cloud Database
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.49.1/+esm';

// Default / Environment Configuration
export const SUPABASE_URL = (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SUPABASE_URL) 
  || window.SUPABASE_URL 
  || 'https://cpvqqbbpcxzfhckpczwr.supabase.co';

export const SUPABASE_ANON_KEY = (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY) 
  || window.SUPABASE_ANON_KEY 
  || 'sb_publishable_VzkHQZKNoHRQWa0FsfrdMg_6IzW91Le';

// Single Supabase Client instance with persistent session storage & realtime auto-reconnect
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

class SupabaseManager {
  constructor() {
    this.client = supabase;
    this.isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
    this.channels = new Map();
    this.connectionListeners = new Set();
    this.setupNetworkListeners();
  }

  setupNetworkListeners() {
    if (typeof window === 'undefined') return;

    window.addEventListener('online', () => {
      this.isOnline = true;
      this.notifyConnectionState(true);
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
      this.notifyConnectionState(false);
    });
  }

  onConnectionChange(callback) {
    this.connectionListeners.add(callback);
    return () => this.connectionListeners.delete(callback);
  }

  notifyConnectionState(status) {
    for (const listener of this.connectionListeners) {
      try {
        listener(status);
      } catch (e) {
        console.error("Connection listener error:", e);
      }
    }
  }

  /**
   * Subscribe to real-time changes on a specific table for a given user
   */
  subscribeToTable(tableName, filterColumn, filterValue, callback) {
    const channelKey = `${tableName}_${filterColumn}_${filterValue}`;
    if (this.channels.has(channelKey)) {
      return this.channels.get(channelKey);
    }

    const channel = this.client
      .channel(`public:${channelKey}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: tableName,
          filter: filterColumn && filterValue ? `${filterColumn}=eq.${filterValue}` : undefined
        },
        (payload) => {
          if (typeof callback === 'function') {
            callback(payload);
          }
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          // Channel active
        }
      });

    this.channels.set(channelKey, channel);

    return () => {
      this.client.removeChannel(channel);
      this.channels.delete(channelKey);
    };
  }

  /**
   * Universal health & connectivity ping
   */
  async checkHealth() {
    try {
      const start = Date.now();
      const { data, error } = await this.client
        .from('dsa_categories')
        .select('id')
        .limit(1);
      
      const latency = Date.now() - start;
      if (error) {
        return { connected: false, error: error.message, latency };
      }
      return { connected: true, latency, timestamp: new Date().toISOString() };
    } catch (e) {
      return { connected: false, error: e.message, latency: 0 };
    }
  }
}

export const supabaseManager = new SupabaseManager();

if (typeof window !== 'undefined') {
  window.supabase = supabase;
  window.supabaseManager = supabaseManager;
}
