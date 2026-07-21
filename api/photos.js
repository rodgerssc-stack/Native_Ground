export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { latin, mode = 'card' } = req.body
  if (!latin) return res.status(400).json({ error: 'Latin name required' })

  // Clean up the Latin name - remove author names, variety notation etc
  const cleanLatin = latin
    .replace(/\s+(var\.|subsp\.|ssp\.|f\.)\s+.*/i, '')
    .replace(/\s+[A-Z][a-z]*\.?\s*$/, '')
    .trim()

  try {
    // Step 1: Find the taxon
    const taxonRes = await fetch(
      `https://api.inaturalist.org/v1/taxa?q=${encodeURIComponent(cleanLatin)}&rank=species&per_page=1&is_active=true`,
      { headers: { 'Accept': 'application/json', 'User-Agent': 'NativeGround/1.0' } }
    )

    if (!taxonRes.ok) {
      return res.status(200).json({ photos: [], taxonId: null })
    }

    const taxonData = await taxonRes.json()
    const taxon = taxonData.results?.[0]

    if (!taxon) {
      return res.status(200).json({ photos: [], taxonId: null })
    }

    const photos = []

    // Always grab the default taxon photo first
    if (taxon.default_photo) {
      const url = taxon.default_photo.medium_url ||
        taxon.default_photo.url?.replace('square', 'medium') ||
        taxon.default_photo.square_url?.replace('square', 'medium')
      if (url) {
        photos.push({
          url,
          attribution: taxon.default_photo.attribution || '',
          obsUrl: `https://www.inaturalist.org/taxa/${taxon.id}`,
          observer: 'iNaturalist',
          place: '',
          date: ''
        })
      }
    }

    // For modal mode, also get research-grade observation photos
    if (mode === 'modal' && taxon.id) {
      const obsRes = await fetch(
        `https://api.inaturalist.org/v1/observations?taxon_id=${taxon.id}&quality_grade=research&photos=true&per_page=8&order_by=votes&order=desc`,
        { headers: { 'Accept': 'application/json', 'User-Agent': 'NativeGround/1.0' } }
      )

      if (obsRes.ok) {
        const obsData = await obsRes.json()
        for (const obs of obsData.results || []) {
          for (const photo of obs.photos || []) {
            const url = photo.url?.replace('square', 'medium') || photo.medium_url
            if (url && !photos.find(p => p.url === url)) {
              photos.push({
                url,
                attribution: photo.attribution || '',
                obsUrl: `https://www.inaturalist.org/observations/${obs.id}`,
                observer: obs.user?.login || 'iNaturalist',
                place: obs.place_guess || '',
                date: obs.observed_on || ''
              })
            }
          }
          if (photos.length >= 8) break
        }
      }
    }

    return res.status(200).json({
      photos,
      taxonId: taxon.id,
      taxonName: taxon.name,
      commonName: taxon.preferred_common_name || ''
    })

  } catch (error) {
    console.error('Photo proxy error:', error.message)
    return res.status(200).json({ photos: [], taxonId: null, error: error.message })
  }
}

export const config = {
  maxDuration: 30,
}
