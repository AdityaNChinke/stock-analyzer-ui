import { Box, Typography, Paper } from '@mui/material';

/**
 * Animated AI Cartoon Trader Mascot ("BullBot")
 * Reacts dynamically to PIN input and login states with expressive facial animations and speech bubbles.
 */
export const CartoonMascot = ({ state = 'IDLE', speechText = '', onMascotClick = () => {} }) => {
  // state: 'IDLE' | 'SUCCESS' | 'ERROR'

  const isSuccess = state === 'SUCCESS';
  const isError = state === 'ERROR';

  // Mascot Mood Colors & Glow
  const glowColor = isSuccess
    ? '#10b981'
    : isError
    ? '#ef4444'
    : '#3b82f6';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
      {/* 💬 INTERACTIVE SPEECH BUBBLE */}
      <Paper
        elevation={4}
        sx={{
          p: 1.8,
          px: 2.5,
          mb: 2,
          borderRadius: '18px',
          bgcolor: 'background.paper',
          border: `2px solid ${glowColor}`,
          boxShadow: `0 8px 25px ${glowColor}30`,
          position: 'relative',
          maxWidth: 360,
          textAlign: 'center',
          animation: 'float 3s ease-in-out infinite',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -10,
            left: '50%',
            transform: 'translateX(-50%)',
            borderWidth: '10px 10px 0',
            borderStyle: 'solid',
            borderColor: `${glowColor} transparent`,
            display: 'block',
            width: 0,
          },
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-6px)' },
          },
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontWeight: 800,
            color: 'text.primary',
            lineHeight: 1.4,
            fontSize: '0.88rem',
          }}
        >
          {speechText ||
            (isSuccess
              ? '🎉 Access Granted! Welcome to StockAnalyzer Pro!'
              : isError
              ? '❌ Incorrect PIN. Please try again.'
              : '👋 Welcome back, Trader! Enter your 4-digit PIN to access your terminal.')}
        </Typography>
      </Paper>

      {/* 🤖 ANIMATED CARTOON MASCOT ("BULLBOT") */}
      <Box
        onClick={onMascotClick}
        sx={{
          cursor: 'pointer',
          position: 'relative',
          width: 120,
          height: 120,
          borderRadius: '50%',
          bgcolor: 'background.paper',
          border: `4px solid ${glowColor}`,
          boxShadow: `0 0 35px ${glowColor}60`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.2s, box-shadow 0.2s',
          animation: isSuccess ? 'bounceFast 0.5s infinite alternate' : 'bounceSlow 4s infinite',
          '&:hover': {
            transform: 'scale(1.08) rotate(3deg)',
          },
          '@keyframes bounceSlow': {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-8px)' },
          },
          '@keyframes bounceFast': {
            '0%': { transform: 'translateY(0px)' },
            '100%': { transform: 'translateY(-12px)' },
          },
        }}
      >
        {/* Cartoon SVG Robot Bull */}
        <svg viewBox="0 0 100 100" width="95" height="95">
          {/* Antennas / Horns */}
          <path
            d="M 22 30 Q 10 12 25 10 Q 30 20 32 28 Z"
            fill={glowColor}
            stroke="#1e293b"
            strokeWidth="2"
          />
          <path
            d="M 78 30 Q 90 12 75 10 Q 70 20 68 28 Z"
            fill={glowColor}
            stroke="#1e293b"
            strokeWidth="2"
          />

          {/* Ears / Headphone Rings */}
          <circle cx="16" cy="50" r="8" fill={glowColor} stroke="#1e293b" strokeWidth="2" />
          <circle cx="84" cy="50" r="8" fill={glowColor} stroke="#1e293b" strokeWidth="2" />
          <path d="M 16 50 A 34 34 0 0 1 84 50" fill="none" stroke="#94a3b8" strokeWidth="4" />

          {/* Head Body */}
          <rect
            x="24"
            y="26"
            width="52"
            height="48"
            rx="18"
            fill={isSuccess ? '#dcfce7' : isError ? '#fee2e2' : '#e0f2fe'}
            stroke="#1e293b"
            strokeWidth="3"
          />

          {/* Eyes Screen (Visor) */}
          <rect x="30" y="36" width="40" height="20" rx="8" fill="#0f172a" />

          {/* EYES (Dynamic Expression) */}
          {isSuccess ? (
            // Happy ^ ^ Eyes
            <g stroke="#10b981" strokeWidth="3" strokeLinecap="round" fill="none">
              <path d="M 36 48 Q 41 40 46 48" />
              <path d="M 54 48 Q 59 40 64 48" />
            </g>
          ) : isError ? (
            // X X Error Eyes
            <g stroke="#ef4444" strokeWidth="3" strokeLinecap="round">
              <line x1="36" y1="42" x2="44" y2="50" />
              <line x1="44" y1="42" x2="36" y2="50" />
              <line x1="56" y1="42" x2="64" y2="50" />
              <line x1="64" y1="42" x2="56" y2="50" />
            </g>
          ) : (
            // Cute Normal Blinking Eyes
            <g fill="#38bdf8">
              <ellipse cx="40" cy="46" rx="4" ry="5" />
              <ellipse cx="60" cy="46" rx="4" ry="5" />
              <circle cx="42" cy="44" r="1.5" fill="#ffffff" />
              <circle cx="62" cy="44" r="1.5" fill="#ffffff" />
            </g>
          )}

          {/* Nose & Smile */}
          <ellipse cx="50" cy="62" rx="10" ry="6" fill="#cbd5e1" stroke="#1e293b" strokeWidth="1.5" />
          <circle cx="46" cy="62" r="1.5" fill="#1e293b" />
          <circle cx="54" cy="62" r="1.5" fill="#1e293b" />

          {/* Smile / Mouth */}
          {isSuccess ? (
            <path d="M 44 68 Q 50 74 56 68" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
          ) : isError ? (
            <path d="M 44 71 Q 50 66 56 71" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
          ) : (
            <path d="M 45 68 Q 50 72 55 68" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
          )}
        </svg>
      </Box>
    </Box>
  );
};

export default CartoonMascot;
