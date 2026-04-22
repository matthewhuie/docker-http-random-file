const http = require('http');
const crypto = require('crypto');

const PORT = process.env.PORT || 80;
const CHUNK_SIZE = 64 * 1024; // 64KB chunks for streaming

const units = {
  'B': 1n,
  'K': 1024n,
  'KB': 1024n,
  'M': 1024n ** 2n,
  'MB': 1024n ** 2n,
  'G': 1024n ** 3n,
  'GB': 1024n ** 3n,
  'T': 1024n ** 4n,
  'TB': 1024n ** 4n
};

function parseSize(sizeStr) {
  const match = sizeStr.match(/^(\d+)([a-zA-Z]*)$/i);
  if (!match) return null;

  const value = BigInt(match[1]);
  const unitStr = match[2].toUpperCase() || 'B';
  const multiplier = units[unitStr];

  if (!multiplier) return null;
  return value * multiplier;
}

const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/index.html') {
    const files = ['1MB', '10MB', '100MB', '1GB', '10GB', '100GB', '1TB'];

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">
<html>
 <head>
  <title>Index of /</title>
 </head>
 <body>
<h1>Index of /</h1>
  <table width="100%">
   <tr><th align="left">Name</th></tr>
   <tr><th colspan="1"><hr></th></tr>
   ${files.map(name => `
   <tr><td><a href="/${name}">${name}</a></td></tr>
   `).join('')}
   <tr><th colspan="1"><hr></th></tr>
</table>
<address>matthewhuie/http-random-file at ${req.headers.host || 'localhost'}</address>
</body></html>
    `);
    return;
  }

  const sizeStr = req.url.slice(1);
  const totalSizeBytes = parseSize(sizeStr);

  if (totalSizeBytes === null) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Invalid size format. Use numbers followed by B, KB, MB, GB, or TB.');
    return;
  }

  res.writeHead(200, {
    'Content-Type': 'application/octet-stream',
    'Content-Length': totalSizeBytes.toString(),
    'Content-Disposition': `attachment; filename="random-${sizeStr}"`
  });

  let bytesSent = 0n;
  const buffer = Buffer.alloc(CHUNK_SIZE);

  function sendChunk() {
    while (bytesSent < totalSizeBytes) {
      const remaining = totalSizeBytes - bytesSent;
      const currentChunkSize = remaining < BigInt(CHUNK_SIZE) ? Number(remaining) : CHUNK_SIZE;
      
      const chunk = currentChunkSize === CHUNK_SIZE ? buffer : Buffer.alloc(currentChunkSize);
      crypto.randomFillSync(chunk);
      
      const canContinue = res.write(chunk);
      bytesSent += BigInt(currentChunkSize);

      if (!canContinue) {
        res.once('drain', sendChunk);
        return;
      }
    }
    res.end();
  }

  sendChunk();
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
