import React from 'react';
import { 
  ShoppingBag, 
  Coffee, 
  Car, 
  Film, 
  Home, 
  Droplet, 
  Heart, 
  GraduationCap, 
  Plane, 
  HelpCircle 
} from 'lucide-react';
import { ExpenseCategory } from '../types';

export const getCategoryIcon = (category: ExpenseCategory) => {
  const icons = {
    food: Coffee,
    transport: Car,
    entertainment: Film,
    shopping: ShoppingBag,
    housing: Home,
    utilities: Droplet,
    healthcare: Heart,
    education: GraduationCap,
    travel: Plane,
    other: HelpCircle,
  };

  return icons[category];
};

export const getCategoryColor = (category: ExpenseCategory): string => {
  const colors = {
    food: 'bg-green-600',
    transport: 'bg-blue-600',
    entertainment: 'bg-purple-600',
    shopping: 'bg-pink-600',
    housing: 'bg-indigo-600',
    utilities: 'bg-blue-400',
    healthcare: 'bg-red-600',
    education: 'bg-amber-600',
    travel: 'bg-teal-600',
    other: 'bg-gray-600',
  };

  return colors[category];
};