// src/Components/VehileComponent/VehicleList.jsx
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
  ListItemText,
  CircularProgress,
} from '@mui/material';
import {
  Visibility,
  Report,
  Edit,
  MoreVert,
  CheckCircle,
  Cancel,
  Block,
  Help,
} from '@mui/icons-material';
import {
  VEHICLE_STATUS,
  VEHICLE_TABS,
  getStatusColor,
  getStatusLabel,
} from '../../data/vehicleTypes';

import VehicleReports         from './VehicleReports';
import VehicleDetailsDialog   from './VehicleDetailsDialog';
import VehicleChangeRequests  from './VehicleChangeRequests';
import { useUpdateVehicleStatus } from '../../hooks/mutations';

/* -------------------------------------------------------------------------- */
/*  NOTE: ❶  This component **does not call an API by itself**.               */
/*              └─ Give it `vehicles` via props (VehicleManagement already    */
/*                 passes the array it gets from useOwnerVehicles).           */
/*         ❷  All UI elements from your original file are preserved.          */
/* -------------------------------------------------------------------------- */

const VehicleList = ({
  
  vehicles = [],     // raw array from the hook
  currentTab,
  filters,
}) => {
  const { mutate: mutateStatus, isLoading: statusChanging } = useUpdateVehicleStatus();
  const { t } = useTranslation();

  /* ---------- local UI state ---------- */
  const [selectedVehicle,     setSelectedVehicle]     = useState(null);
  const [reportsOpen,         setReportsOpen]         = useState(false);
  const [detailsOpen,         setDetailsOpen]         = useState(false);
  const [changeRequestsOpen,  setChangeRequestsOpen]  = useState(false);
  const [statusMenuAnchor,    setStatusMenuAnchor]    = useState(null);
  const [statusMenuVehicle,   setStatusMenuVehicle]   = useState(null);

  /* ---------- helpers (open / close) ---------- */
  const openDetails   = v  => { setSelectedVehicle(v); setDetailsOpen(true);   };
  const openReports   = id => { setSelectedVehicle({ id }); setReportsOpen(true); };
  const openRequests  = v  => { setSelectedVehicle(v); setChangeRequestsOpen(true); };

  const closeDetails        = () => { setDetailsOpen(false);        setSelectedVehicle(null); };
  const closeReports        = () => { setReportsOpen(false);        setSelectedVehicle(null); };
  const closeChangeRequests = () => { setChangeRequestsOpen(false); setSelectedVehicle(null); };

  const openStatusMenu  = (e, v) => { setStatusMenuAnchor(e.currentTarget); setStatusMenuVehicle(v); };
  const closeStatusMenu = ()      => { setStatusMenuAnchor(null);            setStatusMenuVehicle(null); };

  const changeStatus = newStatus => {
    if (!statusMenuVehicle) return;
    mutateStatus(
      { vehicleId: statusMenuVehicle.id, status: newStatus.toLowerCase() },
      { onSuccess: closeStatusMenu },
    );
    /* TODO: call backend to update status */
    console.log(`Change vehicle ${statusMenuVehicle?.id} → ${newStatus}`);
    closeStatusMenu();
  };

  /* ---------- filtering ---------- */
  const filtered = vehicles.filter(v => {
    /* search */
    if (filters.search && !v.name.toLowerCase().includes(filters.search.toLowerCase()))
      return false;

    /* status dropdown */
    if (filters.status && v.status !== filters.status)
      return false;

    /* date range (single “from” date) */
    if (filters.dateRange) {
      const updated = new Date(v.lastUpdated);
      const from    = new Date(filters.dateRange);
      if (updated < from) return false;
    }

    /* tab bar */
    switch (currentTab) {
 case VEHICLE_TABS.APPROVED:
  return (
    v.status?.toLowerCase() === 'approved' ||
    v.status?.toLowerCase() === 'active'
  );
  case VEHICLE_TABS.PENDING:
    return v.status?.toLowerCase() === VEHICLE_STATUS.PENDING.toLowerCase();
  case VEHICLE_TABS.DRAFTS:
    return v.status?.toLowerCase() === VEHICLE_STATUS.DRAFT.toLowerCase();
  case VEHICLE_TABS.CHANGE_REQUESTS:
    return v.changeRequests?.length > 0;
  case VEHICLE_TABS.REPORTED:
    return v.reports?.length > 0;
  case VEHICLE_TABS.ALL:
  default:
    return true;
}
  });

  /* ---------- loading / empty state ---------- */
  if (!vehicles.length) {
    return (
      <Box sx={{ py: 6, textAlign: 'center' }}>
        <CircularProgress size={28} />
      </Box>
    );
  }

  if (!filtered.length) {
    return (
      <Box sx={{ py: 6, textAlign: 'center', opacity: 0.75 }}>
        <Typography>{t('vehicles.list.noVehicles')}</Typography>
      </Box>
    );
  }

  /* ---------- table ---------- */
  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          mt: 2,
          background: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(10px)',
          borderRadius: 2,
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
          border: 1,
          borderColor: 'rgba(255,255,255,0.2)',
        }}
      >
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>{t('vehicles.list.table.vehicleName')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t('vehicles.list.table.owner')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t('vehicles.list.table.type')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t('vehicles.list.table.location')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t('vehicles.list.table.status')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t('vehicles.list.table.price')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t('vehicles.list.table.lastUpdated')}</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>
                {t('vehicles.list.table.actions')}
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filtered.map(v => (
              <TableRow key={v.id} hover>
                <TableCell>{v.name}</TableCell>
                <TableCell>{v.ownerName}</TableCell>
                <TableCell>{v.type}</TableCell>
                <TableCell>{v.location}</TableCell>

                {/* status chip & menu trigger */}
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip
                      label={getStatusLabel(v.status)}
                      sx={{
                        backgroundColor: getStatusColor(v.status),
                        minWidth: 110,
                        fontWeight: 500,
                      }}
                    />
                    <IconButton size="small" onClick={e => {            // prevent the click bubbling up to <tr>
   e.stopPropagation();
   openStatusMenu(e, v);
 }}>
                      <MoreVert fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>

                <TableCell>{v.price}</TableCell>
                <TableCell>{new Date(v.lastUpdated).toLocaleDateString()}</TableCell>

                {/* actions */}
                <TableCell align="right">
                  <Tooltip title={t('vehicles.list.actions.viewDetails')}>
                    <IconButton size="small" color="primary" onClick={() => openDetails(v)}>
                      <Visibility />
                    </IconButton>
                  </Tooltip>

                  {!!v.changeRequests?.length && (
                    <Tooltip title={t('vehicles.list.actions.viewChangeRequests')}>
                      <IconButton size="small" color="warning" onClick={() => openRequests(v)}>
                        <Edit />
                      </IconButton>
                    </Tooltip>
                  )}

                  {!!v.reports?.length && (
                    <Tooltip title={t('vehicles.list.actions.viewReports')}>
                      <IconButton size="small" color="error" onClick={() => openReports(v.id)}>
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

      {/* dialogs */}
      <VehicleDetailsDialog  open={detailsOpen}        onClose={closeDetails}        vehicle={selectedVehicle} />
      <VehicleReports        open={reportsOpen}        onClose={closeReports}        vehicleId={selectedVehicle?.id}/>
      <VehicleChangeRequests open={changeRequestsOpen} onClose={closeChangeRequests} vehicle={selectedVehicle} />

      {/* status‑change menu */}
      <Menu anchorEl={statusMenuAnchor} open={Boolean(statusMenuAnchor)} onClose={closeStatusMenu}  anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
  transformOrigin={{ vertical: 'top', horizontal: 'left' }}>
       
        <MenuItem onClick={() => changeStatus(VEHICLE_STATUS.APPROVED)}>
          <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
          <ListItemText>{t('vehicles.list.actions.approve')}</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => changeStatus(VEHICLE_STATUS.PENDING)}>
          <ListItemIcon><Help color="warning" /></ListItemIcon>
          <ListItemText>{t('vehicles.list.actions.markPending')}</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => changeStatus(VEHICLE_STATUS.SUSPENDED)}>
          <ListItemIcon><Block color="error" /></ListItemIcon>
          <ListItemText>{t('vehicles.list.actions.suspend')}</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => changeStatus(VEHICLE_STATUS.REJECTED)}>
          <ListItemIcon><Cancel color="error" /></ListItemIcon>
          <ListItemText>{t('vehicles.list.actions.reject')}</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default VehicleList;
