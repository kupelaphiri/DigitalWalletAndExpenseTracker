import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuthState } from '@/store/slices/auth_slice';
import axios from 'axios';

interface AuthResponse {
    user: {
        id: string;
        name: string;
        email: string;
    };
    accessToken: string;
    refreshToken: string;
}

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const login = useCallback(async (username: string, email: string, password: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post<AuthResponse>(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, { Username: username, Email: email, Password: password });
            console.log('response.data', response.data)
            dispatch(setAuthState({
                isAuthenticated: true,
                user: response.data.user,
                access_token: response.data.accessToken,
                refresh_token: response.data.refreshToken,
            }));
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    }, [dispatch, navigate]);

    const register = useCallback(async (name: string, email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post<AuthResponse>('/auth/register', { name, email, password });
            dispatch(setAuthState({
                isAuthenticated: true,
                user: response.data.user,
                access_token: response.data.accessToken,
                refresh_token: response.data.refreshToken,
            }));
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    }, [dispatch, navigate]);

    const logout = useCallback(() => {
        dispatch(setAuthState({
            isAuthenticated: false,
            user: null,
            access_token: null,
            refresh_token: null,
        }));
        navigate('/login');
    }, [dispatch, navigate]);

    return {
        login,
        register,
        logout,
        loading,
        error,
    };
};