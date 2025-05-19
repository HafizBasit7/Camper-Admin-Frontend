import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Typography,
  Box,
  useTheme
} from '@mui/material';
import { mockVehicles } from '../../data/mockData';

const VehicleReports = ({ open, onClose, vehicleId }) => {
  const theme = useTheme();
  const vehicle = mockVehicles.find(v => v.id === vehicleId);
  const reports = vehicle?.reports || [];

  const getReportStatusColor = (status) => {
    switch (status) {
      case 'PENDING':
        return '#FFB74D'; // Light orange - waiting
      case 'RESOLVED':
        return '#66BB6A'; // Mid green - success
      default:
        return '#B0BEC5'; // Light gray-blue - neutral/default
    }
  };
  

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: 2,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }
      }}
    >
      <DialogTitle>
        <Typography 
          variant="h6" 
          fontWeight="bold"
          sx={{
            color: theme.palette.text.primary,
            textShadow: '0 1px 2px rgba(0,0,0,0.1)'
          }}
        >
          Vehicle Reports
        </Typography>
        <Typography 
          variant="subtitle2" 
          sx={{
            color: theme.palette.text.secondary,
            opacity: 0.8
          }}
        >
          {vehicle?.name} - {vehicle?.owner}
        </Typography>
      </DialogTitle>
      <DialogContent>
        {reports.length > 0 ? (
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
                  <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Reason</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Reported By</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reports.map((report) => (
                  <TableRow 
                    key={report.id}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.02)',
                        transition: 'background-color 0.2s ease-in-out'
                      }
                    }}
                  >
                    <TableCell>{report.date}</TableCell>
                    <TableCell>{report.reason}</TableCell>
                    <TableCell>{report.description}</TableCell>
                    <TableCell>{report.reportedBy}</TableCell>
                    <TableCell>
                      <Chip
                        label={report.status}
                        sx={{
                          backgroundColor: getReportStatusColor(report.status),
                          color: '#000',
                          fontWeight: 500,
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                          minWidth: 90,
                          borderRadius: 1,
                          height: 24,
                          py:1,
                          fontSize: '0.7rem',
                          '& .MuiChip-label': {
                            p: 1
                          }
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box 
            sx={{ 
              textAlign: 'center', 
              py: 4,
              color: theme.palette.text.secondary,
              opacity: 0.8
            }}
          >
            <Typography>
              No reports found for this vehicle
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={onClose}
          sx={{
            textTransform: 'none',
            fontWeight: 500,
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)'
            }
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VehicleReports; 