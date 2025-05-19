import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  useTheme,
  Divider,
  Paper
} from '@mui/material';
import { Close, Check, Cancel } from '@mui/icons-material';
import { CHANGE_REQUEST_FIELDS } from '../../data/vehicleTypes';

const CustomInput = ({ label, value, onChange, type = 'text', disabled = false }) => (
  <Box sx={{ mb: 2 }}>
    <Typography 
      variant="body2" 
      sx={{ 
        color: 'text.secondary',
        mb: 1,
        fontWeight: 500
      }}
    >
      {label}
    </Typography>
    <input
      type={type}
      value={value}
      onChange={onChange}
      disabled={disabled}
      style={{
        width: '100%',
        padding: '10px 12px',
        borderRadius: '8px',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        backgroundColor: disabled ? 'rgba(0, 0, 0, 0.04)' : 'white',
        fontSize: '14px',
        outline: 'none',
        transition: 'all 0.2s ease',
        '&:focus': {
          borderColor: '#FF9B00',
          boxShadow: '0 0 0 2px rgba(255, 155, 0, 0.1)'
        }
      }}
    />
  </Box>
);

const ChangeRequestItem = ({ request, onApprove, onReject }) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Paper
      sx={{
        p: 2,
        mb: 2,
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        borderRadius: 2,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)'
        }
      }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="subtitle1" fontWeight={600}>
          {request.field}
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            color: theme.palette.text.secondary,
            opacity: 0.8
          }}
        >
          {request.date}
        </Typography>
      </Box>

      {isExpanded && (
        <Box sx={{ mt: 2 }}>
          <Divider sx={{ my: 2 }} />
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Current Value
            </Typography>
            <Typography variant="body1">
              {request.currentValue}
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Requested Value
            </Typography>
            <Typography variant="body1">
              {request.requestedValue}
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Reason for Change
            </Typography>
            <Typography variant="body1">
              {request.reason}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            <Button
              variant="contained"
              color="success"
              startIcon={<Check />}
              onClick={(e) => {
                e.stopPropagation();
                onApprove(request.id);
              }}
              sx={{
                textTransform: 'none',
                borderRadius: 2,
                px: 3
              }}
            >
              Approve
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<Cancel />}
              onClick={(e) => {
                e.stopPropagation();
                onReject(request.id);
              }}
              sx={{
                textTransform: 'none',
                borderRadius: 2,
                px: 3
              }}
            >
              Reject
            </Button>
          </Box>
        </Box>
      )}
    </Paper>
  );
};

const VehicleChangeRequests = ({ open, onClose, vehicle }) => {
  const theme = useTheme();
  const [newRequest, setNewRequest] = useState({
    field: '',
    currentValue: '',
    requestedValue: '',
    reason: ''
  });

  const handleApprove = (requestId) => {
    // Handle approval logic
    console.log('Approving request:', requestId);
  };

  const handleReject = (requestId) => {
    // Handle rejection logic
    console.log('Rejecting request:', requestId);
  };

  const handleSubmit = () => {
    // Handle new request submission
    console.log('Submitting new request:', newRequest);
    setNewRequest({
      field: '',
      currentValue: '',
      requestedValue: '',
      reason: ''
    });
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
              color: theme.palette.text.primary,
              textShadow: '0 1px 2px rgba(0,0,0,0.1)'
            }}
          >
            Change Requests
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
        <Typography 
          variant="subtitle2" 
          sx={{
            color: theme.palette.text.secondary,
            opacity: 0.8
          }}
        >
          {vehicle?.name} - {vehicle?.owner}
        </Typography>
      </DialogTitle>

      <DialogContent>
        {/* Existing Change Requests */}
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 2,
              fontWeight: 600,
              color: theme.palette.text.primary
            }}
          >
            Pending Requests
          </Typography>
          {vehicle?.changeRequests?.map((request) => (
            <ChangeRequestItem
              key={request.id}
              request={request}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          ))}
        </Box>

        {/* New Change Request Form */}
        <Box sx={{ mt: 4 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 2,
              fontWeight: 600,
              color: theme.palette.text.primary
            }}
          >
            New Change Request
          </Typography>
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
            <CustomInput
              label="Field to Change"
              value={newRequest.field}
              onChange={(e) => setNewRequest({ ...newRequest, field: e.target.value })}
            />
            <CustomInput
              label="Current Value"
              value={newRequest.currentValue}
              onChange={(e) => setNewRequest({ ...newRequest, currentValue: e.target.value })}
            />
            <CustomInput
              label="Requested Value"
              value={newRequest.requestedValue}
              onChange={(e) => setNewRequest({ ...newRequest, requestedValue: e.target.value })}
            />
            <CustomInput
              label="Reason for Change"
              value={newRequest.reason}
              onChange={(e) => setNewRequest({ ...newRequest, reason: e.target.value })}
            />
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                mt: 2,
                textTransform: 'none',
                borderRadius: 2,
                px: 4,
                py: 1
              }}
            >
              Submit Request
            </Button>
          </Paper>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default VehicleChangeRequests; 