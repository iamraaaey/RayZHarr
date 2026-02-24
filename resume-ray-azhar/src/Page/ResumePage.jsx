import {
    Box,
    Typography,
    Stack,
    Avatar,
    Chip,
    Divider,
    Button,
    IconButton,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
    Email as EmailIcon,
    Phone as PhoneIcon,
    LinkedIn as LinkedInIcon,
    GitHub as GitHubIcon,
    LocationOn as LocationIcon,
    Download as DownloadIcon,
    ArrowBack as ArrowBackIcon,
    Print as PrintIcon,
    LightMode as LightModeIcon,
    DarkMode as DarkModeIcon,
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import Experience from '../Components/Experience';
import SkillsSection from '../Components/SkillsSection';
import MainLayout from '../Layout/MainLayout';
import { persons } from '../data/persons';
import { useThemeMode } from '../Context/ThemeContext';

const NAV_LINKS = ['Experience', 'Education', 'Skills', 'Contact'];

function ResumePage() {
    const navigate = useNavigate();
    const { personId } = useParams();
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';
    const { toggleMode } = useThemeMode();

    // Resolve person from URL param, fall back to raynold
    const person = persons[personId] || persons.raynold;
    const { accentColor, secondaryColor } = person;

    const scrollTo = (id) => {
        const el = document.getElementById(id.toLowerCase());
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <MainLayout accentColor={accentColor} secondaryColor={secondaryColor}>
            {/* ── Top Nav ── */}
            <Box
                component="nav"
                className="no-print"
                sx={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 100,
                    backdropFilter: 'blur(20px)',
                    backgroundColor: isDark ? 'rgba(10,10,15,0.88)' : 'rgba(255,255,255,0.88)',
                    borderBottom: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.08)',
                    px: { xs: 2, md: 6 },
                    py: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 1,
                }}
            >
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/')}
                    size="small"
                    sx={{
                        color: 'text.secondary',
                        textTransform: 'none',
                        '&:hover': { color: accentColor },
                    }}
                >
                    Back
                </Button>

                <Stack direction="row" spacing={0.5} flexWrap="wrap" justifyContent="center">
                    {NAV_LINKS.map((link) => (
                        <Button
                            key={link}
                            size="small"
                            onClick={() => scrollTo(link)}
                            sx={{
                                color: 'text.secondary',
                                textTransform: 'none',
                                fontSize: '0.85rem',
                                borderRadius: 2,
                                '&:hover': { color: accentColor, bgcolor: `${accentColor}18` },
                            }}
                        >
                            {link}
                        </Button>
                    ))}
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">
                    <IconButton onClick={toggleMode} size="small" sx={{ color: 'text.secondary' }}>
                        {isDark ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
                    </IconButton>
                    <Button
                        variant="outlined"
                        startIcon={<PrintIcon />}
                        size="small"
                        onClick={() => window.print()}
                        sx={{
                            borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
                            color: 'text.secondary',
                            textTransform: 'none',
                            borderRadius: 2,
                            fontSize: '0.82rem',
                            '&:hover': {
                                borderColor: accentColor,
                                color: accentColor,
                                bgcolor: `${accentColor}12`,
                            },
                        }}
                    >
                        Print
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<DownloadIcon />}
                        size="small"
                        href={person.cvFile}
                        download
                        sx={{
                            borderColor: `${accentColor}55`,
                            color: accentColor,
                            textTransform: 'none',
                            borderRadius: 2,
                            fontSize: '0.82rem',
                            '&:hover': {
                                borderColor: accentColor,
                                bgcolor: `${accentColor}12`,
                            },
                        }}
                    >
                        Resume PDF
                    </Button>
                </Stack>
            </Box>

            {/* ── Hero / Profile ── */}
            <Box
                id="profile"
                sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    pt: { xs: 6, md: 8 },
                    pb: 8,
                    px: { xs: 2, sm: 4, md: 8 },
                    textAlign: 'center',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        inset: 0,
                        background: `radial-gradient(ellipse at 50% 0%, ${accentColor}20 0%, transparent 65%)`,
                        pointerEvents: 'none',
                    },
                }}
            >
                {/* Profile Photo */}
                <Box
                    sx={{
                        position: 'relative',
                        display: 'inline-block',
                        mb: 3,
                        animation: 'float 5s ease-in-out infinite',
                    }}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            inset: -4,
                            borderRadius: '50%',
                            background: `linear-gradient(135deg, ${accentColor}, ${secondaryColor})`,
                            filter: 'blur(4px)',
                            opacity: 0.7,
                            animation: 'gradientShift 4s ease infinite',
                            backgroundSize: '200% 200%',
                        }}
                    />
                    <Avatar
                        src={person.photo}
                        alt={person.name}
                        sx={{
                            width: { xs: 120, md: 150 },
                            height: { xs: 120, md: 150 },
                            border: isDark ? '3px solid rgba(255,255,255,0.15)' : '3px solid rgba(0,0,0,0.1)',
                            position: 'relative',
                            zIndex: 1,
                            fontSize: '3rem',
                            bgcolor: accentColor,
                        }}
                    >
                        {person.initials}
                    </Avatar>
                </Box>

                {/* Name & Title */}
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 800,
                        background: isDark
                            ? `linear-gradient(135deg, #f1f5f9, ${accentColor}, ${secondaryColor})`
                            : `linear-gradient(135deg, #1e293b, ${accentColor}, ${secondaryColor})`,
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontSize: { xs: '1.8rem', sm: '2.4rem', md: '2.8rem' },
                        mb: 1,
                        lineHeight: 1.2,
                    }}
                >
                    {person.name}
                </Typography>

                <Typography
                    sx={{
                        fontSize: { xs: '0.95rem', md: '1.15rem' },
                        color: 'text.secondary',
                        fontWeight: 400,
                        mb: 1,
                    }}
                >
                    {person.role}&nbsp;|&nbsp;
                    <Box component="span" sx={{ color: accentColor, fontWeight: 600 }}>
                        {person.title}
                    </Box>
                </Typography>

                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={0.5}
                    sx={{ mb: 3 }}
                >
                    <LocationIcon sx={{ fontSize: '1rem', color: 'text.disabled' }} />
                    <Typography sx={{ color: 'text.disabled', fontSize: '0.9rem' }}>
                        {person.location}
                    </Typography>
                </Stack>

                {/* Bio */}
                <Typography
                    sx={{
                        maxWidth: 640,
                        mx: 'auto',
                        color: 'text.secondary',
                        fontSize: '0.95rem',
                        lineHeight: 1.8,
                        mb: 3,
                    }}
                >
                    {person.bio}
                </Typography>

                {/* Contact chips */}
                <Stack direction="row" flexWrap="wrap" justifyContent="center" gap={1.5} sx={{ mb: 3 }}>
                    {[
                        { icon: <EmailIcon fontSize="small" />, label: person.email, href: `mailto:${person.email}` },
                        { icon: <PhoneIcon fontSize="small" />, label: person.phone, href: `tel:${person.phone.replace(/\s/g, '')}` },
                        { icon: <LinkedInIcon fontSize="small" />, label: person.linkedinLabel, href: person.linkedin },
                        { icon: <GitHubIcon fontSize="small" />, label: person.githubLabel, href: person.github },
                    ].map((c) => (
                        <Chip
                            key={c.label}
                            icon={c.icon}
                            label={c.label}
                            component="a"
                            href={c.href}
                            target={c.href.startsWith('http') ? '_blank' : undefined}
                            clickable
                            size="small"
                            sx={{
                                bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                                color: 'text.primary',
                                border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
                                '& .MuiChip-icon': { color: accentColor },
                                '&:hover': {
                                    bgcolor: `${accentColor}18`,
                                    borderColor: `${accentColor}44`,
                                    color: 'text.primary',
                                },
                                px: 0.5,
                                fontSize: '0.8rem',
                            }}
                        />
                    ))}
                </Stack>
            </Box>

            {/* ── Divider ── */}
            <Divider sx={{ mx: { xs: 2, md: 8 }, borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)', mb: 6 }} />

            {/* ── Main Content ── */}
            <Box
                sx={{
                    maxWidth: 900,
                    mx: 'auto',
                    px: { xs: 2, sm: 4, md: 6 },
                    pb: 10,
                }}
            >
                <Box id="experience" sx={{ mb: 8 }}>
                    <Experience person={person} />
                </Box>

                <Box id="skills" sx={{ mb: 8 }}>
                    <SkillsSection person={person} />
                </Box>

                {/* ── Contact CTA ── */}
                <Box
                    id="contact"
                    sx={{
                        mt: 6,
                        p: { xs: 3, md: 5 },
                        borderRadius: 4,
                        background: `linear-gradient(135deg, ${accentColor}10, ${secondaryColor}08)`,
                        border: `1px solid ${accentColor}25`,
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary', mb: 1.5 }}>
                        Let's Work Together
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', mb: 3, fontSize: '0.95rem', lineHeight: 1.8 }}>
                        I'm always open to exciting opportunities, internships, and collaborations.
                        Feel free to reach out!
                    </Typography>
                    <Stack direction="row" justifyContent="center" spacing={2} flexWrap="wrap" gap={1}>
                        <Button
                            variant="contained"
                            startIcon={<EmailIcon />}
                            href={`mailto:${person.email}`}
                            sx={{
                                bgcolor: accentColor,
                                borderRadius: 3,
                                textTransform: 'none',
                                fontWeight: 600,
                                px: 3,
                                '&:hover': { bgcolor: secondaryColor },
                            }}
                        >
                            Send Email
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<LinkedInIcon />}
                            href={person.linkedin}
                            target="_blank"
                            sx={{
                                borderColor: `${secondaryColor}60`,
                                color: secondaryColor,
                                borderRadius: 3,
                                textTransform: 'none',
                                fontWeight: 600,
                                px: 3,
                                '&:hover': {
                                    borderColor: secondaryColor,
                                    bgcolor: `${secondaryColor}12`,
                                },
                            }}
                        >
                            LinkedIn
                        </Button>
                    </Stack>
                </Box>
            </Box>

            {/* ── Footer ── */}
            <Box
                component="footer"
                className="no-print"
                sx={{
                    textAlign: 'center',
                    py: 3,
                    borderTop: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.08)',
                    color: 'text.secondary',
                    fontSize: '0.8rem',
                }}
            >
                © 2026 {person.name} | Built with React & MUI
            </Box>
        </MainLayout>
    );
}

export default ResumePage;
