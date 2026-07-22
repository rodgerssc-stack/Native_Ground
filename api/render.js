export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const apiKey = process.env.REPLICATE_API_TOKEN
  if (!apiKey) return res.status(500).json({ error: 'Replicate API token not configured' })

  const { prompt, prediction_id } = req.body

  try {
    // Poll existing prediction
    if (prediction_id) {
      const pollRes = await fetch(`https://api.replicate.com/v1/predictions/${prediction_id}`, {
        headers: { 'Authorization': `Bearer ${apiKey}` }
      })
      const pollData = await pollRes.json()
      return res.status(200).json({
        status: pollData.status,
        output: pollData.output,
        error: pollData.error
      })
    }

    // Use standard /v1/predictions endpoint with explicit version hash for flux-schnell
    const startRes = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'wait=55'
      },
      body: JSON.stringify({
        version: "5c7d5dc6dd8bf75c1acaa8565735e7986bc5b66206b55cca93cb72c9bf15ccaa",
        input: {
          prompt: prompt,
          num_outputs: 1,
          aspect_ratio: "3:2",
          output_format: "webp",
          output_quality: 80,
          num_inference_steps: 4,
          go_fast: true,
        }
      })
    })

    const prediction = await startRes.json()
    console.log('Replicate response:', JSON.stringify(prediction).slice(0, 300))

    if (prediction.detail) throw new Error(prediction.detail)
    if (prediction.error) throw new Error(prediction.error)

    // Already done
    if (prediction.status === 'succeeded' && prediction.output) {
      return res.status(200).json({ output: prediction.output })
    }

    if (!prediction.id) throw new Error('No prediction ID: ' + JSON.stringify(prediction).slice(0, 200))

    return res.status(200).json({
      prediction_id: prediction.id,
      status: prediction.status,
      output: prediction.output || null
    })

  } catch (error) {
    console.error('Render error:', error.message)
    return res.status(500).json({ error: error.message })
  }
}

export const config = {
  maxDuration: 60,
}
