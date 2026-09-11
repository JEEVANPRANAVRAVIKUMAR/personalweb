-- ==============================================================================
-- SUPABASE POSTGRESQL SCHEMA INITIALIZATION
-- PERSONAL TECHNICAL DEVELOPMENT PLATFORM (AI ENGINEER & DSA TRACKS)
-- Author: JEEVANPRANAV
-- Timezone: Asia/Kolkata
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 1. DSA MASTER CATALOG
-- ==============================================================================

CREATE TABLE IF NOT EXISTS dsa_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL UNIQUE,
  is_interview_critical BOOLEAN DEFAULT false,
  icon VARCHAR(50) DEFAULT 'grid',
  description TEXT,
  order_index INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS dsa_problems (
  id SERIAL PRIMARY KEY,
  category_id INT REFERENCES dsa_categories(id) ON DELETE SET NULL,
  category_name VARCHAR(150) NOT NULL,
  lc_number INT NOT NULL,
  problem_name VARCHAR(255) NOT NULL,
  difficulty VARCHAR(20) NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  pattern VARCHAR(255),
  companies TEXT,
  leetcode_url TEXT NOT NULL,
  original_order INT DEFAULT 0,
  priority VARCHAR(20) DEFAULT 'MEDIUM' CHECK (priority IN ('HIGH', 'MEDIUM', 'LOW')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT uq_dsa_problem UNIQUE(lc_number, problem_name)
);

CREATE TABLE IF NOT EXISTS dsa_already_solved (
  id SERIAL PRIMARY KEY,
  category_name VARCHAR(150) NOT NULL,
  lc_number INT NOT NULL,
  problem_name VARCHAR(255) NOT NULL,
  difficulty VARCHAR(20) NOT NULL,
  leetcode_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT uq_dsa_already_solved UNIQUE(lc_number, problem_name)
);

-- ==============================================================================
-- 2. DSA USER PROGRESS & ATTEMPTS
-- ==============================================================================

CREATE TABLE IF NOT EXISTS dsa_problem_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  problem_id INT NOT NULL REFERENCES dsa_problems(id) ON DELETE CASCADE,
  status VARCHAR(30) DEFAULT 'NOT_STARTED' CHECK (status IN ('NOT_STARTED', 'IN_PROGRESS', 'DONE', 'REVISE', 'SKIPPED')),
  mastery INT DEFAULT 0 CHECK (mastery >= 0 AND mastery <= 5),
  attempts INT DEFAULT 0,
  date_solved DATE,
  notes TEXT DEFAULT '',
  mistakes TEXT DEFAULT '',
  my_approach TEXT DEFAULT '',
  my_solution_code TEXT DEFAULT '',
  code_language VARCHAR(50) DEFAULT 'Java',
  time_complexity VARCHAR(50) DEFAULT 'O(N)',
  space_complexity VARCHAR(50) DEFAULT 'O(1)',
  explanation TEXT DEFAULT '',
  is_bookmarked BOOLEAN DEFAULT false,
  last_attempt_at TIMESTAMPTZ,
  last_revised_at DATE,
  next_revision_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT uq_user_dsa_progress UNIQUE(user_id, problem_id)
);

CREATE TABLE IF NOT EXISTS dsa_already_solved_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  already_solved_id INT NOT NULL REFERENCES dsa_already_solved(id) ON DELETE CASCADE,
  revision_status VARCHAR(30) DEFAULT 'DUE' CHECK (revision_status IN ('DUE', 'REVISED')),
  last_revised DATE,
  next_revision DATE,
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT uq_user_dsa_already_solved UNIQUE(user_id, already_solved_id)
);

CREATE TABLE IF NOT EXISTS dsa_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  problem_id INT NOT NULL REFERENCES dsa_problems(id) ON DELETE CASCADE,
  duration_seconds INT DEFAULT 0,
  result VARCHAR(50) DEFAULT 'PASS',
  approach TEXT,
  mistake TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 3. AI ROADMAP MASTER CATALOG
-- ==============================================================================

CREATE TABLE IF NOT EXISTS ai_roadmap_days (
  day INT PRIMARY KEY,
  date_str VARCHAR(50),
  week INT NOT NULL,
  phase VARCHAR(150) NOT NULL,
  topic VARCHAR(255) NOT NULL,
  concepts TEXT,
  learn_section TEXT,
  source_key VARCHAR(50),
  source_name VARCHAR(255),
  source_url TEXT,
  what_to_study TEXT,
  what_to_skip TEXT,
  quality VARCHAR(50) DEFAULT 'PRIMARY',
  implement_task TEXT,
  revise_task TEXT,
  deliverable TEXT,
  difficulty INT DEFAULT 3,
  checkpoint VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 4. AI USER PROGRESS & KNOWLEDGE BASE
-- ==============================================================================

CREATE TABLE IF NOT EXISTS ai_roadmap_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  day INT NOT NULL REFERENCES ai_roadmap_days(day) ON DELETE CASCADE,
  status VARCHAR(30) DEFAULT 'NOT_STARTED' CHECK (status IN ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED', 'NEEDS_REVISION', 'SKIPPED')),
  mastery INT DEFAULT 0 CHECK (mastery >= 0 AND mastery <= 5),
  time_spent_minutes INT DEFAULT 0,
  remarks TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  completed_at TIMESTAMPTZ,
  next_revision_date DATE,
  revision_step INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT uq_user_ai_progress UNIQUE(user_id, day)
);

CREATE TABLE IF NOT EXISTS ai_doubts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  day INT REFERENCES ai_roadmap_days(day) ON DELETE SET NULL,
  topic VARCHAR(255) NOT NULL,
  question TEXT NOT NULL,
  user_understanding TEXT DEFAULT '',
  status VARCHAR(20) DEFAULT 'OPEN' CHECK (status IN ('OPEN', 'RESOLVED')),
  answer TEXT DEFAULT '',
  explanation TEXT DEFAULT '',
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS ai_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  project_code VARCHAR(50) NOT NULL,
  name VARCHAR(255) NOT NULL,
  phase VARCHAR(150),
  weeks VARCHAR(100),
  checkpoint_id VARCHAR(50),
  objective TEXT,
  technologies TEXT[],
  deliverables JSONB DEFAULT '[]'::jsonb,
  evaluation_criteria JSONB DEFAULT '[]'::jsonb,
  github_repo TEXT DEFAULT '',
  demo_url TEXT DEFAULT '',
  status VARCHAR(30) DEFAULT 'NOT STARTED',
  architecture_notes TEXT DEFAULT '',
  scores JSONB DEFAULT '{}'::jsonb,
  total_score INT DEFAULT 0,
  remarks TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT uq_user_ai_project UNIQUE(user_id, project_code)
);

CREATE TABLE IF NOT EXISTS ai_checkpoints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  checkpoint_code VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  phase VARCHAR(150),
  week INT,
  day INT,
  project_code VARCHAR(50),
  status VARCHAR(30) DEFAULT 'PENDING',
  scores JSONB DEFAULT '{"theory":0,"implementation":0,"debugging":0,"explanation":0,"project":0}'::jsonb,
  total_score INT DEFAULT 0,
  remarks TEXT DEFAULT '',
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT uq_user_ai_checkpoint UNIQUE(user_id, checkpoint_code)
);

CREATE TABLE IF NOT EXISTS ai_study_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  day INT REFERENCES ai_roadmap_days(day) ON DELETE SET NULL,
  minutes INT NOT NULL,
  phase VARCHAR(50) DEFAULT 'build',
  session_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 5. DAILY ACTIVITY & USER SETTINGS
-- ==============================================================================

CREATE TABLE IF NOT EXISTS daily_activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  activity_date DATE NOT NULL,
  dsa_completed_count INT DEFAULT 0,
  ai_completed_count INT DEFAULT 0,
  study_minutes INT DEFAULT 0,
  doubts_count INT DEFAULT 0,
  revisions_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT uq_user_daily_activity UNIQUE(user_id, activity_date)
);

CREATE TABLE IF NOT EXISTS user_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL UNIQUE,
  ai_settings JSONB DEFAULT '{"dailyTargetMinutes":120,"learnMinutes":45,"buildMinutes":75,"reviseMinutes":5,"theme":"dark","soundEnabled":true,"startDate":"2026-09-07"}'::jsonb,
  dsa_settings JSONB DEFAULT '{"dailyTarget":3,"theme":"dark","revisionIntervals":[3,14]}'::jsonb,
  timezone VARCHAR(100) DEFAULT 'Asia/Kolkata',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Backup / Unified fast sync table
CREATE TABLE IF NOT EXISTS user_sync_store (
  username VARCHAR(100) PRIMARY KEY,
  ai_days JSONB DEFAULT '[]'::jsonb,
  dsa_problems JSONB DEFAULT '[]'::jsonb,
  dsa_already_solved JSONB DEFAULT '[]'::jsonb,
  doubts JSONB DEFAULT '[]'::jsonb,
  projects JSONB DEFAULT '[]'::jsonb,
  checkpoints JSONB DEFAULT '[]'::jsonb,
  settings JSONB DEFAULT '{}'::jsonb,
  sessions JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 6. INDEXES FOR HIGH-PERFORMANCE QUERIES
-- ==============================================================================

CREATE INDEX IF NOT EXISTS idx_dsa_problems_category ON dsa_problems(category_id);
CREATE INDEX IF NOT EXISTS idx_dsa_problems_lc_number ON dsa_problems(lc_number);
CREATE INDEX IF NOT EXISTS idx_dsa_problems_difficulty ON dsa_problems(difficulty);

CREATE INDEX IF NOT EXISTS idx_dsa_progress_user ON dsa_problem_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_dsa_progress_problem ON dsa_problem_progress(problem_id);
CREATE INDEX IF NOT EXISTS idx_dsa_progress_status ON dsa_problem_progress(status);
CREATE INDEX IF NOT EXISTS idx_dsa_progress_next_rev ON dsa_problem_progress(next_revision_date);
CREATE INDEX IF NOT EXISTS idx_dsa_progress_updated ON dsa_problem_progress(updated_at DESC);

CREATE INDEX IF NOT EXISTS idx_ai_days_phase ON ai_roadmap_days(phase);
CREATE INDEX IF NOT EXISTS idx_ai_days_week ON ai_roadmap_days(week);

CREATE INDEX IF NOT EXISTS idx_ai_progress_user ON ai_roadmap_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_progress_day ON ai_roadmap_progress(day);
CREATE INDEX IF NOT EXISTS idx_ai_progress_status ON ai_roadmap_progress(status);
CREATE INDEX IF NOT EXISTS idx_ai_progress_next_rev ON ai_roadmap_progress(next_revision_date);

CREATE INDEX IF NOT EXISTS idx_ai_doubts_user ON ai_doubts(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_doubts_status ON ai_doubts(status);
CREATE INDEX IF NOT EXISTS idx_ai_doubts_day ON ai_doubts(day);

CREATE INDEX IF NOT EXISTS idx_daily_activity_user_date ON daily_activity(user_id, activity_date);
CREATE INDEX IF NOT EXISTS idx_study_sessions_user_date ON ai_study_sessions(user_id, session_date);

-- ==============================================================================
-- 7. TRIGGER: AUTO-UPDATE updated_at TIMESTAMP
-- ==============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_dsa_progress_updated_at ON dsa_problem_progress;
CREATE TRIGGER trg_dsa_progress_updated_at
  BEFORE UPDATE ON dsa_problem_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_dsa_solved_progress_updated_at ON dsa_already_solved_progress;
CREATE TRIGGER trg_dsa_solved_progress_updated_at
  BEFORE UPDATE ON dsa_already_solved_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_ai_progress_updated_at ON ai_roadmap_progress;
CREATE TRIGGER trg_ai_progress_updated_at
  BEFORE UPDATE ON ai_roadmap_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_ai_doubts_updated_at ON ai_doubts;
CREATE TRIGGER trg_ai_doubts_updated_at
  BEFORE UPDATE ON ai_doubts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_ai_projects_updated_at ON ai_projects;
CREATE TRIGGER trg_ai_projects_updated_at
  BEFORE UPDATE ON ai_projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_ai_checkpoints_updated_at ON ai_checkpoints;
CREATE TRIGGER trg_ai_checkpoints_updated_at
  BEFORE UPDATE ON ai_checkpoints
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==============================================================================
-- 8. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE dsa_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE dsa_problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE dsa_already_solved ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_roadmap_days ENABLE ROW LEVEL SECURITY;

ALTER TABLE dsa_problem_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE dsa_already_solved_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE dsa_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_roadmap_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_doubts ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_checkpoints ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_study_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sync_store ENABLE ROW LEVEL SECURITY;

-- Master Catalog: Publicly readable for all (anon & authenticated)
CREATE POLICY "Public read dsa_categories" ON dsa_categories FOR SELECT USING (true);
CREATE POLICY "Public read dsa_problems" ON dsa_problems FOR SELECT USING (true);
CREATE POLICY "Public read dsa_already_solved" ON dsa_already_solved FOR SELECT USING (true);
CREATE POLICY "Public read ai_roadmap_days" ON ai_roadmap_days FOR SELECT USING (true);

-- User-scoped tables: Access for authenticated user or personal engineer key
CREATE POLICY "User dsa_problem_progress policy" ON dsa_problem_progress
  FOR ALL USING (auth.uid()::text = user_id OR user_id = 'JeevanPranav' OR auth.role() = 'anon');

CREATE POLICY "User dsa_already_solved_progress policy" ON dsa_already_solved_progress
  FOR ALL USING (auth.uid()::text = user_id OR user_id = 'JeevanPranav' OR auth.role() = 'anon');

CREATE POLICY "User dsa_attempts policy" ON dsa_attempts
  FOR ALL USING (auth.uid()::text = user_id OR user_id = 'JeevanPranav' OR auth.role() = 'anon');

CREATE POLICY "User ai_roadmap_progress policy" ON ai_roadmap_progress
  FOR ALL USING (auth.uid()::text = user_id OR user_id = 'JeevanPranav' OR auth.role() = 'anon');

CREATE POLICY "User ai_doubts policy" ON ai_doubts
  FOR ALL USING (auth.uid()::text = user_id OR user_id = 'JeevanPranav' OR auth.role() = 'anon');

CREATE POLICY "User ai_projects policy" ON ai_projects
  FOR ALL USING (auth.uid()::text = user_id OR user_id = 'JeevanPranav' OR auth.role() = 'anon');

CREATE POLICY "User ai_checkpoints policy" ON ai_checkpoints
  FOR ALL USING (auth.uid()::text = user_id OR user_id = 'JeevanPranav' OR auth.role() = 'anon');

CREATE POLICY "User ai_study_sessions policy" ON ai_study_sessions
  FOR ALL USING (auth.uid()::text = user_id OR user_id = 'JeevanPranav' OR auth.role() = 'anon');

CREATE POLICY "User daily_activity policy" ON daily_activity
  FOR ALL USING (auth.uid()::text = user_id OR user_id = 'JeevanPranav' OR auth.role() = 'anon');

CREATE POLICY "User user_settings policy" ON user_settings
  FOR ALL USING (auth.uid()::text = user_id OR user_id = 'JeevanPranav' OR auth.role() = 'anon');

CREATE POLICY "User user_sync_store policy" ON user_sync_store
  FOR ALL USING (true);
