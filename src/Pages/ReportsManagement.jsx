import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  useTheme,
  Tabs,
  Tab,
  TextField,
  MenuItem
} from '@mui/material';
import {
  Visibility,
  Block,
  Warning,
  CheckCircle,
  Cancel,
  Close
} from '@mui/icons-material';

// Mock data for reports
const mockReports = [
  {
    id: 1,
    vehicleName: 'Luxury RV 2023',
    ownerName: 'John Doe',
    reportedBy: 'Alice Smith',
    reportType: 'FAKE_LISTING',
    description: 'Vehicle condition does not match the description',
    status: 'PENDING',
    date: '2024-03-15',
    counterReport: null
  },
  {
    id: 2,
    vehicleName: 'Family Camper',
    ownerName: 'Jane Smith',
    reportedBy: 'Bob Johnson',
    reportType: 'MISCONDUCT',
    description: 'Owner was unprofessional during pickup',
    status: 'RESOLVED',
    date: '2024-03-14',
    counterReport: {
      description: 'User damaged the vehicle and refused to pay',
      status: 'PENDING'
    }
  },
  // Add more mock reports as needed
];

const CustomInput = ({ label, value, onChange, type = 'text', multiline = false, rows = 1 }) => (
  <Box sx={{ mb: 3 }}>
    <Typography 
      variant="body2" 
      sx={{ 
        color: 'text.secondary',
        mb: 1,
        fontWeight: 500
      }}
    >
      {label}
    </Typography>
    {multiline ? (
      <textarea
        value={value}
        onChange={onChange}
        rows={rows}
        style={{
          width: '100%',
          padding: '12px 16px',
          borderRadius: '12px',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          backgroundColor: 'white',
          fontSize: '14px',
          outline: 'none',
          transition: 'all 0.2s ease',
          resize: 'vertical',
          minHeight: '100px',
          fontFamily: 'inherit',
          '&:focus': {
            borderColor: '#FF9B00',
            boxShadow: '0 0 0 2px rgba(255, 155, 0, 0.1)'
          }
        }}
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={onChange}
        style={{
          width: '100%',
          padding: '12px 16px',
          borderRadius: '12px',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          backgroundColor: 'white',
          fontSize: '14px',
          outline: 'none',
          transition: 'all 0.2s ease',
          '&:focus': {
            borderColor: '#FF9B00',
            boxShadow: '0 0 0 2px rgba(255, 155, 0, 0.1)'
          }
        }}
      />
    )}
  </Box>
);

const CustomSelect = ({ label, value, onChange, options }) => (
  <Box sx={{ mb: 3 }}>
    <Typography 
      variant="body2" 
      sx={{ 
        color: 'text.secondary',
        mb: 1,
        fontWeight: 500
      }}
    >
      {label}
    </Typography>
    <select
      value={value}
      onChange={onChange}
      style={{
        width: '100%',
        padding: '12px 16px',
        borderRadius: '12px',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        backgroundColor: 'white',
        fontSize: '14px',
        outline: 'none',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        appearance: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23888888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 12px center',
        backgroundSize: '16px',
        '&:focus': {
          borderColor: '#FF9B00',
          boxShadow: '0 0 0 2px rgba(255, 155, 0, 0.1)'
        }
      }}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </Box>
);

const ReportDialog = ({ open, onClose, report, onAction }) => {
  const [action, setAction] = useState('');
  const [notes, setNotes] = useState('');

  const handleAction = () => {
    onAction(report.id, action, notes);
    onClose();
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
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }
      }}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography 
            variant="h6" 
            fontWeight="bold"
            sx={{
              color: 'text.primary',
              textShadow: '0 1px 2px rgba(0,0,0,0.1)'
            }}
          >
            Report Details
          </Typography>
          <Button
            onClick={onClose}
            sx={{
              minWidth: 'auto',
              p: 1,
              borderRadius: '50%',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)'
              }
            }}
          >
            <Close />
          </Button>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Paper
          sx={{
            p: 3,
            mb: 3,
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            borderRadius: 2,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}
        >
          <Typography 
            variant="subtitle2" 
            color="text.secondary" 
            gutterBottom
            sx={{ fontWeight: 600 }}
          >
            Vehicle Information
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mb: 3 }}>
            <Box>
              <Typography variant="body2" color="text.secondary">Vehicle</Typography>
              <Typography variant="body1" fontWeight={500}>{report?.vehicleName}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">Owner</Typography>
              <Typography variant="body1" fontWeight={500}>{report?.ownerName}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">Reported By</Typography>
              <Typography variant="body1" fontWeight={500}>{report?.reportedBy}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">Date</Typography>
              <Typography variant="body1" fontWeight={500}>{report?.date}</Typography>
            </Box>
          </Box>
        </Paper>

        <Paper
          sx={{
            p: 3,
            mb: 3,
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            borderRadius: 2,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}
        >
          <Typography 
            variant="subtitle2" 
            color="text.secondary" 
            gutterBottom
            sx={{ fontWeight: 600 }}
          >
            Report Details
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary">Type</Typography>
            <Typography variant="body1" fontWeight={500}>{report?.reportType}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">Description</Typography>
            <Typography variant="body1">{report?.description}</Typography>
          </Box>
        </Paper>

        {report?.counterReport && (
          <Paper
            sx={{
              p: 3,
              mb: 3,
              background: 'rgba(255, 155, 0, 0.05)',
              backdropFilter: 'blur(10px)',
              borderRadius: 2,
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              border: '1px solid rgba(255, 155, 0, 0.1)'
            }}
          >
            <Typography 
              variant="subtitle2" 
              color="warning.main" 
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              Counter Report
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">Description</Typography>
              <Typography variant="body1">{report?.counterReport.description}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">Status</Typography>
              <Typography variant="body1" fontWeight={500}>{report?.counterReport.status}</Typography>
            </Box>
          </Paper>
        )}

        <Paper
          sx={{
            p: 3,
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            borderRadius: 2,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}
        >
          <CustomSelect
            label="Take Action"
            value={action}
            onChange={(e) => setAction(e.target.value)}
            options={[
              { value: 'WARN_OWNER', label: 'Warn Owner' },
              { value: 'WARN_USER', label: 'Warn User' },
              { value: 'SUSPEND_OWNER', label: 'Suspend Owner' },
              { value: 'SUSPEND_USER', label: 'Suspend User' },
              { value: 'DISMISS', label: 'Dismiss Report' }
            ]}
          />

          <CustomInput
            label="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            multiline
            rows={4}
          />
        </Paper>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button
          onClick={onClose}
          sx={{
            textTransform: 'none',
            fontWeight: 500,
            px: 3,
            py: 1,
            borderRadius: 2,
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)'
            }
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleAction}
          disabled={!action}
          sx={{
            textTransform: 'none',
            fontWeight: 500,
            px: 4,
            py: 1,
            borderRadius: 2
          }}
        >
          Take Action
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ReportsManagement = () => {
  const theme = useTheme();
  const [currentTab, setCurrentTab] = useState('ALL');
  const [selectedReport, setSelectedReport] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleViewReport = (report) => {
    setSelectedReport(report);
  };

  const handleCloseDialog = () => {
    setSelectedReport(null);
  };

  const handleAction = (reportId, action, notes) => {
    // Here you would typically make an API call to handle the action
    console.log('Taking action:', { reportId, action, notes });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING':
        return theme.palette.warning.main;
      case 'RESOLVED':
        return theme.palette.success.main;
      case 'DISMISSED':
        return theme.palette.error.main;
      default:
        return theme.palette.grey[500];
    }
  };

  const filteredReports = mockReports.filter(report => {
    if (currentTab !== 'ALL' && report.status !== currentTab) {
      return false;
    }
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        report.vehicleName.toLowerCase().includes(searchLower) ||
        report.ownerName.toLowerCase().includes(searchLower) ||
        report.reportedBy.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#fff',
        py: 4
      }}
    >
      <Container maxWidth="xl">
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
            Reports Management
          </Typography>
          <Typography 
            variant="body1" 
            sx={{
              color: theme.palette.text.secondary,
              opacity: 0.8
            }}
          >
            Handle reports and disputes between owners and users
          </Typography>
        </Box>

        <Paper 
          sx={{ 
            mb: 3,
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
              }
            }}
          >
            <Tab label="All Reports" value="ALL" />
            <Tab label="Pending" value="PENDING" />
            <Tab label="Resolved" value="RESOLVED" />
            <Tab label="Dismissed" value="DISMISSED" />
          </Tabs>
        </Paper>

        <TextField
          fullWidth
          label="Search Reports"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 3 }}
        />

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
                <TableCell>Vehicle</TableCell>
                <TableCell>Owner</TableCell>
                <TableCell>Reported By</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Counter Report</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow 
                  key={report.id}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.02)',
                      transition: 'background-color 0.2s ease-in-out'
                    }
                  }}
                >
                  <TableCell>{report.vehicleName}</TableCell>
                  <TableCell>{report.ownerName}</TableCell>
                  <TableCell>{report.reportedBy}</TableCell>
                  <TableCell>{report.reportType}</TableCell>
                  <TableCell>
                    <Chip
                      label={report.status}
                      sx={{
                        backgroundColor: getStatusColor(report.status),
                        color: '#fff',
                        fontWeight: 500
                      }}
                    />
                  </TableCell>
                  <TableCell>{report.date}</TableCell>
                  <TableCell>
                    {report.counterReport ? (
                      <Chip
                        label="Yes"
                        color="warning"
                        size="small"
                      />
                    ) : (
                      <Chip
                        label="No"
                        color="default"
                        size="small"
                      />
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={() => handleViewReport(report)}
                      sx={{
                        '&:hover': {
                          backgroundColor: 'rgba(25, 118, 210, 0.08)'
                        }
                      }}
                    >
                      <Visibility />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <ReportDialog
          open={Boolean(selectedReport)}
          onClose={handleCloseDialog}
          report={selectedReport}
          onAction={handleAction}
        />
      </Container>
    </Box>
  );
};

export default ReportsManagement; 