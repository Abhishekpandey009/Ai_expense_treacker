import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardBody } from '../components/ui/Card';
import ExpenseForm from '../components/expenses/ExpenseForm';
import PageHeader from '../components/layout/PageHeader';

const AddExpense: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Add New Expense"
        subtitle="Record a new expense with details"
      />
      
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Expense Details</h2>
            <p className="text-sm text-gray-500">
              Fill out the form below to add a new expense
            </p>
          </CardHeader>
          <CardBody>
            <ExpenseForm
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default AddExpense;