import { createSlice } from "@reduxjs/toolkit";

const initialState = {
        username: null
}


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authAdded(state, action) {
        state.username=action.payload
    },
    authDeleted(state) {
        state.username=null
    }
  }  
})

export const { authDeleted} = authSlice.actions
export const { authAdded } = authSlice.actions

export default authSlice.reducer