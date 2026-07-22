export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()

  const replicateKey = process.env.REPLICATE_API_TOKEN
  const anthropicKey = process.env.ANTHROPIC_API_KEY

  if (req.method === 'GET') {
    return res.status(200).json({
      has_replicate: !!replicateKey,
      replicate_length: replicateKey ? replicateKey.length : 0,
      replicate_prefix: replicateKey ? replicateKey.slice(0, 6) : 'none',
      has_anthropic: !!anthropicKey,
    })
  }

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { prompt, prediction_id } = req.body

  // Poll existing prediction
  if (prediction_id && replicateKey) {
    try {
      const pollRes = await fetch(`https://api.replicate.com/v1/predictions/${prediction_id}`, {
        headers: { 'Authorization': `Bearer ${replicateKey}` }
      })
      const pollData = await pollRes.json()
      return res.status(200).json({
        status: pollData.status,
        output: pollData.output,
        error: pollData.error
      })
    } catch(e) {
      return res.status(500).json({ error: e.message })
    }
  }

  // Try Replicate first
  if (replicateKey) {
    try {
      const startRes = await fetch('https://api.replicate.com/v1/models/black-forest-labs/flux-schnell/predictions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${replicateKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'wait=30'
        },
        body: JSON.stringify({
          input: {
            prompt,
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
      console.log('Replicate raw response:', JSON.stringify(prediction).slice(0, 500))

      if (prediction.status === 'succeeded' && prediction.output) {
        return res.status(200).json({ output: prediction.output })
      }
      if (prediction.id) {
        return res.status(200).json({
          prediction_id: prediction.id,
          status: prediction.status,
          output: null
        })
      }
      // If Replicate fails log the full error
      console.error('Replicate failed:', JSON.stringify(prediction))
      throw new Error(prediction.detail || prediction.error || JSON.stringify(prediction).slice(0, 200))

    } catch(e) {
      console.error('Replicate error:', e.message)
      // Fall through to return error with full details
      return res.status(500).json({ 
        error: e.message,
        debug: 'Replicate call failed - check Vercel logs for full response'
      })
    }
  }

  return res.status(500).json({ error: 'No image generation service configured' })
}

export const config = {
  maxDuration: 60,
}
