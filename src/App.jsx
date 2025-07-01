import { Routes, Route, Navigate } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { getToken } from '../utils/index';

import AdminLayout from './Layouts/AdminLayouts';
import Dashboard from './Pages/DashBoard';
import OrdersPage from './Pages/OrdersPage';
import Settings from './Components/DashBoardComponents/Settings';
import UserManagement from './Pages/UserManaegement';
import VehicleManagement from './Pages/VehicleManagement';
import WithdrawalManagement from './Pages/WithdrawalManagement';
import BlogManagement from './Pages/BlogManagement';
import ReportsManagement from './Pages/ReportsManagement';
import PendingItemsPage from './Pages/PendingItemsPage';
import LoginPage from './Pages/LoginPage';

const RequireAuth = ({ children }) =>
  getToken() ? children : <Navigate to="/login" replace />;

const App = () => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <AdminLayout />
          </RequireAuth>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="settings" element={<Settings />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="vehicle" element={<VehicleManagement />} />
        <Route path="vehicle/owner/:ownerId" element={<VehicleManagement />} />
        <Route path="withdrawals" element={<WithdrawalManagement />} />
        <Route path="blog" element={<BlogManagement />} />
        <Route path="reports" element={<ReportsManagement />} />
        <Route path="pending/:type" element={<PendingItemsPage />} />
      </Route>
    </Routes>
  </LocalizationProvider>
);

export default App;
