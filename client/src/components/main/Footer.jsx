import React from 'react';
import Typography from '@mui/material/Typography';

function Copyright(props) {
  return (
    <Typography variant="body2" color="white" align="center" {...props}>
      {'Copyright ©'}
      MyExpensePilot
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Footer() {
  return (
    <footer style={{ backgroundColor: 'black', color: 'white', padding: '20px 0', textAlign: 'center' }}>
      <div>
        <Typography variant="body2" gutterBottom>
          Designed and developed by Rachit Agarwal.
        </Typography>
        <Typography variant="body2" gutterBottom>
          Disclaimer: This app is for personal use and should not be used for financial advice. Please consult a professional for financial decisions.
        </Typography>
      </div>
      <Copyright />
    </footer>
  );
}

export default Footer;
