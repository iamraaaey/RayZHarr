import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary:   { main: '#6366f1', light: '#818cf8', dark: '#4f46e5' },
    secondary: { main: '#06b6d4' },
    warning:   { main: '#f59e0b' },
    background: { default: '#0a0a0f', paper: '#111118' },
    text: { primary: '#f1f5f9', secondary: '#94a3b8' },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: { fontWeight: 800 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: '#0a0a0f', color: '#f1f5f9' },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
        },
      },
    },
  },
});

export default theme;
