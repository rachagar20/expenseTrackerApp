import {configureStore} from "@reduxjs/toolkit"
import authSliceReducer from "../slice/authSlice.js"
import transSliceReducer from "../slice/transSlice.js"
const store=configureStore({
    reducer:{
        auth:authSliceReducer,
        trans:transSliceReducer
    }
})


export default store