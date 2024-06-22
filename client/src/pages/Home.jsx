import React, { useState, useEffect } from 'react';
import TransForm from '../components/TransForm.jsx';
import TransList from '../components/TransList.jsx';
import Cookies from "js-cookie";
import { setTransaction } from '../slice/transSlice.js';
import { useSelector,useDispatch } from 'react-redux';
import { Container, Typography, Box } from '@mui/material';

const Home = () => {
  const [editTransaction, setEditTransaction] = useState({});
  const [totalValues, setTotalValues] = useState([0,0,0]);
  const transactionDetails=useSelector((state)=>state.trans.transactionDetail);
  const dispatch=useDispatch();
  useEffect(() => {
    fetchTransactions();
  }, []);

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
      if (data) {
        const totalE = data.reduce((sum, eachDataObject) =>(eachDataObject.typeOfTrans=="expense")? sum + eachDataObject.amount:sum, 0);
        const totalI = data.reduce((sum, eachDataObject) =>(eachDataObject.typeOfTrans=="income")? sum + eachDataObject.amount:sum, 0);
        const totalB=totalI-totalE;
        setTotalValues([totalE,totalI,totalB]);
      }
      dispatch(setTransaction({data:data}));
    }
  }

  return (
    <div ><Container sx={{marginTop:20}}>
    <TransForm fetchTransactions={fetchTransactions} editTransaction={editTransaction} setEditTransaction={setEditTransaction} />
  <TransList  fetchTransactions={fetchTransactions} setEditTransaction={setEditTransaction} />
</Container></div>
  );
}

export default Home;
