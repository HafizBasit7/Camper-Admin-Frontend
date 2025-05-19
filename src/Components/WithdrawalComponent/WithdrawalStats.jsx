import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  useTheme
} from '@mui/material';
import {
  AccountBalance,
  PendingActions,
  CheckCircle,
  Warning,
  AttachMoney
} from '@mui/icons-material';
import { mockWithdrawals, getWithdrawalStats } from '../../data/mockData';

const StatCard = ({ title, value, icon, color }) => {
  const theme = useTheme();
  
  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        height: '100%',
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        borderRadius: 2,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)'
        }
      }}
    >
      <Box
        sx={{
          backgroundColor: color,
          borderRadius: '50%',
          p: 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'scale(1.1)'
          }
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography 
          variant="h6" 
          fontWeight="bold"
          sx={{
            color: theme.palette.text.primary,
            textShadow: '0 1px 2px rgba(0,0,0,0.1)'
          }}
        >
          {value}
        </Typography>
        <Typography 
          variant="body2" 
          sx={{
            color: theme.palette.text.secondary,
            opacity: 0.8
          }}
        >
          {title}
        </Typography>
      </Box>
    </Paper>
  );
};

const WithdrawalStats = () => {
  const theme = useTheme();
  const stats = getWithdrawalStats(mockWithdrawals);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Total Withdrawals"
          value={stats.total}
          icon={<AccountBalance sx={{ color: '#fff', fontSize: 28 }} />}
          color={theme.palette.primary.main}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Pending Amount"
          value={`$${stats.pendingAmount.toFixed(2)}`}
          icon={<PendingActions sx={{ color: '#fff', fontSize: 28 }} />}
          color={theme.palette.warning.main}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Completed"
          value={stats.completed}
          icon={<CheckCircle sx={{ color: '#fff', fontSize: 28 }} />}
          color={theme.palette.success.main}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Total Amount"
          value={`$${stats.totalAmount.toFixed(2)}`}
          icon={<AttachMoney sx={{ color: '#fff', fontSize: 28 }} />}
          color={theme.palette.info.main}
        />
      </Grid>
    </Grid>
  );
};

export default WithdrawalStats; 