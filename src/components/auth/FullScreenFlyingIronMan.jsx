import { Box } from '@mui/material';

/**
 * High-Precision Full-Screen Flying Iron Man (Mark LXXXV Supersonic Flight)
 * True-to-movie flight pose with chest arc reactor, repulsor blast gloves, and boot plasma trails.
 */
export const FullScreenFlyingIronMan = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      {/* 🚀 PRIMARY SUPERSONIC FLYING IRON MAN (PATROL FLIGHT) */}
      <Box
        sx={{
          position: 'absolute',
          width: 170,
          height: 100,
          animation: 'supersonicPatrol 16s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          filter: 'drop-shadow(0 0 25px rgba(0, 240, 255, 0.8))',
          '@keyframes supersonicPatrol': {
            '0%': {
              top: '15%',
              left: '-20%',
              transform: 'scale(0.85) rotate(15deg)',
            },
            '25%': {
              top: '30%',
              left: '40%',
              transform: 'scale(1.15) rotate(6deg)',
            },
            '45%': {
              top: '75%',
              left: '85%',
              transform: 'scale(0.95) rotate(22deg)',
            },
            '50%': {
              top: '80%',
              left: '110%',
              transform: 'scale(0.8) rotate(10deg)',
            },
            '55%': {
              top: '75%',
              left: '110%',
              transform: 'scale(0.8) scaleX(-1) rotate(-15deg)',
            },
            '75%': {
              top: '25%',
              left: '55%',
              transform: 'scale(1.1) scaleX(-1) rotate(-8deg)',
            },
            '92%': {
              top: '12%',
              left: '10%',
              transform: 'scale(0.9) scaleX(-1) rotate(-18deg)',
            },
            '100%': {
              top: '15%',
              left: '-20%',
              transform: 'scale(0.85) rotate(15deg)',
            },
          },
        }}
      >
        {/* Supersonic Plasma Jet Flame */}
        <Box
          sx={{
            position: 'absolute',
            left: -65,
            top: '46%',
            transform: 'translateY(-50%)',
            width: 85,
            height: 22,
            borderRadius: '50%',
            background: 'linear-gradient(to left, #00f0ff, #f59e0b, rgba(239, 68, 68, 0.5), transparent)',
            filter: 'blur(5px)',
            animation: 'thrusterBurn 0.25s infinite alternate',
            '@keyframes thrusterBurn': {
              '0%': { width: 65, opacity: 0.75 },
              '100%': { width: 105, opacity: 1 },
            },
          }}
        />

        {/* Cinematic Vector Flying Iron Man Armor */}
        <svg viewBox="0 0 200 110" width="170" height="100">
          <defs>
            <linearGradient id="flightCrimson" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f87171" />
              <stop offset="30%" stopColor="#dc2626" />
              <stop offset="70%" stopColor="#991b1b" />
              <stop offset="100%" stopColor="#450a0a" />
            </linearGradient>

            <linearGradient id="flightGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fffbeb" />
              <stop offset="30%" stopColor="#fde047" />
              <stop offset="60%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>

            <filter id="laserBeamGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 1. Extended Aerodynamic Torso & Legs */}
          <path
            d="M 15 55 L 45 40 L 95 42 L 140 46 L 155 52 L 140 60 L 95 65 L 45 68 Z"
            fill="url(#flightCrimson)"
            stroke="#450a0a"
            strokeWidth="2"
          />

          {/* 2. Stark Gold Thigh & Flank Armor */}
          <polygon points="50,42 85,44 85,62 50,65" fill="url(#flightGold)" stroke="#78350f" strokeWidth="1.2" />

          {/* 3. Chest & Shoulder Plate */}
          <polygon points="95,40 135,44 135,62 95,66" fill="url(#flightGold)" stroke="#78350f" strokeWidth="1.5" />

          {/* 4. Forward Extended Right Arm with Repulsor Glove */}
          <path d="M 130,44 L 180,48 L 184,54 L 130,58 Z" fill="url(#flightCrimson)" stroke="#450a0a" strokeWidth="1.5" />
          {/* Hand Repulsor Blast */}
          <circle cx="184" cy="51" r="5" fill="#00f0ff" filter="url(#laserBeamGlow)" />
          <circle cx="184" cy="51" r="2" fill="#ffffff" />

          {/* 5. Mark 85 Helmet in Supersonic Profile */}
          <ellipse cx="146" cy="46" rx="16" ry="12" fill="url(#flightCrimson)" stroke="#450a0a" strokeWidth="1.5" />
          <polygon points="140,41 158,43 154,51 138,48" fill="url(#flightGold)" stroke="#78350f" strokeWidth="1" />
          {/* Slit Laser Eye */}
          <line x1="144" y1="45" x2="154" y2="46" stroke="#00f0ff" strokeWidth="2.5" filter="url(#laserBeamGlow)" />

          {/* 6. Glowing Chest Arc Reactor */}
          <circle cx="115" cy="53" r="6" fill="#00f0ff" filter="url(#laserBeamGlow)" />
          <circle cx="115" cy="53" r="2.5" fill="#ffffff" />

          {/* 7. Back Nano-Stabilizer Aerodynamic Flaps */}
          <polygon points="65,38 90,24 96,40" fill="url(#flightCrimson)" stroke="#450a0a" strokeWidth="1.2" />
          <polygon points="65,68 90,82 96,66" fill="url(#flightCrimson)" stroke="#450a0a" strokeWidth="1.2" />

          {/* 8. Boot Dual Repulsor Nozzles */}
          <ellipse cx="15" cy="55" rx="4" ry="10" fill="#00f0ff" filter="url(#laserBeamGlow)" />
        </svg>
      </Box>

      {/* 🚀 SECONDARY HIGH-ALTITUDE PATROL IN BACKGROUND */}
      <Box
        sx={{
          position: 'absolute',
          width: 90,
          height: 60,
          opacity: 0.6,
          animation: 'highAltPatrol 22s linear infinite',
          filter: 'drop-shadow(0 0 15px rgba(245, 158, 11, 0.7))',
          '@keyframes highAltPatrol': {
            '0%': {
              bottom: '-10%',
              right: '20%',
              transform: 'scale(0.55) rotate(-30deg)',
            },
            '40%': {
              bottom: '55%',
              right: '65%',
              transform: 'scale(0.7) rotate(-40deg)',
            },
            '75%': {
              bottom: '95%',
              right: '30%',
              transform: 'scale(0.55) rotate(-55deg)',
            },
            '100%': {
              bottom: '115%',
              right: '-10%',
              transform: 'scale(0.45) rotate(-40deg)',
            },
          },
        }}
      >
        <Box
          sx={{
            width: 45,
            height: 12,
            borderRadius: '50%',
            background: 'linear-gradient(to left, #f59e0b, transparent)',
            filter: 'blur(3px)',
            position: 'absolute',
            left: -30,
            top: 24,
          }}
        />
        <svg viewBox="0 0 200 110" width="90" height="60">
          <path d="M 15 55 L 45 40 L 95 42 L 140 46 L 155 52 L 140 60 L 95 65 L 45 68 Z" fill="#b91c1c" />
          <polygon points="95,40 135,44 135,62 95,66" fill="#f59e0b" />
          <circle cx="115" cy="53" r="6" fill="#00f0ff" />
          <line x1="144" y1="45" x2="154" y2="46" stroke="#ffffff" strokeWidth="3" />
        </svg>
      </Box>
    </Box>
  );
};

export default FullScreenFlyingIronMan;
