import { createSlice } from "@reduxjs/toolkit";

// localstorage.getitem ? null
const initialState = {
        username: null
}


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authAdded(state, action) {
        state.username=action.payload
        // localstorage.setitem
    },
    authDeleted(state) {
        state.username=null
        // localstorage.setitem
    }
  }  
})

export const { authDeleted} = authSlice.actions
export const { authAdded } = authSlice.actions

export default authSlice.reducer