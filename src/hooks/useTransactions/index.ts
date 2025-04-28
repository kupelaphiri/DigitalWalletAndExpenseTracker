import api from "@/axios";
import { setTransactions, Transaction } from "@/store/slices/transaction_slice";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

export const useTransactions = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();

    const fetchTransactions = useCallback(async (userId: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get<Transaction[]>(`transactions/${userId}`).then((res) => {
                return res.data
            });
            dispatch(setTransactions(response))
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to fetch transactions');
        } finally {
            setLoading(false);
        }
    }, []);

    const createTransaction = useCallback(async (transaction: Omit<Transaction, 'id'>) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.post<any>(`transactions`, transaction).then((res) => {
                return res.data
            });
            alert(response.message)
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to create transaction');
        } finally {
            setLoading(false);
        }
    }, [])

    return { loading, error, fetchTransactions, createTransaction };
}