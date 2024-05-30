import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isAuthorized:false,
    user:{}
}
export const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        getUser:(state,action)=>{
            state.user=action.payload?.user
            state.isAuthorized=true
        },
        logOut:(state)=>{
            state.user={},
            state.isAuthorized=false
        }
    }
})

export const {getUser,logOut}=authSlice.actions;
export default authSlice.reducer;
