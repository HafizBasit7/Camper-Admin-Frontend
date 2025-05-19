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
import { Dashboard, People, Settings, AccountBalance, Article, Report } from '@mui/icons-material'
import { NavLink, useLocation } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import GroupIcon from '@mui/icons-material/Group';


const drawerWidth = 240
const navItems = [
  { text: 'Dashboard', icon: <Dashboard />, path: '/' },
  { text: 'Orders', icon: <People />, path: '/orders' },
  { text: 'Users', icon: <GroupIcon />, path: '/users' },
  { text: 'Vehicles', icon: <Settings />, path: '/vehicle' },
  { text: 'Withdrawals', icon: <AccountBalance />, path: '/withdrawals' },
  { text: 'Blog', icon: <Article />, path: '/blog' },
  { text: 'Reports', icon: <Report />, path: '/reports' },
  { text: 'Settings', icon: <Settings />, path: '/settings' },
   

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
        backgroundColor: '#fff', // cloudy white
        color: '#333', // dark text for white background
        backdropFilter: 'blur(12px)',
        borderRight: '1px solid rgba(0, 0, 0, 0.1)',
      },
    }}
  >
    <Box sx={{ p: 2, textAlign: 'center', borderBottom: `1px solid ${theme.palette.divider}` }}>
      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{ fontFamily: theme.typography.fontFamily, color: '#111' }}
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
                backgroundColor: isActive ? theme.palette.primary.light : 'transparent',
                color: isActive ? '#000' : '#333',
                '&:hover': {
                  backgroundColor: theme.palette.primary.light,
                  color: '#000',
                },
                transition: 'all 0.3s ease',
                borderRadius: 1,
                mx: 1,
                my: 0.5,
              }}
            >
              <ListItemIcon
                sx={{
                  color: isActive ? '#000' : '#555',
                  minWidth: 36,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: isActive ? 'bold' : 'medium',
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
