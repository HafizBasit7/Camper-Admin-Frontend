import React from 'react';
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import {
  Edit,
  Delete,
  ContentCopy,
  Download,
  Print
} from '@mui/icons-material';
import { WITHDRAWAL_STATUS } from '../../data/withdrawalTypes';

const WithdrawalActionMenu = ({ anchorEl, withdrawal, onClose }) => {
  const handleAction = (action) => {
    // Handle different actions here
    console.log(`Action: ${action} for withdrawal:`, withdrawal);
    onClose();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      PaperProps={{
        sx: {
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: 1,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          minWidth: 180
        }
      }}
    >
      {withdrawal?.status === WITHDRAWAL_STATUS.PENDING && (
        <>
          <MenuItem onClick={() => handleAction('approve')}>
            <ListItemIcon>
              <Edit fontSize="small" />
            </ListItemIcon>
            <ListItemText>Approve Request</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => handleAction('reject')}>
            <ListItemIcon>
              <Delete fontSize="small" />
            </ListItemIcon>
            <ListItemText>Reject Request</ListItemText>
          </MenuItem>
          <Divider />
        </>
      )}
      <MenuItem onClick={() => handleAction('copy')}>
        <ListItemIcon>
          <ContentCopy fontSize="small" />
        </ListItemIcon>
        <ListItemText>Copy Details</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => handleAction('download')}>
        <ListItemIcon>
          <Download fontSize="small" />
        </ListItemIcon>
        <ListItemText>Download Receipt</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => handleAction('print')}>
        <ListItemIcon>
          <Print fontSize="small" />
        </ListItemIcon>
        <ListItemText>Print Details</ListItemText>
      </MenuItem>
    </Menu>
  );
};

export default WithdrawalActionMenu; 