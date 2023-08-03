import { createSlice } from "@reduxjs/toolkit";

const initialValue = [{
    id: null,
    user: null,
    typeOfTrans: null,
    category: null,
    amount: null,
    date: null,
    note: null
}];
const initialState = localStorage.getItem("pspizk-mb-transactions") !== null 
    ? JSON.parse(localStorage.getItem("pspizk-mb-transactions")) : initialValue;



const transactionSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {
        transactionAdded(state, action) {
            const newTransaction = action.payload;
            const databaseName = "pspizk-mb-transactions-" + newTransaction.user;
            state.push({
                id: newTransaction.id,
                user: newTransaction.user,
                typeOfTrans: newTransaction.typeOfTrans,
                category: newTransaction.category,
                amount: newTransaction.amount,
                date: newTransaction.date,
                note: newTransaction.note
                
            })

            localStorage.setItem("pspizk-mb-transactions", JSON.stringify(state));
        },
        transactionDeleted(state, action) {
            state.splice(action.payload, 1);
        },
        transactionDeleteAll: () => [],
        transactionsReload(state, action) {
            const databaseName = "pspizk-mb-transactions-" + action.payload;
            console.log(databaseName);
            const result = localStorage.getItem("pspizk-mb-transactions") !== null 
                            ? JSON.parse(localStorage.getItem("pspizk-mb-transactions")) : initialState;
            console.log(result);
            state = result;
        }
    }
})

export const { transactionAdded } = transactionSlice.actions
export const { transactionDeleted } = transactionSlice.actions
export const { transactionsReload } = transactionSlice.actions
export const { transactionDeleteAll } = transactionSlice.actions

export default transactionSlice.reducer