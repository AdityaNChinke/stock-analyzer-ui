import { Box, Typography, Paper } from '@mui/material';

/**
 * Authentic Movie-Accurate Iron Man (Mark LXXXV Helmet & J.A.R.V.I.S. Protocol)
 * Features dynamic SUCCESS (Faceplate Opening + Green Power Surge + Shockwave)
 * and FAILURE (Red Alert Strobe + Violent Armor Shake + Lockdown HUD) animations.
 */
export const IronManMascot = ({ state = 'IDLE', speechText = '', onMascotClick = () => {} }) => {
  const isSuccess = state === 'SUCCESS';
  const isError = state === 'ERROR';

  // Dynamic Theme Colors
  const hudColor = isSuccess ? '#10b981' : isError ? '#ef4444' : '#00f0ff';
  const eyeColor = isSuccess ? '#34d399' : isError ? '#ef4444' : '#38bdf8';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
      {/* 🔮 HOLOGRAPHIC JARVIS HUD SPEECH BUBBLE */}
      <Paper
        elevation={6}
        sx={{
          p: 1.8,
          px: 2.5,
          mb: 2.5,
          borderRadius: '16px',
          bgcolor: 'rgba(10, 25, 47, 0.88)',
          backdropFilter: 'blur(16px)',
          border: `1.5px solid ${hudColor}`,
          boxShadow: `0 0 35px ${hudColor}45, inset 0 0 15px ${hudColor}20`,
          position: 'relative',
          maxWidth: 380,
          textAlign: 'center',
          animation: isError ? 'alertHudShake 0.4s' : 'jarvisFloat 3s ease-in-out infinite',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -10,
            left: '50%',
            transform: 'translateX(-50%)',
            borderWidth: '10px 10px 0',
            borderStyle: 'solid',
            borderColor: `${hudColor} transparent`,
            display: 'block',
            width: 0,
          },
          '@keyframes alertHudShake': {
            '0%, 100%': { transform: 'translateX(0)' },
            '20%, 60%': { transform: 'translateX(-8px)' },
            '40%, 80%': { transform: 'translateX(8px)' },
          },
          '@keyframes jarvisFloat': {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-6px)' },
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 0.5 }}>
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: hudColor,
              boxShadow: `0 0 12px ${hudColor}`,
              animation: isError ? 'strobeFast 0.2s infinite alternate' : 'beaconBlink 0.8s infinite alternate',
              '@keyframes strobeFast': { '0%': { opacity: 0.1 }, '100%': { opacity: 1 } },
              '@keyframes beaconBlink': { '0%': { opacity: 0.2 }, '100%': { opacity: 1 } },
            }}
          />
          <Typography
            variant="caption"
            sx={{
              fontWeight: 900,
              letterSpacing: '0.15em',
              fontFamily: 'monospace',
              color: hudColor,
              textTransform: 'uppercase',
              fontSize: '0.72rem',
            }}
          >
            {isSuccess ? 'ACCESS GRANTED • MARK LXXXV' : isError ? 'SECURITY BREACH DETECTED' : 'J.A.R.V.I.S. PROTOCOL'}
          </Typography>
        </Box>

        <Typography
          variant="body2"
          sx={{
            fontWeight: 700,
            color: '#f8fafc',
            lineHeight: 1.4,
            fontSize: '0.86rem',
            textShadow: `0 0 10px ${hudColor}60`,
          }}
        >
          {speechText ||
            (isSuccess
              ? '✨ JARVIS: Access Authorized. Powering up market algorithms, Mr. Stark!'
              : isError
              ? '🚨 JARVIS: Access Denied! Security protocol engaged. Invalid authorization.'
              : '🤖 JARVIS: Welcome back, Boss. Enter your Security PIN to activate terminal.')}
        </Typography>
      </Paper>

      {/* 🛡️ 3D HOVERING IRON MAN CONTAINER WITH ROTATING HUD RINGS */}
      <Box
        sx={{
          position: 'relative',
          width: 170,
          height: 170,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* 💥 SUCCESS SHOCKWAVE RADIATING RING */}
        {isSuccess && (
          <Box
            sx={{
              position: 'absolute',
              width: 160,
              height: 160,
              borderRadius: '50%',
              border: '3px solid #10b981',
              animation: 'shockwaveBurst 0.8s cubic-bezier(0.1, 0.9, 0.2, 1) infinite',
              '@keyframes shockwaveBurst': {
                '0%': { transform: 'scale(0.8)', opacity: 1 },
                '100%': { transform: 'scale(1.8)', opacity: 0 },
              },
            }}
          />
        )}

        {/* 🌀 OUTER ROTATING HOLOGRAPHIC HUD RING */}
        <Box
          sx={{
            position: 'absolute',
            width: 165,
            height: 165,
            borderRadius: '50%',
            border: `1.5px dashed ${hudColor}${isError ? 'aa' : '40'}`,
            animation: isSuccess
              ? 'rotateHUDFast 2s linear infinite'
              : isError
              ? 'rotateHUDErr 1s linear infinite'
              : 'rotateHUD 12s linear infinite',
            '@keyframes rotateHUDFast': {
              '0%': { transform: 'rotate(0deg)' },
              '100%': { transform: 'rotate(360deg)' },
            },
            '@keyframes rotateHUDErr': {
              '0%': { transform: 'rotate(0deg)' },
              '100%': { transform: 'rotate(-360deg)' },
            },
            '@keyframes rotateHUD': {
              '0%': { transform: 'rotate(0deg)' },
              '100%': { transform: 'rotate(360deg)' },
            },
          }}
        />

        {/* 🌀 INNER COUNTER-ROTATING RADAR RETICLE */}
        <Box
          sx={{
            position: 'absolute',
            width: 145,
            height: 145,
            borderRadius: '50%',
            borderTop: `2px solid ${hudColor}80`,
            borderBottom: `2px solid ${hudColor}80`,
            borderLeft: '2px solid transparent',
            borderRight: '2px solid transparent',
            animation: isSuccess ? 'rotateReverseFast 1.5s linear infinite' : 'rotateReverse 6s linear infinite',
            '@keyframes rotateReverseFast': {
              '0%': { transform: 'rotate(360deg)' },
              '100%': { transform: 'rotate(0deg)' },
            },
            '@keyframes rotateReverse': {
              '0%': { transform: 'rotate(360deg)' },
              '100%': { transform: 'rotate(0deg)' },
            },
          }}
        />

        {/* 🔥 DYNAMIC PLASMA THRUSTER GLOW BELOW HELMET */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 4,
            width: 65,
            height: 20,
            borderRadius: '50%',
            bgcolor: hudColor,
            filter: 'blur(12px)',
            opacity: isSuccess ? 0.95 : 0.7,
            animation: isSuccess
              ? 'thrusterBurnSuccess 0.3s infinite alternate'
              : 'thrusterPulse 1.2s infinite ease-in-out alternate',
            '@keyframes thrusterBurnSuccess': {
              '0%': { transform: 'scaleX(1.2) scaleY(1.4)', opacity: 0.8 },
              '100%': { transform: 'scaleX(1.8) scaleY(2)', opacity: 1 },
            },
            '@keyframes thrusterPulse': {
              '0%': { transform: 'scaleX(0.7) scaleY(0.8)', opacity: 0.4 },
              '100%': { transform: 'scaleX(1.3) scaleY(1.2)', opacity: 0.9 },
            },
          }}
        />

        {/* 🤖 3D HOVERING IRON MAN HELMET (WITH DYNAMIC MASK EFFECTS) */}
        <Box
          onClick={onMascotClick}
          sx={{
            cursor: 'pointer',
            position: 'relative',
            width: 125,
            height: 135,
            borderRadius: '24px',
            bgcolor: 'rgba(15, 23, 42, 0.75)',
            border: `2px solid ${hudColor}70`,
            boxShadow: isSuccess
              ? '0 0 60px rgba(16, 185, 129, 0.9), inset 0 0 25px rgba(16, 185, 129, 0.5)'
              : isError
              ? '0 0 50px rgba(239, 68, 68, 0.8), inset 0 0 20px rgba(239, 68, 68, 0.4)'
              : '0 0 35px rgba(0, 240, 255, 0.5), inset 0 0 15px rgba(0, 240, 255, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: isSuccess
              ? 'successMaskLeap 0.6s infinite alternate'
              : isError
              ? 'redAlertShake 0.4s ease-in-out infinite'
              : 'flightHover 3s infinite ease-in-out',
            transition: 'all 0.3s',
            '@keyframes redAlertShake': {
              '0%, 100%': { transform: 'translateX(0) rotate(0deg)' },
              '20%': { transform: 'translateX(-10px) rotate(-4deg)' },
              '40%': { transform: 'translateX(10px) rotate(4deg)' },
              '60%': { transform: 'translateX(-6px) rotate(-2deg)' },
              '80%': { transform: 'translateX(6px) rotate(2deg)' },
            },
            '@keyframes successMaskLeap': {
              '0%': { transform: 'scale(1) translateY(0px)' },
              '100%': { transform: 'scale(1.12) translateY(-14px)' },
            },
            '@keyframes flightHover': {
              '0%': { transform: 'translateY(0px) rotate(0deg)' },
              '25%': { transform: 'translateY(-6px) rotate(1.5deg)' },
              '50%': { transform: 'translateY(-12px) rotate(0deg)' },
              '75%': { transform: 'translateY(-6px) rotate(-1.5deg)' },
              '100%': { transform: 'translateY(0px) rotate(0deg)' },
            },
          }}
        >
          {/* EXACT MARVEL BLUEPRINT IRON MAN MARK 85 HELMET */}
          <svg viewBox="0 0 200 240" width="115" height="128">
            <defs>
              {/* Metallic Crimson Candy Shell */}
              <linearGradient id="ironCrimson" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={isError ? '#f87171' : '#f87171'} />
                <stop offset="25%" stopColor={isError ? '#ef4444' : '#ef4444'} />
                <stop offset="50%" stopColor={isError ? '#b91c1c' : '#dc2626'} />
                <stop offset="75%" stopColor={isError ? '#7f1d1d' : '#991b1b'} />
                <stop offset="100%" stopColor="#450a0a" />
              </linearGradient>

              {/* Dark Crimson Shadow Base */}
              <linearGradient id="ironCrimsonDark" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#991b1b" />
                <stop offset="100%" stopColor="#2e0505" />
              </linearGradient>

              {/* Stark 24K Polished Gold Faceplate */}
              <linearGradient id="ironGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={isSuccess ? '#dcfce7' : '#fffbeb'} />
                <stop offset="20%" stopColor={isSuccess ? '#86efac' : '#fef08a'} />
                <stop offset="45%" stopColor={isSuccess ? '#22c55e' : '#f59e0b'} />
                <stop offset="80%" stopColor={isSuccess ? '#15803d' : '#b45309'} />
                <stop offset="100%" stopColor="#78350f" />
              </linearGradient>

              {/* Gold Bevel Highlights */}
              <linearGradient id="goldBevel" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fde047" />
                <stop offset="50%" stopColor="#d97706" />
                <stop offset="100%" stopColor="#78350f" />
              </linearGradient>

              {/* Laser Arc Glow Filter */}
              <filter id="arcLaserGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation={isSuccess ? 6 : isError ? 5 : 3.5} result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* 1. OUTER RED HELMET SKULL DOME */}
            <path
              d="M 45 65 Q 40 20 100 15 Q 160 20 155 65 Q 165 110 150 170 L 132 195 L 68 195 L 50 170 Q 35 110 45 65 Z"
              fill="url(#ironCrimson)"
              stroke="#2e0505"
              strokeWidth="3"
            />

            {/* 2. FOREHEAD RIDGE & DIAMOND CREST */}
            <path
              d="M 70 30 L 100 40 L 130 30 L 126 50 L 100 58 L 74 50 Z"
              fill="url(#ironCrimsonDark)"
              stroke="#7f1d1d"
              strokeWidth="1.5"
            />
            <polygon points="100,20 106,32 100,42 94,32" fill={isError ? '#ef4444' : '#fca5a5'} opacity="0.8" />

            {/* 3. SIDE EAR PODS (CONCENTRIC STARK DISCS) */}
            <g>
              <ellipse cx="38" cy="115" rx="8" ry="22" fill="url(#ironGold)" stroke="#450a0a" strokeWidth="2" />
              <ellipse cx="38" cy="115" rx="4" ry="12" fill="#450a0a" />
              <ellipse cx="162" cy="115" rx="8" ry="22" fill="url(#ironGold)" stroke="#450a0a" strokeWidth="2" />
              <ellipse cx="162" cy="115" rx="4" ry="12" fill="#450a0a" />
            </g>

            {/* 4. THE ICONIC STARK GOLD FACEPLATE (OPENS UP ON SUCCESS) */}
            <g
              style={{
                transform: isSuccess ? 'translateY(-16px)' : 'translateY(0px)',
                transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            >
              {/* Top Brow & Nose Bridge */}
              <path
                d="M 52 70 L 100 60 L 148 70 L 144 112 L 135 145 L 125 178 L 100 188 L 75 178 L 65 145 L 56 112 Z"
                fill="url(#ironGold)"
                stroke="#78350f"
                strokeWidth="2.5"
              />

              {/* T-Brow Line & Angular Insets */}
              <path
                d="M 58 75 L 100 68 L 142 75 L 138 92 L 100 86 L 62 92 Z"
                fill="url(#goldBevel)"
                opacity="0.9"
              />

              {/* Cheek Recessed Carbon Shadow Chambers */}
              <polygon points="56,112 76,120 74,152 65,145" fill="#78350f" opacity="0.6" />
              <polygon points="144,112 124,120 126,152 135,145" fill="#78350f" opacity="0.6" />

              {/* Cheek Air Intake Vents */}
              <line x1="68" y1="126" x2="74" y2="146" stroke="#450a0a" strokeWidth="2" strokeLinecap="round" />
              <line x1="132" y1="126" x2="126" y2="146" stroke="#450a0a" strokeWidth="2" strokeLinecap="round" />

              {/* Nose Bridge Taper */}
              <polygon points="96,86 104,86 102,118 98,118" fill="#b45309" opacity="0.7" />

              {/* 5. MOUTH & CHIN NOTCH PLATE */}
              <polygon
                points="78,162 100,156 122,162 116,182 100,186 84,182"
                fill="url(#ironCrimsonDark)"
                stroke="#450a0a"
                strokeWidth="2"
              />
              <line x1="88" y1="168" x2="112" y2="168" stroke="#fca5a5" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
              <line x1="92" y1="174" x2="108" y2="174" stroke="#fca5a5" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />

              {/* 6. ⚡ GLOWING SLIT ARC LASER EYES */}
              <polygon points="64,98 94,106 93,114 65,106" fill="#0f172a" />
              <polygon points="136,98 106,106 107,114 135,106" fill="#0f172a" />

              {/* Cyan / Green / Red Laser Glow Filter */}
              <g filter="url(#arcLaserGlow)">
                {/* Left Eye Slit */}
                <polygon
                  points="66,101 92,108 90,112 67,105"
                  fill={eyeColor}
                  stroke="#ffffff"
                  strokeWidth="1.2"
                />
                {/* Right Eye Slit */}
                <polygon
                  points="134,101 108,108 110,112 133,105"
                  fill={eyeColor}
                  stroke="#ffffff"
                  strokeWidth="1.2"
                />
              </g>

              {/* Laser Core Center */}
              <polygon points="69,103 89,108 88,110 70,105" fill="#ffffff" />
              <polygon points="131,103 111,108 112,110 130,105" fill="#ffffff" />
            </g>
          </svg>

          {/* Mini Arc Reactor Core Pulse */}
          <Box
            sx={{
              position: 'absolute',
              bottom: -7,
              bgcolor: 'rgba(15, 23, 42, 0.95)',
              border: `2px solid ${hudColor}`,
              color: hudColor,
              borderRadius: '50%',
              width: 24,
              height: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 0 15px ${hudColor}`,
              animation: isSuccess
                ? 'reactorSuccessBurst 0.4s infinite alternate'
                : 'reactorGlow 1.5s infinite ease-in-out alternate',
              '@keyframes reactorSuccessBurst': {
                '0%': { transform: 'scale(1)', boxShadow: '0 0 15px #10b981' },
                '100%': { transform: 'scale(1.4)', boxShadow: '0 0 35px #10b981' },
              },
              '@keyframes reactorGlow': {
                '0%': { transform: 'scale(0.9)', boxShadow: `0 0 8px ${hudColor}` },
                '100%': { transform: 'scale(1.2)', boxShadow: `0 0 22px ${hudColor}` },
              },
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: hudColor,
                boxShadow: `0 0 10px ${hudColor}`,
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* High-Tech Terminal Tag */}
      <Typography
        variant="caption"
        sx={{
          mt: 2,
          fontWeight: 800,
          fontFamily: 'monospace',
          letterSpacing: '0.12em',
          color: hudColor,
          fontSize: '0.72rem',
          textShadow: `0 0 10px ${hudColor}50`,
        }}
      >
        {isSuccess ? '✨ STARK SYSTEM ONLINE • ACCESS 100%' : isError ? '⚠️ LOCKDOWN ENGAGED • RETRY AUTH' : 'MARK LXXXV • STARK SECURITY HUD'}
      </Typography>
    </Box>
  );
};

export default IronManMascot;
