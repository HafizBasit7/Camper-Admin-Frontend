import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box, Container, Typography, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Chip, IconButton, Button,
  TextField, MenuItem, useTheme, Tabs, Tab, Dialog, DialogTitle,
  DialogContent, DialogActions
} from '@mui/material';
import {
  Visibility, CheckCircle, Cancel, Close, ArrowBack
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { usePendingItems } from '../hooks/mutations'; // Adjust path as needed

const PendingItemsPage = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { type } = useParams();
  const navigate = useNavigate();

  const [currentTab, setCurrentTab] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [filterType, setFilterType] = useState('ALL');

  const backendType = type === 'vehicles' ? 'campers' : type;
const { data: pendingItems = [], isLoading } = usePendingItems(backendType);


  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleViewDetails = (item) => {
    setSelectedItem(item);
  };

  const handleCloseDialog = () => {
    setSelectedItem(null);
  };

  const handleAction = (action) => {
    console.log('Taking action:', action);
    handleCloseDialog();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return theme.palette.warning.main;
      case 'REVIEW': return theme.palette.info.main;
      default: return theme.palette.grey[500];
    }
  };

  const filteredItems = pendingItems?.filter((item) => {
  if (currentTab !== 'ALL' && item.status !== currentTab) return false;
  if (filterType !== 'ALL' && item.type !== filterType) return false;
  if (searchTerm) {
    const searchLower = searchTerm.toLowerCase();
    return (
      item.name?.toLowerCase().includes(searchLower) ||
      item.details?.toLowerCase().includes(searchLower)
    );
  }
  return true;
});


  const getTypeOptions = () => {
    const types = new Set(pendingItems.map(item => item.type).filter(Boolean));
    return Array.from(types).map(type => ({ value: type, label: type }));
  };

  return (
    <Box sx={{ minHeight: '100vh', background: '#fff', py: 4 }}>
      <Container maxWidth="xl">
        <Box sx={{ mb: 4 }}>
          <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>
            {t('pendingItems.back')}
          </Button>
          <Typography variant="h4" fontWeight="bold" sx={{ color: theme.palette.text.primary, textShadow: '0 2px 4px rgba(0,0,0,0.1)', mb: 1 }}>
            {t('pendingItems.title', { type: type.charAt(0).toUpperCase() + type.slice(1) })}
          </Typography>
          <Typography variant="body1" sx={{ color: theme.palette.text.secondary, opacity: 0.8 }}>
            {t('pendingItems.subtitle', { type })}
          </Typography>
        </Box>

        <Paper sx={{
          mb: 3,
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          borderRadius: 2,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <Tabs value={currentTab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto"
            sx={{
              borderBottom: 1, borderColor: 'divider',
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
            <Tab label={t('pendingItems.tabs.all')} value="ALL" />
            <Tab label={t('pendingItems.tabs.pending')} value="PENDING" />
            <Tab label={t('pendingItems.tabs.underReview')} value="REVIEW" />
          </Tabs>
        </Paper>

        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField fullWidth label={t('pendingItems.search')} variant="outlined" value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} sx={{ flex: 2 }} />
          <TextField select label={t('pendingItems.type')} variant="outlined" value={filterType}
            onChange={(e) => setFilterType(e.target.value)} sx={{ flex: 1 }}>
            <MenuItem value="ALL">{t('pendingItems.allTypes')}</MenuItem>
            {getTypeOptions().map((option) => (
              <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
            ))}
          </TextField>
        </Box>

        <TableContainer component={Paper} sx={{
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          borderRadius: 2,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t('pendingItems.table.name')}</TableCell>
                <TableCell>{type === 'users' ? t('pendingItems.table.email') : t('pendingItems.table.owner')}</TableCell>
                <TableCell>{t('pendingItems.table.type')}</TableCell>
                <TableCell>{t('pendingItems.table.status')}</TableCell>
                <TableCell>{t('pendingItems.table.date')}</TableCell>
                <TableCell align="right">{t('pendingItems.table.actions')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow><TableCell colSpan={6}>Loading...</TableCell></TableRow>
              ) : (
                filteredItems?.map((item) => (
                  <TableRow key={item.id} sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.02)',
                      transition: 'background-color 0.2s ease-in-out'
                    }
                  }}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{type === 'users' ? item.email : item.owner}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>
                      <Chip label={item.status} sx={{
                        backgroundColor: getStatusColor(item.status),
                        color: '#fff',
                        fontWeight: 500
                      }} />
                    </TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell align="right">
                      <IconButton size="small" onClick={() => handleViewDetails(item)}
                        sx={{ '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.08)' } }}>
                        <Visibility />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={Boolean(selectedItem)} onClose={handleCloseDialog} maxWidth="md" fullWidth
          PaperProps={{
            sx: {
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: 3,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }
          }}>
          <DialogTitle>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" fontWeight="bold" sx={{ color: 'text.primary', textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                {selectedItem?.name}
              </Typography>
              <Button onClick={handleCloseDialog} sx={{ minWidth: 'auto', p: 1, borderRadius: '50%', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}>
                <Close />
              </Button>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                {t('pendingItems.dialog.details')}
              </Typography>
              <Typography variant="body1">{selectedItem?.details}</Typography>
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                {t('pendingItems.dialog.status')}
              </Typography>
              <Chip label={selectedItem?.status} sx={{
                backgroundColor: getStatusColor(selectedItem?.status),
                color: '#fff',
                fontWeight: 500
              }} />
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                {t('pendingItems.dialog.dateSubmitted')}
              </Typography>
              <Typography variant="body1">{selectedItem?.date}</Typography>
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={handleCloseDialog} sx={{ textTransform: 'none', fontWeight: 500, px: 3, py: 1, borderRadius: 2 }}>
              {t('pendingItems.dialog.cancel')}
            </Button>
            <Button variant="contained" color="error" onClick={() => handleAction('REJECT')} startIcon={<Cancel />}
              sx={{ textTransform: 'none', fontWeight: 500, px: 3, py: 1, borderRadius: 2 }}>
              {t('pendingItems.dialog.reject')}
            </Button>
            <Button variant="contained" color="success" onClick={() => handleAction('APPROVE')} startIcon={<CheckCircle />}
              sx={{ textTransform: 'none', fontWeight: 500, px: 3, py: 1, borderRadius: 2 }}>
              {t('pendingItems.dialog.approve')}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default PendingItemsPage;
