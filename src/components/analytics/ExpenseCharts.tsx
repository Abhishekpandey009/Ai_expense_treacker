import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Pie, Bar } from 'react-chartjs-2';
import { Card, CardHeader, CardBody } from '../ui/Card';
import { ChartData } from '../../types';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface ExpenseChartsProps {
  categoryData: ChartData;
  timelineData: ChartData;
}

const ExpenseCharts: React.FC<ExpenseChartsProps> = ({
  categoryData,
  timelineData,
}) => {
  // Category Pie Chart
  const pieChartData = {
    labels: categoryData.labels,
    datasets: [
      {
        data: categoryData.values,
        backgroundColor: [
          '#3B82F6', // blue
          '#10B981', // green
          '#F59E0B', // amber
          '#EF4444', // red
          '#8B5CF6', // purple
          '#EC4899', // pink
          '#6366F1', // indigo
          '#14B8A6', // teal
          '#F97316', // orange
          '#6B7280', // gray
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: $${value.toFixed(2)} (${percentage}%)`;
          }
        }
      }
    },
  };

  // Timeline Line Chart
  const lineChartData = {
    labels: timelineData.labels,
    datasets: [
      {
        label: 'Expenses Over Time',
        data: timelineData.values,
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.3,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `$${context.raw.toFixed(2)}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return '$' + value;
          }
        }
      }
    },
  };

  // Monthly Bar Chart (using the same timeline data)
  const barChartData = {
    labels: timelineData.labels,
    datasets: [
      {
        label: 'Monthly Expenses',
        data: timelineData.values,
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `$${context.raw.toFixed(2)}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return '$' + value;
          }
        }
      }
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <h3 className="text-lg font-medium">Expenses by Category</h3>
        </CardHeader>
        <CardBody>
          <div className="h-64">
            <Pie data={pieChartData} options={pieChartOptions} />
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-medium">Spending Timeline</h3>
        </CardHeader>
        <CardBody>
          <div className="h-64">
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
        </CardBody>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <h3 className="text-lg font-medium">Monthly Breakdown</h3>
        </CardHeader>
        <CardBody>
          <div className="h-64">
            <Bar data={barChartData} options={barChartOptions} />
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ExpenseCharts;