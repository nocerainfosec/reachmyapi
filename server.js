// Local host + CORS proxy for API Reach. No dependencies. Run: node server.js  → http://localhost:8787
const http = require('http'), https = require('https'), fs = require('fs'), path = require('path'), { URL } = require('url');
const PORT = process.env.PORT || 8787, ROOT = __dirname;
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml' };

http.createServer((req, res) => {
  const u = new URL(req.url, 'http://localhost');
  if (u.pathname === '/proxy') {
    const target = u.searchParams.get('url');
    if (!target) { res.writeHead(400); return res.end('missing url'); }
    let t; try { t = new URL(target); } catch { res.writeHead(400); return res.end('bad url'); }
    const headers = { ...req.headers }; delete headers.host; delete headers.origin; delete headers.referer;
    const lib = t.protocol === 'https:' ? https : http;
    const up = lib.request(t, { method: req.method, headers, rejectUnauthorized: false, timeout: 15000 }, r => {
      const h = { ...r.headers, 'access-control-allow-origin': '*', 'access-control-expose-headers': '*' };
      delete h['content-encoding']; delete h['content-length'];
      res.writeHead(r.statusCode, h); r.pipe(res);
    });
    up.on('timeout', () => up.destroy(new Error('timeout')));
    up.on('error', e => { res.writeHead(502, { 'access-control-allow-origin': '*', 'content-type': 'text/plain' }); res.end('Upstream error: ' + e.message); });
    if (req.method === 'OPTIONS') { res.writeHead(204, { 'access-control-allow-origin': '*', 'access-control-allow-methods': '*', 'access-control-allow-headers': '*' }); up.destroy(); return res.end(); }
    return req.pipe(up);
  }
  let p = decodeURIComponent(u.pathname); if (p === '/') p = '/index.html';
  const f = path.join(ROOT, p);
  if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end('not found'); }
  res.writeHead(200, { 'content-type': MIME[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
}).listen(PORT, () => console.log('ReachmyAPI at http://localhost:' + PORT + '\nProxy template: http://localhost:' + PORT + '/proxy?url={url}'));
