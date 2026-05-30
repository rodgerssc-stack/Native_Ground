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
        headers: { 'Authorization': `Token ${apiKey}` }
      })
      const pollData = await pollRes.json()
      return res.status(200).json({
        status: pollData.status,
        output: pollData.output,
        error: pollData.error
      })
    }

    // Start a new prediction
    const startRes = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: "727e49a643e999d602a896c774a0658ffefea21465756a6ce24b7ea4165eba6a",
        input: {
          prompt,
          negative_prompt: negative_prompt || "ugly, deformed, blurry, low quality, cartoon, artificial",
          width: 768,
          height: 512,
          num_inference_steps: 4,
          guidance_scale: 0,
          num_outputs: 1,
        }
      })
    })

    const prediction = await startRes.json()
    if (prediction.error) throw new Error(prediction.error)

    // Return prediction ID immediately so browser can poll
    return res.status(200).json({
      prediction_id: prediction.id,
      status: prediction.status,
      output: prediction.output || null
    })

  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const config = {
  maxDuration: 30,
}
