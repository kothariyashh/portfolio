export type KBAction =
  | { type: "scroll"; target: string }
  | { type: "theme"; value: "dark" | "light" | "glass" }
  | { type: "filter"; value: string }
  | { type: "open"; url: string }
  | { type: "tour" };

export type KBEntry = {
  keywords: string[];
  answer: string;
  action?: KBAction;
};

export const suggestions = [
  "👋 Who is Yash?",
  "🚀 Show me his projects",
  "🧭 Take a tour",
  "🧠 What are his skills?",
  "💼 Why should I hire him?",
  "📬 How can I contact him?",
  "🎨 Switch to glass theme",
];

export const knowledge: KBEntry[] = [
  {
    keywords: ["who", "about", "yash", "introduce", "introduction", "yourself", "bio"],
    answer:
      "Yash Kothari is a Data Scientist & AI Engineer from Ahmedabad, India with 4+ years of experience. He builds production-grade Generative AI systems: LLM chatbots with streaming responses, citation-grounded RAG, multi-agent platforms, computer vision and document intelligence. He currently works at Bacancy Technology. Taking you to the About section!",
    action: { type: "scroll", target: "#about" },
  },
  {
    keywords: ["experience", "work", "career", "company", "companies", "job", "history", "bacancy", "vanceiq"],
    answer:
      "Yash has 4+ years of experience: Data Scientist at Bacancy Technology (Jan 2024 - Present), AI Implementation Strategist at VanceIQ (2023-2024), AI Intern at Version System (2023) where he built a 96%-accurate face recognition system, and Data Analyst Intern at Technolabs (2022). Here's his full journey!",
    action: { type: "scroll", target: "#experience" },
  },
  {
    keywords: ["skill", "skills", "stack", "technology", "technologies", "tech", "tools", "know", "langchain", "python", "fastapi"],
    answer:
      "His core stack: Python, FastAPI, LangChain/LangGraph, OpenAI & Gemini, RAG, TensorFlow, PyTorch, OpenCV, YOLOv8, PostgreSQL, OpenSearch, Kafka, Airflow, Docker, GCP and AWS. Scroll through the full skill map!",
    action: { type: "scroll", target: "#skills" },
  },
  {
    keywords: ["project", "projects", "built", "portfolio", "work samples", "showcase"],
    answer:
      "Yash has shipped 10+ production AI projects: a multi-agent assistant with SSE streaming, generative image editing with SAM + Stable Diffusion, 3D foot modelling for healthcare, a FAISS face reverse search engine, a doctor booking chatbot on LLaMA 3, GPT-4o financial document extraction, recruitment automation with AI voice calling, shipping label NER and more. Take a look!",
    action: { type: "scroll", target: "#projects" },
  },
  {
    keywords: ["genai", "llm", "agent", "agents", "rag projects", "multi-agent"],
    answer:
      "Here are his GenAI & agent projects, including his flagship multi-agent assistant platform built with LangGraph, Gemini and OpenSearch RAG.",
    action: { type: "filter", value: "genai" },
  },
  {
    keywords: ["vision", "ocr", "computer vision projects", "image", "yolo"],
    answer:
      "Filtering his Computer Vision work: document understanding with CV segmentation and handwritten banking form extraction with YOLOv8 + PaddleOCR.",
    action: { type: "filter", value: "vision" },
  },
  {
    keywords: ["document", "docai", "extraction", "idp", "pdf"],
    answer:
      "Filtering his Document AI projects: GPT-4o financial extraction (80+ fields), enterprise IDP with PII masking, and multi-document understanding platforms.",
    action: { type: "filter", value: "docai" },
  },
  {
    keywords: ["automation", "workflow", "voice", "recruitment"],
    answer:
      "Here's his automation work: an event-driven recruitment platform with Bland AI voice calling, Microsoft Graph email processing and smart retry scheduling.",
    action: { type: "filter", value: "automation" },
  },
  {
    keywords: ["engineering", "latency", "concurrency", "async", "deployment", "observability", "resilience", "scale", "production"],
    answer:
      "Beyond models, Yash engineers production systems: latency optimization with TTL caching, AsyncIO concurrency with fair semaphores, circuit breakers and regional fallbacks, Docker + AWS ECS + GitHub Actions deployment, and full observability with CloudWatch and Bugsnag. See his Engineering DNA!",
    action: { type: "scroll", target: "#engineering" },
  },
  {
    keywords: ["hire", "why", "strength", "strengths", "best", "value", "business", "fit", "role"],
    answer:
      "Why hire Yash? He owns AI end to end: data ingestion to ETL to model to API to cloud. He automated 80+ fields of manual data entry, kept LLM assistants stable at scale, earned a Spot Award plus Team of the Quarter for delivery under pressure, and builds citation-grounded, trustworthy AI. Judge for yourself!",
    action: { type: "scroll", target: "#why-me" },
  },
  {
    keywords: ["award", "awards", "achievement", "achievements", "recognition", "honors"],
    answer:
      "He earned Team of the Quarter (Q1 2026) and a Spot Award for going above and beyond on critical deadlines. Here's the recognition section!",
    action: { type: "scroll", target: "#awards" },
  },
  {
    keywords: ["education", "degree", "university", "college", "study", "marwadi"],
    answer:
      "Yash holds a B.E. in Information & Communication Technology from Marwadi University, Rajkot (Class of 2024).",
    action: { type: "scroll", target: "#about" },
  },
  {
    keywords: ["contact", "email", "mail", "reach", "connect", "touch", "hire process", "message"],
    answer:
      "You can reach Yash at ai.work.kothari@gmail.com or +91 91737 77900. There's also a contact form right here that lands straight in his inbox!",
    action: { type: "scroll", target: "#contact" },
  },
  {
    keywords: ["phone", "call", "number", "mobile"],
    answer: "Yash's phone number is +91 91737 77900. Feel free to call or WhatsApp!",
    action: { type: "scroll", target: "#contact" },
  },
  {
    keywords: ["linkedin"],
    answer: "Opening Yash's LinkedIn profile in a new tab!",
    action: { type: "open", url: "https://www.linkedin.com/in/kothari-yash" },
  },
  {
    keywords: ["github", "code", "repos", "repository"],
    answer: "Opening Yash's GitHub profile so you can browse his code!",
    action: { type: "open", url: "https://github.com/kothariyashh" },
  },
  {
    keywords: ["tree", "knowledge graph", "graph", "overview", "big picture", "summary", "specialties"],
    answer:
      "Here's Yash's Knowledge Graph: one animated structure showing how everything connects from a single root. Data science branches into GenAI & agents, computer vision, data engineering and production systems. Hover the nodes to trace the connections!",
    action: { type: "scroll", target: "#tree" },
  },
  {
    keywords: ["activity", "contributions", "contribution", "commits", "streak", "heatmap", "coding activity"],
    answer:
      "Here's Yash's coding activity: a GitHub-style contribution heatmap with yearly commits, current streak and best day. Green means shipping!",
    action: { type: "scroll", target: "#activity" },
  },
  {
    keywords: ["resume", "cv", "download", "pdf"],
    answer:
      "Opening Yash's resume in a new tab where you can read it and download it. There's also a View Resume button in the hero section!",
    action: { type: "open", url: "Yash_Kothari_Resume.pdf" },
  },
  {
    keywords: ["location", "where", "based", "city", "relocate", "remote"],
    answer:
      "Yash is based in Ahmedabad, India and is open to both remote and on-site roles.",
  },
  {
    keywords: ["available", "availability", "open", "opportunity", "opportunities", "job offer", "hiring"],
    answer:
      "Yes! Yash is available for opportunities: AI/ML roles, GenAI consulting and collaborations. Drop him a message and he'll get back quickly.",
    action: { type: "scroll", target: "#contact" },
  },
  {
    keywords: ["dark", "dark mode", "dark theme"],
    answer: "Switching to dark theme. Easy on the eyes!",
    action: { type: "theme", value: "dark" },
  },
  {
    keywords: ["light", "light mode", "light theme", "bright"],
    answer: "Switching to light theme!",
    action: { type: "theme", value: "light" },
  },
  {
    keywords: ["glass", "glass theme", "aurora", "glassmorphism"],
    answer: "Switching to the glass theme. My personal favorite, enjoy the aurora!",
    action: { type: "theme", value: "glass" },
  },
  {
    keywords: ["salary", "rate", "compensation", "charge", "cost", "price"],
    answer:
      "That's best discussed directly with Yash. Send him a quick note at ai.work.kothari@gmail.com and he'll respond with details.",
    action: { type: "scroll", target: "#contact" },
  },
  {
    keywords: ["rag", "retrieval", "embedding", "embeddings", "vector", "semantic search", "reranking", "hybrid search", "ragas", "langfuse", "llamaindex"],
    answer:
      "Yash builds production RAG systems end to end: embedding generation with OpenAI models, kNN vector search on AWS OpenSearch, hybrid retrieval with reranking, TTL-cached vector stores, RAGAS-style evaluation and Langfuse tracing, and citation-grounded answers with reference tracking so every response is traceable to its source.",
    action: { type: "scroll", target: "#skills" },
  },
  {
    keywords: ["fine-tuning", "fine tuning", "lora", "peft", "quantization", "training", "transformers", "attention"],
    answer:
      "On the model side, Yash works with transformer architectures, fine-tuning concepts including LoRA/PEFT, quantization for efficient inference, and rigorous model evaluation. He backs it with continuous study of the underlying math and deep learning fundamentals.",
    action: { type: "scroll", target: "#skills" },
  },
  {
    keywords: ["mlops", "llmops", "monitoring", "drift", "evals", "evaluation", "guardrails", "hallucination"],
    answer:
      "Yash treats AI like a product: guardrails and safety-filter handling, LLM evals, token usage tracking, model monitoring with CloudWatch metrics, structured logging with PII redaction, and automated retraining schedulers for vision pipelines.",
    action: { type: "scroll", target: "#engineering" },
  },
  {
    keywords: ["tour", "walkthrough", "walk through", "guide", "show me around", "explore"],
    answer: "Starting the guided tour. Sit back, I'll walk you through the whole portfolio!",
    action: { type: "tour" },
  },
  {
    keywords: ["hello", "hi", "hey", "namaste", "good morning", "good evening"],
    answer:
      "Hello! I'm Kothari.AI, Yash's personal AI assistant. Ask me about his skills, projects, experience, or say things like 'show projects', 'take a tour' or 'switch to glass theme'.",
  },
  {
    keywords: ["thanks", "thank", "great", "awesome", "cool", "nice"],
    answer: "You're welcome! Anything else you'd like to know about Yash?",
  },
  {
    keywords: ["chatbot", "you", "bot", "assistant", "what can you do", "help"],
    answer:
      "I'm Kothari.AI, a built-in assistant with a knowledge base about Yash. I can answer questions about his experience, skills, projects and awards, give you a guided tour, filter projects, switch themes (try 'glass theme'), and share contact details. What would you like?",
  },
];

export const fallbackAnswer =
  "Hmm, I don't have that in my knowledge base yet. Try asking about Yash's skills, projects, experience, awards or contact info. You can also say 'show projects' or 'switch to glass theme'!";
