import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join, dirname, basename, extname } from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const contentDir = join(root, 'content')
const dataDir = join(root, 'src', 'data')

mkdirSync(dataDir, { recursive: true })

// Dynamic require for gray-matter (CJS package)
const require = createRequire(import.meta.url)
let matter
try {
  matter = require('gray-matter')
} catch (e) {
  console.error('[build-index] gray-matter not found — run npm install first')
  process.exit(1)
}

// Collect all markdown files
function collectMd(dir) {
  const results = []
  let entries
  try {
    entries = readdirSync(dir, { withFileTypes: true })
  } catch (_) {
    return results
  }
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      results.push(...collectMd(full))
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      results.push(full)
    }
  }
  return results
}

const files = collectMd(contentDir)

const registry = {}
const docs = []

for (const filePath of files) {
  const raw = readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)

  const slug = data.slug || basename(filePath, '.md')
  const title = data.title || slug
  const tier = data.tier || 'basics'
  const tags = Array.isArray(data.tags) ? data.tags : []
  // Relative path from content/
  const relPath = filePath.replace(contentDir + '/', '')

  registry[slug] = { title, tier, tags, path: relPath }

  docs.push({
    id: slug,
    title,
    tier,
    tags: tags.join(' '),
    body: content.slice(0, 2000), // limit body for index size
  })
}

// Build a simple serialisable search index (FlexSearch export format)
// We store the raw docs array — the client will re-index on load.
// This keeps the build script free of FlexSearch's browser-only export quirks.
const searchData = { docs }

writeFileSync(join(dataDir, 'search.json'), JSON.stringify(searchData) + '\n')
writeFileSync(join(dataDir, 'registry.json'), JSON.stringify(registry, null, 2) + '\n')

console.log(`[build-index] indexed ${docs.length} documents → src/data/search.json + registry.json`)
