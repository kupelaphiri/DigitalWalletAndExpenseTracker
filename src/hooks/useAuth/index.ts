import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuthState } from '@/store/slices/auth_slice';
import api from '@/axios';

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
            const response = await api.post<AuthResponse>('/auth/login', { Username: username, Email: email, Password: password }).then((res) => {
                return res.data
            })
            dispatch(setAuthState({
                isAuthenticated: true,
                user: response.user,
                accessToken: response.accessToken,
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
            const response = await api.post<AuthResponse>('/auth/register', { Username: name, Email: email, Password: password }).then((res) => {
                return res.data
            })
            dispatch(setAuthState({
                isAuthenticated: true,
                user: response.user,
                accessToken: response.accessToken,
            }));
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    }, [dispatch, navigate]);

    const logout = useCallback(async() => {
        await api.post('/auth/logout')
        dispatch(setAuthState({
            isAuthenticated: false,
            user: null,
            accessToken: null,
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