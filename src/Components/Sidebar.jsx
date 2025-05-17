import React from 'react'
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Box, Typography } from '@mui/material'
import { Dashboard, People, Settings } from '@mui/icons-material'
import { NavLink, useLocation } from 'react-router-dom'

const drawerWidth = 240

const navItems = [
  { text: 'Dashboard', icon: <Dashboard />, path: '/' },
  { text: 'Users', icon: <People />, path: '/users' },
  { text: 'Settings', icon: <Settings />, path: '/settings' },
]

const Sidebar = () => {
  const location = useLocation()

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#1e1e2f',
          color: '#fff',
        },
      }}
    >
      <Box sx={{ p: 2, textAlign: 'center', borderBottom: '1px solid #444' }}>
        <Typography variant="h6" fontWeight="bold">
          Admin Panel
        </Typography>
      </Box>

      <List>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <NavLink
              key={item.text}
              to={item.path}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <ListItemButton
                sx={{
                  backgroundColor: isActive ? '#2e3b55' : 'inherit',
                  '&:hover': {
                    backgroundColor: '#2e3b55',
                  },
                }}
              >
                <ListItemIcon sx={{ color: '#fff' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </NavLink>
          )
        })}
      </List>
    </Drawer>
  )
}

export default Sidebar
