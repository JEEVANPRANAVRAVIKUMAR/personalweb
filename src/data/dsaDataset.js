// dsaDataset.js - 250 Curated Practice Problems across 22 Categories & 154 Already Solved Revision Problems
// Source: LeetCode_250_Practice_Tracker (1).xlsx

export const DSA_CATEGORIES = [
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

// Helper to load raw cached or fallback
const getRawPractice = () => {
  try {
    if (typeof window !== 'undefined' && localStorage.getItem('RAW_DSA_PRACTICE')) {
      return JSON.parse(localStorage.getItem('RAW_DSA_PRACTICE'));
    }
  } catch(e) {}
  return [];
};

const getRawAlreadySolved = () => {
  try {
    if (typeof window !== 'undefined' && localStorage.getItem('RAW_DSA_ALREADY_SOLVED')) {
      return JSON.parse(localStorage.getItem('RAW_DSA_ALREADY_SOLVED'));
    }
  } catch(e) {}
  return [];
};

export const RAW_DSA_PRACTICE_FALLBACK = getRawPractice();
export const RAW_DSA_ALREADY_SOLVED_FALLBACK = getRawAlreadySolved();

if (typeof window !== 'undefined') {
  window.DSA_CATEGORIES = DSA_CATEGORIES;
  window.RAW_DSA_PRACTICE_FALLBACK = RAW_DSA_PRACTICE_FALLBACK;
  window.RAW_DSA_ALREADY_SOLVED_FALLBACK = RAW_DSA_ALREADY_SOLVED_FALLBACK;
}
