import React from 'react';
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
  Typography,
  Chip,
  IconButton,
  Tooltip,
  useTheme
} from '@mui/material';
import { Visibility, DirectionsCar } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { mockVehicles } from '../../data/mockData';

const OwnerList = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();

  // Get unique owners with their vehicle counts and statuses
  const owners = mockVehicles.reduce((acc, vehicle) => {
    if (!acc[vehicle.owner]) {
      acc[vehicle.owner] = {
        name: vehicle.owner,
        totalVehicles: 0,
        approvedVehicles: 0,
        pendingVehicles: 0,
        draftVehicles: 0,
        reportedVehicles: 0
      };
    }
    
    acc[vehicle.owner].totalVehicles++;
    
    switch (vehicle.status) {
      case 'APPROVED':
        acc[vehicle.owner].approvedVehicles++;
        break;
      case 'PENDING':
        acc[vehicle.owner].pendingVehicles++;
        break;
      case 'DRAFT':
        acc[vehicle.owner].draftVehicles++;
        break;
    }
    
    if (vehicle.reports && vehicle.reports.length > 0) {
      acc[vehicle.owner].reportedVehicles++;
    }
    
    return acc;
  }, {});

  const handleViewVehicles = (ownerName) => {
    navigate(`/vehicle/owner/${encodeURIComponent(ownerName)}`);
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          fontWeight="bold" 
          sx={{
            color: theme.palette.text.primary,
            textShadow: '0 2px 4px rgba(0,0,0,0.1)',
            mb: 1
          }}
        >
          {t('vehicles.owners.title')}
        </Typography>
        <Typography 
          variant="body1" 
          sx={{
            color: theme.palette.text.secondary,
            opacity: 0.8
          }}
        >
          {t('vehicles.owners.subtitle')}
        </Typography>
      </Box>

      <TableContainer 
        component={Paper} 
        sx={{ 
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
              <TableCell sx={{ fontWeight: 600 }}>{t('vehicles.owners.table.ownerName')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t('vehicles.owners.table.totalVehicles')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t('vehicles.owners.table.approved')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t('vehicles.owners.table.pending')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t('vehicles.owners.table.drafts')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t('vehicles.owners.table.reported')}</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>{t('vehicles.owners.table.actions')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.values(owners).map((owner) => (
              <TableRow 
                key={owner.name}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.02)',
                    transition: 'background-color 0.2s ease-in-out'
                  }
                }}
              >
                <TableCell>{owner.name}</TableCell>
                <TableCell>
                  <Chip
                    label={owner.totalVehicles}
                    color="primary"
                    size="small"
                    sx={{
                      fontWeight: 500,
                      minWidth: 40
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={owner.approvedVehicles}
                    color="success"
                    size="small"
                    sx={{
                      fontWeight: 500,
                      minWidth: 40
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={owner.pendingVehicles}
                    color="warning"
                    size="small"
                    sx={{
                      fontWeight: 500,
                      minWidth: 40
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={owner.draftVehicles}
                    color="default"
                    size="small"
                    sx={{
                      fontWeight: 500,
                      minWidth: 40
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={owner.reportedVehicles}
                    color="error"
                    size="small"
                    sx={{
                      fontWeight: 500,
                      minWidth: 40
                    }}
                  />
                </TableCell>
                <TableCell align="right">
                  <Tooltip title={t('vehicles.owners.actions.viewVehicles')}>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleViewVehicles(owner.name)}
                      sx={{
                        '&:hover': {
                          backgroundColor: 'rgba(25, 118, 210, 0.08)'
                        }
                      }}
                    >
                      <DirectionsCar />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OwnerList; 