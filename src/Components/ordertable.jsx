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
  Button,
  Menu,
  MenuItem,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField
} from '@mui/material';
import { 
  MoreVert as MoreVertIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';
import { format } from 'date-fns';
import { ORDER_ACTIONS, getStatusColor } from '../data/orderTypes';
import { updateOrderStatus } from '../data/mockData';
import OrderDetailsDialog from './OrderDetailsDialog';

const OrdersTable = ({ orders, onStatusUpdate }) => {
  const [actionMenuAnchor, setActionMenuAnchor] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ open: false, action: null, title: '', message: '' });
  const [noteDialog, setNoteDialog] = useState({ open: false, action: null });
  const [actionNote, setActionNote] = useState('');
  const [detailsDialog, setDetailsDialog] = useState({ open: false, order: null });

  // Handle opening action menu
  const handleActionMenuOpen = (event, order) => {
    setActionMenuAnchor(event.currentTarget);
    setSelectedOrder(order);
  };

  // Handle closing action menu
  const handleActionMenuClose = () => {
    setActionMenuAnchor(null);
  };

  // Handle clicking on an action
  const handleActionClick = (action) => {
    handleActionMenuClose();
    
    // Define actions that require notes
    const actionsRequiringNotes = ['issue', 'dismiss'];

    if (actionsRequiringNotes.includes(action.value)) {
      setNoteDialog({ open: true, action });
    } else {
      openConfirmDialog(action);
    }
  };

  // Open confirmation dialog
  const openConfirmDialog = (action) => {
    const actionMessages = {
      start: { title: 'Start Order', message: 'Are you sure you want to start this order?' },
      complete: { title: 'Complete Order', message: 'Are you sure this order is complete?' },
      handover: { title: 'Handover Order', message: 'Confirm handover of this order?' },
      dismiss: { title: 'Dismiss Order', message: 'Are you sure you want to dismiss this order?' },
      reopen: { title: 'Reopen Order', message: 'Do you want to reopen this order?' },
      issue: { title: 'Report Issue', message: 'Confirm reporting an issue with this order?' },
      resolve: { title: 'Resolve Issue', message: 'Confirm this issue has been resolved?' }
    };

    const { title, message } = actionMessages[action.value] || { 
      title: 'Confirm Action', 
      message: 'Are you sure you want to perform this action?' 
    };

    setConfirmDialog({
      open: true,
      action,
      title,
      message
    });
  };

  // Handle confirmation dialog close
  const handleConfirmDialogClose = () => {
    setConfirmDialog({ ...confirmDialog, open: false });
  };

  // Handle note dialog close
  const handleNoteDialogClose = () => {
    setNoteDialog({ open: false, action: null });
    setActionNote('');
  };

  // Handle note submission
  const handleNoteSubmit = () => {
    openConfirmDialog(noteDialog.action);
    handleNoteDialogClose();
  };

  // Handle opening details dialog
  const handleViewDetails = (order) => {
    setDetailsDialog({ open: true, order });
  };

  // Handle closing details dialog
  const handleDetailsClose = () => {
    setDetailsDialog({ open: false, order: null });
  };

  // Handle action confirmation
  const handleConfirmAction = async () => {
    if (!selectedOrder || !confirmDialog.action) return;

    const actionToStatusMap = {
      start: 'Ongoing',
      complete: 'Completed',
      handover: 'Handovered',
      dismiss: 'Dismissed',
      reopen: 'New placed',
      issue: 'Request for any issues',
      resolve: 'Completed'
    };

    const newStatus = actionToStatusMap[confirmDialog.action.value];
    
    if (newStatus) {
      try {
        const updatedOrders = await updateOrderStatus(selectedOrder.id, newStatus);
        onStatusUpdate(updatedOrders);
      } catch (error) {
        console.error('Error updating order status:', error);
      }
    }

    handleConfirmDialogClose();
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
              <TableCell sx={{ fontWeight: 600 }} align="right">Actions</TableCell>
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
                        color: 'white',
                        bgcolor: getStatusColor(order.status),
                        fontWeight: 500
                      }} 
                    />
                  </TableCell>
                  <TableCell>{formatDate(order.createdAt)}</TableCell>
                  <TableCell>{formatDate(order.updatedAt)}</TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <IconButton 
                        size="small" 
                        onClick={() => handleViewDetails(order)}
                        sx={{ mr: 1 }}
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        onClick={(e) => handleActionMenuOpen(e, order)}
                      >
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </Box>
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

      {/* Action Menu */}
      <Menu
        anchorEl={actionMenuAnchor}
        open={Boolean(actionMenuAnchor)}
        onClose={handleActionMenuClose}
      >
        {selectedOrder && ORDER_ACTIONS[selectedOrder.status]?.map((action) => (
          <MenuItem key={action.value} onClick={() => handleActionClick(action)}>
            <Typography color={`${action.color}.main`}>
              {action.label}
            </Typography>
          </MenuItem>
        ))}
        {selectedOrder && (!ORDER_ACTIONS[selectedOrder.status] || ORDER_ACTIONS[selectedOrder.status].length === 0) && (
          <MenuItem disabled>
            <Typography variant="body2" color="text.secondary">
              No actions available
            </Typography>
          </MenuItem>
        )}
      </Menu>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialog.open}
        onClose={handleConfirmDialogClose}
      >
        <DialogTitle>{confirmDialog.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {confirmDialog.message}
            {actionNote && (
              <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic' }}>
                Note: {actionNote}
              </Typography>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmDialogClose} color="secondary">Cancel</Button>
          <Button 
            onClick={handleConfirmAction} 
            color={confirmDialog.action?.color || 'primary'} 
            variant="contained"
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Note Dialog */}
      <Dialog
        open={noteDialog.open}
        onClose={handleNoteDialogClose}
      >
        <DialogTitle>Add a note</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Please provide details about this action.
          </DialogContentText>
          <TextField
            autoFocus
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            label="Note"
            value={actionNote}
            onChange={(e) => setActionNote(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNoteDialogClose} color="secondary">Cancel</Button>
          <Button 
            onClick={handleNoteSubmit} 
            color="primary" 
            variant="contained"
            disabled={!actionNote.trim()}
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>

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