/**
 * Free Telegram Phone Alerts Service
 * Uses the official Telegram Bot API (100% Free, zero fees forever).
 */

const STORAGE_KEY = 'stock_analyzer_telegram_config';

export const getTelegramConfig = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : { botToken: '', chatId: '', isEnabled: false };
  } catch {
    return { botToken: '', chatId: '', isEnabled: false };
  }
};

export const saveTelegramConfig = (config) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (err) {
    console.error('Failed to save Telegram config', err);
  }
};

/**
 * Verify Bot Token & Get Bot Details from Telegram API
 */
export const verifyTelegramBot = async (customToken = null) => {
  const config = getTelegramConfig();
  const botToken = (customToken || config.botToken || '').trim();

  if (!botToken) {
    throw new Error('Bot Token is empty. Please enter your Bot Token.');
  }

  const url = `https://api.telegram.org/bot${botToken}/getMe`;
  const res = await fetch(url);
  const json = await res.json();

  if (!json.ok) {
    throw new Error('Invalid Bot Token. Check the token message from @BotFather.');
  }

  return json.result; // Returns { id, first_name, username }
};

/**
 * Sends a message via free Telegram Bot API with friendly error diagnosis
 */
export const sendTelegramMessage = async (text, customToken = null, customChatId = null) => {
  const config = getTelegramConfig();
  const botToken = (customToken || config.botToken || '').trim();
  const chatId = (customChatId || config.chatId || '').trim();

  if (!botToken || !chatId) {
    throw new Error('Telegram Bot Token and Chat ID are required.');
  }

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
      }),
    });

    const json = await res.json();
    if (!json.ok) {
      const desc = json.description || '';
      if (desc.includes("bot can't initiate conversation") || desc.includes('chat not found') || desc.includes('bot was blocked')) {
        throw new Error(`CRITICAL STEP REQUIRED: You must open your new bot in Telegram and tap "START" (or send /start). Telegram blocks all messages until you start the bot first!`);
      }
      if (desc.includes('Unauthorized') || json.error_code === 401 || json.error_code === 404) {
        throw new Error(`Invalid Bot Token. Check the token provided by @BotFather.`);
      }
      if (desc.includes('Bad Request: chat_id is empty') || desc.includes('chat_id') || desc.includes('user not found')) {
        throw new Error(`Invalid Chat ID. Get your pure numeric ID from @userinfobot (e.g. 987654321, NOT your @username).`);
      }
      throw new Error(desc || 'Failed to send Telegram message');
    }

    return json;
  } catch (err) {
    throw err;
  }
};

/**
 * Format and dispatch an institutional trade alert
 */
export const dispatchTradeAlert = async (stockRecommendation) => {
  const { symbol, recommendation, currentPrice, targetPrice, stopLoss, confidenceScore, reason } = stockRecommendation;
  const emoji = recommendation === 'BUY' ? '🟢 <b>BULLISH SWING ALERT</b>' : '🔴 <b>TRADE ALERT</b>';

  const message = `${emoji}
━━━━━━━━━━━━━━━━━━
📈 <b>Stock:</b> <code>${symbol}</code> (NSE)
🎯 <b>Signal:</b> <b>${recommendation}</b>
💰 <b>Price:</b> ₹${Number(currentPrice).toFixed(2)}
🚀 <b>Target:</b> ₹${Number(targetPrice).toFixed(2)} (+${(((targetPrice - currentPrice) / currentPrice) * 100).toFixed(1)}%)
🛑 <b>Stop Loss:</b> ₹${Number(stopLoss).toFixed(2)} (-${(((currentPrice - stopLoss) / currentPrice) * 100).toFixed(1)}%)
⭐ <b>Conviction:</b> ${confidenceScore}%
━━━━━━━━━━━━━━━━━━
💡 <i>${reason || 'Technical breakout above EMA20 with positive MACD momentum.'}</i>
🕒 <i>${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</i>`;

  return sendTelegramMessage(message);
};

/**
 * Dispatch 2FA Telegram Login Confirmation Alert
 */
export const dispatchTelegramLogin2FA = async (otpCode) => {
  const timeStr = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const message = `🔐 <b>STOCKANALYZER 2FA LOGIN REQUEST</b>
━━━━━━━━━━━━━━━━━━
🎙️ <b>Step 1:</b> Voice Verified ✅
🕒 <b>Timestamp:</b> <i>${timeStr} IST</i>
🔑 <b>2FA Security Code:</b> <code>${otpCode}</code>
━━━━━━━━━━━━━━━━━━
⚠️ <i>If you are logging in, enter this 6-digit code on your screen to authorize terminal access.</i>`;

  return sendTelegramMessage(message);
};
