"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { knowledge, suggestions, fallbackAnswer, type KBAction } from "@/data/knowledge";
import Logo from "@/components/Logo";

type Message = { role: "user" | "bot"; text: string };

const WELCOME: Message = {
  role: "bot",
  text: "Hey! I'm K.AI, Yash's portfolio assistant. Ask me about his skills, projects or experience, or tell me to switch themes and show sections. How can I help?",
};

function matchEntry(query: string) {
  const q = query.toLowerCase();
  let best = null as (typeof knowledge)[number] | null;
  let bestScore = 0;
  for (const entry of knowledge) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (q.includes(kw)) score += kw.split(" ").length * kw.length;
    }
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }
  return best;
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [chipOffset, setChipOffset] = useState(0);
  const { setTheme } = useTheme();
  const listRef = useRef<HTMLDivElement>(null);
  const streamTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const openHandler = () => setOpen(true);
    window.addEventListener("yk:openchat", openHandler);
    return () => window.removeEventListener("yk:openchat", openHandler);
  }, []);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open]);

  useEffect(() => () => {
    if (streamTimer.current) clearInterval(streamTimer.current);
  }, []);

  function runAction(action?: KBAction) {
    if (!action) return;
    if (action.type === "scroll") {
      setTimeout(() => document.querySelector(action.target)?.scrollIntoView({ behavior: "smooth" }), 500);
    } else if (action.type === "theme") {
      setTimeout(() => setTheme(action.value), 400);
    } else if (action.type === "filter") {
      setTimeout(() => {
        document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
        window.dispatchEvent(new CustomEvent("yk:filter", { detail: action.value }));
      }, 500);
    } else if (action.type === "open") {
      setTimeout(() => window.open(action.url, "_blank", "noopener"), 400);
    } else if (action.type === "tour") {
      setTimeout(() => {
        setOpen(false);
        window.dispatchEvent(new Event("yk:starttour"));
      }, 600);
    }
  }

  function send(text: string) {
    const query = text.trim();
    if (!query || typing) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text: query }]);
    setTyping(true);
    setChipOffset((o) => (o + 3) % suggestions.length);

    const entry = matchEntry(query);
    const answer = entry ? entry.answer : fallbackAnswer;

    // stream the reply word by word, like an LLM response
    setTimeout(() => {
      const words = answer.split(" ");
      let i = 0;
      setMessages((m) => [...m, { role: "bot", text: "" }]);
      streamTimer.current = setInterval(() => {
        i++;
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "bot", text: words.slice(0, i).join(" ") };
          return copy;
        });
        if (i >= words.length) {
          if (streamTimer.current) clearInterval(streamTimer.current);
          setTyping(false);
          runAction(entry?.action);
        }
      }, 28);
    }, 450);
  }

  const visibleChips = [0, 1, 2].map((i) => suggestions[(chipOffset + i) % suggestions.length]);

  return (
    <>
      {/* launcher */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open K.AI chat assistant"
        className="fixed right-6 bottom-24 z-[960] grid h-14 w-14 cursor-pointer place-items-center rounded-2xl shadow-2xl shadow-primary/50"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
      >
        <span className="grad-bg absolute inset-0 rounded-2xl" />
        <span className="grad-bg absolute inset-0 animate-ping rounded-2xl opacity-30" />
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" className="relative h-6 w-6">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative h-6 w-6">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            <path d="M8 9h8M8 13h5" />
          </svg>
        )}
      </motion.button>

      {/* panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="bento-ring fixed right-6 bottom-[10.5rem] z-[960] w-[min(380px,calc(100vw-3rem))] rounded-3xl p-[2px] shadow-2xl shadow-black/40"
            role="dialog"
            aria-label="K.AI assistant"
          >
            <div className="flex h-[min(540px,calc(100vh-13rem))] flex-col overflow-hidden rounded-[calc(1.5rem-2px)] bg-bg backdrop-blur-2xl">
              <div className="flex items-center gap-3 border-b border-line bg-surface px-5 py-4">
                <div className="relative">
                  <Logo className="h-10 w-10 rounded-xl" gradientId="ykGradChat" />
                  <span className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2 border-bg bg-emerald-400" />
                </div>
                <div className="flex-1">
                  <p className="font-display text-sm font-bold">
                    K<span className="gradient-text">.AI</span>
                  </p>
                  <p className="text-[11px] text-dim">Yash&apos;s portfolio copilot · streams in real time</p>
                </div>
                <button
                  onClick={() => setMessages([WELCOME])}
                  aria-label="Clear conversation"
                  title="Clear conversation"
                  className="grid h-8 w-8 cursor-pointer place-items-center rounded-lg border border-line text-dim transition-colors hover:border-primary hover:text-body"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                    <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                  </svg>
                </button>
              </div>

              <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto p-4">
                {messages.map((m, i) => (
                  <div key={i} className={`flex items-end gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    {m.role === "bot" && (
                      <Logo className="h-6 w-6 shrink-0 rounded-md" gradientId={`ykGradMsg${i}`} />
                    )}
                    <div
                      className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed ${
                        m.role === "user"
                          ? "grad-bg rounded-br-md text-white shadow-lg shadow-primary/30"
                          : "rounded-bl-md border border-line bg-surface text-body"
                      }`}
                    >
                      {m.text}
                      {typing && i === messages.length - 1 && m.role === "bot" && (
                        <span className="caret text-accent">▍</span>
                      )}
                    </div>
                  </div>
                ))}
                {typing && messages[messages.length - 1]?.role === "user" && (
                  <div className="flex items-end gap-2">
                    <Logo className="h-6 w-6 shrink-0 rounded-md" gradientId="ykGradTyping" />
                    <div className="flex gap-1.5 rounded-2xl rounded-bl-md border border-line bg-surface px-4 py-3">
                      {[0, 1, 2].map((d) => (
                        <motion.span
                          key={d}
                          className="h-1.5 w-1.5 rounded-full bg-primary"
                          animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: d * 0.15 }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5 px-4 pb-2">
                {visibleChips.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="cursor-pointer rounded-full border border-chipline bg-chipbg px-3 py-1 text-[11px] text-chiptext transition-all hover:-translate-y-0.5 hover:bg-primary hover:text-white"
                  >
                    {s}
                  </button>
                ))}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
                className="flex items-center gap-2 border-t border-line p-3"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask K.AI about Yash..."
                  className="flex-1 rounded-xl border border-line bg-surface px-4 py-2.5 text-sm outline-none placeholder:text-dim focus:border-primary focus:shadow-[0_0_0_3px_rgba(108,92,231,0.15)]"
                  aria-label="Chat message"
                />
                <button
                  type="submit"
                  aria-label="Send"
                  className="grad-bg grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-xl text-white shadow-lg shadow-primary/30 transition-transform hover:scale-105 active:scale-95"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <path d="m22 2-7 20-4-9-9-4Z" />
                    <path d="M22 2 11 13" />
                  </svg>
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
