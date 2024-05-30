import * as React from 'react';
import { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Box, Grid } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import dayjs from 'dayjs';
import {useSelector} from "react-redux"
import Cookies from "js-cookie";

const initialFormState = {
    amount: 0,
    description: "",
    date: null,
    category_id: ''
};
export default function TransForm({ fetchTransactions, editTransaction, setEditTransaction }) {
    const user=useSelector((state)=>state.auth.user)
    const [form, setForm] = useState(initialFormState);
    const token = Cookies.get("token");

    useEffect(() => {
        if (Object.keys(editTransaction).length !== 0) {
            setForm({
                ...editTransaction,
                date: dayjs(editTransaction.date)
            });
        }
    }, [editTransaction]);

    async function update() {
        const res = await fetch(`http://localhost:3000/transaction/${editTransaction._id}`, {
            method: "PATCH",
            body: JSON.stringify(form),
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        return res;
    }

    async function create() {
        const res = await fetch("http://localhost:3000/transaction", {
            method: "POST",
            body: JSON.stringify(form),
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        const data = await res.json();
        console.log(data);
        return data;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = Object.keys(editTransaction).length === 0 ? await create() : await update();
        if (res.ok) {
            fetchTransactions();
            setForm(initialFormState);
            setEditTransaction({});
        }
    };

    function handleDate(value) {
        setForm({ ...form, date: value });
    }

    const handleInput = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    function getNameById(category_id){
        user.categories.map((eachCategoryObject)=>{
            if(eachCategoryObject._id===category_id) return eachCategoryObject.label;
        })
    }
    return (
        <Card variant="outlined" sx={{ marginTop: 10 }}>
            <React.Fragment>
                <CardContent>
                    <Typography variant="h6" align="center" gutterBottom>
                        ADD A NEW TRANSACTION
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs>
                                <TextField
                                    fullWidth
                                    name="amount"
                                    value={form.amount}
                                    label="Amount"
                                    variant="outlined"
                                    onChange={handleInput}
                                />
                            </Grid>
                            <Grid item xs>
                                <TextField
                                    fullWidth
                                    name="description"
                                    value={form.description}
                                    label="Description"
                                    variant="outlined"
                                    onChange={handleInput}
                                />
                            </Grid>
                            <Grid item xs>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DesktopDatePicker
                                        label="Transaction Date"
                                        inputFormat="MM/DD/YYYY"
                                        value={form.date}
                                        onChange={handleDate}
                                        renderInput={(params) => <TextField {...params} fullWidth />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs>
                                <Autocomplete
                                    value={getNameById(form.category_id)}
                                    onChange={(event, newValue) => {
                                        setForm({ ...form, category_id:newValue._id });
                                    }}
                                    options={user.categories}
                                    renderInput={(params) => <TextField {...params} label="Category" fullWidth />}
                                />
                            </Grid>
                            <Grid item>
                                <Button
                                    size="large"
                                    variant="contained"
                                    type="submit"
                                >
                                    {Object.keys(editTransaction).length === 0 ? 'Submit' : 'Update'}
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
            </React.Fragment>
        </Card>
    );
}
