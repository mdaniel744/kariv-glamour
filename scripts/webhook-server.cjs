// Minimal GitHub webhook receiver: verifies the HMAC signature on push
// events, then runs deploy.sh. No dependencies beyond Node's built-ins.
const http = require('http');
const crypto = require('crypto');
const { exec } = require('child_process');
const path = require('path');

const PORT = process.env.WEBHOOK_PORT || 9003;
const SECRET = process.env.WEBHOOK_SECRET;

if (!SECRET) {
  console.error('WEBHOOK_SECRET is not set — refusing to start.');
  process.exit(1);
}

function verifySignature(payload, signatureHeader) {
  if (!signatureHeader || !signatureHeader.startsWith('sha256=')) return false;
  const expected = 'sha256=' + crypto.createHmac('sha256', SECRET).update(payload).digest('hex');
  const a = Buffer.from(expected);
  const b = Buffer.from(signatureHeader);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

const server = http.createServer((req, res) => {
  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
    return;
  }

  const chunks = [];
  req.on('data', (chunk) => chunks.push(chunk));
  req.on('end', () => {
    const body = Buffer.concat(chunks);

    if (!verifySignature(body, req.headers['x-hub-signature-256'])) {
      res.writeHead(401, { 'Content-Type': 'text/plain' });
      res.end('Invalid signature');
      return;
    }

    const event = req.headers['x-github-event'];
    if (event !== 'push') {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(`Ignored event: ${event}`);
      return;
    }

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Deploy started');

    const deployScript = path.join(__dirname, 'deploy.sh');
    exec(`bash ${deployScript}`, (error, stdout, stderr) => {
      if (error) {
        console.error('Deploy failed:', error.message);
        console.error(stderr);
        return;
      }
      console.log(stdout);
    });
  });
});

server.listen(PORT, () => {
  console.log(`Webhook server listening on port ${PORT}`);
});
