import React from 'react';
import { Expense } from '../../types';
import { formatDate } from '../../utils/formatters';
import { getCategoryIcon, getCategoryColor } from '../../utils/categoryUtils';
import { Card } from '../ui/Card';
import { Edit, Trash2 } from 'lucide-react';

interface ExpenseCardProps {
  expense: Expense;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const ExpenseCard: React.FC<ExpenseCardProps> = ({ 
  expense, 
  onEdit, 
  onDelete 
}) => {
  const { id, title, amount, category, date, note } = expense;
  const CategoryIcon = getCategoryIcon(category);
  const categoryColor = getCategoryColor(category);
  
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-start p-4">
        <div 
          className={`p-3 rounded-full mr-4 ${categoryColor}`}
        >
          <CategoryIcon size={20} className="text-white" />
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium text-gray-900">{title}</h3>
              <p className="text-sm text-gray-500">{formatDate(date)}</p>
            </div>
            <div className="text-lg font-semibold">
              ${amount.toFixed(2)}
            </div>
          </div>
          
          {note && (
            <p className="mt-2 text-sm text-gray-600">{note}</p>
          )}
          
          <div className="mt-3 flex items-center justify-between">
            <div>
              <span 
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColor.replace('bg-', 'bg-opacity-20 text-')}`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </span>
            </div>
            
            <div className="flex space-x-2">
              <button 
                onClick={() => onEdit(id)}
                className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
              >
                <Edit size={16} />
              </button>
              <button 
                onClick={() => onDelete(id)}
                className="p-1 text-gray-500 hover:text-red-600 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ExpenseCard;