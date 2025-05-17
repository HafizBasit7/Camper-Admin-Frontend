import React from 'react'
import { Box } from '@mui/material'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Components/Sidebar'

const AdminLayout = () => {
  return (
    <Box display="flex">
      <Sidebar />
      <Box flex="1">
        <Header />
        <Box p={2}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}

export default AdminLayout
