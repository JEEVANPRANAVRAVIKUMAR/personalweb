// activityService.js - Timezone-Aware Activity, Streak & Analytics Engine (Asia/Kolkata)
import { supabase } from './supabaseClient.js';

export const TIMEZONE = 'Asia/Kolkata';

export class ActivityService {
  /**
   * Get current formatted date string in Asia/Kolkata timezone (YYYY-MM-DD)
   */
  static getTodayDateString(offsetDays = 0) {
    const now = new Date();
    if (offsetDays !== 0) {
      now.setDate(now.getDate() + offsetDays);
    }
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: TIMEZONE,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    return formatter.format(now);
  }

  /**
   * Get current greeting in Asia/Kolkata
   */
  static getGreeting() {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: TIMEZONE,
      hour: 'numeric',
      hour12: false
    });
    const hour = parseInt(formatter.format(new Date()), 10);
    if (hour < 12) return "GOOD MORNING";
    if (hour < 17) return "GOOD AFTERNOON";
    return "GOOD EVENING";
  }

  /**
   * Calculate current streak from activity records and problem solve dates
   */
  static calculateStreak(activityDates = []) {
    if (!activityDates || activityDates.length === 0) return 0;

    const uniqueDates = Array.from(new Set(activityDates))
      .filter(Boolean)
      .sort((a, b) => b.localeCompare(a)); // Descending

    if (uniqueDates.length === 0) return 0;

    const today = this.getTodayDateString();
    const yesterday = this.getTodayDateString(-1);

    // If no activity today or yesterday, streak is broken
    const mostRecent = uniqueDates[0];
    if (mostRecent !== today && mostRecent !== yesterday) {
      return 0;
    }

    let streak = 0;
    let expectedDate = mostRecent;

    for (let i = 0; i < uniqueDates.length; i++) {
      if (uniqueDates[i] === expectedDate) {
        streak++;
        // Compute previous day string
        const prev = new Date(expectedDate);
        prev.setDate(prev.getDate() - 1);
        expectedDate = prev.toISOString().split('T')[0];
      } else {
        break;
      }
    }

    return streak;
  }

  /**
   * Record an action in daily_activity table
   */
  static async recordActivity(userId = 'JeevanPranav', { dsaCompleted = 0, aiCompleted = 0, studyMinutes = 0, doubts = 0, revisions = 0 }) {
    try {
      const today = this.getTodayDateString();
      const now = new Date().toISOString();

      // Fetch today's current record
      const { data: current } = await supabase
        .from('daily_activity')
        .select('*')
        .match({ user_id: userId, activity_date: today })
        .single();

      const payload = {
        user_id: userId,
        activity_date: today,
        dsa_completed_count: (current?.dsa_completed_count || 0) + dsaCompleted,
        ai_completed_count: (current?.ai_completed_count || 0) + aiCompleted,
        study_minutes: (current?.study_minutes || 0) + studyMinutes,
        doubts_count: (current?.doubts_count || 0) + doubts,
        revisions_count: (current?.revisions_count || 0) + revisions,
        updated_at: now
      };

      const { data, error } = await supabase
        .from('daily_activity')
        .upsert(payload, { onConflict: 'user_id,activity_date' })
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  /**
   * Fetch recent daily activity history for analytics & heatmap
   */
  static async getActivityHistory(userId = 'JeevanPranav', days = 60) {
    try {
      const { data, error } = await supabase
        .from('daily_activity')
        .select('*')
        .or(`user_id.eq.${userId},user_id.eq.JeevanPranav`)
        .order('activity_date', { ascending: false })
        .limit(days);

      if (error) throw error;
      return { success: true, data: data || [] };
    } catch (e) {
      return { success: false, data: [] };
    }
  }
}

if (typeof window !== 'undefined') {
  window.ActivityService = ActivityService;
}
