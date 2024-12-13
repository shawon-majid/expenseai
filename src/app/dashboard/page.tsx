"use client";

import { useEffect, useState } from "react";
import { DashboardNav } from "@/components/dashboard/nav";
import { ExpenseInput } from "@/components/dashboard/expense-input";
import { ExpenseTable } from "@/components/dashboard/expense-table";
import { ExpenseSummary } from "@/components/dashboard/expense-summary";
import { processExpenseText, updateExpenseText, type Expense } from "@/lib/expense/process-expense";
import { expenseStore } from "@/lib/expense/expense-store";

export default function DashboardPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load initial expenses
    const loadExpenses = async () => {
      try {
        const data = await expenseStore.getAllExpenses();
        // Sort expenses by date in descending order (newest first)
        const sortedData = [...data].sort((a, b) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setExpenses(sortedData);
      } catch (error) {
        console.error("Failed to load expenses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadExpenses();
  }, []);

  const handleAddExpense = async (text: string) => {
    setIsProcessing(true);
    try {
      const expense = await processExpenseText(text);
      const addedExpense = await expenseStore.addExpense(expense);
      // Add new expense and sort by date in descending order
      setExpenses((prev) => {
        const newExpenses = [addedExpense, ...prev];
        return newExpenses;
      });
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
      await expenseStore.updateExpense(id, updated);
      setExpenses((prev) => prev.map((e) => (e.id === id ? updated : e)));
    } catch (error) {
      console.error("Failed to update expense:", error);
      // TODO: Add proper error handling
    }
  };

  const handleDeleteExpense = async (id: string) => {
    try {
      await expenseStore.deleteExpense(id);
      setExpenses((prev) => prev.filter((e) => e.id !== id));
    } catch (error) {
      console.error("Failed to delete expense:", error);
      // TODO: Add proper error handling
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardNav />
        <main className="container py-6">
          <div className="flex items-center justify-center h-[400px]">
            <div className="space-y-4 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
              <p className="text-sm text-muted-foreground">Loading expenses...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      <main className="container py-6">
        <div className="grid grid-cols-1 md:grid-cols-[400px_1fr] gap-6">
          <div className="space-y-6">
            <div className="bg-card rounded-lg p-6">
              <h1 className="mb-4 text-2xl font-bold">Add Expense</h1>
              <ExpenseInput onSubmit={handleAddExpense} isProcessing={isProcessing} />
            </div>

            <div className="bg-card rounded-lg p-6">
              <h2 className="mb-4 text-lg font-semibold">Quick Tips</h2>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>• Use natural language like &quot;Spent $25 on lunch today&quot;</p>
                <p>• Include dates: &quot;Paid $50 for gas yesterday&quot;</p>
                <p>• Specify categories: &quot;$100 for monthly internet bill&quot;</p>
                <p>• Update expenses by clicking the edit button</p>
              </div>

            </div>
          </div>

          <div className="space-y-6">
            <ExpenseTable
              expenses={expenses}
              onDelete={handleDeleteExpense}
              onUpdate={handleUpdateExpense}
            />
            <ExpenseSummary expenses={expenses} />
          </div>
        </div>
      </main>
    </div>
  );
}
