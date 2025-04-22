import { useEffect, useState } from 'react';
import { Search, Filter, Download } from 'lucide-react';
import TransactionItem from '../atoms/TransactionItem';
import { useSelector } from 'react-redux';
import { useTransactions } from '@/hooks/useTransactions';
import { transaction_selector } from '@/store/slices/transaction_slice';
import { auth_selector } from '@/store/slices/auth_slice';

const Transactions = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { transactions } = useSelector(transaction_selector)
  const { fetchTransactions } = useTransactions()
  const { user } = useSelector(auth_selector)
 
  useEffect(() => {
    fetchTransactions(user.id)
  }, [])
  
  
  // Filter transactions
  const filteredTransactions = transactions.filter((t: any) => {
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'income' && t.amount > 0) || 
      (filter === 'expense' && t.amount < 0);
      
    // const matchesSearch = 
    //   t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    //   t.category.toLowerCase().includes(searchTerm.toLowerCase());
      
    return matchesFilter ;
  });
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Transactions</h1>
        <p className="text-gray-600">View and manage your transaction history</p>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <div className="flex flex-wrap gap-4 justify-between items-center">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search transactions..."
                className="pl-10 pr-4 py-2 border rounded-lg w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="text-gray-400 h-5 w-5" />
                <select 
                  className="border rounded-lg p-2" 
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All Transactions</option>
                  <option value="income">Income Only</option>
                  <option value="expense">Expenses Only</option>
                </select>
              </div>
              
              <button className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg">
                <Download className="h-5 w-5 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>
        
        <div>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction: any) => (
              
              <TransactionItem key={transaction.id} transaction={transaction} detailed />
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">
              No transactions found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactions;