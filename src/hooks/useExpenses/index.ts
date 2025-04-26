import api from '@/axios';
import { useState } from 'react';

export type Expense = {
    title: string;
    amount: number;
    date: string;   
    category: string;
    userId: string;
  };

const useExpenses = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);

    const getExpenses = async(userId: string) => {
        const res = await api.get<Expense[]>(`expenses/${userId}`).then((res) => {
            return res.data;
        });
        setExpenses(res);
    }

    const addExpense = async(expense: Omit<Expense, 'Id'>) => {
        const res = await api.post<Expense>('expenses', expense).then((res) => {
            return res.data;
        });
        setExpenses((prevExpenses) => [res, ...prevExpenses]);   
    };

    // const deleteExpense = (id: string) => {
    //     setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
    // };

    return {
        expenses,
        getExpenses,
        addExpense,
    };
};

export default useExpenses;