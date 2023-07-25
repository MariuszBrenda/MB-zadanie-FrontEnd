import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/authSlice';
import usersReducer from './features/usersSlice';
import transactionsReducer from './features/transactionSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer,
        transactions: transactionsReducer
    }
})