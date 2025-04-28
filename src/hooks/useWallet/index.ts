import api from '@/axios';
import { balanceUpdate } from '@/store/slices/transaction_slice';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';

interface Wallet {
    balance: number;
}

interface WalletUpdate {
    userId: number;
    balance: number;
}

const useWallet = () => {
    const [balance, setBalance] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();

    // Fetch the user's balance
    const fetchBalance = useCallback(async (user: any) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get<Wallet>(`wallet/balance/${user.id}`).then((res) => {
                return res.data
            })
            if (response.balance) {
                dispatch(balanceUpdate(response.balance))
            }  
        } catch (err) {
            setError('Failed to fetch balance');
        } finally {
            setLoading(false);
        }
    }, []);

    // Update the user's balance
    const updateBalance = useCallback(async (payload: WalletUpdate) => {
        setLoading(true);
        setError(null);
        try {
         const response = await api.put<Wallet>(`wallet/update`, {userId: payload.userId, balance: payload.balance}).then((res) => {
            return res.data
         })
         dispatch(balanceUpdate(response.balance))
         
         setBalance(response.balance);
        } catch (err) {
            setError('Failed to update balance');
        } finally {
            setLoading(false);
        }
    }, []);

    const createWallet = useCallback(async (user: any) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.post<Wallet>(`wallet/create`, {user: user, userId: user.id}).then((res) => {
                return res.data
            })
            dispatch(balanceUpdate(response.balance))
        } catch (error) {
            setError('Failed to create wallet');      
        } finally {
            setLoading(false);
        }

    }, []);
    // useEffect(() => {
    //     fetchBalance();
    // }, [fetchBalance]);

    return { balance, loading, error, fetchBalance, updateBalance, createWallet };
};

export default useWallet;