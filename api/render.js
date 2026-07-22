export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()

  const apiKey = process.env.REPLICATE_API_TOKEN

  if (req.method === 'GET') {
    // Test the token by calling Replicate account endpoint
    try {
      const testRes = await fetch('https://api.replicate.com/v1/account', {
        headers: { 'Authorization': `Bearer ${apiKey}` }
      })
      const testData = await testRes.json()
      return res.status(200).json({
        has_token: !!apiKey,
        token_prefix: apiKey ? apiKey.slice(0, 6) : 'none',
        token_length: apiKey ? apiKey.length : 0,
        replicate_test_status: testRes.status,
        replicate_test_response: testData
      })
    } catch(e) {
      return res.status(200).json({
        has_token: !!apiKey,
        token_prefix: apiKey ? apiKey.slice(0, 6) : 'none',
        replicate_test_error: e.message
      })
    }
  }

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  if (!apiKey) return res.status(500).json({ error: 'No API key' })

  const { prompt, prediction_id } = req.body

  try {
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

    const startRes = await fetch('https://api.replicate.com/v1/models/black-forest-labs/flux-schnell/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
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
    throw new Error(prediction.detail || prediction.error || JSON.stringify(prediction).slice(0, 200))

  } catch(e) {
    return res.status(500).json({ error: e.message })
  }
}

export const config = {
  maxDuration: 60,
}
