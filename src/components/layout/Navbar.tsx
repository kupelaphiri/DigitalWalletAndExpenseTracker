import { User, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useSelector } from 'react-redux';
import { auth_selector } from '@/store/slices/auth_slice';

const Navbar = () => {
  const { logout } = useAuth()
  const { user } = useSelector(auth_selector)
  
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-indigo-600">Wallet<span className="text-gray-800">Track</span></h1>
      </div>
      
      <div className="flex items-center space-x-6">
        
        <div className="flex items-center space-x-2 cursor-pointer">
          <div className="bg-indigo-100 p-2 rounded-full">
            <User className="h-5 w-5 text-indigo-600" />
          </div>
          <span className="text-gray-700 font-medium">{user.username}</span>
        </div>
        
        <button onClick={logout} className="flex cursor-pointer items-center text-red-500 hover:text-red-700">
          <LogOut className="h-5 w-5 mr-1" />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;