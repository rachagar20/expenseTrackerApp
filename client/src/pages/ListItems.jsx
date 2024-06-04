import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PaidIcon from '@mui/icons-material/Paid';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link, Navigate } from 'react-router-dom';
export const mainListItems = (
  <React.Fragment>
    <Link to="/dashboard" style={{ textDecoration: "none", color: "black" }}>
      <ListItemButton>
        <ListItemIcon>
        <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" sx={{ textDecoration: "none" }} />
      </ListItemButton>
    </Link>
    <Link to="/transaction" style={{ textDecoration: "none", color: "black" }}>
      <ListItemButton>
        <ListItemIcon>
        <PaidIcon />
        </ListItemIcon>
        <ListItemText primary="Transactions" sx={{ textDecoration: "none" }} />
      </ListItemButton>
    </Link>
    <Link to="/category" style={{ textDecoration: "none", color: "black" }}>
      <ListItemButton>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Categories" />
      </ListItemButton>
    </Link>
    <Link to="/analysis"  style={{ textDecoration: "none", color: "black" }}>
      <ListItemButton>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Analysis" />
      </ListItemButton>
    </Link>

  </React.Fragment>
);

