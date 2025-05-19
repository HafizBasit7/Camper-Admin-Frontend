import { Routes, Route } from 'react-router-dom'
import AdminLayout from './Layouts/AdminLayouts'
import Dashboard from './Pages/DashBoard'
import OrdersPage from './Pages/OrdersPage'
import Settings from './Components/DashBoardComponents/Settings'
import UserManagement from './Pages/UserManaegement'




const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />
        <Route path="orders" element={<OrdersPage />} />
                <Route path="users" element={<        UserManagement />} />

      </Route>
    </Routes>
  )
}

export default App
