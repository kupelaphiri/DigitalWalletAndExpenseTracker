import { BarChart, PieChart, DollarSign, ArrowUpRight, ArrowDownRight, Plus } from 'lucide-react';
import TransactionItem from '../atoms/TransactionItem';
import { Card } from '../ui/card';

const Dashboard = () => {
  // Mock data
  const balanceData = {
    total: 2456.80,
    income: 3200.00,
    expenses: 743.20,
    savingsGoal: 5000,
    savingsProgress: 1500
  };
  
  const recentTransactions = [
    { id: 1, title: 'Grocery Store', amount: -85.20, date: '2025-04-10', category: 'Groceries' },
    { id: 2, title: 'Salary Deposit', amount: 2800.00, date: '2025-04-05', category: 'Income' },
    { id: 3, title: 'Netflix Subscription', amount: -14.99, date: '2025-04-03', category: 'Entertainment' },
  ];
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Welcome back, John! Here's your financial overview.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card title="Total Balance" value={`$${balanceData.total.toFixed(2)}`} icon={<DollarSign className="text-green-500" />} />
        
        <Card 
          title="Income" 
          value={`$${balanceData.income.toFixed(2)}`} 
          icon={<ArrowUpRight className="text-green-500" />} 
          footer="Last 30 days"
        />
        
        <Card 
          title="Expenses" 
          value={`$${balanceData.expenses.toFixed(2)}`} 
          icon={<ArrowDownRight className="text-red-500" />} 
          footer="Last 30 days"
        />
        
        <Card 
          title="Savings Goal" 
          value={`$${balanceData.savingsProgress} / $${balanceData.savingsGoal}`} 
          progress={balanceData.savingsProgress / balanceData.savingsGoal * 100} 
        />
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
            <PieChart className="h-40 w-40 text-gray-400" />
            <p className="text-gray-500">Category breakdown will be displayed here</p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-white rounded-lg shadow">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Recent Transactions</h2>
          <button className="text-indigo-600 hover:text-indigo-800">View All</button>
        </div>
        
        <div>
          {recentTransactions.map(transaction => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;