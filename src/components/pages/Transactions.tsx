import { useEffect, useState } from 'react';
import TransactionItem from '../atoms/TransactionItem';
import { useSelector } from 'react-redux';
import { useTransactions } from '@/hooks/useTransactions';
import { transaction_selector } from '@/store/slices/transaction_slice';
import { auth_selector } from '@/store/slices/auth_slice';

const Transactions = () => {
  const [filter] = useState('all');
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
      
    return matchesFilter ;
  });
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Transactions</h1>
        <p className="text-gray-600">View and manage your transaction history</p>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        
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