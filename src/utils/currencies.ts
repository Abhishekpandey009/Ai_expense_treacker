import { Currency } from '../types';

export const currencies: Currency[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'RUB', symbol: '₽', name: 'Russian Ruble' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc' }
];

export const getCurrencySymbol = (code: string): string => {
  const currency = currencies.find(c => c.code === code);
  return currency?.symbol || code;
};

export const formatAmount = (amount: number, currencyCode: string): string => {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currencyCode
  }).format(amount);
};