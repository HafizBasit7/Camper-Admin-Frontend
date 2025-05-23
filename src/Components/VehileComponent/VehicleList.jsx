import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Tooltip,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { 
  Visibility, 
  Report, 
  Edit,
  MoreVert,
  CheckCircle,
  Cancel,
  Block,
  Help
} from '@mui/icons-material';
import { VEHICLE_STATUS, VEHICLE_TABS, getStatusColor, getStatusLabel } from '../../data/vehicleTypes';
import { mockVehicles } from '../../data/mockData';
import VehicleReports from './VehicleReports';
import VehicleDetailsDialog from './VehicleDetailsDialog';
import VehicleChangeRequests from './VehicleChangeRequests';

const VehicleList = ({ currentTab, filters, selectedOwner }) => {
  const { t } = useTranslation();
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [reportsOpen, setReportsOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [changeRequestsOpen, setChangeRequestsOpen] = useState(false);
  const [statusMenuAnchor, setStatusMenuAnchor] = useState(null);
  const [statusMenuVehicle, setStatusMenuVehicle] = useState(null);

  const handleViewReports = (vehicleId) => {
    setSelectedVehicle({ id: vehicleId });
    setReportsOpen(true);
  };

  const handleCloseReports = () => {
    setReportsOpen(false);
    setSelectedVehicle(null);
  };

  const handleViewDetails = (vehicle) => {
    setSelectedVehicle(vehicle);
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
    setSelectedVehicle(null);
  };

  const handleViewChangeRequests = (vehicle) => {
    setSelectedVehicle(vehicle);
    setChangeRequestsOpen(true);
  };

  const handleCloseChangeRequests = () => {
    setChangeRequestsOpen(false);
    setSelectedVehicle(null);
  };

  const handleStatusMenuOpen = (event, vehicle) => {
    setStatusMenuAnchor(event.currentTarget);
    setStatusMenuVehicle(vehicle);
  };

  const handleStatusMenuClose = () => {
    setStatusMenuAnchor(null);
    setStatusMenuVehicle(null);
  };

  const handleStatusChange = (newStatus) => {
    // Here you would typically make an API call to update the status
    console.log(`Changing status of vehicle ${statusMenuVehicle.id} to ${newStatus}`);
    handleStatusMenuClose();
  };

  const filteredVehicles = mockVehicles.filter(vehicle => {
    // Filter by owner if selected
    if (selectedOwner && vehicle.owner !== selectedOwner) {
      return false;
    }

    // Filter by search term
    if (filters.search && !vehicle.name.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }

    // Filter by status
    if (filters.status && vehicle.status !== filters.status) {
      return false;
    }

    // Filter by date range
    if (filters.dateRange) {
      const vehicleDate = new Date(vehicle.lastUpdated);
      const filterDate = new Date(filters.dateRange);
      if (vehicleDate < filterDate) {
        return false;
      }
    }

    // Filter by tab
    switch (currentTab) {
      case VEHICLE_TABS.ALL:
        return true;
      case VEHICLE_TABS.APPROVED:
        return vehicle.status === VEHICLE_STATUS.APPROVED;
      case VEHICLE_TABS.PENDING:
        return vehicle.status === VEHICLE_STATUS.PENDING;
      case VEHICLE_TABS.DRAFTS:
        return vehicle.status === VEHICLE_STATUS.DRAFT;
      case VEHICLE_TABS.CHANGE_REQUESTS:
        return vehicle.changeRequests && vehicle.changeRequests.length > 0;
      case VEHICLE_TABS.REPORTED:
        return vehicle.reports && vehicle.reports.length > 0;
      default:
        return true;
    }
  });

  if (filteredVehicles.length === 0) {
    return (
      <Box 
        sx={{ 
          textAlign: 'center', 
          py: 4,
          color: 'text.secondary',
          opacity: 0.8
        }}
      >
        <Typography>
          {t('vehicles.list.noVehicles')}
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <TableContainer 
        component={Paper} 
        sx={{ 
          mt: 2,
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          borderRadius: 2,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>{t('vehicles.list.table.vehicleName')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t('vehicles.list.table.owner')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t('vehicles.list.table.type')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t('vehicles.list.table.location')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t('vehicles.list.table.status')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t('vehicles.list.table.price')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t('vehicles.list.table.lastUpdated')}</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>{t('vehicles.list.table.actions')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredVehicles.map((vehicle) => (
              <TableRow 
                key={vehicle.id}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.02)',
                    transition: 'background-color 0.2s ease-in-out'
                  }
                }}
              >
                <TableCell>{vehicle.name}</TableCell>
                <TableCell>{vehicle.owner}</TableCell>
                <TableCell>{vehicle.type}</TableCell>
                <TableCell>{vehicle.location}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip
                      label={getStatusLabel(vehicle.status)}
                      sx={{
                        backgroundColor: getStatusColor(vehicle.status),
                        color: '#000',
                        fontWeight: 500,
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        minWidth: 120,
                        borderRadius: 1,
                        height: 24,
                        py: 1,
                        fontSize: '0.7rem',
                        '& .MuiChip-label': {
                          p: 1
                        }
                      }}
                    />
                    <IconButton
                      size="small"
                      onClick={(e) => handleStatusMenuOpen(e, vehicle)}
                      sx={{
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.04)'
                        }
                      }}
                    >
                      <MoreVert fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>
                <TableCell>{vehicle.price}</TableCell>
                <TableCell>{vehicle.lastUpdated}</TableCell>
                <TableCell align="right">
                  <Tooltip title={t('vehicles.list.actions.viewDetails')}>
                    <IconButton 
                      size="small" 
                      color="primary"
                      onClick={() => handleViewDetails(vehicle)}
                      sx={{
                        '&:hover': {
                          backgroundColor: 'rgba(25, 118, 210, 0.08)'
                        }
                      }}
                    >
                      <Visibility />
                    </IconButton>
                  </Tooltip>
                  {vehicle.changeRequests && vehicle.changeRequests.length > 0 && (
                    <Tooltip title={t('vehicles.list.actions.viewChangeRequests')}>
                      <IconButton
                        size="small"
                        color="warning"
                        onClick={() => handleViewChangeRequests(vehicle)}
                        sx={{
                          '&:hover': {
                            backgroundColor: 'rgba(237, 108, 2, 0.08)'
                          }
                        }}
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                  )}
                  {vehicle.reports && vehicle.reports.length > 0 && (
                    <Tooltip title={t('vehicles.list.actions.viewReports')}>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleViewReports(vehicle.id)}
                        sx={{
                          '&:hover': {
                            backgroundColor: 'rgba(211, 47, 47, 0.08)'
                          }
                        }}
                      >
                        <Report />
                      </IconButton>
                    </Tooltip>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <VehicleDetailsDialog
        open={detailsOpen}
        onClose={handleCloseDetails}
        vehicle={selectedVehicle}
      />

      <VehicleReports
        open={reportsOpen}
        onClose={handleCloseReports}
        vehicleId={selectedVehicle?.id}
      />

      <VehicleChangeRequests
        open={changeRequestsOpen}
        onClose={handleCloseChangeRequests}
        vehicle={selectedVehicle}
      />

      <Menu
        anchorEl={statusMenuAnchor}
        open={Boolean(statusMenuAnchor)}
        onClose={handleStatusMenuClose}
        PaperProps={{
          sx: {
            minWidth: 200,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: 2,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }
        }}
      >
        <MenuItem onClick={() => handleStatusChange(VEHICLE_STATUS.APPROVED)}>
          <ListItemIcon>
            <CheckCircle color="success" />
          </ListItemIcon>
          <ListItemText>{t('vehicles.list.actions.approve')}</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange(VEHICLE_STATUS.PENDING)}>
          <ListItemIcon>
            <Help color="warning" />
          </ListItemIcon>
          <ListItemText>{t('vehicles.list.actions.markPending')}</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange(VEHICLE_STATUS.SUSPENDED)}>
          <ListItemIcon>
            <Block color="error" />
          </ListItemIcon>
          <ListItemText>{t('vehicles.list.actions.suspend')}</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange(VEHICLE_STATUS.REJECTED)}>
          <ListItemIcon>
            <Cancel color="error" />
          </ListItemIcon>
          <ListItemText>{t('vehicles.list.actions.reject')}</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default VehicleList; 