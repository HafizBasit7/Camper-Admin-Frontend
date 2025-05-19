import React from 'react'
import { AppBar, Toolbar, Typography, Box, Avatar } from '@mui/material'
import { useTheme } from '@mui/material/styles'

const Header = () => {
  const theme = useTheme()

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
          Camper Dooley Admin
        </Typography>

        {/* Right Section */}
        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="body1">Admin</Typography>
          <Avatar alt="Admin Avatar" src="/assets/avatar.png" />
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
