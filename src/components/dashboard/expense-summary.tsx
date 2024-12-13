"use client";

import { useMemo } from "react";
import { DollarSign, TrendingUp, TrendingDown, Calendar } from "lucide-react";
import type { Expense } from "@/lib/expense/process-expense";

interface ExpenseSummaryProps {
  expenses: Expense[];
}

export function ExpenseSummary({ expenses }: ExpenseSummaryProps) {
  const summary = useMemo(() => {
    const today = new Date();
    const thisMonth = today.getMonth();
    const thisYear = today.getFullYear();
    
    const monthlyExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === thisMonth && expenseDate.getFullYear() === thisYear;
    });

    const totalMonthly = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const avgPerDay = totalMonthly / (today.getDate());
    
    const categories = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);

    const topCategory = Object.entries(categories).sort((a, b) => b[1] - a[1])[0];

    return {
      totalMonthly,
      avgPerDay,
      topCategory: topCategory ? topCategory[0] : "N/A",
      totalExpenses: expenses.length
    };
  }, [expenses]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
      <div className="rounded-lg border bg-card p-4">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-primary/10 p-2">
            <DollarSign className="h-4 w-4 text-primary" />
          </div>
          <div className="space-y-0.5">
            <p className="text-sm font-medium text-muted-foreground">Monthly Spending</p>
            <p className="text-2xl font-bold">${summary.totalMonthly.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-4">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-green-500/10 p-2">
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <div className="space-y-0.5">
            <p className="text-sm font-medium text-muted-foreground">Daily Average</p>
            <p className="text-2xl font-bold">${summary.avgPerDay.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-4">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-blue-500/10 p-2">
            <TrendingDown className="h-4 w-4 text-blue-500" />
          </div>
          <div className="space-y-0.5">
            <p className="text-sm font-medium text-muted-foreground">Top Category</p>
            <p className="text-2xl font-bold">{summary.topCategory}</p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-4">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-purple-500/10 p-2">
            <Calendar className="h-4 w-4 text-purple-500" />
          </div>
          <div className="space-y-0.5">
            <p className="text-sm font-medium text-muted-foreground">Total Expenses</p>
            <p className="text-2xl font-bold">{summary.totalExpenses}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
