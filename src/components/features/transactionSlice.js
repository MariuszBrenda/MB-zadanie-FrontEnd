import { createSlice } from "@reduxjs/toolkit";

const initialState = [{
    id: null,
    typeOfTrans: null,
    category: null,
    amount: null,
    date: null,
    note: null
}]

const transactionSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {
        transactionAdded(state, action) {
            const newTransaction = action.payload;

            state.push({
                id: newTransaction.id,
                typeOfTrans: newTransaction.typeOfTrans,
                category: newTransaction.category,
                amount: newTransaction.amount,
                date: newTransaction.date,
                note: newTransaction.note
            })
        },
        transactionDeleted(state, action) {
            state.splice(action.payload, 1);
        }
    }
})

export const { transactionAdded } = transactionSlice.actions
export const { transactionDeleted } = transactionSlice.actions

export default transactionSlice.reducer