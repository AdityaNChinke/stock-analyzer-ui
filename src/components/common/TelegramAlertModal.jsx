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
} from '@mui/material';
import {
  Close as CloseIcon,
  Telegram as TelegramIcon,
  Send as SendIcon,
  CheckCircle as CheckIcon,
} from '@mui/icons-material';
import { getTelegramConfig, saveTelegramConfig, sendTelegramMessage } from '../../services/telegramService';

export const TelegramAlertModal = ({ open, onClose }) => {
  const [botToken, setBotToken] = useState('');
  const [chatId, setChatId] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    if (open) {
      const cfg = getTelegramConfig();
      setBotToken(cfg.botToken || '');
      setChatId(cfg.chatId || '');
      setIsEnabled(cfg.isEnabled || false);
      setStatusMsg({ type: '', text: '' });
    }
  }, [open]);

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
      const testMsg = `🚀 <b>StockAnalyzer Alert Test</b>\n\n✅ Your phone alerts are successfully connected! You will now receive high-probability Indian swing trade setups in real time.`;
      await sendTelegramMessage(testMsg, botToken.trim(), chatId.trim());
      setStatusMsg({ type: 'success', text: '🎉 Test message sent! Check your Telegram app.' });
      saveTelegramConfig({ botToken: botToken.trim(), chatId: chatId.trim(), isEnabled: true });
      setIsEnabled(true);
    } catch (err) {
      setStatusMsg({ type: 'error', text: `Failed: ${err.message}` });
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
            Free Telegram Phone Alerts (100% Free)
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, lineHeight: 1.6 }}>
          Receive instant swing trade alerts and target hits directly on your phone via Telegram Bot API with <strong>zero cost forever</strong>.
        </Typography>

        {statusMsg.text ? (
          <Alert severity={statusMsg.type} sx={{ mb: 2 }}>
            {statusMsg.text}
          </Alert>
        ) : null}

        <Box sx={{ p: 2, mb: 2.5, bgcolor: 'background.subtle', borderRadius: 2 }}>
          <Typography variant="caption" sx={{ fontWeight: 700, display: 'block', mb: 1 }}>
            📖 Quick 3-Step Setup (Takes 30 seconds):
          </Typography>
          <Typography variant="caption" color="text.secondary" component="div" sx={{ lineHeight: 1.7 }}>
            1. Open Telegram and message <strong>@BotFather</strong> to create your free bot (you will get a <code>Bot Token</code>).<br />
            2. Message <strong>@userinfobot</strong> on Telegram to see your numeric <code>Chat ID</code>.<br />
            3. Paste both below and click <strong>"Send Test Alert"</strong>!
          </Typography>
        </Box>

        <TextField
          fullWidth
          label="Telegram Bot Token"
          placeholder="e.g. 123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ"
          size="small"
          value={botToken}
          onChange={(e) => setBotToken(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Your Telegram Chat ID"
          placeholder="e.g. 987654321"
          size="small"
          value={chatId}
          onChange={(e) => setChatId(e.target.value)}
          sx={{ mb: 2 }}
        />

        <FormControlLabel
          control={<Switch checked={isEnabled} onChange={(e) => setIsEnabled(e.target.checked)} color="primary" />}
          label={<Typography variant="body2" sx={{ fontWeight: 600 }}>Enable Real-time Swing Alerts</Typography>}
        />
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2, justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          color="info"
          startIcon={testing ? <CircularProgress size={16} /> : <SendIcon />}
          onClick={handleSendTest}
          disabled={testing}
          sx={{ textTransform: 'none', fontWeight: 700 }}
        >
          Send Test Alert
        </Button>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button onClick={onClose} color="inherit" sx={{ textTransform: 'none' }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            sx={{ fontWeight: 700, textTransform: 'none', px: 3 }}
          >
            Save Settings
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default TelegramAlertModal;
