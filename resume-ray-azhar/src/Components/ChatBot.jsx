import { useState, useRef, useEffect } from 'react';
import {
    Box,
    IconButton,
    TextField,
    Typography,
    Stack,
    Chip,
    Tooltip,
} from '@mui/material';
import {
    Chat as ChatIcon,
    Close as CloseIcon,
    Send as SendIcon,
    SmartToy as BotIcon,
    Person as PersonIcon,
    Delete as ClearIcon,
    AutoAwesome as SparkleIcon,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { sendMessage, resetChat } from '../services/geminiChat';

// ─── Constants ────────────────────────────────────────────────────────────────
const GREETING = "Hi! I'm your **Portfolio Assistant** ✨\n\nAsk me anything about Raynold or Azhar their skills, projects, experience, or achievements!";

const QUICK_PROMPTS = [
    "What are Raynold's top skills?",
    "Tell me about Azhar's experience",
    "Compare both interns",
    "What projects did they build?",
];

// ─── Typing Indicator ─────────────────────────────────────────────────────────
function TypingDots() {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px', px: 0.5, py: 0.5 }}>
            {[0, 1, 2].map((i) => (
                <Box
                    key={i}
                    sx={{
                        width: 7,
                        height: 7,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
                        animation: 'typingBounce 1.2s ease-in-out infinite',
                        animationDelay: `${i * 0.2}s`,
                        '@keyframes typingBounce': {
                            '0%, 60%, 100%': { transform: 'translateY(0)', opacity: 0.4 },
                            '30%': { transform: 'translateY(-6px)', opacity: 1 },
                        },
                    }}
                />
            ))}
        </Box>
    );
}

// ─── Format message text (basic bold/newline support) ─────────────────────────
function MessageText({ text }) {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return (
        <Typography
            component="div"
            sx={{ fontSize: '0.855rem', lineHeight: 1.65, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
            {parts.map((part, i) =>
                i % 2 === 1
                    ? <Box component="span" key={i} sx={{ fontWeight: 700 }}>{part}</Box>
                    : part
            )}
        </Typography>
    );
}

// ─── Single Message Bubble ────────────────────────────────────────────────────
function MessageBubble({ msg, isDark, accentFrom, accentTo, index }) {
    const isUser = msg.role === 'user';

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: isUser ? 'row-reverse' : 'row',
                alignItems: 'flex-end',
                gap: 1,
                animation: 'msgSlideIn 0.3s ease-out',
                animationDelay: `${index * 0.04}s`,
                animationFillMode: 'both',
                '@keyframes msgSlideIn': {
                    from: { opacity: 0, transform: 'translateY(12px)' },
                    to: { opacity: 1, transform: 'translateY(0)' },
                },
            }}
        >
            {/* Avatar */}
            <Box
                sx={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: isUser
                        ? `linear-gradient(135deg, ${accentFrom}, ${accentTo})`
                        : isDark
                            ? 'rgba(255,255,255,0.08)'
                            : 'rgba(99,102,241,0.1)',
                    border: isUser
                        ? 'none'
                        : `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(99,102,241,0.2)'}`,
                    color: isUser ? '#fff' : '#6366f1',
                    mb: 0.3,
                }}
            >
                {isUser
                    ? <PersonIcon sx={{ fontSize: '0.85rem' }} />
                    : <BotIcon sx={{ fontSize: '0.85rem' }} />
                }
            </Box>

            {/* Bubble */}
            <Box sx={{ maxWidth: '78%', display: 'flex', flexDirection: 'column', alignItems: isUser ? 'flex-end' : 'flex-start' }}>
                <Box
                    sx={{
                        px: 1.8,
                        py: 1.1,
                        borderRadius: isUser
                            ? '18px 18px 4px 18px'
                            : '18px 18px 18px 4px',
                        background: isUser
                            ? `linear-gradient(135deg, ${accentFrom}, ${accentTo})`
                            : isDark
                                ? 'rgba(255,255,255,0.07)'
                                : 'rgba(99,102,241,0.06)',
                        border: isUser
                            ? 'none'
                            : `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(99,102,241,0.12)'}`,
                        boxShadow: isUser
                            ? `0 4px 16px ${accentFrom}40`
                            : isDark
                                ? '0 2px 8px rgba(0,0,0,0.3)'
                                : '0 2px 8px rgba(0,0,0,0.06)',
                        color: isUser ? '#fff' : 'text.primary',
                        backdropFilter: !isUser ? 'blur(8px)' : 'none',
                    }}
                >
                    <MessageText text={msg.text} />
                </Box>
                {/* Timestamp */}
                {msg.time && (
                    <Typography sx={{ fontSize: '0.67rem', color: 'text.disabled', mt: 0.4, mx: 0.5 }}>
                        {msg.time}
                    </Typography>
                )}
            </Box>
        </Box>
    );
}

// ─── ChatBot ──────────────────────────────────────────────────────────────────
function ChatBot() {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    const accentFrom = '#6366f1';
    const accentTo = '#06b6d4';

    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'bot', text: GREETING, time: now() },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showQuick, setShowQuick] = useState(true);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    function now() {
        return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen]);

    const handleSend = async (text = input.trim()) => {
        if (!text || isLoading) return;

        setInput('');
        setShowQuick(false);
        setMessages((prev) => [...prev, { role: 'user', text, time: now() }]);
        setIsLoading(true);

        try {
            const reply = await sendMessage(text);
            setMessages((prev) => [...prev, { role: 'bot', text: reply, time: now() }]);
        } catch {
            setMessages((prev) => [
                ...prev,
                { role: 'bot', text: 'Sorry, I ran into an issue. Please try again! 🙏', time: now() },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClear = () => {
        resetChat();
        setMessages([{ role: 'bot', text: GREETING, time: now() }]);
        setShowQuick(true);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            {/* ── Chat Panel ───────────────────────────────────────────────── */}
            <Box
                sx={{
                    position: 'fixed',
                    bottom: { xs: 0, sm: 96 },
                    right: { xs: 0, sm: 24 },
                    width: { xs: '100%', sm: 400 },
                    height: { xs: '100dvh', sm: 560 },
                    zIndex: 1400,
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: { xs: 0, sm: '20px' },
                    overflow: 'hidden',
                    // Glass morphism
                    background: isDark
                        ? 'rgba(10, 10, 20, 0.88)'
                        : 'rgba(255, 255, 255, 0.92)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    border: isDark
                        ? '1px solid rgba(255,255,255,0.08)'
                        : '1px solid rgba(99,102,241,0.18)',
                    boxShadow: isDark
                        ? '0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(99,102,241,0.15) inset'
                        : '0 32px 80px rgba(99,102,241,0.18), 0 8px 32px rgba(0,0,0,0.08)',
                    // Animate panel open/close
                    transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.96)',
                    opacity: isOpen ? 1 : 0,
                    pointerEvents: isOpen ? 'all' : 'none',
                    transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.25s ease',
                    transformOrigin: 'bottom right',
                }}
            >
                {/* ── Header ── */}
                <Box
                    sx={{
                        px: 2,
                        py: 1.6,
                        background: `linear-gradient(135deg, ${accentFrom} 0%, #8b5cf6 50%, ${accentTo} 100%)`,
                        position: 'relative',
                        overflow: 'hidden',
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            top: '-50%',
                            right: '-10%',
                            width: 160,
                            height: 160,
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.07)',
                            pointerEvents: 'none',
                        },
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            bottom: '-60%',
                            left: '10%',
                            width: 120,
                            height: 120,
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.05)',
                            pointerEvents: 'none',
                        },
                    }}
                >
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Stack direction="row" alignItems="center" spacing={1.5}>
                            {/* Bot Avatar */}
                            <Box
                                sx={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: '12px',
                                    bgcolor: 'rgba(255,255,255,0.18)',
                                    border: '1px solid rgba(255,255,255,0.3)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backdropFilter: 'blur(8px)',
                                    flexShrink: 0,
                                }}
                            >
                                <BotIcon sx={{ fontSize: '1.3rem', color: '#fff' }} />
                            </Box>
                            <Box>
                                <Stack direction="row" alignItems="center" spacing={0.6}>
                                    <Typography sx={{ fontWeight: 800, fontSize: '0.95rem', color: '#fff', letterSpacing: 0.2 }}>
                                        Portfolio Assistant
                                    </Typography>
                                    <SparkleIcon sx={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }} />
                                </Stack>
                                <Stack direction="row" alignItems="center" spacing={0.6}>
                                    <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: '#4ade80', boxShadow: '0 0 6px #4ade80', animation: 'pulse 2s infinite', '@keyframes pulse': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.5 } } }} />
                                    <Typography sx={{ fontSize: '0.73rem', color: 'rgba(255,255,255,0.75)' }}>
                                        Online · Powered by GroQ 
                                    </Typography>
                                </Stack>
                            </Box>
                        </Stack>

                        <Stack direction="row" spacing={0.5}>
                            <Tooltip title="Clear chat">
                                <IconButton
                                    size="small"
                                    onClick={handleClear}
                                    sx={{ color: 'rgba(255,255,255,0.7)', '&:hover': { color: '#fff', bgcolor: 'rgba(255,255,255,0.15)' }, borderRadius: '10px' }}
                                >
                                    <ClearIcon sx={{ fontSize: '1rem' }} />
                                </IconButton>
                            </Tooltip>
                            <IconButton
                                size="small"
                                onClick={() => setIsOpen(false)}
                                sx={{ color: 'rgba(255,255,255,0.7)', '&:hover': { color: '#fff', bgcolor: 'rgba(255,255,255,0.15)' }, borderRadius: '10px' }}
                            >
                                <CloseIcon sx={{ fontSize: '1rem' }} />
                            </IconButton>
                        </Stack>
                    </Stack>
                </Box>

                {/* ── Messages Area ── */}
                <Box
                    sx={{
                        flex: 1,
                        overflowY: 'auto',
                        px: 2,
                        py: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1.5,
                        // Custom scrollbar
                        '&::-webkit-scrollbar': { width: 4 },
                        '&::-webkit-scrollbar-track': { background: 'transparent' },
                        '&::-webkit-scrollbar-thumb': {
                            borderRadius: 4,
                            background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(99,102,241,0.2)',
                        },
                    }}
                >
                    {messages.map((msg, i) => (
                        <MessageBubble
                            key={i}
                            msg={msg}
                            isDark={isDark}
                            accentFrom={accentFrom}
                            accentTo={accentTo}
                            index={i}
                        />
                    ))}

                    {/* Typing indicator */}
                    {isLoading && (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'flex-end',
                                gap: 1,
                                animation: 'msgSlideIn 0.3s ease-out',
                                '@keyframes msgSlideIn': {
                                    from: { opacity: 0, transform: 'translateY(10px)' },
                                    to: { opacity: 1, transform: 'translateY(0)' },
                                },
                            }}
                        >
                            <Box sx={{ width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(99,102,241,0.1)', border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(99,102,241,0.2)'}`, color: '#6366f1', mb: 0.3, flexShrink: 0 }}>
                                <BotIcon sx={{ fontSize: '0.85rem' }} />
                            </Box>
                            <Box sx={{ px: 1.8, py: 1.1, borderRadius: '18px 18px 18px 4px', background: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(99,102,241,0.06)', border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(99,102,241,0.12)'}` }}>
                                <TypingDots />
                            </Box>
                        </Box>
                    )}

                    <div ref={messagesEndRef} />
                </Box>

                {/* ── Quick Prompts ── */}
                {showQuick && !isLoading && (
                    <Box sx={{ px: 2, pb: 1.5, display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
                        {QUICK_PROMPTS.map((q) => (
                            <Chip
                                key={q}
                                label={q}
                                size="small"
                                onClick={() => handleSend(q)}
                                sx={{
                                    fontSize: '0.72rem',
                                    cursor: 'pointer',
                                    bgcolor: isDark ? 'rgba(99,102,241,0.12)' : 'rgba(99,102,241,0.08)',
                                    color: isDark ? '#a5b4fc' : '#6366f1',
                                    border: `1px solid ${isDark ? 'rgba(99,102,241,0.3)' : 'rgba(99,102,241,0.22)'}`,
                                    borderRadius: '10px',
                                    height: 26,
                                    transition: 'all 0.2s',
                                    '&:hover': {
                                        bgcolor: isDark ? 'rgba(99,102,241,0.22)' : 'rgba(99,102,241,0.16)',
                                        transform: 'translateY(-1px)',
                                        boxShadow: '0 4px 12px rgba(99,102,241,0.2)',
                                    },
                                }}
                            />
                        ))}
                    </Box>
                )}

                {/* ── Input Bar ── */}
                <Box
                    sx={{
                        px: 2,
                        py: 1.5,
                        borderTop: isDark
                            ? '1px solid rgba(255,255,255,0.06)'
                            : '1px solid rgba(99,102,241,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        background: isDark
                            ? 'rgba(255,255,255,0.02)'
                            : 'rgba(99,102,241,0.02)',
                    }}
                >
                    <TextField
                        inputRef={inputRef}
                        fullWidth
                        size="small"
                        multiline
                        maxRows={3}
                        placeholder="Ask me anything…"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '14px',
                                fontSize: '0.855rem',
                                background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(99,102,241,0.04)',
                                transition: 'all 0.2s',
                                '& fieldset': {
                                    borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(99,102,241,0.18)',
                                },
                                '&:hover fieldset': {
                                    borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(99,102,241,0.35)',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#6366f1',
                                    borderWidth: '1.5px',
                                },
                                '&.Mui-focused': {
                                    background: isDark ? 'rgba(99,102,241,0.08)' : 'rgba(99,102,241,0.06)',
                                },
                            },
                            '& .MuiInputBase-input::placeholder': {
                                color: 'text.disabled',
                                opacity: 0.8,
                            },
                        }}
                    />

                    {/* Send button */}
                    <Box
                        onClick={() => handleSend()}
                        sx={{
                            width: 42,
                            height: 42,
                            borderRadius: '14px',
                            flexShrink: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: !input.trim() || isLoading ? 'default' : 'pointer',
                            background: !input.trim() || isLoading
                                ? isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
                                : `linear-gradient(135deg, ${accentFrom}, ${accentTo})`,
                            boxShadow: !input.trim() || isLoading
                                ? 'none'
                                : '0 4px 16px rgba(99,102,241,0.4)',
                            color: !input.trim() || isLoading ? 'text.disabled' : '#fff',
                            transition: 'all 0.25s cubic-bezier(0.34,1.56,0.64,1)',
                            transform: input.trim() && !isLoading ? 'scale(1)' : 'scale(0.92)',
                            '&:hover': input.trim() && !isLoading ? {
                                transform: 'scale(1.08)',
                                boxShadow: '0 6px 20px rgba(99,102,241,0.5)',
                            } : {},
                            '&:active': input.trim() && !isLoading ? {
                                transform: 'scale(0.95)',
                            } : {},
                        }}
                    >
                        <SendIcon sx={{ fontSize: '1.05rem', transform: 'translateX(1px)' }} />
                    </Box>
                </Box>
            </Box>

            {/* ── FAB Button ─────────────────────────────────────────────── */}
            <Box
                onClick={() => setIsOpen((prev) => !prev)}
                sx={{
                    position: 'fixed',
                    bottom: 24,
                    right: 24,
                    width: 58,
                    height: 58,
                    zIndex: 1500,
                    cursor: 'pointer',
                    // Outer pulse ring
                    '&::before': !isOpen ? {
                        content: '""',
                        position: 'absolute',
                        inset: -6,
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${accentFrom}40, ${accentTo}40)`,
                        animation: 'fabPulse 2.5s ease-in-out infinite',
                        '@keyframes fabPulse': {
                            '0%,100%': { transform: 'scale(1)', opacity: 0.6 },
                            '50%': { transform: 'scale(1.2)', opacity: 0 },
                        },
                    } : {},
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '18px',
                        background: `linear-gradient(135deg, ${accentFrom}, #8b5cf6, ${accentTo})`,
                        backgroundSize: '200% 200%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        boxShadow: '0 8px 32px rgba(99,102,241,0.45), 0 2px 8px rgba(0,0,0,0.2)',
                        transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease, border-radius 0.3s ease',
                        transform: isOpen ? 'rotate(90deg) scale(0.95)' : 'rotate(0deg) scale(1)',
                        '&:hover': {
                            transform: isOpen ? 'rotate(90deg) scale(1.05)' : 'scale(1.1)',
                            boxShadow: '0 12px 40px rgba(99,102,241,0.6), 0 4px 12px rgba(0,0,0,0.3)',
                        },
                        animation: !isOpen ? 'fabFloat 3s ease-in-out infinite' : 'none',
                        '@keyframes fabFloat': {
                            '0%,100%': { transform: 'translateY(0)' },
                            '50%': { transform: 'translateY(-4px)' },
                        },
                    }}
                >
                    {isOpen
                        ? <CloseIcon sx={{ fontSize: '1.3rem' }} />
                        : <ChatIcon sx={{ fontSize: '1.3rem' }} />
                    }
                </Box>

                {/* Unread badge dot — shown when chat is closed */}
                {!isOpen && (
                    <Box sx={{
                        position: 'absolute',
                        top: -2,
                        right: -2,
                        width: 14,
                        height: 14,
                        borderRadius: '50%',
                        bgcolor: '#4ade80',
                        border: '2px solid',
                        borderColor: 'background.default',
                        boxShadow: '0 0 8px #4ade8099',
                        animation: 'badgePulse 2s infinite',
                        '@keyframes badgePulse': {
                            '0%,100%': { transform: 'scale(1)' },
                            '50%': { transform: 'scale(1.2)' },
                        },
                    }} />
                )}
            </Box>
        </>
    );
}

export default ChatBot;
