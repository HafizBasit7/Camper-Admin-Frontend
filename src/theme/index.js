import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#FF9B00',
      light: '#ffb133',
      verylight: '#E9ECEF',
      lightgray: '#F5F5F5',
      orange: '#F09637',
      orange2: '#F69800',
      blue: '#385DFF',
    },
    secondary: {
      main: '#888888',
      light: '#a6a6a6',
      dark: '#666666',
      contrastText: '#fff',
    },
    text: {
      primary: '#000000',
      secondary: '#888888',
      orange: '#F09637',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    black: {
      main: '#000000',
      light: '#333333',
      dark: '#000000',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          padding: '8px 16px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 4,
          },
        },
      },
    },
  },
})

export default theme
