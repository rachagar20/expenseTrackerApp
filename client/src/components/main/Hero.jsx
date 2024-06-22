import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate=useNavigate();
  return (
    <Box
      id="hero"
      sx={{
        width: '100%',
        backgroundSize: '100% 20%',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
          <Typography
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignSelf: 'center',
              textAlign: 'center',
              fontSize: 'clamp(3.5rem, 10vw, 4rem)',
            }}
          >
            MyExpense
            <Typography
              component="span"
              variant="h1"
              sx={{
                fontSize: 'clamp(3rem, 10vw, 4rem)',
                color:'primary.main',
              }}
            >
            Pilot
            </Typography>
          </Typography>
          <Typography
            textAlign="center"
            color="text.secondary"
            sx={{ alignSelf: 'center', width: { sm: '100%', md: '80%' } }}
          >
            Your go-to Expense Tracker for effortless money management. With intuitive expense tracking and insightful charts, MyExpensePilot helps you visualize your spending patterns and take control of your finances like never before.<br/>
            Spend,Track and Analyse
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignSelf="center"
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: '100%', sm: 'auto' } }}
          >
            <Button variant="contained" color="primary" onClick={()=>{navigate("/login")}}>
              Get Started
            </Button>
          </Stack>
          <Typography variant="caption" textAlign="center" >
            By clicking &quot;Get Started&quot; you will be directed our&nbsp;
            <Typography sx={{color:" lightB lue"}}>
              Login Page
            </Typography>
            .
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}