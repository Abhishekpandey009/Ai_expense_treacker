import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useExpenses } from '../context/ExpenseContext';
import PageHeader from '../components/layout/PageHeader';
import ExpenseCharts from '../components/analytics/ExpenseCharts';
import Loader from '../components/ui/Loader';
import { getCategoryChartData, getTimelineChartData } from '../utils/expenseAnalytics';

const Analytics: React.FC = () => {
  const { t } = useTranslation();
  const { expenses, isLoading } = useExpenses();
  
  const categoryData = useMemo(() => {
    return getCategoryChartData(expenses);
  }, [expenses]);
  
  const timelineData = useMemo(() => {
    return getTimelineChartData(expenses);
  }, [expenses]);
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
        <Loader size="large" />
      </div>
    );
  }
  
  if (expenses.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <PageHeader
          title={t('analytics.title')}
          subtitle={t('analytics.subtitle')}
        />
        <div className="text-center py-12">
          <p className="text-gray-500">{t('analytics.noExpenses')}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title={t('analytics.title')}
        subtitle={t('analytics.subtitle')}
      />
      
      <div className="mt-6">
        <ExpenseCharts
          categoryData={categoryData}
          timelineData={timelineData}
        />
      </div>
    </div>
  );
};

export default Analytics;