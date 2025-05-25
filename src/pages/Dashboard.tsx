import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExpenses } from '../context/ExpenseContext';
import { Plus } from 'lucide-react';
import ExpenseList from '../components/expenses/ExpenseList';
import ExpenseSummaryCard from '../components/analytics/ExpenseSummaryCard';
import PageHeader from '../components/layout/PageHeader';
import Button from '../components/ui/Button';
import { calculateExpenseSummary } from '../utils/expenseAnalytics';
import { format } from 'date-fns';

const Dashboard: React.FC = () => {
  const { expenses, isLoading, deleteExpense } = useExpenses();
  const navigate = useNavigate();
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  
  const summary = calculateExpenseSummary(expenses);
  const currentMonth = format(new Date(), 'MMMM yyyy');

  const handleAddExpense = () => {
    navigate('/add');
  };

  const handleEditExpense = (id: string) => {
    navigate(`/edit/${id}`);
  };

  const handleDeleteExpense = (id: string) => {
    setDeleteConfirmId(id);
  };

  const confirmDelete = () => {
    if (deleteConfirmId) {
      deleteExpense(deleteConfirmId);
      setDeleteConfirmId(null);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmId(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Dashboard"
        subtitle={`Manage your expenses - ${currentMonth}`}
        rightContent={
          <Button
            onClick={handleAddExpense}
            leftIcon={<Plus size={16} />}
          >
            Add Expense
          </Button>
        }
      />

      <div className="mb-8">
        <ExpenseSummaryCard summary={summary} />
      </div>

      <h2 className="text-xl font-semibold mb-4">Recent Expenses</h2>
      <ExpenseList
        expenses={expenses.slice(0, 10)} // Show only 10 most recent expenses
        isLoading={isLoading}
        onEdit={handleEditExpense}
        onDelete={handleDeleteExpense}
      />

      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this expense? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={cancelDelete}>
                Cancel
              </Button>
              <Button variant="danger" onClick={confirmDelete}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;