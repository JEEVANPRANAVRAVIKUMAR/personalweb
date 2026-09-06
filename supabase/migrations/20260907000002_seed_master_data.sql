-- ==============================================================================
-- SUPABASE POSTGRESQL MASTER DATA SEED
-- PERSONAL TECHNICAL DEVELOPMENT PLATFORM (AI ENGINEER & DSA TRACKS)
-- ==============================================================================

-- 1. DSA CATEGORIES (22 Categories)
INSERT INTO dsa_categories (id, name, is_interview_critical, icon, description, order_index) VALUES
  (1, 'Arrays & Hashing', true, 'grid', 'Hash tables, frequency maps, set operations, prefix lookups', 1),
  (2, 'Prefix Sum & Matrix', false, 'table', '2D matrix traversals, prefix running sums, boundary simulation', 2),
  (3, 'Two Pointers', true, 'git-commit', 'Left-right pointers, fast-slow pointers, sorted array manipulation', 3),
  (4, 'Sliding Window', true, 'move-horizontal', 'Fixed and variable size windows, subarray constraints', 4),
  (5, 'Stack & Monotonic Stack', true, 'layers', 'Next greater element, expression evaluation, histogram area', 5),
  (6, 'Binary Search', true, 'search', 'Search on answer space, lower/upper bounds, rotated arrays', 6),
  (7, 'Linked List', false, 'link', 'Pointer manipulation, cycle detection, reordering, reversal', 7),
  (8, 'Strings & Pattern Matching', false, 'type', 'String transformations, palindrome checks, anagrams', 8),
  (9, 'Binary Trees', true, 'git-branch', 'DFS/BFS traversals, LCA, tree construction, path sums', 9),
  (10, 'Binary Search Trees', false, 'git-merge', 'BST properties, inorder validation, range queries', 10),
  (11, 'Heap / Priority Queue', true, 'list-ordered', 'Top-K elements, median in stream, merge K sorted lists', 11),
  (12, 'Trie', false, 'folder-tree', 'Prefix tree, autocomplete, word search, bitwise XOR trie', 12),
  (13, 'Backtracking', true, 'corner-down-left', 'Permutations, combinations, subset generation, N-Queens', 13),
  (14, 'Graphs: BFS & DFS', true, 'network', 'Connected components, cycle detection, flood fill, bipartite graph', 14),
  (15, 'Graphs: Topological Sort, Union-Find, Shortest Path', true, 'share-2', 'Kahn algorithm, Disjoint Set Union, Dijkstra shortest path', 15),
  (16, '1D Dynamic Programming', true, 'trending-up', 'Fibonacci variants, house robber, coin change, LIS', 16),
  (17, '2D / Grid & String DP', true, 'layout-grid', 'Unique paths, edit distance, longest common subsequence', 17),
  (18, 'Knapsack, Subsequence & Interval DP', true, 'box', '0/1 Knapsack, unbounded knapsack, matrix chain multiplication', 18),
  (19, 'Greedy & Intervals', true, 'clock', 'Interval overlapping, merge intervals, activity selection', 19),
  (20, 'Bit Manipulation', false, 'binary', 'Bitwise XOR, power of two, bitmask DP, count set bits', 20),
  (21, 'Math & Number Theory', false, 'hash', 'GCD, primes sieve, modular arithmetic, fast exponentiation', 21),
  (22, 'Design (LLD-style)', true, 'cpu', 'LRU Cache, LFU Cache, Trie, Min Stack, Rate Limiter', 22)
ON CONFLICT (name) DO UPDATE SET
  is_interview_critical = EXCLUDED.is_interview_critical,
  icon = EXCLUDED.icon,
  description = EXCLUDED.description,
  order_index = EXCLUDED.order_index;

-- 2. INITIAL USER SETTINGS & SYNC ROW
INSERT INTO user_sync_store (username, settings, updated_at)
VALUES ('JeevanPranav', '{"ai": {"dailyTargetMinutes": 120, "theme": "dark"}, "dsa": {"dailyTarget": 3, "theme": "dark"}}'::jsonb, NOW())
ON CONFLICT (username) DO NOTHING;
