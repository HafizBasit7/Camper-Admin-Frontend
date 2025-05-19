import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Chip,
  TextField,
  InputAdornment,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Pagination
} from '@mui/material';
import {
  Search,
  Block,
  CheckCircle,
  MoreVert,
  Refresh
} from '@mui/icons-material';

// Mock data for users
const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    status: 'active',
    verified: true,
    joinDate: '2025-01-15',
    vehiclesUploaded: 5,
    vehiclesBooked: 2
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user',
    status: 'active',
    verified: true,
    joinDate: '2025-02-10',
    vehiclesUploaded: 3,
    vehiclesBooked: 7
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'user',
    status: 'suspended',
    verified: false,
    joinDate: '2025-03-05',
    vehiclesUploaded: 0,
    vehiclesBooked: 1
  },
  {
    id: 4,
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    role: 'user',
    status: 'active',
    verified: false,
    joinDate: '2025-03-20',
    vehiclesUploaded: 1,
    vehiclesBooked: 0
  },
  {
    id: 5,
    name: 'Robert Brown',
    email: 'robert@example.com',
    role: 'admin',
    status: 'active',
    verified: true,
    joinDate: '2024-12-05',
    vehiclesUploaded: 2,
    vehiclesBooked: 0
  }
];

const UserManagement = () => {
  const [tabValue, setTabValue] = useState(0);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [openSuspendDialog, setOpenSuspendDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [suspensionReason, setSuspensionReason] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  // Load mock data on component mount
  useEffect(() => {
    // In a real application, this would be an API call
    setUsers(mockUsers);
  }, []);

  // Filter users based on tab selection and search term
  useEffect(() => {
    let filtered = [...users];
    
    // Filter by tab selection (role)
    if (tabValue === 1) {
      filtered = filtered.filter(user => user.role === 'admin');
    } else if (tabValue === 2) {
      filtered = filtered.filter(user => user.role === 'user');
    }
    
    // Apply search filter if there's a search term
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        user => 
          user.name.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower)
      );
    }
    
    // Sort users
    filtered.sort((a, b) => {
      let comparison = 0;
      if (a[sortBy] < b[sortBy]) {
        comparison = -1;
      } else if (a[sortBy] > b[sortBy]) {
        comparison = 1;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });
    
    setFilteredUsers(filtered);
  }, [users, tabValue, search, sortBy, sortOrder]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setPage(1);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSortOrderChange = () => {
    setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleOpenSuspendDialog = (user) => {
    setSelectedUser(user);
    setOpenSuspendDialog(true);
  };

  const handleCloseSuspendDialog = () => {
    setOpenSuspendDialog(false);
    setSuspensionReason('');
  };

  const handleSuspendUser = () => {
    // In a real application, this would be an API call
    setUsers(users.map(user => 
      user.id === selectedUser.id 
        ? { ...user, status: user.status === 'active' ? 'suspended' : 'active' } 
        : user
    ));
    handleCloseSuspendDialog();
  };

  // Calculate pagination
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
  const pageCount = Math.ceil(filteredUsers.length / rowsPerPage);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, color: 'text.primary' }}>
        User Management
      </Typography>
      
      <Paper sx={{ mb: 3, p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <TextField
            placeholder="Search users by name or email"
            variant="outlined"
            size="small"
            value={search}
            onChange={handleSearchChange}
            sx={{ width: 300 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl size="small" sx={{ width: 150 }}>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                label="Sort By"
                onChange={handleSortChange}
              >
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="email">Email</MenuItem>
                <MenuItem value="joinDate">Join Date</MenuItem>
                <MenuItem value="vehiclesUploaded">Vehicles Uploaded</MenuItem>
                <MenuItem value="vehiclesBooked">Vehicles Booked</MenuItem>
              </Select>
            </FormControl>
            
            <Tooltip title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}>
              <IconButton onClick={handleSortOrderChange}>
                <Refresh sx={{ transform: sortOrder === 'desc' ? 'scaleY(-1)' : 'none' }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          sx={{ 
            mb: 2,
            '& .MuiTab-root': { 
              fontWeight: 600,
              '&.Mui-selected': {
                color: 'primary.main',
              }
            },
            '& .MuiTabs-indicator': {
              backgroundColor: 'primary.main',
            }
          }}
        >
          <Tab label="All Users" />
          <Tab label="Admins" />
          <Tab label="Users" />
        </Tabs>
        
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: 'primary.verylight' }}>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Verification</TableCell>
                <TableCell>Join Date</TableCell>
                <TableCell>Vehicles Uploaded</TableCell>
                <TableCell>Vehicles Booked</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Chip 
                        label={user.role === 'admin' ? 'Admin' : 'User'} 
                        size="small"
                        sx={{ 
                          backgroundColor: user.role === 'admin' ? 'primary.blue' : 'primary.orange',
                          color: 'white',
                          fontWeight: 500,
                          minWidth:70,
                          borderRadius:2
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={user.status === 'active' ? 'Active' : 'Suspended'} 
                        size="small"
                        sx={{ 
                          backgroundColor: user.status === 'active' ? 'success.light' : 'error.light',
                          color: 'white',
                          fontWeight: 500,
                          minWidth:80,
                          borderRadius:2
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={user.verified ? 'Verified' : 'Not Verified'} 
                        size="small"
                        sx={{ 
                          backgroundColor: user.verified ? 'info.light' : 'secondary.light',
                          color: 'white',
                          fontWeight: 500,
                          minWidth:90,
                          borderRadius:2
                        }}
                      />
                    </TableCell>
                    <TableCell>{user.joinDate}</TableCell>
                    <TableCell align="center">{user.vehiclesUploaded}</TableCell>
                    <TableCell align="center">{user.vehiclesBooked}</TableCell>
                    <TableCell align="center">
                      <Tooltip title={user.status === 'active' ? "Suspend User" : "Activate User"}>
                        <IconButton 
                          size="small" 
                          onClick={() => handleOpenSuspendDialog(user)}
                          color={user.status === 'active' ? "error" : "success"}
                        >
                          {user.status === 'active' ? <Block /> : <CheckCircle />}
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="More Actions">
                        <IconButton size="small">
                          <MoreVert />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    <Typography variant="body1" sx={{ py: 2 }}>
                      No users found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        {filteredUsers.length > rowsPerPage && (
          <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2 }}>
            <Pagination 
              count={pageCount} 
              page={page} 
              onChange={handleChangePage} 
              color="primary" 
            />
          </Box>
        )}
      </Paper>
      
      {/* Suspend User Dialog */}
      <Dialog open={openSuspendDialog} onClose={handleCloseSuspendDialog}>
        <DialogTitle>
          {selectedUser?.status === 'active' 
            ? `Suspend ${selectedUser?.name}'s Account` 
            : `Activate ${selectedUser?.name}'s Account`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            {selectedUser?.status === 'active' 
              ? "Are you sure you want to suspend this user? The user will not be able to access the platform until reactivated."
              : "Are you sure you want to activate this user? The user will regain access to the platform."}
          </DialogContentText>
          
          {selectedUser?.status === 'active' && (
            <TextField
              autoFocus
              margin="dense"
              label="Reason for suspension"
              fullWidth
              variant="outlined"
              multiline
              rows={3}
              value={suspensionReason}
              onChange={(e) => setSuspensionReason(e.target.value)}
            />
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseSuspendDialog} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button 
            onClick={handleSuspendUser} 
            variant="contained" 
            color={selectedUser?.status === 'active' ? "error" : "primary"}
          >
            {selectedUser?.status === 'active' ? "Suspend User" : "Activate User"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManagement;