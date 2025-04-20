// components/SendMoney.tsx
import { useState, FC, FormEvent } from 'react';
import { Search, UserPlus, Clock } from 'lucide-react';

interface Contact {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

interface RecentRecipient {
  id: number;
  name: string;
  email: string;
  date: string;
}

const SendMoney: FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [recipient, setRecipient] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  
  // Mock frequent contacts
  const frequentContacts: Contact[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', avatar: '/api/placeholder/48/48' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', avatar: '/api/placeholder/48/48' },
    { id: 3, name: 'Alex Johnson', email: 'alex@example.com', avatar: '/api/placeholder/48/48' },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', avatar: '/api/placeholder/48/48' },
  ];
  
  // Mock recent transactions
  const recentRecipients: RecentRecipient[] = [
    { id: 101, name: 'Coffee Shop', email: 'info@coffeeshop.com', date: '2 days ago' },
    { id: 102, name: 'Amy Lee', email: 'amy@example.com', date: '1 week ago' },
    { id: 103, name: 'Electric Company', email: 'payments@electric.com', date: '1 month ago' },
  ];

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
    // This would send the actual API request in a real implementation
    console.log('Transaction confirmed:', { 
      amount: parseFloat(amount), 
      recipient, 
      note, 
      timestamp: new Date() 
    });
    
    // Reset form and hide confirmation
    setAmount('');
    setRecipient('');
    setNote('');
    setShowConfirmation(false);
    
    // Show success message
    alert('Money sent successfully!');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Send Money</h1>
      
      <div className="mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={20} className="text-gray-400" />
          </div>
          <input 
            type="text" 
            placeholder="Search by name, email or phone number" 
            className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Frequent Contacts</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {frequentContacts.map((contact) => (
            <div 
              key={contact.id} 
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center cursor-pointer hover:shadow-md transition-shadow duration-200"
              onClick={() => setRecipient(contact.email)}
            >
              <img 
                src={contact.avatar} 
                alt={contact.name} 
                className="w-12 h-12 rounded-full mb-2" 
              />
              <span className="font-medium text-gray-800">{contact.name}</span>
              <span className="text-sm text-gray-500 truncate w-full text-center">{contact.email}</span>
            </div>
          ))}
          <div className="bg-gray-50 p-4 rounded-lg border border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors duration-200">
            <UserPlus size={24} className="text-gray-500 mb-2" />
            <span className="text-gray-600 font-medium">Add Contact</span>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent</h2>
        <div className="space-y-3">
          {recentRecipients.map((recent) => (
            <div 
              key={recent.id} 
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex justify-between items-center cursor-pointer hover:shadow-md transition-shadow duration-200"
              onClick={() => setRecipient(recent.email)}
            >
              <div className="flex flex-col">
                <span className="font-medium text-gray-800">{recent.name}</span>
                <span className="text-sm text-gray-500">{recent.email}</span>
              </div>
              <div className="flex items-center text-gray-500">
                <Clock size={16} className="mr-1" />
                <span className="text-sm">{recent.date}</span>
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
              <span className="text-gray-500">$</span>
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