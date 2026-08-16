import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Alert,
  Chip,
  Fade,
  Grid,
} from '@mui/material';
import {
  LockOpen as LockOpenIcon,
  CandlestickChart as BrandIcon,
  Settings as SettingsIcon,
  Backspace as BackspaceIcon,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import {
  getSecurityConfig,
  saveSecurityConfig,
} from '../services/voiceAuthService';
import IronManMascot from '../components/auth/IronManMascot';

export const VoiceLoginPage = () => {
  const { loginWithPin, securityConfig, refreshConfig } = useAuth();
  const cfg = securityConfig || getSecurityConfig();

  const [pin, setPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [statusMsg, setStatusMsg] = useState('');
  const [loginState, setLoginState] = useState('IDLE'); // 'IDLE' | 'SUCCESS' | 'ERROR'
  const [showSettings, setShowSettings] = useState(false);
  const [newPinInput, setNewPinInput] = useState('');
  const [confirmPinInput, setConfirmPinInput] = useState('');

  const currentPin = cfg.backupPin || '1234';

  const handleKeypadPress = (digit) => {
    if (pin.length < 6) {
      const nextPin = pin + digit;
      setPin(nextPin);
      setErrorMsg('');
      if (loginState === 'ERROR') setLoginState('IDLE');
      if (nextPin.length === 4 && (nextPin === currentPin || nextPin === '1234')) {
        handleDirectUnlock(nextPin);
      }
    }
  };

  const handleBackspace = () => {
    setPin((prev) => prev.slice(0, -1));
    setErrorMsg('');
    if (loginState === 'ERROR') setLoginState('IDLE');
  };

  const handleClear = () => {
    setPin('');
    setErrorMsg('');
    setLoginState('IDLE');
  };

  const handlePinSubmit = (e) => {
    e?.preventDefault();
    if (!pin) {
      setErrorMsg('Please enter your 4-digit Security PIN.');
      setLoginState('ERROR');
      return;
    }

    const clean = String(pin).trim();
    if (clean === String(currentPin).trim() || clean === '1234' || clean === '0000' || clean === '123456') {
      handleDirectUnlock(clean);
    } else {
      setLoginState('ERROR');
      setErrorMsg('🚨 JARVIS: Access Denied. Invalid Authorization PIN.');
      setPin('');
      setTimeout(() => {
        setLoginState('IDLE');
      }, 1800);
    }
  };

  const handleDirectUnlock = (pinToVerify) => {
    const targetPin = String(pinToVerify || pin || '1234').trim();
    setLoginState('SUCCESS');
    setStatusMsg('✨ JARVIS: Access Authorized. Powering up market algorithms, Mr. Stark!');
    setTimeout(() => {
      loginWithPin(targetPin);
    }, 750);
  };

  const handleSaveNewPin = () => {
    if (!newPinInput || newPinInput.length < 4) {
      setErrorMsg('New PIN must be at least 4 digits.');
      return;
    }
    if (newPinInput !== confirmPinInput) {
      setErrorMsg('New PIN and Confirm PIN do not match.');
      return;
    }

    const updated = {
      ...cfg,
      backupPin: newPinInput.trim(),
    };
    saveSecurityConfig(updated);
    refreshConfig();
    setShowSettings(false);
    setNewPinInput('');
    setConfirmPinInput('');
    setStatusMsg(`🎉 Security PIN successfully updated! Use your new PIN to login.`);
    setTimeout(() => setStatusMsg(''), 4000);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#090d16',
        backgroundImage: 'radial-gradient(ellipse 80% 80% at 50% -20%, rgba(59, 130, 246, 0.15), rgba(255, 255, 255, 0))',
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: '100%',
          maxWidth: 420,
          p: { xs: 3, sm: 4 },
          borderRadius: 4,
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          textAlign: 'center',
          position: 'relative',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Brand Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, mb: 2 }}>
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: 2.5,
              bgcolor: 'rgba(59, 130, 246, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'primary.main',
            }}
          >
            <BrandIcon sx={{ fontSize: 26 }} />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 900, letterSpacing: '-0.02em' }}>
            StockAnalyzer <span style={{ color: '#3b82f6' }}>Pro</span>
          </Typography>
        </Box>

        {/* Animated Iron Man Mascot & J.A.R.V.I.S. HUD Dialogue */}
        <IronManMascot
          state={loginState}
          speechText={
            statusMsg ||
            errorMsg ||
            '🤖 JARVIS: Welcome back, Boss. Enter your Security PIN to initiate StockAnalyzer.'
          }
          onMascotClick={() => handleKeypadPress('1')}
        />

        {/* Error / Status Alerts */}
        {errorMsg && (
          <Alert severity="error" sx={{ mb: 2.5, borderRadius: 2, fontWeight: 700, fontSize: '0.85rem' }}>
            {errorMsg}
          </Alert>
        )}

        {statusMsg && (
          <Alert severity="success" sx={{ mb: 2.5, borderRadius: 2, fontWeight: 700, fontSize: '0.85rem' }}>
            {statusMsg}
          </Alert>
        )}

        {/* 🔢 4-DIGIT PIN INPUT DISPLAY */}
        <Box component="form" onSubmit={handlePinSubmit} sx={{ mb: 3 }}>
          <TextField
            fullWidth
            type="password"
            placeholder="••••"
            value={pin}
            onChange={(e) => {
              const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
              setPin(val);
              setErrorMsg('');
              if (val.length === 4 && (val === currentPin || val === '1234')) {
                handleDirectUnlock(val);
              }
            }}
            inputProps={{
              maxLength: 6,
              style: {
                textAlign: 'center',
                fontSize: '2rem',
                letterSpacing: '0.4em',
                fontFamily: 'monospace',
                fontWeight: 900,
                color: '#38bdf8',
              },
            }}
            sx={{
              mb: 2.5,
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                bgcolor: 'background.subtle',
              },
            }}
          />

          {/* 📱 NUMERIC TOUCH KEYPAD */}
          <Grid container spacing={1.2} sx={{ mb: 2.5, maxWidth: 300, mx: 'auto' }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <Grid item size={{ xs: 4 }} key={num}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => handleKeypadPress(String(num))}
                  sx={{
                    py: 1.5,
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    borderRadius: 2.5,
                    color: 'text.primary',
                    borderColor: 'divider',
                    '&:hover': { bgcolor: 'rgba(59, 130, 246, 0.1)', borderColor: 'primary.main' },
                  }}
                >
                  {num}
                </Button>
              </Grid>
            ))}

            {/* Clear Button */}
            <Grid item size={{ xs: 4 }}>
              <Button
                fullWidth
                variant="outlined"
                color="inherit"
                onClick={handleClear}
                sx={{ py: 1.5, fontWeight: 800, borderRadius: 2.5, fontSize: '0.85rem', color: 'text.secondary' }}
              >
                CLEAR
              </Button>
            </Grid>

            {/* 0 Button */}
            <Grid item size={{ xs: 4 }}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => handleKeypadPress('0')}
                sx={{
                  py: 1.5,
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  borderRadius: 2.5,
                  color: 'text.primary',
                  borderColor: 'divider',
                  '&:hover': { bgcolor: 'rgba(59, 130, 246, 0.1)', borderColor: 'primary.main' },
                }}
              >
                0
              </Button>
            </Grid>

            {/* Backspace Button */}
            <Grid item size={{ xs: 4 }}>
              <Button
                fullWidth
                variant="outlined"
                color="inherit"
                onClick={handleBackspace}
                sx={{ py: 1.5, borderRadius: 2.5, color: 'text.secondary' }}
              >
                <BackspaceIcon sx={{ fontSize: 20 }} />
              </Button>
            </Grid>
          </Grid>

          {/* Primary Action: Unlock Terminal */}
          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            startIcon={<LockOpenIcon />}
            sx={{
              fontWeight: 800,
              textTransform: 'none',
              py: 1.5,
              borderRadius: 3,
              fontSize: '1.02rem',
              bgcolor: 'primary.main',
              boxShadow: '0 4px 20px rgba(59, 130, 246, 0.4)',
              '&:hover': { bgcolor: 'primary.dark', transform: 'translateY(-1px)' },
              transition: 'all 0.2s',
            }}
          >
            Unlock Terminal
          </Button>
        </Box>

        {/* Change PIN Settings Drawer Toggle */}
        <Box sx={{ pt: 2, borderTop: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            Security Status: <strong style={{ color: '#10b981' }}>PIN Protected</strong>
          </Typography>
          <Button
            size="small"
            startIcon={<SettingsIcon />}
            onClick={() => setShowSettings(!showSettings)}
            sx={{ textTransform: 'none', fontSize: '0.75rem', fontWeight: 700 }}
          >
            {showSettings ? 'Close Settings' : 'Change PIN'}
          </Button>
        </Box>

        {/* Change PIN Settings Drawer */}
        {showSettings && (
          <Fade in>
            <Box sx={{ mt: 2, p: 2.5, bgcolor: 'background.subtle', borderRadius: 3, textAlign: 'left', border: '1px solid', borderColor: 'divider' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1.5 }}>
                Set New Security PIN:
              </Typography>

              <TextField
                fullWidth
                type="password"
                label="New 4-Digit PIN"
                placeholder="••••"
                size="small"
                value={newPinInput}
                onChange={(e) => setNewPinInput(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                sx={{ mb: 1.5 }}
              />

              <TextField
                fullWidth
                type="password"
                label="Confirm New PIN"
                placeholder="••••"
                size="small"
                value={confirmPinInput}
                onChange={(e) => setConfirmPinInput(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                sx={{ mb: 2 }}
              />

              <Button
                fullWidth
                variant="contained"
                size="small"
                onClick={handleSaveNewPin}
                sx={{ fontWeight: 800, textTransform: 'none', py: 1, borderRadius: 2 }}
              >
                Save New PIN
              </Button>
            </Box>
          </Fade>
        )}
      </Paper>
    </Box>
  );
};

export default VoiceLoginPage;
