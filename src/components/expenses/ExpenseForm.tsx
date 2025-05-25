import React, { useState, useEffect } from 'react';
import { Expense, ExpenseCategory } from '../../types';
import { useExpenses } from '../../context/ExpenseContext';
import { getCategoryIcon, getCategoryColor } from '../../utils/categoryUtils';
import Button from '../ui/Button';
import { format } from 'date-fns';
import { Camera } from 'lucide-react';
import ReceiptScanner from './ReceiptScanner';

interface ExpenseFormProps {
  expense?: Expense;
  onSubmit: () => void;
  onCancel?: () => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({
  expense,
  onSubmit,
  onCancel,
}) => {
  const { addExpense, updateExpense, classifyExpenseTitle } = useExpenses();
  const [title, setTitle] = useState(expense?.title || '');
  const [amount, setAmount] = useState(expense?.amount.toString() || '');
  const [category, setCategory] = useState<ExpenseCategory>(expense?.category || 'other');
  const [date, setDate] = useState(expense?.date || format(new Date(), 'yyyy-MM-dd'));
  const [note, setNote] = useState(expense?.note || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  const categories: ExpenseCategory[] = [
    'food', 'transport', 'entertainment', 'shopping', 
    'housing', 'utilities', 'healthcare', 'education', 
    'travel', 'other'
  ];

  useEffect(() => {
    if (title.length > 3 && !expense) {
      const suggestedCategory = classifyExpenseTitle(title);
      setCategory(suggestedCategory);
    }
  }, [title, classifyExpenseTitle, expense]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const expenseData = {
      title,
      amount: parseFloat(amount),
      category,
      date,
      note: note || undefined,
    };

    try {
      if (expense) {
        updateExpense({ ...expenseData, id: expense.id });
      } else {
        addExpense(expenseData);
      }
      onSubmit();
    } catch (error) {
      console.error('Error saving expense:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleScanComplete = (data: { amount?: number; date?: string; title?: string }) => {
    if (data.amount) setAmount(data.amount.toString());
    if (data.date) setDate(data.date);
    if (data.title) setTitle(data.title);
    setShowScanner(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-between items-center">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowScanner(true)}
            leftIcon={<Camera size={16} />}
          >
            Scan Receipt
          </Button>
        </div>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="What did you spend on?"
          required
        />

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="pl-7 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="0.00"
              step="0.01"
              min="0"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {categories.map((cat) => {
              const CategoryIcon = getCategoryIcon(cat);
              const categoryColor = getCategoryColor(cat);
              const isSelected = category === cat;
              
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`
                    flex flex-col items-center p-2 rounded-md border transition-all
                    ${isSelected 
                      ? `${categoryColor} text-white border-transparent` 
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}
                  `}
                >
                  <CategoryIcon size={18} />
                  <span className="mt-1 text-xs capitalize">
                    {cat}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="note" className="block text-sm font-medium text-gray-700">
            Note (Optional)
          </label>
          <textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Add any details about this expense..."
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
            >
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            isLoading={isSubmitting}
            disabled={!title || !amount || parseFloat(amount) <= 0}
          >
            {expense ? 'Update Expense' : 'Add Expense'}
          </Button>
        </div>
      </form>

      {showScanner && (
        <ReceiptScanner
          onScanComplete={handleScanComplete}
          onClose={() => setShowScanner(false)}
        />
      )}
    </>
  );
};

export default ExpenseForm;