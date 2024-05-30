import React from "react"
import { useState,useEffect } from 'react'
import TransForm from '../components/TransForm.jsx';
import TransList from '../components/TransList.jsx';
import Cookies from "js-cookie"
import { Container } from '@mui/material';
const Home = () => {
    const [transactionDetails, setTransactionDetails] = useState([]);
    const [editTransaction, setEditTransaction] = useState({});
    useEffect(() => {
        fetchTransactions();
    }, [])

    async function fetchTransactions() {
        const token=Cookies.get("token")
        const response = await fetch("http://localhost:3000/transaction",{
            method:"GET",
            headers:{
                "Authorization":`Bearer ${token}`
            }
        });

        if(response.ok){
            const data = await response.json();
            setTransactionDetails(data);
        }
    }
    return (<Container>
        <TransForm fetchTransactions={fetchTransactions} editTransaction={editTransaction} setEditTransaction={setEditTransaction} />
        <TransList transactions={transactionDetails} fetchTransactions={fetchTransactions} setEditTransaction={setEditTransaction} />
    </Container>)
}

export default Home;