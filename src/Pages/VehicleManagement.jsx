import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { VEHICLE_TABS } from '../data/vehicleTypes';
import VehicleList from '../Components/VehileComponent/VehicleList';
import VehicleFilters from '../Components/VehileComponent/VehicleFilters';
import VehicleStats from '../Components/VehileComponent/VehicleStats';
import OwnerList from '../Components/VehileComponent/OwnerList';
import { mockVehicles } from '../data/mockData';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useOwnerVehicles } from '../hooks/mutations';

const VehicleManagement = () => {
  const { t } = useTranslation();
  const [currentTab, setCurrentTab] = useState(VEHICLE_TABS.ALL);
  const [filters, setFilters] = useState({
    search: '',
    dateRange: null,
    status: null
  });
  const theme = useTheme();
  const { ownerId }  = useParams();
  const location     = useLocation();
  const navigate = useNavigate();
  const ownerName    = location.state?.ownerName;

 const { data: vehicles = [], isLoading } = useOwnerVehicles(ownerId, {
  search : filters.search,
  status : filters.status,
  // dateRange etc. can be forwarded the same way
});

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
  const filteredVehicles = vehicles;

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
                {t('vehicles.backToOwners')}
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
                {t('vehicles.vehiclesForOwner', { ownerName: decodeURIComponent(ownerName) })}
              </Typography>
              <Typography 
                variant="body1" 
                sx={{
                  color: theme.palette.text.secondary,
                  opacity: 0.8
                }}
              >
                {t('vehicles.manageVehicles')}
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
                <Tab label={t('vehicles.tabs.all')} value={VEHICLE_TABS.ALL} />
                <Tab label={t('vehicles.tabs.approved')} value={VEHICLE_TABS.APPROVED} />
                <Tab label={t('vehicles.tabs.pending')} value={VEHICLE_TABS.PENDING} />
                <Tab label={t('vehicles.tabs.drafts')} value={VEHICLE_TABS.DRAFTS} />
                <Tab label={t('vehicles.tabs.changeRequests')} value={VEHICLE_TABS.CHANGE_REQUESTS} />
                <Tab label={t('vehicles.tabs.reported')} value={VEHICLE_TABS.REPORTED} />
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

