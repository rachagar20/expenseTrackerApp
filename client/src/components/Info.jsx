import React from "react";
import { Typography, Box } from '@mui/material';

const Info = ({ totalValues }) => {
    return (
        <Box sx={{ marginTop: 8, display: 'flex', justifyContent: "space-between", alignItems: 'center' }}>
             <Typography component="h1" variant="subtitle1" sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#FCF6F9',
                border: '2px solid #FFFFFF',
                boxShadow: "0px 1px 15px rgba(5, 5, 5, 0.15)",
                borderRadius: '12px',
                paddingTop: '1rem',
                fontSize: '1rem',
                width: 'calc(30% - 1rem)',
                height: '80px',
            }} className="text">
                Total Expenses
                <p style={{ fontSize: '1.2rem', fontWeight: 800, color: 'rgb(226, 64, 64)' }}>₹{totalValues[0]}</p>
            </Typography>
            <Typography component="h1" variant="subtitle1" sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#FCF6F9',
                border: '2px solid #FFFFFF',
                boxShadow: "0px 1px 15px rgba(5, 5, 5, 0.15)",
                borderRadius: '12px',
                paddingTop: '1rem',
                fontSize: '1rem',
                width: 'calc(30% - 1rem)',
                height: '80px',
            }} className="text">
                Total Income
                <p style={{ fontSize: '1.2rem', fontWeight: 800, color: 'rgb(92, 212, 92)' }}>₹{totalValues[1]}</p>
            </Typography>
            <Typography component="h1" variant="subtitle1" sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#FCF6F9',
                border: '2px solid #FFFFFF',
                boxShadow: "0px 1px 15px rgba(5, 5, 5, 0.15)",
                borderRadius: '12px',
                paddingTop: '1rem',
                fontSize: '1rem',
                width: 'calc(30% - 1rem)',
                height: '80px',
            }} className="text">
                Total Balance
                {
                    totalValues[2]<=0?<p style={{ fontSize: '1.2rem', fontWeight: 800,color:'rgb(226, 64, 64)'}}>₹{totalValues[2]}</p>:<p style={{ fontSize: '1.2rem', fontWeight: 800,color:'rgb(92, 212, 92)'}}>₹{totalValues[2]}</p>
                }
            </Typography>
        </Box>
    );
}

export default Info;
