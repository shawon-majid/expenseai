import { Expense } from './process-expense';
import { mockDb } from './mock-db';

class ExpenseStore {
  private expenses: Expense[] = [];
  private initialized = false;

  private async initialize() {
    if (!this.initialized) {
      this.expenses = await mockDb.getAllExpenses();
      this.initialized = true;
    }
  }

  async addExpense(expense: Expense) {
    await this.initialize();
    const newExpense = await mockDb.addExpense(expense);
    this.expenses.unshift(newExpense);
    return newExpense;
  }
  
  async getAllExpenses() {
    await this.initialize();
    return [...this.expenses];
  }
  
  async getLatestExpense() {
    await this.initialize();
    return this.expenses[0] || null;
  }
  
  async getExpensesByCategory(category: string) {
    await this.initialize();
    return this.expenses.filter(e => e.category.toLowerCase() === category.toLowerCase());
  }
  
  async getExpensesByDateRange(startDate: string, endDate: string) {
    await this.initialize();
    const start = new Date(startDate);
    const end = new Date(endDate);
    return this.expenses.filter(e => {
      const date = new Date(e.date);
      return date >= start && date <= end;
    });
  }
  
  async getTotalByCategory(category: string) {
    await this.initialize();
    return this.expenses
      .filter(e => e.category.toLowerCase() === category.toLowerCase())
      .reduce((sum, e) => sum + e.amount, 0);
  }

  async updateExpense(id: string, updatedExpense: Expense) {
    await this.initialize();
    const index = this.expenses.findIndex(e => e.id === id);
    if (index === -1) throw new Error('Expense not found');
    
    const updated = await mockDb.updateExpense(id, updatedExpense);
    if (!updated) throw new Error('Failed to update expense');
    
    this.expenses[index] = updated;
    return updated;
  }
  
  async getMonthlyTotal(year: number, month: number) {
    await this.initialize();
    return this.expenses
      .filter(e => {
        const date = new Date(e.date);
        return date.getFullYear() === year && date.getMonth() === month;
      })
      .reduce((sum, e) => sum + e.amount, 0);
  }
  
  async getTopCategories(limit: number = 5) {
    await this.initialize();
    const categoryTotals = this.expenses.reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.amount;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(categoryTotals)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit);
  }

  async deleteExpense(id: string): Promise<boolean> {
    await this.initialize();
    const success = await mockDb.deleteExpense(id);
    if (success) {
      this.expenses = this.expenses.filter(e => e.id !== id);
    }
    return success;
  }
}

// Export a single instance
export const expenseStore = new ExpenseStore();
