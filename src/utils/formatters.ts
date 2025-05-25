import { format, parseISO } from 'date-fns';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return format(date, 'MMMM d, yyyy');
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

export const formatMonth = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return format(date, 'MMMM yyyy');
  } catch (error) {
    console.error('Error formatting month:', error);
    return dateString;
  }
};