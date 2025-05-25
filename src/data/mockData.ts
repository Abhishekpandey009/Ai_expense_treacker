import { Expense, ExpenseCategory } from '../types';
import { format, subDays } from 'date-fns';

// Generate random expenses for the past 30 days
const generateMockExpenses = (): Expense[] => {
  const categories: ExpenseCategory[] = [
    'food', 'transport', 'entertainment', 'shopping', 
    'housing', 'utilities', 'healthcare', 'education', 
    'travel', 'other'
  ];
  
  const expenseTitles: Record<ExpenseCategory, string[]> = {
    food: ['Grocery Shopping', 'Restaurant Dinner', 'Coffee Shop', 'Fast Food', 'Food Delivery'],
    transport: ['Uber Ride', 'Gas Station', 'Public Transport', 'Car Maintenance', 'Parking Fee'],
    entertainment: ['Movie Tickets', 'Concert', 'Game Subscription', 'Streaming Service', 'Sports Event'],
    shopping: ['Clothing Store', 'Electronics', 'Online Purchase', 'Home Goods', 'Gift Shop'],
    housing: ['Rent Payment', 'Mortgage', 'Home Insurance', 'Property Tax', 'Home Repairs'],
    utilities: ['Electricity Bill', 'Water Bill', 'Internet Bill', 'Phone Bill', 'Gas Bill'],
    healthcare: ['Doctor Visit', 'Prescription', 'Health Insurance', 'Gym Membership', 'Dental Care'],
    education: ['Course Fee', 'Books', 'Tuition', 'School Supplies', 'Online Learning'],
    travel: ['Flight Tickets', 'Hotel Booking', 'Travel Insurance', 'Car Rental', 'Vacation Package'],
    other: ['Miscellaneous', 'Donation', 'Subscription', 'Service Fee', 'Other Expense']
  };

  const expenses: Expense[] = [];

  // Generate 50 random expenses
  for (let i = 0; i < 50; i++) {
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const randomTitle = expenseTitles[randomCategory][Math.floor(Math.random() * expenseTitles[randomCategory].length)];
    const randomAmount = parseFloat((Math.random() * 200 + 10).toFixed(2));
    const randomDate = format(subDays(new Date(), Math.floor(Math.random() * 30)), 'yyyy-MM-dd');

    expenses.push({
      id: `exp-${i + 1}`,
      title: randomTitle,
      amount: randomAmount,
      category: randomCategory,
      date: randomDate,
      note: Math.random() > 0.5 ? `Note for ${randomTitle}` : undefined
    });
  }

  // Sort by date, newest first
  return expenses.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const mockExpenses = generateMockExpenses();

// Mock AI expense classification function
export const classifyExpense = (title: string): ExpenseCategory => {
  const titleLower = title.toLowerCase();
  
  if (titleLower.includes('grocery') || titleLower.includes('restaurant') || 
      titleLower.includes('food') || titleLower.includes('coffee') || 
      titleLower.includes('dinner') || titleLower.includes('lunch')) {
    return 'food';
  }
  
  if (titleLower.includes('uber') || titleLower.includes('taxi') || 
      titleLower.includes('gas') || titleLower.includes('transport') || 
      titleLower.includes('car') || titleLower.includes('bus')) {
    return 'transport';
  }
  
  if (titleLower.includes('movie') || titleLower.includes('game') || 
      titleLower.includes('netflix') || titleLower.includes('concert') || 
      titleLower.includes('entertainment')) {
    return 'entertainment';
  }
  
  if (titleLower.includes('shopping') || titleLower.includes('amazon') || 
      titleLower.includes('store') || titleLower.includes('buy') || 
      titleLower.includes('purchase')) {
    return 'shopping';
  }
  
  if (titleLower.includes('rent') || titleLower.includes('mortgage') || 
      titleLower.includes('house') || titleLower.includes('apartment')) {
    return 'housing';
  }
  
  if (titleLower.includes('bill') || titleLower.includes('electricity') || 
      titleLower.includes('water') || titleLower.includes('internet') || 
      titleLower.includes('phone')) {
    return 'utilities';
  }
  
  if (titleLower.includes('doctor') || titleLower.includes('health') || 
      titleLower.includes('medical') || titleLower.includes('dental') || 
      titleLower.includes('pharmacy')) {
    return 'healthcare';
  }
  
  if (titleLower.includes('tuition') || titleLower.includes('course') || 
      titleLower.includes('book') || titleLower.includes('school') || 
      titleLower.includes('education')) {
    return 'education';
  }
  
  if (titleLower.includes('flight') || titleLower.includes('hotel') || 
      titleLower.includes('travel') || titleLower.includes('vacation') || 
      titleLower.includes('trip')) {
    return 'travel';
  }
  
  return 'other';
};

// Mock AI-generated monthly summary
export const generateAISummary = (month: string): string => {
  return `
    Based on your spending for ${month}, you've spent most on Housing (32%) followed by Food (23%). 
    Your total spending is 12% higher than last month, with notable increases in Entertainment (+28%) and Shopping (+15%).
    You could save approximately $120 next month by reducing discretionary spending on coffee shops and subscription services.
    I notice you've been spending consistently on transportation. Consider carpooling or public transit to reduce these expenses.
  `;
};