import { Expense } from './process-expense';
import { v4 as uuidv4 } from 'uuid';

// Mock database initial data
export const mockExpenses: Expense[] = [
  {
    id: uuidv4(),
    description: "Lunch at Italian Restaurant",
    amount: 25.50,
    category: "Food",
    date: "2024-12-13",
  },
  {
    id: uuidv4(),
    description: "Monthly Bus Pass",
    amount: 60.00,
    category: "Transport",
    date: "2024-12-12",
  },
  {
    id: uuidv4(),
    description: "Netflix Subscription",
    amount: 15.99,
    category: "Entertainment",
    date: "2024-12-10",
  },
];

// Mock database class
class MockDatabase {
  private expenses: Expense[] = [...mockExpenses];

  async getAllExpenses(): Promise<Expense[]> {
    // sort by date
    this.expenses.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
    return [...this.expenses];
  }

  async addExpense(expense: Expense): Promise<Expense> {
    this.expenses.unshift(expense);
    return expense;
  }

  async updateExpense(id: string, updatedExpense: Partial<Expense>): Promise<Expense | null> {
    const index = this.expenses.findIndex(e => e.id === id);
    if (index === -1) return null;
    
    this.expenses[index] = { ...this.expenses[index], ...updatedExpense };
    return this.expenses[index];
  }

  async deleteExpense(id: string): Promise<boolean> {
    const initialLength = this.expenses.length;
    this.expenses = this.expenses.filter(e => e.id !== id);
    return initialLength > this.expenses.length;
  }

  async getExpensesByCategory(category: string): Promise<Expense[]> {
    return this.expenses.filter(e => 
      e.category.toLowerCase() === category.toLowerCase()
    );
  }

  async getExpensesByDateRange(startDate: string, endDate: string): Promise<Expense[]> {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return this.expenses.filter(e => {
      const date = new Date(e.date);
      return date >= start && date <= end;
    });
  }
}

// Export a single instance to be used across the application
export const mockDb = new MockDatabase();
