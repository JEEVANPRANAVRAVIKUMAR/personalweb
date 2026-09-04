// roadmapDataset.js - Complete 365-Day AI Engineer Roadmap dataset with all columns, concepts, sources, tasks, deliverables, and checkpoints
import { SOURCES_DATASET } from './sourcesDataset.js';

export const RAW_ROADMAP_DAYS = [
  // Phase 0: Assessment & setup (Days 1-7)
  {
    day: 1, date: "07-Sep-26", week: 1, phase: "Phase 0 - Assessment & setup",
    topic: "Environment + repo",
    concepts: "uv, pyproject, pytest, pre-commit, pyright",
    learnSection: "PYDOCS: pytest fixtures; PROGIT ch 2",
    sourceKey: "PYDOCS",
    implementTask: "Create `ai-lab` repo skeleton; one typed module + test; CI",
    reviseTask: "Yesterday: -",
    deliverable: "Repo + CI green",
    difficulty: 2, checkpoint: ""
  },
  {
    day: 2, date: "08-Sep-26", week: 1, phase: "Phase 0 - Assessment & setup",
    topic: "Math diagnostic",
    concepts: "LA/calc/prob/opt baseline",
    learnSection: "None - closed-book test",
    sourceKey: "MML",
    implementTask: "Take 20-Q diagnostic (MML chapter exercises); grade; weak list",
    reviseTask: "Yesterday: Environment + repo",
    deliverable: "Score + weak topics",
    difficulty: 2, checkpoint: ""
  },
  {
    day: 3, date: "09-Sep-26", week: 1, phase: "Phase 0 - Assessment & setup",
    topic: "PyTorch diagnostic",
    concepts: "Training loop, backprop",
    learnSection: "None",
    sourceKey: "PT-TUT",
    implementTask: "Blank-file MNIST training loop; derive 2-layer backprop on paper",
    reviseTask: "Yesterday: Math diagnostic",
    deliverable: "Loop + derivation photo",
    difficulty: 2, checkpoint: ""
  },
  {
    day: 4, date: "10-Sep-26", week: 1, phase: "Phase 0 - Assessment & setup",
    topic: "LLM/RAG diagnostic",
    concepts: "Attention, recall@k",
    learnSection: "None",
    sourceKey: "OWN",
    implementTask: "Attention from memory; recall@5 on a past RAG corpus",
    reviseTask: "Yesterday: PyTorch diagnostic",
    deliverable: "Two scripts + gap list",
    difficulty: 2, checkpoint: ""
  },
  {
    day: 5, date: "11-Sep-26", week: 1, phase: "Phase 0 - Assessment & setup",
    topic: "Speech/agent/vector diagnostic",
    concepts: "WER, tool schemas, ANN",
    learnSection: "JIWER README",
    sourceKey: "JIWER",
    implementTask: "WER on Tanglish clips; hackathon agent as plain loop; memory-engine vs FAISS",
    reviseTask: "Yesterday: LLM/RAG diagnostic",
    deliverable: "WER table + benchmark",
    difficulty: 2, checkpoint: ""
  },
  {
    day: 6, date: "12-Sep-26", week: 1, phase: "Phase 0 - Assessment & setup",
    topic: "Async + Docker + Git drills",
    concepts: "asyncio, retries, Dockerfile, rebase/bisect",
    learnSection: "PYDOCS asyncio basics; DOCKER best practices",
    sourceKey: "PYDOCS",
    implementTask: "Async batch caller with rate limit; Dockerfile; rebase drill",
    reviseTask: "Yesterday: Speech/agent/vector diagnostic",
    deliverable: "Container runs; CP0 self-grade",
    difficulty: 2, checkpoint: ""
  },
  {
    day: 7, date: "13-Sep-26", week: 1, phase: "Phase 0 - Assessment & setup",
    topic: "WEEKLY CHECKPOINT 1: Assessment + engineering setup",
    concepts: "Whole week",
    learnSection: "Anki + notes (30 min)",
    sourceKey: "OWN",
    implementTask: "Self-test 10 concept Qs + interview Qs: GIL vs asyncio for LLM calls; Why GPU runs aren't deterministic; What a Docker layer cache does (score bands: <40 weak, 40-60 needs work, 60-75 acceptable, 75-90 strong, 90+ excellent; <75% => revise before next week) (60 min); redo hardest implementation from blank file (30 min)",
    reviseTask: "Whole week",
    deliverable: "Score + 200-word weekly note + push",
    difficulty: 2, checkpoint: "CP0"
  },

  // Phase 1: Mathematics - Linear algebra I (Days 8-14)
  {
    day: 8, date: "14-Sep-26", week: 2, phase: "Phase 1 - Mathematics",
    topic: "Vectors, span, systems",
    concepts: "Linear combinations, REF, Gaussian elimination",
    learnSection: "MML 2.1-2.3; 3B1B-LA ep 1-3",
    sourceKey: "MML",
    implementTask: "Gaussian elimination from scratch; compare np.linalg.solve",
    reviseTask: "Yesterday: Async + Docker + Git drills",
    deliverable: "mathlib/linalg.py + tests",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 9, date: "15-Sep-26", week: 2, phase: "Phase 1 - Mathematics",
    topic: "Vector spaces & independence",
    concepts: "Subspaces, independence test",
    learnSection: "MML 2.4-2.5",
    sourceKey: "MML",
    implementTask: "Independence check via REF; 8 exercises",
    reviseTask: "Yesterday: Vectors, span, systems",
    deliverable: "Commit",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 10, date: "16-Sep-26", week: 2, phase: "Phase 1 - Mathematics",
    topic: "Basis, rank, nullspace",
    concepts: "Rank-nullity, nullspace basis",
    learnSection: "MML 2.6; 3B1B-LA ep 4-5",
    sourceKey: "MML",
    implementTask: "rank(), nullspace()",
    reviseTask: "Yesterday: Vector spaces & independence",
    deliverable: "Commit + tests",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 11, date: "17-Sep-26", week: 2, phase: "Phase 1 - Mathematics",
    topic: "Linear mappings",
    concepts: "Matrix as map, image/kernel, composition",
    learnSection: "MML 2.7; 3B1B-LA ep 6-8",
    sourceKey: "MML",
    implementTask: "Grid-transform visualiser",
    reviseTask: "Yesterday: Basis, rank, nullspace",
    deliverable: "Plot + commit",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 12, date: "18-Sep-26", week: 2, phase: "Phase 1 - Mathematics",
    topic: "Change of basis, affine",
    concepts: "Basis change, affine maps",
    learnSection: "MML 2.7.2-2.8; 3B1B-LA ep 12-13",
    sourceKey: "MML",
    implementTask: "Change-of-basis for rotation",
    reviseTask: "Yesterday: Linear mappings",
    deliverable: "Commit",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 13, date: "19-Sep-26", week: 2, phase: "Phase 1 - Mathematics",
    topic: "Norms & inner products",
    concepts: "Lp norms, inner products, Cauchy-Schwarz",
    learnSection: "MML 3.1-3.3",
    sourceKey: "MML",
    implementTask: "Norms; unit-ball plot; prove C-S once",
    reviseTask: "Yesterday: Change of basis, affine",
    deliverable: "Commit + Anki 30 cards",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 14, date: "20-Sep-26", week: 2, phase: "Phase 1 - Mathematics",
    topic: "WEEKLY CHECKPOINT 2: Linear algebra I",
    concepts: "Whole week",
    learnSection: "Anki + notes (30 min)",
    sourceKey: "OWN",
    implementTask: "Self-test 10 concept Qs + interview Qs: What rank tells you; When Ax=b has no/one/many solutions; Why matmul is composition (score bands: <40 weak, 40-60 needs work, 60-75 acceptable, 75-90 strong, 90+ excellent; <75% => revise before next week) (60 min); redo hardest implementation from blank file (30 min)",
    reviseTask: "Whole week",
    deliverable: "Score + 200-word weekly note + push",
    difficulty: 3, checkpoint: "Weekly Checkpoint"
  },

  // Phase 1: Mathematics - Linear algebra II (Days 15-21)
  {
    day: 15, date: "21-Sep-26", week: 3, phase: "Phase 1 - Mathematics",
    topic: "Angles, orthogonality, Gram-Schmidt",
    concepts: "Cosine similarity, orthonormal basis",
    learnSection: "MML 3.4-3.5, 3.8; 3B1B-LA ep 9",
    sourceKey: "MML",
    implementTask: "cosine_similarity; Gram-Schmidt",
    reviseTask: "Yesterday: Norms & inner products",
    deliverable: "Commit + tests",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 16, date: "22-Sep-26", week: 3, phase: "Phase 1 - Mathematics",
    topic: "Projections & least squares",
    concepts: "Projection matrix; least squares as projection",
    learnSection: "MML 3.8",
    sourceKey: "MML",
    implementTask: "Least squares via projection vs lstsq; derive normal equations",
    reviseTask: "Yesterday: Angles, orthogonality, Gram-Schmidt",
    deliverable: "Derivation + commit",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 17, date: "23-Sep-26", week: 3, phase: "Phase 1 - Mathematics",
    topic: "Determinant & eigen",
    concepts: "Volume scaling; characteristic polynomial; eigenspaces",
    learnSection: "MML 4.1-4.2; 3B1B-LA ep 6, 14",
    sourceKey: "MML",
    implementTask: "det via elimination; power iteration; 2x2 by hand",
    reviseTask: "Yesterday: Projections & least squares",
    deliverable: "Commit",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 18, date: "24-Sep-26", week: 3, phase: "Phase 1 - Mathematics",
    topic: "Eigendecomposition & Cholesky",
    concepts: "Spectral theorem; SPD",
    learnSection: "MML 4.3-4.4",
    sourceKey: "MML",
    implementTask: "Symmetric eigendecomp; reconstruct A",
    reviseTask: "Yesterday: Determinant & eigen",
    deliverable: "Commit + tests",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 19, date: "25-Sep-26", week: 3, phase: "Phase 1 - Mathematics",
    topic: "SVD",
    concepts: "U Sigma V^T; relation to A^T A; low rank",
    learnSection: "MML 4.5-4.6",
    sourceKey: "MML",
    implementTask: "SVD via eigen(A^T A); image compression",
    reviseTask: "Yesterday: Eigendecomposition & Cholesky",
    deliverable: "Plot + commit",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 20, date: "26-Sep-26", week: 3, phase: "Phase 1 - Mathematics",
    topic: "PCA",
    concepts: "Max-variance projection; explained variance",
    learnSection: "MML 10.1-10.3",
    sourceKey: "MML",
    implementTask: "PCA from your SVD on Iris; derive objective",
    reviseTask: "Yesterday: SVD",
    deliverable: "pca() + derivation",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 21, date: "27-Sep-26", week: 3, phase: "Phase 1 - Mathematics",
    topic: "WEEKLY CHECKPOINT 3: Linear algebra II",
    concepts: "Whole week",
    learnSection: "Anki + notes (30 min)",
    sourceKey: "OWN",
    implementTask: "Self-test 10 concept Qs + interview Qs: Derive PCA; Why SVD always exists; Low rank and LoRA (score bands: <40 weak, 40-60 needs work, 60-75 acceptable, 75-90 strong, 90+ excellent; <75% => revise before next week) (60 min); redo hardest implementation from blank file (30 min)",
    reviseTask: "Whole week",
    deliverable: "Score + 200-word weekly note + push",
    difficulty: 4, checkpoint: "Weekly Checkpoint"
  },

  // Phase 1: Mathematics - Calculus & optimisation (Days 22-28)
  {
    day: 22, date: "28-Sep-26", week: 4, phase: "Phase 1 - Mathematics",
    topic: "Derivatives, Taylor",
    concepts: "Rules; Taylor polynomials",
    learnSection: "MML 5.1; 3B1B-CALC ep 1-4",
    sourceKey: "MML",
    implementTask: "Numerical derivative; Taylor plots",
    reviseTask: "Yesterday: PCA",
    deliverable: "Commit",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 23, date: "29-Sep-26", week: 4, phase: "Phase 1 - Mathematics",
    topic: "Partials, gradients, Jacobians",
    concepts: "Gradient vector; Jacobian",
    learnSection: "MML 5.2-5.3",
    sourceKey: "MML",
    implementTask: "Numerical gradient checker",
    reviseTask: "Yesterday: Derivatives, Taylor",
    deliverable: "Commit + tests",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 24, date: "30-Sep-26", week: 4, phase: "Phase 1 - Mathematics",
    topic: "Chain rule = backprop",
    concepts: "Multivariate chain rule; reverse-mode AD",
    learnSection: "MML 5.3-5.6",
    sourceKey: "MML",
    implementTask: "Gradients of x^T A x, ||Ax-b||^2, softmax-CE by hand; tiny reverse-mode AD",
    reviseTask: "Yesterday: Partials, gradients, Jacobians",
    deliverable: "autodiff.py",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 25, date: "01-Oct-26", week: 4, phase: "Phase 1 - Mathematics",
    topic: "Hessian & convexity",
    concepts: "Curvature, saddles, convex sets, Jensen",
    learnSection: "MML 5.7-5.8, 7.3",
    sourceKey: "MML",
    implementTask: "Hessian of 2-D function; convexity check",
    reviseTask: "Yesterday: Chain rule = backprop",
    deliverable: "Commit",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 26, date: "02-Oct-26", week: 4, phase: "Phase 1 - Mathematics",
    topic: "GD, SGD, momentum",
    concepts: "Step size, momentum, schedules",
    learnSection: "MML 7.1",
    sourceKey: "MML",
    implementTask: "GD/SGD/momentum on bowl + Rosenbrock; animation",
    reviseTask: "Yesterday: Hessian & convexity",
    deliverable: "optim.py part 1",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 27, date: "03-Oct-26", week: 4, phase: "Phase 1 - Mathematics",
    topic: "Adam, regularisation, Lagrange",
    concepts: "Adaptive LR, bias correction, L1/L2, MAP=L2",
    learnSection: "MML 7.2, 8.2-8.3; Adam paper sec 2 (arxiv 1412.6980)",
    sourceKey: "MML",
    implementTask: "Adam + RMSProp; ridge closed form; derive MAP<->L2",
    reviseTask: "Yesterday: GD, SGD, momentum",
    deliverable: "optim.py complete",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 28, date: "04-Oct-26", week: 4, phase: "Phase 1 - Mathematics",
    topic: "WEEKLY CHECKPOINT 4: Calculus & optimisation",
    concepts: "Whole week",
    learnSection: "Anki + notes (30 min)",
    sourceKey: "OWN",
    implementTask: "Self-test 10 concept Qs + interview Qs: Why Adam bias correction; Why L1 gives sparsity; When GD oscillates (score bands: <40 weak, 40-60 needs work, 60-75 acceptable, 75-90 strong, 90+ excellent; <75% => revise before next week) (60 min); redo hardest implementation from blank file (30 min)",
    reviseTask: "Whole week",
    deliverable: "Score + 200-word weekly note + push",
    difficulty: 4, checkpoint: "Weekly Checkpoint"
  },

  // Phase 1: Mathematics - Probability (Days 29-35)
  {
    day: 29, date: "05-Oct-26", week: 5, phase: "Phase 1 - Mathematics",
    topic: "Probability space, RVs",
    concepts: "PMF/PDF/CDF",
    learnSection: "MML 6.1",
    sourceKey: "MML",
    implementTask: "Simulations vs theory",
    reviseTask: "Yesterday: Adam, regularisation, Lagrange",
    deliverable: "Commit",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 30, date: "06-Oct-26", week: 5, phase: "Phase 1 - Mathematics",
    topic: "Sum/product rules, Bayes",
    concepts: "Marginals, conditionals, Bayes",
    learnSection: "MML 6.2-6.3",
    sourceKey: "MML",
    implementTask: "Bayes calculator (medical test)",
    reviseTask: "Yesterday: Probability space, RVs",
    deliverable: "Commit",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 31, date: "07-Oct-26", week: 5, phase: "Phase 1 - Mathematics",
    topic: "Expectation, variance, covariance",
    concepts: "Moments; covariance matrix",
    learnSection: "MML 6.4",
    sourceKey: "MML",
    implementTask: "Covariance from scratch vs np.cov",
    reviseTask: "Yesterday: Sum/product rules, Bayes",
    deliverable: "Commit + tests",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 32, date: "08-Oct-26", week: 5, phase: "Phase 1 - Mathematics",
    topic: "Gaussians",
    concepts: "Multivariate; marginals/conditionals; Cholesky sampling",
    learnSection: "MML 6.5",
    sourceKey: "MML",
    implementTask: "2-D Gaussian sampler + ellipse; derive linear transform",
    reviseTask: "Yesterday: Expectation, variance, covariance",
    deliverable: "Plot + derivation",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 33, date: "09-Oct-26", week: 5, phase: "Phase 1 - Mathematics",
    topic: "Exponential family, MLE/MAP",
    concepts: "Bernoulli/beta/Poisson; conjugacy; MLE->MSE/CE",
    learnSection: "MML 6.6, 8.3",
    sourceKey: "MML",
    implementTask: "Beta-binomial updates; derive MLE->CE",
    reviseTask: "Yesterday: Gaussians",
    deliverable: "Derivations",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 34, date: "10-Oct-26", week: 5, phase: "Phase 1 - Mathematics",
    topic: "Entropy, KL, Naive Bayes",
    concepts: "Information theory basics; NB with smoothing",
    learnSection: "MML 6.6 + OWN notes",
    sourceKey: "OWN",
    implementTask: "entropy/KL; Naive Bayes on SMS spam",
    reviseTask: "Yesterday: Exponential family, MLE/MAP",
    deliverable: "naive_bayes.py + Anki",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 35, date: "11-Oct-26", week: 5, phase: "Phase 1 - Mathematics",
    topic: "WEEKLY CHECKPOINT 5: Probability",
    concepts: "Whole week",
    learnSection: "Anki + notes (30 min)",
    sourceKey: "OWN",
    implementTask: "Self-test 10 concept Qs + interview Qs: Why CE is the right loss; Where KL appears in DPO; Base-rate fallacy example (score bands: <40 weak, 40-60 needs work, 60-75 acceptable, 75-90 strong, 90+ excellent; <75% => revise before next week) (60 min); redo hardest implementation from blank file (30 min)",
    reviseTask: "Whole week",
    deliverable: "Score + 200-word weekly note + push",
    difficulty: 3, checkpoint: "Weekly Checkpoint"
  },

  // Phase 1: Mathematics - Statistics (Days 36-42)
  {
    day: 36, date: "12-Oct-26", week: 6, phase: "Phase 1 - Mathematics",
    topic: "Sampling & CLT",
    concepts: "Sampling distributions, standard error",
    learnSection: "BRUCE ch 2",
    sourceKey: "BRUCE",
    implementTask: "CLT simulation",
    reviseTask: "Yesterday: Entropy, KL, Naive Bayes",
    deliverable: "Commit",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 37, date: "13-Oct-26", week: 6, phase: "Phase 1 - Mathematics",
    topic: "Confidence intervals & bootstrap",
    concepts: "CIs, bootstrap",
    learnSection: "BRUCE ch 2",
    sourceKey: "BRUCE",
    implementTask: "Bootstrap CI for accuracy",
    reviseTask: "Yesterday: Sampling & CLT",
    deliverable: "bootstrap_ci()",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 38, date: "14-Oct-26", week: 6, phase: "Phase 1 - Mathematics",
    topic: "Hypothesis testing",
    concepts: "t-test, permutation, p-values",
    learnSection: "BRUCE ch 3",
    sourceKey: "BRUCE",
    implementTask: "t-test + permutation test; compare two models",
    reviseTask: "Yesterday: Confidence intervals & bootstrap",
    deliverable: "Commit + tests",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 39, date: "15-Oct-26", week: 6, phase: "Phase 1 - Mathematics",
    topic: "Correlation & regression stats",
    concepts: "Pearson/Spearman, R^2, residuals, confounding",
    learnSection: "BRUCE ch 1, 4",
    sourceKey: "BRUCE",
    implementTask: "Correlation + residual plots on AI4I data",
    reviseTask: "Yesterday: Hypothesis testing",
    deliverable: "Commit",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 40, date: "16-Oct-26", week: 6, phase: "Phase 1 - Mathematics",
    topic: "A/B tests & drift tests",
    concepts: "Power, KS, PSI",
    learnSection: "BRUCE ch 3; EVIDENTLY concepts",
    sourceKey: "EVIDENTLY",
    implementTask: "A/B simulator; KS + PSI detector",
    reviseTask: "Yesterday: Correlation & regression stats",
    deliverable: "drift.py",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 41, date: "17-Oct-26", week: 6, phase: "Phase 1 - Mathematics",
    topic: "Math diagnostic v2",
    concepts: "All Phase 1",
    learnSection: "Anki review",
    sourceKey: "OWN",
    implementTask: "Retake 20-Q diagnostic; fix weak items",
    reviseTask: "Yesterday: A/B tests & drift tests",
    deliverable: "Score >=75%; mathlib v1.0",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 42, date: "18-Oct-26", week: 6, phase: "Phase 1 - Mathematics",
    topic: "WEEKLY CHECKPOINT 6: Statistics",
    concepts: "Whole week",
    learnSection: "Anki + notes (30 min)",
    sourceKey: "OWN",
    implementTask: "Self-test 10 concept Qs + interview Qs: Bootstrap vs normal CI; What PSI measures; Compare two RAG configs statistically (score bands: <40 weak, 40-60 needs work, 60-75 acceptable, 75-90 strong, 90+ excellent; <75% => revise before next week) (60 min); redo hardest implementation from blank file (30 min)",
    reviseTask: "Whole week",
    deliverable: "Score + 200-word weekly note + push",
    difficulty: 3, checkpoint: "Math diagnostic v2"
  },

  // Phase 2: Classical & advanced ML - Regression, classification, metrics (Days 43-49)
  {
    day: 43, date: "19-Oct-26", week: 7, phase: "Phase 2 - Classical & advanced ML",
    topic: "Linear regression",
    concepts: "MSE, GD, normal equation, scaling",
    learnSection: "NG C1 W1-2",
    sourceKey: "NG",
    implementTask: "Linear regression from scratch vs sklearn",
    reviseTask: "Yesterday: Math diagnostic v2",
    deliverable: "ml/linear.py",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 44, date: "20-Oct-26", week: 7, phase: "Phase 2 - Classical & advanced ML",
    topic: "Logistic regression",
    concepts: "Sigmoid, log loss, boundary",
    learnSection: "NG C1 W3",
    sourceKey: "NG",
    implementTask: "Logistic from scratch",
    reviseTask: "Yesterday: Linear regression",
    deliverable: "ml/logistic.py",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 45, date: "21-Oct-26", week: 7, phase: "Phase 2 - Classical & advanced ML",
    topic: "Regularisation & softmax",
    concepts: "L1/L2, early stopping, softmax regression",
    learnSection: "NG C1 W3; GERON ch 4",
    sourceKey: "GERON",
    implementTask: "Ridge/lasso paths; softmax on Iris",
    reviseTask: "Yesterday: Logistic regression",
    deliverable: "Commit",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 46, date: "22-Oct-26", week: 7, phase: "Phase 2 - Classical & advanced ML",
    topic: "Classification metrics",
    concepts: "Confusion, P/R/F1, PR vs ROC, thresholds",
    learnSection: "GERON ch 3",
    sourceKey: "GERON",
    implementTask: "Metrics from scratch; curves",
    reviseTask: "Yesterday: Regularisation & softmax",
    deliverable: "ml/metrics.py",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 47, date: "23-Oct-26", week: 7, phase: "Phase 2 - Classical & advanced ML",
    topic: "Calibration & cost",
    concepts: "Reliability diagrams, isotonic, expected cost",
    learnSection: "GERON ch 3 + sklearn calibration docs",
    sourceKey: "GERON",
    implementTask: "Calibration curve; cost-based threshold",
    reviseTask: "Yesterday: Classification metrics",
    deliverable: "Commit",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 48, date: "24-Oct-26", week: 7, phase: "Phase 2 - Classical & advanced ML",
    topic: "kNN & curse of dimensionality",
    concepts: "kNN; distances; link to ANN",
    learnSection: "GERON ch 2 (kNN) + OWN",
    sourceKey: "OWN",
    implementTask: "kNN from scratch; dimensionality experiment",
    reviseTask: "Yesterday: Calibration & cost",
    deliverable: "ml/knn.py + Anki",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 49, date: "25-Oct-26", week: 7, phase: "Phase 2 - Classical & advanced ML",
    topic: "WEEKLY CHECKPOINT 7: Regression, classification, metrics",
    concepts: "Whole week",
    learnSection: "Anki + notes (30 min)",
    sourceKey: "OWN",
    implementTask: "Self-test 10 concept Qs + interview Qs: PR-AUC vs ROC-AUC; Why calibrate GBMs; kNN in high dimensions (score bands: <40 weak, 40-60 needs work, 60-75 acceptable, 75-90 strong, 90+ excellent; <75% => revise before next week) (60 min); redo hardest implementation from blank file (30 min)",
    reviseTask: "Whole week",
    deliverable: "Score + 200-word weekly note + push",
    difficulty: 3, checkpoint: "Weekly Checkpoint"
  },

  // Phase 2: Classical & advanced ML - Trees, forests, boosting (Days 50-56)
  {
    day: 50, date: "26-Oct-26", week: 8, phase: "Phase 2 - Classical & advanced ML",
    topic: "Decision trees",
    concepts: "Entropy/Gini, CART, pruning",
    learnSection: "GERON ch 6; NG C2 W4",
    sourceKey: "GERON",
    implementTask: "CART from scratch",
    reviseTask: "Yesterday: kNN & curse of dimensionality",
    deliverable: "ml/tree.py",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 51, date: "27-Oct-26", week: 8, phase: "Phase 2 - Classical & advanced ML",
    topic: "Random forests",
    concepts: "Bootstrap, feature subsampling, OOB",
    learnSection: "GERON ch 7",
    sourceKey: "GERON",
    implementTask: "RF from your tree",
    reviseTask: "Yesterday: Decision trees",
    deliverable: "Commit",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 52, date: "28-Oct-26", week: 8, phase: "Phase 2 - Classical & advanced ML",
    topic: "Gradient boosting",
    concepts: "Residual fitting, shrinkage, early stopping",
    learnSection: "GERON ch 7; XGBoost paper sec 2 (arxiv 1603.02754)",
    sourceKey: "GERON",
    implementTask: "Own GBM (regression + logistic)",
    reviseTask: "Yesterday: Random forests",
    deliverable: "ml/gbm.py",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 53, date: "29-Oct-26", week: 8, phase: "Phase 2 - Classical & advanced ML",
    topic: "LightGBM/CatBoost in practice",
    concepts: "Histogram, leaf-wise, ordered boosting; key params",
    learnSection: "LGBM tuning page",
    sourceKey: "LGBM",
    implementTask: "Tune 5 params on AI4I; compare libs",
    reviseTask: "Yesterday: Gradient boosting",
    deliverable: "Table",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 54, date: "30-Oct-26", week: 8, phase: "Phase 2 - Classical & advanced ML",
    topic: "SHAP",
    concepts: "Shapley values, TreeSHAP, PDP",
    learnSection: "SHAP intro",
    sourceKey: "SHAP",
    implementTask: "SHAP on GBM",
    reviseTask: "Yesterday: LightGBM/CatBoost in practice",
    deliverable: "Plots",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 55, date: "31-Oct-26", week: 8, phase: "Phase 2 - Classical & advanced ML",
    topic: "Bias-variance",
    concepts: "Decomposition, learning curves, nested CV",
    learnSection: "NG C2 W3",
    sourceKey: "NG",
    implementTask: "Bias-variance simulation; learning curves",
    reviseTask: "Yesterday: SHAP",
    deliverable: "Commit + Anki",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 56, date: "01-Nov-26", week: 8, phase: "Phase 2 - Classical & advanced ML",
    topic: "WEEKLY CHECKPOINT 8: Trees, forests, boosting",
    concepts: "Whole week",
    learnSection: "Anki + notes (30 min)",
    sourceKey: "OWN",
    implementTask: "Self-test 10 concept Qs + interview Qs: Boosting vs bagging overfitting; Second-order split gain; When SHAP misleads (score bands: <40 weak, 40-60 needs work, 60-75 acceptable, 75-90 strong, 90+ excellent; <75% => revise before next week) (60 min); redo hardest implementation from blank file (30 min)",
    reviseTask: "Whole week",
    deliverable: "Score + 200-word weekly note + push",
    difficulty: 3, checkpoint: "Weekly Checkpoint"
  },

  // Phase 2: Classical & advanced ML - Unsupervised & anomaly (Days 57-63)
  {
    day: 57, date: "02-Nov-26", week: 9, phase: "Phase 2 - Classical & advanced ML",
    topic: "SVM",
    concepts: "Margin, hinge, C, kernels",
    learnSection: "GERON ch 5",
    sourceKey: "GERON",
    implementTask: "Linear SVM via hinge-loss SGD; kernel SVM (sklearn)",
    reviseTask: "Yesterday: Bias-variance",
    deliverable: "ml/svm.py",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 58, date: "03-Nov-26", week: 9, phase: "Phase 2 - Classical & advanced ML",
    topic: "k-means",
    concepts: "Lloyd's, k-means++, silhouette",
    learnSection: "GERON ch 9; NG C3 W1",
    sourceKey: "GERON",
    implementTask: "k-means from scratch",
    reviseTask: "Yesterday: SVM",
    deliverable: "ml/kmeans.py",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 59, date: "04-Nov-26", week: 9, phase: "Phase 2 - Classical & advanced ML",
    topic: "DBSCAN",
    concepts: "Density clustering",
    learnSection: "GERON ch 9",
    sourceKey: "GERON",
    implementTask: "DBSCAN from scratch",
    reviseTask: "Yesterday: k-means",
    deliverable: "Commit",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 60, date: "05-Nov-26", week: 9, phase: "Phase 2 - Classical & advanced ML",
    topic: "GMM & EM",
    concepts: "Responsibilities; E/M steps",
    learnSection: "GERON ch 9; MML 11.1-11.3",
    sourceKey: "MML",
    implementTask: "GMM via EM; derive steps",
    reviseTask: "Yesterday: DBSCAN",
    deliverable: "ml/gmm.py",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 61, date: "06-Nov-26", week: 9, phase: "Phase 2 - Classical & advanced ML",
    topic: "PCA/t-SNE in practice",
    concepts: "Whitening; visualisation caveats",
    learnSection: "GERON ch 8",
    sourceKey: "GERON",
    implementTask: "PCA vs t-SNE on MNIST",
    reviseTask: "Yesterday: GMM & EM",
    deliverable: "Plots",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 62, date: "07-Nov-26", week: 9, phase: "Phase 2 - Classical & advanced ML",
    topic: "Anomaly detection",
    concepts: "Gaussian AD, Isolation Forest, OC-SVM, LOF",
    learnSection: "NG C3 W1 + sklearn outlier docs",
    sourceKey: "NG",
    implementTask: "3 detectors on vibration features; PR-AUC",
    reviseTask: "Yesterday: PCA/t-SNE in practice",
    deliverable: "ml/anomaly.py + Anki",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 63, date: "08-Nov-26", week: 9, phase: "Phase 2 - Classical & advanced ML",
    topic: "WEEKLY CHECKPOINT 9: Unsupervised & anomaly",
    concepts: "Whole week",
    learnSection: "Anki + notes (30 min)",
    sourceKey: "OWN",
    implementTask: "Self-test 10 concept Qs + interview Qs: Kernel trick in one sentence; EM vs k-means; Evaluate AD with 5 labels (score bands: <40 weak, 40-60 needs work, 60-75 acceptable, 75-90 strong, 90+ excellent; <75% => revise before next week) (60 min); redo hardest implementation from blank file (30 min)",
    reviseTask: "Whole week",
    deliverable: "Score + 200-word weekly note + push",
    difficulty: 3, checkpoint: "Weekly Checkpoint"
  },

  // Phase 2: Classical & advanced ML - Advanced ML (Days 64-70)
  {
    day: 64, date: "09-Nov-26", week: 10, phase: "Phase 2 - Classical & advanced ML",
    topic: "Class imbalance",
    concepts: "Weights, resampling caveats, threshold moving",
    learnSection: "IMBL user guide",
    sourceKey: "IMBL",
    implementTask: "Ablation: weights vs SMOTE vs threshold",
    reviseTask: "Yesterday: Anomaly detection",
    deliverable: "Table",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 65, date: "10-Nov-26", week: 10, phase: "Phase 2 - Classical & advanced ML",
    topic: "Feature engineering & leakage",
    concepts: "Encodings, target encoding w/ CV, leakage",
    learnSection: "KAGGLE-FE",
    sourceKey: "KAGGLE-FE",
    implementTask: "Feature pipeline as transformers; leakage check",
    reviseTask: "Yesterday: Class imbalance",
    deliverable: "features.py",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 66, date: "11-Nov-26", week: 10, phase: "Phase 2 - Classical & advanced ML",
    topic: "Time-series validation",
    concepts: "Rolling/lag/FFT features; TimeSeriesSplit",
    learnSection: "OWN + sklearn TimeSeriesSplit docs",
    sourceKey: "OWN",
    implementTask: "Rolling/FFT features on vibration",
    reviseTask: "Yesterday: Feature engineering & leakage",
    deliverable: "ts_features.py",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 67, date: "12-Nov-26", week: 10, phase: "Phase 2 - Classical & advanced ML",
    topic: "Recommenders",
    concepts: "MF, implicit feedback, NDCG",
    learnSection: "NG C3 W2",
    sourceKey: "NG",
    implementTask: "MF on MovieLens 100k",
    reviseTask: "Yesterday: Time-series validation",
    deliverable: "ml/recsys.py",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 68, date: "13-Nov-26", week: 10, phase: "Phase 2 - Classical & advanced ML",
    topic: "Model debugging",
    concepts: "Train/val gap, slices, error analysis",
    learnSection: "KRECIPE (ML parts)",
    sourceKey: "KRECIPE",
    implementTask: "Slice evaluator; fix a broken model",
    reviseTask: "Yesterday: Recommenders",
    deliverable: "Playbook.md",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 69, date: "14-Nov-26", week: 10, phase: "Phase 2 - Classical & advanced ML",
    topic: "Hyperparameter search",
    concepts: "Random/Bayesian (Optuna), pruning",
    learnSection: "OPTUNA tutorial",
    sourceKey: "OPTUNA",
    implementTask: "Optuna on GBM",
    reviseTask: "Yesterday: Model debugging",
    deliverable: "tune.py + Anki",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 70, date: "15-Nov-26", week: 10, phase: "Phase 2 - Classical & advanced ML",
    topic: "WEEKLY CHECKPOINT 10: Advanced ML",
    concepts: "Whole week",
    learnSection: "Anki + notes (30 min)",
    sourceKey: "OWN",
    implementTask: "Self-test 10 concept Qs + interview Qs: When SMOTE hurts; Detect leakage before training; Nested vs plain CV (score bands: <40 weak, 40-60 needs work, 60-75 acceptable, 75-90 strong, 90+ excellent; <75% => revise before next week) (60 min); redo hardest implementation from blank file (30 min)",
    reviseTask: "Whole week",
    deliverable: "Score + 200-word weekly note + push",
    difficulty: 4, checkpoint: "Weekly Checkpoint"
  },

  // Phase 2: PROJECT 1: PredictiveMaint-ML (Days 71-84, CP1)
  {
    day: 71, date: "16-Nov-26", week: 11, phase: "Phase 2 - Classical & advanced ML",
    topic: "P1 framing & data",
    concepts: "C-MAPSS + AI4I; cost model",
    learnSection: "Dataset docs (NASA C-MAPSS; UCI AI4I 2020)",
    sourceKey: "OWN",
    implementTask: "Ingestion + schema tests + EDA",
    reviseTask: "Yesterday: Hyperparameter search",
    deliverable: "Data loaded",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 72, date: "17-Nov-26", week: 11, phase: "Phase 2 - Classical & advanced ML",
    topic: "P1 validation & baseline",
    concepts: "Time-based CV; baselines",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "CV harness; baseline metrics",
    reviseTask: "Yesterday: P1 framing & data",
    deliverable: "Baseline report",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 73, date: "18-Nov-26", week: 11, phase: "Phase 2 - Classical & advanced ML",
    topic: "P1 features",
    concepts: "Rolling/FFT features",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Feature pipeline",
    reviseTask: "Yesterday: P1 validation & baseline",
    deliverable: "Commit",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 74, date: "19-Nov-26", week: 11, phase: "Phase 2 - Classical & advanced ML",
    topic: "P1 models",
    concepts: "Logistic, RF, LightGBM",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Train 3 models; compare",
    reviseTask: "Yesterday: P1 features",
    deliverable: "Table",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 75, date: "20-Nov-26", week: 11, phase: "Phase 2 - Classical & advanced ML",
    topic: "P1 calibration & cost",
    concepts: "Calibrate; cost threshold",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Calibrate; cost curve",
    reviseTask: "Yesterday: P1 models",
    deliverable: "Commit",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 76, date: "21-Nov-26", week: 11, phase: "Phase 2 - Classical & advanced ML",
    topic: "P1 tuning",
    concepts: "Optuna",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Tune best model",
    reviseTask: "Yesterday: P1 calibration & cost",
    deliverable: "Final model",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 77, date: "22-Nov-26", week: 11, phase: "Phase 2 - Classical & advanced ML",
    topic: "WEEKLY CHECKPOINT 11: PROJECT 1: PredictiveMaint-ML (week 1)",
    concepts: "Whole week",
    learnSection: "Anki + notes (30 min)",
    sourceKey: "OWN",
    implementTask: "Self-test 10 concept Qs + interview Qs: Why time-based CV; Defend metric choice; Baseline choice (score bands: <40 weak, 40-60 needs work, 60-75 acceptable, 75-90 strong, 90+ excellent; <75% => revise before next week) (60 min); redo hardest implementation from blank file (30 min)",
    reviseTask: "Whole week",
    deliverable: "Score + 200-word weekly note + push",
    difficulty: 4, checkpoint: "Weekly Checkpoint"
  },
  {
    day: 78, date: "23-Nov-26", week: 12, phase: "Phase 2 - Classical & advanced ML",
    topic: "P1 error analysis",
    concepts: "Slices, failure modes",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Error analysis",
    reviseTask: "Yesterday: P1 tuning",
    deliverable: "Report",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 79, date: "24-Nov-26", week: 12, phase: "Phase 2 - Classical & advanced ML",
    topic: "P1 SHAP",
    concepts: "Interpretation",
    learnSection: "Refer SHAP documentation as needed",
    sourceKey: "SHAP",
    implementTask: "SHAP plots",
    reviseTask: "Yesterday: P1 error analysis",
    deliverable: "Plots",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 80, date: "25-Nov-26", week: 12, phase: "Phase 2 - Classical & advanced ML",
    topic: "P1 model card",
    concepts: "Documentation standard",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Model card",
    reviseTask: "Yesterday: P1 SHAP",
    deliverable: "model_card.md",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 81, date: "26-Nov-26", week: 12, phase: "Phase 2 - Classical & advanced ML",
    topic: "P1 README + reproducibility",
    concepts: "Clean-clone reproduce",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Reproduce from scratch; fix",
    reviseTask: "Yesterday: P1 model card",
    deliverable: "README",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 82, date: "27-Nov-26", week: 12, phase: "Phase 2 - Classical & advanced ML",
    topic: "P1 API stub",
    concepts: "FastAPI batch scoring",
    learnSection: "FASTAPI tutorial",
    sourceKey: "FASTAPI",
    implementTask: "Scoring endpoint + test",
    reviseTask: "Yesterday: P1 README + reproducibility",
    deliverable: "API",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 83, date: "28-Nov-26", week: 12, phase: "Phase 2 - Classical & advanced ML",
    topic: "P1 defence",
    concepts: "9 project questions",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Answer in writing; 5-min recorded explanation",
    reviseTask: "Yesterday: P1 API stub",
    deliverable: "CP1 self-grade",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 84, date: "29-Nov-26", week: 12, phase: "Phase 2 - Classical & advanced ML",
    topic: "WEEKLY CHECKPOINT 12: PROJECT 1 (week 2)",
    concepts: "Whole week",
    learnSection: "Anki + notes (30 min)",
    sourceKey: "OWN",
    implementTask: "Self-test 10 concept Qs + interview Qs: What leaked and how found; What you'd change in V2; Cost-curve interpretation (score bands: <40 weak, 40-60 needs work, 60-75 acceptable, 75-90 strong, 90+ excellent; <75% => revise before next week) (60 min); redo hardest implementation from blank file (30 min)",
    reviseTask: "Whole week",
    deliverable: "Score + 200-word weekly note + push",
    difficulty: 4, checkpoint: "CP1"
  },

  // Phase 3: Deep learning & PyTorch - DL from scratch (Days 85-91)
  {
    day: 85, date: "30-Nov-26", week: 13, phase: "Phase 3 - Deep learning & PyTorch",
    topic: "micrograd I",
    concepts: "Derivatives, graph, forward",
    learnSection: "KZ micrograd (first half)",
    sourceKey: "KZ",
    implementTask: "Value class + forward",
    reviseTask: "Yesterday: P1 defence",
    deliverable: "Commit",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 86, date: "01-Dec-26", week: 13, phase: "Phase 3 - Deep learning & PyTorch",
    topic: "micrograd II",
    concepts: "Backward, topological sort, MLP, training loop",
    learnSection: "KZ micrograd (second half)",
    sourceKey: "KZ",
    implementTask: "backward() + MLP; gradient check",
    reviseTask: "Yesterday: micrograd I",
    deliverable: "Gradcheck <1e-5",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 87, date: "02-Dec-26", week: 13, phase: "Phase 3 - Deep learning & PyTorch",
    topic: "makemore 1",
    concepts: "Bigram, NLL, one-layer NN",
    learnSection: "KZ makemore 1",
    sourceKey: "KZ",
    implementTask: "Bigram LM (counts + NN)",
    reviseTask: "Yesterday: micrograd II",
    deliverable: "Commit",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 88, date: "03-Dec-26", week: 13, phase: "Phase 3 - Deep learning & PyTorch",
    topic: "makemore 2",
    concepts: "Embeddings, context, mini-batch, LR sweep",
    learnSection: "KZ makemore 2",
    sourceKey: "KZ",
    implementTask: "MLP LM; LR sweep plot",
    reviseTask: "Yesterday: makemore 1",
    deliverable: "Commit",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 89, date: "04-Dec-26", week: 13, phase: "Phase 3 - Deep learning & PyTorch",
    topic: "makemore 3",
    concepts: "Init, saturation, batchnorm",
    learnSection: "KZ makemore 3",
    sourceKey: "KZ",
    implementTask: "BatchNorm1d from scratch; stats plots",
    reviseTask: "Yesterday: makemore 2",
    deliverable: "Commit",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 90, date: "05-Dec-26", week: 13, phase: "Phase 3 - Deep learning & PyTorch",
    topic: "makemore 4",
    concepts: "Manual backprop through CE/linear/tanh/BN",
    learnSection: "KZ makemore 4",
    sourceKey: "KZ",
    implementTask: "Manual gradients match PyTorch",
    reviseTask: "Yesterday: makemore 3",
    deliverable: "allclose passes + Anki",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 91, date: "06-Dec-26", week: 13, phase: "Phase 3 - Deep learning & PyTorch",
    topic: "WEEKLY CHECKPOINT 13: DL from scratch",
    concepts: "Whole week",
    learnSection: "Anki + notes (30 min)",
    sourceKey: "OWN",
    implementTask: "Self-test 10 concept Qs + interview Qs: Why Kaiming init; BatchNorm at test time; Backprop of softmax-CE (score bands: <40 weak, 40-60 needs work, 60-75 acceptable, 75-90 strong, 90+ excellent; <75% => revise before next week) (60 min); redo hardest implementation from blank file (30 min)",
    reviseTask: "Whole week",
    deliverable: "Score + 200-word weekly note + push",
    difficulty: 4, checkpoint: "Weekly Checkpoint"
  },

  // Phase 3: Deep learning & PyTorch - PyTorch mastery (Days 92-98)
  {
    day: 92, date: "07-Dec-26", week: 14, phase: "Phase 3 - Deep learning & PyTorch",
    topic: "Tensors & autograd",
    concepts: "Views, broadcasting, autograd graph, detach",
    learnSection: "PT-TUT Basics + Autograd",
    sourceKey: "PT-TUT",
    implementTask: "Autograd experiments; custom autograd.Function",
    reviseTask: "Yesterday: makemore 4",
    deliverable: "Commit",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 93, date: "08-Dec-26", week: 14, phase: "Phase 3 - Deep learning & PyTorch",
    topic: "Dataset/DataLoader/nn.Module",
    concepts: "Custom datasets, collate, workers",
    learnSection: "PT-TUT Data",
    sourceKey: "PT-TUT",
    implementTask: "Dataset for vibration windows; Module",
    reviseTask: "Yesterday: Tensors & autograd",
    deliverable: "Commit + tests",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 94, date: "09-Dec-26", week: 14, phase: "Phase 3 - Deep learning & PyTorch",
    topic: "Training loop from memory",
    concepts: "Optimizers, schedulers, clipping, eval mode",
    learnSection: "PT-TUT Optimization",
    sourceKey: "PT-TUT",
    implementTask: "Blank-file loop with config/seed/logging (timed)",
    reviseTask: "Yesterday: Dataset/DataLoader/nn.Module",
    deliverable: "<20 min from memory",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 95, date: "10-Dec-26", week: 14, phase: "Phase 3 - Deep learning & PyTorch",
    topic: "AMP + checkpoints",
    concepts: "autocast, GradScaler, resume",
    learnSection: "PT-AMP; PT-TUT Save/Load",
    sourceKey: "PT-AMP",
    implementTask: "AMP loop on 3060; VRAM vs batch; resume",
    reviseTask: "Yesterday: Training loop from memory",
    deliverable: "Table",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 96, date: "11-Dec-26", week: 14, phase: "Phase 3 - Deep learning & PyTorch",
    topic: "Profiling",
    concepts: "torch.profiler; data-loading bottlenecks",
    learnSection: "PT-PROF",
    sourceKey: "PT-PROF",
    implementTask: "Profile; fix top bottleneck",
    reviseTask: "Yesterday: AMP + checkpoints",
    deliverable: "Report",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 97, date: "12-Dec-26", week: 14, phase: "Phase 3 - Deep learning & PyTorch",
    topic: "makemore 5 + torch.compile",
    concepts: "WaveNet-style model; compile speed test",
    learnSection: "KZ makemore 5; torch.compile docs",
    sourceKey: "KZ",
    implementTask: "WaveNet makemore; compile timing",
    reviseTask: "Yesterday: Profiling",
    deliverable: "Commit + Anki",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 98, date: "13-Dec-26", week: 14, phase: "Phase 3 - Deep learning & PyTorch",
    topic: "WEEKLY CHECKPOINT 14: PyTorch mastery",
    concepts: "Whole week",
    learnSection: "Anki + notes (30 min)",
    sourceKey: "OWN",
    implementTask: "Self-test 10 concept Qs + interview Qs: autocast vs GradScaler; Why num_workers matters; What torch.compile does (score bands: <40 weak, 40-60 needs work, 60-75 acceptable, 75-90 strong, 90+ excellent; <75% => revise before next week) (60 min); redo hardest implementation from blank file (30 min)",
    reviseTask: "Whole week",
    deliverable: "Score + 200-word weekly note + push",
    difficulty: 3, checkpoint: "Weekly Checkpoint"
  },

  // Phase 3: Deep learning & PyTorch - Training craft (Days 99-105)
  {
    day: 99, date: "14-Dec-26", week: 15, phase: "Phase 3 - Deep learning & PyTorch",
    topic: "Init & normalisation",
    concepts: "Kaiming/Xavier; BN/LN/GN placement",
    learnSection: "KRECIPE; BN paper (arxiv 1502.03167) skim",
    sourceKey: "KRECIPE",
    implementTask: "Compare norms on small model",
    reviseTask: "Yesterday: makemore 5 + torch.compile",
    deliverable: "Plots",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 100, date: "15-Dec-26", week: 15, phase: "Phase 3 - Deep learning & PyTorch",
    topic: "Optimisation in practice",
    concepts: "AdamW, warmup+cosine, LR finder, clipping",
    learnSection: "KRECIPE; AdamW paper (arxiv 1711.05101) skim",
    sourceKey: "KRECIPE",
    implementTask: "LR finder; schedule ablation",
    reviseTask: "Yesterday: Init & normalisation",
    deliverable: "Commit",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 101, date: "16-Dec-26", week: 15, phase: "Phase 3 - Deep learning & PyTorch",
    topic: "Regularisation & augmentation",
    concepts: "Weight decay, dropout, label smoothing, mixup",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Ablation on small dataset",
    reviseTask: "Yesterday: Optimisation in practice",
    deliverable: "Table",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 102, date: "17-Dec-26", week: 15, phase: "Phase 3 - Deep learning & PyTorch",
    topic: "Debugging runs",
    concepts: "NaNs, no-decrease, overfit-one-batch",
    learnSection: "Refer Karpathy - A Recipe for Training Neural Networks as needed",
    sourceKey: "KRECIPE",
    implementTask: "Fix 4 broken runs; write checklist",
    reviseTask: "Yesterday: Regularisation & augmentation",
    deliverable: "debug_checklist.md",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 103, date: "18-Dec-26", week: 15, phase: "Phase 3 - Deep learning & PyTorch",
    topic: "Diagnostics toolkit",
    concepts: "Grad norms, activation stats, update ratios",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Hooks-based diagnostics",
    reviseTask: "Yesterday: Debugging runs",
    deliverable: "diagnostics.py",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 104, date: "19-Dec-26", week: 15, phase: "Phase 3 - Deep learning & PyTorch",
    topic: "Reproducibility",
    concepts: "Seeds, determinism, configs",
    learnSection: "PyTorch reproducibility docs",
    sourceKey: "PT-TUT",
    implementTask: "Config-driven runs; determinism test",
    reviseTask: "Yesterday: Diagnostics toolkit",
    deliverable: "Commit + Anki",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 105, date: "20-Dec-26", week: 15, phase: "Phase 3 - Deep learning & PyTorch",
    topic: "WEEKLY CHECKPOINT 15: Training craft",
    concepts: "Whole week",
    learnSection: "Anki + notes (30 min)",
    sourceKey: "OWN",
    implementTask: "Self-test 10 concept Qs + interview Qs: Why warmup for transformers; Overfit-one-batch purpose; LayerNorm vs BatchNorm placement (score bands: <40 weak, 40-60 needs work, 60-75 acceptable, 75-90 strong, 90+ excellent; <75% => revise before next week) (60 min); redo hardest implementation from blank file (30 min)",
    reviseTask: "Whole week",
    deliverable: "Score + 200-word weekly note + push",
    difficulty: 4, checkpoint: "Weekly Checkpoint"
  },

  // Phase 3: Deep learning & PyTorch - CNNs (Days 106-112)
  {
    day: 106, date: "21-Dec-26", week: 16, phase: "Phase 3 - Deep learning & PyTorch",
    topic: "Convolution math",
    concepts: "Kernels, padding, stride, receptive field",
    learnSection: "CS231N CNN notes",
    sourceKey: "CS231N",
    implementTask: "conv2d from scratch; RF calculator",
    reviseTask: "Yesterday: Reproducibility",
    deliverable: "Commit + tests",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 107, date: "22-Dec-26", week: 16, phase: "Phase 3 - Deep learning & PyTorch",
    topic: "ResNet",
    concepts: "Skip connections, BN in CNNs, 1x1 convs",
    learnSection: "RESNET sec 3-4",
    sourceKey: "RESNET",
    implementTask: "Small ResNet in PyTorch",
    reviseTask: "Yesterday: Convolution math",
    deliverable: "Commit",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 108, date: "23-Dec-26", week: 16, phase: "Phase 3 - Deep learning & PyTorch",
    topic: "Spectrogram pipeline",
    concepts: "STFT/mel, log scaling, SpecAugment",
    learnSection: "TORCHAUDIO transforms",
    sourceKey: "TORCHAUDIO",
    implementTask: "Spectrogram pipeline for CWRU/MIMII",
    reviseTask: "Yesterday: ResNet",
    deliverable: "Commit",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 109, date: "24-Dec-26", week: 16, phase: "Phase 3 - Deep learning & PyTorch",
    topic: "Transfer learning",
    concepts: "Pretrained backbones, freezing, per-layer LR",
    learnSection: "PT-TUT transfer learning tutorial",
    sourceKey: "PT-TUT",
    implementTask: "Fine-tune pretrained vs scratch",
    reviseTask: "Yesterday: Spectrogram pipeline",
    deliverable: "Table",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 110, date: "25-Dec-26", week: 16, phase: "Phase 3 - Deep learning & PyTorch",
    topic: "Grad-CAM",
    concepts: "CNN interpretability",
    learnSection: "Grad-CAM paper (arxiv 1610.02391) skim",
    sourceKey: "OWN",
    implementTask: "Grad-CAM on spectrograms",
    reviseTask: "Yesterday: Transfer learning",
    deliverable: "Plots",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 111, date: "26-Dec-26", week: 16, phase: "Phase 3 - Deep learning & PyTorch",
    topic: "Efficient CNNs",
    concepts: "Depthwise separable; MobileNet",
    learnSection: "MOBILENET sec 3",
    sourceKey: "MOBILENET",
    implementTask: "MobileNet-style model; size/latency",
    reviseTask: "Yesterday: Grad-CAM",
    deliverable: "Commit + Anki",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 112, date: "27-Dec-26", week: 16, phase: "Phase 3 - Deep learning & PyTorch",
    topic: "WEEKLY CHECKPOINT 16: CNNs",
    concepts: "Whole week",
    learnSection: "Anki + notes (30 min)",
    sourceKey: "OWN",
    implementTask: "Self-test 10 concept Qs + interview Qs: RF of stacked 3x3 convs; Why residuals help; Depthwise FLOPs saving (score bands: <40 weak, 40-60 needs work, 60-75 acceptable, 75-90 strong, 90+ excellent; <75% => revise before next week) (60 min); redo hardest implementation from blank file (30 min)",
    reviseTask: "Whole week",
    deliverable: "Score + 200-word weekly note + push",
    difficulty: 3, checkpoint: "Weekly Checkpoint"
  },

  // Phase 3: Deep learning & PyTorch - Sequence models (Days 113-119)
  {
    day: 113, date: "28-Dec-26", week: 17, phase: "Phase 3 - Deep learning & PyTorch",
    topic: "RNN & BPTT",
    concepts: "Recurrence, vanishing gradients",
    learnSection: "D2L ch 9",
    sourceKey: "D2L",
    implementTask: "RNN from scratch",
    reviseTask: "Yesterday: Efficient CNNs",
    deliverable: "Commit",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 114, date: "29-Dec-26", week: 17, phase: "Phase 3 - Deep learning & PyTorch",
    topic: "LSTM/GRU",
    concepts: "Gates, cell state",
    learnSection: "D2L ch 10; Olah 'Understanding LSTMs' blog",
    sourceKey: "D2L",
    implementTask: "LSTM from scratch vs nn.LSTM",
    reviseTask: "Yesterday: RNN & BPTT",
    deliverable: "Commit + tests",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 115, date: "30-Dec-26", week: 17, phase: "Phase 3 - Deep learning & PyTorch",
    topic: "Packing & masking",
    concepts: "Padding/packing, sequence classification",
    learnSection: "PyTorch pack_padded_sequence docs",
    sourceKey: "PT-TUT",
    implementTask: "Sequence classifier on sensor windows",
    reviseTask: "Yesterday: LSTM/GRU",
    deliverable: "Commit",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 116, date: "31-Dec-26", week: 17, phase: "Phase 3 - Deep learning & PyTorch",
    topic: "seq2seq + Bahdanau attention",
    concepts: "Encoder-decoder; attention as alignment",
    learnSection: "D2L ch 10.7, 11.4",
    sourceKey: "D2L",
    implementTask: "seq2seq with attention (toy)",
    reviseTask: "Yesterday: Packing & masking",
    deliverable: "Commit",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 117, date: "01-Jan-27", week: 17, phase: "Phase 3 - Deep learning & PyTorch",
    topic: "Why transformers replaced RNNs",
    concepts: "Parallelism, path length",
    learnSection: "AIAYN sec 4",
    sourceKey: "AIAYN",
    implementTask: "LSTM vs tiny transformer on same task",
    reviseTask: "Yesterday: seq2seq + Bahdanau attention",
    deliverable: "Comparison",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 118, date: "02-Jan-27", week: 17, phase: "Phase 3 - Deep learning & PyTorch",
    topic: "TCN",
    concepts: "Dilated 1-D convs",
    learnSection: "TCN paper (arxiv 1803.01271) skim",
    sourceKey: "OWN",
    implementTask: "TCN on vibration windows",
    reviseTask: "Yesterday: Why transformers replaced RNNs",
    deliverable: "Commit + Anki",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 119, date: "03-Jan-27", week: 17, phase: "Phase 3 - Deep learning & PyTorch",
    topic: "WEEKLY CHECKPOINT 17: Sequence models",
    concepts: "Whole week",
    learnSection: "Anki + notes (30 min)",
    sourceKey: "OWN",
    implementTask: "Self-test 10 concept Qs + interview Qs: Why LSTMs mitigate vanishing gradients; Attention as alignment; Path length argument (score bands: <40 weak, 40-60 needs work, 60-75 acceptable, 75-90 strong, 90+ excellent; <75% => revise before next week) (60 min); redo hardest implementation from blank file (30 min)",
    reviseTask: "Whole week",
    deliverable: "Score + 200-word weekly note + push",
    difficulty: 3, checkpoint: "Weekly Checkpoint"
  },

  // Phase 3: PROJECT 2: EdgeVibe-CNN (Days 120-133, CP2)
  {
    day: 120, date: "04-Jan-27", week: 18, phase: "Phase 3 - Deep learning & PyTorch",
    topic: "P2 data pipeline",
    concepts: "CWRU/MIMII + own captures",
    learnSection: "Dataset docs",
    sourceKey: "OWN",
    implementTask: "Pipeline + tests",
    reviseTask: "Yesterday: TCN",
    deliverable: "Commit",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 121, date: "05-Jan-27", week: 18, phase: "Phase 3 - Deep learning & PyTorch",
    topic: "P2 training",
    concepts: "Small ResNet, AMP, augmentation",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Train; log",
    reviseTask: "Yesterday: P2 data pipeline",
    deliverable: "Checkpoint",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 122, date: "06-Jan-27", week: 18, phase: "Phase 3 - Deep learning & PyTorch",
    topic: "P2 diagnostics & tuning",
    concepts: "Use your toolkit",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Diagnose; tune",
    reviseTask: "Yesterday: P2 training",
    deliverable: "Best model",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 123, date: "07-Jan-27", week: 18, phase: "Phase 3 - Deep learning & PyTorch",
    topic: "P2 ONNX export",
    concepts: "Opset, dynamic axes, parity",
    learnSection: "ONNX export docs",
    sourceKey: "ONNX",
    implementTask: "Export + parity test",
    reviseTask: "Yesterday: P2 diagnostics & tuning",
    deliverable: "Parity <1e-4",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 124, date: "08-Jan-27", week: 18, phase: "Phase 3 - Deep learning & PyTorch",
    topic: "P2 quantisation",
    concepts: "PTQ INT8 in ORT",
    learnSection: "ONNX quantization docs",
    sourceKey: "ONNX",
    implementTask: "Quantise; accuracy/size table",
    reviseTask: "Yesterday: P2 ONNX export",
    deliverable: "Table",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 125, date: "09-Jan-27", week: 18, phase: "Phase 3 - Deep learning & PyTorch",
    topic: "P2 RPi setup",
    concepts: "ORT on ARM; threads",
    learnSection: "ONNX + RPi docs",
    sourceKey: "ONNX",
    implementTask: "Install; first inference",
    reviseTask: "Yesterday: P2 quantisation",
    deliverable: "Runs on RPi",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 126, date: "10-Jan-27", week: 18, phase: "Phase 3 - Deep learning & PyTorch",
    topic: "WEEKLY CHECKPOINT 18: PROJECT 2: EdgeVibe-CNN (week 1)",
    concepts: "Whole week",
    learnSection: "Anki + notes (30 min)",
    sourceKey: "OWN",
    implementTask: "Self-test 10 concept Qs + interview Qs: INT8 and batchnorm; Export pitfalls; Calibration data choice (score bands: <40 weak, 40-60 needs work, 60-75 acceptable, 75-90 strong, 90+ excellent; <75% => revise before next week) (60 min); redo hardest implementation from blank file (30 min)",
    reviseTask: "Whole week",
    deliverable: "Score + 200-word weekly note + push",
    difficulty: 4, checkpoint: "Weekly Checkpoint"
  },
  {
    day: 127, date: "11-Jan-27", week: 19, phase: "Phase 3 - Deep learning & PyTorch",
    topic: "P2 benchmark",
    concepts: "p50/p95 latency; thread sweep",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Benchmark harness",
    reviseTask: "Yesterday: P2 RPi setup",
    deliverable: "Latency table",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 128, date: "12-Jan-27", week: 19, phase: "Phase 3 - Deep learning & PyTorch",
    topic: "P2 service",
    concepts: "systemd + MQTT publish",
    learnSection: "RPi docs",
    sourceKey: "OWN",
    implementTask: "Service running",
    reviseTask: "Yesterday: P2 benchmark",
    deliverable: "Commit",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 129, date: "13-Jan-27", week: 19, phase: "Phase 3 - Deep learning & PyTorch",
    topic: "P2 accuracy-latency curve",
    concepts: "FP32 vs INT8 vs smaller model",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Curve",
    reviseTask: "Yesterday: P2 service",
    deliverable: "Plot",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 130, date: "14-Jan-27", week: 19, phase: "Phase 3 - Deep learning & PyTorch",
    topic: "P2 README",
    concepts: "Docs, plots",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "README",
    reviseTask: "Yesterday: P2 accuracy-latency curve",
    deliverable: "README",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 131, date: "15-Jan-27", week: 19, phase: "Phase 3 - Deep learning & PyTorch",
    topic: "P2 reproduce",
    concepts: "Clean clone",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Reproduce; fix",
    reviseTask: "Yesterday: P2 README",
    deliverable: "Green",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 132, date: "16-Jan-27", week: 19, phase: "Phase 3 - Deep learning & PyTorch",
    topic: "P2 defence",
    concepts: "9 questions + video",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Written answers + 3-min video",
    reviseTask: "Yesterday: P2 reproduce",
    deliverable: "CP2 self-grade",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 133, date: "17-Jan-27", week: 19, phase: "Phase 3 - Deep learning & PyTorch",
    topic: "WEEKLY CHECKPOINT 19: PROJECT 2 (week 2)",
    concepts: "Whole week",
    learnSection: "Anki + notes (30 min)",
    sourceKey: "OWN",
    implementTask: "Self-test 10 concept Qs + interview Qs: How you measured latency honestly; Why spectrogram+CNN; What breaks on ARM (score bands: <40 weak, 40-60 needs work, 60-75 acceptable, 75-90 strong, 90+ excellent; <75% => revise before next week) (60 min); redo hardest implementation from blank file (30 min)",
    reviseTask: "Whole week",
    deliverable: "Score + 200-word weekly note + push",
    difficulty: 4, checkpoint: "CP2"
  },

  // Phase 4: Transformers & LLMs - Attention & transformer (Days 134-140)
  {
    day: 134, date: "18-Jan-27", week: 20, phase: "Phase 4 - Transformers & LLMs",
    topic: "Self-attention trick",
    concepts: "Averaging via matmul, masking",
    learnSection: "KZ 'Let's build GPT' 0:00-1:00; RASCHKA 3.1-3.3",
    sourceKey: "KZ",
    implementTask: "Weighted aggregation; simple attention",
    reviseTask: "Yesterday: P2 defence",
    deliverable: "Commit",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 135, date: "19-Jan-27", week: 20, phase: "Phase 4 - Transformers & LLMs",
    topic: "Scaled dot-product, causal",
    concepts: "Q/K/V, sqrt(d_k), mask",
    learnSection: "RASCHKA 3.4-3.5; AIAYN 3.2",
    sourceKey: "RASCHKA",
    implementTask: "CausalAttention + mask tests",
    reviseTask: "Yesterday: Self-attention trick",
    deliverable: "Commit + tests",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 136, date: "20-Jan-27", week: 20, phase: "Phase 4 - Transformers & LLMs",
    topic: "Multi-head attention",
    concepts: "Weight-split heads, projection",
    learnSection: "RASCHKA 3.6; AIAYN 3.2.2",
    sourceKey: "RASCHKA",
    implementTask: "MHA vs nn.MultiheadAttention",
    reviseTask: "Yesterday: Scaled dot-product, causal",
    deliverable: "Commit",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 137, date: "21-Jan-27", week: 20, phase: "Phase 4 - Transformers & LLMs",
    topic: "Positional encodings",
    concepts: "Sinusoidal, learned, RoPE",
    learnSection: "AIAYN 3.5; ROPE sec 3",
    sourceKey: "ROPE",
    implementTask: "Sinusoidal + RoPE implementation",
    reviseTask: "Yesterday: Multi-head attention",
    deliverable: "Commit + tests",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 138, date: "22-Jan-27", week: 20, phase: "Phase 4 - Transformers & LLMs",
    topic: "Block: LN, residuals, FFN, GELU",
    concepts: "Pre-LN vs post-LN",
    learnSection: "RASCHKA 4.1-4.5",
    sourceKey: "RASCHKA",
    implementTask: "Transformer block; gradient-flow test",
    reviseTask: "Yesterday: Positional encodings",
    deliverable: "Commit",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 139, date: "23-Jan-27", week: 20, phase: "Phase 4 - Transformers & LLMs",
    topic: "Encoder-decoder & masks",
    concepts: "Cross-attention, padding masks",
    learnSection: "AIAYN sec 3; RASCHKA ch 1",
    sourceKey: "AIAYN",
    implementTask: "Tiny encoder-decoder (toy)",
    reviseTask: "Yesterday: Block: LN, residuals, FFN, GELU",
    deliverable: "Commit + Anki",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 140, date: "24-Jan-27", week: 20, phase: "Phase 4 - Transformers & LLMs",
    topic: "WEEKLY CHECKPOINT 20: Attention & transformer",
    concepts: "Whole week",
    learnSection: "Anki + notes (30 min)",
    sourceKey: "OWN",
    implementTask: "Self-test 10 concept Qs + interview Qs: Why sqrt(d_k); Pre-LN vs post-LN; RoPE vs learned (score bands: <40 weak, 40-60 needs work, 60-75 acceptable, 75-90 strong, 90+ excellent; <75% => revise before next week) (60 min); redo hardest implementation from blank file (30 min)",
    reviseTask: "Whole week",
    deliverable: "Score + 200-word weekly note + push",
    difficulty: 4, checkpoint: "Weekly Checkpoint"
  },

  // Phase 4: Transformers & LLMs - Building GPT (Days 141-147)
  {
    day: 141, date: "25-Jan-27", week: 21, phase: "Phase 4 - Transformers & LLMs",
    topic: "BPE tokenizer",
    concepts: "Merges, special tokens",
    learnSection: "RASCHKA 2.1-2.5; KZ tokenizer video",
    sourceKey: "KZ",
    implementTask: "Own BPE trainer; compare tiktoken",
    reviseTask: "Yesterday: Encoder-decoder & masks",
    deliverable: "bpe.py + tests",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 142, date: "26-Jan-27", week: 21, phase: "Phase 4 - Transformers & LLMs",
    topic: "Data loading & embeddings",
    concepts: "Sliding window; token+pos embeddings",
    learnSection: "RASCHKA 2.6-2.8",
    sourceKey: "RASCHKA",
    implementTask: "GPTDataset + loader",
    reviseTask: "Yesterday: BPE tokenizer",
    deliverable: "Commit",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 143, date: "27-Jan-27", week: 21, phase: "Phase 4 - Transformers & LLMs",
    topic: "Full GPT",
    concepts: "Config, stacking, head, params",
    learnSection: "RASCHKA 4.6-4.7",
    sourceKey: "RASCHKA",
    implementTask: "GPTModel (124M); greedy generate",
    reviseTask: "Yesterday: Data loading & embeddings",
    deliverable: "Commit",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 144, date: "28-Jan-27", week: 21, phase: "Phase 4 - Transformers & LLMs",
    topic: "Load GPT-2 weights",
    concepts: "Weight mapping; verification",
    learnSection: "RASCHKA 5.5",
    sourceKey: "RASCHKA",
    implementTask: "Load OpenAI GPT-2; logit diff vs HF",
    reviseTask: "Yesterday: Full GPT",
    deliverable: "Diff <1e-3",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 145, date: "29-Jan-27", week: 21, phase: "Phase 4 - Transformers & LLMs",
    topic: "Modern arch: RMSNorm/SwiGLU/RoPE/GQA",
    concepts: "LLaMA-style components",
    learnSection: "CS336 lecture 3; LLaMA paper sec 2 (arxiv 2302.13971)",
    sourceKey: "CS336",
    implementTask: "Variant model",
    reviseTask: "Yesterday: Load GPT-2 weights",
    deliverable: "Commit + tests",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 146, date: "30-Jan-27", week: 21, phase: "Phase 4 - Transformers & LLMs",
    topic: "HF ecosystem",
    concepts: "AutoModel, generate(), safetensors",
    learnSection: "HF-LLM ch 1-2",
    sourceKey: "HF-LLM",
    implementTask: "Export your model to HF format",
    reviseTask: "Yesterday: Modern arch: RMSNorm/SwiGLU/RoPE/GQA",
    deliverable: "Commit + Anki",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 147, date: "31-Jan-27", week: 21, phase: "Phase 4 - Transformers & LLMs",
    topic: "WEEKLY CHECKPOINT 21: Building GPT",
    concepts: "Whole week",
    learnSection: "Anki + notes (30 min)",
    sourceKey: "OWN",
    implementTask: "Self-test 10 concept Qs + interview Qs: BPE merge algorithm; Why GQA cuts KV memory; What safetensors fixes (score bands: <40 weak, 40-60 needs work, 60-75 acceptable, 75-90 strong, 90+ excellent; <75% => revise before next week) (60 min); redo hardest implementation from blank file (30 min)",
    reviseTask: "Whole week",
    deliverable: "Score + 200-word weekly note + push",
    difficulty: 4, checkpoint: "Weekly Checkpoint"
  },

  // Phase 4: Transformers & LLMs - Pretraining & inference (Days 148-154)
  {
    day: 148, date: "01-Feb-27", week: 22, phase: "Phase 4 - Transformers & LLMs",
    topic: "Loss, perplexity, loop",
    concepts: "CE over sequences; AdamW; warmup+cosine",
    learnSection: "RASCHKA 5.1-5.2",
    sourceKey: "RASCHKA",
    implementTask: "Training loop; small run",
    reviseTask: "Yesterday: HF ecosystem",
    deliverable: "Loss curve",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 149, date: "02-Feb-27", week: 22, phase: "Phase 4 - Transformers & LLMs",
    topic: "Sampling",
    concepts: "Temperature, top-k, top-p, repetition penalty",
    learnSection: "RASCHKA 5.3",
    sourceKey: "RASCHKA",
    implementTask: "generate() with all strategies",
    reviseTask: "Yesterday: Loss, perplexity, loop",
    deliverable: "Commit",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 150, date: "03-Feb-27", week: 22, phase: "Phase 4 - Transformers & LLMs",
    topic: "KV cache",
    concepts: "Per-layer cache; memory maths",
    learnSection: "KIPPLY",
    sourceKey: "KIPPLY",
    implementTask: "KV cache in generate(); speed + memory table",
    reviseTask: "Yesterday: Sampling",
    deliverable: "Speed-up >=3x",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 151, date: "04-Feb-27", week: 22, phase: "Phase 4 - Transformers & LLMs",
    topic: "AMP & resume on 3060",
    concepts: "bf16, tokens/s",
    learnSection: "RASCHKA 5.4; PT-AMP",
    sourceKey: "RASCHKA",
    implementTask: "AMP run; resume test",
    reviseTask: "Yesterday: KV cache",
    deliverable: "Table",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 152, date: "05-Feb-27", week: 22, phase: "Phase 4 - Transformers & LLMs",
    topic: "FLOPs & memory accounting",
    concepts: "6ND; activation memory",
    learnSection: "CS336 lecture 1-2",
    sourceKey: "CS336",
    implementTask: "Calculator; predict vs measured",
    reviseTask: "Yesterday: AMP & resume on 3060",
    deliverable: "Commit",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 153, date: "06-Feb-27", week: 22, phase: "Phase 4 - Transformers & LLMs",
    topic: "Scaling laws & data",
    concepts: "Chinchilla; dedup; filtering",
    learnSection: "CS336 lectures 9-11; CHINCHILLA figs",
    sourceKey: "CHINCHILLA",
    implementTask: "MinHash dedup; tiny scaling test",
    reviseTask: "Yesterday: FLOPs & memory accounting",
    deliverable: "Commit + Anki",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 154, date: "07-Feb-27", week: 22, phase: "Phase 4 - Transformers & LLMs",
    topic: "WEEKLY CHECKPOINT 22: Pretraining & inference",
    concepts: "Whole week",
    learnSection: "Anki + notes (30 min)",
    sourceKey: "OWN",
    implementTask: "Self-test 10 concept Qs + interview Qs: Temperature vs top-p; KV cache memory formula; Why dedup (score bands: <40 weak, 40-60 needs work, 60-75 acceptable, 75-90 strong, 90+ excellent; <75% => revise before next week) (60 min); redo hardest implementation from blank file (30 min)",
    reviseTask: "Whole week",
    deliverable: "Score + 200-word weekly note + push",
    difficulty: 4, checkpoint: "Weekly Checkpoint"
  },

  // Phase 4: Transformers & LLMs - LLM systems (Days 155-161)
  {
    day: 155, date: "08-Feb-27", week: 23, phase: "Phase 4 - Transformers & LLMs",
    topic: "GPU-aware training",
    concepts: "Mixed precision; gradient checkpointing",
    learnSection: "CS336 lecture 4",
    sourceKey: "CS336",
    implementTask: "Checkpointing; batch limits table",
    reviseTask: "Yesterday: Scaling laws & data",
    deliverable: "Table",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 156, date: "09-Feb-27", week: 23, phase: "Phase 4 - Transformers & LLMs",
    topic: "FlashAttention",
    concepts: "Tiling, online softmax",
    learnSection: "FLASH sec 3; CS336 5-6",
    sourceKey: "FLASH",
    implementTask: "Educational online-softmax attention vs SDPA",
    reviseTask: "Yesterday: GPU-aware training",
    deliverable: "Commit",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 157, date: "10-Feb-27", week: 23, phase: "Phase 4 - Transformers & LLMs",
    topic: "Parallelism concepts",
    concepts: "Data/tensor/pipeline; ZeRO/FSDP",
    learnSection: "CS336 lectures 7-8",
    sourceKey: "CS336",
    implementTask: "Memory calc per strategy; diagram",
    reviseTask: "Yesterday: FlashAttention",
    deliverable: "Notes",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 158, date: "11-Feb-27", week: 23, phase: "Phase 4 - Transformers & LLMs",
    topic: "LM evaluation",
    concepts: "Perplexity vs benchmarks; contamination",
    learnSection: "CS336 lecture 12; LMEVAL",
    sourceKey: "LMEVAL",
    implementTask: "Run lm-eval on small model",
    reviseTask: "Yesterday: Parallelism concepts",
    deliverable: "Script",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 159, date: "12-Feb-27", week: 23, phase: "Phase 4 - Transformers & LLMs",
    topic: "Post-training: SFT/RLHF/DPO",
    concepts: "Reward models; DPO loss",
    learnSection: "INSTRUCTGPT sec 3; DPO sec 4",
    sourceKey: "DPO",
    implementTask: "Implement DPO loss; derive from Bradley-Terry",
    reviseTask: "Yesterday: LM evaluation",
    deliverable: "dpo_loss.py",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 160, date: "13-Feb-27", week: 23, phase: "Phase 4 - Transformers & LLMs",
    topic: "Inference overview",
    concepts: "Continuous batching, PagedAttention, speculative (preview)",
    learnSection: "CS336 inference lecture",
    sourceKey: "CS336",
    implementTask: "Notes + Phase 10 plan",
    reviseTask: "Yesterday: Post-training: SFT/RLHF/DPO",
    deliverable: "Notes + Anki",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 161, date: "14-Feb-27", week: 23, phase: "Phase 4 - Transformers & LLMs",
    topic: "WEEKLY CHECKPOINT 23: LLM systems",
    concepts: "Whole week",
    learnSection: "Anki + notes (30 min)",
    sourceKey: "OWN",
    implementTask: "Self-test 10 concept Qs + interview Qs: What FlashAttention avoids; ZeRO stages; DPO objective (score bands: <40 weak, 40-60 needs work, 60-75 acceptable, 75-90 strong, 90+ excellent; <75% => revise before next week) (60 min); redo hardest implementation from blank file (30 min)",
    reviseTask: "Whole week",
    deliverable: "Score + 200-word weekly note + push",
    difficulty: 4, checkpoint: "Weekly Checkpoint"
  },

  // Phase 4: Transformers & LLMs - LLM behaviour & structured output (Days 162-168)
  {
    day: 162, date: "15-Feb-27", week: 24, phase: "Phase 4 - Transformers & LLMs",
    topic: "Why LLMs fail",
    concepts: "Hallucination, position bias, sycophancy",
    learnSection: "LOSTMID; HUYEN ch 2 (failures)",
    sourceKey: "LOSTMID",
    implementTask: "Reproduce lost-in-the-middle on small model",
    reviseTask: "Yesterday: Inference overview",
    deliverable: "failures.md",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 163, date: "16-Feb-27", week: 24, phase: "Phase 4 - Transformers & LLMs",
    topic: "Context windows",
    concepts: "Attention cost; RoPE scaling",
    learnSection: "OWN + RoPE-scaling blog posts",
    sourceKey: "OWN",
    implementTask: "Quality vs context length",
    reviseTask: "Yesterday: Why LLMs fail",
    deliverable: "Experiment",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 164, date: "17-Feb-27", week: 24, phase: "Phase 4 - Transformers & LLMs",
    topic: "Prompt design",
    concepts: "System prompts, few-shot, CoT, versioning",
    learnSection: "ANTH-PROMPT; HUYEN ch 5",
    sourceKey: "ANTH-PROMPT",
    implementTask: "Prompt library with tests",
    reviseTask: "Yesterday: Context windows",
    deliverable: "Commit",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 165, date: "18-Feb-27", week: 24, phase: "Phase 4 - Transformers & LLMs",
    topic: "Structured outputs",
    concepts: "JSON schema, Pydantic, constrained decoding, repair",
    learnSection: "PYDANTIC; OUTLINES README",
    sourceKey: "OUTLINES",
    implementTask: "Structured-output layer with validation+retry",
    reviseTask: "Yesterday: Prompt design",
    deliverable: "Commit + tests",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 166, date: "19-Feb-27", week: 24, phase: "Phase 4 - Transformers & LLMs",
    topic: "Function/tool calling",
    concepts: "Schemas, validation, parallel calls",
    learnSection: "TOOLUSE",
    sourceKey: "TOOLUSE",
    implementTask: "Tool-calling wrapper; 3 tools",
    reviseTask: "Yesterday: Structured outputs",
    deliverable: "Commit",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 167, date: "20-Feb-27", week: 24, phase: "Phase 4 - Transformers & LLMs",
    topic: "LLM eval basics",
    concepts: "Exact/functional/similarity; LLM-as-judge",
    learnSection: "HUYEN ch 3-4",
    sourceKey: "HUYEN",
    implementTask: "Judge script; 30-sample calibration",
    reviseTask: "Yesterday: Function/tool calling",
    deliverable: "Agreement rate + Anki",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 168, date: "21-Feb-27", week: 24, phase: "Phase 4 - Transformers & LLMs",
    topic: "WEEKLY CHECKPOINT 24: LLM behaviour & structured output",
    concepts: "Whole week",
    learnSection: "Anki + notes (30 min)",
    sourceKey: "OWN",
    implementTask: "Self-test 10 concept Qs + interview Qs: Why hallucination; Position bias evidence; Constrained decoding vs retry (score bands: <40 weak, 40-60 needs work, 60-75 acceptable, 75-90 strong, 90+ excellent; <75% => revise before next week) (60 min); redo hardest implementation from blank file (30 min)",
    reviseTask: "Whole week",
    deliverable: "Score + 200-word weekly note + push",
    difficulty: 3, checkpoint: "Weekly Checkpoint"
  },

  // Phase 4: PROJECT 3: MiniGPT-Domain (Days 169-182, CP3)
  {
    day: 169, date: "22-Feb-27", week: 25, phase: "Phase 4 - Transformers & LLMs",
    topic: "P3 corpus",
    concepts: "SEBI/RBI or NVD; dedup",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Pipeline",
    reviseTask: "Yesterday: LLM eval basics",
    deliverable: "Stats",
    difficulty: 5, checkpoint: ""
  },
  {
    day: 170, date: "23-Feb-27", week: 25, phase: "Phase 4 - Transformers & LLMs",
    topic: "P3 tokenizer",
    concepts: "Domain BPE; token stats",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Tokenizer",
    reviseTask: "Yesterday: P3 corpus",
    deliverable: "Plan.md",
    difficulty: 5, checkpoint: ""
  },
  {
    day: 171, date: "24-Feb-27", week: 25, phase: "Phase 4 - Transformers & LLMs",
    topic: "P3 config & cost plan",
    concepts: "3 sizes; FLOPs; Colab vs 3060",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Calculator + plan",
    reviseTask: "Yesterday: P3 tokenizer",
    deliverable: "Loss curve",
    difficulty: 5, checkpoint: ""
  },
  {
    day: 172, date: "25-Feb-27", week: 25, phase: "Phase 4 - Transformers & LLMs",
    topic: "P3 train small",
    concepts: "Local run with AMP",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Train",
    reviseTask: "Yesterday: P3 config & cost plan",
    deliverable: "Checkpoint",
    difficulty: 5, checkpoint: ""
  },
  {
    day: 173, date: "26-Feb-27", week: 25, phase: "Phase 4 - Transformers & LLMs",
    topic: "P3 train larger (Colab)",
    concepts: "Resume, logging",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Launch",
    reviseTask: "Yesterday: P3 train small",
    deliverable: "Speed table",
    difficulty: 5, checkpoint: ""
  },
  {
    day: 174, date: "27-Feb-27", week: 25, phase: "Phase 4 - Transformers & LLMs",
    topic: "P3 KV-cache serving",
    concepts: "Simple API; tokens/s",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "serve.py",
    reviseTask: "Yesterday: P3 train larger (Colab)",
    deliverable: "Table",
    difficulty: 5, checkpoint: ""
  },
  {
    day: 175, date: "28-Feb-27", week: 25, phase: "Phase 4 - Transformers & LLMs",
    topic: "WEEKLY CHECKPOINT 25: PROJECT 3: MiniGPT-Domain (week 1)",
    concepts: "Whole week",
    learnSection: "Anki + notes (30 min)",
    sourceKey: "OWN",
    implementTask: "Self-test 10 concept Qs + interview Qs: Why loss spiked; FLOPs of your run; Tokenizer effect (score bands: <40 weak, 40-60 needs work, 60-75 acceptable, 75-90 strong, 90+ excellent; <75% => revise before next week) (60 min); redo hardest implementation from blank file (30 min)",
    reviseTask: "Whole week",
    deliverable: "Score + 200-word weekly note + push",
    difficulty: 5, checkpoint: "Weekly Checkpoint"
  },
  {
    day: 176, date: "01-Mar-27", week: 26, phase: "Phase 4 - Transformers & LLMs",
    topic: "P3 evaluation",
    concepts: "Perplexity; samples",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Eval",
    reviseTask: "Yesterday: P3 KV-cache serving",
    deliverable: "Charts",
    difficulty: 5, checkpoint: ""
  },
  {
    day: 177, date: "02-Mar-27", week: 26, phase: "Phase 4 - Transformers & LLMs",
    topic: "P3 ablation",
    concepts: "3 sizes; RoPE vs learned",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Ablation charts",
    reviseTask: "Yesterday: P3 evaluation",
    deliverable: "Commit",
    difficulty: 5, checkpoint: ""
  },
  {
    day: 178, date: "03-Mar-27", week: 26, phase: "Phase 4 - Transformers & LLMs",
    topic: "P3 HF export",
    concepts: "HF-compatible model",
    learnSection: "Refer Hugging Face LLM course as needed",
    sourceKey: "HF-LLM",
    implementTask: "Export; load with transformers",
    reviseTask: "Yesterday: P3 ablation",
    deliverable: "README",
    difficulty: 5, checkpoint: ""
  },
  {
    day: 179, date: "04-Mar-27", week: 26, phase: "Phase 4 - Transformers & LLMs",
    topic: "P3 README",
    concepts: "Docs + numbers",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "README",
    reviseTask: "Yesterday: P3 HF export",
    deliverable: "Green",
    difficulty: 5, checkpoint: ""
  },
  {
    day: 180, date: "05-Mar-27", week: 26, phase: "Phase 4 - Transformers & LLMs",
    topic: "P3 reproduce",
    concepts: "Clean clone",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Reproduce",
    reviseTask: "Yesterday: P3 README",
    deliverable: "CP3 self-grade",
    difficulty: 5, checkpoint: ""
  },
  {
    day: 181, date: "06-Mar-27", week: 26, phase: "Phase 4 - Transformers & LLMs",
    topic: "P3 defence + blog",
    concepts: "9 questions; write-up",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Answers + post",
    reviseTask: "Yesterday: P3 reproduce",
    deliverable: "Table",
    difficulty: 5, checkpoint: ""
  },
  {
    day: 182, date: "07-Mar-27", week: 26, phase: "Phase 4 - Transformers & LLMs",
    topic: "WEEKLY CHECKPOINT 26: PROJECT 3 (week 2)",
    concepts: "Whole week",
    learnSection: "Anki + notes (30 min)",
    sourceKey: "OWN",
    implementTask: "Self-test 10 concept Qs + interview Qs: What changes at 1B params; Pre-LN reasoning; Your scaling result (score bands: <40 weak, 40-60 needs work, 60-75 acceptable, 75-90 strong, 90+ excellent; <75% => revise before next week) (60 min); redo hardest implementation from blank file (30 min)",
    reviseTask: "Whole week",
    deliverable: "Score + 200-word weekly note + push",
    difficulty: 5, checkpoint: "CP3"
  },

  // Phase 5: Embeddings & RAG - Embeddings & vector search (Days 183-189)
  {
    day: 183, date: "08-Mar-27", week: 27, phase: "Phase 5 - Embeddings & RAG",
    topic: "Embedding models",
    concepts: "Contrastive training; pooling; MTEB",
    learnSection: "SBERT docs",
    sourceKey: "SBERT",
    implementTask: "Compare 2 models on your corpus; tiny contrastive train",
    reviseTask: "Yesterday: P3 defence + blog",
    deliverable: "Commit",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 184, date: "09-Mar-27", week: 27, phase: "Phase 5 - Embeddings & RAG",
    topic: "Similarity & brute force",
    concepts: "Cosine/dot/L2; batched search",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Brute-force GPU store",
    reviseTask: "Yesterday: Embedding models",
    deliverable: "Recall/QPS chart",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 185, date: "10-Mar-27", week: 27, phase: "Phase 5 - Embeddings & RAG",
    topic: "HNSW (your engine)",
    concepts: "Layers, ef/M, heuristic",
    learnSection: "HNSW sec 1-4",
    sourceKey: "HNSW",
    implementTask: "Verify/finish HNSW; sweep",
    reviseTask: "Yesterday: Similarity & brute force",
    deliverable: "Table",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 186, date: "11-Mar-27", week: 27, phase: "Phase 5 - Embeddings & RAG",
    topic: "IVF/PQ & FAISS",
    concepts: "Inverted files; product quantisation",
    learnSection: "FAISS wiki index guidelines",
    sourceKey: "FAISS",
    implementTask: "IVF-PQ vs HNSW vs brute",
    reviseTask: "Yesterday: HNSW (your engine)",
    deliverable: "Commit + tests",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 187, date: "12-Mar-27", week: 27, phase: "Phase 5 - Embeddings & RAG",
    topic: "pgvector",
    concepts: "HNSW in Postgres; filtering; hybrid with tsvector",
    learnSection: "PGVECTOR README",
    sourceKey: "PGVECTOR",
    implementTask: "Postgres store with metadata filters",
    reviseTask: "Yesterday: IVF/PQ & FAISS",
    deliverable: "Notes + Anki",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 188, date: "13-Mar-27", week: 27, phase: "Phase 5 - Embeddings & RAG",
    topic: "Late interaction (concept)",
    concepts: "ColBERT, learned sparse",
    learnSection: "SPLADE (ColBERT) sec 3 skim",
    sourceKey: "SPLADE",
    implementTask: "Notes + small demo",
    reviseTask: "Yesterday: pgvector",
    deliverable: "Commit",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 189, date: "14-Mar-27", week: 27, phase: "Phase 5 - Embeddings & RAG",
    topic: "WEEKLY CHECKPOINT 27: Embeddings & vector search",
    concepts: "Whole week",
    learnSection: "Anki + notes (30 min)",
    sourceKey: "OWN",
    implementTask: "Self-test 10 concept Qs + interview Qs: HNSW vs IVF-PQ; Why normalise; When pgvector is enough (score bands: <40 weak, 40-60 needs work, 60-75 acceptable, 75-90 strong, 90+ excellent; <75% => revise before next week) (60 min); redo hardest implementation from blank file (30 min)",
    reviseTask: "Whole week",
    deliverable: "Score + 200-word weekly note + push",
    difficulty: 3, checkpoint: "Weekly Checkpoint"
  },

  // Phase 5: Embeddings & RAG - RAG Level 1-2 (Days 190-196)
  {
    day: 190, date: "15-Mar-27", week: 28, phase: "Phase 5 - Embeddings & RAG",
    topic: "Ingestion",
    concepts: "PDF/tables; metadata",
    learnSection: "OWN (pypdf docs)",
    sourceKey: "OWN",
    implementTask: "Ingestion for SEBI/RBI docs",
    reviseTask: "Yesterday: Late interaction (concept)",
    deliverable: "Commit",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 191, date: "16-Mar-27", week: 28, phase: "Phase 5 - Embeddings & RAG",
    topic: "Chunking",
    concepts: "Fixed/recursive/semantic/structure",
    learnSection: "CONTEXTUAL (chunking part)",
    sourceKey: "CONTEXTUAL",
    implementTask: "3 chunkers",
    reviseTask: "Yesterday: Ingestion",
    deliverable: "Commit + tests",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 192, date: "17-Mar-27", week: 28, phase: "Phase 5 - Embeddings & RAG",
    topic: "BM25 from scratch",
    concepts: "TF-IDF, BM25, k1/b",
    learnSection: "BM25 sec 1-3",
    sourceKey: "BM25",
    implementTask: "BM25 index; compare rank_bm25",
    reviseTask: "Yesterday: Chunking",
    deliverable: "Commit",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 193, date: "18-Mar-27", week: 28, phase: "Phase 5 - Embeddings & RAG",
    topic: "Hybrid & RRF",
    concepts: "Fusion; metadata filters",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Hybrid retrieval",
    reviseTask: "Yesterday: BM25 from scratch",
    deliverable: "Commit",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 194, date: "19-Mar-27", week: 28, phase: "Phase 5 - Embeddings & RAG",
    topic: "Reranking",
    concepts: "Cross-encoders; latency",
    learnSection: "LIN ch 3",
    sourceKey: "LIN",
    implementTask: "Cross-encoder reranker; latency table",
    reviseTask: "Yesterday: Hybrid & RRF",
    deliverable: "RAG v1 + Anki",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 195, date: "20-Mar-27", week: 28, phase: "Phase 5 - Embeddings & RAG",
    topic: "Context construction",
    concepts: "Budget, ordering, citations",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Generator with citations; RAG v1",
    reviseTask: "Yesterday: Reranking",
    deliverable: "Commit",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 196, date: "21-Mar-27", week: 28, phase: "Phase 5 - Embeddings & RAG",
    topic: "WEEKLY CHECKPOINT 28: RAG Level 1-2",
    concepts: "Whole week",
    learnSection: "Anki + notes (30 min)",
    sourceKey: "OWN",
    implementTask: "Self-test 10 concept Qs + interview Qs: BM25 vs TF-IDF; Why RRF; When reranking hurts (score bands: <40 weak, 40-60 needs work, 60-75 acceptable, 75-90 strong, 90+ excellent; <75% => revise before next week) (60 min); redo hardest implementation from blank file (30 min)",
    reviseTask: "Whole week",
    deliverable: "Score + 200-word weekly note + push",
    difficulty: 3, checkpoint: "Weekly Checkpoint"
  },

  // Phase 5: Embeddings & RAG - RAG Level 3 (Days 197-203)
  {
    day: 197, date: "22-Mar-27", week: 29, phase: "Phase 5 - Embeddings & RAG",
    topic: "Query rewriting & multi-query",
    concepts: "Rewrite, decompose",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Rewriter + multi-query",
    reviseTask: "Yesterday: Context construction",
    deliverable: "Experiment",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 198, date: "23-Mar-27", week: 29, phase: "Phase 5 - Embeddings & RAG",
    topic: "HyDE",
    concepts: "Hypothetical docs",
    learnSection: "HYDE sec 2-3",
    sourceKey: "HYDE",
    implementTask: "HyDE; measure",
    reviseTask: "Yesterday: Query rewriting & multi-query",
    deliverable: "Commit",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 199, date: "24-Mar-27", week: 29, phase: "Phase 5 - Embeddings & RAG",
    topic: "Contextual retrieval",
    concepts: "Chunk augmentation; contextual BM25",
    learnSection: "CONTEXTUAL",
    sourceKey: "CONTEXTUAL",
    implementTask: "Contextual augmentation with local model",
    reviseTask: "Yesterday: HyDE",
    deliverable: "Commit",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 200, date: "25-Mar-27", week: 29, phase: "Phase 5 - Embeddings & RAG",
    topic: "Parent-child / hierarchical",
    concepts: "Small-to-big",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Parent-child retrieval",
    reviseTask: "Yesterday: Contextual retrieval",
    deliverable: "Commit",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 201, date: "26-Mar-27", week: 29, phase: "Phase 5 - Embeddings & RAG",
    topic: "Routing",
    concepts: "Query router",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Router (regulation/FAQ/table)",
    reviseTask: "Yesterday: Parent-child / hierarchical",
    deliverable: "RAG v2 + Anki",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 202, date: "27-Mar-27", week: 29, phase: "Phase 5 - Embeddings & RAG",
    topic: "Iterative retrieval (critically)",
    concepts: "When it pays",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Iterative loop with budget; compare",
    reviseTask: "Yesterday: Routing",
    deliverable: "golden.jsonl",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 203, date: "28-Mar-27", week: 29, phase: "Phase 5 - Embeddings & RAG",
    topic: "WEEKLY CHECKPOINT 29: RAG Level 3",
    concepts: "Whole week",
    learnSection: "Anki + notes (30 min)",
    sourceKey: "OWN",
    implementTask: "Self-test 10 concept Qs + interview Qs: Contextual retrieval mechanism; Parent-child trade-offs; When iteration is worth it (score bands: <40 weak, 40-60 needs work, 60-75 acceptable, 75-90 strong, 90+ excellent; <75% => revise before next week) (60 min); redo hardest implementation from blank file (30 min)",
    reviseTask: "Whole week",
    deliverable: "Score + 200-word weekly note + push",
    difficulty: 4, checkpoint: "Weekly Checkpoint"
  },

  // Phase 5: Embeddings & RAG - RAG Level 4: evaluation, cost, cache (Days 204-210)
  {
    day: 204, date: "29-Mar-27", week: 30, phase: "Phase 5 - Embeddings & RAG",
    topic: "Golden set",
    concepts: "Question types; hard negatives",
    learnSection: "RAGAS getting started",
    sourceKey: "RAGAS",
    implementTask: "100 Q/A with sources",
    reviseTask: "Yesterday: Iterative retrieval (critically)",
    deliverable: "Commit",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 205, date: "30-Mar-27", week: 30, phase: "Phase 5 - Embeddings & RAG",
    topic: "Retrieval eval",
    concepts: "recall@k, MRR, nDCG",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Harness",
    reviseTask: "Yesterday: Golden set",
    deliverable: "Commit",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 206, date: "31-Mar-27", week: 30, phase: "Phase 5 - Embeddings & RAG",
    topic: "Generation & hallucination eval",
    concepts: "Faithfulness, relevance; judge calibration",
    learnSection: "RAGAS metrics; HUYEN ch 3-4",
    sourceKey: "RAGAS",
    implementTask: "Gen eval; judge vs human 50",
    reviseTask: "Yesterday: Retrieval eval",
    deliverable: "Table",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 207, date: "01-Apr-27", week: 30, phase: "Phase 5 - Embeddings & RAG",
    topic: "Ablations",
    concepts: "Chunk x top-k x rerank x hybrid",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Grid",
    reviseTask: "Yesterday: Generation & hallucination eval",
    deliverable: "cost.py",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 208, date: "02-Apr-27", week: 30, phase: "Phase 5 - Embeddings & RAG",
    topic: "Latency & cost",
    concepts: "p95 budget; async; token accounting",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Profile; cost model",
    reviseTask: "Yesterday: Ablations",
    deliverable: "Commit + Anki",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 209, date: "03-Apr-27", week: 30, phase: "Phase 5 - Embeddings & RAG",
    topic: "Caching",
    concepts: "Exact + semantic; hit rate",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Redis cache",
    reviseTask: "Yesterday: Latency & cost",
    deliverable: "Commit",
    difficulty: 5, checkpoint: ""
  },
  {
    day: 210, date: "04-Apr-27", week: 30, phase: "Phase 5 - Embeddings & RAG",
    topic: "WEEKLY CHECKPOINT 30: RAG Level 4: evaluation, cost, cache",
    concepts: "Whole week",
    learnSection: "Anki + notes (30 min)",
    sourceKey: "OWN",
    implementTask: "Self-test 10 concept Qs + interview Qs: Faithfulness vs relevance; Judge validation; Semantic cache failures (score bands: <40 weak, 40-60 needs work, 60-75 acceptable, 75-90 strong, 90+ excellent; <75% => revise before next week) (60 min); redo hardest implementation from blank file (30 min)",
    reviseTask: "Whole week",
    deliverable: "Score + 200-word weekly note + push",
    difficulty: 4, checkpoint: "Weekly Checkpoint"
  },

  // Phase 5: PROJECT 4: RegRAG (Days 211-224, CP4)
  {
    day: 211, date: "05-Apr-27", week: 31, phase: "Phase 5 - Embeddings & RAG",
    topic: "P4 assemble",
    concepts: "Ingest->chunk->hybrid->rerank->generate",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Integrate",
    reviseTask: "Yesterday: Caching",
    deliverable: "Report",
    difficulty: 5, checkpoint: ""
  },
  {
    day: 212, date: "06-Apr-27", week: 31, phase: "Phase 5 - Embeddings & RAG",
    topic: "P4 eval",
    concepts: "Golden set run",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Eval",
    reviseTask: "Yesterday: P4 assemble",
    deliverable: "Commit",
    difficulty: 5, checkpoint: ""
  },
  {
    day: 213, date: "07-Apr-27", week: 31, phase: "Phase 5 - Embeddings & RAG",
    topic: "P4 failure taxonomy",
    concepts: "20 worst answers",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Taxonomy; fix top class",
    reviseTask: "Yesterday: P4 eval",
    deliverable: "Table",
    difficulty: 5, checkpoint: ""
  },
  {
    day: 214, date: "08-Apr-27", week: 31, phase: "Phase 5 - Embeddings & RAG",
    topic: "P4 L3 upgrades",
    concepts: "Contextual + router",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Add; re-eval",
    reviseTask: "Yesterday: P4 failure taxonomy",
    deliverable: "Commit",
    difficulty: 5, checkpoint: ""
  },
  {
    day: 215, date: "09-Apr-27", week: 31, phase: "Phase 5 - Embeddings & RAG",
    topic: "P4 API",
    concepts: "FastAPI + streaming",
    learnSection: "FASTAPI",
    sourceKey: "FASTAPI",
    implementTask: "API",
    reviseTask: "Yesterday: P4 L3 upgrades",
    deliverable: "Commit",
    difficulty: 5, checkpoint: ""
  },
  {
    day: 216, date: "10-Apr-27", week: 31, phase: "Phase 5 - Embeddings & RAG",
    topic: "P4 cache + cost",
    concepts: "Redis; cost logging",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Cache + dashboard",
    reviseTask: "Yesterday: P4 API",
    deliverable: "CI green",
    difficulty: 5, checkpoint: ""
  },
  {
    day: 217, date: "11-Apr-27", week: 31, phase: "Phase 5 - Embeddings & RAG",
    topic: "WEEKLY CHECKPOINT 31: PROJECT 4: RegRAG (week 1)",
    concepts: "Whole week",
    learnSection: "Anki + notes (30 min)",
    sourceKey: "OWN",
    implementTask: "Self-test 10 concept Qs + interview Qs: Chunk-size trade-offs; What the judge got wrong; Router errors (score bands: <40 weak, 40-60 needs work, 60-75 acceptable, 75-90 strong, 90+ excellent; <75% => revise before next week) (60 min); redo hardest implementation from blank file (30 min)",
    reviseTask: "Whole week",
    deliverable: "Score + 200-word weekly note + push",
    difficulty: 5, checkpoint: "Weekly Checkpoint"
  },
  {
    day: 218, date: "12-Apr-27", week: 32, phase: "Phase 5 - Embeddings & RAG",
    topic: "P4 hardening",
    concepts: "Timeouts, retries, errors, tests",
    learnSection: "FASTAPI (async/errors)",
    sourceKey: "FASTAPI",
    implementTask: "Tests",
    reviseTask: "Yesterday: P4 cache + cost",
    deliverable: "Report",
    difficulty: 5, checkpoint: ""
  },
  {
    day: 219, date: "13-Apr-27", week: 32, phase: "Phase 5 - Embeddings & RAG",
    topic: "P4 load test",
    concepts: "p95 under load",
    learnSection: "LOCUST",
    sourceKey: "LOCUST",
    implementTask: "Load test",
    reviseTask: "Yesterday: P4 hardening",
    deliverable: "README",
    difficulty: 5, checkpoint: ""
  },
  {
    day: 220, date: "14-Apr-27", week: 32, phase: "Phase 5 - Embeddings & RAG",
    topic: "P4 README",
    concepts: "Docs",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "README",
    reviseTask: "Yesterday: P4 load test",
    deliverable: "Green",
    difficulty: 5, checkpoint: ""
  },
  {
    day: 221, date: "15-Apr-27", week: 32, phase: "Phase 5 - Embeddings & RAG",
    topic: "P4 reproduce",
    concepts: "Clean clone",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Reproduce",
    reviseTask: "Yesterday: P4 README",
    deliverable: "Design doc",
    difficulty: 5, checkpoint: ""
  },
  {
    day: 222, date: "16-Apr-27", week: 32, phase: "Phase 5 - Embeddings & RAG",
    topic: "P4 system design",
    concepts: "RAG for 10M docs",
    learnSection: "HUYEN ch 6",
    sourceKey: "HUYEN",
    implementTask: "Whiteboard + write-up",
    reviseTask: "Yesterday: P4 reproduce",
    deliverable: "CP4 self-grade",
    difficulty: 5, checkpoint: ""
  },
  {
    day: 223, date: "17-Apr-27", week: 32, phase: "Phase 5 - Embeddings & RAG",
    topic: "P4 defence",
    concepts: "9 questions + video",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Answers + video",
    reviseTask: "Yesterday: P4 system design",
    deliverable: "Commit",
    difficulty: 5, checkpoint: ""
  },
  {
    day: 224, date: "18-Apr-27", week: 32, phase: "Phase 5 - Embeddings & RAG",
    topic: "WEEKLY CHECKPOINT 32: PROJECT 4 (week 2)",
    concepts: "Whole week",
    learnSection: "Anki + notes (30 min)",
    sourceKey: "OWN",
    implementTask: "Self-test 10 concept Qs + interview Qs: Design RAG at 10M docs; Cost per query levers; V2 plan (score bands: <40 weak, 40-60 needs work, 60-75 acceptable, 75-90 strong, 90+ excellent; <75% => revise before next week) (60 min); redo hardest implementation from blank file (30 min)",
    reviseTask: "Whole week",
    deliverable: "Score + 200-word weekly note + push",
    difficulty: 5, checkpoint: "CP4"
  },

  // Phase 6: Fine-tuning - PEFT & quantisation (Days 225-231)
  {
    day: 225, date: "19-Apr-27", week: 33, phase: "Phase 6 - Fine-tuning",
    topic: "Transfer learning & full FT",
    concepts: "Freezing; per-layer LR; forgetting",
    learnSection: "HF-LLM ch 3",
    sourceKey: "HF-LLM",
    implementTask: "Full FT small model on classification",
    reviseTask: "Yesterday: P4 defence",
    deliverable: "Commit + tests",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 226, date: "20-Apr-27", week: 33, phase: "Phase 6 - Fine-tuning",
    topic: "LoRA math",
    concepts: "Low-rank update; rank/alpha; targets",
    learnSection: "LORA sec 4",
    sourceKey: "LORA",
    implementTask: "LoRA layer from scratch; verify vs PEFT",
    reviseTask: "Yesterday: Transfer learning & full FT",
    deliverable: "Commit",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 227, date: "21-Apr-27", week: 33, phase: "Phase 6 - Fine-tuning",
    topic: "Quantisation basics",
    concepts: "INT8/INT4, NF4, dequant",
    learnSection: "QLORA sec 3",
    sourceKey: "QLORA",
    implementTask: "Quantise weights from scratch (INT8, NF4 sim)",
    reviseTask: "Yesterday: LoRA math",
    deliverable: "Run + eval",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 228, date: "22-Apr-27", week: 33, phase: "Phase 6 - Fine-tuning",
    topic: "QLoRA in practice",
    concepts: "4-bit base; paged optimisers; 6 GB",
    learnSection: "UNSLOTH guide",
    sourceKey: "UNSLOTH",
    implementTask: "QLoRA 1-3B on 3060",
    reviseTask: "Yesterday: Quantisation basics",
    deliverable: "Notes",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 229, date: "23-Apr-27", week: 33, phase: "Phase 6 - Fine-tuning",
    topic: "PEFT landscape",
    concepts: "Adapters, prompt tuning, DoRA",
    learnSection: "PEFT conceptual guides",
    sourceKey: "PEFT",
    implementTask: "Quick LoRA vs DoRA",
    reviseTask: "Yesterday: QLoRA in practice",
    deliverable: "ft/eval.py + Anki",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 230, date: "24-Apr-27", week: 33, phase: "Phase 6 - Fine-tuning",
    topic: "Fine-tune evaluation",
    concepts: "Held-out eval; judge; regression tests",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Eval harness",
    reviseTask: "Yesterday: PEFT landscape",
    deliverable: "Dataset",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 231, date: "25-Apr-27", week: 33, phase: "Phase 6 - Fine-tuning",
    topic: "WEEKLY CHECKPOINT 33: PEFT & quantisation",
    concepts: "Whole week",
    learnSection: "Anki + notes (30 min)",
    sourceKey: "OWN",
    implementTask: "Self-test 10 concept Qs + interview Qs: LoRA rank intuition; NF4 vs INT4; Why QLoRA fits 6 GB (score bands: <40 weak, 40-60 needs work, 60-75 acceptable, 75-90 strong, 90+ excellent; <75% => revise before next week) (60 min); redo hardest implementation from blank file (30 min)",
    reviseTask: "Whole week",
    deliverable: "Score + 200-word weekly note + push",
    difficulty: 4, checkpoint: "Weekly Checkpoint"
  },

  // Phase 6: Fine-tuning - Instruction tuning, DPO, RAG-vs-FT (Days 232-238)
  {
    day: 232, date: "26-Apr-27", week: 34, phase: "Phase 6 - Fine-tuning",
    topic: "Dataset prep",
    concepts: "Formats; filtering; dedup; synthetic caveats",
    learnSection: "HUYEN ch 8 (data) skim",
    sourceKey: "OWN",
    implementTask: "500-example domain instruction set",
    reviseTask: "Yesterday: Fine-tune evaluation",
    deliverable: "Eval",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 233, date: "27-Apr-27", week: 34, phase: "Phase 6 - Fine-tuning",
    topic: "SFT",
    concepts: "Loss masking; packing",
    learnSection: "RASCHKA ch 7; TRL SFTTrainer",
    sourceKey: "TRL",
    implementTask: "SFT with TRL + masking check",
    reviseTask: "Yesterday: Dataset prep",
    deliverable: "Eval",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 234, date: "28-Apr-27", week: 34, phase: "Phase 6 - Fine-tuning",
    topic: "DPO",
    concepts: "Pairs; beta; reference",
    learnSection: "DPO paper; TRL DPOTrainer",
    sourceKey: "TRL",
    implementTask: "DPO on 200 pairs",
    reviseTask: "Yesterday: SFT",
    deliverable: "Report",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 235, date: "29-Apr-27", week: 34, phase: "Phase 6 - Fine-tuning",
    topic: "Catastrophic forgetting",
    concepts: "Measure; replay; LoRA mitigation",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Measure on general eval; mitigate",
    reviseTask: "Yesterday: DPO",
    deliverable: "decision.md",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 236, date: "30-Apr-27", week: 34, phase: "Phase 6 - Fine-tuning",
    topic: "RAG vs fine-tuning",
    concepts: "Knowledge vs behaviour; freshness; cost",
    learnSection: "HUYEN ch 7",
    sourceKey: "HUYEN",
    implementTask: "Decision matrix; 5 cases",
    reviseTask: "Yesterday: Catastrophic forgetting",
    deliverable: "Commit + Anki",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 237, date: "01-May-27", week: 34, phase: "Phase 6 - Fine-tuning",
    topic: "Report + model card",
    concepts: "Documentation standards",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Report",
    reviseTask: "Yesterday: RAG vs fine-tuning",
    deliverable: "Notes",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 238, date: "02-May-27", week: 34, phase: "Phase 6 - Fine-tuning",
    topic: "WEEKLY CHECKPOINT 34: Instruction tuning, DPO, RAG-vs-FT",
    concepts: "Whole week",
    learnSection: "Anki + notes (30 min)",
    sourceKey: "OWN",
    implementTask: "Self-test 10 concept Qs + interview Qs: RAG vs FT for 3 cases; DPO beta; Forgetting measurement (score bands: <40 weak, 40-60 needs work, 60-75 acceptable, 75-90 strong, 90+ excellent; <75% => revise before next week) (60 min); redo hardest implementation from blank file (30 min)",
    reviseTask: "Whole week",
    deliverable: "Score + 200-word weekly note + push",
    difficulty: 4, checkpoint: "Weekly Checkpoint"
  },

  // Phase 6: Fine-tuning - Whisper fine-tune on Tanglish (Days 239-245)
  {
    day: 239, date: "03-May-27", week: 35, phase: "Phase 6 - Fine-tuning",
    topic: "Whisper architecture",
    concepts: "Encoder-decoder; mel; multitask tokens",
    learnSection: "WHISPER sec 2-3",
    sourceKey: "WHISPER",
    implementTask: "Trace model; run inference",
    reviseTask: "Yesterday: Report + model card",
    deliverable: "Commit",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 240, date: "04-May-27", week: 35, phase: "Phase 6 - Fine-tuning",
    topic: "Code-mixed data",
    concepts: "Normalisation; transliteration",
    learnSection: "HF-AUDIO units 1-2",
    sourceKey: "HF-AUDIO",
    implementTask: "Dataset prep + normaliser",
    reviseTask: "Yesterday: Whisper architecture",
    deliverable: "Baseline WER",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 241, date: "05-May-27", week: 35, phase: "Phase 6 - Fine-tuning",
    topic: "WER by language mix",
    concepts: "jiwer; slices",
    learnSection: "HF-AUDIO unit 5; JIWER",
    sourceKey: "JIWER",
    implementTask: "Eval harness",
    reviseTask: "Yesterday: Code-mixed data",
    deliverable: "WER table",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 242, date: "06-May-27", week: 35, phase: "Phase 6 - Fine-tuning",
    topic: "Fine-tune Whisper (LoRA)",
    concepts: "Seq2seq trainer",
    learnSection: "HF-WHISPER",
    sourceKey: "HF-WHISPER",
    implementTask: "Fine-tune small/base",
    reviseTask: "Yesterday: WER by language mix",
    deliverable: "Report",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 243, date: "07-May-27", week: 35, phase: "Phase 6 - Fine-tuning",
    topic: "Decoding & errors",
    concepts: "Beam; temperature fallback; taxonomy",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Sweep + taxonomy",
    reviseTask: "Yesterday: Fine-tune Whisper (LoRA)",
    deliverable: "Commit + Anki",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 244, date: "08-May-27", week: 35, phase: "Phase 6 - Fine-tuning",
    topic: "faster-whisper",
    concepts: "CTranslate2 INT8; chunked",
    learnSection: "FWHISPER",
    sourceKey: "FWHISPER",
    implementTask: "Convert + benchmark",
    reviseTask: "Yesterday: Decoding & errors",
    deliverable: "Commit + tests",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 245, date: "09-May-27", week: 35, phase: "Phase 6 - Fine-tuning",
    topic: "WEEKLY CHECKPOINT 35: Whisper fine-tune on Tanglish",
    concepts: "Whole week",
    learnSection: "Anki + notes (30 min)",
    sourceKey: "OWN",
    implementTask: "Self-test 10 concept Qs + interview Qs: WER pitfalls in code-mixing; Multitask tokens; INT8 effect on WER (score bands: <40 weak, 40-60 needs work, 60-75 acceptable, 75-90 strong, 90+ excellent; <75% => revise before next week) (60 min); redo hardest implementation from blank file (30 min)",
    reviseTask: "Whole week",
    deliverable: "Score + 200-word weekly note + push",
    difficulty: 4, checkpoint: "Weekly Checkpoint"
  },

  // Phase 7: Agents - Agents I: loop & tools (Days 246-252)
  {
    day: 246, date: "10-May-27", week: 36, phase: "Phase 7 - Agents",
    topic: "Agent loop",
    concepts: "model->tool->observe; stop conditions",
    learnSection: "ANTH-AGENTS",
    sourceKey: "ANTH-AGENTS",
    implementTask: "Plain loop with 3 tools",
    reviseTask: "Yesterday: faster-whisper",
    deliverable: "Commit",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 247, date: "11-May-27", week: 36, phase: "Phase 7 - Agents",
    topic: "Tool design",
    concepts: "Schemas, idempotency, timeouts, least privilege",
    learnSection: "TOOLUSE",
    sourceKey: "TOOLUSE",
    implementTask: "Tool registry with validation",
    reviseTask: "Yesterday: Agent loop",
    deliverable: "Commit",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 248, date: "12-May-27", week: 36, phase: "Phase 7 - Agents",
    topic: "Typed state",
    concepts: "Pydantic state; repair",
    learnSection: "PYDANTIC",
    sourceKey: "PYDANTIC",
    implementTask: "Typed agent state",
    reviseTask: "Yesterday: Tool design",
    deliverable: "Commit",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 249, date: "13-May-27", week: 36, phase: "Phase 7 - Agents",
    topic: "Budgets & tracing",
    concepts: "Cost/step budgets; traces",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Budgets + trace viewer",
    reviseTask: "Yesterday: Typed state",
    deliverable: "Baseline",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 250, date: "14-May-27", week: 36, phase: "Phase 7 - Agents",
    topic: "Agent evaluation",
    concepts: "Task suites; success rate",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "50 scripted tasks; harness",
    reviseTask: "Yesterday: Budgets & tracing",
    deliverable: "Commit + Anki",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 251, date: "15-May-27", week: 36, phase: "Phase 7 - Agents",
    topic: "Workflow patterns",
    concepts: "Chaining, routing, parallel, orchestrator, evaluator",
    learnSection: "ANTH-AGENTS",
    sourceKey: "ANTH-AGENTS",
    implementTask: "Implement all five",
    reviseTask: "Yesterday: Agent evaluation",
    deliverable: "Commit + tests",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 252, date: "16-May-27", week: 36, phase: "Phase 7 - Agents",
    topic: "WEEKLY CHECKPOINT 36: Agents I: loop & tools",
    concepts: "Whole week",
    learnSection: "Anki + notes (30 min)",
    sourceKey: "OWN",
    implementTask: "Self-test 10 concept Qs + interview Qs: Idempotent tools; What to trace; Chaining vs routing (score bands: <40 weak, 40-60 needs work, 60-75 acceptable, 75-90 strong, 90+ excellent; <75% => revise before next week) (60 min); redo hardest implementation from blank file (30 min)",
    reviseTask: "Whole week",
    deliverable: "Score + 200-word weekly note + push",
    difficulty: 3, checkpoint: "Weekly Checkpoint"
  },

  // Phase 7: Agents - Agents II: workflows vs agents (Days 253-259)
  {
    day: 253, date: "17-May-27", week: 37, phase: "Phase 7 - Agents",
    topic: "State machines",
    concepts: "Deterministic workflows",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Workflow engine",
    reviseTask: "Yesterday: Workflow patterns",
    deliverable: "Commit",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 254, date: "18-May-27", week: 37, phase: "Phase 7 - Agents",
    topic: "Memory",
    concepts: "Short/episodic/semantic; your engine",
    learnSection: "MEMGPT sec 2",
    sourceKey: "MEMGPT",
    implementTask: "Retrieval-backed memory",
    reviseTask: "Yesterday: State machines",
    deliverable: "Table",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 255, date: "19-May-27", week: 37, phase: "Phase 7 - Agents",
    topic: "Planning & reflection",
    concepts: "ReAct; Reflexion; cost",
    learnSection: "REACT; REFLEXION",
    sourceKey: "REACT",
    implementTask: "Compare loop vs plan vs reflect",
    reviseTask: "Yesterday: Memory",
    deliverable: "docs/adr/",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 256, date: "20-May-27", week: 37, phase: "Phase 7 - Agents",
    topic: "Is an agent necessary?",
    concepts: "Criteria; ADRs",
    learnSection: "ANTH-AGENTS (when to use)",
    sourceKey: "ANTH-AGENTS",
    implementTask: "5 cases; ADRs",
    reviseTask: "Yesterday: Planning & reflection",
    deliverable: "Commit",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 257, date: "21-May-27", week: 37, phase: "Phase 7 - Agents",
    topic: "HITL & reliability",
    concepts: "Approvals; retries; fallbacks",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "HITL step; chaos tests",
    reviseTask: "Yesterday: Is an agent necessary?",
    deliverable: "Table + ADR + Anki",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 258, date: "22-May-27", week: 37, phase: "Phase 7 - Agents",
    topic: "Multi-agent (critically)",
    concepts: "Supervisor; coordination cost",
    learnSection: "ANTH-AGENTS orchestrator section",
    sourceKey: "ANTH-AGENTS",
    implementTask: "Supervisor vs single loop",
    reviseTask: "Yesterday: HITL & reliability",
    deliverable: "Note",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 259, date: "23-May-27", week: 37, phase: "Phase 7 - Agents",
    topic: "WEEKLY CHECKPOINT 37: Agents II: workflows vs agents",
    concepts: "Whole week",
    learnSection: "Anki + notes (30 min)",
    sourceKey: "OWN",
    implementTask: "Self-test 10 concept Qs + interview Qs: Workflow vs agent decision; Reflexion cost/benefit; Safe-to-retry tools (score bands: <40 weak, 40-60 needs work, 60-75 acceptable, 75-90 strong, 90+ excellent; <75% => revise before next week) (60 min); redo hardest implementation from blank file (30 min)",
    reviseTask: "Whole week",
    deliverable: "Score + 200-word weekly note + push",
    difficulty: 4, checkpoint: "Weekly Checkpoint"
  },

  // Phase 7: Agents - Agents III: framework week + security (Days 260-266)
  {
    day: 260, date: "24-May-27", week: 38, phase: "Phase 7 - Agents",
    topic: "LangGraph",
    concepts: "Graph state; edges; checkpointers",
    learnSection: "LANGGRAPH concepts",
    sourceKey: "LANGGRAPH",
    implementTask: "Rebuild workflow; compare LOC/latency",
    reviseTask: "Yesterday: Multi-agent (critically)",
    deliverable: "Commit",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 261, date: "25-May-27", week: 38, phase: "Phase 7 - Agents",
    topic: "MCP",
    concepts: "Servers; tools; transport",
    learnSection: "MCP quickstart",
    sourceKey: "MCP",
    implementTask: "MCP server for RegRAG + memory",
    reviseTask: "Yesterday: LangGraph",
    deliverable: "Table",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 262, date: "26-May-27", week: 38, phase: "Phase 7 - Agents",
    topic: "Prompt injection",
    concepts: "Direct/indirect; tool exfil",
    learnSection: "OWASP; GRESHAKE",
    sourceKey: "OWASP",
    implementTask: "20 attacks; success rate",
    reviseTask: "Yesterday: MCP",
    deliverable: "Before/after",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 263, date: "27-May-27", week: 38, phase: "Phase 7 - Agents",
    topic: "Defences",
    concepts: "Guards; allow-lists; sandboxing; OS-level monitoring",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Mitigations; re-test",
    reviseTask: "Yesterday: Prompt injection",
    deliverable: "Report",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 264, date: "28-May-27", week: 38, phase: "Phase 7 - Agents",
    topic: "Garak",
    concepts: "Automated probes",
    learnSection: "GARAK README",
    sourceKey: "GARAK",
    implementTask: "Run vs local model + agent",
    reviseTask: "Yesterday: Defences",
    deliverable: "Commit + Anki",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 265, date: "29-May-27", week: 38, phase: "Phase 7 - Agents",
    topic: "Security write-up",
    concepts: "Threat model (STRIDE)",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Threat model",
    reviseTask: "Yesterday: Garak",
    deliverable: "Commit",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 266, date: "30-May-27", week: 38, phase: "Phase 7 - Agents",
    topic: "WEEKLY CHECKPOINT 38: Agents III: framework week + security",
    concepts: "Whole week",
    learnSection: "Anki + notes (30 min)",
    sourceKey: "OWN",
    implementTask: "Self-test 10 concept Qs + interview Qs: Multi-agent failure modes; Indirect injection example; Sandboxing tools (score bands: <40 weak, 40-60 needs work, 60-75 acceptable, 75-90 strong, 90+ excellent; <75% => revise before next week) (60 min); redo hardest implementation from blank file (30 min)",
    reviseTask: "Whole week",
    deliverable: "Score + 200-word weekly note + push",
    difficulty: 4, checkpoint: "Weekly Checkpoint"
  },

  // Phase 7: PROJECT 5: TanglishVoice (Days 267-280, CP5)
  {
    day: 267, date: "31-May-27", week: 39, phase: "Phase 7 - Agents",
    topic: "P5 task & dialogue",
    concepts: "States, tools, latency budget",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "State diagram",
    reviseTask: "Yesterday: Security write-up",
    deliverable: "Tests",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 268, date: "01-Jun-27", week: 39, phase: "Phase 7 - Agents",
    topic: "P5 workflow",
    concepts: "Deterministic workflow + stubs",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Implement",
    reviseTask: "Yesterday: P5 task & dialogue",
    deliverable: "Accuracy",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 269, date: "02-Jun-27", week: 39, phase: "Phase 7 - Agents",
    topic: "P5 intent extraction",
    concepts: "Code-mixed text -> typed intent",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Structured-output intent; eval",
    reviseTask: "Yesterday: P5 workflow",
    deliverable: "ADR",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 270, date: "03-Jun-27", week: 39, phase: "Phase 7 - Agents",
    topic: "P5 agent fallback",
    concepts: "Loop with budget + ADR",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Fallback",
    reviseTask: "Yesterday: P5 intent extraction",
    deliverable: "Commit",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 271, date: "04-Jun-27", week: 39, phase: "Phase 7 - Agents",
    topic: "P5 STT integration",
    concepts: "faster-whisper -> workflow",
    learnSection: "FWHISPER",
    sourceKey: "FWHISPER",
    implementTask: "Integrate",
    reviseTask: "Yesterday: P5 agent fallback",
    deliverable: "Commit",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 272, date: "05-Jun-27", week: 39, phase: "Phase 7 - Agents",
    topic: "P5 TTS integration",
    concepts: "TTS engine; latency",
    learnSection: "VITS skim + engine docs",
    sourceKey: "VITS",
    implementTask: "Integrate",
    reviseTask: "Yesterday: P5 STT integration",
    deliverable: "Table",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 273, date: "06-Jun-27", week: 39, phase: "Phase 7 - Agents",
    topic: "WEEKLY CHECKPOINT 39: PROJECT 5: TanglishVoice (week 1)",
    concepts: "Whole week",
    learnSection: "Anki + notes (30 min)",
    sourceKey: "OWN",
    implementTask: "Self-test 10 concept Qs + interview Qs: Why workflow not agent; Intent error propagation; Latency budget (score bands: <40 weak, 40-60 needs work, 60-75 acceptable, 75-90 strong, 90+ excellent; <75% => revise before next week) (60 min); redo hardest implementation from blank file (30 min)",
    reviseTask: "Whole week",
    deliverable: "Score + 200-word weekly note + push",
    difficulty: 4, checkpoint: "Weekly Checkpoint"
  },
  {
    day: 274, date: "07-Jun-27", week: 40, phase: "Phase 7 - Agents",
    topic: "P5 end-to-end latency",
    concepts: "Per-stage p95",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Profile; optimise",
    reviseTask: "Yesterday: P5 TTS integration",
    deliverable: "Table",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 275, date: "08-Jun-27", week: 40, phase: "Phase 7 - Agents",
    topic: "P5 evaluation",
    concepts: "50 dialogues; task success",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Eval",
    reviseTask: "Yesterday: P5 end-to-end latency",
    deliverable: "Table",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 276, date: "09-Jun-27", week: 40, phase: "Phase 7 - Agents",
    topic: "P5 red-team",
    concepts: "Injections via voice/text",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Attack; mitigate",
    reviseTask: "Yesterday: P5 evaluation",
    deliverable: "README",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 277, date: "10-Jun-27", week: 40, phase: "Phase 7 - Agents",
    topic: "P5 README",
    concepts: "Docs",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "README",
    reviseTask: "Yesterday: P5 red-team",
    deliverable: "Green",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 278, date: "11-Jun-27", week: 40, phase: "Phase 7 - Agents",
    topic: "P5 reproduce",
    concepts: "Clean clone",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Reproduce",
    reviseTask: "Yesterday: P5 README",
    deliverable: "CP5 self-grade",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 279, date: "12-Jun-27", week: 40, phase: "Phase 7 - Agents",
    topic: "P5 defence + demo",
    concepts: "9 questions; video",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Answers + video",
    reviseTask: "Yesterday: P5 reproduce",
    deliverable: "Commit + tests",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 280, date: "13-Jun-27", week: 40, phase: "Phase 7 - Agents",
    topic: "WEEKLY CHECKPOINT 40: PROJECT 5 (week 2)",
    concepts: "Whole week",
    learnSection: "Anki + notes (30 min)",
    sourceKey: "OWN",
    implementTask: "Self-test 10 concept Qs + interview Qs: Where voice latency goes; Code-switch handling; V2 plan (score bands: <40 weak, 40-60 needs work, 60-75 acceptable, 75-90 strong, 90+ excellent; <75% => revise before next week) (60 min); redo hardest implementation from blank file (30 min)",
    reviseTask: "Whole week",
    deliverable: "Score + 200-word weekly note + push",
    difficulty: 4, checkpoint: "CP5"
  },

  // Phase 8: Speech internals & edge - ASR internals + TTS + VLM (Days 281-287)
  {
    day: 281, date: "14-Jun-27", week: 41, phase: "Phase 8 - Speech internals & edge",
    topic: "Audio features",
    concepts: "STFT, mel, MFCC",
    learnSection: "HF-AUDIO unit 1",
    sourceKey: "HF-AUDIO",
    implementTask: "Mel extractor from scratch",
    reviseTask: "Yesterday: P5 defence + demo",
    deliverable: "Commit + tests",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 282, date: "15-Jun-27", week: 41, phase: "Phase 8 - Speech internals & edge",
    topic: "CTC",
    concepts: "Alignment-free loss; decoding",
    learnSection: "CTC (Distill)",
    sourceKey: "CTC",
    implementTask: "CTC forward (NumPy); greedy + beam decode",
    reviseTask: "Yesterday: Audio features",
    deliverable: "WER",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 283, date: "16-Jun-27", week: 41, phase: "Phase 8 - Speech internals & edge",
    topic: "Self-supervised speech",
    concepts: "wav2vec 2.0; Conformer",
    learnSection: "WAV2VEC sec 2-3; CONFORMER sec 2",
    sourceKey: "WAV2VEC",
    implementTask: "Fine-tune wav2vec2 head on Tamil subset",
    reviseTask: "Yesterday: CTC",
    deliverable: "Latency table",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 284, date: "17-Jun-27", week: 41, phase: "Phase 8 - Speech internals & edge",
    topic: "Streaming ASR",
    concepts: "VAD; endpointing; chunking",
    learnSection: "SILERO; FWHISPER",
    sourceKey: "SILERO",
    implementTask: "Streaming STT service",
    reviseTask: "Yesterday: Self-supervised speech",
    deliverable: "Commit",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 285, date: "18-Jun-27", week: 41, phase: "Phase 8 - Speech internals & edge",
    topic: "Audio embeddings & CLIP",
    concepts: "CLAP/wav2vec embeddings; CLIP loss",
    learnSection: "CLIP sec 2-3",
    sourceKey: "CLIP",
    implementTask: "Audio similarity with your HNSW; CLIP zero-shot",
    reviseTask: "Yesterday: Streaming ASR",
    deliverable: "Commit + Anki",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 286, date: "19-Jun-27", week: 41, phase: "Phase 8 - Speech internals & edge",
    topic: "Vision-language models",
    concepts: "Projector; usage; limits",
    learnSection: "LLAVA sec 3",
    sourceKey: "LLAVA",
    implementTask: "VLM over machine photos",
    reviseTask: "Yesterday: Audio embeddings & CLIP",
    deliverable: "Commit",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 287, date: "20-Jun-27", week: 41, phase: "Phase 8 - Speech internals & edge",
    topic: "WEEKLY CHECKPOINT 41: ASR internals + TTS + VLM",
    concepts: "Whole week",
    learnSection: "Anki + notes (30 min)",
    sourceKey: "OWN",
    implementTask: "Self-test 10 concept Qs + interview Qs: CTC blank; Streaming latency parts; CLIP loss (score bands: <40 weak, 40-60 needs work, 60-75 acceptable, 75-90 strong, 90+ excellent; <75% => revise before next week) (60 min); redo hardest implementation from blank file (30 min)",
    reviseTask: "Whole week",
    deliverable: "Score + 200-word weekly note + push",
    difficulty: 4, checkpoint: "Weekly Checkpoint"
  },

  // Phase 8: Speech internals & edge - Edge AI (Days 288-294)
  {
    day: 288, date: "21-Jun-27", week: 42, phase: "Phase 8 - Speech internals & edge",
    topic: "ONNX deep dive",
    concepts: "Graph, opsets, EPs",
    learnSection: "ONNX docs",
    sourceKey: "ONNX",
    implementTask: "Export Whisper-tiny + CNN; parity",
    reviseTask: "Yesterday: Vision-language models",
    deliverable: "Table",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 289, date: "22-Jun-27", week: 42, phase: "Phase 8 - Speech internals & edge",
    topic: "PTQ vs QAT",
    concepts: "Per-channel; calibration",
    learnSection: "LITERT quantization; ONNX quantization",
    sourceKey: "LITERT",
    implementTask: "QAT on CNN vs PTQ",
    reviseTask: "Yesterday: ONNX deep dive",
    deliverable: "Benchmark",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 290, date: "23-Jun-27", week: 42, phase: "Phase 8 - Speech internals & edge",
    topic: "LiteRT on RPi",
    concepts: "Delegates; threads",
    learnSection: "LITERT",
    sourceKey: "LITERT",
    implementTask: "Run; thread sweep",
    reviseTask: "Yesterday: PTQ vs QAT",
    deliverable: "Table",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 291, date: "24-Jun-27", week: 42, phase: "Phase 8 - Speech internals & edge",
    topic: "Edge STT",
    concepts: "INT8 faster-whisper on CPU/RPi",
    learnSection: "FWHISPER",
    sourceKey: "FWHISPER",
    implementTask: "WER vs latency",
    reviseTask: "Yesterday: LiteRT on RPi",
    deliverable: "Commit",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 292, date: "25-Jun-27", week: 42, phase: "Phase 8 - Speech internals & edge",
    topic: "Multimodal RAG (light)",
    concepts: "Image/PDF retrieval; ColPali idea",
    learnSection: "COLPALI sec 3 skim",
    sourceKey: "COLPALI",
    implementTask: "Retrieval over manuals",
    reviseTask: "Yesterday: Edge STT",
    deliverable: "Report + Anki",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 293, date: "26-Jun-27", week: 42, phase: "Phase 8 - Speech internals & edge",
    topic: "Edge reliability + report",
    concepts: "Watchdog, OTA, offline; accuracy/latency/size/power",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Scripts + report",
    reviseTask: "Yesterday: Multimodal RAG (light)",
    deliverable: "Commit",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 294, date: "27-Jun-27", week: 42, phase: "Phase 8 - Speech internals & edge",
    topic: "WEEKLY CHECKPOINT 42: Edge AI",
    concepts: "Whole week",
    learnSection: "Anki + notes (30 min)",
    sourceKey: "OWN",
    implementTask: "Self-test 10 concept Qs + interview Qs: PTQ vs QAT; Why per-channel; Edge failure modes (score bands: <40 weak, 40-60 needs work, 60-75 acceptable, 75-90 strong, 90+ excellent; <75% => revise before next week) (60 min); redo hardest implementation from blank file (30 min)",
    reviseTask: "Whole week",
    deliverable: "Score + 200-word weekly note + push",
    difficulty: 4, checkpoint: "Weekly Checkpoint"
  },

  // Phase 9: MLOps, cloud, systems - MLOps I (Days 295-301)
  {
    day: 295, date: "28-Jun-27", week: 43, phase: "Phase 9 - MLOps, cloud, systems",
    topic: "MLflow tracking",
    concepts: "Runs, params, artifacts",
    learnSection: "MLFLOW tracking",
    sourceKey: "MLFLOW",
    implementTask: "Track Projects 1-2",
    reviseTask: "Yesterday: Edge reliability + report",
    deliverable: "dvc.yaml",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 296, date: "29-Jun-27", week: 43, phase: "Phase 9 - MLOps, cloud, systems",
    topic: "DVC",
    concepts: "Data versioning; pipelines",
    learnSection: "DVC get started",
    sourceKey: "DVC",
    implementTask: "DVC for Project 1",
    reviseTask: "Yesterday: MLflow tracking",
    deliverable: "Commit",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 297, date: "30-Jun-27", week: 43, phase: "Phase 9 - MLOps, cloud, systems",
    topic: "Model registry",
    concepts: "Stages; lineage; cards",
    learnSection: "MLFLOW registry",
    sourceKey: "MLFLOW",
    implementTask: "Register + promote",
    reviseTask: "Yesterday: DVC",
    deliverable: "CI green",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 298, date: "01-Jul-27", week: 43, phase: "Phase 9 - MLOps, cloud, systems",
    topic: "Testing ML",
    concepts: "Code/data/model tests; gates",
    learnSection: "MWML testing; MLTEST",
    sourceKey: "MLTEST",
    implementTask: "Tests for P1 + P4",
    reviseTask: "Yesterday: Model registry",
    deliverable: "Green",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 299, date: "02-Jul-27", week: 43, phase: "Phase 9 - MLOps, cloud, systems",
    topic: "CI/CD",
    concepts: "Actions: lint/test/build/push",
    learnSection: "GHA quickstart",
    sourceKey: "GHA",
    implementTask: "Pipeline for one repo",
    reviseTask: "Yesterday: Testing ML",
    deliverable: "Commit + Anki",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 300, date: "03-Jul-27", week: 43, phase: "Phase 9 - MLOps, cloud, systems",
    topic: "Lifecycle diagram",
    concepts: "Data->train->validate->registry->deploy->monitor->retrain",
    learnSection: "DMLS ch 5-6",
    sourceKey: "DMLS",
    implementTask: "Diagram + gaps",
    reviseTask: "Yesterday: CI/CD",
    deliverable: "Commit",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 301, date: "04-Jul-27", week: 43, phase: "Phase 9 - MLOps, cloud, systems",
    topic: "WEEKLY CHECKPOINT 43: MLOps I: tracking, versioning, testing",
    concepts: "Whole week",
    learnSection: "Anki + notes (30 min)",
    sourceKey: "OWN",
    implementTask: "Self-test 10 concept Qs + interview Qs: Registry guarantees; Point-in-time correctness; DVC vs Git LFS (score bands: <40 weak, 40-60 needs work, 60-75 acceptable, 75-90 strong, 90+ excellent; <75% => revise before next week) (60 min); redo hardest implementation from blank file (30 min)",
    reviseTask: "Whole week",
    deliverable: "Score + 200-word weekly note + push",
    difficulty: 3, checkpoint: "Weekly Checkpoint"
  },

  // Phase 9: MLOps, cloud, systems - MLOps II (Days 302-308)
  {
    day: 302, date: "05-Jul-27", week: 44, phase: "Phase 9 - MLOps, cloud, systems",
    topic: "Serving patterns",
    concepts: "Batching, streaming, versioned endpoints",
    learnSection: "MWML serving; FASTAPI",
    sourceKey: "MWML",
    implementTask: "Serve P1 + P4 with versions",
    reviseTask: "Yesterday: Lifecycle diagram",
    deliverable: "Sizes",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 303, date: "06-Jul-27", week: 44, phase: "Phase 9 - MLOps, cloud, systems",
    topic: "Docker best practices",
    concepts: "Multi-stage; size; healthchecks",
    learnSection: "DOCKER",
    sourceKey: "DOCKER",
    implementTask: "Slim images",
    reviseTask: "Yesterday: Serving patterns",
    deliverable: "Commit",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 304, date: "07-Jul-27", week: 44, phase: "Phase 9 - MLOps, cloud, systems",
    topic: "Observability",
    concepts: "Logs, metrics, traces",
    learnSection: "OTEL getting started",
    sourceKey: "OTEL",
    implementTask: "Instrument API",
    reviseTask: "Yesterday: Docker best practices",
    deliverable: "Screenshot",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 305, date: "08-Jul-27", week: 44, phase: "Phase 9 - MLOps, cloud, systems",
    topic: "Dashboards & SLOs",
    concepts: "SLO definitions",
    learnSection: "DMLS ch 8",
    sourceKey: "DMLS",
    implementTask: "Dashboard + SLOs",
    reviseTask: "Yesterday: Observability",
    deliverable: "Alert fires",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 306, date: "09-Jul-27", week: 44, phase: "Phase 9 - MLOps, cloud, systems",
    topic: "Drift",
    concepts: "PSI/KS; unlabelled monitoring",
    learnSection: "EVIDENTLY; DMLS ch 8",
    sourceKey: "EVIDENTLY",
    implementTask: "Drift job + alert",
    reviseTask: "Yesterday: Dashboards & SLOs",
    deliverable: "Postmortem.md + Anki",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 307, date: "10-Jul-27", week: 44, phase: "Phase 9 - MLOps, cloud, systems",
    topic: "Retraining loop + incident drill",
    concepts: "Triggers; gates; rollback; postmortem",
    learnSection: "DMLS ch 9",
    sourceKey: "DMLS",
    implementTask: "Trigger + gate; drill",
    reviseTask: "Yesterday: Drift",
    deliverable: "Notes",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 308, date: "11-Jul-27", week: 44, phase: "Phase 9 - MLOps, cloud, systems",
    topic: "WEEKLY CHECKPOINT 44: MLOps II: serving, monitoring, drift",
    concepts: "Whole week",
    learnSection: "Anki + notes (30 min)",
    sourceKey: "OWN",
    implementTask: "Self-test 10 concept Qs + interview Qs: Monitoring without labels; SLO vs SLA; Rollback strategy (score bands: <40 weak, 40-60 needs work, 60-75 acceptable, 75-90 strong, 90+ excellent; <75% => revise before next week) (60 min); redo hardest implementation from blank file (30 min)",
    reviseTask: "Whole week",
    deliverable: "Score + 200-word weekly note + push",
    difficulty: 3, checkpoint: "Weekly Checkpoint"
  },

  // Phase 9: MLOps, cloud, systems - Azure (Days 309-315)
  {
    day: 309, date: "12-Jul-27", week: 45, phase: "Phase 9 - MLOps, cloud, systems",
    topic: "Azure fundamentals",
    concepts: "RGs, IAM/RBAC, cost",
    learnSection: "AZ (cloud concepts + core services)",
    sourceKey: "AZ",
    implementTask: "RG; RBAC; budget alert",
    reviseTask: "Yesterday: Retraining loop + incident drill",
    deliverable: "URL live",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 310, date: "13-Jul-27", week: 45, phase: "Phase 9 - MLOps, cloud, systems",
    topic: "Container Apps",
    concepts: "ACR; deploy container",
    learnSection: "AZ-ACA",
    sourceKey: "AZ-ACA",
    implementTask: "Deploy RegRAG API",
    reviseTask: "Yesterday: Azure fundamentals",
    deliverable: "Commit",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 311, date: "14-Jul-27", week: 45, phase: "Phase 9 - MLOps, cloud, systems",
    topic: "Postgres + pgvector + Redis",
    concepts: "Managed services",
    learnSection: "AZ-PG",
    sourceKey: "AZ-PG",
    implementTask: "Wire managed Postgres + Redis",
    reviseTask: "Yesterday: Container Apps",
    deliverable: "Commit",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 312, date: "15-Jul-27", week: 45, phase: "Phase 9 - MLOps, cloud, systems",
    topic: "Secrets & identity",
    concepts: "Key Vault; managed identity",
    learnSection: "MS Learn Key Vault quickstart",
    sourceKey: "AZ",
    implementTask: "Secrets via Key Vault",
    reviseTask: "Yesterday: Postgres + pgvector + Redis",
    deliverable: "Commit",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 313, date: "16-Jul-27", week: 45, phase: "Phase 9 - MLOps, cloud, systems",
    topic: "Azure ML",
    concepts: "Jobs; endpoints",
    learnSection: "AZ-ML quickstart",
    sourceKey: "AZ-ML",
    implementTask: "One job + endpoint",
    reviseTask: "Yesterday: Secrets & identity",
    deliverable: "Commit + Anki",
    difficulty: 3, checkpoint: ""
  },
  {
    day: 314, date: "17-Jul-27", week: 45, phase: "Phase 9 - MLOps, cloud, systems",
    topic: "Monitoring & cost",
    concepts: "Azure Monitor; cost analysis; Bicep intro",
    learnSection: "MS Learn Azure Monitor",
    sourceKey: "AZ",
    implementTask: "Alerts + cost report",
    reviseTask: "Yesterday: Azure ML",
    deliverable: "Commit",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 315, date: "18-Jul-27", week: 45, phase: "Phase 9 - MLOps, cloud, systems",
    topic: "WEEKLY CHECKPOINT 45: Azure",
    concepts: "Whole week",
    learnSection: "Anki + notes (30 min)",
    sourceKey: "OWN",
    implementTask: "Self-test 10 concept Qs + interview Qs: Managed identity vs keys; Container Apps vs AKS; Cost levers (score bands: <40 weak, 40-60 needs work, 60-75 acceptable, 75-90 strong, 90+ excellent; <75% => revise before next week) (60 min); redo hardest implementation from blank file (30 min)",
    reviseTask: "Whole week",
    deliverable: "Score + 200-word weekly note + push",
    difficulty: 3, checkpoint: "Weekly Checkpoint"
  },

  // Phase 9: MLOps, cloud, systems - Distributed systems for AI + system design (Days 316-322)
  {
    day: 316, date: "19-Jul-27", week: 46, phase: "Phase 9 - MLOps, cloud, systems",
    topic: "Async services",
    concepts: "Concurrency limits; backpressure",
    learnSection: "PYDOCS asyncio",
    sourceKey: "PYDOCS",
    implementTask: "Async inference service",
    reviseTask: "Yesterday: Monitoring & cost",
    deliverable: "Commit",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 317, date: "20-Jul-27", week: 46, phase: "Phase 9 - MLOps, cloud, systems",
    topic: "Queues & streams",
    concepts: "Redis streams; Kafka concepts",
    learnSection: "REDIS",
    sourceKey: "REDIS",
    implementTask: "Ingestion via streams",
    reviseTask: "Yesterday: Async services",
    deliverable: "Report",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 318, date: "21-Jul-27", week: 46, phase: "Phase 9 - MLOps, cloud, systems",
    topic: "Caching & Postgres tuning",
    concepts: "Cache tiers; indexes; pooling; EXPLAIN",
    learnSection: "Postgres docs EXPLAIN",
    sourceKey: "OWN",
    implementTask: "Cache tiers; tuned queries",
    reviseTask: "Yesterday: Queues & streams",
    deliverable: "Tests",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 319, date: "22-Jul-27", week: 46, phase: "Phase 9 - MLOps, cloud, systems",
    topic: "Reliability patterns",
    concepts: "Idempotency, retries+jitter, circuit breakers",
    learnSection: "DDIA ch 8",
    sourceKey: "DDIA",
    implementTask: "Patterns library + tests",
    reviseTask: "Yesterday: Caching & Postgres tuning",
    deliverable: "Commit",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 320, date: "23-Jul-27", week: 46, phase: "Phase 9 - MLOps, cloud, systems",
    topic: "Serving architectures & routing",
    concepts: "Sync/async; small-vs-large routing; cost",
    learnSection: "HUYEN ch 9",
    sourceKey: "HUYEN",
    implementTask: "Cost-aware router",
    reviseTask: "Yesterday: Reliability patterns",
    deliverable: "Recordings + Anki",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 321, date: "24-Jul-27", week: 46, phase: "Phase 9 - MLOps, cloud, systems",
    topic: "System design drills",
    concepts: "RAG 10M docs; LLM 1k QPS; voice 2 s",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "3 whiteboard designs (recorded)",
    reviseTask: "Yesterday: Serving architectures & routing",
    deliverable: "Docs",
    difficulty: 5, checkpoint: ""
  },
  {
    day: 322, date: "25-Jul-27", week: 46, phase: "Phase 9 - MLOps, cloud, systems",
    topic: "WEEKLY CHECKPOINT 46: Distributed systems for AI + system design",
    concepts: "Whole week",
    learnSection: "Anki + notes (30 min)",
    sourceKey: "OWN",
    implementTask: "Self-test 10 concept Qs + interview Qs: At-least-once implications; Circuit breaker states; Design LLM serving with cost cap (score bands: <40 weak, 40-60 needs work, 60-75 acceptable, 75-90 strong, 90+ excellent; <75% => revise before next week) (60 min); redo hardest implementation from blank file (30 min)",
    reviseTask: "Whole week",
    deliverable: "Score + 200-word weekly note + push",
    difficulty: 4, checkpoint: "Weekly Checkpoint"
  },

  // Phase 9: PROJECT 6: platform (Days 323-336, CP6)
  {
    day: 323, date: "26-Jul-27", week: 47, phase: "Phase 9 - MLOps, cloud, systems",
    topic: "P6 plan",
    concepts: "Lifecycle for Project 1 model",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Architecture + ADRs",
    reviseTask: "Yesterday: System design drills",
    deliverable: "Commit",
    difficulty: 5, checkpoint: ""
  },
  {
    day: 324, date: "27-Jul-27", week: 47, phase: "Phase 9 - MLOps, cloud, systems",
    topic: "P6 data + training stage",
    concepts: "DVC + MLflow",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Wire",
    reviseTask: "Yesterday: P6 plan",
    deliverable: "Commit",
    difficulty: 5, checkpoint: ""
  },
  {
    day: 325, date: "28-Jul-27", week: 47, phase: "Phase 9 - MLOps, cloud, systems",
    topic: "P6 validation + registry",
    concepts: "Gates; promotion",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Wire",
    reviseTask: "Yesterday: P6 data + training stage",
    deliverable: "URL",
    difficulty: 5, checkpoint: ""
  },
  {
    day: 326, date: "29-Jul-27", week: 47, phase: "Phase 9 - MLOps, cloud, systems",
    topic: "P6 deploy",
    concepts: "Container Apps + Postgres + Redis",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Deploy",
    reviseTask: "Yesterday: P6 validation + registry",
    deliverable: "Screenshot",
    difficulty: 5, checkpoint: ""
  },
  {
    day: 327, date: "30-Jul-27", week: 47, phase: "Phase 9 - MLOps, cloud, systems",
    topic: "P6 monitoring",
    concepts: "Dashboards; drift",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Wire",
    reviseTask: "Yesterday: P6 deploy",
    deliverable: "Commit",
    difficulty: 5, checkpoint: ""
  },
  {
    day: 328, date: "31-Jul-27", week: 47, phase: "Phase 9 - MLOps, cloud, systems",
    topic: "P6 retrain loop",
    concepts: "Trigger; approval; rollback",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Wire",
    reviseTask: "Yesterday: P6 monitoring",
    deliverable: "Video",
    difficulty: 5, checkpoint: ""
  },
  {
    day: 329, date: "01-Aug-27", week: 47, phase: "Phase 9 - MLOps, cloud, systems",
    topic: "WEEKLY CHECKPOINT 47: PROJECT 6: platform (week 1)",
    concepts: "Whole week",
    learnSection: "Anki + notes (30 min)",
    sourceKey: "OWN",
    implementTask: "Self-test 10 concept Qs + interview Qs: Canary vs shadow; Retrain gate; Where it's still manual (score bands: <40 weak, 40-60 needs work, 60-75 acceptable, 75-90 strong, 90+ excellent; <75% => revise before next week) (60 min); redo hardest implementation from blank file (30 min)",
    reviseTask: "Whole week",
    deliverable: "Score + 200-word weekly note + push",
    difficulty: 5, checkpoint: "Weekly Checkpoint"
  },
  {
    day: 330, date: "02-Aug-27", week: 48, phase: "Phase 9 - MLOps, cloud, systems",
    topic: "P6 demo",
    concepts: "Inject drift -> alert -> retrain -> promote",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Record demo",
    reviseTask: "Yesterday: P6 retrain loop",
    deliverable: "Commit",
    difficulty: 5, checkpoint: ""
  },
  {
    day: 331, date: "03-Aug-27", week: 48, phase: "Phase 9 - MLOps, cloud, systems",
    topic: "P6 cost dashboard",
    concepts: "Per-request cost",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Dashboard",
    reviseTask: "Yesterday: P6 demo",
    deliverable: "README",
    difficulty: 5, checkpoint: ""
  },
  {
    day: 332, date: "04-Aug-27", week: 48, phase: "Phase 9 - MLOps, cloud, systems",
    topic: "P6 README",
    concepts: "Docs",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "README",
    reviseTask: "Yesterday: P6 cost dashboard",
    deliverable: "Green",
    difficulty: 5, checkpoint: ""
  },
  {
    day: 333, date: "05-Aug-27", week: 48, phase: "Phase 9 - MLOps, cloud, systems",
    topic: "P6 reproduce",
    concepts: "Clean clone + IaC",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Reproduce",
    reviseTask: "Yesterday: P6 README",
    deliverable: "Doc",
    difficulty: 5, checkpoint: ""
  },
  {
    day: 334, date: "06-Aug-27", week: 48, phase: "Phase 9 - MLOps, cloud, systems",
    topic: "P6 system-design defence",
    concepts: "Full platform design",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Whiteboard + write-up",
    reviseTask: "Yesterday: P6 reproduce",
    deliverable: "CP6 self-grade",
    difficulty: 5, checkpoint: ""
  },
  {
    day: 335, date: "07-Aug-27", week: 48, phase: "Phase 9 - MLOps, cloud, systems",
    topic: "P6 defence",
    concepts: "9 questions",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Answers",
    reviseTask: "Yesterday: P6 system-design defence",
    deliverable: "Plot",
    difficulty: 5, checkpoint: ""
  },
  {
    day: 336, date: "08-Aug-27", week: 48, phase: "Phase 9 - MLOps, cloud, systems",
    topic: "WEEKLY CHECKPOINT 48: PROJECT 6 (week 2)",
    concepts: "Whole week",
    learnSection: "Anki + notes (30 min)",
    sourceKey: "OWN",
    implementTask: "Self-test 10 concept Qs + interview Qs: Full-lifecycle explanation; Failure isolation; V2 (score bands: <40 weak, 40-60 needs work, 60-75 acceptable, 75-90 strong, 90+ excellent; <75% => revise before next week) (60 min); redo hardest implementation from blank file (30 min)",
    reviseTask: "Whole week",
    deliverable: "Score + 200-word weekly note + push",
    difficulty: 5, checkpoint: "CP6"
  },

  // Phase 10: GPU & inference optimisation - GPU basics & compression (Days 337-343)
  {
    day: 337, date: "09-Aug-27", week: 49, phase: "Phase 10 - GPU & inference optimisation",
    topic: "GPU architecture & memory hierarchy",
    concepts: "SMs, warps, tensor cores, bandwidth, roofline",
    learnSection: "PMPP ch 1-4; CUDA ch 1-3",
    sourceKey: "PMPP",
    implementTask: "Roofline for your ops",
    reviseTask: "Yesterday: P6 defence",
    deliverable: "Commit",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 338, date: "10-Aug-27", week: 49, phase: "Phase 10 - GPU & inference optimisation",
    topic: "First CUDA kernel",
    concepts: "Vector add; tiled matmul",
    learnSection: "CUDA ch 2-3",
    sourceKey: "CUDA",
    implementTask: "Write + time",
    reviseTask: "Yesterday: GPU architecture & memory hierarchy",
    deliverable: "Report",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 339, date: "11-Aug-27", week: 49, phase: "Phase 10 - GPU & inference optimisation",
    topic: "PyTorch GPU profiling",
    concepts: "Kernel launches; fusion; compile",
    learnSection: "PT-PROF",
    sourceKey: "PT-PROF",
    implementTask: "Profile MiniGPT; fuse",
    reviseTask: "Yesterday: First CUDA kernel",
    deliverable: "Table",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 340, date: "12-Aug-27", week: 49, phase: "Phase 10 - GPU & inference optimisation",
    topic: "Quantisation methods",
    concepts: "AWQ, GPTQ, SmoothQuant",
    learnSection: "AWQ sec 3; GPTQ sec 3",
    sourceKey: "AWQ",
    implementTask: "Quantise 1-3B two ways",
    reviseTask: "Yesterday: PyTorch GPU profiling",
    deliverable: "Table + derivation",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 341, date: "13-Aug-27", week: 49, phase: "Phase 10 - GPU & inference optimisation",
    topic: "Pruning & distillation",
    concepts: "Structured pruning; KD loss",
    learnSection: "KD sec 2",
    sourceKey: "KD",
    implementTask: "Prune CNN; distil CNN",
    reviseTask: "Yesterday: Quantisation methods",
    deliverable: "Table + Anki",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 342, date: "14-Aug-27", week: 49, phase: "Phase 10 - GPU & inference optimisation",
    topic: "ONNX Runtime + TensorRT (light)",
    concepts: "Graph opts; engines",
    learnSection: "ONNX performance; TensorRT quickstart",
    sourceKey: "ONNX",
    implementTask: "Optimise CNN; benchmark",
    reviseTask: "Yesterday: Pruning & distillation",
    deliverable: "Table",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 343, date: "15-Aug-27", week: 49, phase: "Phase 10 - GPU & inference optimisation",
    topic: "WEEKLY CHECKPOINT 49: GPU basics & compression",
    concepts: "Whole week",
    learnSection: "Anki + notes (30 min)",
    sourceKey: "OWN",
    implementTask: "Self-test 10 concept Qs + interview Qs: Roofline; Why batching raises throughput; AWQ vs GPTQ (score bands: <40 weak, 40-60 needs work, 60-75 acceptable, 75-90 strong, 90+ excellent; <75% => revise before next week) (60 min); redo hardest implementation from blank file (30 min)",
    reviseTask: "Whole week",
    deliverable: "Score + 200-word weekly note + push",
    difficulty: 4, checkpoint: "Weekly Checkpoint"
  },

  // Phase 10: GPU & inference optimisation - LLM serving (Days 344-350)
  {
    day: 344, date: "16-Aug-27", week: 50, phase: "Phase 10 - GPU & inference optimisation",
    topic: "vLLM",
    concepts: "Engine args; API; batching",
    learnSection: "VLLM quickstart",
    sourceKey: "VLLM",
    implementTask: "Serve; benchmark",
    reviseTask: "Yesterday: ONNX Runtime + TensorRT (light)",
    deliverable: "Note",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 345, date: "17-Aug-27", week: 50, phase: "Phase 10 - GPU & inference optimisation",
    topic: "PagedAttention & continuous batching",
    concepts: "KV paging; scheduling",
    learnSection: "VLLM paper sec 3-4",
    sourceKey: "VLLM",
    implementTask: "Diagram; fragmentation measure",
    reviseTask: "Yesterday: vLLM",
    deliverable: "Table",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 346, date: "18-Aug-27", week: 50, phase: "Phase 10 - GPU & inference optimisation",
    topic: "Speculative decoding",
    concepts: "Draft/verify; acceptance",
    learnSection: "SPEC sec 2-3",
    sourceKey: "SPEC",
    implementTask: "Try; measure",
    reviseTask: "Yesterday: PagedAttention & continuous batching",
    deliverable: "Table",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 347, date: "19-Aug-27", week: 50, phase: "Phase 10 - GPU & inference optimisation",
    topic: "KV-cache management",
    concepts: "Prefix caching; quantised KV",
    learnSection: "VLLM docs",
    sourceKey: "VLLM",
    implementTask: "Prefix caching experiment",
    reviseTask: "Yesterday: Speculative decoding",
    deliverable: "Report",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 348, date: "20-Aug-27", week: 50, phase: "Phase 10 - GPU & inference optimisation",
    topic: "Benchmark methodology",
    concepts: "TTFT, TPOT, p95, cost/1k tokens",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Harness + cost model",
    reviseTask: "Yesterday: KV-cache management",
    deliverable: "Doc + Anki",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 349, date: "21-Aug-27", week: 50, phase: "Phase 10 - GPU & inference optimisation",
    topic: "Serving design",
    concepts: "Routing; autoscaling; multi-tenant",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Design doc",
    reviseTask: "Yesterday: Benchmark methodology",
    deliverable: "Summary A",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 350, date: "22-Aug-27", week: 50, phase: "Phase 10 - GPU & inference optimisation",
    topic: "WEEKLY CHECKPOINT 50: LLM serving",
    concepts: "Whole week",
    learnSection: "Anki + notes (30 min)",
    sourceKey: "OWN",
    implementTask: "Self-test 10 concept Qs + interview Qs: TTFT vs TPOT; Why PagedAttention; Speculative decoding math (score bands: <40 weak, 40-60 needs work, 60-75 acceptable, 75-90 strong, 90+ excellent; <75% => revise before next week) (60 min); redo hardest implementation from blank file (30 min)",
    reviseTask: "Whole week",
    deliverable: "Score + 200-word weekly note + push",
    difficulty: 4, checkpoint: "Weekly Checkpoint"
  },

  // Phase 11: Research engineering - Reading, reproduction, ablation (Days 351-357)
  {
    day: 351, date: "23-Aug-27", week: 51, phase: "Phase 11 - Research engineering",
    topic: "Finding & reading papers",
    concepts: "Three-pass; paper log",
    learnSection: "KESHAV; PWC",
    sourceKey: "KESHAV",
    implementTask: "Log; pick paper A (specialisation)",
    reviseTask: "Yesterday: Serving design",
    deliverable: "Code",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 352, date: "24-Aug-27", week: 51, phase: "Phase 11 - Research engineering",
    topic: "Equations to code",
    concepts: "Map equations to functions",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Implement core of A",
    reviseTask: "Yesterday: Finding & reading papers",
    deliverable: "Numbers",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 353, date: "25-Aug-27", week: 51, phase: "Phase 11 - Research engineering",
    topic: "Reproduction",
    concepts: "Small-scale; baseline; sanity checks",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Baseline + repro run",
    reviseTask: "Yesterday: Equations to code",
    deliverable: "Table",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 354, date: "26-Aug-27", week: 51, phase: "Phase 11 - Research engineering",
    topic: "Ablation",
    concepts: "One factor; seeds; error bars",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Ablation runs (MLflow)",
    reviseTask: "Yesterday: Reproduction",
    deliverable: "Report",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 355, date: "27-Aug-27", week: 51, phase: "Phase 11 - Research engineering",
    topic: "Statistical reporting + write-up",
    concepts: "CIs across seeds; 2-page report",
    learnSection: "BRUCE ch 2-3",
    sourceKey: "OWN",
    implementTask: "Report",
    reviseTask: "Yesterday: Ablation",
    deliverable: "Ideas.md + Anki",
    difficulty: 4, checkpoint: ""
  },
  {
    day: 356, date: "28-Aug-27", week: 51, phase: "Phase 11 - Research engineering",
    topic: "Paper B + ideas",
    concepts: "Current paper; transfer to projects",
    learnSection: "PWC",
    sourceKey: "PWC",
    implementTask: "Summary B; ideas list",
    reviseTask: "Yesterday: Statistical reporting + write-up",
    deliverable: "Docs",
    difficulty: 5, checkpoint: ""
  },
  {
    day: 357, date: "29-Aug-27", week: 51, phase: "Phase 11 - Research engineering",
    topic: "WEEKLY CHECKPOINT 51: Reading, reproduction, ablation",
    concepts: "Whole week",
    learnSection: "Anki + notes (30 min)",
    sourceKey: "OWN",
    implementTask: "Self-test 10 concept Qs + interview Qs: Why seeds matter for claims; What an ablation proves; Limitations you'd state (score bands: <40 weak, 40-60 needs work, 60-75 acceptable, 75-90 strong, 90+ excellent; <75% => revise before next week) (60 min); redo hardest implementation from blank file (30 min)",
    reviseTask: "Whole week",
    deliverable: "Score + 200-word weekly note + push",
    difficulty: 4, checkpoint: "Weekly Checkpoint"
  },

  // Phase 12: Flagship integration - Flagship: Sentinel-Edge (Days 358-365)
  {
    day: 358, date: "30-Aug-27", week: 52, phase: "Phase 12 - Flagship integration",
    topic: "Architecture & integration plan",
    concepts: "All components; interfaces",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Architecture doc + ADRs",
    reviseTask: "Yesterday: Paper B + ideas",
    deliverable: "Commit",
    difficulty: 5, checkpoint: ""
  },
  {
    day: 359, date: "31-Aug-27", week: 52, phase: "Phase 12 - Flagship integration",
    topic: "Edge + ingestion + RAG wiring",
    concepts: "RPi -> stream -> Postgres; RegRAG over manuals/logs",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Wire",
    reviseTask: "Yesterday: Architecture & integration plan",
    deliverable: "Commit",
    difficulty: 5, checkpoint: ""
  },
  {
    day: 360, date: "01-Sep-27", week: 52, phase: "Phase 12 - Flagship integration",
    topic: "Voice + routing",
    concepts: "TanglishVoice front end; local vs hosted routing",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Wire router",
    reviseTask: "Yesterday: Edge + ingestion + RAG wiring",
    deliverable: "Report",
    difficulty: 5, checkpoint: ""
  },
  {
    day: 361, date: "02-Sep-27", week: 52, phase: "Phase 12 - Flagship integration",
    topic: "End-to-end eval + reliability",
    concepts: "Task success; time-to-answer; chaos",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Eval + tests",
    reviseTask: "Yesterday: Voice + routing",
    deliverable: "Commit",
    difficulty: 5, checkpoint: ""
  },
  {
    day: 362, date: "03-Sep-27", week: 52, phase: "Phase 12 - Flagship integration",
    topic: "Security + cost",
    concepts: "Threat model; OWASP map; cost model",
    learnSection: "OWASP",
    sourceKey: "OWASP",
    implementTask: "Review + fixes; cost.md",
    reviseTask: "Yesterday: End-to-end eval + reliability",
    deliverable: "CP7 self-grade + resume",
    difficulty: 5, checkpoint: ""
  },
  {
    day: 363, date: "04-Sep-27", week: 52, phase: "Phase 12 - Flagship integration",
    topic: "Docs, demo, mock interviews",
    concepts: "README; video; recorded system-design + project defence",
    learnSection: "Project/build day - no new reading",
    sourceKey: "OWN",
    implementTask: "Docs + 2 recorded mocks",
    reviseTask: "Yesterday: Security + cost",
    deliverable: "Checklist score + plan",
    difficulty: 5, checkpoint: ""
  },
  {
    day: 364, date: "05-Sep-27", week: 52, phase: "Phase 12 - Flagship integration",
    topic: "WEEKLY CHECKPOINT 52: Flagship: Sentinel-Edge",
    concepts: "Whole week",
    learnSection: "Anki + notes (30 min)",
    sourceKey: "OWN",
    implementTask: "Self-test 10 concept Qs + interview Qs: Defend every decision; Biggest weakness; V2 changes (score bands: <40 weak, 40-60 needs work, 60-75 acceptable, 75-90 strong, 90+ excellent; <75% => revise before next week) (60 min); redo hardest implementation from blank file (30 min)",
    reviseTask: "Whole week",
    deliverable: "Score + 200-word weekly note + push",
    difficulty: 5, checkpoint: "CP7"
  },
  {
    day: 365, date: "06-Sep-27", week: 53, phase: "Phase 12 - Flagship integration",
    topic: "DAY 365: Final assessment (CP7 sign-off)",
    concepts: "Part 22 checklist (20 items)",
    learnSection: "-",
    sourceKey: "OWN",
    implementTask: "Demonstrate 5 random checklist items from blank files; score all 20; write next-year plan",
    reviseTask: "Everything",
    deliverable: "Checklist score + plan",
    difficulty: 5, checkpoint: "CP7"
  }
];

// Helper to hydrate days with source details
export function getEnrichedRoadmapDays() {
  return RAW_ROADMAP_DAYS.map(day => {
    const src = SOURCES_DATASET[day.sourceKey] || {
      key: day.sourceKey || "OWN",
      name: day.sourceKey === "OWN" ? "Independent Practice / Implementation" : `Source (${day.sourceKey})`,
      url: "https://github.com/",
      whatToStudy: "Refer to roadmap concepts and daily implementation tasks.",
      whatToSkip: "Theoretical sections with no immediate engineering utility.",
      quality: "PRIMARY"
    };

    return {
      ...day,
      sourceName: src.name,
      sourceUrl: src.url,
      whatToStudy: src.whatToStudy || "Study core concepts and implement lab exercises.",
      whatToSkip: src.whatToSkip || "None specified.",
      quality: src.quality || "PRIMARY",
      // Runtime progress state defaults
      status: "NOT_STARTED", // NOT_STARTED, IN_PROGRESS, COMPLETED, NEEDS_REVISION, BLOCKED, SKIPPED
      mastery: 0, // 0 to 5
      timeSpentMinutes: 0,
      remarks: "",
      notes: "",
      doubts: [],
      revisionDue: null,
      revisionStep: 0,
      completedAt: null,
      lastRevisedAt: null
    };
  });
}

if (typeof window !== 'undefined') {
  window.RAW_ROADMAP_DAYS = RAW_ROADMAP_DAYS;
  window.getEnrichedRoadmapDays = getEnrichedRoadmapDays;
}
