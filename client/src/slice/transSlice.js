import {createSlice} from "@reduxjs/toolkit"

const initialState={
    transactionDetail:[]
}

export const transSlice=createSlice({
    name:"trans",
    initialState,
    reducers:{
        setTransaction:(state,action)=>{
            state.transactionDetail=action.payload.data;
        }
    }
})

export const {setTransaction}=transSlice.actions;
export default transSlice.reducer