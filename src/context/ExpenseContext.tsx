import React, { createContext, useContext, useState, useEffect } from 'react';
import { Expense, ExpenseCategory } from '../types';
import { mockExpenses, classifyExpense } from '../data/mockData';

interface ExpenseContextType {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  updateExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
  getExpenseById: (id: string) => Expense | undefined;
  classifyExpenseTitle: (title: string) => ExpenseCategory;
  isLoading: boolean;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
};

export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchExpenses = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        setExpenses(mockExpenses);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  const addExpense = (newExpense: Omit<Expense, 'id'>) => {
    const expense: Expense = {
      ...newExpense,
      id: `exp-${Date.now()}`
    };
    setExpenses(prev => [expense, ...prev]);
  };

  const updateExpense = (updatedExpense: Expense) => {
    setExpenses(prev => 
      prev.map(expense => 
        expense.id === updatedExpense.id ? updatedExpense : expense
      )
    );
  };

  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  const getExpenseById = (id: string) => {
    return expenses.find(expense => expense.id === id);
  };

  const classifyExpenseTitle = (title: string): ExpenseCategory => {
    return classifyExpense(title);
  };

  const value = {
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
    getExpenseById,
    classifyExpenseTitle,
    isLoading
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
};