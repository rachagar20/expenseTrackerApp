import * as React from 'react';
import { useState, useEffect } from "react"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import Cookies from "js-cookie"
const initialFormState = {
    amount: 0,
    description: "",
    date: null
}

export default function TransForm({fetchTransactions,editTransaction,setEditTransaction}) {
    const [form, setForm] = useState(initialFormState);
    const token=Cookies.get("token")
    useEffect(()=>{
        if(Object.keys(editTransaction).length!==0){
            setForm({
                ...editTransaction,
                date:dayjs(editTransaction.date)
            });
        }
    },[editTransaction])
    async function update(){
        const res = await fetch(`http://localhost:3000/transaction/${editTransaction._id}`, {
            method: "PATCH",
            body: JSON.stringify(form),
            headers: {
                "content-type": "application/json",
                "Authorization":`Bearer ${token}`
            }
        })
        return res;
    }
    async function create(){
        const res = await fetch("http://localhost:3000/transaction", {
            method: "POST",
            body: JSON.stringify(form),
            headers: {
                "content-type": "application/json",
                "Authorization":`Bearer ${token}`

            }
        })
        const data=await res.json();
        console.log(data)
        return data;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res=Object.keys(editTransaction).length===0? await create():await update();
        if(res.ok){
            fetchTransactions();
            setForm(initialFormState)
            setEditTransaction({})
        }
    }

    function handleDate(value){
        setForm({...form,date:value})
    }
    const handleInput = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (
            <Card variant="outlined" sx={{marginTop:10,display:"flex",justifyContent:"center"}} >
                <React.Fragment>
                    <CardContent sx={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
                        <Typography variant="h6" sx={{}}>
                            ADD A NEW TRANSACTION
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField sx={{ marginRight: "10px" }} name="amount" value={form.amount}  id="outlined-basic" label="Amount" variant="outlined" onChange={handleInput} />
                            <TextField sx={{ marginRight: "10px" }} name="description" value={form.description}  id="outlined-basic" label="Description" variant="outlined" onChange={handleInput} />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DesktopDatePicker
                                    label="Transaction Date"
                                    inputFormat="MM/DD/YYYY"
                                    value={form.date}
                                    onChange={handleDate}
                                    name="date"
                                    textField={(props) => <TextField {...props} sx={{ marginRight: 5 }} />}
                                />
                            </LocalizationProvider>
                            {
                               Object.keys(editTransaction).length===0&&(<Button sx={{marginLeft:2, marginTop:0.5}} size="large" variant="contained" type="submit">Submit</Button>)
                            }
                            {
                                Object.keys(editTransaction).length!==0&&<Button sx={{marginLeft:2}} size="large" variant="contained" type="submit">Update</Button>
                            }
                        </form>
                    </CardContent>
                </React.Fragment>

            </Card>
    );
}
