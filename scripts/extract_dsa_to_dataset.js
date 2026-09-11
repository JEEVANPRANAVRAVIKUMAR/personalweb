// scripts/extract_dsa_to_dataset.js
const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

function slugify(text) {
  return (text || '').toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

function extractHyperlink(cell) {
  if (!cell) return '';
  // 1. Direct cell link
  if (cell.l && cell.l.Target) return cell.l.Target;
  // 2. Formula =HYPERLINK("url", "text")
  if (cell.f && typeof cell.f === 'string') {
    const match = cell.f.match(/HYPERLINK\(\s*["']([^"']+)["']/i);
    if (match && match[1]) return match[1];
  }
  // 3. String value if it looks like a URL
  if (cell.v && typeof cell.v === 'string' && cell.v.startsWith('http')) {
    return cell.v;
  }
  return '';
}

function run() {
  const excelPath = path.join(__dirname, '../LeetCode_250_Practice_Tracker (1).xlsx');
  console.log("Loading Excel file from:", excelPath);
  
  const fileBuffer = fs.readFileSync(excelPath);
  const workbook = XLSX.read(fileBuffer, { type: 'buffer', cellFormula: true, cellHTML: true });

  console.log("Sheet names in workbook:", workbook.SheetNames);

  // 1. PRACTICE 250
  const pSheet = workbook.Sheets['Practice 250'] || workbook.Sheets[workbook.SheetNames[1]];
  const pRange = XLSX.utils.decode_range(pSheet['!ref']);
  const practiceProblems = [];
  let currentCategory = "";
  let globalId = 1;

  for (let R = 4; R <= pRange.e.r; R++) {
    const row = [];
    for (let C = 0; C <= 11; C++) {
      const addr = XLSX.utils.encode_cell({ r: R, c: C });
      const cell = pSheet[addr];
      const val = cell ? (cell.v !== undefined ? cell.v : '') : '';
      const link = extractHyperlink(cell);
      row.push({ val, link });
    }

    const col0 = String(row[0].val || '').trim();
    const col1 = String(row[1].val || '').trim();
    const col2 = row[2].val; // LC #
    const col3 = String(row[3].val || '').trim(); // Problem name

    // Check if category header row
    if (col0 && (col0.match(/^\d+\./) || col0.toLowerCase().includes('problems')) && !col2) {
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

      // Find link
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
        id: globalId++,
        subTopic: cat,
        lcNumber: lcNum,
        problem: probName,
        difficulty: diff,
        pattern: pattern,
        companies: companies,
        link: link,
        status: status,
        dateSolved: dateSolved,
        attempts: attempts,
        notes: notes,
        mistakes: "",
        mastery: status === 'DONE' ? 4 : 0,
        priority: ['Arrays & Hashing', 'Sliding Window', 'Stack & Monotonic Stack', 'Binary Search', 'Binary Trees', 'Graphs: BFS & DFS', '1D Dynamic Programming', '2D / Grid & String DP', 'Design (LLD-style)'].some(ic => cat.includes(ic)) ? 'HIGH' : 'MEDIUM'
      });
    }
  }

  // 2. ALREADY SOLVED
  const aSheet = workbook.Sheets['Already Solved'] || workbook.Sheets[workbook.SheetNames[2]];
  const alreadySolvedProblems = [];

  if (aSheet) {
    const aRange = XLSX.utils.decode_range(aSheet['!ref']);
    let aCategory = "";
    let aGlobalId = 1;

    for (let R = 4; R <= aRange.e.r; R++) {
      const row = [];
      for (let C = 0; C <= 6; C++) {
        const addr = XLSX.utils.encode_cell({ r: R, c: C });
        const cell = aSheet[addr];
        const val = cell ? (cell.v !== undefined ? cell.v : '') : '';
        const link = extractHyperlink(cell);
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

        alreadySolvedProblems.push({
          id: aGlobalId++,
          subTopic: cat,
          lcNumber: lcNum,
          problem: probName,
          difficulty: diff,
          link: link,
          revisionStatus: revised === 'Yes' || revised === 'Done' ? 'REVISED' : 'DUE',
          lastRevised: '',
          nextRevision: '',
          notes: ''
        });
      }
    }
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

  console.log(`Extracted ${practiceProblems.length} practice problems and ${alreadySolvedProblems.length} already solved problems.`);

  // Write dsaDataset.js
  const datasetCode = `// dsaDataset.js - Complete 250 Curated Practice Problems across 22 Categories & 154 Already Solved Problems
// Extracted directly from LeetCode_250_Practice_Tracker (1).xlsx

export const DSA_CATEGORIES = ${JSON.stringify(CATEGORIES_META, null, 2)};

export const RAW_DSA_PRACTICE_FALLBACK = ${JSON.stringify(practiceProblems, null, 2)};

export const RAW_DSA_ALREADY_SOLVED_FALLBACK = ${JSON.stringify(alreadySolvedProblems, null, 2)};

if (typeof window !== 'undefined') {
  window.DSA_CATEGORIES = DSA_CATEGORIES;
  window.RAW_DSA_PRACTICE_FALLBACK = RAW_DSA_PRACTICE_FALLBACK;
  window.RAW_DSA_ALREADY_SOLVED_FALLBACK = RAW_DSA_ALREADY_SOLVED_FALLBACK;
}
`;

  const outputPath = path.join(__dirname, '../src/data/dsaDataset.js');
  fs.writeFileSync(outputPath, datasetCode, 'utf8');
  console.log("Successfully wrote complete dataset to:", outputPath);
}

run();
