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
  Chip,
  Paper,
  CircularProgress,
} from '@mui/material';
import { format } from 'date-fns';
import { getStatusColor } from '../data/orderTypes';
import { useOrderById } from '../hooks/mutations';

const OrderDetailsDialog = ({ open, order, onClose }) => {
  const { t } = useTranslation();

  const { data: fullOrder, isLoading } = useOrderById(order?.id);

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy h:mm a');
    } catch {
      return dateString;
    }
  };

  if (!open || !order) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth scroll="paper">
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight={600}>
            {t('orders.dialog.title')}
          </Typography>
          {fullOrder && (
            <Chip
              label={fullOrder.status}
              size="small"
              sx={{
                color: '#000',
                bgcolor: getStatusColor(fullOrder.status),
                fontWeight: 500,
                borderRadius: 2,
              }}
            />
          )}
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        {isLoading || !fullOrder ? (
          <Box sx={{ py: 5, textAlign: 'center' }}>
            <CircularProgress />
          </Box>
        ) : (
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
                      {fullOrder.id}
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
                        fullOrder.paymentStatus === 'Paid'
                          ? 'success.main'
                          : fullOrder.paymentStatus === 'Pending'
                          ? 'warning.main'
                          : fullOrder.paymentStatus === 'Cancelled'
                          ? 'error.main'
                          : 'text.primary'
                      }
                    >
                      {fullOrder.paymentStatus}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      {t('orders.dialog.createdAt')}
                    </Typography>
                    <Typography variant="body1">{formatDate(fullOrder.createdAt)}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      {t('orders.dialog.lastUpdated')}
                    </Typography>
                    <Typography variant="body1">{formatDate(fullOrder.updatedAt)}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      {t('orders.dialog.totalAmount')}
                    </Typography>
                    <Typography variant="body1" fontWeight={600} color="primary.main">
                      ${fullOrder.totalAmount?.toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* Customer and Vehicle Info */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                {t('orders.dialog.customerInfo')}
              </Typography>
              <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
                <Typography variant="body1" fontWeight={500}>
                  {fullOrder.customerName}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {t('orders.dialog.customerId')}: CUST-{fullOrder.id.split('-')[1]}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                {t('orders.dialog.vehicleInfo')}
              </Typography>
              <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
                <Typography variant="body1" fontWeight={500}>
                  {fullOrder.carModel}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {t('orders.dialog.plateNumber')}: {fullOrder.plateNumber}
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
                  {(fullOrder.services || []).map((service, index) => (
                    <Grid item key={index}>
                      <Chip
                        label={service}
                        size="medium"
                        sx={{
                          bgcolor: 'primary.verylight',
                          color: 'primary.main',
                          fontWeight: 500,
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>

            {/* Notes */}
            {fullOrder.notes && (
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  {t('orders.dialog.notes')}
                </Typography>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="body1">{fullOrder.notes}</Typography>
                </Paper>
              </Grid>
            )}
          </Grid>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} variant="outlined" color="secondary">
          {t('orders.dialog.close')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderDetailsDialog;
