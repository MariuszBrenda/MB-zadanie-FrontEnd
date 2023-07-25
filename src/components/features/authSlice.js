import { createSlice } from "@reduxjs/toolkit";

// localstorage.getitem ? null
const initialState = 
  localStorage.getItem("pspizk-mb-auth") !== null 
    ? JSON.parse(localStorage.getItem("pspizk-mb-auth")) : {
      username: null
    }


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authAdded(state, action) {
        state.username=action.payload
        localStorage.setItem("pspizk-mb-auth", JSON.stringify(state));
    },
    authDeleted(state) {
        state.username=null
        localStorage.setItem("pspizk-mb-auth", JSON.stringify(state));
    }
  }  
})

export const { authDeleted} = authSlice.actions
export const { authAdded } = authSlice.actions

export default authSlice.reducer