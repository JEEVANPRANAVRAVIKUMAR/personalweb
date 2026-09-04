// sourcesDataset.js - Curated sources catalog from Sheet 3 of the AI Engineer Roadmap
export const SOURCES_DATASET = {
  "MML": {
    key: "MML",
    name: "Mathematics for Machine Learning (Deisenroth, Faisal, Ong)",
    url: "https://mml-book.github.io/",
    whatToStudy: "Ch 2-8, 10 (Linear Algebra, Analytic Geometry, Matrix Decompositions, Vector Calculus, Probability & Distributions, Continuous Optimization, PCA)",
    whatToSkip: "Ch 9, 11, 12 (Advanced theoretical proofs not strictly needed for AI engineering)",
    quality: "PRIMARY",
    type: "Book / Free PDF",
    description: "The gold-standard mathematical foundation for machine learning, covering vectors, matrices, calculus, and probability."
  },
  "3B1B-LA": {
    key: "3B1B-LA",
    name: "3Blue1Brown - Essence of Linear Algebra",
    url: "https://www.3blue1brown.com/topics/linear-algebra",
    whatToStudy: "All 16 episodes (Geometric intuition, vectors, linear transformations, matrix multiplication, determinants, inverse, change of basis, eigenvectors)",
    whatToSkip: "None - full series provides irreplaceable geometric intuition",
    quality: "HIGH QUALITY",
    type: "Video Series",
    description: "Visual intuition for linear algebra and transformations in geometric space."
  },
  "3B1B-CALC": {
    key: "3B1B-CALC",
    name: "3Blue1Brown - Essence of Calculus",
    url: "https://www.3blue1brown.com/topics/calculus",
    whatToStudy: "Ep 1-4, 6 (Derivatives, chain rule, Taylor series, multivariate gradient intuition)",
    whatToSkip: "Pure integration episodes without ML relevance",
    quality: "HIGH QUALITY",
    type: "Video Series",
    description: "Visual foundation for derivatives, chain rules, and gradients."
  },
  "BRUCE": {
    key: "BRUCE",
    name: "Practical Statistics for Data Scientists (Bruce & Bruce, O'Reilly)",
    url: "https://www.oreilly.com/library/view/practical-statistics-for/9781492072935/",
    whatToStudy: "Ch 1-3 (Exploratory Data Analysis, Data and Sampling Distributions, Statistical Experiments and Significance Testing)",
    whatToSkip: "Ch 4-7 (Classical regression formulas better covered in ML courses)",
    quality: "HIGH QUALITY",
    type: "Book",
    description: "Applied statistics focusing on sampling, hypothesis testing, bootstrap confidence intervals, and A/B testing."
  },
  "NG": {
    key: "NG",
    name: "Andrew Ng - Machine Learning Specialization (Coursera)",
    url: "https://www.coursera.org/specializations/machine-learning-introduction",
    whatToStudy: "C1-C3 lectures; implement labs in NumPy/PyTorch from scratch",
    whatToSkip: "TensorFlow labs (re-implement in pure PyTorch/NumPy instead)",
    quality: "PRIMARY",
    type: "Course",
    description: "Foundational ML intuition: regression, classification, neural networks, decision trees, anomaly detection, recommender systems."
  },
  "GERON": {
    key: "GERON",
    name: "Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow, 3rd ed. (Aurélien Géron)",
    url: "https://github.com/ageron/handson-ml3",
    whatToStudy: "Ch 2-9 (End-to-End ML, Classification, Training Models, SVMs, Decision Trees, Ensemble Learning, Dimensionality Reduction, Unsupervised Learning)",
    whatToSkip: "Ch 10+ Keras sections (use PyTorch in Phase 3 instead)",
    quality: "PRIMARY",
    type: "Book / Code Repo",
    description: "The definitive hands-on guide for classical and tree-based machine learning."
  },
  "SHAP": {
    key: "SHAP",
    name: "SHAP Documentation & Interpretability Guide",
    url: "https://shap.readthedocs.io/",
    whatToStudy: "Intro + TreeExplainer, DeepExplainer, Shapley values intuition",
    whatToSkip: "Everything else (complex esoteric explainers)",
    quality: "HIGH QUALITY",
    type: "Documentation",
    description: "Model interpretability using game-theoretic Shapley values."
  },
  "LGBM": {
    key: "LGBM",
    name: "LightGBM Parameter Tuning & Architecture Docs",
    url: "https://lightgbm.readthedocs.io/en/latest/Parameters-Tuning.html",
    whatToStudy: "Tuning page, leaf-wise tree growth, categorical feature handling, histogram binning",
    whatToSkip: "GPU build details unless specifically benchmarking",
    quality: "PRIMARY",
    type: "Documentation",
    description: "High-performance gradient boosting library documentation and hyperparameter tuning principles."
  },
  "KAGGLE-FE": {
    key: "KAGGLE-FE",
    name: "Kaggle Learn - Feature Engineering",
    url: "https://www.kaggle.com/learn/feature-engineering",
    whatToStudy: "All modules (Mutual Information, Creating Features, Target Encoding, Clustering Features)",
    whatToSkip: "None (short & high practical value)",
    quality: "HIGH QUALITY",
    type: "Interactive Course",
    description: "Practical feature extraction, interaction terms, and target encoding."
  },
  "OPTUNA": {
    key: "OPTUNA",
    name: "Optuna Documentation & Tutorials",
    url: "https://optuna.readthedocs.io/",
    whatToStudy: "Tutorials on Bayesian optimization (TPE sampler), pruning callbacks (MedianPruner)",
    whatToSkip: "Custom distributed dashboard setup",
    quality: "HIGH QUALITY",
    type: "Documentation",
    description: "Hyperparameter optimization framework with efficient pruning algorithms."
  },
  "IMBL": {
    key: "IMBL",
    name: "imbalanced-learn User Guide",
    url: "https://imbalanced-learn.org/stable/user_guide.html",
    whatToStudy: "Over/under-sampling caveats, SMOTE limitations, cost-sensitive threshold adjustment",
    whatToSkip: "Exotic sampling algorithms (BorderlineSMOTE, ADASYN)",
    quality: "SECONDARY",
    type: "Documentation",
    description: "Techniques for handling severe class imbalance in classification datasets."
  },
  "KZ": {
    key: "KZ",
    name: "Andrej Karpathy - Neural Networks: Zero to Hero",
    url: "https://karpathy.ai/zero-to-hero.html",
    whatToStudy: "micrograd, makemore 1-5, Let's build GPT from scratch, BPE tokenizer video",
    whatToSkip: "None - mandatory foundational series for deep learning and LLMs",
    quality: "PRIMARY",
    type: "Video & Code",
    description: "Mastery of autograd, backprop, MLP, BatchNorm, WaveNet, and GPT from first principles."
  },
  "KRECIPE": {
    key: "KRECIPE",
    name: "Andrej Karpathy - A Recipe for Training Neural Networks",
    url: "https://karpathy.github.io/2019/04/25/recipe/",
    whatToStudy: "All (Understand data, set up baseline, overfit one batch, regularize, tune)",
    whatToSkip: "None (essential workflow checklist)",
    quality: "PRIMARY",
    type: "Essay / Guide",
    description: "The battle-tested systematic methodology for training neural networks without bugs."
  },
  "PT-TUT": {
    key: "PT-TUT",
    name: "PyTorch Official Tutorials",
    url: "https://docs.pytorch.org/tutorials/",
    whatToStudy: "Basics, Autograd, Dataset/DataLoader, nn.Module, Optimization, Save/Load, Transfer Learning",
    whatToSkip: "Distributed tutorials (concepts only until later phases)",
    quality: "PRIMARY",
    type: "Official Docs",
    description: "Core PyTorch concepts, tensor mechanics, memory layout, autograd graphs."
  },
  "PT-AMP": {
    key: "PT-AMP",
    name: "PyTorch Automatic Mixed Precision (AMP) Recipe",
    url: "https://docs.pytorch.org/tutorials/recipes/recipes/amp_recipe.html",
    whatToStudy: "All (torch.cuda.amp.autocast, GradScaler, scale/step/update mechanics)",
    whatToSkip: "None",
    quality: "PRIMARY",
    type: "Official Recipe",
    description: "Training with FP16/BF16 mixed precision for 2-3x speedup and memory efficiency."
  },
  "CS231N": {
    key: "CS231N",
    name: "Stanford CS231n: Convolutional Neural Networks",
    url: "https://cs231n.github.io/",
    whatToStudy: "Neural nets 1-3 notes, Convolution layers, Receptive field math, Backprop derivations",
    whatToSkip: "Legacy caffe/legacy homework assignments",
    quality: "PRIMARY",
    type: "Stanford Course Notes",
    description: "World-class course notes on vision models, conv layers, strides, padding, and gradients."
  },
  "D2L": {
    key: "D2L",
    name: "Dive into Deep Learning (Aston Zhang, Zack C. Lipton, et al.)",
    url: "https://d2l.ai/",
    whatToStudy: "Ch 9-11 (Recurrent Neural Networks, Modern RNNs - LSTM/GRU, Attention Mechanisms)",
    whatToSkip: "Rest of book if already covered in other materials",
    quality: "HIGH QUALITY",
    type: "Interactive Textbook",
    description: "Deep dive into sequence modeling, hidden states, gates, and attention alignment."
  },
  "RESNET": {
    key: "RESNET",
    name: "Deep Residual Learning for Image Recognition (He et al., 2015)",
    url: "https://arxiv.org/abs/1512.03385",
    whatToStudy: "Sec 3-4 (Residual formulation, degradation problem, identity mapping shortcut, architecture)",
    whatToSkip: "Extended ImageNet benchmark appendix tables",
    quality: "PRIMARY",
    type: "Research Paper",
    description: "The seminal paper introducing residual connections that made deep neural networks trainable."
  },
  "MOBILENET": {
    key: "MOBILENET",
    name: "MobileNetV2: Inverted Residuals and Linear Bottlenecks (Sandler et al., 2018)",
    url: "https://arxiv.org/abs/1801.04381",
    whatToStudy: "Sec 3 (Depthwise separable convolutions, inverted residuals, linear bottlenecks, FLOP savings)",
    whatToSkip: "Object detection ablation details",
    quality: "HIGH QUALITY",
    type: "Research Paper",
    description: "Efficient convolutional architecture design for edge devices and mobile inference."
  },
  "TORCHAUDIO": {
    key: "TORCHAUDIO",
    name: "PyTorch Audio Transforms Documentation",
    url: "https://docs.pytorch.org/audio/stable/transforms.html",
    whatToStudy: "Spectrogram, MelSpectrogram, MFCC, SpecAugment frequency/time masking",
    whatToSkip: "Legacy kaldi format loaders",
    quality: "PRIMARY",
    type: "Documentation",
    description: "Signal processing pipelines for audio, speech, and vibration spectrogram creation."
  },
  "ONNX": {
    key: "ONNX",
    name: "ONNX Runtime Documentation & Quantization",
    url: "https://onnxruntime.ai/docs/",
    whatToStudy: "Exporting from PyTorch, dynamic axes, quantization (INT8 PTQ/QAT), ARM/x86 Execution Providers",
    whatToSkip: "Custom C++ operators writing unless required for edge",
    quality: "PRIMARY",
    type: "Documentation",
    description: "Cross-platform model optimization and inference engine for embedded and server deployments."
  },
  "RASCHKA": {
    key: "RASCHKA",
    name: "Build a Large Language Model (From Scratch) - Sebastian Raschka",
    url: "https://github.com/rasbt/LLMs-from-scratch",
    whatToStudy: "All chapters (Tokenizer, Attention, GPT Architecture, Pretraining, Loading GPT-2, SFT, DPO)",
    whatToSkip: "Appendix D (optional bonus chapters)",
    quality: "PRIMARY",
    type: "Book / Code Repo",
    description: "Complete hands-on implementation of a decoder-only LLM from zero to fine-tuning."
  },
  "AIAYN": {
    key: "AIAYN",
    name: "Attention Is All You Need (Vaswani et al., 2017)",
    url: "https://arxiv.org/abs/1706.03762",
    whatToStudy: "Sec 3 (Scaled dot-product attention, Multi-head attention, Positional encoding, Architecture)",
    whatToSkip: "WMT translation benchmark appendix tables",
    quality: "PRIMARY",
    type: "Seminal Paper",
    description: "The foundational Transformer paper that revolutionized NLP and AI architecture."
  },
  "ROPE": {
    key: "ROPE",
    name: "RoFormer: Enhanced Transformer with Rotary Position Embedding (Su et al., 2021)",
    url: "https://arxiv.org/abs/2104.09864",
    whatToStudy: "Sec 3 (Rotary position embedding formulation, 2D rotation matrix, complex inner product)",
    whatToSkip: "Chinese NLP benchmark tables",
    quality: "HIGH QUALITY",
    type: "Research Paper",
    description: "The modern positional embedding used in LLaMA, Mistral, and DeepSeek."
  },
  "CS336": {
    key: "CS336",
    name: "Stanford CS336: Language Modeling from Scratch",
    url: "https://stanford-cs336.github.io/",
    whatToStudy: "Lectures 1-12 & inference lecture (FLOPs accounting, scaling laws, distributed training, vLLM, FlashAttention)",
    whatToSkip: "Assignments 2-5 written homework overhead",
    quality: "PRIMARY",
    type: "Stanford Course",
    description: "Advanced systems engineering for language models: memory accounting, scaling, and GPU systems."
  },
  "KIPPLY": {
    key: "KIPPLY",
    name: "Transformer Inference Arithmetic (kipp.ly)",
    url: "https://kipp.ly/transformer-inference-arithmetic/",
    whatToStudy: "All (KV cache sizing formula, KV memory bandwidth vs compute bound, prompt vs decode phase)",
    whatToSkip: "None (short & exceptionally dense)",
    quality: "PRIMARY",
    type: "Technical Guide",
    description: "Calculations for LLM inference latency, memory bandwidth, and KV cache sizing."
  },
  "CHINCHILLA": {
    key: "CHINCHILLA",
    name: "Training Compute-Optimal Large Language Models (Hoffmann et al., 2022)",
    url: "https://arxiv.org/abs/2203.15556",
    whatToStudy: "Sec 3 + figures (Chinchilla scaling law, 20 tokens per parameter ratio, compute budget curves)",
    whatToSkip: "Detailed loss surface derivation appendix",
    quality: "HIGH QUALITY",
    type: "Research Paper",
    description: "The empirical compute-optimal scaling laws for pretraining LLMs."
  },
  "FLASH": {
    key: "FLASH",
    name: "FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness (Dao et al., 2022)",
    url: "https://arxiv.org/abs/2205.14135",
    whatToStudy: "Sec 3 (Tiling algorithm, online softmax, SRAM vs HBM memory traffic analysis)",
    whatToSkip: "Benchmarking on outdated A100 kernel variants",
    quality: "PRIMARY",
    type: "Research Paper",
    description: "GPU memory IO-aware algorithm that makes attention exact, memory-efficient, and 3x faster."
  },
  "DPO": {
    key: "DPO",
    name: "Direct Preference Optimization (Rafailov et al., 2023)",
    url: "https://arxiv.org/abs/2305.18290",
    whatToStudy: "Sec 3-4 (Implicit reward modeling, Bradley-Terry derivation, closed-form policy optimization loss)",
    whatToSkip: "Theoretical regret bounds",
    quality: "PRIMARY",
    type: "Research Paper",
    description: "Replacing complex RLHF actor-critic PPO pipelines with direct binary cross-entropy loss."
  },
  "INSTRUCTGPT": {
    key: "INSTRUCTGPT",
    name: "Training language models to follow instructions with human feedback (Ouyang et al., 2022)",
    url: "https://arxiv.org/abs/2203.02155",
    whatToStudy: "Sec 3 (SFT dataset creation, reward model training, PPO objective formulation)",
    whatToSkip: "Qualitative safety survey appendices",
    quality: "HIGH QUALITY",
    type: "Research Paper",
    description: "The original RLHF alignment blueprint used for InstructGPT and ChatGPT."
  },
  "LOSTMID": {
    key: "LOSTMID",
    name: "Lost in the Middle: How Language Models Use Long Contexts (Liu et al., 2023)",
    url: "https://arxiv.org/abs/2307.03172",
    whatToStudy: "All (U-shaped performance curve, primacy and recency biases in LLMs with long context)",
    whatToSkip: "None (short paper)",
    quality: "HIGH QUALITY",
    type: "Research Paper",
    description: "Demonstrates that LLMs degrade when critical evidence is placed in the middle of prompts."
  },
  "HUYEN": {
    key: "HUYEN",
    name: "AI Engineering: Building Applications with Foundation Models (Chip Huyen, O'Reilly 2025)",
    url: "https://www.oreilly.com/library/view/ai-engineering/9781098166298/",
    whatToStudy: "Ch 1-7, 9 (Evaluation, Prompting, RAG, Fine-Tuning, Agents, Routing, Latency & Cost)",
    whatToSkip: "Ch 8, 10 (Non-technical project management sections)",
    quality: "PRIMARY",
    type: "Book",
    description: "The definitive 2025 engineering textbook on building production LLM systems."
  },
  "ANTH-PROMPT": {
    key: "ANTH-PROMPT",
    name: "Anthropic Prompt Engineering Interactive Guide",
    url: "https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview",
    whatToStudy: "Overview, XML tags, Chain of Thought, few-shot conditioning, structured outputs",
    whatToSkip: "None (core engineering practices)",
    quality: "HIGH QUALITY",
    type: "Official Docs",
    description: "Systematic prompt design patterns, evaluation suites, and system instructions."
  },
  "PYDANTIC": {
    key: "PYDANTIC",
    name: "Pydantic V2 Documentation",
    url: "https://docs.pydantic.dev/",
    whatToStudy: "Models, validation, Field constraints, model_validate_json, schema generation",
    whatToSkip: "ORM mode legacy features",
    quality: "PRIMARY",
    type: "Official Docs",
    description: "Data validation and schema guarantees for structured LLM outputs and agent state."
  },
  "TOOLUSE": {
    key: "TOOLUSE",
    name: "Anthropic Tool Use & Function Calling Guide",
    url: "https://docs.claude.com/en/docs/agents-and-tools/tool-use/overview",
    whatToStudy: "Schemas, validation, tool execution loop, handling error returns, parallel tool calling",
    whatToSkip: "None",
    quality: "PRIMARY",
    type: "Official Docs",
    description: "Robust patterns for exposing APIs and executable functions to LLMs."
  },
  "HF-LLM": {
    key: "HF-LLM",
    name: "Hugging Face LLM Course",
    url: "https://huggingface.co/learn/llm-course",
    whatToStudy: "Ch 1-3 (Working with Open Source LLMs, Tokenizers, AutoModel, Quantization with bitsandbytes)",
    whatToSkip: "Rest of generic intro",
    quality: "HIGH QUALITY",
    type: "Course",
    description: "Practical guide to the Hugging Face ecosystem, safetensors, tokenizer pipelines, and models."
  },
  "SBERT": {
    key: "SBERT",
    name: "Sentence-Transformers Documentation & MTEB",
    url: "https://www.sbert.net/",
    whatToStudy: "Usage, training overview, MultipleNegativesRankingLoss, MTEB evaluation leaderboard",
    whatToSkip: "Legacy cross-encoder training scripts",
    quality: "PRIMARY",
    type: "Official Docs",
    description: "Dense embedding generation, contrastive bi-encoder training, and similarity search."
  },
  "HNSW": {
    key: "HNSW",
    name: "Efficient and robust approximate nearest neighbor search using Hierarchical Navigable Small World graphs (Malkov & Yashunin, 2016)",
    url: "https://arxiv.org/abs/1603.09320",
    whatToStudy: "Sec 1-4 (Hierarchical graph layers, greedy routing, efSearch, M parameter, heuristic selection)",
    whatToSkip: "Empirical proof bounds on synthetic hypercube datasets",
    quality: "PRIMARY",
    type: "Research Paper",
    description: "The gold-standard graph-based vector search algorithm powering modern vector databases."
  },
  "FAISS": {
    key: "FAISS",
    name: "FAISS Wiki & Index Selection Guidelines",
    url: "https://github.com/facebookresearch/faiss/wiki",
    whatToStudy: "Guidelines to choose an index; IndexFlatIP, IndexHNSWFlat, IndexIVFPQ memory & speed trade-offs",
    whatToSkip: "Obsolete GPU direct memory scripts",
    quality: "HIGH QUALITY",
    type: "Official Wiki",
    description: "Meta's library for high-throughput dense vector similarity search and quantization."
  },
  "PGVECTOR": {
    key: "PGVECTOR",
    name: "pgvector Extension for PostgreSQL",
    url: "https://github.com/pgvector/pgvector",
    whatToStudy: "Indexing (HNSW vs IVFFlat), cosine/L2 distance operators, metadata filtering, hybrid search with tsvector",
    whatToSkip: "None",
    quality: "PRIMARY",
    type: "Documentation",
    description: "Relational database vector search with ACID compliance, relational joins, and metadata filters."
  },
  "LIN": {
    key: "LIN",
    name: "Pretrained Transformers for Text Ranking (Lin, Nogueira, Yates)",
    url: "https://arxiv.org/abs/2010.06467",
    whatToStudy: "Ch 1-3 (Bi-encoders vs Cross-encoders, Re-ranking architectures, monoBERT, monoT5)",
    whatToSkip: "Ch 4+ (Legacy BM25 inverted index hardware details)",
    quality: "HIGH QUALITY",
    type: "Book / Survey",
    description: "Comprehensive survey on neural text ranking and cross-encoder re-ranking."
  },
  "BM25": {
    key: "BM25",
    name: "The Probabilistic Relevance Framework: BM25 and Beyond (Robertson & Zaragoza)",
    url: "https://www.staff.city.ac.uk/~sbrp622/papers/foundations_bm25_review.pdf",
    whatToStudy: "Sec 1-3 (BM25 formula derivation, term frequency saturation k1, document length normalization b)",
    whatToSkip: "Extended feedback models",
    quality: "PRIMARY",
    type: "Foundational Monograph",
    description: "The exact mathematical formulation of BM25 lexical ranking."
  },
  "CONTEXTUAL": {
    key: "CONTEXTUAL",
    name: "Anthropic - Contextual Retrieval Architecture",
    url: "https://www.anthropic.com/news/contextual-retrieval",
    whatToStudy: "All (Contextual chunking via prompt augmentation, Contextual BM25 + Embeddings, Reranking gains)",
    whatToSkip: "None (concise state-of-the-art technique)",
    quality: "PRIMARY",
    type: "Engineering Article",
    description: "Technique providing document context to each chunk to reduce retrieval failures by 49%."
  },
  "RAGAS": {
    key: "RAGAS",
    name: "RAGAS: Evaluation Framework for RAG Pipelines",
    url: "https://docs.ragas.io/",
    whatToStudy: "Metrics: Faithfulness, Answer Relevance, Context Precision, Context Recall; synthetic test set generation",
    whatToSkip: "Legacy langchain wrapper integrations",
    quality: "PRIMARY",
    type: "Documentation",
    description: "Standard evaluation framework for automated RAG quality metrics."
  },
  "HYDE": {
    key: "HYDE",
    name: "Precise Zero-Shot Dense Retrieval without Relevance Labels (Gao et al., 2022 - HyDE)",
    url: "https://arxiv.org/abs/2212.10496",
    whatToStudy: "Sec 2-3 (Hypothetical document generation, embedding hallucinated docs for retrieval)",
    whatToSkip: "Domain benchmark tables on obsolete datasets",
    quality: "HIGH QUALITY",
    type: "Research Paper",
    description: "Hypothetical Document Embeddings for overcoming vocabulary mismatch in retrieval."
  },
  "LORA": {
    key: "LORA",
    name: "LoRA: Low-Rank Adaptation of Large Language Models (Hu et al., 2021)",
    url: "https://arxiv.org/abs/2106.09685",
    whatToStudy: "Sec 4 (Low-rank matrix decomposition W + BA, rank r, scaling factor alpha, parameter reduction)",
    whatToSkip: "GPT-3 175B proprietary compute tables",
    quality: "PRIMARY",
    type: "Seminal Paper",
    description: "Parameter-Efficient Fine-Tuning (PEFT) using low-rank adapter matrices."
  },
  "QLORA": {
    key: "QLORA",
    name: "QLoRA: Efficient Finetuning of Quantized LLMs (Dettmers et al., 2023)",
    url: "https://arxiv.org/abs/2305.14314",
    whatToStudy: "Sec 3 (NF4 NormalFloat data type, Double Quantization, Paged Optimizers)",
    whatToSkip: "Crowdsourced chatbot human evaluation tables",
    quality: "PRIMARY",
    type: "Seminal Paper",
    description: "Fine-tuning 33B+ models on a single consumer GPU via 4-bit NormalFloat and paged memory."
  },
  "UNSLOTH": {
    key: "UNSLOTH",
    name: "Unsloth AI Fast Fine-Tuning Guide",
    url: "https://docs.unsloth.ai/",
    whatToStudy: "Fast manual backprop kernels, VRAM reduction techniques, LLaMA-3 / Mistral training recipes",
    whatToSkip: "None",
    quality: "HIGH QUALITY",
    type: "Documentation",
    description: "5x faster fine-tuning engine using hand-written OpenAI Triton CUDA kernels."
  },
  "PEFT": {
    key: "PEFT",
    name: "Hugging Face PEFT Documentation",
    url: "https://huggingface.co/docs/peft",
    whatToStudy: "LoRA, AdaLoRA, DoRA, Prefix Tuning, target_modules selection, merging weights back to base model",
    whatToSkip: "Exotic methods (IA3, Prompt Tuning for old T5)",
    quality: "PRIMARY",
    type: "Official Docs",
    description: "Official implementation library for parameter-efficient adapters."
  },
  "TRL": {
    key: "TRL",
    name: "Hugging Face TRL (Transformer Reinforcement Learning) Docs",
    url: "https://huggingface.co/docs/trl",
    whatToStudy: "SFTTrainer (dataset packing, formatting_func, loss masking), DPOTrainer (reference model, beta param)",
    whatToSkip: "PPO Trainer legacy code",
    quality: "PRIMARY",
    type: "Official Docs",
    description: "Full post-training stack: Supervised Fine-Tuning, DPO, and preference alignment."
  },
  "WHISPER": {
    key: "WHISPER",
    name: "Robust Speech Recognition via Large-Scale Weak Supervision (Radford et al., 2022)",
    url: "https://arxiv.org/abs/2212.04356",
    whatToStudy: "Sec 2-3 (Encoder-decoder Transformer audio architecture, log-mel spectrogram features, multitask token prompt)",
    whatToSkip: "Long appendix tables on rare language benchmarks",
    quality: "PRIMARY",
    type: "Seminal Paper",
    description: "OpenAI's foundational speech recognition model architecture and token structure."
  },
  "HF-WHISPER": {
    key: "HF-WHISPER",
    name: "Hugging Face Blog: Fine-Tuning Whisper for Any Language",
    url: "https://huggingface.co/blog/fine-tune-whisper",
    whatToStudy: "All (Seq2SeqTrainer, LoRA adapters for Whisper, Audio feature extractor, WER evaluation)",
    whatToSkip: "None",
    quality: "HIGH QUALITY",
    type: "Tutorial Guide",
    description: "Practical guide to fine-tuning Whisper on domain-specific or code-mixed audio datasets."
  },
  "HF-AUDIO": {
    key: "HF-AUDIO",
    name: "Hugging Face Audio Course",
    url: "https://huggingface.co/learn/audio-course",
    whatToStudy: "Units 1-5, 7 (Audio data processing, STFT, Audio Transformers, Speech Recognition, Synthesis)",
    whatToSkip: "Unit 6 (Music generation - optional)",
    quality: "HIGH QUALITY",
    type: "Course",
    description: "End-to-end audio processing, feature extraction, CTC, and speech models."
  },
  "FWHISPER": {
    key: "FWHISPER",
    name: "faster-whisper (CTranslate2 Reimplementation)",
    url: "https://github.com/SYSTRAN/faster-whisper",
    whatToStudy: "All (CTranslate2 inference engine, INT8 quantization, VAD filter integration, streaming)",
    whatToSkip: "None",
    quality: "PRIMARY",
    type: "Code Repo",
    description: "4x faster Whisper execution with 50% less memory on CPU and GPU."
  },
  "ANTH-AGENTS": {
    key: "ANTH-AGENTS",
    name: "Anthropic: Building Effective Agents",
    url: "https://www.anthropic.com/research/building-effective-agents",
    whatToStudy: "All (Workflows vs autonomous agents, Prompt chaining, Routing, Parallelization, Orchestrator-workers, Evaluator-optimizer)",
    whatToSkip: "None (vital architectural blueprint for agent systems)",
    quality: "PRIMARY",
    type: "Engineering Paper",
    description: "Definitive framework categorizing deterministic workflows versus dynamic agent loops."
  },
  "REACT": {
    key: "REACT",
    name: "ReAct: Synergizing Reasoning and Acting in Language Models (Yao et al., 2022)",
    url: "https://arxiv.org/abs/2210.03629",
    whatToStudy: "Sec 2-3 (Thought-Action-Observation loop, interleaved reasoning, hallucination reduction)",
    whatToSkip: "ALFWorld game benchmarks",
    quality: "PRIMARY",
    type: "Seminal Paper",
    description: "The foundational pattern for LLM reasoning traces and external tool interaction."
  },
  "REFLEXION": {
    key: "REFLEXION",
    name: "Reflexion: Language Agents with Verbal Reinforcement Learning (Shinn et al., 2023)",
    url: "https://arxiv.org/abs/2303.11366",
    whatToStudy: "Sec 3 (Self-reflection memory buffer, actor-evaluator feedback loop, episodic memory)",
    whatToSkip: "Extended game simulation results",
    quality: "HIGH QUALITY",
    type: "Research Paper",
    description: "Dynamic memory and self-reflection loops for autonomous agent error correction."
  },
  "MEMGPT": {
    key: "MEMGPT",
    name: "MemGPT: Towards LLMs as Operating Systems (Packer et al., 2023)",
    url: "https://arxiv.org/abs/2310.08560",
    whatToStudy: "Sec 2 (Hierarchical memory tiers: main context, working memory, archival storage, memory paging)",
    whatToSkip: "Discord bot wrapper scripts",
    quality: "HIGH QUALITY",
    type: "Research Paper",
    description: "OS-inspired memory management with working memory and archival retrieval for perpetual agents."
  },
  "LANGGRAPH": {
    key: "LANGGRAPH",
    name: "LangGraph Documentation & State Machine Patterns",
    url: "https://langchain-ai.github.io/langgraph/",
    whatToStudy: "StateGraph, TypedDict / Pydantic state, cyclical edges, checkpointers, human-in-the-loop breakpoints",
    whatToSkip: "High-level studio UI hosting services",
    quality: "PRIMARY",
    type: "Documentation",
    description: "Stateful, multi-actor application development with cycles and checkpoint persistence."
  },
  "MCP": {
    key: "MCP",
    name: "Model Context Protocol (MCP) Specification",
    url: "https://modelcontextprotocol.io/",
    whatToStudy: "Protocol spec, JSON-RPC 2.0 transport, Resources, Tools, Prompts, Server/Client architecture",
    whatToSkip: "None",
    quality: "PRIMARY",
    type: "Official Spec",
    description: "Open standard for connecting AI models to external data sources, tools, and local development environments."
  },
  "OWASP": {
    key: "OWASP",
    name: "OWASP Top 10 for Large Language Model Applications",
    url: "https://genai.owasp.org/llm-top-10/",
    whatToStudy: "All 10 vulnerabilities: Prompt Injection (LLM01), Sensitive Information Disclosure, Insecure Output Handling, Denial of Service",
    whatToSkip: "None",
    quality: "PRIMARY",
    type: "Security Standard",
    description: "Critical security vulnerabilities, attack vectors, and mitigation playbooks for LLM applications."
  },
  "GRESHAKE": {
    key: "GRESHAKE",
    name: "Not what you've signed up for: Compromising Real-World LLM Applications with Indirect Prompt Injection",
    url: "https://arxiv.org/abs/2302.12173",
    whatToStudy: "Sec 2-4 (Indirect prompt injection mechanics, tool exfiltration, untrusted retrieval poisoning)",
    whatToSkip: "Extended vendor responsible disclosure transcripts",
    quality: "HIGH QUALITY",
    type: "Research Paper",
    description: "The seminal security paper demonstrating remote control of LLM agents via data retrieved from web/documents."
  },
  "GARAK": {
    key: "GARAK",
    name: "Garak: LLM Vulnerability Scanner (NVIDIA)",
    url: "https://github.com/NVIDIA/garak",
    whatToStudy: "README + probe types (injection, jailbreak, leakage, hallucination), generating security vulnerability reports",
    whatToSkip: "None",
    quality: "HIGH QUALITY",
    type: "Security Tool",
    description: "Automated vulnerability scanner to probe and red-team language models and agent systems."
  },
  "CTC": {
    key: "CTC",
    name: "Sequence Modeling with CTC (Connectionist Temporal Classification) - Distill.pub",
    url: "https://distill.pub/2017/ctc/",
    whatToStudy: "All (Alignment-free sequence loss, blank token intuition, forward-backward algorithm, beam search decoding)",
    whatToSkip: "None (masterpiece interactive explanation)",
    quality: "PRIMARY",
    type: "Interactive Article",
    description: "Visual and mathematical explanation of Connectionist Temporal Classification for speech."
  },
  "WAV2VEC": {
    key: "WAV2VEC",
    name: "wav2vec 2.0: A Framework for Self-Supervised Learning of Speech Representations (Baevski et al., 2020)",
    url: "https://arxiv.org/abs/2006.11477",
    whatToStudy: "Sec 2-3 (Masked latent speech representations, vector quantization codebook, contrastive loss)",
    whatToSkip: "TIMIT phone recognition ablation appendices",
    quality: "HIGH QUALITY",
    type: "Research Paper",
    description: "Self-supervised pre-training from raw audio waveforms."
  },
  "SILERO": {
    key: "SILERO",
    name: "Silero VAD (Voice Activity Detector)",
    url: "https://github.com/snakers4/silero-vad",
    whatToStudy: "README, streaming chunking, speech probability thresholds, timestamp extraction",
    whatToSkip: "Legacy ONNX C++ build steps",
    quality: "HIGH QUALITY",
    type: "Code Repo",
    description: "Ultra-lightweight enterprise-grade voice activity detector for real-time speech pipelines."
  },
  "VITS": {
    key: "VITS",
    name: "Conditional Variational Autoencoder with Adversarial Learning for End-to-End Text-to-Speech (Kim et al., 2021)",
    url: "https://arxiv.org/abs/2106.06103",
    whatToStudy: "Sec 2-3 (End-to-end TTS architecture, monotonic alignment search, normalizing flows)",
    whatToSkip: "Subjective MOS survey demographics",
    quality: "HIGH QUALITY",
    type: "Research Paper",
    description: "End-to-end voice synthesis architecture with expressive prosody."
  },
  "CLIP": {
    key: "CLIP",
    name: "Learning Transferable Visual Models From Natural Language Supervision (Radford et al., 2021 - CLIP)",
    url: "https://arxiv.org/abs/2103.00020",
    whatToStudy: "Sec 2-3 (Joint image-text contrastive embedding space, symmetric cross-entropy loss, zero-shot classification)",
    whatToSkip: "100+ fine-grained task benchmark tables",
    quality: "PRIMARY",
    type: "Seminal Paper",
    description: "OpenAI's foundational multimodal contrastive learning model."
  },
  "LLAVA": {
    key: "LLAVA",
    name: "Visual Instruction Tuning (Liu et al., 2023 - LLaVA)",
    url: "https://arxiv.org/abs/2304.08485",
    whatToStudy: "Sec 3 (Vision encoder + Linear projection layer + Autoregressive LLM backbone, two-stage training)",
    whatToSkip: "Detailed conversation dataset prompt dumps",
    quality: "PRIMARY",
    type: "Research Paper",
    description: "Architecture connecting visual encoders (CLIP) to LLMs for multimodal reasoning."
  },
  "LITERT": {
    key: "LITERT",
    name: "Google LiteRT (formerly TFLite) Quantization & Edge Deployment Guide",
    url: "https://ai.google.dev/edge/litert/models/model_optimization",
    whatToStudy: "Post-training quantization (PTQ INT8), Quantization-Aware Training (QAT), XNNPACK delegate for ARM",
    whatToSkip: "TFLite Micro for microcontrollers",
    quality: "HIGH QUALITY",
    type: "Official Docs",
    description: "Google's edge runtime for deploying neural networks onto Raspberry Pi, mobile, and embedded devices."
  },
  "MWML": {
    key: "MWML",
    name: "Made With ML (Goku Mohandas)",
    url: "https://madewithml.com/",
    whatToStudy: "All MLOps lessons: ML pipelines, Model registry, Serving, Testing, CI/CD, Monitoring",
    whatToSkip: "Ray distributed cluster orchestration (unless scaling beyond 1 node)",
    quality: "PRIMARY",
    type: "Interactive Course",
    description: "Complete practical production MLOps course covering testing, packaging, tracking, and serving."
  },
  "MLFLOW": {
    key: "MLFLOW",
    name: "MLflow Documentation",
    url: "https://mlflow.org/docs/latest/",
    whatToStudy: "Tracking (runs, params, metrics, artifacts), Model Registry (versions, stages, aliases), PyFunc models",
    whatToSkip: "MLflow Recipes custom templates",
    quality: "PRIMARY",
    type: "Official Docs",
    description: "Open source platform for the machine learning lifecycle: experiment tracking and model registry."
  },
  "DVC": {
    key: "DVC",
    name: "DVC (Data Version Control) Documentation",
    url: "https://dvc.org/doc",
    whatToStudy: "Get started, data versioning with remote storage (S3/Azure Blob), dvc.yaml pipelines, metrics diff",
    whatToSkip: "DVC Studio web UI integrations",
    quality: "PRIMARY",
    type: "Official Docs",
    description: "Git for data and pipelines: reproducible data science and dataset versioning."
  },
  "EVIDENTLY": {
    key: "EVIDENTLY",
    name: "Evidently AI Documentation & Drift Detection",
    url: "https://docs.evidentlyai.com/",
    whatToStudy: "Data drift (Kolmogorov-Smirnov, Population Stability Index / PSI), Target drift, Data quality reports, scheduled jobs",
    whatToSkip: "Cloud hosted enterprise dashboard setup",
    quality: "PRIMARY",
    type: "Official Docs",
    description: "Open source tool for evaluating, testing, and monitoring machine learning models in production."
  },
  "DMLS": {
    key: "DMLS",
    name: "Designing Machine Learning Systems (Chip Huyen, O'Reilly 2022)",
    url: "https://www.oreilly.com/library/view/designing-machine-learning/9781098107956/",
    whatToStudy: "Ch 5-9 (Data Engineering, Model Development & Offline Evaluation, Model Deployment, Continual Learning & Test in Production)",
    whatToSkip: "Rest of high-level overview",
    quality: "PRIMARY",
    type: "Book",
    description: "Holistic systems engineering for production machine learning: data pipelines, deployment patterns, monitoring."
  },
  "MLTEST": {
    key: "MLTEST",
    name: "The ML Test Score: A Rubric for ML Production Readiness and Technical Debt Reduction (Google)",
    url: "https://research.google/pubs/the-ml-test-score-a-rubric-for-ml-production-readiness-and-technical-debt-reduction/",
    whatToStudy: "All 28 tests across 4 categories: Data Tests, Model Tests, ML Infrastructure Tests, Monitoring Tests",
    whatToSkip: "None (vital production scoring checklist)",
    quality: "PRIMARY",
    type: "Google Research Paper",
    description: "Industry-standard rubric for assessing production readiness of machine learning pipelines."
  },
  "FASTAPI": {
    key: "FASTAPI",
    name: "FastAPI Documentation",
    url: "https://fastapi.tiangolo.com/",
    whatToStudy: "Tutorial, async endpoints, Pydantic request/response models, background tasks, error handlers, streaming responses",
    whatToSkip: "Advanced security OAuth2 password grant if using simple API tokens",
    quality: "PRIMARY",
    type: "Official Docs",
    description: "High-performance Python web framework for building production ML inference APIs."
  },
  "DOCKER": {
    key: "DOCKER",
    name: "Docker Best Practices for Python & ML",
    url: "https://docs.docker.com/build/building/best-practices/",
    whatToStudy: "Multi-stage builds, non-root users, .dockerignore, layer cache optimization, slim Python base images",
    whatToSkip: "Docker Swarm legacy docs",
    quality: "PRIMARY",
    type: "Official Docs",
    description: "Containerization best practices for packaging Python, PyTorch, and ML inference services."
  },
  "GHA": {
    key: "GHA",
    name: "GitHub Actions Documentation",
    url: "https://docs.github.com/actions",
    whatToStudy: "Workflows, jobs, steps, matrices, caching uv/pip dependencies, automated pytest & lint gates",
    whatToSkip: "Self-hosted runner enterprise cluster configuration",
    quality: "HIGH QUALITY",
    type: "Official Docs",
    description: "Automated CI/CD pipelines for testing, linting, and continuous deployment."
  },
  "LOCUST": {
    key: "LOCUST",
    name: "Locust Load Testing Documentation",
    url: "https://docs.locust.io/",
    whatToStudy: "Writing test scripts in Python, simulated users, measuring p50/p95/p99 latency under concurrent load",
    whatToSkip: "Distributed Locust master-worker clusters",
    quality: "HIGH QUALITY",
    type: "Official Docs",
    description: "Developer-friendly load testing tool for benchmarking API latency and throughput under pressure."
  },
  "OTEL": {
    key: "OTEL",
    name: "OpenTelemetry Python Documentation",
    url: "https://opentelemetry.io/docs/languages/python/",
    whatToStudy: "Getting started, automatic & manual instrumentation, spans, traces, exporting to Jaeger/Prometheus",
    whatToSkip: "Custom exporter C++ SDK extensions",
    quality: "HIGH QUALITY",
    type: "Official Docs",
    description: "Vendor-neutral telemetry standard for tracing latency bottlenecks across microservices and RAG pipelines."
  },
  "AZ": {
    key: "AZ",
    name: "Microsoft Learn - Azure Fundamentals (AZ-900 Path)",
    url: "https://learn.microsoft.com/training/paths/microsoft-azure-fundamentals-describe-cloud-concepts/",
    whatToStudy: "Cloud concepts, Resource Groups, Azure Container Apps, Key Vault, IAM / RBAC, Cost Management alerts",
    whatToSkip: "Exam-specific memorization questions",
    quality: "HIGH QUALITY",
    type: "Official Course",
    description: "Foundations of cloud computing, security, secrets management, and cost optimization on Azure."
  },
  "AZ-ACA": {
    key: "AZ-ACA",
    name: "Azure Container Apps Quickstart",
    url: "https://learn.microsoft.com/azure/container-apps/quickstart-portal",
    whatToStudy: "Deploying containerized FastAPI services, serverless scaling, HTTP ingress, environment secrets",
    whatToSkip: "Dapr microservice sidecars unless building event-driven systems",
    quality: "PRIMARY",
    type: "Official Docs",
    description: "Serverless container platform on Azure ideal for hosting ML APIs and RAG backends."
  },
  "AZ-PG": {
    key: "AZ-PG",
    name: "Azure Database for PostgreSQL - pgvector Guide",
    url: "https://learn.microsoft.com/azure/postgresql/flexible-server/how-to-use-pgvector",
    whatToStudy: "Enabling pgvector extension, creating HNSW indexes, querying embeddings in managed cloud PostgreSQL",
    whatToSkip: "Multi-region active-active replication",
    quality: "PRIMARY",
    type: "Official Docs",
    description: "Managed PostgreSQL with native vector similarity search on Azure."
  },
  "AZ-ML": {
    key: "AZ-ML",
    name: "Azure Machine Learning Quickstart",
    url: "https://learn.microsoft.com/azure/machine-learning/",
    whatToStudy: "Submitting training jobs, registering models, managed online endpoints, compute instances",
    whatToSkip: "Designer drag-and-drop legacy UI",
    quality: "HIGH QUALITY",
    type: "Official Docs",
    description: "Enterprise ML platform on Azure for model training, tracking, and cloud deployment."
  },
  "DDIA": {
    key: "DDIA",
    name: "Designing Data-Intensive Applications (Martin Kleppmann)",
    url: "https://dataintensive.net/",
    whatToStudy: "Ch 1, 8, 11 (Reliability, Scalability, Unreliable Networks & Faults, Stream Processing)",
    whatToSkip: "Ch 2-7 (Deep database storage internals if short on time)",
    quality: "PRIMARY",
    type: "Book",
    description: "The software engineering bible for distributed systems, reliability, partitions, and streaming."
  },
  "REDIS": {
    key: "REDIS",
    name: "Redis Streams Documentation",
    url: "https://redis.io/docs/latest/develop/data-types/streams/",
    whatToStudy: "XADD, XREAD, Consumer Groups, ack mechanisms, semantic caching with Redis",
    whatToSkip: "Redis Cluster multi-shard master election protocols",
    quality: "PRIMARY",
    type: "Official Docs",
    description: "In-memory data structures, message streaming, pub/sub, and lightning-fast semantic caching."
  },
  "PMPP": {
    key: "PMPP",
    name: "Programming Massively Parallel Processors (Hwu, Kirk, El Hajj)",
    url: "https://www.elsevier.com/books/programming-massively-parallel-processors/hwu/978-0-323-91231-0",
    whatToStudy: "Ch 1-4 (GPU architecture, SMs, Warps, Threads, Memory Hierarchy, Global/Shared Memory, Roofline model)",
    whatToSkip: "Ch 6+ (Specialized parallel pattern optimizations)",
    quality: "PRIMARY",
    type: "Book",
    description: "The definitive guide to GPU architecture, SIMT execution, and CUDA programming."
  },
  "CUDA": {
    key: "CUDA",
    name: "NVIDIA CUDA C Programming Guide",
    url: "https://docs.nvidia.com/cuda/cuda-c-programming-guide/",
    whatToStudy: "Ch 1-3 (Programming model, Kernel launches `<<<grid, block>>>`, Memory management, Tiled Matrix Multiplication)",
    whatToSkip: "Rest of advanced compiler intrinsics",
    quality: "PRIMARY",
    type: "Official Docs",
    description: "Official guide to writing, compiling, and optimizing CUDA kernels on NVIDIA hardware."
  },
  "PT-PROF": {
    key: "PT-PROF",
    name: "PyTorch Profiler Tutorial & Performance Guide",
    url: "https://docs.pytorch.org/tutorials/recipes/recipes/profiler_recipe.html",
    whatToStudy: "All (torch.profiler.profile, CPU vs CUDA time, Chrome trace viewer, kernel fusion)",
    whatToSkip: "None",
    quality: "PRIMARY",
    type: "Official Recipe",
    description: "Diagnosing GPU kernel bottlenecks, data loading stalls, and memory allocations."
  },
  "AWQ": {
    key: "AWQ",
    name: "AWQ: Activation-aware Weight Quantization for LLM Compression and Acceleration (Lin et al., 2023)",
    url: "https://arxiv.org/abs/2306.00978",
    whatToStudy: "Sec 3 (Protecting salient weight channels based on activation magnitudes, 4-bit weight-only quantization)",
    whatToSkip: "Extended latency tables on legacy GPUs",
    quality: "PRIMARY",
    type: "Research Paper",
    description: "State-of-the-art 4-bit LLM quantization preserving salient weights for zero accuracy loss."
  },
  "GPTQ": {
    key: "GPTQ",
    name: "GPTQ: Accurate Post-Training Quantization for Generative Pre-trained Transformers (Frantar et al., 2022)",
    url: "https://arxiv.org/abs/2210.17323",
    whatToStudy: "Sec 3 (Second-order error compensation via inverse Hessian, row-by-row quantization)",
    whatToSkip: "Mathematical proof of optimal brain surgeon equivalence",
    quality: "HIGH QUALITY",
    type: "Research Paper",
    description: "Fast post-training quantization algorithm based on second-order error minimization."
  },
  "KD": {
    key: "KD",
    name: "Distilling the Knowledge in a Neural Network (Hinton, Vinyals, Dean 2015)",
    url: "https://arxiv.org/abs/1503.02531",
    whatToStudy: "Sec 2 (Soft targets, temperature softmax T, distillation loss combining cross-entropy and KL divergence)",
    whatToSkip: "Acoustic model legacy speech experiments",
    quality: "PRIMARY",
    type: "Seminal Paper",
    description: "The seminal knowledge distillation paper transferring representations from large models to small ones."
  },
  "VLLM": {
    key: "VLLM",
    name: "vLLM Documentation & PagedAttention Paper (Kwon et al., 2023)",
    url: "https://docs.vllm.ai/",
    whatToStudy: "PagedAttention paper sec 3-4, continuous batching, prefix caching, serving CLI, OpenAI-compatible API server",
    whatToSkip: "None",
    quality: "PRIMARY",
    type: "Paper & Docs",
    description: "High-throughput, low-latency LLM serving engine using OS virtual memory concepts for KV cache."
  },
  "SPEC": {
    key: "SPEC",
    name: "Fast Inference from Transformers via Speculative Decoding (Leviathan et al., 2022)",
    url: "https://arxiv.org/abs/2211.17192",
    whatToStudy: "Sec 2-3 (Draft model generation, target model parallel verification, acceptance rate math)",
    whatToSkip: "None (dense and high practical value)",
    quality: "PRIMARY",
    type: "Research Paper",
    description: "Accelerating autoregressive decoding 2-3x without changing output distribution."
  },
  "KESHAV": {
    key: "KESHAV",
    name: "How to Read a Paper (S. Keshav, Stanford)",
    url: "https://web.stanford.edu/class/ee384m/Handouts/HowtoReadPaper.pdf",
    whatToStudy: "All (The three-pass approach for reading, evaluating, and synthesizing research papers)",
    whatToSkip: "None (short 2-page classic guide)",
    quality: "HIGH QUALITY",
    type: "Guide",
    description: "Methodology for digesting research papers efficiently in 3 structured passes."
  },
  "PWC": {
    key: "PWC",
    name: "Papers With Code",
    url: "https://paperswithcode.com/",
    whatToStudy: "SOTA leaderboards, official reference PyTorch implementations, ablation logs",
    whatToSkip: "Unreproducible or unverified preprint submissions",
    quality: "HIGH QUALITY",
    type: "Platform",
    description: "Community platform tracking state-of-the-art benchmarks and reference code implementations."
  },
  "OWN": {
    key: "OWN",
    name: "Independent Implementation & Synthesis",
    url: "https://github.com/",
    whatToStudy: "From-scratch code synthesis, self-testing, system defense, benchmarking, and architectural design",
    whatToSkip: "None",
    quality: "PRIMARY",
    type: "Lab / Self Practice",
    description: "Hands-on engineering, derivations, unit tests, and blank-file implementations."
  },
  "PYDOCS": {
    key: "PYDOCS",
    name: "Python Official Documentation & Pytest",
    url: "https://docs.python.org/3/library/asyncio.html",
    whatToStudy: "asyncio basics, event loops, tasks, typing module, pytest fixtures and parametrization",
    whatToSkip: "Python C-API internals",
    quality: "PRIMARY",
    type: "Official Docs",
    description: "Python async fundamentals, typing system, and automated testing."
  },
  "PROGIT": {
    key: "PROGIT",
    name: "Pro Git Book (Scott Chacon & Ben Straub)",
    url: "https://git-scm.com/book/en/v2",
    whatToStudy: "Ch 2-3, 7 (Git basics, Branching, Rebase, Interactive Rebase, Bisect for debugging)",
    whatToSkip: "Git internals / plumbing commands",
    quality: "HIGH QUALITY",
    type: "Book",
    description: "Professional version control, branching strategies, and git debugging drills."
  },
  "JIWER": {
    key: "JIWER",
    name: "jiwer: Word Error Rate & Character Error Rate in Python",
    url: "https://github.com/jitsi/jiwer",
    whatToStudy: "README (WER, CER, MER calculations, text transformations, normalization pipelines)",
    whatToSkip: "None",
    quality: "PRIMARY",
    type: "Library Docs",
    description: "Standard evaluation metrics for automatic speech recognition."
  },
  "MOMTEST": {
    key: "MOMTEST",
    name: "The Mom Test (Rob Fitzpatrick)",
    url: "https://www.momtestbook.com/",
    whatToStudy: "User interview techniques, validating problem space, extracting real customer pain points",
    whatToSkip: "None",
    quality: "SECONDARY",
    type: "Book",
    description: "Framework for talking to users and designing AI products that solve genuine problems."
  },
  "SPLADE": {
    key: "SPLADE",
    name: "ColBERT: Efficient and Effective Passage Search via Contextualized Late Interaction (Khattab & Zaharia)",
    url: "https://arxiv.org/abs/2004.12832",
    whatToStudy: "Sec 3 (Late interaction operator MaxSim, per-token representations, token-level retrieval index)",
    whatToSkip: "Old MS MARCO hardware benchmark scripts",
    quality: "HIGH QUALITY",
    type: "Research Paper",
    description: "Late interaction search architecture combining high semantic precision with fast vector indexing."
  },
  "COLPALI": {
    key: "COLPALI",
    name: "ColPali: Efficient Document Retrieval with Vision Language Models (Faysse et al., 2024)",
    url: "https://arxiv.org/abs/2407.01449",
    whatToStudy: "Sec 3 skim (Using PaliGemma to embed PDF pages directly without OCR or fragile chunkers)",
    whatToSkip: "Complex benchmark ablation tables",
    quality: "HIGH QUALITY",
    type: "Research Paper",
    description: "Modern multimodal document retrieval eliminating PDF parsing errors via direct page embedding."
  },
  "CONFORMER": {
    key: "CONFORMER",
    name: "Conformer: Convolution-augmented Transformer for Speech Recognition (Gulati et al., 2020)",
    url: "https://arxiv.org/abs/2005.08100",
    whatToStudy: "Sec 2 (Macaron-style feed-forward modules, multi-head self-attention, depthwise convolution module)",
    whatToSkip: "Extended LibriSpeech ablation figures",
    quality: "HIGH QUALITY",
    type: "Research Paper",
    description: "Combines local CNN features with global Transformer self-attention for speech modeling."
  },
  "LMEVAL": {
    key: "LMEVAL",
    name: "LM Evaluation Harness (EleutherAI)",
    url: "https://github.com/EleutherAI/lm-evaluation-harness",
    whatToStudy: "README, running standardized benchmarks (MMLU, GSM8K, ARC, HellaSwag), contamination detection",
    whatToSkip: "None",
    quality: "PRIMARY",
    type: "Tool Repo",
    description: "Standardized framework for evaluating autoregressive language models on public benchmarks."
  },
  "OUTLINES": {
    key: "OUTLINES",
    name: "Outlines: Structured Text Generation & Grammar-Guided Sampling",
    url: "https://github.com/dottxt-ai/outlines",
    whatToStudy: "README (Regex-guided generation, JSON schema validation at decode time, logit masking, Pydantic integration)",
    whatToSkip: "None",
    quality: "PRIMARY",
    type: "Tool Repo",
    description: "Guarantees 100% syntactically valid JSON and regex outputs through vocabulary masking at decoding time."
  }
};

if (typeof window !== 'undefined') {
  window.SOURCES_DATASET = SOURCES_DATASET;
}
