import { useState, useRef, useEffect } from 'react';
import {
    Box,
    IconButton,
    TextField,
    Typography,
    Paper,
    Stack,
    CircularProgress,
} from '@mui/material';
import {
    Chat as ChatIcon,
    Close as CloseIcon,
    Send as SendIcon,
    SmartToy as BotIcon,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { sendMessage } from '../services/geminiChat';

const GREETING = "Hi! I'm the portfolio assistant. Ask me anything about Raynold or Azhar — their skills, projects, experience, or achievements!";

function ChatBot() {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'bot', text: GREETING },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        const text = input.trim();
        if (!text || isLoading) return;

        setInput('');
        setMessages((prev) => [...prev, { role: 'user', text }]);
        setIsLoading(true);

        try {
            const reply = await sendMessage(text);
            setMessages((prev) => [...prev, { role: 'bot', text: reply }]);
        } catch {
            setMessages((prev) => [
                ...prev,
                { role: 'bot', text: 'Sorry, something went wrong. Please try again.' },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            {/* Chat Panel */}
            {isOpen && (
                <Paper
                    elevation={16}
                    sx={{
                        position: 'fixed',
                        bottom: { xs: 0, sm: 90 },
                        right: { xs: 0, sm: 24 },
                        width: { xs: '100%', sm: 380 },
                        height: { xs: '100vh', sm: 520 },
                        borderRadius: { xs: 0, sm: 4 },
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        zIndex: 1300,
                        border: isDark
                            ? '1px solid rgba(255,255,255,0.1)'
                            : '1px solid rgba(0,0,0,0.1)',
                        bgcolor: isDark ? '#0f0f18' : '#ffffff',
                    }}
                >
                    {/* Header */}
                    <Box
                        sx={{
                            px: 2,
                            py: 1.5,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
                            color: '#fff',
                        }}
                    >
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <BotIcon sx={{ fontSize: '1.3rem' }} />
                            <Typography sx={{ fontWeight: 700, fontSize: '0.95rem' }}>
                                Portfolio Assistant
                            </Typography>
                        </Stack>
                        <IconButton size="small" onClick={() => setIsOpen(false)} sx={{ color: '#fff' }}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </Box>

                    {/* Messages */}
                    <Box
                        sx={{
                            flex: 1,
                            overflowY: 'auto',
                            px: 2,
                            py: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1.5,
                        }}
                    >
                        {messages.map((msg, i) => (
                            <Box
                                key={i}
                                sx={{
                                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                    maxWidth: '85%',
                                }}
                            >
                                <Box
                                    sx={{
                                        px: 2,
                                        py: 1.2,
                                        borderRadius: msg.role === 'user'
                                            ? '16px 16px 4px 16px'
                                            : '16px 16px 16px 4px',
                                        bgcolor: msg.role === 'user'
                                            ? 'linear-gradient(135deg, #6366f1, #06b6d4)'
                                            : isDark
                                                ? 'rgba(255,255,255,0.06)'
                                                : 'rgba(0,0,0,0.05)',
                                        background: msg.role === 'user'
                                            ? 'linear-gradient(135deg, #6366f1, #06b6d4)'
                                            : undefined,
                                        color: msg.role === 'user'
                                            ? '#fff'
                                            : 'text.primary',
                                    }}
                                >
                                    <Typography sx={{ fontSize: '0.85rem', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                                        {msg.text}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}

                        {isLoading && (
                            <Box sx={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 1, px: 1 }}>
                                <CircularProgress size={16} sx={{ color: '#6366f1' }} />
                                <Typography sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>
                                    Thinking...
                                </Typography>
                            </Box>
                        )}

                        <div ref={messagesEndRef} />
                    </Box>

                    {/* Input */}
                    <Box
                        sx={{
                            px: 2,
                            py: 1.5,
                            borderTop: isDark
                                ? '1px solid rgba(255,255,255,0.08)'
                                : '1px solid rgba(0,0,0,0.08)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                        }}
                    >
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Ask about Raynold or Azhar..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 3,
                                    fontSize: '0.85rem',
                                },
                            }}
                        />
                        <IconButton
                            onClick={handleSend}
                            disabled={!input.trim() || isLoading}
                            sx={{
                                bgcolor: '#6366f1',
                                color: '#fff',
                                '&:hover': { bgcolor: '#4f46e5' },
                                '&.Mui-disabled': {
                                    bgcolor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                                    color: 'text.disabled',
                                },
                                width: 38,
                                height: 38,
                            }}
                        >
                            <SendIcon sx={{ fontSize: '1.1rem' }} />
                        </IconButton>
                    </Box>
                </Paper>
            )}

            {/* FAB */}
            <IconButton
                onClick={() => setIsOpen((prev) => !prev)}
                sx={{
                    position: 'fixed',
                    bottom: 24,
                    right: 24,
                    width: 56,
                    height: 56,
                    zIndex: 1300,
                    background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
                    color: '#fff',
                    boxShadow: '0 8px 32px rgba(99,102,241,0.4)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                        background: 'linear-gradient(135deg, #4f46e5, #0891b2)',
                        transform: 'scale(1.08)',
                        boxShadow: '0 12px 40px rgba(99,102,241,0.5)',
                    },
                }}
            >
                {isOpen ? <CloseIcon /> : <ChatIcon />}
            </IconButton>
        </>
    );
}

export default ChatBot;
