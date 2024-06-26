import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';

function AppAppBar() {
  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent', // Ensure the background is transparent
          backgroundImage: 'none',
          mt: 2,
          backdropFilter: 'blur(24px)', // Ensure backdrop filter is applied correctly
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              borderRadius: '999px',
              bgcolor: 'rgba(255, 255, 255, 0.4)', // Background color for the Toolbar
              backdropFilter: 'blur(24px)', // Ensure backdrop filter is applied correctly
              maxHeight: 40,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
            }}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: "center",
                textAlign: "center",
                ml: '-18px',
                px: 0,
                maxWidth: '100%'
              }}
            >
              <Typography className="textColor" sx={{ fontSize: { xs: 18, sm: 25 } }}>
                MyExpensePilot - Your very own Expense Tracker
              </Typography>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default AppAppBar;
