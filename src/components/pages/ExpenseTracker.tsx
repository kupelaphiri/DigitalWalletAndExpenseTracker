// components/ExpenseTracker.tsx
import React, { useState, FC, useEffect } from 'react';
import { ChartPie, BarChart3, Plus, Calendar, Filter, TrashIcon } from 'lucide-react';
import useExpenses, { Expense } from '@/hooks/useExpenses';
import { useSelector } from 'react-redux';
import { auth_selector } from '@/store/slices/auth_slice';
import { getCategoryColor } from '@/lib/utils';
import { PieChart } from 'react-minimal-pie-chart';
import ConfirmationModal from '../modal/ConfirmationModal';

interface ExpenseCategory {
  [category: string]: number;
}

interface MonthlyExpense {
  month: string;
  amount: number;
}

interface NewExpense {
  title: string;
  amount: string;
  category: string;
  description: string;
  date: string;
}

const ExpenseTracker: FC = () => {
  // Mock data for expenses by category
  const [expensesByCategory, setExpensesByCategory] = useState<ExpenseCategory>({
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
  });
  
  // Mock data for monthly expenses
  const [monthlyExpenses, setMonthlyExpenses] = useState<MonthlyExpense[]>([
    { month: 'Jan', amount: 2150.75 },
    { month: 'Feb', amount: 1975.30 },
    { month: 'Mar', amount: 2345.60 },
    { month: 'Apr', amount: 2846.54 },
  ]);
  
  // State for view type
  const [viewType, setViewType] = useState<'category' | 'timeline'>('category');
  
  // State for time period
  const [timePeriod, setTimePeriod] = useState<'week' | 'month' | 'year'>('month');
  
  // Calculate total expenses
  const [totalExpenses, setTotalExpenses] = useState<number>(0)
  const { expenses, getExpenses, addExpense, } = useExpenses();
  const { user } = useSelector(auth_selector)

  useEffect(() => {
    getExpenses(user.id)
  }, [])
  
  // Sort categories by expense amount (descending)
  const sortedCategories = Object.entries(expensesByCategory)
    .sort((a, b) => b[1] - a[1]);
  
  // Add new expense modal
  const [showAddExpense, setShowAddExpense] = useState<boolean>(false);
  const [newExpense, setNewExpense] = useState<NewExpense>({
    title: '',
    amount: '',
    category: 'Food',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false)

  const calculateTotalExpenses = () => {
    let total = 0;
    for (let i = 0; i < expenses.length; i++) {
       total += expenses[i].amount;
     }
     setTotalExpenses(total);
 }



 const groupExpensesByCategory = (expenses: Expense[]): ExpenseCategory => {
  // Initialize with all categories set to 0
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
    // If the category exists in our accumulator, add the amount
    if (expense.category in acc) {
      acc[expense.category] += expense.amount;
    } else {
      // If it's a new category not in our initial list, add it to "Other"
      acc.Other += expense.amount;
    }
    return acc;
  }, {...initialCategories}); // Start with a copy of the initial categories
};



useEffect(() => {
  calculateTotalExpenses();
  const catgorisedExpenses = groupExpensesByCategory(expenses);
  console.log('catgorisedExpenses', catgorisedExpenses)
  setExpensesByCategory(catgorisedExpenses);
}, [expenses])
  
  const handleAddExpense = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Validate form
    if (!newExpense.amount || !newExpense.category) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Add expense to category total (in a real app this would be an API call)
    setExpensesByCategory(prev => ({
      ...prev,
      [newExpense.category]: prev[newExpense.category] + parseFloat(newExpense.amount)
    }));
    
    // Reset form and close modal
    addExpense({
      title: newExpense.title,
      amount: parseFloat(newExpense.amount),
      category: newExpense.category,
      date: newExpense.date,
      userId: user.id.toString()
    })
    setNewExpense({
      title: '',
      amount: '',
      category: 'Food',
      description: '',
      date: new Date().toISOString().split('T')[0]
    });
    setShowAddExpense(false);
    
    // Show success message
    alert('Expense added successfully!');
  };

  const handleExpenseChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setNewExpense(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Expense Tracker</h1>
      
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 flex-1">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Total Expenses</h2>
          <div className="flex justify-between items-center mb-4">
            {/* <div className="flex space-x-1">
              <button 
                className={`px-3 py-1 text-sm rounded-md ${timePeriod === 'week' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setTimePeriod('week')}
              >
                Week
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded-md ${timePeriod === 'month' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setTimePeriod('month')}
              >
                Month
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded-md ${timePeriod === 'year' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setTimePeriod('year')}
              >
                Year
              </button>
            </div> */}
            <button 
              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
              onClick={() => setShowAddExpense(true)}
            >
              <Plus size={16} />
              <span>Add Expense</span>
            </button>
          </div>
          <p className="text-4xl font-bold text-gray-800 mb-2">K{totalExpenses.toFixed(2)}</p>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar size={14} className="mr-1" />
            <span>April 1 - April 30, 2025</span>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 flex-1 flex flex-col md:flex-row justify-between">
          <div className="flex md:flex-col justify-center gap-2 mb-4 md:mb-0">
            <button 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${viewType === 'category' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setViewType('category')}
            >
              <ChartPie size={18} />
              <span>By Category</span>
            </button>
            <button 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${viewType === 'timeline' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setViewType('timeline')}
            >
              <BarChart3 size={18} />
              <span>Timeline</span>
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div className="bg-blue-50 px-3 py-1 rounded-full text-sm text-blue-600 flex items-center">
              <span className="font-medium mr-1">Top:</span> Housing
            </div>
            <div className="bg-green-50 px-3 py-1 rounded-full text-sm text-green-600 flex items-center">
              <span className="font-medium mr-1">Lowest:</span> Travel
            </div>
          </div>
        </div>
      </div>
      
      {viewType === 'category' ? (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Expense Distribution</h2>
            <button className="flex items-center text-gray-500 hover:text-gray-700">
              <Filter size={16} className="mr-1" />
              <span>Filter</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="col-span-1 flex justify-center items-center">
              <div className="w-48 h-48 rounded-full bg-gray-100 flex items-center justify-center">
                <ChartPie size={60} className="text-blue-500 opacity-70" />
              </div>
            </div>
            
            <div className="lg:col-span-2 space-y-4">
              {sortedCategories.map(([category, amount]) => (
                amount > 0 && (
                  <div key={category} className="relative">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">{category}</span>
                      <span className="text-sm text-gray-900">K{amount.toFixed(2)} <span className="text-gray-500 text-xs">({((amount / totalExpenses) * 100).toFixed(1)}%)</span></span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${getCategoryColor(category)}`}
                        style={{ width: `${(amount / totalExpenses) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Monthly Trends</h2>
            <button className="flex items-center text-gray-500 hover:text-gray-700">
              <Filter size={16} className="mr-1" />
              <span>Filter</span>
            </button>
          </div>
          
          <div className="h-64 flex items-end justify-between space-x-2 mb-6">
            {monthlyExpenses.map((month) => {
              const heightPercentage = (month.amount / Math.max(...monthlyExpenses.map(m => m.amount))) * 100;
              return (
                <div key={month.month} className="flex flex-col items-center flex-1">
                  <div className="relative w-full">
                    <div 
                      className="bg-blue-500 rounded-t-md w-full"
                      style={{ height: `${heightPercentage * 0.6}%` }}
                    ></div>
                  </div>
                  <div className="mt-2 text-center">
                    <div className="text-gray-600 font-medium">{month.month}</div>
                    <div className="text-sm text-gray-500">K{month.amount.toFixed(0)}</div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-gray-500 text-sm">Average Monthly Expense:</span>
                <span className="ml-2 text-gray-900 font-medium">
                  K{(monthlyExpenses.reduce((sum, month) => sum + month.amount, 0) / monthlyExpenses.length).toFixed(2)}
                </span>
              </div>
              <button className="text-blue-600 text-sm hover:text-blue-800">View Detailed Report</button>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Expenses</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="py-3 px-4 text-left text-gray-500 font-medium text-sm">Date</th>
                <th className="py-3 px-4 text-left text-gray-500 font-medium text-sm">Category</th>
                <th className="py-3 px-4 text-left text-gray-500 font-medium text-sm">Title</th>
                <th className="py-3 px-4 text-right text-gray-500 font-medium text-sm">Amount</th>
                <th className="py-3 px-4 text-right text-gray-500 font-medium text-sm">Action</th>
              </tr>
            </thead>
            {expenses.length === 0 ? (
              <div>No expenses to show</div>
            ) : (
              <tbody>
              {expenses.map((expense, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-800">{new Date(expense.date).toLocaleDateString()}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 ${getCategoryColor(expense.category)} text-white rounded-md text-xs`}>
                      {expense.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{expense.title}</td>
                  <td className="py-3 px-4 text-right text-sm font-medium text-red-600">-K{expense.amount.toFixed(2)}</td>
                  <td onClick={() => setShowConfirmationModal(true)} className="py-3 px-4 text-right text-sm cursor-pointer font-medium text-red-600">Delete</td>
                </tr>
              ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
      
      {/* Add Expense Modal */}
      {showAddExpense && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Expense</h2>
            
            <form onSubmit={handleAddExpense}>
            <div className="mb-4">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newExpense.title}
                  onChange={handleExpenseChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={newExpense.date}
                  onChange={handleExpenseChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={newExpense.category}
                  onChange={handleExpenseChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  {Object.keys(expensesByCategory).map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                  Amount
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">K</span>
                  </div>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={newExpense.amount}
                    onChange={handleExpenseChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0.01"
                    className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description (Optional)
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={newExpense.description}
                  onChange={handleExpenseChange}
                  placeholder="What was this expense for?"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddExpense(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Add Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Confirmation Modal */}
      <ConfirmationModal
       isOpen={showConfirmationModal}
       onClose={() => setShowConfirmationModal(false)}
       title='Delete Expense'
       message='Are you sure you want to delete this expense?'
       onConfirm={() => {
        setShowConfirmationModal(false)
        }}
        confirmText='Delete'
      />
    </div>
  );
};



export default ExpenseTracker;