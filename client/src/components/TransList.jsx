import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { Container } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {IconButton} from '@mui/material';
import dayjs from 'dayjs';
import Cookies from "js-cookie"

// function createData(name, calories, fat, carbs, protein) {
//     return { name, calories, fat, carbs, protein };
// }

export default function TransList({ transactions,fetchTransactions, setEditTransaction}) {
    const token=Cookies.get("token")
    async function remove(_id){
        if(!window.confirm("Are you sure?")) return;
        const res=await fetch(`http://localhost:3000/transaction/${_id}`,{
            method:"DELETE",
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })
        if(res.ok){
            fetchTransactions();
        }
    }
    function formatDate(date){
        return dayjs(date).format("DD MMM YYYY")
    }
    return (
        <>
            <Typography variant="h6" sx={{ marginTop: 10 }}>
                List Of All Transactions
            </Typography>
            <TableContainer component={Paper} sx={{ marginTop: 10 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Amount</TableCell>
                            <TableCell align="center">Description</TableCell>
                            <TableCell align="center">Transaction Date</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center" component="th" scope="row">
                                    {row.amount}
                                </TableCell>
                                <TableCell align="center">{row.description}</TableCell>
                                <TableCell align="center">{formatDate(row.date)}</TableCell>
                                <TableCell align="center">
                                    <IconButton color="primary" component="label" onClick={()=>{setEditTransaction(row)}}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="warning" aria-label="delete" onClick={()=>{remove(row._id)}}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
