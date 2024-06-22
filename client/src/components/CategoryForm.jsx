import * as React from 'react';
import { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Box, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import {useDispatch, useSelector} from "react-redux"
import { getUser } from '../slice/authSlice';
import Cookies from "js-cookie";

const initialFormState = {
    label:"",
    icon:""
};
const icons=[{
    label:"User"
}]
export default function CategoryForm({setEditCategory,editCategory}) {
    const [form, setForm] = useState(initialFormState);
    const token = Cookies.get("token");
    const user=useSelector((state)=>state.auth);
    const dispatch=useDispatch();

    useEffect(() => {  
        if (Object.keys(editCategory).length !== 0) {
            setForm(editCategory);
        }
    }, [editCategory]);


    async function reload(res){
        console.log(editCategory)
        if(res.ok){
            console.log(234)
            const userNew=await res.json();
            dispatch(getUser({user:userNew.user}));
            setForm(initialFormState)
        }
    }
    async function update() {
        const res = await fetch(`${import.meta.env.VITE_URL}/category/${editCategory._id}`, {
            method: "PATCH",
            body: JSON.stringify(form),
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        reload(res);
    }

    async function create() {
        const res = await fetch(`${import.meta.env.VITE_URL}/category`, {
            method: "POST",
            body: JSON.stringify(form),
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        reload(res);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        Object.keys(editCategory).length === 0 ? await create() : await update();
    };


    const handleInput = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <Card variant="outlined" sx={{  marginTop: 15,border: '2px solid #FFFFFF', boxShadow: "0px 1px 15px rgba(5, 5, 5, 0.15)", borderRadius: '12px', background: "#f7f9fc" }}>
            <React.Fragment>
                <CardContent>
                    <Typography className="text" variant="h6" align="center" gutterBottom>
                        ADD A NEW CATEGORY
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs>
                                <TextField
                                    fullWidth
                                    name="label"
                                    value={form.label}
                                    label="Label"
                                    variant="outlined"
                                    onChange={handleInput}
                                />
                            </Grid>
                            <Grid item xs>
                                <Autocomplete
                                    value={form.icon}
                                    onChange={(event, newValue) => {
                                        setForm({ ...form, icon:newValue.label});
                                    }}
                                    options={icons}
                                    renderInput={(params) => <TextField {...params} label="icon" fullWidth />}
                                />
                            </Grid>
                            <Grid item>
                                <Button
                                    size="large"
                                    variant="contained"
                                    type="submit"
                                >
                                {
                                    Object.keys(editCategory).length===0?"Submit":"Update"
                                }
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
            </React.Fragment>
        </Card>
    );
}
