import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Transaction {
    id: number;
    userId: string;
    amount: number;
    recipientEmail: string;
}
  
interface TransactionState {
    transactions: Transaction[];
    balance: number;
  }
  
  const initialState: TransactionState = {
    transactions: [],
    balance: 0,
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
      balanceUpdate(state, action: PayloadAction<number>) {
        state.balance = action.payload;
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
    balanceUpdate,
  } = transactionSlice.actions;
  
  export default transactionSlice.reducer;
  export const transaction_selector = (state: any) => state[STATE_KEY];