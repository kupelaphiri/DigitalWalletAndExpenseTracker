import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface RequireAuthProps {
    isAuthenticated: boolean;
    redirectTo: string;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ isAuthenticated, redirectTo }) => {
    return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} replace />;
};

export default RequireAuth;