import { use, useState } from 'react';
import { ChevronDown, ChevronUp, DollarSign, Calendar, User } from 'lucide-react';
import { useSelector } from 'react-redux';
import { auth_selector } from '@/store/slices/auth_slice';

export default function TransactionItem({ transaction, detailed = false }: any) {
  const [isExpanded, setIsExpanded] = useState(detailed);
  const { user } = useSelector(auth_selector);
  
  // Format amount to always show 2 decimal places and add appropriate sign
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(transaction.amount);
  
  // Determine if transaction is income or expense based on amount
  const isIncome = transaction.userId != user.id
  
  // Format date
  const formattedDate = new Date(transaction.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="border rounded-lg shadow-sm mb-2 overflow-hidden">
      {/* Main transaction row - always visible */}
      <div 
        className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${isIncome ? 'bg-green-100' : 'bg-red-100'}`}>
            <DollarSign size={20} className={isIncome ? 'text-green-600' : 'text-red-600'} />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{transaction.description}</h3>
            <p className="text-sm text-gray-500">{formattedDate}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className={`font-medium ${isIncome ? 'text-green-600' : 'text-red-600'}`}>
            {formattedAmount}
          </span>
          {isExpanded ? 
            <ChevronUp size={20} className="text-gray-400" /> : 
            <ChevronDown size={20} className="text-gray-400" />
          }
        </div>
      </div>
      
      {/* Details section - only visible when expanded */}
      {isExpanded && (
        <div className="px-4 pb-4 pt-1 bg-gray-50 border-t">
          <div className="grid gap-2">
            {transaction.category && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-500">Category:</span>
                <span className="text-sm px-2 py-1 bg-gray-200 rounded-full">{transaction.category}</span>
              </div>
            )}
            
            {transaction.payee && (
              <div className="flex items-center gap-2">
                <User size={16} className="text-gray-500" />
                <span className="text-sm text-gray-700">{transaction.payee}</span>
              </div>
            )}
            
            {transaction.notes && (
              <div className="mt-2">
                <span className="text-sm font-medium text-gray-500">Notes:</span>
                <p className="text-sm text-gray-700 mt-1">{transaction.notes}</p>
              </div>
            )}
            
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200">
              <div className="flex items-center gap-1">
                <Calendar size={16} className="text-gray-500" />
                <span className="text-xs text-gray-500">Added: {formattedDate}</span>
              </div>
              {transaction.tags && transaction.tags.length > 0 && (
                <div className="flex gap-1 flex-wrap justify-end">
                  {transaction.tags.map((tag: any, index: number) => (
                    <span key={index} className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}