import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOut } from '../slice/authSlice';
import { useSelector } from 'react-redux';
import Cookies from "js-cookie"
export default function ButtonAppBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth)
  function logout() {
    Cookies.remove('token');
    dispatch(logOut());
    navigate("/login");
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" className='textWhite'>
              Expense Tracker
            </Link>
          </Typography>
          {
            auth.isAuthorized && <Button color="inherit" onClick={logout}>LOGOUT</Button>
          }
          {
            !auth.isAuthorized && <>
              <Link to="/login" className="textWhite">
                <Button color="inherit">LOGIN</Button>
              </Link>
              <Link to="/register" className="textWhite">
                <Button color="inherit">SIGNUP</Button>
              </Link>
            </>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}