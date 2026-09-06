// dsaService.js - Supabase Data Access Layer for DSA Track
import { supabase, supabaseManager } from './supabaseClient.js';
import { DSA_CATEGORIES } from '../data/dsaDataset.js';

export class DsaService {
  /**
   * Fetch all DSA master problems merged with the authenticated user's progress
   */
  static async getMergedProblems(userId = 'JeevanPranav') {
    try {
      // 1. Fetch master problems
      const { data: masterProblems, error: masterErr } = await supabase
        .from('dsa_problems')
        .select('*')
        .order('original_order', { ascending: true });

      if (masterErr || !masterProblems || masterProblems.length === 0) {
        // Fallback to local dataset if database is freshly deployed before migration
        return { success: false, error: masterErr?.message, useFallback: true };
      }

      // 2. Fetch user progress
      const { data: progressRows, error: progErr } = await supabase
        .from('dsa_problem_progress')
        .select('*')
        .or(`user_id.eq.${userId},user_id.eq.JeevanPranav`);

      const progressMap = new Map();
      if (progressRows) {
        progressRows.forEach(p => {
          progressMap.set(p.problem_id, p);
        });
      }

      // 3. Merge master data with user progress
      const merged = masterProblems.map(mp => {
        const prog = progressMap.get(mp.id) || {};
        return {
          id: mp.id,
          subTopic: mp.category_name,
          lcNumber: mp.lc_number,
          problem: mp.problem_name,
          difficulty: mp.difficulty,
          pattern: mp.pattern || '',
          companies: mp.companies || '',
          link: mp.leetcode_url,
          priority: mp.priority || 'MEDIUM',
          // User Progress fields
          status: prog.status || 'NOT_STARTED',
          dateSolved: prog.date_solved || '',
          attempts: prog.attempts || 0,
          notes: prog.notes || '',
          mistakes: prog.mistakes || '',
          mastery: prog.mastery || 0,
          lastAttemptAt: prog.last_attempt_at || null,
          lastRevised: prog.last_revised_at || '',
          nextRevisionDate: prog.next_revision_date || '',
          progressUpdatedAt: prog.updated_at || null
        };
      });

      return { success: true, data: merged };
    } catch (e) {
      console.error("DsaService.getMergedProblems error:", e);
      return { success: false, error: e.message, useFallback: true };
    }
  }

  /**
   * Fetch Already Solved problems merged with user revision progress
   */
  static async getMergedAlreadySolved(userId = 'JeevanPranav') {
    try {
      const { data: masterSolved, error: masterErr } = await supabase
        .from('dsa_already_solved')
        .select('*')
        .order('id', { ascending: true });

      if (masterErr || !masterSolved || masterSolved.length === 0) {
        return { success: false, error: masterErr?.message, useFallback: true };
      }

      const { data: progressRows } = await supabase
        .from('dsa_already_solved_progress')
        .select('*')
        .or(`user_id.eq.${userId},user_id.eq.JeevanPranav`);

      const progressMap = new Map();
      if (progressRows) {
        progressRows.forEach(p => progressMap.set(p.already_solved_id, p));
      }

      const merged = masterSolved.map(ms => {
        const prog = progressMap.get(ms.id) || {};
        return {
          id: ms.id,
          subTopic: ms.category_name,
          lcNumber: ms.lc_number,
          problem: ms.problem_name,
          difficulty: ms.difficulty,
          link: ms.leetcode_url,
          revisionStatus: prog.revision_status || 'DUE',
          lastRevised: prog.last_revised || '',
          nextRevision: prog.next_revision || '',
          notes: prog.notes || ''
        };
      });

      return { success: true, data: merged };
    } catch (e) {
      return { success: false, error: e.message, useFallback: true };
    }
  }

  /**
   * Persist DSA Problem Progress update directly to Supabase PostgreSQL
   */
  static async updateProblemProgress(userId, problemId, updates) {
    try {
      const now = new Date().toISOString();
      const payload = {
        user_id: userId,
        problem_id: problemId,
        updated_at: now
      };

      if (updates.status !== undefined) payload.status = updates.status;
      if (updates.dateSolved !== undefined) payload.date_solved = updates.dateSolved;
      if (updates.attempts !== undefined) payload.attempts = updates.attempts;
      if (updates.notes !== undefined) payload.notes = updates.notes;
      if (updates.mistakes !== undefined) payload.mistakes = updates.mistakes;
      if (updates.mastery !== undefined) payload.mastery = updates.mastery;
      if (updates.lastAttemptAt !== undefined) payload.last_attempt_at = updates.lastAttemptAt;
      if (updates.lastRevised !== undefined) payload.last_revised_at = updates.lastRevised;
      if (updates.nextRevisionDate !== undefined) payload.next_revision_date = updates.nextRevisionDate;

      const { data, error } = await supabase
        .from('dsa_problem_progress')
        .upsert(payload, { onConflict: 'user_id,problem_id' })
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (e) {
      console.error("DsaService.updateProblemProgress error:", e);
      return { success: false, error: e.message };
    }
  }

  /**
   * Log an individual problem attempt
   */
  static async logAttempt(userId, problemId, { durationSeconds = 0, result = 'PASS', approach = '', mistake = '' }) {
    try {
      const { data, error } = await supabase
        .from('dsa_attempts')
        .insert({
          user_id: userId,
          problem_id: problemId,
          duration_seconds: durationSeconds,
          result,
          approach,
          mistake,
          created_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  /**
   * Update Already Solved revision state
   */
  static async updateAlreadySolvedProgress(userId, alreadySolvedId, updates) {
    try {
      const payload = {
        user_id: userId,
        already_solved_id: alreadySolvedId,
        updated_at: new Date().toISOString()
      };

      if (updates.revisionStatus !== undefined) payload.revision_status = updates.revisionStatus;
      if (updates.lastRevised !== undefined) payload.last_revised = updates.lastRevised;
      if (updates.nextRevision !== undefined) payload.next_revision = updates.nextRevision;
      if (updates.notes !== undefined) payload.notes = updates.notes;

      const { data, error } = await supabase
        .from('dsa_already_solved_progress')
        .upsert(payload, { onConflict: 'user_id,already_solved_id' })
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  /**
   * Realtime subscription for DSA Progress updates
   */
  static subscribeToProgress(userId, callback) {
    return supabaseManager.subscribeToTable('dsa_problem_progress', 'user_id', userId, callback);
  }
}

if (typeof window !== 'undefined') {
  window.DsaService = DsaService;
}
