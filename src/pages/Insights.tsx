import React, { useState } from 'react';
import { format } from 'date-fns';
import PageHeader from '../components/layout/PageHeader';
import { Card, CardHeader, CardBody } from '../components/ui/Card';
import AISummary from '../components/insights/AISummary';
import { Brain, Lightbulb, TrendingUp } from 'lucide-react';

const Insights: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState(format(new Date(), 'MMMM yyyy'));
  
  // Mock months for the dropdown
  const months = [
    format(new Date(), 'MMMM yyyy'),
    format(new Date(new Date().setMonth(new Date().getMonth() - 1)), 'MMMM yyyy'),
    format(new Date(new Date().setMonth(new Date().getMonth() - 2)), 'MMMM yyyy'),
  ];
  
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="AI Insights"
        subtitle="AI-powered analysis of your spending habits"
        rightContent={
          <select 
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        }
      />
      
      <div className="mt-6">
        <AISummary month={selectedMonth} />
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="border-b border-gray-200">
            <div className="flex items-center">
              <TrendingUp className="text-blue-600 mr-2" size={20} />
              <h3 className="text-lg font-medium">Spending Trends</h3>
            </div>
          </CardHeader>
          <CardBody>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-600 mr-3">
                  <TrendingUp size={14} />
                </span>
                <div>
                  <p className="font-medium">Food expenses decreased by 15%</p>
                  <p className="text-sm text-gray-500">Your efforts to cook at home more often are paying off!</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-red-100 text-red-600 mr-3">
                  <TrendingUp size={14} className="transform rotate-180" />
                </span>
                <div>
                  <p className="font-medium">Entertainment spending increased by 28%</p>
                  <p className="text-sm text-gray-500">Consider setting a budget for entertainment activities.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600 mr-3">
                  <TrendingUp size={14} className="transform -rotate-45" />
                </span>
                <div>
                  <p className="font-medium">Transportation costs are stable</p>
                  <p className="text-sm text-gray-500">Your transportation expenses have remained consistent.</p>
                </div>
              </li>
            </ul>
          </CardBody>
        </Card>
        
        <Card>
          <CardHeader className="border-b border-gray-200">
            <div className="flex items-center">
              <Lightbulb className="text-amber-500 mr-2" size={20} />
              <h3 className="text-lg font-medium">Smart Suggestions</h3>
            </div>
          </CardHeader>
          <CardBody>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-amber-100 text-amber-600 mr-3">
                  <Lightbulb size={14} />
                </span>
                <div>
                  <p className="font-medium">Consider meal planning</p>
                  <p className="text-sm text-gray-500">Planning meals in advance could help reduce your food expenses by an estimated 20%.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-amber-100 text-amber-600 mr-3">
                  <Lightbulb size={14} />
                </span>
                <div>
                  <p className="font-medium">Review subscription services</p>
                  <p className="text-sm text-gray-500">You're spending $45/month on subscriptions you rarely use.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-amber-100 text-amber-600 mr-3">
                  <Lightbulb size={14} />
                </span>
                <div>
                  <p className="font-medium">Set a shopping budget</p>
                  <p className="text-sm text-gray-500">Creating a dedicated shopping budget could help you save approximately $120 next month.</p>
                </div>
              </li>
            </ul>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Insights;