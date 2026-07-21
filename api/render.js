export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const apiKey = process.env.REPLICATE_API_TOKEN
  if (!apiKey) return res.status(500).json({ error: 'Replicate API token not configured' })

  const { prompt, negative_prompt, prediction_id } = req.body

  try {
    // If polling an existing prediction
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

    // Start new prediction - use /predictions with explicit version hash
    // This is the latest working version of sdxl-lightning-4step as of 2025
    const startRes = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: "5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637",
        input: {
          prompt: prompt,
          negative_prompt: negative_prompt || "ugly, deformed, blurry, low quality, cartoon, artificial",
          width: 1024,
          height: 1024,
          num_inference_steps: 4,
          guidance_scale: 0,
          num_outputs: 1,
          scheduler: "K_EULER",
        }
      })
    })

    const prediction = await startRes.json()

    // Log response for debugging
    console.log('Replicate response:', JSON.stringify(prediction).slice(0, 500))

    if (prediction.detail) throw new Error(prediction.detail)
    if (prediction.error) throw new Error(prediction.error)
    if (!prediction.id) throw new Error('No prediction ID returned: ' + JSON.stringify(prediction).slice(0,200))

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
  maxDuration: 30,
}
