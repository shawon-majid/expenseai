"use client";

import { useState } from "react";
import { Send, Loader2, Mic, Image } from "lucide-react";

interface ExpenseInputProps {
  onSubmit: (text: string) => Promise<void>;
  isProcessing?: boolean;
}

export function ExpenseInput({ onSubmit, isProcessing }: ExpenseInputProps) {
  const [text, setText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || isProcessing) return;

    await onSubmit(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex flex-col gap-2">
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your expense in natural language (e.g., 'Spent $25 on lunch today')"
          className="min-h-[100px] w-full rounded-lg border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50"
          disabled={isProcessing}
        />
        <div className="absolute bottom-3 right-3 flex gap-2">
          <button
            type="button"
            className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            title="Add expense by voice"
          >
            <Mic className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            title="Upload expense memo"
          >
            <Image className="h-4 w-4" />
          </button>
        </div>
      </div>
      <button
        type="submit"
        disabled={!text.trim() || isProcessing}
        className="inline-flex items-center justify-center gap-2 self-end rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
      >
        {isProcessing ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Add Expense
          </>
        )}
      </button>
    </form>
  );
}
