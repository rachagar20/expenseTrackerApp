import React, { useEffect } from "react";
import LineChart from "../components/LineChart.jsx"
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie"
import { setTransaction } from "../slice/transSlice.js";
import BarChart from "../components/BarChart.jsx";
import { Box, Container,Card } from "@mui/material";
import PieChart from "../components/PieChart.jsx"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Chart = () => {
    const transactionDetails = useSelector((state) => state.trans.transactionDetail)
    const dispatch = useDispatch();
    const notify=()=>{
      toast.error("No data to display.Please add some transactions", {
        position: "top-center"
      });

    }
    async function fetchTransactions() {
        const token = Cookies.get("token");
        const response = await fetch(`${import.meta.env.VITE_URL}/transaction`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(setTransaction({ data: data }));
        }
    }
    useEffect(() => {
        fetchTransactions(); 
        if (!Array.isArray(transactionDetails) || transactionDetails.length === 0) {
          notify();
        } 
    }, [])
    return  <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',marginBottom:5 }}>
          <ToastContainer/>

    <LineChart transactionDetails={transactionDetails}/>
    <PieChart transactionDetails={transactionDetails}/>
    <BarChart transactionDetails={transactionDetails}/>
    </Container>
}

export default Chart