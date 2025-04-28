// components/SendMoney.tsx
import { useState, FC, FormEvent, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { useTransactions } from '@/hooks/useTransactions';
import { useSelector } from 'react-redux';
import { auth_selector } from '@/store/slices/auth_slice';
import { transaction_selector } from '@/store/slices/transaction_slice';

const SendMoney: FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [recipient, setRecipient] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const { createTransaction, fetchTransactions } = useTransactions()
  const { user } = useSelector(auth_selector)
  const { transactions } = useSelector(transaction_selector)

  useEffect(() => {
    fetchTransactions(user.id)
  }, [])

  const recentTransactions = transactions.slice(0, 3)
  

  const handleSendMoney = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    // Validate form
    if (!amount || !recipient) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Show confirmation dialog
    setShowConfirmation(true);
  };
  
  const confirmTransaction = (): void => {
    createTransaction({ 
      amount: parseFloat(amount), 
      userId: user.id,
      recipientEmail: recipient,
    })
    // Reset form and hide confirmation
    setAmount('');
    setRecipient('');
    setNote('');
    setShowConfirmation(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Send Money</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent</h2>
        <div className="space-y-3">
          {recentTransactions.map((transaction: any) => (
            <div 
              key={transaction.id} 
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex justify-between items-center cursor-pointer hover:shadow-md transition-shadow duration-200"
              onClick={() => {
                setRecipient(transaction.recipientEmail)
                setAmount(transaction.amount)
              }}
            >
              <div className="flex flex-col">
                <span className="font-medium text-gray-800">K{transaction.amount}</span>
                <span className="text-sm text-gray-500">{transaction.recipientEmail}</span>
              </div>
              <div className="flex items-center text-gray-500">
                <Clock size={16} className="mr-1" />
                <span className="text-sm">{new Date(transaction.date).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <form 
        className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
        onSubmit={handleSendMoney}
      >
        <div className="mb-4">
          <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 mb-1">
            Recipient
          </label>
          <input
            type="text"
            id="recipient"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="Email or username"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-gray-500">K</span>
            </div>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              step="0.01"
              min="0.01"
              required
              className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">
            Note (Optional)
          </label>
          <textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="What's this for?"
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        >
          Send Money
        </button>
      </form>
      
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Confirm Transaction</h2>
            <p className="mb-2">You are about to send <span className="font-semibold">${parseFloat(amount).toFixed(2)}</span> to <span className="font-semibold">{recipient}</span></p>
            {note && <p className="mb-4 text-gray-600">Note: {note}</p>}
            <div className="flex space-x-4 mt-6">
              <button 
                className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
                onClick={() => setShowConfirmation(false)}
              >
                Cancel
              </button>
              <button 
                className="flex-1 py-2 px-4 bg-blue-600 rounded-lg text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                onClick={confirmTransaction}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SendMoney;