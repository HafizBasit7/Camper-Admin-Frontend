import React, { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  useTheme,
  Tooltip,
  Button
} from '@mui/material';
import { Edit, Visibility, MoreVert, CheckCircle, Cancel } from '@mui/icons-material';
import { WITHDRAWAL_STATUS, getWithdrawalStatusColor, getWithdrawalStatusLabel } from '../../data/withdrawalTypes';
import { mockWithdrawals } from '../../data/mockData';
import WithdrawalActionMenu from './WithdrawalActionMenu';
import WithdrawalDetailsDialog from './WithdrawalDetailsDialog';

const WithdrawalList = ({ currentTab, filters }) => {
  const theme = useTheme();
  const [selectedWithdrawal, setSelectedWithdrawal] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleActionClick = (event, withdrawal) => {
    setSelectedWithdrawal(withdrawal);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedWithdrawal(null);
  };

  const handleViewDetails = (withdrawal) => {
    setSelectedWithdrawal(withdrawal);
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
    setSelectedWithdrawal(null);
  };

  const filteredWithdrawals = mockWithdrawals.filter(withdrawal => {
    if (currentTab === 'ALL') return true;
    if (currentTab === 'NEW') return withdrawal.status === WITHDRAWAL_STATUS.PENDING;
    if (currentTab === 'SENT') return withdrawal.status === WITHDRAWAL_STATUS.COMPLETED;
    if (currentTab === 'RECEIVED') return withdrawal.status === WITHDRAWAL_STATUS.PROCESSING;
    return true;
  });

  return (
    <>
      <TableContainer 
        component={Paper} 
        sx={{ 
          mt: 2,
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          borderRadius: 2,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Owner</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Vehicle</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Payment Method</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Request Date</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredWithdrawals.map((withdrawal) => (
              <TableRow 
                key={withdrawal.id}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.02)',
                    transition: 'background-color 0.2s ease-in-out'
                  }
                }}
              >
                <TableCell>{withdrawal.ownerName}</TableCell>
                <TableCell>{withdrawal.vehicleName}</TableCell>
                <TableCell>${withdrawal.amount.toFixed(2)}</TableCell>
                <TableCell>{withdrawal.paymentMethod}</TableCell>
                <TableCell>{withdrawal.requestDate}</TableCell>
                <TableCell>
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
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="View Details">
                    <IconButton 
                      size="small" 
                      color="primary"
                      onClick={() => handleViewDetails(withdrawal)}
                      sx={{
                        '&:hover': {
                          backgroundColor: 'rgba(25, 118, 210, 0.08)'
                        }
                      }}
                    >
                      <Visibility />
                    </IconButton>
                  </Tooltip>
                  {withdrawal.status === WITHDRAWAL_STATUS.PENDING && (
                    <>
                      <Tooltip title="Approve">
                        <IconButton 
                          size="small" 
                          color="success"
                          sx={{
                            '&:hover': {
                              backgroundColor: 'rgba(46, 125, 50, 0.08)'
                            }
                          }}
                        >
                          <CheckCircle />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Reject">
                        <IconButton 
                          size="small" 
                          color="error"
                          sx={{
                            '&:hover': {
                              backgroundColor: 'rgba(211, 47, 47, 0.08)'
                            }
                          }}
                        >
                          <Cancel />
                        </IconButton>
                      </Tooltip>
                    </>
                  )}
                  <Tooltip title="More Actions">
                    <IconButton
                      size="small"
                      onClick={(e) => handleActionClick(e, withdrawal)}
                      sx={{
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.04)'
                        }
                      }}
                    >
                      <MoreVert />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <WithdrawalActionMenu
        anchorEl={anchorEl}
        withdrawal={selectedWithdrawal}
        onClose={handleCloseMenu}
      />

      <WithdrawalDetailsDialog
        open={detailsOpen}
        onClose={handleCloseDetails}
        withdrawal={selectedWithdrawal}
      />
    </>
  );
};

export default WithdrawalList; 