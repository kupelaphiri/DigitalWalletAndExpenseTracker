import api from '@/axios';
import { balanceUpdate } from '@/store/slices/transaction_slice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export type Expense = {
    id: number;
    title: string;
    amount: number;
    date: string;   
    category: string;
    userId: string;
  };

type ExpenseResponse = {
    expense: Expense;
    newBalance: number;
}

const useExpenses = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const dispatch = useDispatch();

    const getExpenses = async(userId: string) => {
        const res = await api.get<Expense[]>(`expenses/${userId}`).then((res) => {
            return res.data;
        });
        setExpenses(res);
    }

    const addExpense = async(expense: Omit<Expense, 'Id'>) => {
        const res = await api.post<ExpenseResponse>('expenses', expense).then((res) => {
            return res.data;
        });
        setExpenses((prevExpenses) => [res.expense, ...prevExpenses]); 
        dispatch(balanceUpdate(res.newBalance))  
    };

    const deleteExpense = async(id: number) => {
       const res = await api.delete<void>(`expenses/${id}`)
       if (res.status === 200) {
        setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
       }
    };

    return {
        expenses,
        getExpenses,
        addExpense,
        deleteExpense,
    };
};

export default useExpenses;