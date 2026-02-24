import { Box, Typography, Stack, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
    Work as WorkIcon,
    LocationOn as LocationIcon,
    CalendarMonth as CalendarIcon,
} from '@mui/icons-material';
import SectionHeader from './Header';

function Experience({ person }) {
    const { experiences, accentColor = '#6366f1' } = person;
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    return (
        <Box id="experience">
            <SectionHeader
                icon={<WorkIcon fontSize="small" />}
                title="Experience"
                color={accentColor}
            />

            <Stack spacing={3}>
                {experiences.map((exp) => (
                    <Box
                        key={exp.company}
                        sx={{
                            p: { xs: 2, sm: 3 },
                            borderRadius: 3,
                            background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                            border: `1px solid ${exp.color}22`,
                            borderLeft: `3px solid ${exp.color}`,
                            transition: 'border-color 0.3s, transform 0.2s',
                            '&:hover': {
                                borderColor: `${exp.color}55`,
                                transform: 'translateY(-2px)',
                            },
                        }}
                    >
                        <Typography sx={{ fontWeight: 700, color: 'text.primary', fontSize: '1rem', mb: 0.5 }}>
                            {exp.role}
                        </Typography>

                        <Typography sx={{ fontWeight: 600, color: exp.color, fontSize: '0.9rem', mb: 1 }}>
                            {exp.company}
                        </Typography>

                        <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ mb: 1.5 }}>
                            <Stack direction="row" spacing={0.5} alignItems="center">
                                <CalendarIcon sx={{ fontSize: '0.9rem', color: 'text.disabled' }} />
                                <Typography sx={{ fontSize: '0.82rem', color: 'text.secondary' }}>
                                    {exp.period}
                                </Typography>
                            </Stack>
                            <Stack direction="row" spacing={0.5} alignItems="center">
                                <LocationIcon sx={{ fontSize: '0.9rem', color: 'text.disabled' }} />
                                <Typography sx={{ fontSize: '0.82rem', color: 'text.secondary' }}>
                                    {exp.location}
                                </Typography>
                            </Stack>
                        </Stack>

                        <Box component="ul" sx={{ pl: 2, m: 0, mb: 2 }}>
                            {exp.highlights.map((item) => (
                                <Box
                                    component="li"
                                    key={item}
                                    sx={{ color: 'text.primary', fontSize: '0.85rem', lineHeight: 1.8 }}
                                >
                                    {item}
                                </Box>
                            ))}
                        </Box>

                        {exp.tags && (
                            <Stack direction="row" flexWrap="wrap" gap={1}>
                                {exp.tags.map((tag) => (
                                    <Chip
                                        key={tag}
                                        label={tag}
                                        size="small"
                                        sx={{
                                            background: `${exp.color}20`,
                                            color: 'text.primary',
                                            border: `1px solid ${exp.color}35`,
                                            fontSize: '0.75rem',
                                        }}
                                    />
                                ))}
                            </Stack>
                        )}
                    </Box>
                ))}
            </Stack>
        </Box>
    );
}

export default Experience;
