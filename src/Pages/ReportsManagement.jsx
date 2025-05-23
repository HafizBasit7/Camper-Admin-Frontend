import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
import { mockReports } from '../data/mockData';

const CustomInput = ({ label, value, onChange, type = 'text', multiline = false, rows = 1 }) => {
  const { t } = useTranslation();
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        {t(label)}
      </Typography>
      <TextField
        fullWidth
        type={type}
        multiline={multiline}
        rows={rows}
        value={value}
        onChange={onChange}
        variant="outlined"
        size="small"
        InputProps={{
          readOnly: true
        }}
      />
    </Box>
  );
};

const CustomSelect = ({ label, value, onChange, options }) => {
  const { t } = useTranslation();
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        {t(label)}
      </Typography>
      <TextField
        select
        fullWidth
        value={value}
        onChange={onChange}
        variant="outlined"
        size="small"
        SelectProps={{
          native: true
        }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {t(option.label)}
          </option>
        ))}
      </TextField>
    </Box>
  );
};

const ReportDialog = ({ open, onClose, report, onAction }) => {
  const { t } = useTranslation();
  const [notes, setNotes] = useState('');

  const handleAction = () => {
    onAction(report.id, report.status === 'PENDING' ? 'RESOLVE' : 'DISMISS', notes);
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
            {t('reports.dialog.title')}
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
            {t('reports.dialog.vehicleInfo')}
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mb: 3 }}>
            <Box>
              <CustomInput
                label="reports.table.vehicleName"
                value={report?.vehicleName}
              />
            </Box>
            <Box>
              <CustomInput
                label="reports.table.owner"
                value={report?.ownerName}
              />
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
            {t('reports.dialog.reporterInfo')}
          </Typography>
          <Box sx={{ mb: 2 }}>
            <CustomInput
              label="reports.table.reportedBy"
              value={report?.reportedBy}
            />
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
            {t('reports.dialog.issueDetails')}
          </Typography>
          <Box sx={{ mb: 2 }}>
            <CustomInput
              label="reports.table.issue"
              value={report?.description}
              multiline
              rows={3}
            />
          </Box>
          <Box>
            <CustomInput
              label="reports.table.status"
              value={t(`reports.status.${report?.status?.toLowerCase()}`)}
            />
          </Box>
          <Box>
            <CustomInput
              label="reports.table.date"
              value={new Date(report?.date).toLocaleDateString()}
            />
          </Box>
        </Paper>

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
            value={report?.status === 'PENDING' ? 'RESOLVE' : 'DISMISS'}
            onChange={(e) => {
              // Handle action change
            }}
            options={[
              { value: 'RESOLVE', label: t('reports.dialog.actions.resolve') },
              { value: 'DISMISS', label: t('reports.dialog.actions.dismiss') }
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
          {t('reports.dialog.actions.close')}
        </Button>
        <Button
          variant="contained"
          onClick={handleAction}
          disabled={!notes}
          sx={{
            textTransform: 'none',
            fontWeight: 500,
            px: 4,
            py: 1,
            borderRadius: 2
          }}
        >
          {t(`reports.dialog.actions.${report?.status === 'PENDING' ? 'resolve' : 'dismiss'}`)}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ReportsManagement = () => {
  const { t } = useTranslation();
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
            {t('reports.title')}
          </Typography>
          <Typography 
            variant="body1" 
            sx={{
              color: theme.palette.text.secondary,
              opacity: 0.8
            }}
          >
            {t('reports.subtitle')}
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
            <Tab label={t('reports.tabs.all')} value="ALL" />
            <Tab label={t('reports.tabs.pending')} value="PENDING" />
            <Tab label={t('reports.tabs.resolved')} value="RESOLVED" />
            <Tab label={t('reports.tabs.dismissed')} value="DISMISSED" />
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
                <TableCell>{t('reports.table.vehicleName')}</TableCell>
                <TableCell>{t('reports.table.owner')}</TableCell>
                <TableCell>{t('reports.table.reportedBy')}</TableCell>
                <TableCell>{t('reports.table.issue')}</TableCell>
                <TableCell>{t('reports.table.status')}</TableCell>
                <TableCell>{t('reports.table.date')}</TableCell>
                <TableCell>{t('reports.table.actions')}</TableCell>
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
                  <TableCell>{report.description}</TableCell>
                  <TableCell>
                    <Chip
                      label={t(`reports.status.${report.status.toLowerCase()}`)}
                      sx={{
                        backgroundColor: getStatusColor(report.status),
                        color: '#fff',
                        fontWeight: 500,
                        borderRadius: 2,
                        minWidth:150
                      }}
                    />
                  </TableCell>
                  <TableCell>{new Date(report.date).toLocaleDateString()}</TableCell>
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