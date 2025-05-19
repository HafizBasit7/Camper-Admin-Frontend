import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Paper,
  useTheme,
  Button,
  Breadcrumbs,
  Link
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { VEHICLE_TABS } from '../data/vehicleTypes';
import VehicleList from '../Components/VehileComponent/VehicleList';
import VehicleFilters from '../Components/VehileComponent/VehicleFilters';
import VehicleStats from '../Components/VehileComponent/VehicleStats';
import OwnerList from '../Components/VehileComponent/OwnerList';
import { mockVehicles } from '../data/mockData';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const VehicleManagement = () => {
  const [currentTab, setCurrentTab] = useState(VEHICLE_TABS.ALL);
  const [filters, setFilters] = useState({
    search: '',
    dateRange: null,
    status: null
  });
  const theme = useTheme();
  const { ownerName } = useParams();
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleBackToOwners = () => {
    navigate('/vehicle');
  };

  // Filter vehicles by owner if ownerName is present
  const filteredVehicles = ownerName 
    ? mockVehicles.filter(vehicle => vehicle.owner === decodeURIComponent(ownerName))
    : mockVehicles;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#fff',
        py: 4
      }}
    >
      <Container maxWidth="xl">
        {ownerName ? (
          // Vehicle List View
          <>
            <Box sx={{ mb: 4 }}>
              <Button
                startIcon={<ArrowBackIcon />}
                onClick={handleBackToOwners}
                sx={{ mb: 2 }}
              >
                Back to Owners
              </Button>
              <Typography 
                variant="h4" 
                fontWeight="bold" 
                sx={{
                  color: theme.palette.text.primary,
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  mb: 1
                }}
              >
                Vehicles for {decodeURIComponent(ownerName)}
              </Typography>
              <Typography 
                variant="body1" 
                sx={{
                  color: theme.palette.text.secondary,
                  opacity: 0.8
                }}
              >
                Manage and monitor vehicles for this owner
              </Typography>
            </Box>

            <VehicleStats vehicles={filteredVehicles} />

            <Paper 
              sx={{ 
                mt: 4, 
                mb: 2,
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                borderRadius: 2,
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <Tabs
                value={currentTab}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  borderBottom: 1,
                  borderColor: 'divider',
                  '& .MuiTab-root': {
                    textTransform: 'none',
                    fontWeight: 500,
                    minWidth: 120,
                    color: theme.palette.text.secondary,
                    '&.Mui-selected': {
                      color: theme.palette.primary.main,
                      fontWeight: 600
                    }
                  },
                  '& .MuiTabs-indicator': {
                    backgroundColor: theme.palette.primary.main,
                    height: 3,
                    borderRadius: '3px 3px 0 0'
                  }
                }}
              >
                <Tab label="All Vehicles" value={VEHICLE_TABS.ALL} />
                <Tab label="Approved" value={VEHICLE_TABS.APPROVED} />
                <Tab label="Pending Approval" value={VEHICLE_TABS.PENDING} />
                <Tab label="Drafts" value={VEHICLE_TABS.DRAFTS} />
                <Tab label="Change Requests" value={VEHICLE_TABS.CHANGE_REQUESTS} />
                <Tab label="Reported Issues" value={VEHICLE_TABS.REPORTED} />
              </Tabs>
            </Paper>

            <VehicleFilters filters={filters} onFilterChange={handleFilterChange} />
            
            <VehicleList 
              currentTab={currentTab} 
              filters={filters}
              vehicles={filteredVehicles}
            />
          </>
        ) : (
          // Owner List View
          <OwnerList />
        )}
      </Container>
    </Box>
  );
};

export default VehicleManagement; 

