import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DIST_DIR = path.join(__dirname, 'dist')
const PORT = process.env.PORT || 7620
const HOST = process.env.HOST || '0.0.0.0'

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
}

// Active SSE client connections
const sseClients = new Set()

function broadcastSse(eventData) {
  const payload = `data: ${JSON.stringify(eventData)}\n\n`
  for (const res of sseClients) {
    try {
      res.write(payload)
    } catch {
      sseClients.delete(res)
    }
  }
}

// Background heartbeat broadcasting
setInterval(() => {
  if (sseClients.size === 0) return
  const labs = ['zaza-desktop', 'med-pmox', 'gbs-p4', 'arbiter-node99']
  const lab = labs[Math.floor(Math.random() * labs.length)]
  const event = {
    id: `sse-${Date.now()}`,
    timestamp: new Date().toISOString(),
    category: Math.random() > 0.4 ? 'heartbeat' : 'wireguard',
    source: lab,
    message:
      lab === 'arbiter-node99'
        ? 'Arbitrage actif : Quorum 3/4 préservé, 0 split-brain.'
        : `Pulsation PURRING régulière : nœud sain (${(10 + Math.random() * 25).toFixed(1)}% CPU).`,
  }
  broadcastSse(event)
}, 2600)

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`)

  // 1. SSE Endpoint : /api/cockpit/events
  if (url.pathname === '/api/cockpit/events') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
    })
    res.write(`data: ${JSON.stringify({ id: 'welcome', timestamp: new Date().toISOString(), category: 'quorum', source: 'guichet', message: 'Flux SSE Cockpit connecté (Sovereign WireGuard Mesh)' })}\n\n`)

    sseClients.add(res)
    req.on('close', () => {
      sseClients.delete(res)
    })
    return
  }

  // 2. Teleport API Endpoint : POST /api/cockpit/teleport
  if (url.pathname === '/api/cockpit/teleport' && req.method === 'POST') {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk
    })
    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}')
        const teleportEvent = {
          id: `teleport-${Date.now()}`,
          timestamp: new Date().toISOString(),
          category: 'teleport',
          source: 'teleport-orchestrator',
          message: `🚀 Téléportation 1-Clic validée en 1.60 s pour ${payload.spaceId || 'espace'} vers ${payload.targetLabId || 'lab'}. Downtime: 42 ms.`,
          payload,
        }
        broadcastSse(teleportEvent)

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ ok: true, durationMs: 1600, downtimeMs: 42, proof: payload.proof }))
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ ok: false, error: err.message }))
      }
    })
    return
  }

  // 3. Static files & SPA fallback
  let filePath = path.join(DIST_DIR, url.pathname)
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(DIST_DIR, 'index.html')
  }

  const ext = path.extname(filePath)
  const contentType = MIME_TYPES[ext] || 'application/octet-stream'

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' })
      res.end('Internal Server Error')
      return
    }
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': ext === '.html' ? 'public, max-age=0' : 'public, max-age=31536000, immutable',
    })
    res.end(content)
  })
})

server.listen(PORT, HOST, () => {
  console.log(`[PodMesh Cockpit & Vitrine] Serving on http://${HOST}:${PORT}`)
})
