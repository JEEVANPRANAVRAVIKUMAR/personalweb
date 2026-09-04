// projectsDataset.js - The 7 First-Class Engineering Projects & Checkpoints
export const PROJECTS_DATASET = [
  {
    id: "p1",
    code: "PROJECT 1",
    name: "PredictiveMaint-ML",
    phase: "Phase 2 - Classical & advanced ML",
    weeks: "Weeks 11-12 (Days 71-84)",
    checkpointId: "CP1",
    objective: "Build an end-to-end industrial machine failure prediction system using NASA C-MAPSS and UCI AI4I 2020 datasets with asymmetric cost matrix optimization and FastAPI deployment.",
    technologies: ["Python", "LightGBM", "RandomForest", "Scikit-Learn", "Optuna", "SHAP", "FastAPI", "Pandas", "NumPy"],
    deliverables: [
      "Data ingestion & validation pipeline with time-based cross validation",
      "Rolling, lag, and FFT spectral feature extraction pipeline",
      "Calibrated probability model with cost-matrix threshold optimization",
      "Optuna Bayesian hyperparameter search pipeline",
      "SHAP TreeExplainer global & local feature importance visualizations",
      "Model Card documenting performance, failure modes, and slice evaluation",
      "FastAPI sub-10ms batch scoring endpoint with input schema validation",
      "Comprehensive README and clean-clone reproduction instructions"
    ],
    evaluationCriteria: [
      { name: "Theory", maxScore: 10, description: "Justification of time-series CV, calibration mechanics, and metric selection (PR-AUC vs ROC-AUC)" },
      { name: "Implementation", maxScore: 10, description: "Clean code structure, vectorized feature transforms, no data leakage, reproducible pipeline" },
      { name: "Debugging", maxScore: 10, description: "Error analysis on hard false positives/negatives, slice analysis on sensor variance" },
      { name: "Explanation", maxScore: 10, description: "SHAP interpretation, defense of cost-tradeoff threshold vs business impact" },
      { name: "Project", maxScore: 10, description: "Working FastAPI scoring endpoint with input validation and clean repository structure" }
    ],
    githubRepo: "https://github.com/your-username/PredictiveMaint-ML",
    demoUrl: "",
    status: "NOT STARTED",
    architectureNotes: "Sensors -> Windowing -> Spectral/Lag Features -> LightGBM -> Isotonic Calibrator -> Cost Threshold Matrix -> FastAPI Endpoint"
  },
  {
    id: "p2",
    code: "PROJECT 2",
    name: "EdgeVibe-CNN",
    phase: "Phase 3 - Deep learning & PyTorch",
    weeks: "Weeks 18-19 (Days 120-133)",
    checkpointId: "CP2",
    objective: "Develop an embedded edge audio/vibration anomaly detector using CWRU/MIMII bearing datasets, converting raw waveforms to log-mel spectrograms and deploying quantized ONNX models to Raspberry Pi / ARM CPU.",
    technologies: ["PyTorch", "TorchAudio", "ONNX Runtime", "MobileNetV2", "ResNet", "INT8 PTQ Quantization", "MQTT", "systemd", "Raspberry Pi / ARM"],
    deliverables: [
      "Real-time STFT / Log-Mel Spectrogram extraction pipeline with SpecAugment",
      "Custom lightweight PyTorch CNN architecture (ResNet / MobileNetV2 backbone)",
      "Training loop with AMP, learning rate finder, and diagnostic instrumentation",
      "ONNX model export with dynamic axes and parity verification (<1e-4 tolerance)",
      "Post-Training Quantization (PTQ INT8) with size vs accuracy trade-off table",
      "Raspberry Pi / ARM deployment with multi-threading latency benchmarking (p50/p95)",
      "Background daemon service with systemd and MQTT telemetry publishing"
    ],
    evaluationCriteria: [
      { name: "Theory", maxScore: 10, description: "Receptive field calculations, depthwise separable conv math, PTQ calibration mechanics" },
      { name: "Implementation", maxScore: 10, description: "PyTorch custom dataset, SpecAugment transform, ONNX runtime ARM integration" },
      { name: "Debugging", maxScore: 10, description: "Profiling latency bottlenecks, memory alignment, fixing ARM numerical discrepancies" },
      { name: "Explanation", maxScore: 10, description: "Spectrogram frequency resolution vs time resolution trade-offs and latency curves" },
      { name: "Project", maxScore: 10, description: "Sub-50ms inference on ARM CPU with MQTT streaming telemetry and systemd service" }
    ],
    githubRepo: "https://github.com/your-username/EdgeVibe-CNN",
    demoUrl: "",
    status: "NOT STARTED",
    architectureNotes: "Raw Vibration (16kHz) -> MelSpectrogram -> INT8 ONNX MobileNet -> ORT Engine (ARM NEON) -> MQTT Broker"
  },
  {
    id: "p3",
    code: "PROJECT 3",
    name: "MiniGPT-Domain",
    phase: "Phase 4 - Transformers & LLMs",
    weeks: "Weeks 25-26 (Days 169-182)",
    checkpointId: "CP3",
    objective: "Build, pretrain, and evaluate a domain-specific decoder-only Transformer from scratch using financial/regulatory or security texts with custom BPE tokenizer, RoPE, KV cache, and Hugging Face export.",
    technologies: ["Python", "PyTorch", "BPE Tokenizer", "Transformers", "RoPE", "KV Cache", "FlashAttention", "Hugging Face Hub", "Colab GPU"],
    deliverables: [
      "Custom Byte-Pair Encoding (BPE) tokenizer trained on domain corpus",
      "Decoder-only Transformer built from scratch (Multi-Head Attention, RoPE, RMSNorm, SwiGLU, GELU)",
      "Efficient KV-Cache implementation in generation loop demonstrating >=3x speedup",
      "Pretraining pipeline with mixed precision (AMP), gradient accumulation, and cosine schedule",
      "Ablation study comparing RoPE vs Learned Positional Encodings and Model Sizes",
      "Perplexity evaluation benchmark and domain sample generation analysis",
      "Weight export and integration with Hugging Face AutoModel / safetensors",
      "Production serve script (`serve.py`) with greedy, top-k, top-p, and temperature sampling"
    ],
    evaluationCriteria: [
      { name: "Theory", maxScore: 10, description: "Scaled dot-product attention derivation, RoPE rotation geometry, Chinchilla scaling math" },
      { name: "Implementation", maxScore: 10, description: "Clean transformer blocks, vectorised attention, bug-free KV cache index management" },
      { name: "Debugging", maxScore: 10, description: "Loss spike debugging, gradient norm tracking, numerical stability in softmax" },
      { name: "Explanation", maxScore: 10, description: "Memory accounting: KV cache sizing formula, activation memory vs model weights" },
      { name: "Project", maxScore: 10, description: "Trained domain model generating coherent specialized text with standalone server" }
    ],
    githubRepo: "https://github.com/your-username/MiniGPT-Domain",
    demoUrl: "",
    status: "NOT STARTED",
    architectureNotes: "Corpus -> Custom BPE -> Transformer Decoder (RoPE + RMSNorm + GQA) -> KV Cache Decoder -> Fast Generation Engine"
  },
  {
    id: "p4",
    code: "PROJECT 4",
    name: "RegRAG",
    phase: "Phase 5 - Embeddings & RAG",
    weeks: "Weeks 31-32 (Days 211-224)",
    checkpointId: "CP4",
    objective: "Architect a production-grade regulatory compliance RAG system over SEBI/RBI financial regulations featuring Contextual Retrieval, hybrid BM25 + pgvector HNSW search, Reranking, and RAGAS evaluation.",
    technologies: ["Python", "PostgreSQL", "pgvector", "BM25", "Sentence-Transformers", "Cohere / Cross-Encoders", "FastAPI", "Redis", "RAGAS", "Locust"],
    deliverables: [
      "Document ingestion and Contextual Chunking pipeline with document summaries",
      "Hybrid search engine combining BM25 lexical ranking and pgvector HNSW dense embeddings via Reciprocal Rank Fusion (RRF)",
      "Cross-encoder re-ranking stage with latency optimization",
      "Query transformation pipeline: HyDE and Multi-Query decomposition",
      "Automated evaluation benchmark with 100 Q&A pairs using RAGAS (Faithfulness & Answer Relevance)",
      "Multi-tier caching architecture: Exact query hash + Semantic embedding similarity cache with Redis",
      "FastAPI production service with streaming SSE generation and citation tracking",
      "Locust load testing suite proving p95 latency under concurrent load"
    ],
    evaluationCriteria: [
      { name: "Theory", maxScore: 10, description: "BM25 math, HNSW graph mechanics, RRF fusion logic, Contextual retrieval rationale" },
      { name: "Implementation", maxScore: 10, description: "Async pipeline, streaming FastAPI, pgvector HNSW indexing, clean modular abstractions" },
      { name: "Debugging", maxScore: 10, description: "Error analysis on 20 worst retrieval failures, hallucination mitigation, judge calibration" },
      { name: "Explanation", maxScore: 10, description: "Cost per query levers, latency breakdown across retrieval/reranking/generation" },
      { name: "Project", maxScore: 10, description: "Live interactive RAG system over complex PDFs with verified citations and high RAGAS score" }
    ],
    githubRepo: "https://github.com/your-username/RegRAG",
    demoUrl: "",
    status: "NOT STARTED",
    architectureNotes: "PDF Ingestion -> Contextual Chunks -> Dual Index (pgvector HNSW + BM25) -> RRF Merge -> Cross-Encoder -> Generator + Citations"
  },
  {
    id: "p5",
    code: "PROJECT 5",
    name: "TanglishVoice",
    phase: "Phase 7 - Agents & Phase 8 - Speech",
    weeks: "Weeks 39-40 (Days 267-280)",
    checkpointId: "CP5",
    objective: "Build an interactive code-mixed (Tanglish / Indian English) voice agent with fine-tuned Whisper, deterministic LangGraph state machine, MCP tool integrations, and security red-teaming.",
    technologies: ["Python", "Whisper", "faster-whisper", "VITS / Kokoro TTS", "LangGraph", "Model Context Protocol (MCP)", "Pydantic", "Garak", "FastAPI"],
    deliverables: [
      "Fine-tuned Whisper model on code-mixed speech with LoRA adapter and lower WER",
      "Deterministic LangGraph dialogue state machine with typed Pydantic state",
      "Intent extraction layer with structured output and fallback mechanisms",
      "MCP (Model Context Protocol) server providing tool access to RegRAG & customer systems",
      "Streaming audio pipeline connecting faster-whisper STT -> Agent Graph -> TTS synthesis",
      "End-to-end latency optimization profiling every stage to hit conversational budget",
      "Adversarial security assessment: 20 prompt injection attacks and red-teaming with Garak"
    ],
    evaluationCriteria: [
      { name: "Theory", maxScore: 10, description: "Speech features (STFT/Mel), CTC vs Attention, deterministic workflows vs agentic loops" },
      { name: "Implementation", maxScore: 10, description: "LangGraph state management, MCP tool integration, audio streaming buffer pipeline" },
      { name: "Debugging", maxScore: 10, description: "Handling code-mixed vocabulary errors, speech hallucination, tool retry idempotency" },
      { name: "Explanation", maxScore: 10, description: "Threat modeling (STRIDE), indirect injection defenses, latency budgeting per hop" },
      { name: "Project", maxScore: 10, description: "Live working voice assistant answering complex queries in natural code-mixed speech" }
    ],
    githubRepo: "https://github.com/your-username/TanglishVoice",
    demoUrl: "",
    status: "NOT STARTED",
    architectureNotes: "Mic -> Silero VAD -> faster-whisper (Tanglish) -> LangGraph Router -> MCP Tools / RegRAG -> VITS TTS -> Audio Out"
  },
  {
    id: "p6",
    code: "PROJECT 6",
    name: "MLOps Lifecycle Platform",
    phase: "Phase 9 - MLOps, cloud, systems",
    weeks: "Weeks 47-48 (Days 323-336)",
    checkpointId: "CP6",
    objective: "Construct an automated enterprise ML platform covering dataset versioning (DVC), experiment tracking (MLflow), automated CI/CD gates, cloud deployment (Azure Container Apps), drift detection (Evidently AI), and automatic retraining loops.",
    technologies: ["MLflow", "DVC", "Docker", "GitHub Actions", "Azure Container Apps", "PostgreSQL", "Redis", "Evidently AI", "OpenTelemetry", "FastAPI"],
    deliverables: [
      "Reproducible DVC pipeline (`dvc.yaml`) for dataset ingestion, feature engineering, and training",
      "Centralized MLflow tracking server and Model Registry with staging/production promotion gates",
      "Multi-stage Docker container with non-root security and slim Python runtime",
      "GitHub Actions CI/CD workflow running data tests, model performance assertions, and auto-deploy",
      "Cloud deployment on Azure Container Apps with managed PostgreSQL and Redis",
      "Production observability dashboard tracking request throughput, p95 latency, and SLOs",
      "Automated drift detection service (Evidently AI) triggering alerting and retraining jobs",
      "Simulated data drift incident drill demonstrating automated rollback and redeployment"
    ],
    evaluationCriteria: [
      { name: "Theory", maxScore: 10, description: "Point-in-time correctness, data lineage, Kolmogorov-Smirnov / PSI drift math, SLO design" },
      { name: "Implementation", maxScore: 10, description: "Complete IaC / Docker / CI-CD pipeline, telemetry spans, zero-downtime deployment" },
      { name: "Debugging", maxScore: 10, description: "Diagnosing distribution shift, handling pipeline stage failures, automated rollbacks" },
      { name: "Explanation", maxScore: 10, description: "Full lifecycle architecture defense, cost management analysis, reliability patterns" },
      { name: "Project", maxScore: 10, description: "Fully automated MLOps platform managing the continuous lifecycle of Project 1 & 4 models" }
    ],
    githubRepo: "https://github.com/your-username/MLOps-Platform",
    demoUrl: "",
    status: "NOT STARTED",
    architectureNotes: "DVC Data -> MLflow Registry -> GitHub Actions CI -> Docker -> Azure Container Apps -> OpenTelemetry -> Evidently Drift Job"
  },
  {
    id: "p7",
    code: "FLAGSHIP",
    name: "Sentinel-Edge Flagship Platform",
    phase: "Phase 12 - Flagship integration",
    weeks: "Weeks 52-53 (Days 358-365)",
    checkpointId: "CP7",
    objective: "Unify all prior systems into a monolithic enterprise flagship platform: Edge anomaly sensor detection (P2) streaming into cloud telemetry (P6), grounding with regulatory compliance RAG (P4), and controlled via voice agent assistant (P5).",
    technologies: ["PyTorch", "ONNX Runtime", "vLLM", "LangGraph", "PostgreSQL/pgvector", "FastAPI", "Docker", "Azure Container Apps", "OpenTelemetry"],
    deliverables: [
      "Unified system architecture connecting Edge IoT -> Streaming Ingestion -> Storage -> RAG -> Voice Agent",
      "Edge-to-cloud telemetry sync with automatic anomaly event dispatch",
      "Integrated regulatory reasoning linking telemetry alarms directly to technical compliance manuals",
      "Voice-activated operator interface allowing hands-free diagnostics and maintenance query execution",
      "Comprehensive benchmark report covering latency, throughput, GPU utilization, and operational costs",
      "Full security threat model (OWASP Top 10 for LLMs) defense documentation",
      "Complete recorded system defense walkthrough demonstrating 5 random scenarios from blank scratch"
    ],
    evaluationCriteria: [
      { name: "Theory", maxScore: 10, description: "Mastery across all 13 phases: Math, ML, PyTorch, Transformers, RAG, Agents, MLOps, GPUs" },
      { name: "Implementation", maxScore: 10, description: "End-to-end integration without loose ends, robust error boundaries, elegant UI/API design" },
      { name: "Debugging", maxScore: 10, description: "Resolving distributed system partitions, edge disconnections, and prompt injection attempts" },
      { name: "Explanation", maxScore: 10, description: "Technical defense of every single design decision, trade-off, and architectural choice" },
      { name: "Project", maxScore: 10, description: "Flawless end-to-end demonstration of the complete flagship AI engineering platform" }
    ],
    githubRepo: "https://github.com/your-username/Sentinel-Edge",
    demoUrl: "",
    status: "NOT STARTED",
    architectureNotes: "Edge Devices (P2) -> Ingestion Queue -> RegRAG Grounding (P4) <-> TanglishVoice Agent (P5) <-> MLOps Core (P6)"
  }
];

export const CHECKPOINTS_DATASET = [
  {
    id: "CP0",
    day: 7,
    week: 1,
    name: "Assessment + Engineering Setup Checkpoint",
    phase: "Phase 0 - Assessment & setup",
    relatedDays: "Days 1-7",
    requiredConcepts: "uv, pyproject.toml, pytest, pre-commit, pyright, asyncio, Docker basics, git rebase/bisect",
    requiredImplementation: "Create `ai-lab` repo skeleton; typed module + unit tests; CI pipeline; self-test 10 concept questions",
    requiredDeliverable: "Score + 200-word weekly reflection note + push to remote repo",
    scoringBands: "<40 Weak (revise before next week), 40-60 Needs Work, 60-75 Acceptable, 75-90 Strong, 90+ Excellent"
  },
  {
    id: "CP-MATH",
    day: 42,
    week: 6,
    name: "Mathematics for ML Diagnostic Checkpoint (Math Diagnostic v2)",
    phase: "Phase 1 - Mathematics",
    relatedDays: "Days 8-42",
    requiredConcepts: "Linear algebra, SVD, PCA, Vector calculus, Jacobians, Hessians, Gradient Descent, Probability, Bayes, MLE/MAP, CLT, Hypothesis testing",
    requiredImplementation: "mathlib v1.0 test suite, numerical autograd checker, Gaussian mixture EM derivation, 20-Q diagnostic retake",
    requiredDeliverable: "Diagnostic score >=75% + mathlib v1.0 commit + 200-word weekly note",
    scoringBands: "<40 Weak, 40-60 Needs Work, 60-75 Acceptable, 75-90 Strong, 90+ Excellent"
  },
  {
    id: "CP1",
    day: 84,
    week: 12,
    name: "Project 1 Checkpoint: PredictiveMaint-ML",
    phase: "Phase 2 - Classical & advanced ML",
    relatedDays: "Days 71-84",
    requiredConcepts: "Time-series validation, feature engineering, LightGBM, probability calibration, cost threshold matrix, SHAP, FastAPI",
    requiredImplementation: "Full PredictiveMaint-ML repo, calibration curves, SHAP summary plots, FastAPI scoring test, 9 project questions defense",
    requiredDeliverable: "CP1 Self-grade scorecard /50 + Model Card + API test suite",
    scoringBands: "0-20 Needs major revision, 21-30 Weak, 31-40 Good, 41-46 Strong, 47-50 Excellent"
  },
  {
    id: "CP2",
    day: 133,
    week: 19,
    name: "Project 2 Checkpoint: EdgeVibe-CNN",
    phase: "Phase 3 - Deep learning & PyTorch",
    relatedDays: "Days 120-133",
    requiredConcepts: "Spectrogram transforms, ResNet/MobileNet, PyTorch training craft, ONNX export, INT8 PTQ quantization, ARM CPU inference",
    requiredImplementation: "Spectrogram pipeline, ONNX parity <1e-4, Raspberry Pi/ARM latency table, MQTT service, 9 project questions defense",
    requiredDeliverable: "CP2 Self-grade scorecard /50 + Latency/Accuracy trade-off table + Video walkthrough",
    scoringBands: "0-20 Needs major revision, 21-30 Weak, 31-40 Good, 41-46 Strong, 47-50 Excellent"
  },
  {
    id: "CP3",
    day: 182,
    week: 26,
    name: "Project 3 Checkpoint: MiniGPT-Domain",
    phase: "Phase 4 - Transformers & LLMs",
    relatedDays: "Days 169-182",
    requiredConcepts: "BPE Tokenizer, Scaled dot-product attention, RoPE, RMSNorm, KV cache decoding, pretraining loop, Hugging Face export",
    requiredImplementation: "Full MiniGPT codebase, KV cache speedup table, ablation charts (RoPE vs Learned), HF hub model export, 9 project questions defense",
    requiredDeliverable: "CP3 Self-grade scorecard /50 + Perplexity curves + Sample generations + Blog writeup",
    scoringBands: "0-20 Needs major revision, 21-30 Weak, 31-40 Good, 41-46 Strong, 47-50 Excellent"
  },
  {
    id: "CP4",
    day: 224,
    week: 32,
    name: "Project 4 Checkpoint: RegRAG",
    phase: "Phase 5 - Embeddings & RAG",
    relatedDays: "Days 211-224",
    requiredConcepts: "Contextual retrieval, BM25 + pgvector HNSW hybrid search, RRF, Cross-encoder reranking, RAGAS metrics, Redis cache",
    requiredImplementation: "RegRAG pipeline, 100 Q&A RAGAS benchmark, Locust load testing, Redis cache hit-rate dashboard, 9 project questions defense",
    requiredDeliverable: "CP4 Self-grade scorecard /50 + System design whiteboard + RAGAS evaluation report",
    scoringBands: "0-20 Needs major revision, 21-30 Weak, 31-40 Good, 41-46 Strong, 47-50 Excellent"
  },
  {
    id: "CP5",
    day: 280,
    week: 40,
    name: "Project 5 Checkpoint: TanglishVoice",
    phase: "Phase 7 - Agents & Phase 8 - Speech",
    relatedDays: "Days 267-280",
    requiredConcepts: "Whisper LoRA fine-tuning, WER evaluation, LangGraph state machine, MCP protocol, prompt injection defense, Garak scanner",
    requiredImplementation: "Tanglish voice agent, LangGraph workflow, MCP server, 20-probe injection defense test, 50 dialogue evaluation, video demo",
    requiredDeliverable: "CP5 Self-grade scorecard /50 + Security writeup + Latency budget breakdown",
    scoringBands: "0-20 Needs major revision, 21-30 Weak, 31-40 Good, 41-46 Strong, 47-50 Excellent"
  },
  {
    id: "CP6",
    day: 336,
    week: 48,
    name: "Project 6 Checkpoint: MLOps Platform",
    phase: "Phase 9 - MLOps, cloud, systems",
    relatedDays: "Days 323-336",
    requiredConcepts: "DVC, MLflow tracking & registry, multi-stage Docker, Azure Container Apps, Evidently AI drift detection, OpenTelemetry",
    requiredImplementation: "End-to-end automated platform, CI/CD promotion gates, simulated drift injection -> alert -> retrain drill, cost dashboard",
    requiredDeliverable: "CP6 Self-grade scorecard /50 + Full platform design document + Incident postmortem report",
    scoringBands: "0-20 Needs major revision, 21-30 Weak, 31-40 Good, 41-46 Strong, 47-50 Excellent"
  },
  {
    id: "CP7",
    day: 365,
    week: 53,
    name: "Flagship Checkpoint & Final Sign-Off: Sentinel-Edge",
    phase: "Phase 12 - Flagship integration",
    relatedDays: "Days 358-365",
    requiredConcepts: "Monolithic unification of all 13 phases: Edge CNN + Cloud MLOps + RegRAG + Tanglish Voice + GPU Acceleration + Research Engineering",
    requiredImplementation: "Sentinel-Edge integrated system, demonstration of 5 random checklist items from blank files, final system design defense",
    requiredDeliverable: "Final Assessment Sign-off /50 + Next-Year Senior AI Engineer Development Plan",
    scoringBands: "0-20 Needs major revision, 21-30 Weak, 31-40 Good, 41-46 Strong, 47-50 Excellent"
  }
];

if (typeof window !== 'undefined') {
  window.PROJECTS_DATASET = PROJECTS_DATASET;
  window.CHECKPOINTS_DATASET = CHECKPOINTS_DATASET;
}
