import React from 'react'
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography
} from '@mui/material'
import { Dashboard, People, Settings } from '@mui/icons-material'
import { NavLink, useLocation } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import GroupIcon from '@mui/icons-material/Group';


const drawerWidth = 240
const navItems = [
  { text: 'Dashboard', icon: <Dashboard />, path: '/' },
  { text: 'Orders', icon: <People />, path: '/orders' },
  { text: 'Settings', icon: <Settings />, path: '/settings' },
    { text: 'Users', icon: <GroupIcon />, path: '/users' },

]

const Sidebar = () => {
  const location = useLocation()
  const theme = useTheme()

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: 'rgba(0, 0, 0, 0.97)', // dark glassy
          color: '#fff',
          backdropFilter: 'blur(10px)', // glassmorphism
          borderRight: '1px solid rgba(255, 255, 255, 0.1)',
        },
      }}
    >
      <Box sx={{ p: 2, textAlign: 'center', borderBottom: `1px solid ${theme.palette.primary.light}` }}>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ fontFamily: theme.typography.fontFamily }}
        >
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
              style={{ textDecoration: 'none' }}
            >
              <ListItemButton
                sx={{
                  backgroundColor: isActive
                    ? theme.palette.primary.main
                    : 'transparent',
                  color: isActive ? '#000' : '#fff',
                  '&:hover': {
                    backgroundColor: theme.palette.primary.main,
                    color: '#000',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive ? '#000' : '#fff',
                    minWidth: 36,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 'bold' : 'normal',
                  }}
                />
              </ListItemButton>
            </NavLink>
          )
        })}
      </List>
    </Drawer>
  )
}

export default Sidebar
