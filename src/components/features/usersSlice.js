import { createSlice } from "@reduxjs/toolkit";

//tutaj localStorage.GetItem

const initialState = [{
    id: '1',
    username: 'admin',
    password: 'admin'
}]

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        usersAdded(state, action) {
            state.push(action.payload)
            // tutaj localStorage.setItem

            //w transactions added jako argumenty dodac tez username i na jego podstawie tworzyc setitem
        },
        usersDeleteAll(state) {
            state = initialState
            // jak będzie zasysać z local storage to nie może być initial state tylko z ręki admin admin
            // tutaj też localStorage.setItem
        }
    }
})

export const { usersAdded } = usersSlice.actions
export default usersSlice.reducer