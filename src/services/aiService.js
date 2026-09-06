// aiService.js - Supabase Data Access Layer for AI Engineer Track
import { supabase, supabaseManager } from './supabaseClient.js';
import { getEnrichedRoadmapDays } from '../data/roadmapDataset.js';
import { PROJECTS_DATASET, CHECKPOINTS_DATASET } from '../data/projectsDataset.js';

export class AiService {
  /**
   * Fetch 365 AI roadmap days merged with user progress and doubts
   */
  static async getMergedRoadmapDays(userId = 'JeevanPranav') {
    try {
      // 1. Fetch Master Days
      const { data: masterDays, error: masterErr } = await supabase
        .from('ai_roadmap_days')
        .select('*')
        .order('day', { ascending: true });

      let baseDays = masterDays;
      if (masterErr || !masterDays || masterDays.length === 0) {
        baseDays = getEnrichedRoadmapDays();
      }

      // 2. Fetch User Progress
      const { data: progressRows } = await supabase
        .from('ai_roadmap_progress')
        .select('*')
        .or(`user_id.eq.${userId},user_id.eq.JeevanPranav`);

      const progressMap = new Map();
      if (progressRows) {
        progressRows.forEach(p => progressMap.set(p.day, p));
      }

      // 3. Fetch Doubts
      const { data: doubtsRows } = await supabase
        .from('ai_doubts')
        .select('*')
        .or(`user_id.eq.${userId},user_id.eq.JeevanPranav`)
        .is('deleted_at', null)
        .order('created_at', { ascending: false });

      const doubtsByDay = new Map();
      if (doubtsRows) {
        doubtsRows.forEach(d => {
          const dList = doubtsByDay.get(d.day) || [];
          dList.push({
            id: d.id,
            dayNum: d.day,
            topic: d.topic,
            question: d.question,
            userUnderstanding: d.user_understanding || '',
            status: d.status || 'OPEN',
            createdAt: d.created_at,
            solution: d.status === 'RESOLVED' ? {
              answer: d.answer || '',
              explanation: d.explanation || '',
              verifiedAt: d.verified_at || d.updated_at
            } : null
          });
          doubtsByDay.set(d.day, dList);
        });
      }

      // 4. Merge All
      const merged = baseDays.map(bd => {
        const prog = progressMap.get(bd.day) || {};
        const dayDoubts = doubtsByDay.get(bd.day) || bd.doubts || [];

        return {
          day: bd.day,
          date: bd.date || bd.date_str,
          week: bd.week,
          phase: bd.phase,
          topic: bd.topic,
          concepts: bd.concepts,
          learnSection: bd.learnSection || bd.learn_section,
          sourceKey: bd.sourceKey || bd.source_key,
          sourceName: bd.sourceName || bd.source_name,
          sourceUrl: bd.sourceUrl || bd.source_url,
          whatToStudy: bd.whatToStudy || bd.what_to_study,
          whatToSkip: bd.whatToSkip || bd.what_to_skip,
          quality: bd.quality,
          implementTask: bd.implementTask || bd.implement_task,
          reviseTask: bd.reviseTask || bd.revise_task,
          deliverable: bd.deliverable,
          difficulty: bd.difficulty,
          checkpoint: bd.checkpoint,
          // User Progress
          status: prog.status || 'NOT_STARTED',
          mastery: prog.mastery || 0,
          timeSpentMinutes: prog.time_spent_minutes || 0,
          remarks: prog.remarks || '',
          notes: prog.notes || '',
          completedAt: prog.completed_at || null,
          nextRevisionDate: prog.next_revision_date || null,
          revisionStep: prog.revision_step || 0,
          doubts: dayDoubts
        };
      });

      return { success: true, data: merged };
    } catch (e) {
      console.error("AiService.getMergedRoadmapDays error:", e);
      return { success: false, error: e.message, data: getEnrichedRoadmapDays() };
    }
  }

  /**
   * Persist AI Day Progress directly to Supabase
   */
  static async updateDayProgress(userId, dayNum, updates) {
    try {
      const now = new Date().toISOString();
      const payload = {
        user_id: userId,
        day: Number(dayNum),
        updated_at: now
      };

      if (updates.status !== undefined) payload.status = updates.status;
      if (updates.mastery !== undefined) payload.mastery = updates.mastery;
      if (updates.timeSpentMinutes !== undefined) payload.time_spent_minutes = updates.timeSpentMinutes;
      if (updates.remarks !== undefined) payload.remarks = updates.remarks;
      if (updates.notes !== undefined) payload.notes = updates.notes;
      if (updates.completedAt !== undefined) payload.completed_at = updates.completedAt;
      if (updates.nextRevisionDate !== undefined) payload.next_revision_date = updates.nextRevisionDate;
      if (updates.revisionStep !== undefined) payload.revision_step = updates.revisionStep;

      const { data, error } = await supabase
        .from('ai_roadmap_progress')
        .upsert(payload, { onConflict: 'user_id,day' })
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (e) {
      console.error("AiService.updateDayProgress error:", e);
      return { success: false, error: e.message };
    }
  }

  /**
   * Add a Doubt to PostgreSQL
   */
  static async addDoubt(userId, { dayNum, topic, question, userUnderstanding = '' }) {
    try {
      const payload = {
        user_id: userId,
        day: dayNum ? Number(dayNum) : null,
        topic: topic || `Day ${dayNum}`,
        question: question.trim(),
        user_understanding: userUnderstanding.trim(),
        status: 'OPEN',
        created_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('ai_doubts')
        .insert(payload)
        .select()
        .single();

      if (error) throw error;
      return {
        success: true,
        doubt: {
          id: data.id,
          dayNum: data.day,
          topic: data.topic,
          question: data.question,
          userUnderstanding: data.user_understanding,
          status: 'OPEN',
          createdAt: data.created_at,
          solution: null
        }
      };
    } catch (e) {
      console.error("AiService.addDoubt error:", e);
      return { success: false, error: e.message };
    }
  }

  /**
   * Resolve a Doubt with verified answer & explanation
   */
  static async resolveDoubt(userId, doubtId, { answer, explanation }) {
    try {
      const now = new Date().toISOString();
      const { data, error } = await supabase
        .from('ai_doubts')
        .update({
          status: 'RESOLVED',
          answer: (answer || '').trim(),
          explanation: (explanation || '').trim(),
          verified_at: now,
          updated_at: now
        })
        .match({ id: doubtId, user_id: userId })
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  /**
   * Soft-delete a Doubt
   */
  static async deleteDoubt(userId, doubtId) {
    try {
      const { error } = await supabase
        .from('ai_doubts')
        .update({ deleted_at: new Date().toISOString() })
        .match({ id: doubtId, user_id: userId });

      if (error) throw error;
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  /**
   * Fetch and merge Projects & Checkpoints
   */
  static async getMergedProjects(userId = 'JeevanPranav') {
    try {
      const { data: dbProjects } = await supabase
        .from('ai_projects')
        .select('*')
        .or(`user_id.eq.${userId},user_id.eq.JeevanPranav`);

      const projMap = new Map();
      if (dbProjects) {
        dbProjects.forEach(p => projMap.set(p.project_code, p));
      }

      const projects = PROJECTS_DATASET.map(baseP => {
        const saved = projMap.get(baseP.id) || projMap.get(baseP.code) || {};
        return {
          ...baseP,
          status: saved.status || baseP.status || 'NOT STARTED',
          githubRepo: saved.github_repo || baseP.githubRepo || '',
          demoUrl: saved.demo_url || baseP.demoUrl || '',
          scores: saved.scores || { theory: 0, implementation: 0, debugging: 0, explanation: 0, project: 0 },
          totalScore: saved.total_score || 0,
          remarks: saved.remarks || ''
        };
      });

      return { success: true, projects };
    } catch (e) {
      return { success: true, projects: PROJECTS_DATASET };
    }
  }

  /**
   * Update an AI Project
   */
  static async updateProject(userId, projectCode, updates) {
    try {
      const payload = {
        user_id: userId,
        project_code: projectCode,
        name: updates.name || projectCode,
        status: updates.status,
        github_repo: updates.githubRepo,
        demo_url: updates.demoUrl,
        scores: updates.scores,
        total_score: updates.totalScore,
        remarks: updates.remarks,
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('ai_projects')
        .upsert(payload, { onConflict: 'user_id,project_code' })
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  /**
   * Log an AI Study Session
   */
  static async logSession(userId, { dayNum, minutes, phase = 'build' }) {
    try {
      const { data, error } = await supabase
        .from('ai_study_sessions')
        .insert({
          user_id: userId,
          day: dayNum ? Number(dayNum) : null,
          minutes,
          phase,
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
   * Realtime subscriptions
   */
  static subscribeToProgress(userId, callback) {
    return supabaseManager.subscribeToTable('ai_roadmap_progress', 'user_id', userId, callback);
  }

  static subscribeToDoubts(userId, callback) {
    return supabaseManager.subscribeToTable('ai_doubts', 'user_id', userId, callback);
  }
}

if (typeof window !== 'undefined') {
  window.AiService = AiService;
}
