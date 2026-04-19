import { execSync } from 'child_process'
import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

let lastUpdated = new Date().toISOString().slice(0, 10)
let commit = 'dev'

try {
  const isoDate = execSync('git log -1 --format=%cI', { cwd: root }).toString().trim()
  if (isoDate) lastUpdated = isoDate.slice(0, 10)
} catch (_) {}

try {
  commit = execSync('git rev-parse --short HEAD', { cwd: root }).toString().trim()
} catch (_) {}

const dataDir = join(root, 'src', 'data')
mkdirSync(dataDir, { recursive: true })

writeFileSync(
  join(dataDir, 'meta.json'),
  JSON.stringify({ lastUpdated, commit }, null, 2) + '\n'
)

console.log(`[stamp-meta] lastUpdated=${lastUpdated} commit=${commit}`)
