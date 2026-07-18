export const profile = {
  name: "Yash Kothari",
  role: "Data Scientist & GenAI Engineer",
  email: "ai.work.kothari@gmail.com",
  phone: "+91 91737 77900",
  phoneHref: "+919173777900",
  location: "Ahmedabad, India",
  linkedin: "https://www.linkedin.com/in/kothari-yash",
  github: "https://github.com/kothariyashh",
  typewriterRoles: [
    "Multi-Agent AI Systems.",
    "RAG Pipelines & LLM Apps.",
    "Streaming AI Experiences.",
    "ETL & Data Pipelines.",
    "AI Workflow Automation.",
    "Computer Vision Platforms.",
    "Document Intelligence AI.",
  ],
};

export const stats = [
  { value: 4, suffix: "+", label: "Years of Experience" },
  { value: 15, suffix: "+", label: "AI Projects Delivered" },
  { value: 80, suffix: "+", label: "Data Fields Auto-Extracted" },
  { value: 96, suffix: "%", label: "Best Model Accuracy" },
];

export const experience = [
  {
    period: "Jan 2024 - Present",
    role: "Data Scientist",
    company: "Bacancy Technology",
    location: "Ahmedabad, India",
    description:
      "Building production-grade Generative AI systems including LLM-powered chatbots, RAG pipelines and supervisor-routed multi-agent architectures. Delivering end-to-end AI platforms with LangChain/LangGraph, vector databases, semantic search and multi-modal AI, from data processing through deployment with full observability.",
    tags: ["LangGraph", "RAG", "Vertex AI", "FastAPI", "OpenSearch"],
  },
  {
    period: "Jan 2023 - Jan 2024",
    role: "AI Implementation Strategist",
    company: "VanceIQ",
    location: "Ahmedabad, India",
    description:
      "Designed, implemented and deployed AI-driven solutions for real-world business challenges by integrating LLMs, RAG, Computer Vision and Machine Learning into scalable applications, while defining AI strategy and optimizing team workflows end to end.",
    tags: ["LLMs", "Computer Vision", "AI Strategy", "ML"],
  },
  {
    period: "May 2023 - Jul 2023",
    role: "Artificial Intelligence Intern",
    company: "Version System Pvt. Ltd.",
    location: "Rajkot, India",
    description:
      "Designed and optimized an LBPH-based face recognition system in Python achieving 96% accuracy across 80+ individuals by refining histogram distance calculations. Built and battle-tested a Flask API for seamless UI integration.",
    tags: ["Face Recognition", "Flask", "OpenCV", "Postman"],
  },
  {
    period: "Feb 2022 - Aug 2022",
    role: "Data Analyst Intern",
    company: "Technolabs Software Inc.",
    location: "Remote",
    description:
      "Performed data cleaning, feature engineering, normalization and exploratory data analysis on large datasets. Built and deployed Decision Tree and Random Forest models as a Django web application.",
    tags: ["EDA", "Random Forest", "Django", "Pandas"],
  },
];

export const skillBars = [
  { label: "Python & Backend (FastAPI · Flask)", level: 95 },
  { label: "Generative AI · LLMs · RAG", level: 92 },
  { label: "LangChain · LangGraph · Multi-Agent Systems", level: 90 },
  { label: "NLP · spaCy · Semantic Search & Embeddings", level: 88 },
  { label: "Computer Vision · OCR (OpenCV · YOLOv8 · PaddleOCR)", level: 85 },
  { label: "Deep Learning (TensorFlow · PyTorch)", level: 82 },
  { label: "Cloud & DevOps (GCP · AWS · Docker · CI/CD)", level: 80 },
  { label: "Data Pipelines · ETL · Airflow · Kafka", level: 78 },
];

export const skillGroups = [
  { icon: "🐍", title: "Languages", items: ["Python", "SQL", "JavaScript"] },
  {
    icon: "🤖",
    title: "GenAI & LLMs",
    items: ["OpenAI", "Gemini", "LangChain", "LangGraph", "RAG", "Prompt Engineering"],
  },
  {
    icon: "👁️",
    title: "Vision & OCR",
    items: ["OpenCV", "YOLOv8", "PaddleOCR", "Tesseract", "Google Vision"],
  },
  {
    icon: "🧠",
    title: "ML & Deep Learning",
    items: ["TensorFlow", "PyTorch", "spaCy", "Model Evaluation", "Fine-tuning"],
  },
  {
    icon: "⚙️",
    title: "Backend & APIs",
    items: ["FastAPI", "Flask", "AsyncIO", "Webhooks", "OAuth2 / JWT"],
  },
  {
    icon: "☁️",
    title: "Data & Cloud",
    items: ["PostgreSQL", "MongoDB", "OpenSearch", "GCP", "AWS ECS", "Docker", "GitHub Actions"],
  },
  {
    icon: "🔄",
    title: "Data Eng & Automation",
    items: ["ETL Pipelines", "Airflow", "Kafka", "Event-Driven Systems", "AI Workflow Automation", "APScheduler"],
  },
  {
    icon: "📡",
    title: "Real-Time & Streaming",
    items: ["SSE Token Streaming", "Real-Time Chat", "Webhooks", "AsyncIO", "Live AI Responses"],
  },
];

export const engineering = [
  {
    icon: "⚡",
    title: "Latency & Performance",
    description:
      "Obsessed with fast AI systems. I use cached vector stores, TTL caching, asynchronous embedding generation and per-step latency monitoring to keep RAG responses snappy under load.",
    tags: ["TTL Caching", "Vector Store Caching", "Latency Monitoring", "Token Budgeting"],
  },
  {
    icon: "🔀",
    title: "Concurrency & Async",
    description:
      "Async-first Python: AsyncIO services, fair semaphores, threading and timezone-aware APScheduler jobs, with SSE streaming and connection pooling for high-volume concurrent workloads.",
    tags: ["AsyncIO", "Fair Semaphores", "SSE Streaming", "APScheduler", "Connection Pooling"],
  },
  {
    icon: "🛡️",
    title: "Resilience Engineering",
    description:
      "Systems that survive bad days, built with circuit breakers, intelligent retry mechanisms, regional-to-global endpoint fallbacks and automatic handling of rate-limit (429) and availability (404) errors.",
    tags: ["Circuit Breakers", "Retries & Backoff", "Regional Fallback", "Rate-Limit Handling"],
  },
  {
    icon: "🚀",
    title: "Deployment & CI/CD",
    description:
      "From notebook to production: Dockerized services shipped to AWS ECS and GCP with GitHub Actions pipelines, fail-fast singleton initialization and contract-tested releases.",
    tags: ["Docker", "AWS ECS", "GCP", "GitHub Actions", "Contract Testing"],
  },
  {
    icon: "📡",
    title: "Observability",
    description:
      "If it isn't measured, it isn't done. I set up structured logging, distributed trace propagation, CloudWatch EMF metrics and Bugsnag error monitoring with typed exceptions and PII redaction.",
    tags: ["Structured Logging", "CloudWatch EMF", "Bugsnag", "Distributed Tracing"],
  },
  {
    icon: "🔐",
    title: "Security & Auth",
    description:
      "Compliance-ready AI using OAuth2 with Microsoft Graph, JWT and API-key auth, plus automated PII masking with secure restoration for sensitive financial documents.",
    tags: ["OAuth2", "JWT", "PII Masking", "Data Compliance"],
  },
];

export type Project = {
  emoji: string;
  title: string;
  description: string;
  tags: string[];
  categories: string[];
  flagship?: boolean;
};

export const projects: Project[] = [
  {
    emoji: "🤖",
    title: "AI Personal Assistant: Multi-Agent Platform",
    description:
      "Production-grade FastAPI backend powering an AI assistant with REST + SSE streaming responses. A LangGraph supervisor agent orchestrates specialized agents for email, calendar, notes, tasks, messenger, web search, image generation and maps, with citation-ready reference tracking, RAG over OpenSearch vector search, resilient Vertex AI/Gemini fallbacks, rate-limit budgeting and circuit breakers.",
    tags: ["FastAPI", "LangGraph", "Gemini", "OpenSearch", "AWS ECS"],
    categories: ["genai"],
    flagship: true,
  },
  {
    emoji: "💰",
    title: "Financial Document Extraction System",
    description:
      "Intelligent document processing API using GPT-4o that auto-extracts 80+ structured fields from financial documents via a multi-stage pipeline of Mistral OCR, Google Vision and spaCy NER, with PII masking and per-step performance tracking.",
    tags: ["GPT-4o", "Mistral OCR", "spaCy NER", "FastAPI"],
    categories: ["docai", "genai"],
  },
  {
    emoji: "📄",
    title: "Enterprise Intelligent Document Processing",
    description:
      "Enterprise-scale IDP platform automating extraction, validation and summarization of financial information. It combines OCR, dynamic LLM prompt orchestration, spaCy PII masking with secure restoration, and checklist-driven extraction as modular microservices.",
    tags: ["OpenAI", "PyMuPDF", "PII Masking", "Microservices"],
    categories: ["docai"],
  },
  {
    emoji: "📞",
    title: "Recruitment Automation Platform",
    description:
      "Event-driven recruitment platform automating candidate sourcing, job matching and outreach. It features AI voice calling via Bland AI with intelligent retry scheduling, Microsoft Graph email processing, MixRank enrichment and timezone-aware APScheduler jobs on PostgreSQL.",
    tags: ["Bland AI", "MS Graph", "PostgreSQL", "APScheduler"],
    categories: ["automation"],
  },
  {
    emoji: "🔍",
    title: "AI Document Understanding Platform",
    description:
      "Enterprise platform processing complex multi-document PDFs using Computer Vision segmentation, OCR workflows and LangChain + GPT orchestration for classification, field extraction and template-based validation, deployed on Google Cloud.",
    tags: ["LangChain", "OpenAI GPT", "GCP", "OCR"],
    categories: ["docai", "vision"],
  },
  {
    emoji: "✍️",
    title: "Handwritten Financial Form AI",
    description:
      "Deep-learning platform extracting structured data from handwritten and scanned banking forms. It pairs YOLOv8 entity detection with PaddleOCR text extraction, auto-labeling scripts and a training scheduler for continuous retraining across layouts and handwriting styles.",
    tags: ["YOLOv8", "PaddleOCR", "OpenCV", "Google Vision"],
    categories: ["vision"],
  },
];

export const projectFilters = [
  { key: "all", label: "All" },
  { key: "genai", label: "GenAI & Agents" },
  { key: "docai", label: "Document AI" },
  { key: "vision", label: "Computer Vision" },
  { key: "automation", label: "Automation" },
];

export const whyHireMe = {
  pitch:
    "I'm not just a model-builder. I'm a Data Scientist & AI Engineer who turns business problems into shipped, revenue-relevant AI systems. From the first data pipeline to the streaming response your users see, I own the whole journey.",
  strengths: [
    "End-to-end ownership: data ingestion → ETL → model → API → cloud deployment",
    "Business-first communication with technical and non-technical stakeholders",
    "Production mindset: latency budgets, concurrency, observability, cost control",
    "Trustworthy AI: citation-grounded RAG with reference tracking & PII compliance",
  ],
  challenges: [
    {
      icon: "🧾",
      problem: "Manual back-office drain",
      solution:
        "Automated extraction of 80+ structured fields from financial documents with OCR + GPT-4o pipelines, slashing manual data entry and error rates.",
      metric: "80+ fields automated",
    },
    {
      icon: "📈",
      problem: "AI that breaks under load",
      solution:
        "Engineered token-per-minute budgeting, fair semaphores, circuit breakers and regional fallbacks so LLM assistants stay stable as user traffic scales.",
      metric: "Stable at scale",
    },
    {
      icon: "⏱️",
      problem: "High-pressure deadlines",
      solution:
        "Trusted with critical deliveries: earned a Spot Award for shipping under pressure and Team of the Quarter Q1 2026 for consistent execution.",
      metric: "2× awarded",
    },
    {
      icon: "🔍",
      problem: "Can we trust AI answers?",
      solution:
        "Built citation-grounded RAG with reference tracking and schema-validated structured outputs, so every AI answer is traceable back to its source.",
      metric: "Traceable answers",
    },
    {
      icon: "💬",
      problem: "Chatbots that feel slow",
      solution:
        "Delivered SSE streaming responses with cached vector stores and async embedding generation for real-time AI that feels instant to users.",
      metric: "Real-time streaming",
    },
    {
      icon: "🔄",
      problem: "Repetitive human workflows",
      solution:
        "Automated recruiter operations end-to-end with AI voice calling, smart retry scheduling and event-driven pipelines, freeing teams for higher-value work.",
      metric: "Hours saved daily",
    },
  ],
};

export const awards = [
  {
    icon: "🏆",
    title: "Team of the Quarter (Q1 2026)",
    description:
      "Recognized for outstanding performance and strong team contribution at Bacancy Technology.",
  },
  {
    icon: "⭐",
    title: "Spot Award",
    description:
      "Awarded for going above and beyond to ensure successful delivery during high-pressure, critical deadlines.",
  },
  {
    icon: "🎓",
    title: "B.E. in Information & Communication Technology",
    description: "Marwadi University, Rajkot · Class of 2024.",
  },
];
