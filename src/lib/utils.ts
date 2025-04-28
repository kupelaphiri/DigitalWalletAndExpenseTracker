import { ExpenseCategory } from "@/components/pages/ExpenseTracker";
import { Expense } from "@/hooks/useExpenses";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper function to get color classes based on category
export const getCategoryColor = (category: string): string => {
  const colorMap: Record<string, string> = {
    Food: 'bg-blue-500',
    Entertainment: 'bg-purple-500',
    Utilities: 'bg-yellow-500',
    Transport: 'bg-orange-500',
    Shopping: 'bg-pink-500',
    Housing: 'bg-green-500',
    Health: 'bg-red-500',
    Education: 'bg-indigo-500',
    Travel: 'bg-teal-500',
    Other: 'bg-gray-500'
  };
  
  return colorMap[category] || 'bg-gray-500';
};

export function parseISOString(s: any) {
  var b = s.split(/\D+/);
  return new Date(Date.UTC(b[0], --b[1], b[2])); // Only year, month, day
}

export const groupExpensesByCategory = (expenses: Expense[]): ExpenseCategory => {
  const initialCategories: ExpenseCategory = {
    Food: 0,
    Entertainment: 0,
    Utilities: 0,
    Transport: 0,
    Shopping: 0,
    Housing: 0,
    Health: 0,
    Education: 0,
    Travel: 0,
    Other: 0
  };

  return expenses.reduce((acc, expense) => {
    if (expense.category in acc) {
      acc[expense.category] += expense.amount;
    } else {
      acc.Other += expense.amount;
    }
    return acc;
  }, {...initialCategories}); 
};