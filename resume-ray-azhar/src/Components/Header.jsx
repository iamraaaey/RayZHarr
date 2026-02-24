import { Box, Stack, Typography } from '@mui/material';

// ─── SECTION HEADER COMPONENT ───────────────────────────────────────────────
function SectionHeader({ icon, title, color = '#6366f1' }) {
  return (
    <Stack
      direction="column"
      alignItems="center"
      spacing={2}
      sx={{ width: '100%', mb: 4 }}
    >
      {/* Icon + Title row */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={1.5}
        sx={{ flexWrap: 'wrap', justifyContent: 'center' }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: { xs: 36, sm: 40 },
            height: { xs: 36, sm: 40 },
            borderRadius: 2,
            background: `linear-gradient(135deg, ${color}33, ${color}1a)`,
            border: `1px solid ${color}44`,
            color: color,
            transition: 'transform 0.2s',
            '&:hover': { transform: 'scale(1.05)' },
          }}
        >
          {icon}
        </Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: '#f1f5f9',
            fontSize: { xs: '1.1rem', sm: '1.25rem' },
            textAlign: 'center',
          }}
        >
          {title}
        </Typography>
      </Stack>

      {/* Centered decorative line */}
      <Box
        sx={{
          width: { xs: '120px', sm: '200px', md: '300px' },
          height: '3px',
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          borderRadius: '2px',
          animation: 'pulseGlow 2s infinite ease-in-out',
        }}
      />
    </Stack>
  );
}

export default SectionHeader;
