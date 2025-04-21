import { useEffect, useState } from 'react'
import { Navigate, Route, Router, Routes } from 'react-router-dom'
import Dashboard from './components/pages/Dashboard'
import Transactions from './components/pages/Transactions'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import RootLayout from './RootLayout'
import SendMoney from './components/pages/SendMoney';
import ExpenseTracker from './components/pages/ExpenseTracker'
import { useSelector } from 'react-redux'
import { auth_selector } from './store/slices/auth_slice'
import RequireAuth from './RequireAuth'


const AppRoutes = () => {
      const { isAuthenticated } = useSelector(auth_selector)
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
          <Route path="/login" element={<Login  />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Route>
        <Route element={
          <RequireAuth redirectTo="/login">
            <RootLayout />   
          </RequireAuth>
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