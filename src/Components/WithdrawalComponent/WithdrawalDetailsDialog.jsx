import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Grid,
  Chip,
  useTheme,
  Divider
} from '@mui/material';
import { getWithdrawalStatusColor, getWithdrawalStatusLabel } from '../../data/withdrawalTypes';

const DetailItem = ({ label, value }) => (
  <Box sx={{ mb: 2 }}>
    <Typography 
      variant="body2" 
      color="text.secondary"
      sx={{ mb: 0.5 }}
    >
      {label}
    </Typography>
    <Typography variant="body1">
      {value}
    </Typography>
  </Box>
);

const WithdrawalDetailsDialog = ({ open, onClose, withdrawal }) => {
  const theme = useTheme();

  if (!withdrawal) return null;

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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography 
            variant="h6" 
            fontWeight="bold"
            sx={{
              color: theme.palette.text.primary,
              textShadow: '0 1px 2px rgba(0,0,0,0.1)'
            }}
          >
            Withdrawal Details
          </Typography>
          <Chip
            label={getWithdrawalStatusLabel(withdrawal.status)}
            sx={{
              backgroundColor: getWithdrawalStatusColor(withdrawal.status),
              color: '#000',
              fontWeight: 500,
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              minWidth: 120,
              borderRadius: 1,
              height: 24,
              py: 1,
              fontSize: '0.7rem',
              '& .MuiChip-label': {
                p: 1
              }
            }}
          />
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <DetailItem label="Owner Name" value={withdrawal.ownerName} />
            <DetailItem label="Vehicle" value={withdrawal.vehicleName} />
            <DetailItem label="Amount" value={`$${withdrawal.amount.toFixed(2)}`} />
            <DetailItem label="Request Date" value={withdrawal.requestDate} />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailItem label="Payment Method" value={withdrawal.paymentMethod} />
            <DetailItem label="Account Details" value={withdrawal.accountDetails} />
            <DetailItem label="Settlement Date" value={withdrawal.settlementDate} />
            <DetailItem label="Notes" value={withdrawal.notes} />
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Typography 
          variant="subtitle2" 
          color="text.secondary"
          sx={{ mb: 1 }}
        >
          Transaction History
        </Typography>
        <Box 
          sx={{ 
            p: 2, 
            background: 'rgba(0, 0, 0, 0.02)',
            borderRadius: 1
          }}
        >
          <Typography variant="body2">
            Request submitted on {withdrawal.requestDate}
          </Typography>
          {withdrawal.status !== 'PENDING' && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Status updated to {getWithdrawalStatusLabel(withdrawal.status)}
            </Typography>
          )}
        </Box>
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

export default WithdrawalDetailsDialog; 