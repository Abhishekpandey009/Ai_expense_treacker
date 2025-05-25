export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
  note?: string;
  currency: string;
}

export type ExpenseCategory = 
  | 'food' 
  | 'transport' 
  | 'entertainment' 
  | 'shopping' 
  | 'housing' 
  | 'utilities' 
  | 'healthcare' 
  | 'education' 
  | 'travel' 
  | 'other';

export interface ExpenseSummary {
  totalExpenses: number;
  categorySummary: Record<ExpenseCategory, number>;
  monthlyTotal: number;
  monthlyAverage: number;
  topCategory: {
    name: ExpenseCategory;
    amount: number;
    percentage: number;
  };
}

export interface ChartData {
  labels: string[];
  values: number[];
}

export interface Currency {
  code: string;
  symbol: string;
  name: string;
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
}