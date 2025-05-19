import React from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Grid,
  useTheme
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { VEHICLE_STATUS, getStatusLabel } from '../../data/vehicleTypes';

const VehicleFilters = ({ filters, onFilterChange }) => {
  const theme = useTheme();

  const handleSearchChange = (event) => {
    onFilterChange({ search: event.target.value });
  };

  const handleStatusChange = (event) => {
    onFilterChange({ status: event.target.value });
  };

  const handleDateChange = (date) => {
    onFilterChange({ dateRange: date });
  };

  return (
    <Box sx={{ mt: 2, mb: 3 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Search Vehicles"
            variant="outlined"
            value={filters.search}
            onChange={handleSearchChange}
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            select
            label="Status"
            variant="outlined"
            value={filters.status || ''}
            onChange={handleStatusChange}
            size="small"
          >
            <MenuItem value="">All Status</MenuItem>
            {Object.values(VEHICLE_STATUS).map((status) => (
              <MenuItem key={status} value={status}>
                {getStatusLabel(status)}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={4}>
          <DatePicker
            label="Date Range"
            value={filters.dateRange}
            onChange={handleDateChange}
            slotProps={{
              textField: {
                fullWidth: true,
                size: 'small',
                variant: 'outlined'
              }
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default VehicleFilters; 