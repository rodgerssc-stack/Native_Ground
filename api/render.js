export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()

  const apiKey = process.env.REPLICATE_API_TOKEN

  // Diagnostic check
  if (req.method === 'GET') {
    return res.status(200).json({
      has_token: !!apiKey,
      token_length: apiKey ? apiKey.length : 0,
      token_prefix: apiKey ? apiKey.slice(0, 4) : 'none'
    })
  }

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
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

    // Use the model deployment URL directly — correct format for Flux Schnell
    const startRes = await fetch('https://api.replicate.com/v1/models/black-forest-labs/flux-schnell/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'wait=55'
      },
      body: JSON.stringify({
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
    console.log('Replicate response:', JSON.stringify(prediction).slice(0, 400))

    if (prediction.detail) throw new Error(prediction.detail)
    if (prediction.error) throw new Error(prediction.error)

    // Synchronous — already done
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
