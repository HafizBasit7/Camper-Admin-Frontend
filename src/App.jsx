import { Routes, Route } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

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

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="settings" element={<Settings />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="vehicle" element={<VehicleManagement />} />
          <Route path="vehicle/owner/:ownerName" element={<VehicleManagement />} />
          <Route path="withdrawals" element={<WithdrawalManagement />} />
          <Route path="blog" element={<BlogManagement />} />
          <Route path="reports" element={<ReportsManagement />} />
          <Route path="pending/:type" element={<PendingItemsPage />} />
        </Route>
      </Routes>
    </LocalizationProvider>
  );
};

export default App;
