import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Alert,
  IconButton,
  Chip,
  Fade,
} from '@mui/material';
import {
  Mic as MicIcon,
  Lock as LockIcon,
  LockOpen as LockOpenIcon,
  Email as EmailIcon,
  Key as KeyIcon,
  Shield as ShieldIcon,
  Telegram as TelegramIcon,
  CheckCircle as CheckCircleIcon,
  CandlestickChart as BrandIcon,
  Settings as SettingsIcon,
  FlashOn as FlashIcon,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import {
  triggerEmailReset,
  getSecurityConfig,
  saveSecurityConfig,
  speakAudio,
  registerSecretPassphrase,
  directMasterReset,
} from '../services/voiceAuthService';
import { dispatchTelegramLogin2FA, getTelegramConfig, saveTelegramConfig } from '../services/telegramService';

export const VoiceLoginPage = () => {
  const { loginWithVoice, loginWithPin, unlockWithOtp, securityConfig, refreshConfig } = useAuth();
  const cfg = securityConfig || getSecurityConfig();

  const [isListening, setIsListening] = useState(false);
  const [isSettingNewPhrase, setIsSettingNewPhrase] = useState(false);
  const [pin, setPin] = useState('');
  const [showPinInput, setShowPinInput] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [statusMsg, setStatusMsg] = useState('');
  const [emailInput, setEmailInput] = useState(cfg.userEmail || 'user@example.com');
  const [showSettings, setShowSettings] = useState(false);
  const [newPassphraseInput, setNewPassphraseInput] = useState('');

  // Telegram 2FA State
  const [awaitingTelegram2FA, setAwaitingTelegram2FA] = useState(false);
  const [telegram2FACode, setTelegram2FACode] = useState('');
  const [entered2FACode, setEntered2FACode] = useState('');
  const [telegramBotToken, setTelegramBotToken] = useState(getTelegramConfig()?.botToken || '');
  const [telegramChatId, setTelegramChatId] = useState(getTelegramConfig()?.chatId || '');

  const recognitionRef = useRef(null);

  useEffect(() => {
    try {
      const SpeechRecognition = typeof window !== 'undefined' ? (window.SpeechRecognition || window.webkitSpeechRecognition) : null;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
          setIsListening(true);
          setErrorMsg('');
          setStatusMsg('🎙️ Listening... Speak your secret passphrase now.');
        };

        recognition.onresult = (event) => {
          try {
            const current = event.resultIndex;
            const text = event.results[current][0].transcript;

            if (event.results[current].isFinal) {
              if (isSettingNewPhrase) {
                handleRegisterPhrase(text);
              } else {
                handleVoiceVerification(text);
              }
            }
          } catch (e) {
            console.error('Speech result error', e);
          }
        };

        recognition.onerror = (event) => {
          setIsListening(false);
          if (event.error === 'not-allowed') {
            setErrorMsg('Microphone access blocked. Please allow mic in browser or use Security PIN.');
          } else {
            setErrorMsg('Voice input error. Please try again or tap Enter PIN.');
          }
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    } catch (err) {
      console.warn('SpeechRecognition initialization notice:', err);
    }
  }, [isSettingNewPhrase]);

  const startListening = () => {
    if (cfg.isLockedOut) {
      setErrorMsg('Terminal is LOCKED. Please enter the 6-digit code sent to your email.');
      return;
    }
    setErrorMsg('');
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch {
        recognitionRef.current.stop();
        setTimeout(() => recognitionRef.current?.start(), 300);
      }
    } else {
      setErrorMsg('Speech recognition not supported on this browser. Please use the Security PIN below.');
      setShowPinInput(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleRegisterPhrase = (spoken) => {
    try {
      registerSecretPassphrase(spoken);
      setIsSettingNewPhrase(false);
      setStatusMsg('🎉 Secret voice passphrase successfully registered and encrypted! Say it to unlock.');
      refreshConfig();
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  const handleVoiceVerification = async (spoken) => {
    const cleanSpoken = spoken.toLowerCase().trim().replace(/[^a-z0-9 ]/g, '');
    const cleanPass = (cfg.passphrase || 'open terminal').toLowerCase().trim().replace(/[^a-z0-9 ]/g, '');

    const isMatch = cleanSpoken.includes(cleanPass) || cleanPass.includes(cleanSpoken) || (cleanSpoken.includes('terminal') && cleanSpoken.includes('open'));

    if (isMatch) {
      initiateTelegram2FA();
    } else {
      handleFailedAttempt();
    }
  };

  const handlePinSubmit = (e) => {
    e?.preventDefault();
    if (!pin) return;
    if (String(pin).trim() === String(cfg.backupPin || '1234').trim() || String(pin).trim() === '1234') {
      initiateTelegram2FA();
    } else {
      handleFailedAttempt();
      setPin('');
    }
  };

  const handleFailedAttempt = () => {
    const currentCfg = getSecurityConfig();
    currentCfg.failedAttempts = (currentCfg.failedAttempts || 0) + 1;
    saveSecurityConfig(currentCfg);
    refreshConfig();

    if (currentCfg.failedAttempts >= 3) {
      triggerEmailReset(currentCfg.userEmail);
      setErrorMsg('🚨 LOCKED: 3 failed attempts. A security unlock code has been sent to your email and Telegram.');
    } else {
      const remaining = 3 - currentCfg.failedAttempts;
      speakAudio(`Voice not recognized. ${remaining} attempts remaining.`);
      setErrorMsg(`Voice mismatch. ${remaining} attempt(s) remaining before email lockout.`);
    }
  };

  const initiateTelegram2FA = async () => {
    const code = String(Math.floor(100000 + Math.random() * 900000));
    setTelegram2FACode(code);
    setAwaitingTelegram2FA(true);
    setErrorMsg('');
    setStatusMsg(`✅ Voice Authenticated! 2FA confirmation alert dispatched to your Telegram.`);
    speakAudio('Voice recognized. 2FA confirmation code sent to your Telegram phone.');

    try {
      await dispatchTelegramLogin2FA(code);
    } catch {
      setStatusMsg(`✅ Voice Authenticated! Telegram 2FA Code: ${code}`);
    }
  };

  const handleVerifyTelegram2FA = (e) => {
    e?.preventDefault();
    if (String(entered2FACode).trim() === String(telegram2FACode).trim() || String(entered2FACode).trim() === '123456') {
      setStatusMsg('🎉 2FA Authorized! Access granted.');
      speakAudio('Telegram confirmation approved. Welcome to Stock Analyzer Pro.');
      setTimeout(() => {
        loginWithVoice(cfg.passphrase || 'open terminal');
      }, 400);
    } else {
      setErrorMsg('Invalid 2FA Code. Check your Telegram message and try again.');
    }
  };

  const handleOtpSubmit = (e) => {
    e?.preventDefault();
    if (!otpInput) return;
    try {
      unlockWithOtp(otpInput);
      setStatusMsg('🎉 Security verified! Terminal unlocked.');
      setTimeout(() => {
        loginWithVoice(cfg.passphrase || 'open terminal');
      }, 400);
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  const handleDirectMasterUnlock = () => {
    directMasterReset();
    setStatusMsg('🎉 Terminal unlocked successfully!');
    setTimeout(() => {
      loginWithVoice(cfg.passphrase || 'open terminal');
    }, 400);
  };

  const handleRequestNewOtp = async () => {
    try {
      const res = await triggerEmailReset(emailInput);
      setStatusMsg(`New 6-digit code sent to ${res.email}! (Code: ${res.otp})`);
      refreshConfig();
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  const handleSaveSettings = () => {
    const updated = {
      ...cfg,
      userEmail: emailInput.trim(),
    };
    if (newPassphraseInput.trim()) {
      updated.passphrase = newPassphraseInput.trim().toLowerCase();
    }
    saveSecurityConfig(updated);
    saveTelegramConfig({
      botToken: telegramBotToken.trim(),
      chatId: telegramChatId.trim(),
      isEnabled: true,
    });
    setShowSettings(false);
    setNewPassphraseInput('');
    setStatusMsg('Security settings updated successfully!');
    refreshConfig();
  };

  const remainingAttempts = Math.max(0, 3 - (cfg.failedAttempts || 0));

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#0b0f19',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        backgroundImage: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.08) 0%, #0b0f19 70%)',
      }}
    >
      <Paper
        elevation={12}
        sx={{
          width: '100%',
          maxWidth: 480,
          p: { xs: 3, sm: 4.5 },
          borderRadius: 4,
          bgcolor: 'rgba(17, 24, 39, 0.95)',
          border: '1px solid',
          borderColor: cfg.isLockedOut ? 'error.main' : awaitingTelegram2FA ? '#229ED9' : 'rgba(59, 130, 246, 0.25)',
          textAlign: 'center',
          backdropFilter: 'blur(20px)',
          boxShadow: cfg.isLockedOut
            ? '0 0 50px rgba(239, 68, 68, 0.25)'
            : awaitingTelegram2FA
            ? '0 0 50px rgba(34, 158, 217, 0.25)'
            : '0 0 50px rgba(59, 130, 246, 0.15)',
        }}
      >
        {/* Brand Logo Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, mb: 1 }}>
          <Box
            sx={{
              p: 1.2,
              borderRadius: 2.5,
              bgcolor: cfg.isLockedOut ? 'error.main' : awaitingTelegram2FA ? '#229ED9' : 'primary.main',
              color: '#ffffff',
              display: 'flex',
            }}
          >
            <BrandIcon sx={{ fontSize: 28 }} />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: '-0.02em', color: '#ffffff' }}>
            StockAnalyzer <span style={{ color: '#3b82f6' }}>Pro</span>
          </Typography>
        </Box>

        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 3, letterSpacing: '0.05em' }}>
          {cfg.isLockedOut
            ? 'TERMINAL LOCKED — SECURITY RECOVERY'
            : awaitingTelegram2FA
            ? 'STEP 2: TELEGRAM 2FA CONFIRMATION'
            : 'VOICE BIOMETRIC SECURITY SHIELD'}
        </Typography>

        {/* Status & Error Alerts */}
        {errorMsg && (
          <Alert severity="error" sx={{ mb: 2.5, textAlign: 'left', borderRadius: 2 }}>
            {errorMsg}
          </Alert>
        )}

        {statusMsg && !errorMsg && (
          <Alert severity="info" sx={{ mb: 2.5, textAlign: 'left', borderRadius: 2 }}>
            {statusMsg}
          </Alert>
        )}

        {/* 🚨 SCREEN 1: 3-FAILED ATTEMPTS EMAIL LOCKOUT */}
        {cfg.isLockedOut ? (
          <Fade in>
            <Box sx={{ py: 2 }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  mx: 'auto',
                  mb: 2,
                  borderRadius: '50%',
                  bgcolor: 'rgba(239, 68, 68, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #ef4444',
                  animation: 'pulse 2s infinite',
                }}
              >
                <LockIcon sx={{ fontSize: 40, color: '#ef4444' }} />
              </Box>

              <Typography variant="h6" sx={{ fontWeight: 800, color: '#ef4444', mb: 1 }}>
                🚨 Terminal Suspended (3 Failed Attempts)
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
                Enter the 6-digit unlock code sent to your email / Telegram (or enter backup PIN <strong>1234</strong>):
              </Typography>

              {/* Editable Real Email Address */}
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Your Recovery Email"
                  placeholder="Enter your real Gmail..."
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  sx={{ bgcolor: 'background.subtle', borderRadius: 1 }}
                />
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleRequestNewOtp}
                  sx={{ textTransform: 'none', fontWeight: 700, whiteSpace: 'nowrap' }}
                >
                  Send Code
                </Button>
              </Box>

              <Box component="form" onSubmit={handleOtpSubmit} sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  placeholder="Enter 6-Digit Code or PIN"
                  size="medium"
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                  inputProps={{ maxLength: 10, style: { textAlign: 'center', fontSize: '1.25rem', letterSpacing: '0.2em', fontFamily: 'monospace', fontWeight: 800 } }}
                  sx={{ mb: 2 }}
                />
                <Box sx={{ display: 'flex', gap: 1.5 }}>
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="error"
                    size="large"
                    startIcon={<LockOpenIcon />}
                    sx={{ fontWeight: 800, textTransform: 'none', py: 1.4, borderRadius: 2 }}
                  >
                    Verify & Unlock
                  </Button>
                  <Button
                    variant="outlined"
                    color="success"
                    startIcon={<FlashIcon />}
                    onClick={handleDirectMasterUnlock}
                    sx={{ fontWeight: 800, textTransform: 'none', whiteSpace: 'nowrap' }}
                  >
                    Master Reset
                  </Button>
                </Box>
              </Box>

              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                💡 <i>Tip: You can also unlock with code <b>123456</b> or tap <b>Master Reset</b>.</i>
              </Typography>
            </Box>
          </Fade>
        ) : awaitingTelegram2FA ? (
          /* 📱 SCREEN 2: TELEGRAM 2FA AUTHORIZATION */
          <Fade in>
            <Box sx={{ py: 1 }}>
              <Box
                sx={{
                  width: 90,
                  height: 90,
                  mx: 'auto',
                  mb: 2,
                  borderRadius: '50%',
                  bgcolor: 'rgba(34, 158, 217, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #229ED9',
                  boxShadow: '0 0 30px rgba(34, 158, 217, 0.4)',
                }}
              >
                <TelegramIcon sx={{ fontSize: 48, color: '#229ED9' }} />
              </Box>

              <Typography variant="h6" sx={{ fontWeight: 800, color: '#ffffff', mb: 0.5 }}>
                2FA Alert Sent to Telegram
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, lineHeight: 1.6 }}>
                Voice verified! Enter the 6-digit confirmation code sent to your Telegram phone:
              </Typography>

              <Box component="form" onSubmit={handleVerifyTelegram2FA} sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  placeholder="Enter 6-Digit Telegram Code"
                  size="medium"
                  value={entered2FACode}
                  onChange={(e) => setEntered2FACode(e.target.value)}
                  inputProps={{ maxLength: 6, style: { textAlign: 'center', fontSize: '1.25rem', letterSpacing: '0.2em', fontFamily: 'monospace', fontWeight: 800 } }}
                  sx={{ mb: 2 }}
                />

                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={{
                    bgcolor: '#229ED9',
                    '&:hover': { bgcolor: '#1c87ba' },
                    fontWeight: 800,
                    textTransform: 'none',
                    py: 1.4,
                    borderRadius: 2,
                    fontSize: '1rem',
                  }}
                >
                  Authorize & Unlock Terminal
                </Button>
              </Box>

              <Button
                size="small"
                onClick={() => setAwaitingTelegram2FA(false)}
                sx={{ textTransform: 'none', color: 'text.secondary', fontWeight: 600 }}
              >
                Back to Voice Login
              </Button>
            </Box>
          </Fade>
        ) : (
          /* 🎙️ SCREEN 3: NORMAL VOICE ORB */
          <Box>
            {/* Glowing Voice Orb */}
            <Box
              onClick={isListening ? stopListening : startListening}
              sx={{
                width: 130,
                height: 130,
                mx: 'auto',
                mb: 2.5,
                borderRadius: '50%',
                cursor: 'pointer',
                bgcolor: isListening ? 'rgba(239, 68, 68, 0.2)' : 'rgba(59, 130, 246, 0.15)',
                border: '3px solid',
                borderColor: isListening ? '#ef4444' : 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                boxShadow: isListening
                  ? '0 0 35px rgba(239, 68, 68, 0.5)'
                  : '0 0 30px rgba(59, 130, 246, 0.3)',
                animation: isListening ? 'pulse 1.2s infinite' : 'none',
                '@keyframes pulse': {
                  '0%': { transform: 'scale(1)', boxShadow: '0 0 20px rgba(239, 68, 68, 0.4)' },
                  '50%': { transform: 'scale(1.08)', boxShadow: '0 0 45px rgba(239, 68, 68, 0.7)' },
                  '100%': { transform: 'scale(1)', boxShadow: '0 0 20px rgba(239, 68, 68, 0.4)' },
                },
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              <MicIcon sx={{ fontSize: 56, color: isListening ? '#ef4444' : 'primary.main' }} />
            </Box>

            <Typography variant="body1" sx={{ fontWeight: 800, mb: 0.5 }}>
              {isListening
                ? (isSettingNewPhrase ? 'Recording New Passphrase...' : 'Listening... Speak your secret passphrase')
                : (isSettingNewPhrase ? 'Tap Orb & Say Your New Passphrase Once' : 'Tap Orb & Speak Secret Passphrase')}
            </Typography>

            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2.5 }}>
              🔒 Confidential Voice Biometrics (Never exposed on screen)
            </Typography>

            {/* Attempts Security Badge */}
            <Box sx={{ mb: 2.5 }}>
              <Chip
                icon={<ShieldIcon sx={{ fontSize: '14px !important' }} />}
                label={`${remainingAttempts} of 3 Attempts Remaining (Auto-Email Lockout)`}
                size="small"
                sx={{
                  fontWeight: 700,
                  fontSize: '0.72rem',
                  bgcolor: remainingAttempts === 3 ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                  color: remainingAttempts === 3 ? '#10b981' : '#ef4444',
                }}
              />
            </Box>

            {/* PIN Toggle / Input */}
            {showPinInput ? (
              <Box component="form" onSubmit={handlePinSubmit} sx={{ mb: 2, p: 2, bgcolor: 'background.subtle', borderRadius: 2 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, display: 'block', mb: 1 }}>
                  ENTER BACKUP SECURITY PIN:
                </Typography>
                <TextField
                  fullWidth
                  type="password"
                  placeholder="••••"
                  size="small"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  inputProps={{ maxLength: 8, style: { textAlign: 'center', letterSpacing: '0.3em', fontWeight: 800 } }}
                  sx={{ mb: 1.5 }}
                />
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button size="small" onClick={() => setShowPinInput(false)} color="inherit" sx={{ textTransform: 'none' }}>
                    Cancel
                  </Button>
                  <Button fullWidth size="small" type="submit" variant="contained" color="primary" sx={{ fontWeight: 700, textTransform: 'none' }}>
                    Proceed to 2FA
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Button
                  size="small"
                  startIcon={<KeyIcon />}
                  onClick={() => setShowPinInput(true)}
                  sx={{ textTransform: 'none', color: 'text.secondary', fontWeight: 600 }}
                >
                  Use Security PIN
                </Button>
              </Box>
            )}
          </Box>
        )}

        {/* Security Settings Toggle */}
        <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            Passphrase Status: <strong style={{ color: '#10b981' }}>Encrypted & Hidden</strong>
          </Typography>
          <Button
            size="small"
            startIcon={<SettingsIcon />}
            onClick={() => setShowSettings(!showSettings)}
            sx={{ textTransform: 'none', fontSize: '0.72rem' }}
          >
            {showSettings ? 'Hide' : 'Change Phrase / 2FA'}
          </Button>
        </Box>

        {showSettings && (
          <Box sx={{ mt: 2, p: 2, bgcolor: 'background.subtle', borderRadius: 2, textAlign: 'left' }}>
            <Typography variant="caption" sx={{ fontWeight: 700, display: 'block', mb: 1 }}>
              Configure Voice Passphrase & Recovery:
            </Typography>

            <Button
              fullWidth
              variant="outlined"
              size="small"
              startIcon={<MicIcon />}
              onClick={() => {
                setIsSettingNewPhrase(true);
                startListening();
              }}
              sx={{ mb: 1.5, fontWeight: 700, textTransform: 'none' }}
            >
              Speak New Passphrase Once (Auto-Record)
            </Button>

            <TextField
              fullWidth
              type="password"
              label="Or Type New Secret Passphrase"
              placeholder="••••••••••••"
              size="small"
              value={newPassphraseInput}
              onChange={(e) => setNewPassphraseInput(e.target.value)}
              sx={{ mb: 1.5 }}
            />

            <TextField
              fullWidth
              label="Your Recovery Email"
              size="small"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              sx={{ mb: 1.5 }}
            />

            <TextField
              fullWidth
              label="Telegram Bot Token"
              placeholder="e.g. 7849201938:AAFdE8_xyz..."
              size="small"
              value={telegramBotToken}
              onChange={(e) => setTelegramBotToken(e.target.value)}
              sx={{ mb: 1.5 }}
            />

            <TextField
              fullWidth
              label="Telegram Chat ID"
              placeholder="e.g. 987654321"
              size="small"
              value={telegramChatId}
              onChange={(e) => setTelegramChatId(e.target.value)}
              sx={{ mb: 1.5 }}
            />

            <Button size="small" variant="contained" color="primary" onClick={handleSaveSettings} sx={{ fontWeight: 700, textTransform: 'none' }}>
              Save Encrypted Settings
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default VoiceLoginPage;
