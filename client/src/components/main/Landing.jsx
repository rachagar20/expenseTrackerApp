import React from 'react';
import "./mainPage.css"
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Footer from './Footer';
import AppAppBar from './AppAppBar';
import Hero from './Hero';

import Features from './Features';
import { Container } from '@mui/material';


export default function LandingPage() {
  return (
        <>
      <AppAppBar />
      <Hero />
      <Container>
      <Box sx={{ bgcolor: 'background.default',marginTop:10, marginBottom:10, borderRadius:"20px"}}>
        <Features />
      </Box>
      </Container>
      <Footer/>
    </>
  );
}