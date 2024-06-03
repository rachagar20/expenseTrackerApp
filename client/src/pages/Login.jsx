import * as React from 'react';
import { useState,useRef,useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { Link as RouterLink } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Cookies from "js-cookie";
import { useNavigate,useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUser } from '../slice/authSlice';
import {toast,ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

import "../index.css"
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
        ExpenseTracker
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Login() {
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const location = useLocation();
  const notify=(message)=>{

    if(message!=-1){
      toast.error(message||"Some error has occurred.Please try again later!!", {
        position: "top-center"
      });
    }else {
      toast.success("User Created Successfully!",{
        position:"top-center"
      })
    }
  } 

  useEffect(() => {
    console.log(location.state?.fromRegister)
    if (location.state?.fromRegister) {
       notify(-1);
       navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location,navigate]);



  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const form = {
      email: data.get('email'),
      password: data.get('password'),
    };
    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const result = await res.json();

    if (res.ok) {
      const { token, user } = result;
      Cookies.set("token", token);
      dispatch(getUser(user));
      navigate("/");
      console.log("USER SIGNED IN!!!");
    } else {
      if (emailRef.current) emailRef.current.value = '';
      if (passwordRef.current) passwordRef.current.value = null;
      notify(result.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            inputRef={emailRef}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            inputRef={passwordRef}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <RouterLink to="/register">
                <Link component="span" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </RouterLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}

export default Login;
