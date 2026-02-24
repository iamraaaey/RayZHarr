import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function MainLayout({ children, accentColor = '#6366f1', secondaryColor = '#06b6d4' }) {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: 'background.default',
                backgroundImage: isDark
                    ? `
                      radial-gradient(ellipse at 20% 20%, ${accentColor}0d 0%, transparent 50%),
                      radial-gradient(ellipse at 80% 80%, ${secondaryColor}08 0%, transparent 50%)
                    `
                    : `
                      radial-gradient(ellipse at 20% 20%, ${accentColor}08 0%, transparent 50%),
                      radial-gradient(ellipse at 80% 80%, ${secondaryColor}05 0%, transparent 50%)
                    `,
            }}
        >
            {children}
        </Box>
    );
}

export default MainLayout;
