import React from 'react';
import { Card, CardBody } from '../ui/Card';
import { ArrowUpRight, ArrowDownRight, DollarSign } from 'lucide-react';
import { ExpenseSummary } from '../../types';

interface ExpenseSummaryCardProps {
  summary: ExpenseSummary;
}

const ExpenseSummaryCard: React.FC<ExpenseSummaryCardProps> = ({ summary }) => {
  const {
    totalExpenses,
    monthlyTotal,
    monthlyAverage,
    topCategory,
  } = summary;
  
  // Mock change percentage (would come from actual data in a real app)
  const changePercentage = 12.3;
  const isPositiveChange = changePercentage > 0;
  
  return (
    <Card>
      <CardBody>
        <div className="flex flex-col space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Expenses */}
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-500">Total Expenses</span>
              <div className="mt-1 flex items-baseline">
                <span className="text-2xl font-semibold text-gray-900">${totalExpenses.toFixed(2)}</span>
              </div>
            </div>
            
            {/* Monthly Total */}
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-500">This Month</span>
              <div className="mt-1 flex items-baseline">
                <span className="text-2xl font-semibold text-gray-900">${monthlyTotal.toFixed(2)}</span>
                <span className={`ml-2 text-sm font-medium ${isPositiveChange ? 'text-red-600' : 'text-green-600'}`}>
                  {isPositiveChange ? (
                    <span className="flex items-center">
                      <ArrowUpRight size={16} className="mr-1" />
                      {changePercentage}%
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <ArrowDownRight size={16} className="mr-1" />
                      {Math.abs(changePercentage)}%
                    </span>
                  )}
                </span>
              </div>
              <span className="mt-1 text-sm text-gray-500">vs. last month</span>
            </div>
            
            {/* Monthly Average */}
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-500">Monthly Average</span>
              <div className="mt-1 flex items-baseline">
                <span className="text-2xl font-semibold text-gray-900">${monthlyAverage.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          {/* Top Category */}
          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-500">Top Spending Category</h3>
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                  <DollarSign size={16} />
                </div>
                <div className="ml-3">
                  <span className="text-sm font-medium text-gray-900 capitalize">{topCategory.name}</span>
                  <div className="text-xs text-gray-500">{topCategory.percentage.toFixed(0)}% of total spending</div>
                </div>
              </div>
              <span className="text-lg font-semibold text-gray-900">${topCategory.amount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ExpenseSummaryCard;