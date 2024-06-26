import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import {Link as RouterLink} from "react-router-dom"
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Cookies from "js-cookie"
import { ToastContainer,toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../components/main/Footer';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      MyExpensePilot
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function SignUp() {
  const navigate=useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const form={
      email: data.get('email'),
      password: data.get('password'),
      firstName:data.get('firstName'),
      lastName:data.get('lastName')
    };
    const res=await fetch(`${import.meta.env.VITE_URL}/auth/register`,{
        method:"POST",
        body:JSON.stringify(form),
        headers:{
          "content-type": "application/json"
        }
    })
    const notify=(message)=>{
      toast.error(message,{
        position:"top-center"
      })
    }
    const {token,message}=await res.json();
    if(res.ok){
      Cookies.set("token",token);
      navigate("/login",{ state: { fromRegister:true } })
    }else{
      notify(message)
    }
  };

  return (
      <>
      <Container component="main" className="background-image" maxWidth="xs" sx={{paddingTop:"4%" ,minHeight: '84vh'}} >
        <CssBaseline />
        <ToastContainer/>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <RouterLink to="/login">
                  <Link component="span" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </RouterLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Footer/>
      </>
  );
}
export default SignUp;