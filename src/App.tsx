import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './components/pages/Dashboard';
import Transactions from './components/pages/Transactions';
// import ExpenseTracker from './components/pages/ExpenseTracker';
// import Profile from './components/pages/Profile';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import './App.css';
import AppRoutes from './AppRoutes';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [loading, setLoading] = useState(true);
  
  // Simulating authentication check
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
      setLoading(false);
    };
    
    checkAuth();
  }, []);
  
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  return (
    <div>
      <AppRoutes /> 
    </div>
  );
}

export default App;