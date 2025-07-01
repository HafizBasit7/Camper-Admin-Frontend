// src/Components/DashBoardComponents/RecentActivities.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Card,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  Divider,
  Button,
  Skeleton,
} from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

/* icons ------------------------------------------------------------ */
import PersonOutlineIcon          from '@mui/icons-material/PersonOutline';
import DirectionsCarOutlinedIcon  from '@mui/icons-material/DirectionsCarOutlined';
import ShoppingCartOutlinedIcon   from '@mui/icons-material/ShoppingCartOutlined';
import GavelOutlinedIcon          from '@mui/icons-material/GavelOutlined';
import CheckCircleOutlineIcon     from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon         from '@mui/icons-material/CancelOutlined';
import ArrowForwardIcon           from '@mui/icons-material/ArrowForward';

/* ------------------------------------------------------------------ */
/*  Accept activities + loading via props (Dashboard passes them)     */
/* ------------------------------------------------------------------ */
const RecentActivities = ({ activities = [], loading = false }) => {
  const { t } = useTranslation();

  /* ---------------------------------------------------------------- */
  /*  Helpers                                                         */
  /* ---------------------------------------------------------------- */
  const iconForType = type => {
    switch (type) {
      case 'user_approved':       return <PersonOutlineIcon />;
      case 'vehicle_rejected':    return <DirectionsCarOutlinedIcon />;
      case 'order_completed':     return <ShoppingCartOutlinedIcon />;
      case 'order_cancelled':     return <ShoppingCartOutlinedIcon />;
      case 'case_dismissed':      return <GavelOutlinedIcon />;
      default:                    return <PersonOutlineIcon />;
    }
  };

  const primaryText = a => {
    switch (a.type) {
      case 'user_approved':
        return t('dashboard.recentActivities.activities.userApproved', { user: a.user });
      case 'vehicle_rejected':
        return t('dashboard.recentActivities.activities.vehicleRejected', {
          vehicleName: a.vehicleName,
          user       : a.user,
        });
      case 'order_completed':
        return t('dashboard.recentActivities.activities.orderCompleted', {
          orderNumber: a.orderNumber,
          user       : a.user,
        });
      case 'order_cancelled':
        return t('dashboard.recentActivities.activities.orderCancelled', {
          orderNumber: a.orderNumber,
          user       : a.user,
        });
      case 'case_dismissed':
        return t('dashboard.recentActivities.activities.caseDismissed', {
          caseNumber: a.caseNumber,
          user      : a.user,
        });
      default:
        return '—';
    }
  };

  const statusChip = status => {
    switch (status) {
      case 'approved':
        return <Chip size="small" color="success" icon={<CheckCircleOutlineIcon fontSize="small" />}  label={t('dashboard.recentActivities.status.approved')}  />;
      case 'completed':
        return <Chip size="small" color="success" icon={<CheckCircleOutlineIcon fontSize="small" />}  label={t('dashboard.recentActivities.status.completed')} />;
      case 'rejected':
        return <Chip size="small" color="error"   icon={<CancelOutlinedIcon     fontSize="small" />}  label={t('dashboard.recentActivities.status.rejected')}  />;
      case 'cancelled':
        return <Chip size="small" color="error"   icon={<CancelOutlinedIcon     fontSize="small" />}  label={t('dashboard.recentActivities.status.cancelled')} />;
      case 'dismissed':
        return <Chip size="small" color="secondary" icon={<GavelOutlinedIcon fontSize="small" />}    label={t('dashboard.recentActivities.status.dismissed')} />;
      default:
        return null;
    }
  };

  /* ---------------------------------------------------------------- */
  /*  Render                                                          */
  /* ---------------------------------------------------------------- */
  return (
    <Card elevation={0} sx={{ border: 1, borderColor: 'primary.verylight', borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" mb={2}>
          {t('dashboard.recentActivities.title')}
        </Typography>

        {/* skeleton while loading ----------------------------------- */}
        {loading ? (
          <Box>
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} variant="rectangular" height={56} sx={{ mb: i === 4 ? 0 : 1 }} />
            ))}
          </Box>
        ) : (
          <List sx={{ p: 0 }}>
            {activities.length === 0 && (
              <Typography variant="body2" color="text.secondary" sx={{ ml: 2, mb: 2 }}>
                {t('dashboard.recentActivities.noActivity')}
              </Typography>
            )}

            {activities.map((a, idx) => (
              <React.Fragment key={`${a.type}-${idx}`}>
                <ListItem
                  sx={{
                    px: 1,
                    py: 1.5,
                    '&:hover': { bgcolor: 'primary.verylight', borderRadius: 1 },
                  }}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: '#fff', color: 'primary.main' }}>
                      {iconForType(a.type)}
                    </Avatar>
                  </ListItemAvatar>

                <ListItemText
  primary={primaryText(a)}
  secondary={dayjs(a.time).fromNow()}
  primaryTypographyProps={{ fontWeight: 500 }}
/>

                  {statusChip(a.status)}
                </ListItem>

                {idx < activities.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        )}

        <Box display="flex" justifyContent="center" mt={2}>
          <Button endIcon={<ArrowForwardIcon />} sx={{ textTransform: 'none' }}>
            {t('dashboard.recentActivities.viewAll')}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
