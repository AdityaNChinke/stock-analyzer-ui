import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function chittorgarhMiddleware() {
  return {
    name: 'chittorgarh-middleware',
    configureServer(server) {
      server.middlewares.use('/api-chittorgarh', async (req, res) => {
        try {
          const targetUrl = `https://www.chittorgarh.com${req.url}`;
          const response = await fetch(targetUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
              'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            },
          });
          const text = await response.text();
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.end(text);
        } catch (err) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: err.message }));
        }
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), chittorgarhMiddleware()],
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/api/yf': {
        target: 'https://query1.finance.yahoo.com',
        changeOrigin: true,
        secure: false,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'application/json',
        },
        rewrite: (path) => path.replace(/^\/api\/yf/, ''),
      },
    },
  },
});
