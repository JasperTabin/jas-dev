import React, { useState, useRef, useEffect } from "react";
import { MessageCircleMore, Send, X } from "lucide-react";
import predefinedReplies from "../Data/predefinedReplies";

const baseStyle = "bg-[var(--primary)] border border-[var(--border)]";
const textStyle = "text-[var(--text-primary)]";

const fallbackReply =
  "Hmm 🤔 I don't have a predefined answer for that yet. Try asking about my skills, projects, or contact info!";

const MAX_INPUT_LENGTH = 500;

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
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    if (input.length > MAX_INPUT_LENGTH) {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: "That message is a bit too long 😅 Try shortening it.",
        },
      ]);
      return;
    }

    const userInput = input;
    const lowerInput = input.toLowerCase();

    setMessages((m) => [...m, { role: "user", content: userInput }]);
    setInput("");
    setIsLoading(true);

    // 🔹 Check predefined replies first
    const match = predefinedReplies.find(({ keywords }) =>
      keywords.some((k) => lowerInput.includes(k)),
    );

    if (match) {
      setMessages((m) => [...m, { role: "assistant", content: match.reply }]);
      setIsLoading(false);
      return;
    }

    // 🔹 Use different API URL for development vs production
    const apiUrl = import.meta.env.DEV 
      ? 'http://localhost:3000/api/chat'  // Local dev server
      : '/api/chat';                       // Vercel serverless function

    // 🔹 Call backend (Gemini via /api/chat)
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput }),
      });

      if (!response.ok) throw new Error("Backend not reachable");

      const data = await response.json();
      setMessages((m) => [
        ...m,
        { role: "assistant", content: data.reply || fallbackReply },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((m) => [...m, { role: "assistant", content: fallbackReply }]);
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
        className={`fixed bottom-6 right-6 rounded-full shadow-lg transition hover:scale-105 z-50 flex items-center gap-2 px-4 md:px-6 py-3 ${baseStyle}`}
      >
        <MessageCircleMore className="w-6 h-6 md:w-5 md:h-5" />
        <span className="hidden md:inline font-medium">Chat with jas</span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`
            fixed z-40 flex flex-col overflow-hidden shadow-2xl ${baseStyle}
            md:bottom-24 md:right-6 md:w-96 md:h-[600px] md:rounded-3xl
            bottom-20 right-4 w-[85%] h-[55vh] rounded-2xl
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