import React, { useState, useRef, useEffect } from "react";
import { MessageCircleMore, Send, X } from "lucide-react";
import predefinedReplies from "../../data/predefinedReplies";

export const Chatbot = () => {
  /* -------------------- UI STATE -------------------- */
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  /* -------------------- REFS -------------------- */
  const messagesEndRef = useRef(null);
  const chatRef = useRef(null);
  const MAX_INPUT_LENGTH = 500;

  /* -------------------- MESSAGES STATE -------------------- */
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi there! 👋 I'm jas. Thanks for visiting my website. Feel free to ask me anything about my portfolio.",
    },
  ]);

  /* -------------------- CLOSE CHAT ON OUTSIDE CLICK -------------------- */
  useEffect(() => {
    const handleClickOutside = (e) => {
      // Close chat if user clicks outside the chat container
      if (chatRef.current && !chatRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  /* -------------------- AUTO SCROLL TO LATEST MESSAGE -------------------- */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  /* -------------------- MESSAGE BUBBLE COMPONENT -------------------- */
  const Bubble = ({ role, content, isLoadingBubble }) => {
    const isUser = role === "user";
    return (
      <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
        <div className="flex flex-col gap-1 max-w-[85%]">
          {!isUser && (
            <div className="flex items-center gap-2 px-1">
              <img
                src="/Profile2.png"
                alt="jas"
                className="w-6 h-6 rounded-full object-cover object-[center_20%]"
              />
              <span className="text-xs font-medium text-(--text-secondary)">
                Jasper Tabin
              </span>
            </div>
          )}
          <div className="inline-flex flex-col">
            <div
              className="
                rounded-2xl px-4 py-3
                w-fit max-w-full
                text-sm leading-relaxed whitespace-pre-wrap
                bg-(--primary) border border-(--border)
              "
            >
              {isLoadingBubble ? (
                <div className="inline-flex gap-1">
                  <span className="w-2 h-2 bg-(--text-secondary) rounded-full animate-bounce" />
                  <span
                    className="w-2 h-2 bg-(--text-secondary) rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  />
                  <span
                    className="w-2 h-2 bg-(--text-secondary) rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                </div>
              ) : (
                content
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  /* -------------------- SEND MESSAGE HANDLER -------------------- */
  const handleSend = async () => {
    if (!input.trim()) return;

    // Character limit check
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

    const userInput = input;
    const lowerInput = input.toLowerCase();
    setMessages((prev) => [...prev, { role: "user", content: userInput }]);
    setInput("");
    setIsLoading(true);

    // Check predefined replies first
    const match = predefinedReplies.find(({ keywords }) =>
      keywords.some((k) => new RegExp(`\\b${k}\\b`, "i").test(lowerInput)),
    );
    if (match) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: match.reply },
        ]);
        setIsLoading(false);
      }, 1000);
      return;
    }

    /* ---------- API fallback ---------- */
    try {
      const apiUrl = import.meta.env.DEV
        ? "http://localhost:3000/api/chat" // LOCAL
        : "/api/chat"; // LIVE

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await res.json();

      // ✅ Show either reply or error
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || data.error },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Hmm 🤔 I don't have an answer for that yet. Try asking about my skills or projects!",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  /* -------------------- RENDER -------------------- */
  return (
    <div>
      {/* Floating chat launcher */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 flex items-center gap-2 px-4 py-3 rounded-full bg-(--primary) border border-(--border) hover:scale-105 transition z-50"
      >
        <MessageCircleMore className="w-5 h-5" />
        <span className="hidden md:inline">Chat with jas</span>
      </button>

      {isOpen && (
        <div
          ref={chatRef}
          className="flex flex-col fixed bottom-25 right-4 md:right-6 w-[95%] md:w-96 h-[40vh] bg-(--primary) border border-(--border) rounded-lg  z-50"
        >
          {/* Header */}
          <div className="px-4 py-3 flex items-center border-b border-(--border)">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <img
                src="/Profile2.png"
                alt="jas"
                className="w-10 h-10 rounded-full object-cover object-[center_20%] shrink-0"
              />

              <div className="flex flex-col leading-tight min-w-0">
                <h3 className="font-semibold truncate">Chat with jas</h3>
                <div className="flex items-center gap-1 text-xs text-(--text-secondary)">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>Online</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="ml-3 shrink-0 p-1 rounded-md hover:bg-(--border) transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 chat-scroll">
            {messages.map((m, i) => (
              <Bubble key={i} role={m.role} content={m.content} />
            ))}

            {isLoading && <Bubble role="assistant" isLoadingBubble />}

            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="p-4 border-t border-(--border)">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
                maxLength={MAX_INPUT_LENGTH}
                disabled={isLoading}
                className="flex-1 rounded-lg px-4 py-2 bg-(--primary) border border-(--border) focus:outline-none"
              />

              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="p-2 border border-(--border) rounded-lg cursor-pointer hover:scale-105 transition disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>

            {/* Character counter */}
            <div className="flex justify-between items-center mt-2 text-xs text-(--text-secondary) px-1">
              <span className="hidden sm:inline">
                Ask anything related to me or my portfolio!
              </span>
              <span
                className={
                  input.length >= MAX_INPUT_LENGTH
                    ? "text-orange-500 font-semibold"
                    : input.length >= MAX_INPUT_LENGTH - 50
                      ? "text-yellow-500"
                      : ""
                }
              >
                {input.length}/{MAX_INPUT_LENGTH}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
