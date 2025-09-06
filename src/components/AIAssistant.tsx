import { useState, useRef, useEffect } from "react";
// import { GoogleGenerativeAI } from "@google/generative-ai";
import { Bot, Send, Sparkles, X, Mic, MicOff, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// @ts-ignore
const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "ai",
      content: "Hi! I'm your AI movie assistant. Ask me anything about movies - recommendations, reviews, or find something specific to watch!"
    }
  ]);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!message.trim() || isLoading) return;

    const userMessage = { type: "user", content: message };
    setMessages(prev => [...prev, userMessage]);
    setMessage("");
    setIsLoading(true);

    if (!geminiApiKey) {
      setMessages(prev => [...prev, { type: "ai", content: "Gemini API key not found. Please set it in your .env file." }]);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-goog-api-key": geminiApiKey,
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { text: message }
                ]
              }
            ]
          })
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // Extract the response text from the API response
      const aiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini.";
      setMessages(prev => [...prev, { type: "ai", content: aiResponse }]);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      setMessages(prev => [...prev, { type: "ai", content: `Error: ${errorMessage}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleVoice = () => {
    setIsListening(!isListening);
    // Voice recognition logic would be implemented here
  };

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-2xl ai-pulse transition-all duration-300 ${
          isOpen ? 'scale-0' : 'scale-100'
        }`}
        variant="hero"
      >
        <Bot className="w-6 h-6" />
      </Button>

      {/* Chat Interface */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-500 origin-bottom-right ${
        isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
      }`}>
        <div className="w-96 h-[500px] glass rounded-2xl border border-primary/30 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-border/50 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center ai-pulse">
                <Bot className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">AI Assistant</h3>
                <p className="text-xs text-muted-foreground flex items-center">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Made by Saurabh
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'glass border border-border/50'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                  <div className="max-w-[80%] p-3 rounded-lg glass border border-border/50">
                      <LoaderCircle className="w-5 h-5 animate-spin" />
                  </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border/50">
            <div className="flex items-center space-x-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask about movies..."
                className="glass border-primary/30 focus:border-primary"
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                disabled={isLoading}
              />
              <Button
                variant={isListening ? "destructive" : "glass"}
                size="icon"
                onClick={toggleVoice}
                disabled={isLoading}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </Button>
              <Button variant="hero" size="icon" onClick={handleSend} disabled={isLoading}>
                {isLoading ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIAssistant;