import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Transaction {
    id: number;
    userId: string;
    amount: number;
    recipientEmail: string;
    data: Date;
}
  
interface TransactionState {
    transactions: Transaction[];
  }
  
  const initialState: TransactionState = {
    transactions: [],
  };

  export const STATE_KEY = 'transactions';
  const transactionSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
      setTransactions(state, action: PayloadAction<Transaction[]>) {
        state.transactions = action.payload;
      },
      addTransaction(state, action: PayloadAction<Transaction>) {
        state.transactions.unshift(action.payload); // Add to top
      },
      updateTransaction(state, action: PayloadAction<Transaction>) {
        const index = state.transactions.findIndex(t => t.id === action.payload.id);
        if (index !== -1) {
          state.transactions[index] = action.payload;
        }
      },
      deleteTransaction(state, action: PayloadAction<number>) {
        state.transactions = state.transactions.filter(t => t.id !== action.payload);
      },
      clearTransactions(state) {
        state.transactions = [];
      },
    },
  });
  
  export const {
    setTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    clearTransactions,
  } = transactionSlice.actions;
  
  export default transactionSlice.reducer;
  export const transaction_selector = (state: any) => state[STATE_KEY];