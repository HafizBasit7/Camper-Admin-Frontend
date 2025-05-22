import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Chip, 
  IconButton, 
  Typography,
  Box
} from '@mui/material';
import { 
  Visibility as VisibilityIcon
} from '@mui/icons-material';
import { format } from 'date-fns';
import { getStatusColor } from '../data/orderTypes';
import OrderDetailsDialog from './OrderDetailsDialog';

const OrdersTable = ({ orders }) => {
  const [detailsDialog, setDetailsDialog] = useState({ open: false, order: null });

  // Handle opening details dialog
  const handleViewDetails = (order) => {
    setDetailsDialog({ open: true, order });
  };

  // Handle closing details dialog
  const handleDetailsClose = () => {
    setDetailsDialog({ open: false, order: null });
  };

  // Format date to readable string
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy h:mm a');
    } catch (error) {
      return dateString;
    }
  };

  return (
    <>
      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'grey.200' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'primary.verylight' }}>
              <TableCell sx={{ fontWeight: 600 }}>Order ID</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Customer</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Car Details</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Created</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Updated</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="right">View</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <TableRow key={order.id} hover>
                  <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                    {order.id}
                  </TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>{order.carModel}</Typography>
                    <Typography variant="caption" color="text.secondary">{order.plateNumber}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={order.status} 
                      size="small" 
                      sx={{ 
                        color: 'black',
                        bgcolor: getStatusColor(order.status),
                        fontWeight: 500,
                        minWidth:150,
                        borderRadius:2
                      }} 
                    />
                  </TableCell>
                  <TableCell>{formatDate(order.createdAt)}</TableCell>
                  <TableCell>{formatDate(order.updatedAt)}</TableCell>
                  <TableCell align="right">
                    <IconButton 
                      size="small" 
                      onClick={() => handleViewDetails(order)}
                    >
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                  <Typography variant="body1" color="text.secondary">
                    No orders found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Order Details Dialog */}
      <OrderDetailsDialog 
        open={detailsDialog.open} 
        order={detailsDialog.order} 
        onClose={handleDetailsClose} 
      />
    </>
  );
};

export default OrdersTable;