import { NavLink } from 'react-router-dom';
import { Home, CreditCard, Send, PieChart, User } from 'lucide-react';
import useWallet from '@/hooks/useWallet';
import { useSelector } from 'react-redux';
import { auth_selector } from '@/store/slices/auth_slice';
import { useEffect } from 'react';
import { transaction_selector } from '@/store/slices/transaction_slice';

const Sidebar = () => {
  const { fetchBalance } = useWallet();
  const { user } = useSelector(auth_selector);
  const { balance } = useSelector(transaction_selector)

  useEffect(() => {
    if (user) {
      fetchBalance(user);
    }
  }, [])
  const navItems = [
    { path: '/dashboard', name: 'Dashboard', icon: <Home className="w-5 h-5" /> },
    { path: '/transactions', name: 'Transactions', icon: <CreditCard className="w-5 h-5" /> },
    { path: '/send-money', name: 'Send Money', icon: <Send className="w-5 h-5" /> },
    { path: '/expense-tracker', name: 'Expense Tracker', icon: <PieChart className="w-5 h-5" /> },
    { path: '/profile', name: 'Profile', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <div className="bg-indigo-800 text-white w-64 min-h-screen p-4">
      <div className="mb-8 mt-4 text-center">
        <h2 className="text-2xl font-bold">WalletTrack</h2>
        <p className="text-indigo-200 text-sm">Manage your finances</p>
      </div>
      
      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink 
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center p-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-indigo-700 text-white' 
                      : 'text-indigo-100 hover:bg-indigo-700'
                  }`
                }
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="mt-auto pt-8">
        <div className="bg-indigo-700 rounded-lg p-4">
          <h3 className="font-medium mb-2">Available Balance</h3>
          <p className="text-2xl font-bold">K{balance}</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;