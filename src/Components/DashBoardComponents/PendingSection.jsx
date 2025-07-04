import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText, 
  Avatar, 
  Button,
  Divider,
  useTheme,
  Chip,
  Grid,
  CircularProgress
} from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import { usePendingItems } from '../../hooks/mutations'; // Adjust path if needed

const PendingSection = ({ title, count, type }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();

   const backendType = type === 'vehicles' ? 'campers' : type;

  const { data: pendingItems = [], isLoading } = usePendingItems(backendType);

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING':
        return theme.palette.warning.main;
      case 'REVIEW':
        return theme.palette.info.main;
      default:
        return theme.palette.grey[500];
    }
  };

  const handleViewAll = () => {
    navigate(`/pending/${type}`);
  };

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card 
        elevation={0} 
        sx={{ 
          height: '100%',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          borderRadius: 3,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)'
          }
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box 
            display="flex" 
            justifyContent="space-between" 
            alignItems="center" 
            mb={3}
            sx={{ borderBottom: '1px solid', borderColor: 'divider', pb: 2 }}
          >
            <Typography variant="h6" fontWeight="bold" sx={{ color: theme.palette.text.primary, textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
              {title}
            </Typography>
            <Chip
              label={`${count} ${t('dashboard.pendingSection.pending')}`}
              sx={{
                backgroundColor: theme.palette.warning.light,
                color: theme.palette.text.primary,
                fontWeight: 600,
                borderRadius: 2,
                px: 1,
                '& .MuiChip-label': { px: 2 }
              }}
            />
          </Box>

          {isLoading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height={200}>
              <CircularProgress size={24} />
            </Box>
          ) : (
            <List sx={{ p: 0 }}>
              {pendingItems.slice(0, 3).map((item, index) => (
                <React.Fragment key={item.id}>
                  <ListItem 
                    sx={{ 
                      px: 2, 
                      py: 2,
                      borderRadius: 2,
                      mb: 1,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.02)',
                        transform: 'translateX(4px)'
                      }
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar 
                        sx={{ 
                          bgcolor: type === 'users' ? theme.palette.primary.main : theme.palette.info.main,
                          color: 'white',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                          width: 40,
                          height: 40
                        }}
                      >
                        {type === 'users' ? <PersonOutlineIcon /> : <DirectionsCarOutlinedIcon />}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="subtitle1" fontWeight={600}>
                            {item.name}
                          </Typography>
                          <Chip
                            label={t(`dashboard.pendingSection.status.${item.status.toLowerCase()}`)}
                            size="small"
                            sx={{
                              backgroundColor: getStatusColor(item.status),
                              color: 'white',
                              height: 20,
                              borderRadius: 2,
                              '& .MuiChip-label': {
                                px: 1,
                                fontSize: '0.7rem'
                              }
                            }}
                          />
                        </Box>
                      }
                      secondary={
                        <Box sx={{ mt: 0.5 }}>
                          <Typography variant="body2" color="text.secondary">
                            {item.details}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {t('dashboard.pendingSection.submitted', { date: item.date })}
                          </Typography>
                        </Box>
                      }
                    />
                    <Button 
                      size="small" 
                      variant="contained"
                      color={type === 'users' ? 'primary' : 'info'}
                      sx={{ 
                        minWidth: 100,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 500,
                        ml: 2,
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        '&:hover': {
                          transform: 'translateY(-1px)',
                          boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
                        }
                      }}
                      onClick={handleViewAll}
                    >
                      {t('dashboard.pendingSection.review')}
                    </Button>
                  </ListItem>
                  {index < pendingItems.length - 1 && (
                    <Divider 
                      variant="inset" 
                      component="li" 
                      sx={{ 
                        my: 1,
                        borderColor: 'rgba(0, 0, 0, 0.06)'
                      }} 
                    />
                  )}
                </React.Fragment>
              ))}
            </List>
          )}

          <Box 
            display="flex" 
            justifyContent="center" 
            mt={3}
            sx={{
              borderTop: '1px solid',
              borderColor: 'divider',
              pt: 2
            }}
          >
            <Button 
              endIcon={<ArrowForwardIcon />} 
              color="primary"
              onClick={handleViewAll}
              sx={{ 
                textTransform: 'none',
                fontWeight: 500,
                px: 3,
                py: 1,
                color: "#000",
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.08)'
                }
              }}
            >
              {t('dashboard.pendingSection.viewAll', { count, type })}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default PendingSection;
