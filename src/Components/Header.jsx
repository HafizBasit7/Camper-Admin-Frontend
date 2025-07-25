import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AppBar, Toolbar, Typography, Box, Avatar, Menu, MenuItem, IconButton } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout'
import { useLogout  } from '../hooks/mutations'; // adjust path if needed


const Header = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

 const logout = useLogout();


const handleLogout = () => {
    logout(); // Now it is a proper function
  };



  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderBottom: `1px solid ${theme.palette.primary.verylight}`,
        fontFamily: theme.typography.fontFamily,
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Title */}
        <Typography variant="h6" fontWeight="bold">
          {t('header.title')}
        </Typography>

        {/* Right Section */}
        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="body1">{t('header.admin')}</Typography>
          <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
            <Avatar alt="Admin Avatar" src="/assets/avatar.png" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleLogout}   sx={{ color: theme.palette.error.main }}>
              <LogoutIcon sx={{ mr: 1 }} />
              {t('header.logout')}
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
