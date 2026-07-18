import type { Metadata } from "next";
import { Inter, Sora, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const sora = Sora({ variable: "--font-sora", subsets: ["latin"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yash Kothari | Data Scientist & AI Engineer",
  description:
    "Yash Kothari is a Data Scientist with 4+ years of experience in Generative AI, NLP, Computer Vision, LLMs, RAG pipelines and multi-agent systems.",
  keywords: [
    "Yash Kothari",
    "Data Scientist",
    "GenAI Engineer",
    "AI Engineer",
    "LangChain",
    "LangGraph",
    "RAG",
    "LLM",
    "Computer Vision",
    "NLP",
    "Python",
    "FastAPI",
  ],
  authors: [{ name: "Yash Kothari" }],
  openGraph: {
    title: "Yash Kothari | Data Scientist & AI Engineer",
    description:
      "Building production-grade AI systems: LLM chatbots, RAG pipelines, multi-agent architectures, computer vision and document intelligence.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${sora.variable} ${jetbrains.variable} antialiased`}
    >
      <body className="min-h-screen font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          themes={["light", "dark", "glass"]}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
