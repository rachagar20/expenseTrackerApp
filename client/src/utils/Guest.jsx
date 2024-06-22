import React from "react";
import Cookies from "js-cookie"
import {Navigate} from "react-router-dom"
import { useSelector } from "react-redux";
const Guest=({children})=>{
    const token=Cookies.get("token");
    const auth=useSelector((state)=>state.auth)
    return !auth.isAuthorized?children:<Navigate to="/dashboard" replace={true}/>
}
export default Guest