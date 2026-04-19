// FlexSearch client — lazy-loads search.json on first query and re-indexes in the browser.
// search.json stores raw docs (not a FlexSearch binary export) so we can use the same
// Document API on both sides without serialization quirks.

import FlexSearch from 'flexsearch'

let index = null
let docs = null

async function ensureIndex() {
  if (index) return

  const data = await import('../data/search.json')
  docs = data.default.docs

  index = new FlexSearch.Document({
    tokenize: 'forward',
    cache: true,
    document: {
      id: 'id',
      index: ['title', 'tags', 'body'],
      store: ['title', 'tier', 'tags'],
    },
  })

  for (const doc of docs) {
    index.add(doc)
  }
}

/**
 * Search the local FlexSearch index.
 * @param {string} query
 * @returns {Promise<Array<{id:string, title:string, tier:string, tags:string}>>}
 */
export async function search(query) {
  await ensureIndex()
  if (!query || query.trim().length < 2) return []

  const results = index.search(query, { limit: 12, enrich: true })

  // FlexSearch Document returns [{field, result:[{id, doc}]}]
  const seen = new Set()
  const hits = []
  for (const fieldResult of results) {
    for (const item of fieldResult.result) {
      if (!seen.has(item.id)) {
        seen.add(item.id)
        hits.push({ id: item.id, ...item.doc })
      }
    }
  }
  return hits
}
