import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Container, Typography, Tabs, Tab } from '@mui/material';
import { fetchOrders, filterOrdersByStatus } from '../data/mockData';
import { ORDER_TABS } from '../data/orderTypes';
import LoadingSpinner from '../components/LoadingSpinner';
import OrdersTable from '../Components/ordertable';

const OrdersPage = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('all');
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders on component mount
  useEffect(() => {
    const getOrders = async () => {
      try {
        setLoading(true);
        const data = await fetchOrders();
        setOrders(data);
        setFilteredOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, []);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    const filtered = filterOrdersByStatus(orders, newValue);
    setFilteredOrders(filtered);
  };

  // Handle order status update
  const handleStatusUpdate = (updatedOrders) => {
    setOrders(updatedOrders);
    const filtered = filterOrdersByStatus(updatedOrders, activeTab);
    setFilteredOrders(filtered);
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
        
        {/* Orders Table or Loading Spinner */}
        {loading ? (
          <LoadingSpinner />
        ) : (
          <OrdersTable 
            orders={filteredOrders}
          />
        )}
      </Box>
    </Container>
  );
};

export default OrdersPage;