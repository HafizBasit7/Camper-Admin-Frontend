import React from 'react'
import { AppBar, Toolbar, Typography, Box, Avatar } from '@mui/material'

const Header = () => {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: '#fff',
        color: '#333',
        borderBottom: '1px solid #e0e0e0',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Title */}
        <Typography variant="h6" fontWeight="bold">
          Camper Dooley Admin
        </Typography>

        {/* Avatar or future profile menu */}
        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="body1">Admin</Typography>
          <Avatar alt="Admin Avatar" src="/assets/avatar.png" />
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
