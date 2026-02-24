import {
    Box,
    Typography,
    Stack,
    Chip,
    LinearProgress,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
    Code as CodeIcon,
    Terminal as TerminalIcon,
    Storage as StorageIcon,
    DesignServices as DesignIcon,
    Build as BuildIcon,
} from '@mui/icons-material';
import SectionHeader from './Header';

// Map category labels to icons
const categoryIcons = {
    'Programming Languages': <CodeIcon fontSize="small" />,
    'Web & Mobile': <TerminalIcon fontSize="small" />,
    'Databases & Tools': <StorageIcon fontSize="small" />,
    'Design & AI': <DesignIcon fontSize="small" />,
    'Back-End & Cloud': <StorageIcon fontSize="small" />,
    'Tools & DevOps': <BuildIcon fontSize="small" />,
    'Data & AI': <DesignIcon fontSize="small" />,
};

function SkillBar({ name, level, color }) {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    return (
        <Box sx={{ mb: 1.8 }}>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                <Typography sx={{ fontSize: '0.85rem', color: 'text.primary', fontWeight: 500 }}>
                    {name}
                </Typography>
                <Typography sx={{ fontSize: '0.78rem', color: color, fontWeight: 600 }}>
                    {level}%
                </Typography>
            </Stack>
            <LinearProgress
                variant="determinate"
                value={level}
                sx={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
                    '& .MuiLinearProgress-bar': {
                        borderRadius: 3,
                        background: `linear-gradient(90deg, ${color}99, ${color})`,
                    },
                }}
            />
        </Box>
    );
}

function SkillsSection({ person }) {
    const {
        skillCategories,
        softSkills,
        accentColor = '#6366f1',
    } = person;
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    return (
        <Box id="skills">
            <SectionHeader
                icon={<BuildIcon fontSize="small" />}
                title="Skills & Technologies"
                color={accentColor}
            />

            {/* Technical Skills */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                    gap: 3,
                    mb: 4,
                }}
            >
                {skillCategories.map((cat) => (
                    <Box
                        key={cat.label}
                        sx={{
                            p: { xs: 2, sm: 3 },
                            borderRadius: 3,
                            background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                            border: `1px solid ${cat.color}22`,
                            transition: 'border-color 0.3s, transform 0.2s',
                            '&:hover': {
                                borderColor: `${cat.color}55`,
                                transform: 'translateY(-2px)',
                            },
                        }}
                    >
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                            <Box sx={{ color: cat.color }}>
                                {categoryIcons[cat.label] || <CodeIcon fontSize="small" />}
                            </Box>
                            <Typography sx={{ fontWeight: 600, color: cat.color, fontSize: '0.9rem' }}>
                                {cat.label}
                            </Typography>
                        </Stack>
                        {cat.skills.map((s) => (
                            <SkillBar key={s.name} name={s.name} level={s.level} color={cat.color} />
                        ))}
                    </Box>
                ))}
            </Box>

            {/* Soft Skills */}
            <Box
                sx={{
                    p: { xs: 2, sm: 3 },
                    borderRadius: 3,
                    background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                    border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)',
                }}
            >
                <Typography sx={{ fontWeight: 600, color: 'text.secondary', mb: 2, fontSize: '0.9rem' }}>
                    Soft Skills
                </Typography>
                <Stack direction="row" flexWrap="wrap" gap={1}>
                    {softSkills.map((skill) => (
                        <Chip
                            key={skill}
                            label={skill}
                            size="small"
                            sx={{
                                background: `${accentColor}20`,
                                color: isDark ? '#a5b4fc' : accentColor,
                                border: `1px solid ${accentColor}35`,
                                fontSize: '0.78rem',
                                '&:hover': {
                                    background: `${accentColor}35`,
                                },
                            }}
                        />
                    ))}
                </Stack>
            </Box>
        </Box>
    );
}

export default SkillsSection;
