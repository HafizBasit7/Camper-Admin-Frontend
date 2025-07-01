import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Grid,
  Paper,
  Typography,
  Box,
  useTheme
} from '@mui/material';
import {
  DirectionsCar,
  PendingActions,
  CheckCircle,
  Warning,
  Block,
  Help,
  Cancel
} from '@mui/icons-material';
/* ------------------------------------------------------------------ */
/*  A reusable card                                                   */
/* ------------------------------------------------------------------ */
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
        background: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(10px)',
        borderRadius: 2,
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
        border: '1px solid rgba(255,255,255,0.2)',
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
           transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)'
        }
        }}
      >
        {icon}
      </Box>

      <Box>
        <Typography variant="h6" fontWeight="bold" color="text.primary">
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ opacity: 0.8 }}>
          {title}
        </Typography>
      </Box>
    </Paper>
  );
};

/* ------------------------------------------------------------------ */
/*  Main component                                                    */
/* ------------------------------------------------------------------ */
/**
 * @param {{ vehicles: Array, loading?: boolean }} props
 */
const VehicleStats = ({ vehicles = [], loading = false }) => {
  const { t }  = useTranslation();
  const theme  = useTheme();

  /* ---------------- aggregate counts ---------------- */
  const counts = React.useMemo(() => {
    const c = {
      total:      vehicles.length,
      pending:    0,
      active:     0,    // “approved” in the UI
      suspended:  0,
      rejected:   0,
      reported:   0,
      unverified: 0,
    };

    vehicles.forEach(v => {
      const s = String(v.status).toLowerCase();

      if (s === 'pending')   c.pending   += 1;
      if (s === 'active')    c.active    += 1;
      if (s === 'suspended') c.suspended += 1;
      if (s === 'rejected')  c.rejected  += 1;
      if (v.reports?.length) c.reported  += 1;
      if (s === 'unverified') c.unverified += 1;
    });

    return c;
  }, [vehicles]);

  /* ---------------- loading state ---------------- */
  if (loading) {
    return (
      <Box sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress size={32} />
      </Box>
    );
  }

  /* ---------------- UI ---------------- */
  return (
    <Grid container spacing={2}>
      {/* total */}
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title={t('vehicles.stats.totalVehicles')}
          value={counts.total}
          icon={<DirectionsCar sx={{ color: '#fff', fontSize: 28 }} />}
          color={theme.palette.primary.main}
        />
      </Grid>

      {/* pending */}
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title={t('vehicles.stats.pendingApproval')}
          value={counts.pending}
          icon={<PendingActions sx={{ color: '#fff', fontSize: 28 }} />}
          color={theme.palette.warning.main}
        />
      </Grid>

      {/* active / approved */}
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title={t('vehicles.stats.approved')}
          value={counts.active}
          icon={<CheckCircle sx={{ color: '#fff', fontSize: 28 }} />}
          color={theme.palette.success.main}
        />
      </Grid>

      {/* reported */}
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title={t('vehicles.stats.reportedIssues')}
          value={counts.reported}
          icon={<Warning sx={{ color: '#fff', fontSize: 28 }} />}
          color={theme.palette.error.main}
        />
      </Grid>

      {/* suspended */}
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title={t('vehicles.stats.suspended')}
          value={counts.suspended}
          icon={<Block sx={{ color: '#fff', fontSize: 28 }} />}
          color={theme.palette.error.dark}
        />
      </Grid>

      {/* unverified */}
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title={t('vehicles.stats.unverified')}
          value={counts.unverified}
          icon={<Help sx={{ color: '#fff', fontSize: 28 }} />}
          color={theme.palette.warning.dark}
        />
      </Grid>

      {/* rejected */}
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title={t('vehicles.stats.rejected')}
          value={counts.rejected}
          icon={<Cancel sx={{ color: '#fff', fontSize: 28 }} />}
          color={theme.palette.error.light}
        />
      </Grid>
    </Grid>
  );
};

export default VehicleStats;
