"use client";

import { useState } from "react";
import { DashboardNav } from "@/components/dashboard/nav";
import { ExpenseInput } from "@/components/dashboard/expense-input";
import { ExpenseTable } from "@/components/dashboard/expense-table";
import { processExpenseText, updateExpenseText, type Expense } from "@/lib/expense/process-expense";

export default function DashboardPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAddExpense = async (text: string) => {
    setIsProcessing(true);
    try {
      const expense = await processExpenseText(text);
      setExpenses((prev) => [expense, ...prev]);
    } catch (error) {
      console.error("Failed to process expense:", error);
      // TODO: Add proper error handling
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUpdateExpense = async (id: string, text: string) => {
    const expense = expenses.find((e) => e.id === id);
    if (!expense) return;

    try {
      const updated = await updateExpenseText(expense, text);
      setExpenses((prev) => prev.map((e) => (e.id === id ? updated : e)));
    } catch (error) {
      console.error("Failed to update expense:", error);
      // TODO: Add proper error handling
    }
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      <main className="container py-6">
        <div className="grid grid-cols-1 md:grid-cols-[400px_1fr] gap-6">
          <div className="bg-card rounded-lg p-6 h-fit">
            <h1 className="mb-2 text-2xl font-bold">Add Expense</h1>
            <p className="mb-4 text-sm text-muted-foreground">
              Enter your expense in natural language, like &quot;Spent $25 on lunch today&quot; or
              &quot;Paid $50 for gas yesterday&quot;
            </p>
            <ExpenseInput onSubmit={handleAddExpense} isProcessing={isProcessing} />
          </div>

          <ExpenseTable
            expenses={expenses}
            onDelete={handleDeleteExpense}
            onUpdate={handleUpdateExpense}
          />
        </div>
      </main>
    </div>
  );
}
