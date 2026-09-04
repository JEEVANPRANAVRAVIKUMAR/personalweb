# JEEVANPRANAV — TECHNICAL DEVELOPMENT TRACKER

A developer-first, dark-themed interactive operating system and learning dashboard designed for technical mastery across two dedicated tracks: **AI Engineer (365-Day Engine)** and **Data Structures & Algorithms (250 Practice Set & Revision System)**.

---

## 🌟 Key Tracks & Capabilities

### 1. 🧠 AI Engineer Track (365-Day Mastery Protocol)
- **13 Structured Phases & 53 Weeks**: Comprehensive progression covering Mathematics for ML, Classical ML, Deep Learning from Scratch, PyTorch Mastery, Transformers & LLMs, RAG & Vector Search, Fine-Tuning & PEFT (LoRA/QLoRA), Agentic Systems & MCP Security, Edge & Speech AI, MLOps Platforms, and GPU Architecture & CUDA Optimization.
- **Interactive Roadmap Table**:
  - Compact phase accordions with circular status toggles.
  - Quick inline remarks modal to record personal notes, reflections, and derivations on every topic.
  - What to Study (core focus) vs. What to Skip (time-saving guidance).
  - Direct links to verified primary documentation, textbooks, and videos.
- **2-Hour Daily Session Engine & Timer**:
  - Focus protocol with **1. Learn (45m)**, **2. Build (75m)**, and **3. Revise (5m)**.
  - Real-time countdown timer with sound chimes and task deliverables.
- **Relational Doubts Knowledge Base**:
  - Log questions and initial intuition per topic.
  - Record verified solutions with detailed explanations.
- **7 Production Projects & Checkpoints**:
  - 50-point rubric evaluator across Theory, Implementation, Debugging, Explanation, and Code Quality.
- **107+ Curated Sources Directory**:
  - Quality-tiered directory (Primary, High Quality, Secondary) with explicit study/skip guidance.

### 2. ⚡ Data Structures & Algorithms Track (LeetCode 250 & Revision Bank)
- **250 Practice Problems across 22 Categories**:
  - Arrays & Hashing, Two Pointers, Sliding Window, Stack, Binary Search, Linked List, Trees, Tries, Heap / Priority Queue, Backtracking, Graphs, 1D/2D DP, Greedy, Intervals, Math & Geometry, Bit Manipulation.
- **Image-Matched Practice Table**:
  - Circular green status checkboxes.
  - Company pill badges (Amazon, Google, Microsoft, Meta, Apple, Bloomberg, Uber, Netflix).
  - Direct `</>` LeetCode problem links.
  - `📝` Personal notes & mistakes modal.
  - `+ Attempt` interactive counter.
- **Today's Target Solver**:
  - Switchable 3/day (~12 weeks) or 5/day (~7 weeks) target queues.
- **154 Already Solved Revision Bank**:
  - Searchable problem bank for active recall and spaced revision.
- **22 Category Grid & Pattern Analytics**:
  - Difficulty distribution (Easy / Medium / Hard) and weak pattern radar.

---

## 🔐 Authentication

Fixed credentials configured for the personal workspace:
- **Username**: `JeevanPranav`
- **Password**: `Kangeyam(890)`

---

## 🚀 How to Run Locally

### Option 1: Direct Browser Launch
Open `index.html` in any modern web browser (Chrome, Edge, Firefox, Brave, Safari).

### Option 2: Local HTTP Server
```bash
# Python
python -m http.server 8000

# Or Node.js
npx serve .
```
Navigate to `http://localhost:8000`.

---

## 📂 Project Structure

```
personal-web/
├── index.html                  # Main application entry point
├── README.md                   # Project documentation
├── .gitignore                  # Git ignore rules
├── src/
│   ├── components/
│   │   └── App.jsx             # React application (Login, Track Chooser, AI & DSA Views)
│   ├── data/
│   │   ├── dsaDataset.js       # 250 Practice problems, 154 already solved, 22 categories
│   │   ├── roadmapDataset.js   # 365 AI roadmap days with tasks & deliverables
│   │   ├── sourcesDataset.js   # 107 Curated engineering resources & textbooks
│   │   └── projectsDataset.js  # 7 Production projects & 9 checkpoints
│   ├── services/
│   │   ├── authService.js      # Session management & credential verification
│   │   ├── storageService.js   # Unified reactive local storage service
│   │   └── excelService.js     # SheetJS Excel parsing & export utilities
│   └── styles/
│       └── main.css            # Custom styling, dark mode, and animations
```
