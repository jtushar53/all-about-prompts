// Content loaders — thin wrappers for importing raw markdown.
// All md files are imported via Vite's ?raw query which returns a string.

export function stripFrontmatter(raw) {
  const lines = raw.split('\n')
  let inFront = false
  let frontDone = false
  const body = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (i === 0 && line.trim() === '---') { inFront = true; continue }
    if (inFront && line.trim() === '---') { inFront = false; frontDone = true; continue }
    if (inFront) continue
    body.push(line)
  }

  return body.join('\n').trim()
}

export function parseFrontmatter(raw) {
  const lines = raw.split('\n')
  const meta = {}
  let inFront = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (i === 0 && line.trim() === '---') { inFront = true; continue }
    if (inFront && line.trim() === '---') break
    if (!inFront) break

    const colonIdx = line.indexOf(':')
    if (colonIdx === -1) continue
    const key = line.slice(0, colonIdx).trim()
    let value = line.slice(colonIdx + 1).trim()

    // Parse simple arrays: [a, b, c]
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1).split(',').map(s => s.trim().replace(/"/g, ''))
    } else {
      value = value.replace(/^["']|["']$/g, '')
    }

    meta[key] = value
  }

  return meta
}
