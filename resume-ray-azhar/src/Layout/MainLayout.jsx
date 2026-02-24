import { Box } from '@mui/material';

function MainLayout({ children, accentColor = '#6366f1', secondaryColor = '#06b6d4' }) {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: '#0a0a0f',
                backgroundImage: `
                  radial-gradient(ellipse at 20% 20%, ${accentColor}0d 0%, transparent 50%),
                  radial-gradient(ellipse at 80% 80%, ${secondaryColor}08 0%, transparent 50%)
                `,
            }}
        >
            {children}
        </Box>
    );
}

export default MainLayout;
