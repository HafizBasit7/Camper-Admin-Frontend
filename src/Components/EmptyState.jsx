import React from 'react';
import { Box, Typography, SvgIcon } from '@mui/material';

// Empty box icon SVG
const EmptyBoxIcon = (props) => {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path 
        d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" 
        stroke="currentColor" 
        strokeWidth="2" 
        fill="none" 
      />
      <path 
        d="M3 7L12 13L21 7" 
        stroke="currentColor" 
        strokeWidth="2" 
        fill="none" 
      />
      <path 
        d="M12 13V19" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeDasharray="2 2" 
      />
    </SvgIcon>
  );
};

const EmptyState = ({ message, subMessage }) => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        py: 6,
        px: 2
      }}
    >
      <EmptyBoxIcon 
        sx={{ 
          fontSize: 64, 
          color: 'grey.300', 
          mb: 2 
        }} 
      />
      <Typography 
        variant="h6" 
        component="div" 
        sx={{ fontWeight: 500, mb: 1 }}
      >
        {message || 'No data found'}
      </Typography>
      {subMessage && (
        <Typography 
          variant="body2" 
          color="text.secondary" 
          align="center"
        >
          {subMessage}
        </Typography>
      )}
    </Box>
  );
};

export default EmptyState;