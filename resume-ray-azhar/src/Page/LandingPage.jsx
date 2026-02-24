import { Box, Typography, Button, Stack, Chip, Avatar } from '@mui/material';
import {
    ArrowForward as ArrowIcon,
    Code as CodeIcon,
    Smartphone as MobileIcon,
    Storage as DataIcon,
    Star as StarIcon,
    Email as EmailIcon,
    GitHub as GitHubIcon,
    LinkedIn as LinkedInIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout';
import { personList } from '../data/persons';

// fallback icon resolver
function HighlightIcon({ label }) {
    const icons = {
        'Web Development': <CodeIcon fontSize="inherit" />,
        'Mobile Apps': <MobileIcon fontSize="inherit" />,
        'Data & Backend': <DataIcon fontSize="inherit" />,
        'UI/UX Design': <StarIcon fontSize="inherit" />,
        'Back-End Dev': <DataIcon fontSize="inherit" />,
        'Cloud & DevOps': <DataIcon fontSize="inherit" />,
        'Data Engineering': <DataIcon fontSize="inherit" />,
        'API Design': <CodeIcon fontSize="inherit" />,
    };
    return icons[label] || <StarIcon fontSize="inherit" />;
}

function PersonCard({ person }) {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                position: 'relative',
                flex: '1 1 340px',
                maxWidth: { xs: '100%', md: 480 },
                p: { xs: 3, sm: 4 },
                borderRadius: 4,
                background: `linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)`,
                border: `1px solid ${person.accentColor}30`,
                backdropFilter: 'blur(10px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: 2,
                transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                cursor: 'default',
                '&:hover': {
                    transform: 'translateY(-8px)',
                    borderColor: `${person.accentColor}70`,
                    boxShadow: `0 24px 60px ${person.accentColor}20`,
                },
                // Top accent line
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '60%',
                    height: '2px',
                    background: `linear-gradient(90deg, transparent, ${person.accentColor}, transparent)`,
                    borderRadius: '2px',
                },
            }}
        >
            {/* Avatar with glow ring */}
            <Box sx={{ position: 'relative', display: 'inline-block', mt: 1 }}>
                <Box
                    sx={{
                        position: 'absolute',
                        inset: -5,
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${person.accentColor}, ${person.secondaryColor})`,
                        filter: 'blur(8px)',
                        opacity: 0.55,
                    }}
                />
                <Avatar
                    src={person.photo}
                    alt={person.name}
                    sx={{
                        width: { xs: 100, sm: 120 },
                        height: { xs: 100, sm: 120 },
                        border: '3px solid rgba(255,255,255,0.12)',
                        position: 'relative',
                        zIndex: 1,
                        fontSize: '2.2rem',
                        bgcolor: person.accentColor,
                    }}
                >
                    {person.initials}
                </Avatar>
            </Box>

            {/* Name & role */}
            <Box>
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 800,
                        fontSize: { xs: '1.3rem', sm: '1.5rem' },
                        background: `linear-gradient(135deg, #f1f5f9, ${person.accentColor})`,
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        lineHeight: 1.2,
                        mb: 0.5,
                    }}
                >
                    {person.name}
                </Typography>
                <Typography sx={{ color: '#94a3b8', fontSize: '0.88rem', mb: 0.5 }}>
                    {person.role}
                </Typography>
                <Typography
                    sx={{
                        fontSize: '0.82rem',
                        color: person.accentColor,
                        fontWeight: 600,
                    }}
                >
                    {person.title}
                </Typography>
            </Box>

            {/* Bio */}
            <Typography
                sx={{
                    color: '#64748b',
                    fontSize: { xs: '0.82rem', sm: '0.85rem' },
                    lineHeight: 1.7,
                    maxWidth: 360,
                }}
            >
                {person.bio.slice(0, 140)}…
            </Typography>

            {/* Highlight chips */}
            <Stack direction="row" flexWrap="wrap" justifyContent="center" gap={1}>
                {person.highlights.map((h) => (
                    <Chip
                        key={h.label}
                        icon={
                            <Box sx={{ color: `${h.color} !important`, fontSize: '0.9rem', display: 'flex' }}>
                                <HighlightIcon label={h.label} />
                            </Box>
                        }
                        label={h.label}
                        size="small"
                        sx={{
                            bgcolor: `${h.color}14`,
                            color: '#cbd5e1',
                            border: `1px solid ${h.color}30`,
                            fontSize: '0.76rem',
                        }}
                    />
                ))}
            </Stack>

            {/* Stats row */}
            <Stack
                direction="row"
                justifyContent="center"
                flexWrap="wrap"
                gap={1.5}
                sx={{ width: '100%' }}
            >
                {person.stats.map((s) => (
                    <Box
                        key={s.label}
                        sx={{
                            textAlign: 'center',
                            px: 1.5,
                            py: 1,
                            borderRadius: 2,
                            bgcolor: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.06)',
                            minWidth: 60,
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '1.15rem',
                                fontWeight: 800,
                                background: `linear-gradient(135deg, ${person.accentColor}, ${person.secondaryColor})`,
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                lineHeight: 1.1,
                            }}
                        >
                            {s.value}
                        </Typography>
                        <Typography sx={{ color: '#475569', fontSize: '0.68rem', mt: 0.2 }}>
                            {s.label}
                        </Typography>
                    </Box>
                ))}
            </Stack>

            {/* Quick contact */}
            <Stack direction="row" spacing={1}>
                <Box
                    component="a"
                    href={`mailto:${person.email}`}
                    sx={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        width: 34, height: 34, borderRadius: 2,
                        color: '#94a3b8', bgcolor: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        transition: 'all 0.2s',
                        '&:hover': { color: person.accentColor, borderColor: `${person.accentColor}50`, bgcolor: `${person.accentColor}12` },
                    }}
                >
                    <EmailIcon sx={{ fontSize: '1rem' }} />
                </Box>
                <Box
                    component="a"
                    href={person.github}
                    target="_blank"
                    sx={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        width: 34, height: 34, borderRadius: 2,
                        color: '#94a3b8', bgcolor: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        transition: 'all 0.2s',
                        '&:hover': { color: person.accentColor, borderColor: `${person.accentColor}50`, bgcolor: `${person.accentColor}12` },
                    }}
                >
                    <GitHubIcon sx={{ fontSize: '1rem' }} />
                </Box>
                <Box
                    component="a"
                    href={person.linkedin}
                    target="_blank"
                    sx={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        width: 34, height: 34, borderRadius: 2,
                        color: '#94a3b8', bgcolor: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        transition: 'all 0.2s',
                        '&:hover': { color: person.accentColor, borderColor: `${person.accentColor}50`, bgcolor: `${person.accentColor}12` },
                    }}
                >
                    <LinkedInIcon sx={{ fontSize: '1rem' }} />
                </Box>
            </Stack>

            {/* CTA */}
            <Button
                variant="contained"
                endIcon={<ArrowIcon />}
                onClick={() => navigate(`/resume/${person.id}`)}
                fullWidth
                sx={{
                    background: `linear-gradient(135deg, ${person.accentColor}, ${person.secondaryColor})`,
                    borderRadius: 3,
                    textTransform: 'none',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    py: 1.3,
                    mt: 'auto',
                    boxShadow: `0 8px 24px ${person.accentColor}30`,
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                        background: `linear-gradient(135deg, ${person.secondaryColor}, ${person.accentColor})`,
                        transform: 'translateY(-2px)',
                        boxShadow: `0 12px 32px ${person.accentColor}50`,
                    },
                }}
            >
                View Resume
            </Button>
        </Box>
    );
}

function LandingPage() {
    return (
        <MainLayout>
            {/* ── Hero ── */}
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    px: { xs: 2, sm: 4, md: 6 },
                    py: { xs: 6, md: 8 },
                    position: 'relative',
                    overflow: 'hidden',
                    textAlign: 'center',
                }}
            >
                {/* Background orbs */}
                <Box sx={{ position: 'absolute', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)', top: '-20%', left: '-15%', pointerEvents: 'none' }} />
                <Box sx={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)', bottom: '-15%', right: '-10%', pointerEvents: 'none' }} />
                <Box sx={{ position: 'absolute', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)', top: '45%', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none' }} />

                {/* Badge */}
                <Chip
                    label="👋 Welcome to our portfolio"
                    size="small"
                    sx={{
                        bgcolor: 'rgba(99,102,241,0.12)',
                        color: '#a5b4fc',
                        border: '1px solid rgba(99,102,241,0.25)',
                        mb: 3,
                        px: 1,
                        fontSize: '0.85rem',
                        animation: 'fadeInUp 0.5s ease-out',
                    }}
                />

                {/* Headline */}
                <Typography
                    variant="h1"
                    sx={{
                        fontWeight: 900,
                        fontSize: { xs: '2rem', sm: '2.8rem', md: '3.6rem' },
                        lineHeight: 1.1,
                        mb: 1.5,
                        animation: 'fadeInUp 0.6s ease-out',
                        background: 'linear-gradient(135deg, #f1f5f9 30%, #818cf8 65%, #06b6d4 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    Software Engineering
                    <br />
                    Interns 2026
                </Typography>

                <Typography
                    sx={{
                        fontSize: { xs: '0.95rem', md: '1.1rem' },
                        color: '#64748b',
                        mb: { xs: 5, md: 6 },
                        animation: 'fadeInUp 0.7s ease-out',
                        maxWidth: 500,
                    }}
                >
                    Meet the team — select a profile to explore a full interactive resume.
                </Typography>

                {/* Person Cards */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: { xs: 3, md: 4 },
                        width: '100%',
                        maxWidth: 1040,
                        justifyContent: 'center',
                        alignItems: { xs: 'center', md: 'stretch' },
                        animation: 'fadeInUp 0.8s ease-out',
                    }}
                >
                    {personList.map((person) => (
                        <PersonCard key={person.id} person={person} />
                    ))}
                </Box>
            </Box>

            {/* Footer */}
            <Box
                component="footer"
                sx={{
                    textAlign: 'center',
                    py: 2.5,
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                    color: '#475569',
                    fontSize: '0.78rem',
                }}
            >
                © 2026 Raynold anak Kabai & Harry Sulaiman — CS Undergraduates @ UNIMAS
            </Box>
        </MainLayout>
    );
}

function StorageIcon(props) { return <DataIcon {...props} />; }

export default LandingPage;
