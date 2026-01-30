import React, { useState, useRef, useEffect } from "react";
import { MessageCircleMore, Send, X } from "lucide-react";
import predefinedReplies from "../Data/predefinedReplies";

const baseStyle = "bg-[var(--primary)] border border-[var(--border)]";
const textStyle = "text-[var(--text-primary)]";

const defaultReply =
  "Hmm 🤔 I don’t have a predefined answer for that yet. Try asking about my skills, projects, or contact info!";

const MAX_INPUT_LENGTH = 500; // UX guard (backend still enforces this)

const Bubble = ({ role, children }) => {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${baseStyle} ${textStyle}`}
      >
        {children}
      </div>
    </div>
  );
};

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi there! 👋 I'm jas. Thanks for dropping by!!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    if (input.length > MAX_INPUT_LENGTH) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "That message is a bit too long 😅 Try shortening it.",
        },
      ]);
      return;
    }

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const lowerInput = input.toLowerCase();

    // 🔹 1. Predefined replies (fast + free)
    for (const { keywords, reply } of predefinedReplies) {
      if (keywords.some((kw) => lowerInput.includes(kw))) {
        setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
        setIsLoading(false);
        return;
      }
    }

    // 🔹 2. Node.js backend (Gemini)
    try {
      const backendUrl =
        import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

      const res = await fetch(`${backendUrl}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Request failed");
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || defaultReply },
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Oops 😬 Something went wrong on my end. Please try again in a bit.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{`.chatbot-input::placeholder { color: var(--text-secondary); opacity: 0.7; }`}</style>

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 rounded-full p-4 shadow-lg transition hover:scale-105 z-50 block md:hidden ${baseStyle}`}
      >
        <MessageCircleMore className="w-6 h-6" />
      </button>

      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 rounded-full px-6 py-3 shadow-lg transition hover:scale-105 z-50 hidden md:flex items-center gap-2 font-medium ${baseStyle}`}
      >
        <MessageCircleMore className="w-5 h-5" />
        Chat with jas
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`
            fixed z-40 flex flex-col overflow-hidden shadow-2xl ${baseStyle}
            md:bottom-24 md:right-6 md:w-96 md:h-[600px] md:rounded-3xl
            bottom-25 right-4 w-[85%] h-[55vh] rounded-2xl
          `}
        >
          {/* Header */}
          <div
            className={`p-4 flex justify-between items-center border-b ${baseStyle}`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src="/Profile2.png"
                  alt="Profile"
                  className="w-full h-full object-cover object-[center_20%]"
                />
              </div>
              <div>
                <h3 className={`font-semibold ${textStyle}`}>Chat with jas</h3>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-[var(--text-secondary)]">
                    ONLINE
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-2 hover:opacity-80"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[var(--primary)]">
            {messages.map((m, i) => (
              <Bubble key={i} role={m.role}>
                {m.content}
              </Bubble>
            ))}
            {isLoading && (
              <Bubble role="assistant">
                <div className="flex gap-1">
                  {[0, 0.1, 0.2].map((d, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full animate-bounce bg-[var(--text-secondary)]"
                      style={{ animationDelay: `${d}s` }}
                    />
                  ))}
                </div>
              </Bubble>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className={`p-4 border-t ${baseStyle}`}>
            <div className="flex gap-2 items-end">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
                className={`chatbot-input flex-1 bg-transparent rounded-full px-4 py-3 focus:outline-none ${baseStyle} ${textStyle}`}
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className={`rounded-full p-3 disabled:opacity-50 ${baseStyle}`}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
