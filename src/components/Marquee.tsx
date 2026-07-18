const items = [
  "Python",
  "LangChain",
  "LangGraph",
  "RAG",
  "Agentic AI",
  "Embeddings",
  "Vector Search",
  "Transformers",
  "Fine-tuning",
  "LLMOps",
  "FastAPI",
  "OpenAI",
  "Gemini",
  "TensorFlow",
  "PyTorch",
  "OpenCV",
  "YOLOv8",
  "spaCy",
  "OpenSearch",
  "Kafka",
  "Airflow",
  "PostgreSQL",
  "Docker",
  "GCP",
  "AWS",
];

export default function Marquee() {
  const strip = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-line bg-bg-alt py-5 transition-colors duration-500 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
      <div className="marquee-track flex w-max gap-10">
        {strip.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-10 font-mono text-sm tracking-wider text-dim whitespace-nowrap"
          >
            {item}
            <span className="gradient-text text-xs">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
