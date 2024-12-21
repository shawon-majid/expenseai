export interface Budget {
  id: string;
  amount: number;
  category?: string;  // Optional for monthly budgets
  startDate: string;  // ISO date string
  endDate: string;    // ISO date string
  type: 'monthly' | 'category';
}

export interface BudgetSummary {
  id: string;
  amount: number;
  spent: number;
  remaining: number;
  category?: string;
  startDate: string;
  endDate: string;
  type: 'monthly' | 'category';
  progress: number;  // Percentage of budget used
}
