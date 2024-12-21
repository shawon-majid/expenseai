'use client';

import { useEffect, useState } from 'react';
import { BudgetSummary } from '@/lib/budget/budget-types';
import { budgetStore } from '@/lib/budget/budget-store';
import { BudgetCard } from '@/components/budget/budget-card';
import { BudgetForm } from '@/components/budget/budget-form';
import { Button } from '@/components/ui/button';
import { DashboardNav } from "@/components/dashboard/nav";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState<BudgetSummary[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadBudgets = async () => {
    try {
      const summaries = await budgetStore.getBudgetSummaries();
      setBudgets(summaries);
    } catch (error) {
      console.error('Failed to load budgets:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBudgets();
  }, []);

  const handleSuccess = () => {
    setIsOpen(false);
    loadBudgets();
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const chartData = budgets.map(budget => ({
    name: budget.category,
    Budget: budget.amount,
    Spent: budget.spent,
    Available: Math.max(0, budget.amount - budget.spent)
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border">
          <p className="font-semibold mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      <main className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Budgets</h1>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>Add Budget</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Budget</DialogTitle>
              </DialogHeader>
              <BudgetForm onSuccess={handleSuccess} />
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading budgets...</p>
          </div>
        ) : budgets.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No budgets set. Create one to start tracking your spending!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6 max-h-[calc(100vh-12rem)] overflow-y-auto pr-4">
              {budgets.map(budget => (
                <BudgetCard 
                  key={budget.id} 
                  budget={budget} 
                  onUpdate={loadBudgets}
                />
              ))}
            </div>
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Budget Overview</h2>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fill: '#6b7280' }}
                      axisLine={{ stroke: '#e5e7eb' }}
                    />
                    <YAxis 
                      tick={{ fill: '#6b7280' }}
                      axisLine={{ stroke: '#e5e7eb' }}
                      tickFormatter={formatCurrency}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar 
                      dataKey="Budget" 
                      fill="#60a5fa"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar 
                      dataKey="Spent" 
                      fill="#f87171"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar 
                      dataKey="Available" 
                      fill="#34d399"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
