import { expenseStore } from './expense-store';

type ChatResponse = {
  answer: string;
  relevantData?: any;
};

export async function processExpenseQuery(query: string): Promise<ChatResponse> {
  // Convert query to lowercase for easier matching
  const q = query.toLowerCase();
  
  // Get current date info
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  
  // Process different types of queries
  try {
    // Latest expense query
    if (q.includes('latest expense') || q.includes('last expense')) {
      const latest = await expenseStore.getLatestExpense();
      if (!latest) {
        return { answer: "You haven't recorded any expenses yet." };
      }
      return {
        answer: `Your latest expense was ${latest.description} for $${latest.amount.toFixed(2)} in the ${latest.category} category on ${latest.date}.`,
        relevantData: latest
      };
    }
    
    // Monthly spending query
    if (q.includes('spend this month') || q.includes('spent this month')) {
      const total = await expenseStore.getMonthlyTotal(currentYear, currentMonth);
      return {
        answer: `You've spent $${total.toFixed(2)} this month.`,
        relevantData: { total, month: currentMonth + 1, year: currentYear }
      };
    }
    
    // Category spending query
    const categoryMatch = q.match(/spend (?:in|on) (\w+)(?:\s+category)?/);
    if (categoryMatch) {
      const category = categoryMatch[1];
      const total = await expenseStore.getTotalByCategory(category);
      const expenses = await expenseStore.getExpensesByCategory(category);
      return {
        answer: `You've spent $${total.toFixed(2)} in the ${category} category. There are ${expenses.length} expenses in this category.`,
        relevantData: { total, category, expenseCount: expenses.length }
      };
    }
    
    // Top categories query
    if (q.includes('top categories') || q.includes('most spent')) {
      const topCategories = await expenseStore.getTopCategories(3);
      const categoriesList = topCategories
        .map(([category, amount]) => `${category} ($${amount.toFixed(2)})`)
        .join(', ');
      return {
        answer: `Your top spending categories are: ${categoriesList}`,
        relevantData: { topCategories }
      };
    }
    
    // Default response for unrecognized queries
    return {
      answer: "I'm not sure how to answer that question. Try asking about your latest expense, monthly spending, or spending in specific categories."
    };
    
  } catch (error) {
    console.error('Error processing expense query:', error);
    return {
      answer: "Sorry, I encountered an error while processing your question. Please try again."
    };
  }
}
