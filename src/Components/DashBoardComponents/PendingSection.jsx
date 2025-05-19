import React from 'react';
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
  Divider
} from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const PendingSection = ({ title, count, type }) => {
  // This would come from your API
  const pendingItems = [
    { id: 1, name: type === 'users' ? 'John Smith' : '2022 Toyota Camry', date: '18 May 2025' },
    { id: 2, name: type === 'users' ? 'Maria Garcia' : '2023 Honda Civic', date: '17 May 2025' },
    { id: 3, name: type === 'users' ? 'James Wilson' : '2021 Ford Explorer', date: '16 May 2025' },
  ];

  return (
    <Card 
      elevation={0} 
      sx={{ 
        height: '100%',
        border: '1px solid',
        borderColor: 'primary.verylight',
        borderRadius: 2
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">{title}</Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              bgcolor: 'warning.light', 
              color: 'warning.dark', 
              px: 1.5, 
              py: 0.5, 
              borderRadius: 1,
              fontWeight: 500
            }}
          >
            {count} pending
          </Typography>
        </Box>
        
        <List sx={{ p: 0 }}>
          {pendingItems.map((item, index) => (
            <React.Fragment key={item.id}>
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
                  <Avatar 
                    sx={{ 
                      bgcolor: type === 'users' ? 'primary.light' : 'primary.blue', 
                      color: 'white' 
                    }}
                  >
                    {type === 'users' ? <PersonOutlineIcon /> : <DirectionsCarOutlinedIcon />}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary={item.name} 
                  secondary={`Submitted: ${item.date}`}
                  primaryTypographyProps={{ fontWeight: 500 }}
                />
                <Button 
                  size="small" 
                  variant="outlined" 
                  color={type === 'users' ? 'primary' : 'info'}
                  sx={{ minWidth: 80,ml:2 }}
                >
                  Review
                </Button>
              </ListItem>
              {index < pendingItems.length - 1 && <Divider variant="inset" component="li" />}
            </React.Fragment>
          ))}
        </List>
        
        <Box display="flex" justifyContent="center" mt={2}>
          <Button 
            endIcon={<ArrowForwardIcon />} 
            color="primary"
            sx={{ textTransform: 'none' }}
          >
            View all {count} pending {type}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PendingSection;