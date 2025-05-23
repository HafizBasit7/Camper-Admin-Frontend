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
  Button,
  Chip,
  Divider
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const RecentActivities = () => {
  const { t } = useTranslation();

  // This would come from your API
  const activities = [
    {
      id: 1,
      type: 'user_approved',
      user: 'Alex Johnson',
      time: '10 minutes ago',
      icon: <PersonOutlineIcon />,
      iconColor: 'primary.main',
      status: 'approved'
    },
    {
      id: 2,
      type: 'vehicle_rejected',
      user: 'Maria Garcia',
      vehicleName: '2023 BMW X5',
      time: '25 minutes ago',
      icon: <DirectionsCarOutlinedIcon />,
      iconColor: 'primary.blue',
      status: 'rejected'
    },
    {
      id: 3,
      type: 'order_completed',
      user: 'James Wilson',
      orderNumber: 'ORD-2025-5689',
      time: '1 hour ago',
      icon: <ShoppingCartOutlinedIcon />,
      iconColor: 'primary.orange',
      status: 'completed'
    },
    {
      id: 4,
      type: 'case_dismissed',
      user: 'Robert Brown',
      caseNumber: 'CASE-2025-123',
      time: '2 hours ago',
      icon: <GavelOutlinedIcon />,
      iconColor: 'secondary.dark',
      status: 'dismissed'
    },
    {
      id: 5,
      type: 'order_cancelled',
      user: 'Emily Davis',
      orderNumber: 'ORD-2025-5684',
      time: '3 hours ago',
      icon: <ShoppingCartOutlinedIcon />,
      iconColor: 'primary.orange',
      status: 'cancelled'
    },
  ];

  const getActivityContent = (activity) => {
    switch (activity.type) {
      case 'user_approved':
        return t('dashboard.recentActivities.activities.userApproved', { user: activity.user });
      case 'vehicle_rejected':
        return t('dashboard.recentActivities.activities.vehicleRejected', { 
          vehicleName: activity.vehicleName, 
          user: activity.user 
        });
      case 'order_completed':
        return t('dashboard.recentActivities.activities.orderCompleted', { 
          orderNumber: activity.orderNumber, 
          user: activity.user 
        });
      case 'case_dismissed':
        return t('dashboard.recentActivities.activities.caseDismissed', { 
          caseNumber: activity.caseNumber, 
          user: activity.user 
        });
      case 'order_cancelled':
        return t('dashboard.recentActivities.activities.orderCancelled', { 
          orderNumber: activity.orderNumber, 
          user: activity.user 
        });
      default:
        return 'Unknown activity';
    }
  };

  const getStatusChip = (status) => {
    let color, icon, label;
    
    switch (status) {
      case 'approved':
        color = 'success';
        icon = <CheckCircleOutlineIcon fontSize="small" />;
        label = t('dashboard.recentActivities.status.approved');
        break;
      case 'rejected':
      case 'cancelled':
        color = 'error';
        icon = <CancelOutlinedIcon fontSize="small" />;
        label = status === 'rejected' 
          ? t('dashboard.recentActivities.status.rejected')
          : t('dashboard.recentActivities.status.cancelled');
        break;
      case 'completed':
        color = 'success';
        icon = <CheckCircleOutlineIcon fontSize="small" />;
        label = t('dashboard.recentActivities.status.completed');
        break;
      case 'dismissed':
        color = 'secondary';
        icon = <GavelOutlinedIcon fontSize="small" />;
        label = t('dashboard.recentActivities.status.dismissed');
        break;
      default:
        color = 'default';
        label = status;
    }
    
    return (
      <Chip 
        size="small" 
        color={color} 
        icon={icon} 
        label={label}
        sx={{ height: 24, minWidth: 100, borderRadius: 2 }}
      />
    );
  };

  return (
    <Card 
      elevation={0} 
      sx={{ 
        border: '1px solid',
        borderColor: 'primary.verylight',
        borderRadius: 2
      }}
    >
      <CardContent>
        <Typography variant="h6" mb={2}>{t('dashboard.recentActivities.title')}</Typography>
        
        <List sx={{ p: 0 }}>
          {activities.map((activity, index) => (
            <React.Fragment key={activity.id}>
              <ListItem 
                sx={{ 
                  px: 1, 
                  py: 1.5,
                  '&:hover': {
                    bgcolor: 'primary.verylight',
                    borderRadius: 1
                  }
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "#fff", color: activity.iconColor }}>
                    {activity.icon}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary={getActivityContent(activity)}
                  secondary={activity.time}
                  primaryTypographyProps={{ fontWeight: 500 }}
                />
                {getStatusChip(activity.status)}
              </ListItem>
              {index < activities.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
        
        <Box display="flex" justifyContent="center" mt={2}>
          <Button 
            endIcon={<ArrowForwardIcon />} 
            color="primary"
            sx={{ textTransform: 'none' }}
          >
            {t('dashboard.recentActivities.viewAll')}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RecentActivities;