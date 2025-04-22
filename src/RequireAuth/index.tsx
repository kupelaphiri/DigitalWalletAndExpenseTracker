import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate, } from 'react-router-dom';
import { auth_selector, setAccessToken, setAuthState, setIsAuthenticated } from '@/store/slices/auth_slice';
import api from '@/axios';

interface RequireAuthProps {
    redirectTo: string;
    children: ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ redirectTo, children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector(auth_selector)
    const [loading, setLoading] = useState(true);
    const hasRefreshed = useRef(false);
    const refreshToken = async () => {
        if (hasRefreshed.current) return; 
        hasRefreshed.current = true;
        try {
            const res = await api.get('/auth/refresh-token').then((res) => {
               return res.data
            })
            const { user, accessToken } = res;
            dispatch(setAccessToken(accessToken));
            dispatch(setAuthState({
                isAuthenticated: true,
                user: user,
                accessToken: accessToken,
            }))
            dispatch(setIsAuthenticated(true))
        } catch (error) {
            alert('Session expired. Please log in again.');
            navigate(redirectTo, { replace: true });
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
     refreshToken();
    }, []);


    if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;; 
    return isAuthenticated ? children : <Navigate to={redirectTo} replace />;
};

export default RequireAuth;