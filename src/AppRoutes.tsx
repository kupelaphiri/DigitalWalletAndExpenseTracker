import { useEffect, useState } from 'react'
import { Navigate, Route, Router, Routes } from 'react-router-dom'
import Dashboard from './components/pages/Dashboard'
import Transactions from './components/pages/Transactions'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import RootLayout from './RootLayout'
import SendMoney from './components/pages/SendMoney';
import ExpenseTracker from './components/pages/ExpenseTracker'


const AppRoutes = () => {
      const [isAuthenticated, setIsAuthenticated] = useState(true);
      const [loading, setLoading] = useState(true);
      
    //   // Simulating authentication check
    //   useEffect(() => {
    //     const checkAuth = () => {
    //       const token = localStorage.getItem('token');
    //       setIsAuthenticated(!!token);
    //       setLoading(false);
    //     };
        
    //     checkAuth();
    //   }, []);

    //   if (loading) {
    //     return <div className="flex items-center justify-center h-screen">Loading...</div>;
    //   }
  return (
    <Routes>
         <Route>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Route>
        <Route element={
            <RootLayout /> 
        }>
       
       <Route>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/send-money" element={<SendMoney />} />
                <Route path="/expense-tracker" element={<ExpenseTracker />} />
                {/* <Route path="/profile" element={<Profile />} /> */}
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
    </Route>
  </Routes>
  )
}

export default AppRoutes