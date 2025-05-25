import React, { useState } from 'react';
import { Expense } from '../../types';
import ExpenseCard from './ExpenseCard';
import Loader from '../ui/Loader';
import { Search, Filter } from 'lucide-react';

interface ExpenseListProps {
  expenses: Expense[];
  isLoading: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({
  expenses,
  isLoading,
  onEdit,
  onDelete,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          expense.note?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || expense.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const uniqueCategories = Array.from(new Set(expenses.map(expense => expense.category)));

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader size="large" />
      </div>
    );
  }

  if (expenses.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No expenses yet. Add your first expense!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={20} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search expenses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <div className="relative inline-block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter size={20} className="text-gray-400" />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pr-8"
          >
            <option value="all">All Categories</option>
            {uniqueCategories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredExpenses.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No expenses match your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredExpenses.map((expense) => (
            <ExpenseCard
              key={expense.id}
              expense={expense}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpenseList;