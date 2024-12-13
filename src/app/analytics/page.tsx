"use client";

import { useState } from "react";
import { DashboardNav } from "@/components/dashboard/nav";
import { Send } from "lucide-react";
import { processExpenseQuery } from "@/lib/expense/chat-processor";

export default function AnalyticsPage() {
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'assistant', content: string }>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    // Add user message to chat
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);

    try {
      // Process the query
      const response = await processExpenseQuery(userMessage);

      // Add assistant response to chat
      setMessages(prev => [...prev, { type: 'assistant', content: response.answer }]);
    } catch (error) {
      console.error("Failed to process query:", error);
      setMessages(prev => [...prev, {
        type: 'assistant',
        content: "Sorry, I couldn't process your question. Please try again."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      <main className="container py-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-card rounded-lg border shadow-sm">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Expense Analytics Chat</h2>
              <p className="text-sm text-muted-foreground">
                Ask questions about your expenses, like &quot;What was my latest expense?&quot; or &quot;How much did I spend this month?&quot;
              </p>
            </div>

            {/* Chat Messages */}
            <div className="p-4 h-[400px] overflow-y-auto space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${message.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                      }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg px-4 py-2 bg-muted">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-foreground/30 animate-bounce" />
                      <div className="w-2 h-2 rounded-full bg-foreground/30 animate-bounce [animation-delay:0.2s]" />
                      <div className="w-2 h-2 rounded-full bg-foreground/30 animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Ask about your expenses..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  className="flex-1 min-w-0 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || !input.trim()}
                  className="inline-flex items-center justify-center rounded-md px-4 py-2 font-medium bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
