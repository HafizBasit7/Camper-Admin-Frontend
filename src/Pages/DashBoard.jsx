import React from 'react';
import { Box, Grid, Typography, Container, Stack } from '@mui/material';


// Icons
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import StatCard from '../Components/DashBoardComponents/StatCard';
import PendingSection from '../Components/DashBoardComponents/PendingSection';
import RecentActivities from '../Components/DashBoardComponents/RecentActivities';
import OrdersChart from '../Components/DashBoardComponents/OrderChart';
import RevenueChart from '../Components/DashBoardComponents/RevenueChart';

const Dashboard = () => {


  const dashboardData = {
    totalUsers: 1254,
    totalVehicles: 345,
    totalOrders: 2890,
    ongoingOrders: 42,
    completedOrders: 2450,
    cancelledOrders: 398,
    earnedCommissions: 14750,
    dismissedCases: 28,
    newRequests: 17,
    pendingOrders: 56,
    pendingUsers: 23,
    pendingVehicles: 31
  };

  const statCards = [
    { 
      title: 'Total Users', 
      value: dashboardData.totalUsers, 
      icon: <PeopleOutlineIcon />, 
      color: 'primary.main' 
    },
    { 
      title: 'Total Vehicles', 
      value: dashboardData.totalVehicles, 
      icon: <DirectionsCarOutlinedIcon />, 
      color: 'primary.blue' 
    },
    { 
      title: 'Total Orders', 
      value: dashboardData.totalOrders, 
      icon: <ShoppingCartOutlinedIcon />, 
      color: 'primary.orange' 
    },
    { 
      title: 'Ongoing Orders', 
      value: dashboardData.ongoingOrders, 
      icon: <LocalShippingOutlinedIcon />, 
      color: 'primary.orange2' 
    },
    { 
      title: 'Completed Orders', 
      value: dashboardData.completedOrders, 
      icon: <TaskAltOutlinedIcon />, 
      color: 'success.main' 
    },
    { 
      title: 'Cancelled Orders', 
      value: dashboardData.cancelledOrders, 
      icon: <CancelOutlinedIcon />, 
      color: 'error.main' 
    },
    { 
      title: 'Earned Commissions', 
      value: `$${dashboardData.earnedCommissions}`, 
      icon: <AttachMoneyOutlinedIcon />, 
      color: 'success.dark' 
    },
    { 
      title: 'Dismissed Cases', 
      value: dashboardData.dismissedCases, 
      icon: <GavelOutlinedIcon />, 
      color: 'secondary.dark' 
    },
    { 
      title: 'New Requests', 
      value: dashboardData.newRequests, 
      icon: <NotificationsActiveOutlinedIcon />, 
      color: 'info.main' 
    },
    { 
      title: 'Pending Orders', 
      value: dashboardData.pendingOrders, 
      icon: <PendingActionsOutlinedIcon />, 
      color: 'warning.main' 
    }
  ];

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Dashboard
      </Typography>

      
      <Grid container spacing={3} mb={3}>
        {statCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <StatCard 
              title={card.title} 
              value={card.value} 
              icon={card.icon} 
              color={card.color} 
            />
          </Grid>
        ))}
      </Grid>
      <Stack direction="column" spacing={3}>
  <Box width="100%">
    <OrdersChart />
  </Box>
  <Box width="100%">
    <RevenueChart />
  </Box>
</Stack>

      <Box sx={{ mt: 3 }}>
  <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
    Pending Approvals
  </Typography>
  <Grid container spacing={3}>
    <Grid item xs={12} md={6} display="flex" justifyContent="center">
      <Box width="100%" maxWidth={500}>
        <PendingSection 
          title="Pending Users" 
          count={dashboardData.pendingUsers} 
          type="users" 
        />
      </Box>
    </Grid>
    <Grid item xs={12} md={6} display="flex" justifyContent="center">
      <Box width="100%" maxWidth={500}>
        <PendingSection 
          title="Pending Vehicles" 
          count={dashboardData.pendingVehicles} 
          type="vehicles" 
        />
      </Box>
    </Grid>
  </Grid>
</Box>
      <Box sx={{ mt: 3 }}>
        <RecentActivities />
      </Box>
    </Container>
  );
};

export default Dashboard;