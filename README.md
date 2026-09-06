# JEEVANPRANAV — PERSONAL TECHNICAL DEVELOPMENT PLATFORM
### Cloud-Persistent Engineering Operating System (AI Engineer & DSA Tracks)

A developer-first, cloud-backed personal development operating system designed for lifelong technical mastery across two dedicated tracks:
1. **AI Engineer Mastery Engine (365-Day Protocol)**
2. **Data Structures & Algorithms (250 Curated Practice Problems & 154 Revision Set)**

Backed by **Supabase PostgreSQL**, **Supabase Auth**, **Real-Time WebSockets**, and a **Vercel Serverless Architecture**, ensuring that **the database is the authoritative single source of truth** across your Laptop, Desktop, Phone, and Tablet with zero dependence on browser memory or local storage.

---

## 🌟 Key Capabilities & Track Architecture

```
                 ┌────────────────────────────────────────┐
                 │    CROSS-DEVICE ACCESS (Phone/Laptop)  │
                 └───────────────────┬────────────────────┘
                                     │
                 ┌───────────────────▼────────────────────┐
                 │       VERCEL / EDGE CDN DEPLOYMENT     │
                 │          React 18 + Tailwind CSS       │
                 └───────────────────┬────────────────────┘
                                     │
                             Authenticated API
                                     │
                 ┌───────────────────▼────────────────────┐
                 │        SUPABASE CLOUD PLATFORM         │
                 │                                        │
                 │   • PostgreSQL Database (Single Truth) │
                 │   • Supabase Auth (JWT Sessions)       │
                 │   • Row Level Security (RLS)           │
                 │   • Realtime Channels (WebSockets)     │
                 └───────────────────┬────────────────────┘
                                     │
          ┌──────────────────────────┼──────────────────────────┐
          │                          │                          │
          ▼                          ▼                          ▼
   DSA PRACTICE &             AI ROADMAP (365d)          ACTIVITY & STREAK
   REVISION SYSTEM             & DOUBTS ENGINE            ANALYTICS ENGINE
   • 250 Problems (22 Cats)   • 13 Phases, 53 Weeks      • Asia/Kolkata (UTC+5:30)
   • 154 Already Solved Bank  • 7 Production Projects    • Daily solve counts
   • Attempts & Gotchas       • Doubts Knowledge Base    • Dynamic Streak Calc
   • Spaced Repetition        • 2-Hour Daily Session     • Spaced Revisions Due
```

---

## 🔐 Credentials & Authentication

- **Username / Email**: `JeevanPranav` or `jeevanpranav@engineer.local`
- **Password**: `Kangeyam(890)`
- **Authentication Engine**: Supabase Auth (with email + password backing).
- Multi-device sessions are authenticated server-side and automatically refreshed without logging you out.

---

## 🗄️ Database Structure (Supabase PostgreSQL)

### 1. Master Catalog Tables
- `dsa_categories`: 22 algorithmic categories with metadata, icons, and interview-critical badges.
- `dsa_problems`: 250 curated practice problems with difficulty, patterns, companies, and LeetCode URLs.
- `dsa_already_solved`: 154 problems in the revision bank.
- `ai_roadmap_days`: 365 structured AI engineering days with concepts, sources, tasks, and deliverables.

### 2. User Progress Tables (User-Scoped & RLS Protected)
- `dsa_problem_progress`: `(user_id, problem_id)` $\to$ `status`, `attempts`, `mastery`, `date_solved`, `notes`, `mistakes`, `next_revision_date`.
- `dsa_attempts`: Individual attempt logs with duration, approach, and gotchas.
- `dsa_already_solved_progress`: Revision status and spaced revision schedule.
- `ai_roadmap_progress`: `(user_id, day)` $\to$ `status`, `mastery`, `time_spent_minutes`, `remarks`, `notes`, `completed_at`.
- `ai_doubts`: Relational doubts knowledge base with problem/topic reference, questions, intuition, and verified solutions.
- `ai_projects` & `ai_checkpoints`: 7 production projects and milestone evaluations with 50-point rubric scoring.
- `ai_study_sessions`: Daily study duration logs per phase (Learn 45m / Build 75m / Revise 5m).
- `daily_activity`: Aggregate daily summary for analytics and streak calculation.
- `user_settings`: Application preferences and daily targets.

---

## 🚀 How to Run Locally

### 1. Prerequisites
- Node.js (v18 or newer)
- npm or yarn

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/JEEVANPRANAVRAVIKUMAR/personalweb.git
cd personalweb

# Install dependencies
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Ensure the Supabase variables are set:
```env
NEXT_PUBLIC_SUPABASE_URL=https://cpvqqbbpcxzfhckpczwr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_VzkHQZKNoHRQWa0FsfrdMg_6IzW91Le
SUPABASE_URL=https://cpvqqbbpcxzfhckpczwr.supabase.co
SUPABASE_ANON_KEY=sb_publishable_VzkHQZKNoHRQWa0FsfrdMg_6IzW91Le
APP_TIMEZONE=Asia/Kolkata
```

### 4. Database Migrations & Initial Seed
Run the initial schema migration and seed script:
```bash
# In Supabase SQL Editor, run:
# 1. supabase/migrations/20260907000001_init_schema.sql
# 2. supabase/migrations/20260907000002_seed_master_data.sql

# Or run the Node seed runner:
npm run seed
```

### 5. Start Local Development Server
```bash
npm run dev
# Or
npx serve .
```
Navigate to `http://localhost:3000` (or the port indicated by serve).

---

## ☁️ Vercel Production Deployment

### Step 1: Connect Repository to Vercel
1. Push this repository to GitHub: `https://github.com/JEEVANPRANAVRAVIKUMAR/personalweb`
2. Open [Vercel Dashboard](https://vercel.com) and click **"Add New" $\to$ "Project"**.
3. Select `personalweb` and click **Import**.

### Step 2: Configure Vercel Environment Variables
Under **Project Settings $\to$ Environment Variables**, add:

| Variable Name | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://cpvqqbbpcxzfhckpczwr.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `sb_publishable_VzkHQZKNoHRQWa0FsfrdMg_6IzW91Le` |
| `SUPABASE_URL` | `https://cpvqqbbpcxzfhckpczwr.supabase.co` |
| `SUPABASE_ANON_KEY` | `sb_publishable_VzkHQZKNoHRQWa0FsfrdMg_6IzW91Le` |
| `APP_TIMEZONE` | `Asia/Kolkata` |
| `APP_USERNAME` | `JeevanPranav` |
| `APP_PASSWORD` | `Kangeyam(890)` |

### Step 3: Deploy
Click **Deploy**. Your application will be live at `https://your-project.vercel.app`.

---

## 🧪 Testing Checklist & Multi-Device Verification

### 1. Cross-Device Persistence Acceptance Test (Laptop $\to$ Phone)
1. **Laptop**:
   - Open deployed Vercel site $\to$ Login with `JeevanPranav` / `Kangeyam(890)`.
   - Open **DSA Track** $\to$ **Practice 250**.
   - Locate LeetCode #1 (**Two Sum**).
   - Click **Mark Done** $\to$ status turns green.
   - Click **📝 Notes** $\to$ Add note: `"First approach brute force. Second approach HashMap O(n)."` and mistake: `"Initially forgot HashMap."`.
   - Set Mastery to `4`, Attempts to `2`.
   - Click **Save Notes** $\to$ Notice header displays `Saved ✓`.
2. **Phone**:
   - Open the same Vercel URL on mobile.
   - Login.
   - Open **DSA Track** $\to$ Find **Two Sum**.
   - **Verification**: It must immediately show **COMPLETED**, **Mastery: 4**, **Attempts: 2**, and the exact remarks and notes.
   - On Phone: Edit note to `"Updated from phone"`. Click **Save**.
3. **Laptop**:
   - Return to Laptop $\to$ Notice real-time update reflects `"Updated from phone"` automatically!

### 2. AI Engineer Cross-Device Test
1. **Laptop**:
   - Open **AI Engineer Track** $\to$ Mark Day 1 completed.
   - Add a doubt: `"Why is self-attention O(n^2)?"` with your understanding.
2. **Phone**:
   - Open **AI Engineer Track** $\to$ Verify Day 1 is marked Completed and the doubt appears in the Doubts queue.

### 3. Spaced Revision Test
1. Mark any problem or day as `REVISE` $\to$ Schedules next revision.
2. Open **Revision Tab** on mobile $\to$ Verify the item appears in the revision queue with the correct due date.

### 4. Data Export & Backup
1. Click the database icon in the top navigation bar.
2. Click **Export JSON** to instantly download a full snapshot backup of all DSA problems, AI days, remarks, doubts, and user settings.

---

## 📂 Project Structure

```
personal-web/
├── index.html                           # Main application entry point with Supabase client
├── vercel.json                          # Vercel Serverless routing configuration
├── package.json                         # Dependencies & seed scripts
├── .env.example                         # Environment variables template
├── .env.local                           # Local environment configuration
├── README.md                            # Complete architecture & deployment guide
├── LeetCode_250_Practice_Tracker (1).xlsx # Master DSA dataset source
├── supabase/
│   └── migrations/
│       ├── 20260907000001_init_schema.sql     # PostgreSQL tables, RLS & triggers
│       └── 20260907000002_seed_master_data.sql # Master catalog seeds (22 categories)
├── scripts/
│   └── seed_supabase.js                 # Idempotent master seed runner script
├── api/                                 # Vercel Serverless Functions
│   ├── auth.js                          # Auth & token endpoint
│   ├── sync.js                          # Cloud sync endpoint
│   ├── health.js                        # Database health check
│   ├── ai.js                            # AI Track API
│   ├── dsa.js                           # DSA Track API
│   └── lib/
│       └── db.js                        # Supabase PostgreSQL adapter
└── src/
    ├── components/
    │   └── App.jsx                      # Multi-track React OS (DSA & AI Tracks)
    ├── data/
    │   ├── dsaDataset.js                # 250 Practice problems & 154 already solved
    │   ├── roadmapDataset.js            # 365 AI roadmap days
    │   ├── sourcesDataset.js            # 107 Verified engineering sources
    │   └── projectsDataset.js           # 7 Production projects & 9 checkpoints
    ├── services/
    │   ├── supabaseClient.js            # Supabase Client & Realtime Manager
    │   ├── authService.js               # Supabase Auth & Multi-device sessions
    │   ├── dsaService.js                # DSA Track Data Access Layer
    │   ├── aiService.js                 # AI Track Data Access Layer
    │   ├── activityService.js           # Timezone (Asia/Kolkata) & Streak Engine
    │   ├── storageService.js            # Unified Authoritative Cloud Orchestrator
    │   └── excelService.js              # Excel parsing and diagnostic engine
    └── styles/
        └── main.css                     # Custom styling, dark mode, animations
```

---

## 🛡️ Security & Privacy

- All database access is governed by **Supabase Row Level Security (RLS)**.
- Sensitive environment variables (`SUPABASE_SERVICE_ROLE_KEY`, `JWT_SECRET`) remain strictly server-side.
- The frontend operates with the public publishable anon key under RLS user session enforcement.
