import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Container, Typography, Tabs, Tab, CircularProgress, Pagination  } from '@mui/material';
import { useAllOrders } from '../hooks/mutations';
import { ORDER_TABS } from '../data/orderTypes';
import LoadingSpinner from '../components/LoadingSpinner';
import OrdersTable from '../Components/ordertable';

const OrdersPage = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('all');
  const [page, setPage] = useState(1);
  const limit = 10;
 const { data, isLoading, isError, error, refetch } = useAllOrders(activeTab, { page, limit });

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setPage(1);
    const filtered = filterOrdersByStatus(orders, newValue);
    setFilteredOrders(filtered);
  };

  // Handle order status update
  const handleStatusUpdate = (updatedOrders) => {
    setOrders(updatedOrders);
    const filtered = filterOrdersByStatus(updatedOrders, activeTab);
    setFilteredOrders(filtered);
  };

    const handlePageChange = (_, newPage) => {
    setPage(newPage);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mt: 3, mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="600" gutterBottom>
          {t('orders.title')}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {t('orders.subtitle')}
        </Typography>
        
        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange} 
            variant="scrollable" 
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                minWidth: 'auto',
                px: 3,
                py: 2,
                fontWeight: 500,
              },
              '& .Mui-selected': {
                color: 'primary.main',
                fontWeight: 600,
              },
              '& .MuiTabs-indicator': {
                backgroundColor: 'primary.main',
                height: 3,
              },
            }}
          >
            {ORDER_TABS.map((tab) => (
              <Tab 
                key={tab.value} 
                label={t(`orders.tabs.${tab.value}`)} 
                value={tab.value} 
              />
            ))}
          </Tabs>
        </Box>
        
       {/* Loading / Error / Data */}
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : isError ? (
          <Box sx={{ p: 3 }}>
            <Alert severity="error" sx={{ mb: 2 }}>
              {error?.response?.data?.message || t('orders.error.loading')}
            </Alert>
            <Button variant="contained" onClick={() => refetch()} startIcon={<Refresh />}>
              {t('orders.retry')}
            </Button>
          </Box>
        ) : (
          <>
            <OrdersTable orders={data?.orders || []} />
            {data?.total > limit && (
              <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2 }}>
                <Pagination
                  count={Math.ceil(data.total / limit)}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                />
              </Box>
            )}
          </>
        )}
      </Box>
    </Container>
  );
};

export default OrdersPage;