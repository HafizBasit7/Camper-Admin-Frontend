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
  Visibility,
  CheckCircle,
  Cancel,
  Block,
  Report
} from '@mui/icons-material';
import { VEHICLE_STATUS } from '../../data/vehicleTypes';

const VehicleActionMenu = ({ anchorEl, vehicle, onClose }) => {
  if (!vehicle) return null;

  const handleAction = (action) => {
    // Handle different actions based on vehicle status
    switch (action) {
      case 'view':
        // Handle view action
        break;
      case 'edit':
        // Handle edit action
        break;
      case 'approve':
        // Handle approve action
        break;
      case 'reject':
        // Handle reject action
        break;
      case 'suspend':
        // Handle suspend action
        break;
      case 'report':
        // Handle report action
        break;
      default:
        break;
    }
    onClose();
  };

  const getAvailableActions = () => {
    switch (vehicle.status) {
      case VEHICLE_STATUS.PENDING:
        return [
          { label: 'View Details', icon: <Visibility />, action: 'view' },
          { label: 'Approve', icon: <CheckCircle />, action: 'approve' },
          { label: 'Reject', icon: <Cancel />, action: 'reject' }
        ];
      case VEHICLE_STATUS.APPROVED:
        return [
          { label: 'View Details', icon: <Visibility />, action: 'view' },
          { label: 'Edit', icon: <Edit />, action: 'edit' },
          { label: 'Suspend', icon: <Block />, action: 'suspend' }
        ];
      case VEHICLE_STATUS.SUSPENDED:
        return [
          { label: 'View Details', icon: <Visibility />, action: 'view' },
          { label: 'View Reports', icon: <Report />, action: 'report' },
          { label: 'Approve', icon: <CheckCircle />, action: 'approve' }
        ];
      default:
        return [
          { label: 'View Details', icon: <Visibility />, action: 'view' },
          { label: 'Edit', icon: <Edit />, action: 'edit' }
        ];
    }
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      PaperProps={{
        elevation: 3,
        sx: {
          minWidth: 200
        }
      }}
    >
      {getAvailableActions().map((action, index) => (
        <React.Fragment key={action.action}>
          <MenuItem onClick={() => handleAction(action.action)}>
            <ListItemIcon>{action.icon}</ListItemIcon>
            <ListItemText>{action.label}</ListItemText>
          </MenuItem>
          {index < getAvailableActions().length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </Menu>
  );
};

export default VehicleActionMenu; 