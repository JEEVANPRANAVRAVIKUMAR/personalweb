// scripts/seed_supabase.js - Master Data & Progress Seeder for Supabase PostgreSQL
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
let XLSX;
try {
  XLSX = require('xlsx');
} catch (e) {
  console.warn("xlsx not yet loaded from node_modules");
}

// Load env
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || 'https://cpvqqbbpcxzfhckpczwr.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || 'sb_publishable_VzkHQZKNoHRQWa0FsfrdMg_6IzW91Le';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function slugify(text) {
  return (text || '').toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

const CATEGORIES_META = [
  { id: 1, name: "Arrays & Hashing", isInterviewCritical: true, icon: "grid", description: "Hash tables, frequency maps, set operations, prefix lookups" },
  { id: 2, name: "Prefix Sum & Matrix", isInterviewCritical: false, icon: "table", description: "2D matrix traversals, prefix running sums, boundary simulation" },
  { id: 3, name: "Two Pointers", isInterviewCritical: true, icon: "git-commit", description: "Left-right pointers, fast-slow pointers, sorted array manipulation" },
  { id: 4, name: "Sliding Window", isInterviewCritical: true, icon: "move-horizontal", description: "Fixed and variable size windows, subarray constraints" },
  { id: 5, name: "Stack & Monotonic Stack", isInterviewCritical: true, icon: "layers", description: "Next greater element, expression evaluation, histogram area" },
  { id: 6, name: "Binary Search", isInterviewCritical: true, icon: "search", description: "Search on answer space, lower/upper bounds, rotated arrays" },
  { id: 7, name: "Linked List", isInterviewCritical: false, icon: "link", description: "Pointer manipulation, cycle detection, reordering, reversal" },
  { id: 8, name: "Strings & Pattern Matching", isInterviewCritical: false, icon: "type", description: "String transformations, palindrome checks, anagrams" },
  { id: 9, name: "Binary Trees", isInterviewCritical: true, icon: "git-branch", description: "DFS/BFS traversals, LCA, tree construction, path sums" },
  { id: 10, name: "Binary Search Trees", isInterviewCritical: false, icon: "git-merge", description: "BST properties, inorder validation, range queries" },
  { id: 11, name: "Heap / Priority Queue", isInterviewCritical: true, icon: "list-ordered", description: "Top-K elements, median in stream, merge K sorted lists" },
  { id: 12, name: "Trie", isInterviewCritical: false, icon: "folder-tree", description: "Prefix tree, autocomplete, word search, bitwise XOR trie" },
  { id: 13, name: "Backtracking", isInterviewCritical: true, icon: "corner-down-left", description: "Permutations, combinations, subset generation, N-Queens" },
  { id: 14, name: "Graphs: BFS & DFS", isInterviewCritical: true, icon: "network", description: "Connected components, cycle detection, flood fill, bipartite graph" },
  { id: 15, name: "Graphs: Topological Sort, Union-Find, Shortest Path", isInterviewCritical: true, icon: "share-2", description: "Kahn algorithm, Disjoint Set Union, Dijkstra shortest path" },
  { id: 16, name: "1D Dynamic Programming", isInterviewCritical: true, icon: "trending-up", description: "Fibonacci variants, house robber, coin change, LIS" },
  { id: 17, name: "2D / Grid & String DP", isInterviewCritical: true, icon: "layout-grid", description: "Unique paths, edit distance, longest common subsequence" },
  { id: 18, name: "Knapsack, Subsequence & Interval DP", isInterviewCritical: true, icon: "box", description: "0/1 Knapsack, unbounded knapsack, matrix chain multiplication" },
  { id: 19, name: "Greedy & Intervals", isInterviewCritical: true, icon: "clock", description: "Interval overlapping, merge intervals, activity selection" },
  { id: 20, name: "Bit Manipulation", isInterviewCritical: false, icon: "binary", description: "Bitwise XOR, power of two, bitmask DP, count set bits" },
  { id: 21, name: "Math & Number Theory", isInterviewCritical: false, icon: "hash", description: "GCD, primes sieve, modular arithmetic, fast exponentiation" },
  { id: 22, name: "Design (LLD-style)", isInterviewCritical: true, icon: "cpu", description: "LRU Cache, LFU Cache, Trie, Min Stack, Rate Limiter" }
];

async function parseExcelFile() {
  const excelPath = path.join(__dirname, '../LeetCode_250_Practice_Tracker (1).xlsx');
  if (!fs.existsSync(excelPath)) {
    console.warn("Excel file not found at:", excelPath);
    return { practiceProblems: [], alreadySolved: [] };
  }

  const fileBuffer = fs.readFileSync(excelPath);
  const workbook = XLSX.read(fileBuffer, { type: 'buffer', cellFormula: true });

  const practiceProblems = [];
  const pSheet = workbook.Sheets['Practice 250'];
  if (pSheet) {
    const pRange = XLSX.utils.decode_range(pSheet['!ref']);
    let currentCategory = "";
    let order = 1;

    for (let R = 4; R <= pRange.e.r; R++) {
      const row = [];
      for (let C = 0; C <= 11; C++) {
        const addr = XLSX.utils.encode_cell({ r: R, c: C });
        const cell = pSheet[addr];
        const val = cell ? (cell.v !== undefined ? cell.v : '') : '';
        const link = cell && cell.l ? cell.l.Target : '';
        row.push({ val, link });
      }

      const col0 = String(row[0].val || '').trim();
      const col1 = String(row[1].val || '').trim();
      const col2 = row[2].val;
      const col3 = String(row[3].val || '').trim();

      if (col0 && (col0.match(/^\d+\./) || col0.includes('problems')) && !col2) {
        currentCategory = col0.replace(/\(\d+\s*problems\)/i, '').trim();
        continue;
      }
      if (col1 && !col2 && !col3) {
        currentCategory = col1.replace(/\(\d+\s*problems\)/i, '').trim();
        continue;
      }

      if (col2 || col3) {
        const lcNum = Number(col2) || 0;
        const probName = col3 || String(row[2].val || '');
        const diff = String(row[4].val || 'Medium').trim();
        const pattern = String(row[5].val || '').trim();
        const companies = String(row[6].val || '').trim();

        let link = row[7].link || row[3].link || row[2].link || '';
        if (!link) {
          const slug = slugify(probName);
          link = `https://leetcode.com/problems/${slug}/`;
        }

        const rawStatus = String(row[8].val || '').trim().toUpperCase();
        let status = 'NOT_STARTED';
        if (rawStatus === 'DONE' || rawStatus === 'COMPLETED') status = 'DONE';
        else if (rawStatus === 'REVISE') status = 'REVISE';
        else if (rawStatus === 'SKIPPED') status = 'SKIPPED';
        else if (rawStatus === 'IN PROGRESS' || rawStatus === 'IN_PROGRESS') status = 'IN_PROGRESS';

        const dateSolved = String(row[9].val || '').trim();
        const attempts = Number(row[10].val) || 0;
        const notes = String(row[11].val || '').trim();

        let cat = col1 || currentCategory || 'General';
        cat = cat.replace(/^\d+\.\s*/, '').trim();

        practiceProblems.push({
          category_name: cat,
          lc_number: lcNum,
          problem_name: probName,
          difficulty: diff,
          pattern: pattern,
          companies: companies,
          leetcode_url: link,
          original_order: order++,
          priority: ['Arrays & Hashing', 'Sliding Window', 'Stack & Monotonic Stack', 'Binary Search', 'Binary Trees', 'Graphs: BFS & DFS', '1D Dynamic Programming', '2D / Grid & String DP', 'Design (LLD-style)'].some(ic => cat.includes(ic)) ? 'HIGH' : 'MEDIUM',
          initialStatus: status,
          initialDateSolved: dateSolved,
          initialAttempts: attempts,
          initialNotes: notes
        });
      }
    }
  }

  const alreadySolved = [];
  const aSheet = workbook.Sheets['Already Solved'];
  if (aSheet) {
    const aRange = XLSX.utils.decode_range(aSheet['!ref']);
    let aCategory = "";

    for (let R = 4; R <= aRange.e.r; R++) {
      const row = [];
      for (let C = 0; C <= 6; C++) {
        const addr = XLSX.utils.encode_cell({ r: R, c: C });
        const cell = aSheet[addr];
        const val = cell ? (cell.v !== undefined ? cell.v : '') : '';
        const link = cell && cell.l ? cell.l.Target : '';
        row.push({ val, link });
      }

      const col0 = String(row[0].val || '').trim();
      const col1 = String(row[1].val || '').trim();
      const col2 = row[2].val;
      const col3 = String(row[3].val || '').trim();

      if (col0 && (col0.match(/^\d+\./) || col0.includes('(')) && !col2) {
        aCategory = col0.replace(/\(\d+\)/i, '').trim();
        continue;
      }
      if (col1 && !col2 && !col3) {
        aCategory = col1.replace(/\(\d+\)/i, '').trim();
        continue;
      }

      if (col2 || col3) {
        const lcNum = Number(col2) || 0;
        const probName = col3;
        const diff = String(row[4].val || 'Medium').trim();
        let link = row[5].link || row[3].link || row[2].link || '';
        if (!link) {
          const slug = slugify(probName);
          link = `https://leetcode.com/problems/${slug}/`;
        }
        const revised = String(row[6].val || '').trim();

        let cat = col1 || aCategory || 'General';
        cat = cat.replace(/^\d+\.\s*/, '').trim();

        alreadySolved.push({
          category_name: cat,
          lc_number: lcNum,
          problem_name: probName,
          difficulty: diff,
          leetcode_url: link,
          initialRevisionStatus: revised === 'Yes' || revised === 'Done' ? 'REVISED' : 'DUE'
        });
      }
    }
  }

  return { practiceProblems, alreadySolved };
}

async function seedAll() {
  console.log("==================================================");
  console.log("STARTING SUPABASE DATABASE SEEDING PROCESS");
  console.log("Target Supabase URL:", SUPABASE_URL);
  console.log("==================================================");

  try {
    // 1. Seed Categories
    console.log("1. Seeding DSA Categories (22)...");
    for (const cat of CATEGORIES_META) {
      await supabase.from('dsa_categories').upsert({
        name: cat.name,
        is_interview_critical: cat.isInterviewCritical,
        icon: cat.icon,
        description: cat.description,
        order_index: cat.id
      }, { onConflict: 'name' });
    }
    console.log("✓ Categories seeded successfully.");

    // 2. Parse & Seed DSA Master Problems
    console.log("2. Parsing Excel and Seeding DSA Problems...");
    const { practiceProblems, alreadySolved } = await parseExcelFile();
    console.log(`Found ${practiceProblems.length} practice problems and ${alreadySolved.length} already solved problems.`);

    let insertedProblems = 0;
    for (const p of practiceProblems) {
      const { error } = await supabase.from('dsa_problems').upsert({
        category_name: p.category_name,
        lc_number: p.lc_number,
        problem_name: p.problem_name,
        difficulty: p.difficulty,
        pattern: p.pattern,
        companies: p.companies,
        leetcode_url: p.leetcode_url,
        original_order: p.original_order,
        priority: p.priority
      }, { onConflict: 'lc_number,problem_name' });
      if (!error) insertedProblems++;
    }
    console.log(`✓ Seeded ${insertedProblems} DSA master practice problems.`);

    let insertedSolved = 0;
    for (const s of alreadySolved) {
      const { error } = await supabase.from('dsa_already_solved').upsert({
        category_name: s.category_name,
        lc_number: s.lc_number,
        problem_name: s.problem_name,
        difficulty: s.difficulty,
        leetcode_url: s.leetcode_url
      }, { onConflict: 'lc_number,problem_name' });
      if (!error) insertedSolved++;
    }
    console.log(`✓ Seeded ${insertedSolved} already-solved problems.`);

    console.log("==================================================");
    console.log("SEEDING COMPLETED SUCCESSFULLY!");
    console.log("==================================================");
  } catch (err) {
    console.error("Seeding error:", err);
  }
}

if (require.main === module) {
  seedAll();
}

module.exports = { seedAll, parseExcelFile, CATEGORIES_META };
