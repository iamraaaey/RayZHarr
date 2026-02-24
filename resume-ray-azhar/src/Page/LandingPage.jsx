import { Box, Typography, Button, Stack, Chip, Avatar, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
    ArrowForward as ArrowIcon,
    Code as CodeIcon,
    Smartphone as MobileIcon,
    Storage as DataIcon,
    Star as StarIcon,
    Email as EmailIcon,
    GitHub as GitHubIcon,
    LinkedIn as LinkedInIcon,
    LightMode as LightModeIcon,
    DarkMode as DarkModeIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCallback, useRef, useState } from 'react';
import MainLayout from '../Layout/MainLayout';
import { personList } from '../data/persons';
import { useThemeMode } from '../Context/ThemeContext';

// ─── Web Audio sound engine ───────────────────────────────────────────────────
function useSound() {
    const ctxRef = useRef(null);

    const getCtx = useCallback(() => {
        if (!ctxRef.current) {
            ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (ctxRef.current.state === 'suspended') ctxRef.current.resume();
        return ctxRef.current;
    }, []);

    const playClick = useCallback((accentColor = '#6366f1') => {
        const ctx = getCtx();
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(260, now + 0.12);
        filter.type = 'lowpass';
        filter.frequency.value = 3000;
        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.2);
    }, [getCtx]);

    const playLike = useCallback(() => {
        const ctx = getCtx();
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.3);
    }, [getCtx]);

    const playPass = useCallback(() => {
        const ctx = getCtx();
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(150, now + 0.15);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.25);
    }, [getCtx]);

    return { playClick, playLike, playPass };
}

// ─── Icon helper ──────────────────────────────────────────────────────────────
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
        'ML Developer': <StarIcon fontSize="inherit" />,
        'System Design': <CodeIcon fontSize="inherit" />,
    };
    return icons[label] || <StarIcon fontSize="inherit" />;
}

// ─── Swipeable Person Card ────────────────────────────────────────────────────
function PersonCard({ person }) {
    const navigate = useNavigate();
    const { playClick, playLike, playPass } = useSound();
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    const cardRef = useRef(null);
    const startRef = useRef(null);

    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const [exiting, setExiting] = useState(null); // 'like' | 'pass' | null
    const [gone, setGone] = useState(false);

    // derived values
    const rotation = pos.x / 20;
    const likeOpacity = Math.min(Math.max(pos.x / 80, 0), 1);
    const passOpacity = Math.min(Math.max(-pos.x / 80, 0), 1);

    const flyOut = (dir) => {
        setExiting(dir);
        if (dir === 'like') playLike(); else playPass();
        setTimeout(() => setGone(true), 420);
    };

    const handlePointerDown = (e) => {
        if (exiting || gone) return;
        setDragging(true);
        startRef.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
        cardRef.current?.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e) => {
        if (!dragging) return;
        setPos({ x: e.clientX - startRef.current.x, y: e.clientY - startRef.current.y });
    };

    const handlePointerUp = () => {
        if (!dragging) return;
        setDragging(false);
        if (pos.x > 110) flyOut('like');
        else if (pos.x < -110) flyOut('pass');
        else setPos({ x: 0, y: 0 });
    };

    if (gone) return null;

    return (
        <Box
            ref={cardRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            sx={{
                position: 'relative',
                flex: '1 1 340px',
                maxWidth: { xs: '100%', md: 480 },
                p: { xs: 3, sm: 4 },
                borderRadius: 4,
                background: isDark
                    ? `linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)`
                    : `linear-gradient(135deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.005) 100%)`,
                border: `1px solid ${person.accentColor}30`,
                backdropFilter: 'blur(10px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: 2,
                userSelect: 'none',
                touchAction: 'none',
                cursor: exiting ? 'default' : dragging ? 'grabbing' : 'grab',
                // swipe transform (or fly-out)
                transform: exiting === 'like'
                    ? 'translateX(160vw) rotate(30deg)'
                    : exiting === 'pass'
                        ? 'translateX(-160vw) rotate(-30deg)'
                        : `translateX(${pos.x}px) translateY(${pos.y}px) rotate(${rotation}deg)`,
                transition: dragging
                    ? 'none'
                    : exiting
                        ? 'transform 0.42s cubic-bezier(0.4,0,1,1)'
                        : 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), border-color 0.3s, box-shadow 0.3s',
                // glow driven by drag direction
                boxShadow: likeOpacity > 0.05
                    ? `0 24px 60px #10b98140`
                    : passOpacity > 0.05
                        ? `0 24px 60px #ef444440`
                        : `0 24px 60px ${person.accentColor}20`,
                borderColor: likeOpacity > 0.05
                    ? '#10b98160'
                    : passOpacity > 0.05
                        ? '#ef444460'
                        : `${person.accentColor}30`,
                // top accent line
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
            {/* ── LIKE stamp ── */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 22,
                    left: 22,
                    opacity: likeOpacity,
                    transform: 'rotate(-18deg)',
                    pointerEvents: 'none',
                    zIndex: 5,
                    transition: dragging ? 'none' : 'opacity 0.15s',
                }}
            >
                <Chip
                    label="LIKE 💚"
                    sx={{
                        bgcolor: 'rgba(16,185,129,0.15)',
                        color: '#10b981',
                        border: '2.5px solid #10b981',
                        fontWeight: 900,
                        fontSize: '1rem',
                        letterSpacing: 1,
                        px: 1,
                    }}
                />
            </Box>

            {/* ── PASS stamp ── */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 22,
                    right: 22,
                    opacity: passOpacity,
                    transform: 'rotate(18deg)',
                    pointerEvents: 'none',
                    zIndex: 5,
                    transition: dragging ? 'none' : 'opacity 0.15s',
                }}
            >
                <Chip
                    label="PASS ❌"
                    sx={{
                        bgcolor: 'rgba(239,68,68,0.15)',
                        color: '#ef4444',
                        border: '2.5px solid #ef4444',
                        fontWeight: 900,
                        fontSize: '1rem',
                        letterSpacing: 1,
                        px: 1,
                    }}
                />
            </Box>

            {/* ── Avatar with glow ring ── */}
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
                        border: isDark ? '3px solid rgba(255,255,255,0.12)' : '3px solid rgba(0,0,0,0.1)',
                        position: 'relative',
                        zIndex: 1,
                        fontSize: '2.2rem',
                        bgcolor: person.accentColor,
                    }}
                >
                    {person.initials}
                </Avatar>
            </Box>

            {/* ── Name & role ── */}
            <Box>
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 800,
                        fontSize: { xs: '1.3rem', sm: '1.5rem' },
                        background: isDark
                            ? `linear-gradient(135deg, #f1f5f9, ${person.accentColor})`
                            : `linear-gradient(135deg, #1e293b, ${person.accentColor})`,
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        lineHeight: 1.2,
                        mb: 0.5,
                    }}
                >
                    {person.name}
                </Typography>
                <Typography sx={{ color: 'text.secondary', fontSize: '0.88rem', mb: 0.5 }}>
                    {person.role}
                </Typography>
                <Typography sx={{ fontSize: '0.82rem', color: person.accentColor, fontWeight: 600 }}>
                    {person.title}
                </Typography>
            </Box>

            {/* ── Bio ── */}
            <Typography
                sx={{
                    color: 'text.disabled',
                    fontSize: { xs: '0.82rem', sm: '0.85rem' },
                    lineHeight: 1.7,
                    maxWidth: 360,
                }}
            >
                {person.bio.slice(0, 140)}…
            </Typography>

            {/* ── Highlight chips ── */}
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
                            color: 'text.primary',
                            border: `1px solid ${h.color}30`,
                            fontSize: '0.76rem',
                        }}
                    />
                ))}
            </Stack>

            {/* ── Stats row ── */}
            <Stack direction="row" justifyContent="center" flexWrap="wrap" gap={1.5} sx={{ width: '100%' }}>
                {person.stats.map((s) => (
                    <Box
                        key={s.label}
                        sx={{
                            textAlign: 'center',
                            px: 1.5,
                            py: 1,
                            borderRadius: 2,
                            bgcolor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                            border: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)',
                            minWidth: 60,
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '1.15rem', fontWeight: 800,
                                background: `linear-gradient(135deg, ${person.accentColor}, ${person.secondaryColor})`,
                                backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                                lineHeight: 1.1,
                            }}
                        >
                            {s.value}
                        </Typography>
                        <Typography sx={{ color: 'text.secondary', fontSize: '0.68rem', mt: 0.2 }}>
                            {s.label}
                        </Typography>
                    </Box>
                ))}
            </Stack>

            {/* ── Quick contact ── */}
            <Stack direction="row" spacing={1}>
                {[
                    { href: `mailto:${person.email}`, icon: <EmailIcon sx={{ fontSize: '1rem' }} /> },
                    { href: person.github, icon: <GitHubIcon sx={{ fontSize: '1rem' }} />, external: true },
                    { href: person.linkedin, icon: <LinkedInIcon sx={{ fontSize: '1rem' }} />, external: true },
                ].map((item) => (
                    <Box
                        key={item.href}
                        component="a"
                        href={item.href}
                        target={item.external ? '_blank' : undefined}
                        onClick={(e) => e.stopPropagation()}
                        sx={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            width: 34, height: 34, borderRadius: 2,
                            color: 'text.secondary',
                            bgcolor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                            border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)',
                            transition: 'all 0.2s',
                            '&:hover': { color: person.accentColor, borderColor: `${person.accentColor}50`, bgcolor: `${person.accentColor}12` },
                        }}
                    >
                        {item.icon}
                    </Box>
                ))}
            </Stack>

            {/* ── Swipe hint (shown only before first drag) ── */}
            {!dragging && !exiting && (
                <Typography
                    sx={{
                        fontSize: '0.7rem',
                        color: '#334155',
                        letterSpacing: 0.5,
                        animation: 'pulse 2s ease-in-out infinite',
                        '@keyframes pulse': {
                            '0%,100%': { opacity: 0.5 },
                            '50%': { opacity: 1 },
                        },
                    }}
                >
                    ← swipe to pass &nbsp;·&nbsp; swipe to like →
                </Typography>
            )}

            {/* ── CTA ── */}
            <Button
                variant="contained"
                endIcon={<ArrowIcon />}
                onClick={(e) => { e.stopPropagation(); playClick(person.accentColor); navigate(`/resume/${person.id}`); }}
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

// ─── Landing Page ─────────────────────────────────────────────────────────────
function LandingPage() {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';
    const { toggleMode } = useThemeMode();

    return (
        <MainLayout>
            {/* Theme toggle - top right */}
            <Box sx={{ position: 'fixed', top: 16, right: 16, zIndex: 200 }} className="no-print">
                <IconButton
                    onClick={toggleMode}
                    sx={{
                        color: 'text.secondary',
                        bgcolor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
                        border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
                        '&:hover': {
                            bgcolor: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)',
                        },
                    }}
                >
                    {isDark ? <LightModeIcon /> : <DarkModeIcon />}
                </IconButton>
            </Box>

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
                <Box sx={{ position: 'absolute', width: 700, height: 700, borderRadius: '50%', background: `radial-gradient(circle, rgba(99,102,241,${isDark ? '0.1' : '0.06'}) 0%, transparent 70%)`, top: '-20%', left: '-15%', pointerEvents: 'none' }} />
                <Box sx={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: `radial-gradient(circle, rgba(236,72,153,${isDark ? '0.08' : '0.05'}) 0%, transparent 70%)`, bottom: '-15%', right: '-10%', pointerEvents: 'none' }} />
                <Box sx={{ position: 'absolute', width: 350, height: 350, borderRadius: '50%', background: `radial-gradient(circle, rgba(6,182,212,${isDark ? '0.06' : '0.04'}) 0%, transparent 70%)`, top: '45%', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none' }} />

                {/* Badge */}
                <Chip
                    label="Welcome to our portfolio"
                    size="small"
                    sx={{
                        bgcolor: isDark ? 'rgba(99,102,241,0.12)' : 'rgba(99,102,241,0.08)',
                        color: isDark ? '#a5b4fc' : '#6366f1',
                        border: isDark ? '1px solid rgba(99,102,241,0.25)' : '1px solid rgba(99,102,241,0.2)',
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
                        background: isDark
                            ? 'linear-gradient(135deg, #f1f5f9 30%, #818cf8 65%, #06b6d4 100%)'
                            : 'linear-gradient(135deg, #1e293b 30%, #6366f1 65%, #06b6d4 100%)',
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
                        color: 'text.disabled',
                        mb: { xs: 5, md: 6 },
                        animation: 'fadeInUp 0.7s ease-out',
                        maxWidth: 500,
                    }}
                >
                    Meet Raynold and Azhar, two passionate software engineering interns at UNIMAS. Explore their skills, projects, and aspirations in the world of tech.
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
                    borderTop: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.08)',
                    color: 'text.secondary',
                    fontSize: '0.78rem',
                }}
            >
                © 2026 Raynold anak Kabai &amp; Azhar Sulaiman | Intern Uglobal @ UNIMAS
            </Box>
        </MainLayout>
    );
}

export default LandingPage;
