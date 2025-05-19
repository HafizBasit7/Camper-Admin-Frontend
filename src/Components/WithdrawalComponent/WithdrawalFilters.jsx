import React from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Grid,
  useTheme
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { WITHDRAWAL_STATUS } from '../../data/withdrawalTypes';

const WithdrawalFilters = ({ filters, onFilterChange }) => {
  const theme = useTheme();

  const handleSearchChange = (event) => {
    onFilterChange({ search: event.target.value });
  };

  const handleStatusChange = (event) => {
    onFilterChange({ status: event.target.value });
  };

  const handleDateRangeChange = (newValue) => {
    onFilterChange({ dateRange: newValue });
  };

  return (
    <Box sx={{ mt: 2, mb: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            size="small"
            label="Search"
            placeholder="Search by owner or vehicle..."
            value={filters.search}
            onChange={handleSearchChange}
            sx={{
              '& .MuiOutlinedInput-root': {
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                borderRadius: 1,
                '&:hover': {
                  '& > fieldset': {
                    borderColor: theme.palette.primary.main
                  }
                }
              }
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            size="small"
            select
            label="Status"
            value={filters.status || ''}
            onChange={handleStatusChange}
            sx={{
              '& .MuiOutlinedInput-root': {
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                borderRadius: 1,
                '&:hover': {
                  '& > fieldset': {
                    borderColor: theme.palette.primary.main
                  }
                }
              }
            }}
          >
            <MenuItem value="">All Statuses</MenuItem>
            {Object.values(WITHDRAWAL_STATUS).map((status) => (
              <MenuItem key={status} value={status}>
                {status.charAt(0) + status.slice(1).toLowerCase()}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={4}>
          <DatePicker
            label="Date Range"
            value={filters.dateRange}
            onChange={handleDateRangeChange}
            slotProps={{
              textField: {
                fullWidth: true,
                size: "small",
                sx: {
                  '& .MuiOutlinedInput-root': {
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 1,
                    '&:hover': {
                      '& > fieldset': {
                        borderColor: theme.palette.primary.main
                      }
                    }
                  }
                }
              }
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default WithdrawalFilters; 