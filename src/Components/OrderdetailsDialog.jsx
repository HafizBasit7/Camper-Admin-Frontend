import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Grid,
  Typography,
  Box,
  Divider,
  Chip,
  Paper
} from '@mui/material';
import { format } from 'date-fns';
import { getStatusColor } from '../data/orderTypes';

const OrderDetailsDialog = ({ open, order, onClose }) => {
  const { t } = useTranslation();
  
  if (!order) return null;

  // Format date to readable string
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy h:mm a');
    } catch (error) {
      return dateString;
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      scroll="paper"
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" component="div" fontWeight={600}>
            {t('orders.dialog.title')}
          </Typography>
          <Chip 
            label={order.status} 
            size="small" 
            sx={{ 
              color: '#000',
              bgcolor: getStatusColor(order.status),
              fontWeight: 500,
              borderRadius:2
            }} 
          />
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3}>
          {/* Order Info */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              {t('orders.dialog.orderInfo')}
            </Typography>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    {t('orders.dialog.orderId')}
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {order.id}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    {t('orders.dialog.paymentStatus')}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    fontWeight={500} 
                    color={
                      order.paymentStatus === 'Paid' ? 'success.main' : 
                      order.paymentStatus === 'Pending' ? 'warning.main' : 
                      order.paymentStatus === 'Cancelled' ? 'error.main' : 
                      'text.primary'
                    }
                  >
                    {order.paymentStatus}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    {t('orders.dialog.createdAt')}
                  </Typography>
                  <Typography variant="body1">
                    {formatDate(order.createdAt)}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    {t('orders.dialog.lastUpdated')}
                  </Typography>
                  <Typography variant="body1">
                    {formatDate(order.updatedAt)}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">
                    {t('orders.dialog.totalAmount')}
                  </Typography>
                  <Typography variant="body1" fontWeight={600} color="primary.main">
                    ${order.totalAmount.toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Customer and Car Info */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              {t('orders.dialog.customerInfo')}
            </Typography>
            <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
              <Typography variant="body1" fontWeight={500}>
                {order.customerName}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {t('orders.dialog.customerId')}: CUST-{order.id.split('-')[1]}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              {t('orders.dialog.vehicleInfo')}
            </Typography>
            <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
              <Typography variant="body1" fontWeight={500}>
                {order.carModel}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {t('orders.dialog.plateNumber')}: {order.plateNumber}
              </Typography>
            </Paper>
          </Grid>

          {/* Services */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              {t('orders.dialog.services')}
            </Typography>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Grid container spacing={1}>
                {order.services.map((service, index) => (
                  <Grid item key={index}>
                    <Chip 
                      label={service} 
                      size="medium" 
                      sx={{ 
                        bgcolor: 'primary.verylight',
                        color: 'primary.main',
                        fontWeight: 500
                      }} 
                    />
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>

          {/* Notes */}
          {order.notes && (
            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                {t('orders.dialog.notes')}
              </Typography>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="body1">
                  {order.notes || t('orders.dialog.noNotes')}
                </Typography>
              </Paper>
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button 
          onClick={onClose} 
          variant="outlined" 
          color="secondary"
        >
          {t('orders.dialog.close')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderDetailsDialog;