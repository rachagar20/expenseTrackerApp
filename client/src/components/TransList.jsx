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
import { IconButton } from '@mui/material';
import dayjs from 'dayjs';
import Cookies from "js-cookie"
import { useSelector } from 'react-redux';


export default function TransList({fetchTransactions, setEditTransaction }) {
    const token = Cookies.get("token")
    const user = useSelector((state) => state.auth.user)
    const transactions=useSelector((state)=>state.trans.transactionDetail);
    async function remove(_id) {
        if (!window.confirm("Are you sure?")) return;
        const res = await fetch(`${import.meta.env.VITE_URL}/transaction/${_id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        if (res.ok) {
            fetchTransactions();
        }
    }
    function formatDate(date) {
        return dayjs(date).format("DD MMM YYYY")
    }
    function getNameById(category_id) {
        const category = user?.categories?.find((eachCategoryObject) => category_id === eachCategoryObject._id)

        return category ? category.label : "--"

    }
    return (
        <>
            <Typography variant="h6" className="text" sx={{ marginTop: 10, textAlign: "center"}}>
                LIST OF ALL TRANSACTIONS
            </Typography>
            <TableContainer component={Paper} sx={{ marginTop: 5, borderRadius: "20px",border: '2px solid #FFFFFF',
            boxShadow: "0px 1px 15px rgba(5, 5, 5, 0.15)",
            borderRadius: '12px', background: "#f7f9fc",marginBottom:5 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'><Typography className="text">Amount</Typography></TableCell>
                            <TableCell align="center"><Typography className="text">Description</Typography></TableCell>
                            <TableCell align="center"><Typography className="text">Category</Typography></TableCell>
                            <TableCell align="center"><Typography className="text">Date</Typography></TableCell>
                            <TableCell align="center"><Typography className="text">Action</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center" component="th" scope="row">
                                    <Typography style={{ color: row.typeOfTrans == 'income' ? 'rgb(92, 212, 92)' : 'rgb(226, 64, 64)' }}>
                                        {row.amount}
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography style={{ color: row.typeOfTrans === 'income' ? 'rgb(92, 212, 92)' : 'rgb(226, 64, 64)' }}>
                                        {row.description}
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography style={{ color: row.typeOfTrans === 'income' ? 'rgb(92, 212, 92)' : 'rgb(226, 64, 64)' }}>
                                        {getNameById(row.category_id)}
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography style={{ color: row.typeOfTrans === 'income' ? 'rgb(92, 212, 92)' : 'rgb(226, 64, 64)' }}>
                                        {formatDate(row.date)}
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton color="primary" component="label" onClick={() => { setEditTransaction(row) }}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="warning" aria-label="delete" onClick={() => { remove(row._id) }}>
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
