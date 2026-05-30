export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const apiKey = process.env.REPLICATE_API_TOKEN
  if (!apiKey) return res.status(500).json({ error: 'Replicate API token not configured' })

  const { prompt, negative_prompt, image, strength = 0.7 } = req.body

  try {
    // Start the prediction using img2img model
    const startRes = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: "a9758cbfbd5f3c2094457d996681af52552901b0e4920b89f9612acf36d31bcd",
        input: {
          prompt,
          negative_prompt,
          image: `data:image/jpeg;base64,${image}`,
          strength,
          guidance_scale: 7.5,
          num_inference_steps: 20,
        }
      })
    })

    const prediction = await startRes.json()
    if (prediction.error) throw new Error(prediction.error)

    // Poll for completion (max 50 seconds)
    const predictionId = prediction.id
    let result = null
    for (let i = 0; i < 25; i++) {
      await new Promise(r => setTimeout(r, 2000))
      const pollRes = await fetch(`https://api.replicate.com/v1/predictions/${predictionId}`, {
        headers: { 'Authorization': `Token ${apiKey}` }
      })
      const pollData = await pollRes.json()
      if (pollData.status === 'succeeded') {
        result = pollData.output
        break
      }
      if (pollData.status === 'failed') {
        throw new Error(pollData.error || 'Generation failed')
      }
    }

    if (!result) throw new Error('Generation timed out')
    return res.status(200).json({ output: result })

  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const config = {
  maxDuration: 60,
}
