import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie"
import { Typography } from '@mui/material';
import { setTransaction } from '../slice/transSlice.js';
import  TransListDash from "../components/TransListDash.jsx"
import LineChartDash from '../components/LineChartDash.jsx';

export default function Dashboard() {
  const transactionDetails = useSelector((state) => state.trans.transactionDetail);
  const [totalValues, setTotalValues] = useState([0, 0, 0]);
  const dispatch=useDispatch();
  useEffect(() => {
    fetchTransactions();
  },[])
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
        const totalE = data.reduce((sum, eachDataObject) => (eachDataObject.typeOfTrans == "expense") ? sum + eachDataObject.amount : sum, 0);
        const totalI = data.reduce((sum, eachDataObject) => (eachDataObject.typeOfTrans == "income") ? sum + eachDataObject.amount : sum, 0);
        const totalB = totalI - totalE;
        setTotalValues([totalE, totalI, totalB]);
      }
      dispatch(setTransaction({data:data}));

    }
  }
  return (
    <Box sx={{ display: 'flex', padding: "auto", paddingTop: 10 }}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8} lg={8}>
              <LineChartDash transactionDetails={transactionDetails}/>
          </Grid>
          <Grid item xs={12} md={4} lg={4} sx={{display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
              <Typography component="h1" variant="subtitle1" sx={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                background: '#f7f9fc',
                border: '2px solid #FFFFFF',
                boxShadow: "0px 1px 15px rgba(5, 5, 5, 0.15)",
                borderRadius: '12px',
                fontSize: '1rem',
              }} className="text">
                Total Expenses:
                <p style={{ fontSize: '1.2rem', fontWeight: 800, color: 'rgb(226, 64, 64)' }}>₹{totalValues[0]}</p>
              </Typography>

              <Typography component="h1" variant="subtitle1" sx={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                background: '#f7f9fc',
                border: '2px solid #FFFFFF',
                boxShadow: "0px 1px 15px rgba(5, 5, 5, 0.15)",
                borderRadius: '12px',
                fontSize: '1rem',
              }} className="text">
                Total Income
                <p style={{ fontSize: '1.2rem', fontWeight: 800, color: 'rgb(92, 212, 92)' }}>₹{totalValues[1]}</p>
              </Typography>
              <Typography component="h1" variant="subtitle1" sx={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                background: '#f7f9fc',
                border: '2px solid #FFFFFF',
                boxShadow: "0px 1px 15px rgba(5, 5, 5, 0.15)",
                borderRadius: '12px',
                fontSize: '1rem',
              }} className="text">
                Total Balance
                {
                  totalValues[2] <= 0 ? <p style={{ fontSize: '1.2rem', fontWeight: 800, color: 'rgb(226, 64, 64)' }}>₹{totalValues[2]}</p> : <p style={{ fontSize: '1.2rem', fontWeight: 800, color: 'rgb(92, 212, 92)' }}>₹{totalValues[2]}</p>
                }
              </Typography>
          </Grid>
          {/* Recent Orders */}
          <Grid item xs={12}>
            <Typography component="h1" variant="h6" className="text" sx={{textAlign:"center", paddingTop:5,marginBottom:2}}>MOST RECENT TRANSACTIONS</Typography>
            <TransListDash transactions={transactionDetails}/>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}