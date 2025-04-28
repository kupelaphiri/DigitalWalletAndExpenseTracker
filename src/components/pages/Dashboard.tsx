import { BarChart, PieChart } from 'lucide-react';
import TransactionItem from '../atoms/TransactionItem';
import { useSelector } from 'react-redux';
import { transaction_selector } from '@/store/slices/transaction_slice';
import { useNavigate } from 'react-router-dom';
import { auth_selector } from '@/store/slices/auth_slice';
import { useTransactions } from '@/hooks/useTransactions';
import { useEffect, useState } from 'react';
import useExpenses from '@/hooks/useExpenses';
import { ExpenseCategory } from './ExpenseTracker';
import { groupExpensesByCategory } from '@/lib/utils';
import ExpensePieChart from '../atoms/ExpensePieChart';

const Dashboard = () => {

  const { transactions } = useSelector(transaction_selector)
  const recentTransactions = transactions.slice(0, 3)
  const navigate = useNavigate()
  const { user } = useSelector(auth_selector);
  const { fetchTransactions } = useTransactions()
  const { expenses, getExpenses } = useExpenses()
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

   useEffect(() => {
    getExpenses(user.id)
   }, [])

   useEffect(() => {
      fetchTransactions(user.id)
      const catgorisedExpenses = groupExpensesByCategory(expenses);
      setExpensesByCategory(catgorisedExpenses);
    }, [expenses])
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user.username}! Here's your financial overview.</p>
      </div>
  
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Spending Overview</h2>
            <select className="border rounded p-2 text-sm">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 3 months</option>
            </select>
          </div>
          
          <div className="h-64 flex items-center justify-center">
            <BarChart className="h-40 w-40 text-gray-400" />
            <p className="text-gray-500">Spending chart will be displayed here</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Expense Categories</h2>
            <select className="border rounded p-2 text-sm">
              <option>This Month</option>
              <option>Last Month</option>
              <option>This Year</option>
            </select>
          </div>
          
          <div className="h-64 flex items-center justify-center flex-col">
            <ExpensePieChart categories={expensesByCategory} width={'200px'} />
            <p className="text-gray-500">Category breakdown will be displayed here</p>
          </div>
        </div>
      </div>
      
      {recentTransactions.length > 0 && <div className="mt-8 bg-white rounded-lg shadow">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Recent Transactions</h2>
          <button onClick={() => navigate('/transactions')} className="text-indigo-600 hover:text-indigo-800">View All</button>
        </div>
        
        <div>
          {recentTransactions.map((transaction: any) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </div>
      </div>}
    </div>
  );
};

export default Dashboard;