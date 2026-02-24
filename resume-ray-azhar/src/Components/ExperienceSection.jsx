import { Box, Typography, Stack, Chip } from '@mui/material';
import {
    WorkOutline as WorkIcon,
    SchoolOutlined as SchoolIcon,
    EmojiEvents as TrophyIcon,
    FiberManualRecord as DotIcon,
} from '@mui/icons-material';
import SectionHeader from './Header';

// ─── TIMELINE CARD ──────────────────────────────────────────────────────────
function TimelineCard({ children, color }) {
    return (
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <Stack alignItems="center" sx={{ pt: 0.5 }}>
                <Box
                    sx={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        bgcolor: color,
                        flexShrink: 0,
                        boxShadow: `0 0 8px ${color}88`,
                    }}
                />
                <Box sx={{ width: 2, flex: 1, bgcolor: `${color}22`, mt: 0.5 }} />
            </Stack>
            {children}
        </Box>
    );
}

function ExperienceSection({ person }) {
    const { experiences, education, achievements, accentColor = '#6366f1', secondaryColor = '#06b6d4' } = person;

    return (
        <Box id="experience">
            {/* ── Work Experience ── */}
            <SectionHeader
                icon={<WorkIcon fontSize="small" />}
                title="Work Experience"
                color={accentColor}
            />

            {experiences.map((exp) => (
                <TimelineCard key={exp.role} color={exp.color}>
                    <Box
                        sx={{
                            flex: 1,
                            p: { xs: 2, sm: 3 },
                            borderRadius: 3,
                            background: 'rgba(255,255,255,0.03)',
                            border: `1px solid ${exp.color}22`,
                            transition: 'border-color 0.3s, transform 0.2s',
                            '&:hover': {
                                borderColor: `${exp.color}55`,
                                transform: 'translateY(-2px)',
                            },
                        }}
                    >
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            justifyContent="space-between"
                            alignItems={{ xs: 'flex-start', sm: 'center' }}
                            sx={{ mb: 1 }}
                        >
                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#f1f5f9', fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                                {exp.role}
                            </Typography>
                            <Chip
                                label={exp.period}
                                size="small"
                                sx={{
                                    bgcolor: `${exp.color}18`,
                                    color: exp.color,
                                    border: `1px solid ${exp.color}33`,
                                    fontSize: '0.72rem',
                                    mt: { xs: 0.5, sm: 0 },
                                    flexShrink: 0,
                                }}
                            />
                        </Stack>

                        <Typography sx={{ color: exp.color, fontWeight: 600, mb: 0.4, fontSize: '0.9rem' }}>
                            {exp.company}
                        </Typography>
                        <Typography sx={{ color: '#64748b', mb: 1.5, fontSize: '0.8rem' }}>
                            📍 {exp.location}
                        </Typography>

                        {exp.highlights.map((h) => (
                            <Stack key={h} direction="row" spacing={1} alignItems="flex-start" sx={{ mb: 0.8 }}>
                                <DotIcon sx={{ fontSize: '0.5rem', color: exp.color, mt: '7px', flexShrink: 0 }} />
                                <Typography sx={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6 }}>
                                    {h}
                                </Typography>
                            </Stack>
                        ))}

                        {exp.tags && (
                            <Stack direction="row" flexWrap="wrap" gap={0.8} sx={{ mt: 2 }}>
                                {exp.tags.map((tag) => (
                                    <Chip
                                        key={tag}
                                        label={tag}
                                        size="small"
                                        sx={{
                                            bgcolor: 'rgba(255,255,255,0.05)',
                                            color: '#cbd5e1',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            fontSize: '0.72rem',
                                        }}
                                    />
                                ))}
                            </Stack>
                        )}
                    </Box>
                </TimelineCard>
            ))}

            {/* ── Education ── */}
            <Box sx={{ mt: 5 }}>
                <SectionHeader
                    icon={<SchoolIcon fontSize="small" />}
                    title="Education"
                    color={secondaryColor}
                />

                {education.map((edu) => (
                    <TimelineCard key={edu.degree} color={edu.color}>
                        <Box
                            sx={{
                                flex: 1,
                                p: { xs: 2, sm: 3 },
                                borderRadius: 3,
                                background: 'rgba(255,255,255,0.03)',
                                border: `1px solid ${edu.color}22`,
                                transition: 'border-color 0.3s, transform 0.2s',
                                '&:hover': {
                                    borderColor: `${edu.color}55`,
                                    transform: 'translateY(-2px)',
                                },
                            }}
                        >
                            <Stack
                                direction={{ xs: 'column', sm: 'row' }}
                                justifyContent="space-between"
                                alignItems={{ xs: 'flex-start', sm: 'center' }}
                                sx={{ mb: 1 }}
                            >
                                <Typography variant="h6" sx={{ fontWeight: 700, color: '#f1f5f9', fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                                    {edu.degree}
                                </Typography>
                                <Chip
                                    label={edu.period}
                                    size="small"
                                    sx={{
                                        bgcolor: `${edu.color}18`,
                                        color: edu.color,
                                        border: `1px solid ${edu.color}33`,
                                        fontSize: '0.72rem',
                                        mt: { xs: 0.5, sm: 0 },
                                        flexShrink: 0,
                                    }}
                                />
                            </Stack>

                            <Typography sx={{ color: edu.color, fontWeight: 600, mb: 0.4, fontSize: '0.9rem' }}>
                                {edu.institution}
                            </Typography>
                            <Typography sx={{ color: '#64748b', mb: 1.5, fontSize: '0.8rem' }}>
                                📍 {edu.location} {edu.gpa ? `  •  GPA: ${edu.gpa}` : ''}
                            </Typography>

                            {edu.highlights.map((h) => (
                                <Stack key={h} direction="row" spacing={1} alignItems="flex-start" sx={{ mb: 0.8 }}>
                                    <DotIcon sx={{ fontSize: '0.5rem', color: edu.color, mt: '7px', flexShrink: 0 }} />
                                    <Typography sx={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6 }}>
                                        {h}
                                    </Typography>
                                </Stack>
                            ))}
                        </Box>
                    </TimelineCard>
                ))}
            </Box>

            {/* ── Achievements ── */}
            <Box sx={{ mt: 5 }}>
                <SectionHeader
                    icon={<TrophyIcon fontSize="small" />}
                    title="Achievements"
                    color="#f59e0b"
                />
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
                        gap: 2,
                    }}
                >
                    {achievements.map((ach) => (
                        <Box
                            key={ach.title}
                            sx={{
                                p: { xs: 2, sm: 3 },
                                borderRadius: 3,
                                background: `linear-gradient(135deg, ${ach.color}0d, rgba(255,255,255,0.02))`,
                                border: `1px solid ${ach.color}22`,
                                transition: 'transform 0.2s, border-color 0.3s',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    borderColor: `${ach.color}55`,
                                },
                            }}
                        >
                            <Stack direction="row" spacing={1.5} alignItems="flex-start">
                                <Box
                                    sx={{
                                        color: ach.color,
                                        bgcolor: `${ach.color}18`,
                                        p: 1,
                                        borderRadius: 2,
                                        display: 'flex',
                                        flexShrink: 0,
                                    }}
                                >
                                    <TrophyIcon fontSize="small" />
                                </Box>
                                <Box>
                                    <Typography sx={{ fontWeight: 700, color: '#f1f5f9', fontSize: '0.9rem', mb: 0.5 }}>
                                        {ach.title}
                                    </Typography>
                                    <Typography sx={{ color: '#94a3b8', fontSize: '0.8rem', lineHeight: 1.5 }}>
                                        {ach.desc}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}

export default ExperienceSection;
