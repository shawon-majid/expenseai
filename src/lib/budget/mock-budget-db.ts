import { Budget } from './budget-types';
import { v4 as uuidv4 } from 'uuid';

// Initial mock data
const mockBudgets: Budget[] = [
  {
    id: uuidv4(),
    amount: 1000,
    type: 'monthly',
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString(),
    endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString(),
  },
  {
    id: uuidv4(),
    amount: 300,
    category: 'Food',
    type: 'category',
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString(),
    endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString(),
  },
];

class MockBudgetDatabase {
  private budgets: Budget[] = [...mockBudgets];

  async getAllBudgets(): Promise<Budget[]> {
    return [...this.budgets];
  }

  async addBudget(budget: Budget): Promise<Budget> {
    this.budgets.push(budget);
    return budget;
  }

  async updateBudget(id: string, updates: Partial<Budget>): Promise<Budget | null> {
    const index = this.budgets.findIndex(b => b.id === id);
    if (index === -1) return null;

    this.budgets[index] = { ...this.budgets[index], ...updates };
    return this.budgets[index];
  }

  async deleteBudget(id: string): Promise<boolean> {
    const initialLength = this.budgets.length;
    this.budgets = this.budgets.filter(b => b.id !== id);
    return initialLength > this.budgets.length;
  }
}

export const mockBudgetDb = new MockBudgetDatabase();
