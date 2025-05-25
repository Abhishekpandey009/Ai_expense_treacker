import { Expense, ExpenseCategory, ExpenseSummary, ChartData } from '../types';
import { format, parseISO, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';

export const calculateExpenseSummary = (expenses: Expense[]): ExpenseSummary => {
  // Calculate total expenses
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  // Calculate category summary
  const categorySummary = expenses.reduce((summary, expense) => {
    const { category, amount } = expense;
    summary[category] = (summary[category] || 0) + amount;
    return summary;
  }, {} as Record<ExpenseCategory, number>);
  
  // Find top category
  let topCategoryName: ExpenseCategory = 'other';
  let topCategoryAmount = 0;
  
  Object.entries(categorySummary).forEach(([category, amount]) => {
    if (amount > topCategoryAmount) {
      topCategoryName = category as ExpenseCategory;
      topCategoryAmount = amount;
    }
  });
  
  // Calculate this month's expenses
  const now = new Date();
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);
  
  const monthlyExpenses = expenses.filter(expense => {
    const expenseDate = parseISO(expense.date);
    return isWithinInterval(expenseDate, { start: monthStart, end: monthEnd });
  });
  
  const monthlyTotal = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  // Calculate monthly average (simplified)
  const monthlyAverage = totalExpenses / 3; // Assuming data for 3 months for the mock
  
  return {
    totalExpenses,
    categorySummary,
    monthlyTotal,
    monthlyAverage,
    topCategory: {
      name: topCategoryName,
      amount: topCategoryAmount,
      percentage: (topCategoryAmount / totalExpenses) * 100,
    },
  };
};

export const getCategoryChartData = (expenses: Expense[]): ChartData => {
  const categoryMap: Record<string, number> = {};
  
  expenses.forEach(expense => {
    const { category, amount } = expense;
    categoryMap[category] = (categoryMap[category] || 0) + amount;
  });
  
  const sortedCategories = Object.entries(categoryMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10); // Top 10 categories
  
  return {
    labels: sortedCategories.map(([category]) => 
      category.charAt(0).toUpperCase() + category.slice(1)
    ),
    values: sortedCategories.map(([, amount]) => amount),
  };
};

export const getTimelineChartData = (expenses: Expense[]): ChartData => {
  const timelineMap: Record<string, number> = {};
  
  // Group expenses by month
  expenses.forEach(expense => {
    const date = parseISO(expense.date);
    const monthKey = format(date, 'MMM yyyy');
    
    timelineMap[monthKey] = (timelineMap[monthKey] || 0) + expense.amount;
  });
  
  // Sort by date
  const sortedMonths = Object.keys(timelineMap).sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateA.getTime() - dateB.getTime();
  });
  
  return {
    labels: sortedMonths,
    values: sortedMonths.map(month => timelineMap[month]),
  };
};