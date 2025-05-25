import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useExpenses } from '../context/ExpenseContext';
import { Card, CardHeader, CardBody } from '../components/ui/Card';
import ExpenseForm from '../components/expenses/ExpenseForm';
import PageHeader from '../components/layout/PageHeader';
import Loader from '../components/ui/Loader';

const EditExpense: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getExpenseById } = useExpenses();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const expense = id ? getExpenseById(id) : undefined;

  useEffect(() => {
    if (!id) {
      setError('No expense ID provided');
      setIsLoading(false);
      return;
    }

    // Simulate loading
    const timer = setTimeout(() => {
      if (!expense) {
        setError('Expense not found');
      }
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id, expense]);

  const handleSubmit = () => {
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
        <Loader size="large" />
      </div>
    );
  }

  if (error || !expense) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error || 'Expense not found'}</p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Edit Expense"
        subtitle="Update your expense details"
      />
      
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Expense Details</h2>
            <p className="text-sm text-gray-500">
              Update the information for this expense
            </p>
          </CardHeader>
          <CardBody>
            <ExpenseForm
              expense={expense}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default EditExpense;