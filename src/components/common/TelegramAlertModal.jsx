import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  Alert,
  IconButton,
  Switch,
  FormControlLabel,
  Link,
  CircularProgress,
  Chip,
} from '@mui/material';
import {
  Close as CloseIcon,
  Telegram as TelegramIcon,
  Send as SendIcon,
  CheckCircle as CheckIcon,
  OpenInNew as OpenInNewIcon,
  SmartToy as BotIcon,
} from '@mui/icons-material';
import {
  getTelegramConfig,
  saveTelegramConfig,
  sendTelegramMessage,
  verifyTelegramBot,
} from '../../services/telegramService';

export const TelegramAlertModal = ({ open, onClose }) => {
  const [botToken, setBotToken] = useState('');
  const [chatId, setChatId] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [botInfo, setBotInfo] = useState(null);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });
  const [testing, setTesting] = useState(false);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    if (open) {
      const cfg = getTelegramConfig();
      setBotToken(cfg.botToken || '');
      setChatId(cfg.chatId || '');
      setIsEnabled(cfg.isEnabled || false);
      setStatusMsg({ type: '', text: '' });
      if (cfg.botToken) {
        checkBot(cfg.botToken);
      }
    }
  }, [open]);

  const checkBot = async (token) => {
    if (!token || token.length < 15) return;
    setVerifying(true);
    try {
      const info = await verifyTelegramBot(token);
      setBotInfo(info);
    } catch {
      setBotInfo(null);
    } finally {
      setVerifying(false);
    }
  };

  const handleTokenChange = (e) => {
    const val = e.target.value;
    setBotToken(val);
    if (val.includes(':') && val.length > 20) {
      checkBot(val.trim());
    } else {
      setBotInfo(null);
    }
  };

  const handleSave = () => {
    saveTelegramConfig({ botToken: botToken.trim(), chatId: chatId.trim(), isEnabled });
    setStatusMsg({ type: 'success', text: 'Telegram alert configuration saved successfully!' });
    setTimeout(() => onClose(), 1000);
  };

  const handleSendTest = async () => {
    if (!botToken || !chatId) {
      setStatusMsg({ type: 'error', text: 'Please provide both Bot Token and Chat ID first.' });
      return;
    }

    setTesting(true);
    setStatusMsg({ type: '', text: '' });
    try {
      const testMsg = `🚀 <b>StockAnalyzer Pro Alert Test</b>\n\n✅ <b>Connected Successfully!</b>\nYour phone alerts are now active. You will receive 2FA login codes and top Indian swing trade setups in real time.`;
      await sendTelegramMessage(testMsg, botToken.trim(), chatId.trim());
      setStatusMsg({ type: 'success', text: '🎉 SUCCESS! Test message sent to your Telegram. Check your phone!' });
      saveTelegramConfig({ botToken: botToken.trim(), chatId: chatId.trim(), isEnabled: true });
      setIsEnabled(true);
    } catch (err) {
      setStatusMsg({ type: 'error', text: `${err.message}` });
    } finally {
      setTesting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3, p: 1 } }}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <TelegramIcon sx={{ color: '#229ED9', fontSize: 28 }} />
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            Free Telegram Phone Alerts Setup
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, lineHeight: 1.6 }}>
          Receive instant swing trade signals and 2FA login codes directly on your Telegram phone app with <strong>100% zero fees forever</strong>.
        </Typography>

        {statusMsg.text ? (
          <Alert severity={statusMsg.type} sx={{ mb: 2.5, borderRadius: 2 }}>
            {statusMsg.text}
          </Alert>
        ) : null}

        {/* Step 1: Token */}
        <Box sx={{ mb: 2.5 }}>
          <TextField
            fullWidth
            label="1. Telegram Bot Token (from @BotFather)"
            placeholder="e.g. 7849201938:AAFdE8_xyz982K..."
            size="small"
            value={botToken}
            onChange={handleTokenChange}
            sx={{ mb: 1 }}
          />

          {/* Live Bot Recognition Chip & Start Button */}
          {botInfo && (
            <Box sx={{ p: 1.5, bgcolor: 'rgba(34, 158, 217, 0.1)', border: '1px solid rgba(34, 158, 217, 0.3)', borderRadius: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <BotIcon sx={{ color: '#229ED9' }} />
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                    {botInfo.first_name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    @{botInfo.username}
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="contained"
                size="small"
                endIcon={<OpenInNewIcon />}
                href={`https://t.me/${botInfo.username}`}
                target="_blank"
                sx={{ bgcolor: '#229ED9', '&:hover': { bgcolor: '#1c87ba' }, textTransform: 'none', fontWeight: 700 }}
              >
                Open Bot & Tap START
              </Button>
            </Box>
          )}
        </Box>

        {/* Step 2: Chat ID */}
        <Box sx={{ mb: 2.5 }}>
          <TextField
            fullWidth
            label="2. Your Telegram Numeric Chat ID (from @userinfobot)"
            placeholder="e.g. 987654321 (Numbers only)"
            size="small"
            value={chatId}
            onChange={(e) => setChatId(e.target.value.trim())}
            helperText="Message @userinfobot on Telegram to get your numeric ID."
            sx={{ mb: 1 }}
          />
        </Box>

        {/* Test Alert Button */}
        <Button
          fullWidth
          variant="contained"
          startIcon={testing ? <CircularProgress size={18} color="inherit" /> : <SendIcon />}
          onClick={handleSendTest}
          disabled={testing || !botToken || !chatId}
          sx={{
            py: 1.2,
            bgcolor: '#229ED9',
            '&:hover': { bgcolor: '#1c87ba' },
            fontWeight: 800,
            textTransform: 'none',
            borderRadius: 2,
            mb: 2,
          }}
        >
          {testing ? 'Sending Test Message...' : 'Send Live Test Message to My Phone'}
        </Button>

        {/* Instructions Guide */}
        <Box sx={{ p: 2, bgcolor: 'background.subtle', borderRadius: 2 }}>
          <Typography variant="caption" sx={{ fontWeight: 700, display: 'block', mb: 0.5 }}>
            ⚠️ CRITICAL: Why messages might fail:
          </Typography>
          <Typography variant="caption" color="text.secondary" component="div" sx={{ lineHeight: 1.6 }}>
            Telegram has a strict rule: <strong>You must open your bot in Telegram and tap START</strong> once. Bots cannot send messages to anyone who hasn't clicked START!
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} color="inherit" sx={{ textTransform: 'none' }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<CheckIcon />}
          onClick={handleSave}
          disabled={!botToken || !chatId}
          sx={{ fontWeight: 700, textTransform: 'none' }}
        >
          Save & Enable Phone Alerts
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TelegramAlertModal;
