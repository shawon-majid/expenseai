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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {budgets.map(budget => (
              <BudgetCard 
                key={budget.id} 
                budget={budget} 
                onUpdate={loadBudgets}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
