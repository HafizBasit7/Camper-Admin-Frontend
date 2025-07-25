import React, { useState } from "react";
import { useTranslation } from "react-i18next";
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
  Pagination,
  CircularProgress,
  Alert,
  Menu,
} from "@mui/material";
import {
  Search,
  Block,
  CheckCircle,
  Refresh,
  MoreVert,
} from "@mui/icons-material";
import { useAllUsers, useUpdateUser } from "../hooks/mutations";

const UserManagement = () => {
  const { t } = useTranslation();

  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    search: "",
    role: "",
    status: "",
    sortBy: "name",
    sortOrder: "asc",
  });

  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [statusReason, setStatusReason] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuUser, setMenuUser] = useState(null);

  const handleMenuOpen = (event, user) => {
    setAnchorEl(event.currentTarget);
    setMenuUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuUser(null);
  };

  const handleUpdateField = (field, value) => {
    if (!menuUser) return;
    updateStatus({ userId: menuUser.id, [field]: value });
    handleMenuClose();
  };

  const {
    data: usersData = { users: [], total: 0 },
    isLoading,
    isError,
    error,
    refetch,
  } = useAllUsers(params);

  const { mutate: updateStatus, isLoading: isUpdatingStatus } = useUpdateUser();

  const handleTabChange = (_, newValue) =>
    setParams((p) => ({
      ...p,
      page: 1,
      role: newValue === 1 ? "admin" : newValue === 2 ? "user" : "",
    }));

  const handleSearchChange = (e) =>
    setParams((p) => ({ ...p, page: 1, search: e.target.value }));

  const handlePageChange = (_, newPage) =>
    setParams((p) => ({ ...p, page: newPage }));

  const handleSortChange = (e) =>
    setParams((p) => ({ ...p, sortBy: e.target.value }));

  const toggleSortOrder = () =>
    setParams((p) => ({
      ...p,
      sortOrder: p.sortOrder === "asc" ? "desc" : "asc",
    }));

  const handleOpenStatusDialog = (user) => {
    setSelectedUser(user);
    setOpenStatusDialog(true);
  };

  const handleCloseStatusDialog = () => {
    setOpenStatusDialog(false);
    setStatusReason("");
    setSelectedUser(null);
  };

  const handleStatusUpdate = () => {
    if (!selectedUser) return;
    const newStatus = selectedUser.status === "active" ? "suspended" : "active";
    updateStatus(
      {
        userId: selectedUser.id,
        status: newStatus,
        ...(newStatus === "suspended" && { reason: statusReason }),
      },
      { onSuccess: handleCloseStatusDialog }
    );
  };

  if (isLoading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );

  if (isError)
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error?.response?.data?.message || t("users.error.loading")}
        </Alert>
        <Button
          variant="contained"
          onClick={() => refetch()}
          startIcon={<Refresh />}
        >
          {t("users.retry")}
        </Button>
      </Box>
    );

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h4"
        sx={{ mb: 3, fontWeight: 600, color: "text.primary" }}
      >
        {t("users.title")}
      </Typography>

      <Paper sx={{ mb: 3, p: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <TextField
            placeholder={t("users.search.placeholder")}
            size="small"
            value={params.search}
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

          <Box sx={{ display: "flex", gap: 2 }}>
            <FormControl size="small" sx={{ width: 150 }}>
              <InputLabel>{t("users.sort.label")}</InputLabel>
              <Select
                value={params.sortBy}
                label={t("users.sort.label")}
                onChange={handleSortChange}
              >
                <MenuItem value="name">{t("users.sort.name")}</MenuItem>
                <MenuItem value="email">{t("users.sort.email")}</MenuItem>
                <MenuItem value="createdAt">
                  {t("users.sort.joinDate")}
                </MenuItem>
              </Select>
            </FormControl>

            <Tooltip
              title={t(
                params.sortOrder === "asc"
                  ? "users.sort.descending"
                  : "users.sort.ascending"
              )}
            >
              <IconButton onClick={toggleSortOrder}>
                <Refresh
                  sx={{
                    transform:
                      params.sortOrder === "desc" ? "scaleY(-1)" : "none",
                  }}
                />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <Tabs
          value={params.role === "admin" ? 1 : params.role === "user" ? 2 : 0}
          onChange={handleTabChange}
          sx={{ mb: 2 }}
        >
          <Tab label={t("users.tabs.all")} />
          <Tab label={t("users.tabs.admins")} />
          <Tab label={t("users.tabs.users")} />
        </Tabs>

        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: "primary.verylight" }}>
              <TableRow>
                <TableCell>{t("users.table.name")}</TableCell>
                <TableCell>{t("users.table.email")}</TableCell>
                <TableCell>{t("users.table.role")}</TableCell>
                <TableCell>{t("users.table.status")}</TableCell>
                <TableCell>{t("users.table.verification")}</TableCell>
                <TableCell>{t("users.table.joinDate")}</TableCell>
                <TableCell align="center">{t("users.table.actions")}</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {usersData.users.length ? (
                usersData.users.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Chip
                        label={t(`users.roles.${user.role}`)}
                        size="small"
                        sx={{
                          backgroundColor:
                            user.role === "admin"
                              ? "primary.blue"
                              : "primary.orange",
                          color: "white",
                          fontWeight: 500,
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={t(`users.status.${user.status}`)}
                        size="small"
                        sx={{
                          backgroundColor:
                            user.status === "active"
                              ? "success.light"
                              : "error.light",
                          color: "white",
                          fontWeight: 500,
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={t(
                          user.verified
                            ? "users.verification.verified"
                            : "users.verification.notVerified"
                        )}
                        size="small"
                        sx={{
                          backgroundColor: user.verified
                            ? "info.light"
                            : "secondary.light",
                          color: "white",
                          fontWeight: 500,
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      {user.joinDate
                        ? new Date(user.joinDate).toLocaleDateString()
                        : "N/A"}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuOpen(e, user)}
                      >
                        <MoreVert />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <Typography variant="body1" sx={{ py: 2 }}>
                      {params.search || params.role || params.status
                        ? t("users.table.noMatchingUsers")
                        : t("users.table.noUsers")}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {usersData.total > params.limit && (
          <Box sx={{ display: "flex", justifyContent: "center", pt: 2 }}>
            <Pagination
              count={Math.ceil(usersData.total / params.limit)}
              page={params.page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        )}
      </Paper>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            if (menuUser?.status === "active") {
              handleOpenStatusDialog(menuUser); // 🟢 Open dialog if suspending
            } else {
              handleUpdateField("status", "active"); // 🔄 Directly activate
            }
            handleMenuClose(); // ✅ Close the dropdown
          }}
        >
          {menuUser?.status === "active"
            ? t("users.actions.suspend")
            : t("users.actions.activate")}
        </MenuItem>

        <MenuItem
          onClick={() =>
            handleUpdateField(
              "role",
              menuUser?.role === "admin" ? "user" : "admin"
            )
          }
        >
          {menuUser?.role === "admin"
            ? t("users.actions.setUser")
            : t("users.actions.setAdmin")}
        </MenuItem>
        <MenuItem
          onClick={() => handleUpdateField("verified", !menuUser?.verified)}
        >
          {menuUser?.verified
            ? t("users.actions.unverify")
            : t("users.actions.verify")}
        </MenuItem>
      </Menu>

      <Dialog open={openStatusDialog} onClose={handleCloseStatusDialog}>
        <DialogTitle>
          {selectedUser?.status === "active"
            ? t("users.dialog.suspendTitle", { name: selectedUser?.name })
            : t("users.dialog.activateTitle", { name: selectedUser?.name })}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            {selectedUser?.status === "active"
              ? t("users.dialog.suspendMessage")
              : t("users.dialog.activateMessage")}
          </DialogContentText>
          {selectedUser?.status === "active" && (
            <TextField
              autoFocus
              margin="dense"
              label={t("users.dialog.suspensionReason")}
              fullWidth
              multiline
              rows={3}
              value={statusReason}
              onChange={(e) => setStatusReason(e.target.value)}
            />
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={handleCloseStatusDialog}
            variant="outlined"
            color="secondary"
            disabled={isUpdatingStatus}
          >
            {t("users.dialog.cancel")}
          </Button>
          <Button
            onClick={handleStatusUpdate}
            variant="contained"
            color={selectedUser?.status === "active" ? "error" : "success"}
            disabled={isUpdatingStatus}
            startIcon={isUpdatingStatus ? <CircularProgress size={20} /> : null}
          >
            {selectedUser?.status === "active"
              ? t("users.dialog.suspend")
              : t("users.dialog.activate")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManagement;
