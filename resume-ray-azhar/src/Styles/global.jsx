import { createTheme } from '@mui/material/styles';

const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary:   { main: '#6366f1', light: '#818cf8', dark: '#4f46e5' },
      secondary: { main: '#06b6d4' },
      warning:   { main: '#f59e0b' },
      background: {
        default: mode === 'dark' ? '#0a0a0f' : '#f8fafc',
        paper:   mode === 'dark' ? '#111118' : '#ffffff',
      },
      text: {
        primary:   mode === 'dark' ? '#f1f5f9' : '#1e293b',
        secondary: mode === 'dark' ? '#94a3b8' : '#64748b',
      },
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
          body: {
            backgroundColor: mode === 'dark' ? '#0a0a0f' : '#f8fafc',
            color: mode === 'dark' ? '#f1f5f9' : '#1e293b',
          },
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

export default getTheme;
