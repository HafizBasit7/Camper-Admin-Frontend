import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Paper,
  useTheme
} from '@mui/material';
import { WITHDRAWAL_TABS } from '../data/withdrawalTypes';
import WithdrawalList from '../Components/WithdrawalComponent/WithdrawalList';
import WithdrawalFilters from '../Components/WithdrawalComponent/WithdrawalFilters';
import WithdrawalStats from '../Components/WithdrawalComponent/WithdrawalStats';

const WithdrawalManagement = () => {
  const { t } = useTranslation();
  const [currentTab, setCurrentTab] = useState(WITHDRAWAL_TABS.ALL);
  const [filters, setFilters] = useState({
    search: '',
    dateRange: null,
    status: null
  });
  const theme = useTheme();

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

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
            {t('withdrawals.title')}
          </Typography>
          <Typography 
            variant="body1" 
            sx={{
              color: theme.palette.text.secondary,
              opacity: 0.8
            }}
          >
            {t('withdrawals.subtitle')}
          </Typography>
        </Box>

        <WithdrawalStats />

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
            <Tab label={t('withdrawals.tabs.all')} value={WITHDRAWAL_TABS.ALL} />
            <Tab label={t('withdrawals.tabs.new')} value={WITHDRAWAL_TABS.NEW} />
            <Tab label={t('withdrawals.tabs.sent')} value={WITHDRAWAL_TABS.SENT} />
            <Tab label={t('withdrawals.tabs.received')} value={WITHDRAWAL_TABS.RECEIVED} />
          </Tabs>
        </Paper>

        <WithdrawalFilters filters={filters} onFilterChange={handleFilterChange} />
        
        <WithdrawalList currentTab={currentTab} filters={filters} />
      </Container>
    </Box>
  );
};

export default WithdrawalManagement; 