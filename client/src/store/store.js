import {configureStore} from "@reduxjs/toolkit"
import authSliceReducer from "../slice/authSlice.js"
const store=configureStore({
    reducer:{
        auth:authSliceReducer
    }
})


export default store