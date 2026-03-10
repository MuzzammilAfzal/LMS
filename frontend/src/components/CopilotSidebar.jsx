import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Loading from "./loading";
import { serverUrl } from "../App";



const CopilotSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I'm your Copilot assistant." },
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!question.trim()) return;

    const userMessage = { from: "user", text: question };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setQuestion("");

    // SYSTEM PROMPT (E-Learning Context)
    const systemPrompt = {
      role: "system",
      content: `
You are an AI learning assistant for an online E-Learning platform.

Your job is to help students understand programming and computer science concepts.

Guidelines:
- Explain concepts in simple language.
- Provide short examples when explaining programming.
- Use step-by-step explanations when necessary.
- Encourage learning rather than just giving answers.
- Keep responses concise and student-friendly.

Topics students may ask about:
Frontend development, Backend development, databases, and general computer science.
`
    };

    // Convert UI messages → OpenAI format
    const chatHistory = updatedMessages.map((msg) => ({
      role: msg.from === "bot" ? "assistant" : "user",
      content: msg.text,
    }));

    const finalMessages = [systemPrompt, ...chatHistory];

    try {
      setLoading(true);

      const response = await fetch(`${serverUrl}/api/ai/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatHistory: finalMessages,
        }),
      });

      const data = await response.json();

      if (data) {
        setMessages((prev) => [
          ...prev,
          { from: "bot", text: data.reply },
        ]);
      }

    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`fixed z-50 top-0 right-0 h-full bg-[#5c5470] rounded-l-2xl shadow-xl border-l border-gray-200 transition-all duration-300 ease-in-out ${
        isOpen ? "w-75" : "w-5"
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-1/2 -left-3 bg-white border border-gray-300 rounded-full p-1 shadow-sm hover:bg-gray-50 transition"
      >
        {isOpen ? (
          <ChevronRight className="w-5 h-5 text-gray-600" />
        ) : (
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        )}
      </button>

      <div className="flex flex-col h-full p-4">
        {isOpen && (
          <>
            <h2 className="text-lg font-semibold mb-4 mt-4 text-center bg-[#c5c8cb] rounded-2xl text-black">
              Copilot
            </h2>

            <div className="flex-1 overflow-y-auto space-y-3 mb-3 scrollbar-thin scrollbar-thumb-gray-500">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] p-2 rounded-lg text-sm wrap-break-word ${
                    msg.from === "bot"
                      ? "bg-gray-100 text-gray-800 self-start"
                      : "bg-blue-500 text-white self-end ml-auto"
                  }`}
                >
                  {msg.text}
                </div>
              ))}

              <div className="w-[30%] p-2 rounded-lg">
                <Loading loading={loading} />
              </div>

              <div ref={messagesEndRef} />
            </div>

            <div className="mt-auto flex">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask something..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />

              <button
                onClick={handleSend}
                className="ml-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Send
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CopilotSidebar;