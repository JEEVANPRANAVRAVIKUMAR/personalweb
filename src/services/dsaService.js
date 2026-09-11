// dsaService.js - Supabase Data Access Layer for DSA Track
import { supabase, supabaseManager } from './supabaseClient.js';
import { DSA_CATEGORIES, RAW_DSA_PRACTICE_FALLBACK, RAW_DSA_ALREADY_SOLVED_FALLBACK } from '../data/dsaDataset.js';

export class DsaService {
  /**
   * Fetch all DSA master problems merged with the authenticated user's progress & personal solutions
   */
  static async getMergedProblems(userId = 'JeevanPranav') {
    try {
      // 1. Fetch master problems from Supabase
      const { data: masterProblems, error: masterErr } = await supabase
        .from('dsa_problems')
        .select('*')
        .order('original_order', { ascending: true });

      let baseProblems = masterProblems;
      if (masterErr || !masterProblems || masterProblems.length === 0) {
        // Fallback to local 250 curated dataset
        baseProblems = RAW_DSA_PRACTICE_FALLBACK || [];
      }

      // 2. Fetch user progress & personal solutions from Supabase
      let progressMap = new Map();
      try {
        const { data: progressRows } = await supabase
          .from('dsa_problem_progress')
          .select('*')
          .or(`user_id.eq.${userId},user_id.eq.JeevanPranav`);

        if (progressRows) {
          progressRows.forEach(p => {
            progressMap.set(p.problem_id, p);
          });
        }
      } catch (err) {
        console.warn("DsaService: user progress table fetch note:", err.message);
      }

      // 3. Merge master data with user progress
      const merged = baseProblems.map(mp => {
        const prog = progressMap.get(mp.id || mp.lcNumber) || {};
        return {
          id: mp.id,
          subTopic: mp.category_name || mp.subTopic,
          lcNumber: mp.lc_number !== undefined ? mp.lc_number : mp.lcNumber,
          problem: mp.problem_name || mp.problem,
          difficulty: mp.difficulty || 'Medium',
          pattern: mp.pattern || '',
          companies: mp.companies || '',
          link: mp.leetcode_url || mp.link,
          priority: mp.priority || 'MEDIUM',
          // User Progress fields
          status: prog.status || mp.status || 'NOT_STARTED',
          dateSolved: prog.date_solved || mp.dateSolved || '',
          attempts: prog.attempts !== undefined ? prog.attempts : (mp.attempts || 0),
          notes: prog.notes !== undefined ? prog.notes : (mp.notes || ''),
          mistakes: prog.mistakes !== undefined ? prog.mistakes : (mp.mistakes || ''),
          mastery: prog.mastery !== undefined ? prog.mastery : (mp.mastery || 0),
          // Personal Solution fields
          approach: prog.my_approach || prog.approach || mp.approach || '',
          code: prog.my_solution_code || prog.code || mp.code || '',
          codeLang: prog.code_language || prog.codeLang || mp.codeLang || 'Java',
          timeComplexity: prog.time_complexity || prog.timeComplexity || mp.timeComplexity || 'O(N)',
          spaceComplexity: prog.space_complexity || prog.spaceComplexity || mp.spaceComplexity || 'O(1)',
          explanation: prog.explanation || mp.explanation || '',
          isBookmarked: prog.is_bookmarked !== undefined ? prog.is_bookmarked : (mp.isBookmarked || false),
          lastAttemptAt: prog.last_attempt_at || null,
          lastRevised: prog.last_revised_at || '',
          nextRevisionDate: prog.next_revision_date || '',
          progressUpdatedAt: prog.updated_at || null
        };
      });

      return { success: true, data: merged };
    } catch (e) {
      console.error("DsaService.getMergedProblems error:", e);
      return { 
        success: false, 
        error: e.message, 
        data: RAW_DSA_PRACTICE_FALLBACK || [], 
        useFallback: true 
      };
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

      let baseSolved = masterSolved;
      if (masterErr || !masterSolved || masterSolved.length === 0) {
        baseSolved = RAW_DSA_ALREADY_SOLVED_FALLBACK || [];
      }

      let progressMap = new Map();
      try {
        const { data: progressRows } = await supabase
          .from('dsa_already_solved_progress')
          .select('*')
          .or(`user_id.eq.${userId},user_id.eq.JeevanPranav`);

        if (progressRows) {
          progressRows.forEach(p => progressMap.set(p.already_solved_id, p));
        }
      } catch (err) {
        console.warn("DsaService: already solved progress fetch note:", err.message);
      }

      const merged = baseSolved.map(ms => {
        const prog = progressMap.get(ms.id) || {};
        return {
          id: ms.id,
          subTopic: ms.category_name || ms.subTopic,
          lcNumber: ms.lc_number !== undefined ? ms.lc_number : ms.lcNumber,
          problem: ms.problem_name || ms.problem,
          difficulty: ms.difficulty || 'Medium',
          link: ms.leetcode_url || ms.link,
          revisionStatus: prog.revision_status || ms.revisionStatus || 'DUE',
          lastRevised: prog.last_revised || ms.lastRevised || '',
          nextRevision: prog.next_revision || ms.nextRevision || '',
          notes: prog.notes !== undefined ? prog.notes : (ms.notes || '')
        };
      });

      return { success: true, data: merged };
    } catch (e) {
      console.error("DsaService.getMergedAlreadySolved error:", e);
      return { 
        success: false, 
        error: e.message, 
        data: RAW_DSA_ALREADY_SOLVED_FALLBACK || [], 
        useFallback: true 
      };
    }
  }

  /**
   * Persist DSA Problem Progress & Personal Solution update directly to Supabase PostgreSQL
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
      if (updates.dateSolved !== undefined) payload.date_solved = updates.dateSolved ? updates.dateSolved : null;
      if (updates.attempts !== undefined) payload.attempts = Number(updates.attempts) || 0;
      if (updates.notes !== undefined) payload.notes = updates.notes || '';
      if (updates.mistakes !== undefined) payload.mistakes = updates.mistakes || '';
      if (updates.mastery !== undefined) payload.mastery = Number(updates.mastery) || 0;
      if (updates.approach !== undefined) payload.my_approach = updates.approach || '';
      if (updates.code !== undefined) payload.my_solution_code = updates.code || '';
      if (updates.codeLang !== undefined) payload.code_language = updates.codeLang || 'Java';
      if (updates.timeComplexity !== undefined) payload.time_complexity = updates.timeComplexity || 'O(N)';
      if (updates.spaceComplexity !== undefined) payload.space_complexity = updates.spaceComplexity || 'O(1)';
      if (updates.explanation !== undefined) payload.explanation = updates.explanation || '';
      if (updates.isBookmarked !== undefined) payload.is_bookmarked = Boolean(updates.isBookmarked);
      if (updates.lastAttemptAt !== undefined) payload.last_attempt_at = updates.lastAttemptAt ? updates.lastAttemptAt : null;
      if (updates.lastRevised !== undefined) payload.last_revised_at = updates.lastRevised ? updates.lastRevised : null;
      if (updates.nextRevisionDate !== undefined) payload.next_revision_date = updates.nextRevisionDate ? updates.nextRevisionDate : null;

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
