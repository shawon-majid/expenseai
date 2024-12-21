import { Budget, BudgetSummary } from './budget-types';
import { mockBudgetDb } from './mock-budget-db';
import { expenseStore } from '../expense/expense-store';
import { v4 as uuidv4 } from 'uuid';

class BudgetStore {
  private budgets: Budget[] = [];
  private initialized = false;

  private async initialize() {
    if (!this.initialized) {
      this.budgets = await mockBudgetDb.getAllBudgets();
      this.initialized = true;
    }
  }

  async addBudget(budget: Omit<Budget, 'id'>) {
    await this.initialize();
    const newBudget: Budget = {
      ...budget,
      id: uuidv4(),
    };
    const added = await mockBudgetDb.addBudget(newBudget);
    this.budgets.push(added);
    return added;
  }

  async getAllBudgets() {
    await this.initialize();
    return [...this.budgets];
  }

  async getBudgetSummaries(): Promise<BudgetSummary[]> {
    await this.initialize();
    const summaries: BudgetSummary[] = [];

    for (const budget of this.budgets) {
      let spent = 0;
      if (budget.type === 'monthly') {
        const expenses = await expenseStore.getExpensesByDateRange(
          budget.startDate,
          budget.endDate
        );
        spent = expenses.reduce((sum, e) => sum + e.amount, 0);
      } else {
        // Category budget
        const expenses = await expenseStore.getExpensesByDateRange(
          budget.startDate,
          budget.endDate
        );
        spent = expenses
          .filter(e => e.category === budget.category)
          .reduce((sum, e) => sum + e.amount, 0);
      }

      const remaining = Math.max(0, budget.amount - spent);
      const progress = (spent / budget.amount) * 100;

      summaries.push({
        ...budget,
        spent,
        remaining,
        progress: Math.min(progress, 100),
      });
    }

    return summaries;
  }

  async updateBudget(id: string, updates: Partial<Budget>) {
    await this.initialize();
    const updated = await mockBudgetDb.updateBudget(id, updates);
    if (!updated) throw new Error('Budget not found');
    
    const index = this.budgets.findIndex(b => b.id === id);
    if (index !== -1) {
      this.budgets[index] = updated;
    }
    return updated;
  }

  async deleteBudget(id: string) {
    await this.initialize();
    const success = await mockBudgetDb.deleteBudget(id);
    if (success) {
      this.budgets = this.budgets.filter(b => b.id !== id);
    }
    return success;
  }

  async getCurrentBudgets(): Promise<BudgetSummary[]> {
    const summaries = await this.getBudgetSummaries();
    const now = new Date();
    return summaries.filter(budget => {
      const startDate = new Date(budget.startDate);
      const endDate = new Date(budget.endDate);
      return now >= startDate && now <= endDate;
    });
  }
}

export const budgetStore = new BudgetStore();
