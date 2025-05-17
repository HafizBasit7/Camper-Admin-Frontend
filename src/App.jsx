import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminLayout from './Layouts/AdminLayouts'
import Dashboard from './Pages/DashBoard'


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        {/* <Route path="users" element={<Users />} /> */}
      </Route>
    </Routes>
  )
}

export default App
