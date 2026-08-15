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
 * Sends a message via free Telegram Bot API
 */
export const sendTelegramMessage = async (text, customToken = null, customChatId = null) => {
  const config = getTelegramConfig();
  const botToken = customToken || config.botToken;
  const chatId = customChatId || config.chatId;

  if (!botToken || !chatId) {
    throw new Error('Telegram Bot Token and Chat ID are required.');
  }

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
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
    throw new Error(json.description || 'Failed to send Telegram message');
  }

  return json;
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
