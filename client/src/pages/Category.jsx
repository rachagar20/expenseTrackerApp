import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {IconButton} from '@mui/material';
import Cookies from "js-cookie"
import { useSelector,useDispatch } from 'react-redux';
import { getUser } from '../slice/authSlice';
import {Container} from '@mui/material';
import CategoryForm from '../components/CategoryForm';
export default function Category() {
    const token=Cookies.get("token")
    const user=useSelector((state)=>state.auth.user)
    const dispatch=useDispatch()
    const [editCategory,setEditCategory]=React.useState({})
    const deleteLabel=async (id)=>{
        const res=await fetch(`http://localhost:3000/category/${id}`,{
            method:"DELETE",
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        if(res.ok){
            const {user}=await res.json();
            console.log(user);
            dispatch(getUser({user:user}));
        }
        
    }

    const editLabel=async(category)=>{
        setEditCategory(category);
    }
    return (
        <Container>
            <CategoryForm  setEditCategory={setEditCategory} editCategory={editCategory}/>
            <Typography className="text" variant="h6" sx={{ marginTop: 10,textAlign:"center" }}>
                LIST OF ALL CATEGORIES
            </Typography>
            <TableContainer sx={{ marginTop: 5,border: '2px solid #FFFFFF', boxShadow: "0px 1px 15px rgba(5, 5, 5, 0.15)", borderRadius: '12px', background: "#f7f9fc",marginBottom:5}} component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Label</TableCell>
                            <TableCell align="center">Icon</TableCell>
                            <TableCell align="center">Action</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {user?.categories?.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center" component="th" scope="row">
                                    {row.label}
                                </TableCell>
                                <TableCell align="center">{row.icon}</TableCell>
                                <TableCell align="center">
                                    <IconButton color="primary" component="label" onClick={()=>editLabel(row)} >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="warning" aria-label="delete" onClick={()=>deleteLabel(row._id)} >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}
