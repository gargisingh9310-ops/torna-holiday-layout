import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Custom middleware for handling the travel enquiry submissions
function enquiryApiPlugin() {
  return {
    name: 'enquiry-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url ? req.url.split('?')[0] : '';
        if (url === '/api/enquiry') {
          if (req.method === 'POST') {
            const chunks = [];
            req.on('data', chunk => chunks.push(chunk));
            req.on('end', () => {
              try {
                const bodyStr = Buffer.concat(chunks).toString('utf-8');
                const data = bodyStr ? JSON.parse(bodyStr) : {};
                console.log('[Torna Enquiry API] Received submission:', data);
                const refId = 'TORNA-' + Math.floor(100000 + Math.random() * 900000);
                res.writeHead(200, {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*'
                });
                res.end(JSON.stringify({
                  success: true,
                  message: 'Your bespoke journey inquiry has been successfully received by Torna Holidays.',
                  referenceId: refId,
                  timestamp: new Date().toISOString(),
                  data: data
                }));
              } catch (err) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: err.message }));
              }
            });
            return;
          } else if (req.method === 'OPTIONS') {
            res.writeHead(204, {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type'
            });
            res.end();
            return;
          } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ status: 'ok', service: 'Torna Holidays Enquiry API' }));
            return;
          }
        }
        next();
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), enquiryApiPlugin()],
  server: {
    port: 5176,
    strictPort: true,
    host: true
  }
});
