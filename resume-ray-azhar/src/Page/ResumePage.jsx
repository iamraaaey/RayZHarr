import {
    Box,
    Typography,
    Stack,
    Avatar,
    Chip,
    Divider,
    Button,
    Grid,
} from '@mui/material';
import {
    Email as EmailIcon,
    Phone as PhoneIcon,
    LinkedIn as LinkedInIcon,
    GitHub as GitHubIcon,
    LocationOn as LocationIcon,
    Download as DownloadIcon,
    ArrowBack as ArrowBackIcon,
    Print as PrintIcon,
    Work as WorkIcon,
    School as SchoolIcon,
    EmojiEvents as AchievementIcon,
    Build as SkillIcon,
    Person as PersonIcon,
    FormatQuote as QuoteIcon,
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { persons } from '../data/persons';
import MainLayout from '../Layout/MainLayout';

// ─── Shared references for all persons ───────────────────────────────────────
const REFERENCES = [
    {
        name: 'Profesor Madya Dr. Chai Soo See',
        role: 'Academic Advisor, UNIMAS',
        email: 'sschai@unimas.my',
        phone: '+6082-583637',
    },
    {
        name: 'Ts. Nurfauza bt Jali',
        role: 'Industry Coordinator, UNIMAS',
        email: 'jnurfauza@unimas.my',
        phone: '+6082-583814',
    },
];

const NAV_LINKS = ['Experience', 'Education', 'Skills', 'Achievements', 'References', 'Contact'];

// ─── Section Title ─────────────────────────────────────────────────────────────
function SectionTitle({ icon, title, accentColor }) {
    return (
        <Box sx={{ mb: 2.5 }}>
            <Stack direction="row" alignItems="center" spacing={1.2} sx={{ mb: 0.8 }}>
                <Box sx={{ color: accentColor, display: 'flex', alignItems: 'center' }}>
                    {icon}
                </Box>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 800,
                        fontSize: { xs: '1rem', sm: '1.1rem' },
                        color: '#f1f5f9',
                        textTransform: 'uppercase',
                        letterSpacing: 1.5,
                    }}
                >
                    {title}
                </Typography>
            </Stack>
            <Box
                sx={{
                    height: '1px',
                    background: `linear-gradient(90deg, ${accentColor}80, transparent)`,
                    borderRadius: 1,
                }}
            />
        </Box>
    );
}

// ─── Resume Page ──────────────────────────────────────────────────────────────
function ResumePage() {
    const navigate = useNavigate();
    const { personId } = useParams();
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
                    position: 'sticky', top: 0, zIndex: 100,
                    backdropFilter: 'blur(20px)',
                    backgroundColor: 'rgba(10,10,15,0.9)',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    px: { xs: 2, md: 6 }, py: 1.2,
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between', flexWrap: 'wrap', gap: 1,
                }}
            >
                <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')} size="small"
                    sx={{ color: '#94a3b8', textTransform: 'none', '&:hover': { color: accentColor } }}>
                    Back
                </Button>

                <Stack direction="row" spacing={0.5} flexWrap="wrap" justifyContent="center">
                    {NAV_LINKS.map((link) => (
                        <Button key={link} size="small" onClick={() => scrollTo(link)}
                            sx={{ color: '#94a3b8', textTransform: 'none', fontSize: '0.8rem', borderRadius: 2, '&:hover': { color: accentColor, bgcolor: `${accentColor}15` } }}>
                            {link}
                        </Button>
                    ))}
                </Stack>

                <Stack direction="row" spacing={1}>
                    <Button variant="outlined" startIcon={<PrintIcon />} size="small"
                        onClick={() => window.print()}
                        sx={{ borderColor: 'rgba(255,255,255,0.2)', color: '#94a3b8', textTransform: 'none', borderRadius: 2, fontSize: '0.8rem', '&:hover': { borderColor: accentColor, color: accentColor, bgcolor: `${accentColor}12` } }}>
                        Print
                    </Button>
                    <Button variant="outlined" startIcon={<DownloadIcon />} size="small"
                        href={person.cvFile} download
                        sx={{ borderColor: `${accentColor}55`, color: accentColor, textTransform: 'none', borderRadius: 2, fontSize: '0.8rem', '&:hover': { borderColor: accentColor, bgcolor: `${accentColor}12` } }}>
                        PDF
                    </Button>
                </Stack>
            </Box>

            {/* ── Document Body ── */}
            <Box sx={{ maxWidth: 860, mx: 'auto', px: { xs: 2, sm: 4, md: 6 }, py: { xs: 4, md: 6 }, pb: 12 }}>

                {/* ═══════════════════════════════════════════════════════════
                    HEADER / PROFILE
                ═══════════════════════════════════════════════════════════ */}
                <Box
                    id="profile"
                    sx={{
                        display: 'flex',
                        gap: { xs: 3, sm: 4 },
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: { xs: 'center', sm: 'flex-start' },
                        mb: 5,
                        textAlign: { xs: 'center', sm: 'left' },
                    }}
                >
                    {/* Avatar */}
                    <Box sx={{ position: 'relative', flexShrink: 0 }}>
                        <Box sx={{
                            position: 'absolute', inset: -3, borderRadius: '50%',
                            background: `linear-gradient(135deg, ${accentColor}, ${secondaryColor})`,
                            filter: 'blur(6px)', opacity: 0.65,
                        }} />
                        <Avatar
                            src={person.photo} alt={person.name}
                            sx={{ width: { xs: 110, sm: 130 }, height: { xs: 110, sm: 130 }, fontSize: '2.5rem', bgcolor: accentColor, border: '3px solid rgba(255,255,255,0.12)', position: 'relative', zIndex: 1 }}
                        >
                            {person.initials}
                        </Avatar>
                    </Box>

                    {/* Identity */}
                    <Box sx={{ flex: 1 }}>
                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: 900,
                                fontSize: { xs: '1.8rem', sm: '2.3rem' },
                                background: `linear-gradient(135deg, #f1f5f9, ${accentColor})`,
                                backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                                lineHeight: 1.15, mb: 0.4,
                            }}
                        >
                            {person.name}
                        </Typography>

                        <Typography sx={{ color: accentColor, fontWeight: 700, fontSize: '1rem', mb: 0.3 }}>
                            {person.title}
                        </Typography>
                        <Typography sx={{ color: '#94a3b8', fontSize: '0.88rem', mb: 1.5 }}>
                            {person.role} · {person.university}
                        </Typography>

                        {/* Contact details inline */}
                        <Stack
                            direction="row" flexWrap="wrap" gap={1.5}
                            justifyContent={{ xs: 'center', sm: 'flex-start' }}
                            sx={{ mb: 1.5 }}
                        >
                            {[
                                { icon: <LocationIcon sx={{ fontSize: '0.85rem' }} />, text: person.location },
                                { icon: <EmailIcon sx={{ fontSize: '0.85rem' }} />, text: person.email, href: `mailto:${person.email}` },
                                { icon: <PhoneIcon sx={{ fontSize: '0.85rem' }} />, text: person.phone, href: `tel:${person.phone.replace(/\s/g, '')}` },
                            ].map((item, i) => (
                                <Stack key={i} direction="row" alignItems="center" spacing={0.5}
                                    component={item.href ? 'a' : 'div'}
                                    href={item.href}
                                    sx={{ color: '#94a3b8', fontSize: '0.82rem', textDecoration: 'none', '&:hover': item.href ? { color: accentColor } : {} }}>
                                    <Box sx={{ color: '#64748b' }}>{item.icon}</Box>
                                    <Typography sx={{ fontSize: '0.82rem', color: 'inherit' }}>{item.text}</Typography>
                                </Stack>
                            ))}
                        </Stack>

                        <Stack direction="row" flexWrap="wrap" gap={1} justifyContent={{ xs: 'center', sm: 'flex-start' }}>
                            {[
                                { icon: <LinkedInIcon sx={{ fontSize: '0.9rem' }} />, label: person.linkedinLabel, href: person.linkedin },
                                { icon: <GitHubIcon sx={{ fontSize: '0.9rem' }} />, label: person.githubLabel, href: person.github },
                            ].map((item) => (
                                <Chip key={item.label} icon={item.icon} label={item.label}
                                    component="a" href={item.href} target="_blank" clickable size="small"
                                    sx={{ bgcolor: 'rgba(255,255,255,0.05)', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.78rem', '& .MuiChip-icon': { color: accentColor }, '&:hover': { bgcolor: `${accentColor}18`, borderColor: `${accentColor}50` } }}
                                />
                            ))}
                        </Stack>
                    </Box>
                </Box>

                {/* Bio */}
                <Typography sx={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.85, mb: 5, borderLeft: `3px solid ${accentColor}50`, pl: 2 }}>
                    {person.bio}
                </Typography>

                {/* Stats row */}
                <Stack direction="row" flexWrap="wrap" gap={2} sx={{ mb: 6 }}>
                    {person.stats.map((s) => (
                        <Box key={s.label} sx={{ textAlign: 'center', px: 2.5, py: 1.5, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.03)', border: `1px solid ${accentColor}20`, minWidth: 72 }}>
                            <Typography sx={{ fontSize: '1.2rem', fontWeight: 800, background: `linear-gradient(135deg, ${accentColor}, ${secondaryColor})`, backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                {s.value}
                            </Typography>
                            <Typography sx={{ color: '#475569', fontSize: '0.68rem', mt: 0.2 }}>{s.label}</Typography>
                        </Box>
                    ))}
                </Stack>

                <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', mb: 5 }} />

                {/* ═══════════════════════════════════════════════════════════
                    EXPERIENCE
                ═══════════════════════════════════════════════════════════ */}
                <Box id="experience" sx={{ mb: 6 }}>
                    <SectionTitle icon={<WorkIcon fontSize="small" />} title="Experience" accentColor={accentColor} />

                    <Stack spacing={4}>
                        {person.experiences.map((exp) => (
                            <Box key={exp.company}>
                                {/* Role + Company + Period */}
                                <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} gap={0.5} sx={{ mb: 0.5 }}>
                                    <Box>
                                        <Typography sx={{ fontWeight: 800, fontSize: '1rem', color: '#f1f5f9' }}>
                                            {exp.role}
                                        </Typography>
                                        <Typography sx={{ fontWeight: 600, color: exp.color || accentColor, fontSize: '0.88rem' }}>
                                            {exp.company}
                                        </Typography>
                                    </Box>
                                    <Stack direction="row" spacing={1.5} alignItems="center" flexShrink={0}>
                                        <Typography sx={{ fontSize: '0.78rem', color: '#64748b', fontStyle: 'italic' }}>
                                            {exp.period}
                                        </Typography>
                                        <Typography sx={{ fontSize: '0.78rem', color: '#475569' }}>
                                            {exp.location}
                                        </Typography>
                                    </Stack>
                                </Stack>

                                {/* Bullet points */}
                                <Box component="ul" sx={{ pl: 2.5, mt: 1, mb: 1.5, m: 0, listStyle: 'none' }}>
                                    {exp.highlights.map((item, i) => (
                                        <Box component="li" key={i}
                                            sx={{ display: 'flex', alignItems: 'baseline', gap: 1, color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.85, mb: 0.4 }}>
                                            <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: exp.color || accentColor, flexShrink: 0, mt: 0.8 }} />
                                            {item}
                                        </Box>
                                    ))}
                                </Box>

                                {/* Tech tags */}
                                {exp.tags && (
                                    <Stack direction="row" flexWrap="wrap" gap={0.8} sx={{ mt: 1 }}>
                                        {exp.tags.map((tag) => (
                                            <Chip key={tag} label={tag} size="small"
                                                sx={{ bgcolor: `${exp.color || accentColor}18`, color: '#cbd5e1', border: `1px solid ${exp.color || accentColor}30`, fontSize: '0.72rem' }} />
                                        ))}
                                    </Stack>
                                )}
                            </Box>
                        ))}
                    </Stack>
                </Box>

                <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', mb: 5 }} />

                {/* ═══════════════════════════════════════════════════════════
                    EDUCATION
                ═══════════════════════════════════════════════════════════ */}
                <Box id="education" sx={{ mb: 6 }}>
                    <SectionTitle icon={<SchoolIcon fontSize="small" />} title="Education" accentColor={accentColor} />

                    <Stack spacing={4}>
                        {person.education.map((edu, i) => (
                            <Box key={i}>
                                <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} gap={0.5} sx={{ mb: 0.5 }}>
                                    <Box>
                                        <Typography sx={{ fontWeight: 800, fontSize: '1rem', color: '#f1f5f9' }}>
                                            {edu.degree}
                                        </Typography>
                                        <Typography sx={{ fontWeight: 600, color: edu.color || secondaryColor, fontSize: '0.88rem' }}>
                                            {edu.institution}
                                        </Typography>
                                    </Box>
                                    <Stack direction="row" spacing={1.5} alignItems="center" flexShrink={0}>
                                        <Typography sx={{ fontSize: '0.78rem', color: '#64748b', fontStyle: 'italic' }}>
                                            {edu.period}
                                        </Typography>
                                        {edu.gpa && (
                                            <Chip label={`GPA ${edu.gpa}`} size="small"
                                                sx={{ bgcolor: `${edu.color || accentColor}18`, color: edu.color || accentColor, border: `1px solid ${edu.color || accentColor}35`, fontSize: '0.72rem', fontWeight: 700 }} />
                                        )}
                                    </Stack>
                                </Stack>

                                <Box component="ul" sx={{ pl: 0, mt: 1, mb: 0, listStyle: 'none' }}>
                                    {edu.highlights.map((item, j) => (
                                        <Box component="li" key={j}
                                            sx={{ display: 'flex', alignItems: 'baseline', gap: 1, color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.85, mb: 0.3 }}>
                                            <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: edu.color || secondaryColor, flexShrink: 0, mt: 0.8 }} />
                                            {item}
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        ))}
                    </Stack>
                </Box>

                <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', mb: 5 }} />

                {/* ═══════════════════════════════════════════════════════════
                    SKILLS
                ═══════════════════════════════════════════════════════════ */}
                <Box id="skills" sx={{ mb: 6 }}>
                    <SectionTitle icon={<SkillIcon fontSize="small" />} title="Skills & Technologies" accentColor={accentColor} />

                    <Grid container spacing={3} sx={{ mb: 3 }}>
                        {person.skillCategories.map((cat) => (
                            <Grid item xs={12} sm={6} key={cat.label}>
                                <Box>
                                    <Typography sx={{ fontWeight: 700, color: cat.color, fontSize: '0.85rem', mb: 1.2, textTransform: 'uppercase', letterSpacing: 0.8 }}>
                                        {cat.label}
                                    </Typography>
                                    <Stack direction="row" flexWrap="wrap" gap={0.8}>
                                        {cat.skills.map((s) => (
                                            <Box key={s.name}
                                                sx={{
                                                    display: 'flex', alignItems: 'center', gap: 0.8,
                                                    px: 1.2, py: 0.5, borderRadius: 2,
                                                    bgcolor: `${cat.color}12`,
                                                    border: `1px solid ${cat.color}25`,
                                                }}
                                            >
                                                <Typography sx={{ fontSize: '0.8rem', color: '#cbd5e1', fontWeight: 500 }}>
                                                    {s.name}
                                                </Typography>
                                                <Typography sx={{ fontSize: '0.68rem', color: cat.color, fontWeight: 700 }}>
                                                    {s.level}%
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Stack>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>

                    {/* Soft Skills */}
                    <Box>
                        <Typography sx={{ fontWeight: 700, color: '#64748b', fontSize: '0.82rem', mb: 1.2, textTransform: 'uppercase', letterSpacing: 0.8 }}>
                            Soft Skills
                        </Typography>
                        <Stack direction="row" flexWrap="wrap" gap={0.8}>
                            {person.softSkills.map((skill) => (
                                <Chip key={skill} label={skill} size="small"
                                    sx={{ bgcolor: `${accentColor}15`, color: '#a5b4fc', border: `1px solid ${accentColor}30`, fontSize: '0.76rem' }} />
                            ))}
                        </Stack>
                    </Box>
                </Box>

                <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', mb: 5 }} />

                {/* ═══════════════════════════════════════════════════════════
                    ACHIEVEMENTS
                ═══════════════════════════════════════════════════════════ */}
                <Box id="achievements" sx={{ mb: 6 }}>
                    <SectionTitle icon={<AchievementIcon fontSize="small" />} title="Achievements" accentColor={accentColor} />

                    <Stack spacing={2.5}>
                        {person.achievements.map((ach, i) => (
                            <Box key={i}
                                sx={{
                                    display: 'flex', gap: 2, alignItems: 'flex-start',
                                    pl: 0,
                                }}
                            >
                                <Box sx={{
                                    width: 8, height: 8, borderRadius: '50%',
                                    bgcolor: ach.color || accentColor,
                                    flexShrink: 0, mt: 0.7,
                                    boxShadow: `0 0 8px ${ach.color || accentColor}80`,
                                }} />
                                <Box>
                                    <Typography sx={{ fontWeight: 700, color: '#f1f5f9', fontSize: '0.95rem', lineHeight: 1.4 }}>
                                        {ach.title}
                                    </Typography>
                                    <Typography sx={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.7, mt: 0.2 }}>
                                        {ach.desc}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                    </Stack>
                </Box>

                <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', mb: 5 }} />

                {/* ═══════════════════════════════════════════════════════════
                    REFERENCES
                ═══════════════════════════════════════════════════════════ */}
                <Box id="references" sx={{ mb: 6 }}>
                    <SectionTitle icon={<QuoteIcon fontSize="small" />} title="References" accentColor={accentColor} />

                    <Grid container spacing={3}>
                        {REFERENCES.map((ref, i) => (
                            <Grid item xs={12} sm={6} key={i}>
                                <Box
                                    sx={{
                                        p: 2.5,
                                        borderRadius: 3,
                                        bgcolor: 'rgba(255,255,255,0.025)',
                                        border: `1px solid ${accentColor}22`,
                                        borderLeft: `3px solid ${accentColor}`,
                                        height: '100%',
                                    }}
                                >
                                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.2 }}>
                                        <Box sx={{ width: 36, height: 36, borderRadius: '50%', bgcolor: `${accentColor}20`, border: `1px solid ${accentColor}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <PersonIcon sx={{ fontSize: '1rem', color: accentColor }} />
                                        </Box>
                                        <Box>
                                            <Typography sx={{ fontWeight: 700, color: '#f1f5f9', fontSize: '0.92rem', lineHeight: 1.3 }}>
                                                {ref.name}
                                            </Typography>
                                            <Typography sx={{ color: accentColor, fontSize: '0.78rem', fontWeight: 600 }}>
                                                {ref.role}
                                            </Typography>
                                        </Box>
                                    </Stack>

                                    <Stack spacing={0.6} sx={{ pl: 0.5 }}>
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <EmailIcon sx={{ fontSize: '0.82rem', color: '#475569' }} />
                                            <Typography
                                                component="a" href={`mailto:${ref.email}`}
                                                sx={{ fontSize: '0.82rem', color: '#94a3b8', textDecoration: 'none', '&:hover': { color: accentColor } }}
                                            >
                                                {ref.email}
                                            </Typography>
                                        </Stack>
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <PhoneIcon sx={{ fontSize: '0.82rem', color: '#475569' }} />
                                            <Typography
                                                component="a" href={`tel:${ref.phone}`}
                                                sx={{ fontSize: '0.82rem', color: '#94a3b8', textDecoration: 'none', '&:hover': { color: accentColor } }}
                                            >
                                                {ref.phone}
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', mb: 5 }} />

                {/* ═══════════════════════════════════════════════════════════
                    CONTACT CTA
                ═══════════════════════════════════════════════════════════ */}
                <Box
                    id="contact"
                    sx={{
                        p: { xs: 3, md: 4 }, borderRadius: 4,
                        background: `linear-gradient(135deg, ${accentColor}12, ${secondaryColor}08)`,
                        border: `1px solid ${accentColor}28`,
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#f1f5f9', mb: 1 }}>
                        Let's Work Together
                    </Typography>
                    <Typography sx={{ color: '#94a3b8', mb: 3, fontSize: '0.92rem', lineHeight: 1.8, maxWidth: 480, mx: 'auto' }}>
                        I'm always open to exciting opportunities, internships, and collaborations.
                        Feel free to reach out!
                    </Typography>
                    <Stack direction="row" justifyContent="center" spacing={2} flexWrap="wrap" gap={1}>
                        <Button variant="contained" startIcon={<EmailIcon />}
                            href={`mailto:${person.email}`}
                            sx={{ bgcolor: accentColor, borderRadius: 3, textTransform: 'none', fontWeight: 600, px: 3, '&:hover': { bgcolor: secondaryColor } }}>
                            Send Email
                        </Button>
                        <Button variant="outlined" startIcon={<LinkedInIcon />}
                            href={person.linkedin} target="_blank"
                            sx={{ borderColor: `${secondaryColor}60`, color: secondaryColor, borderRadius: 3, textTransform: 'none', fontWeight: 600, px: 3, '&:hover': { borderColor: secondaryColor, bgcolor: `${secondaryColor}12` } }}>
                            LinkedIn
                        </Button>
                    </Stack>
                </Box>
            </Box>

            {/* ── Footer ── */}
            <Box component="footer" className="no-print"
                sx={{ textAlign: 'center', py: 3, borderTop: '1px solid rgba(255,255,255,0.06)', color: '#475569', fontSize: '0.8rem' }}>
                © 2026 {person.name} · Built with React & MUI
            </Box>
        </MainLayout>
    );
}

export default ResumePage;
