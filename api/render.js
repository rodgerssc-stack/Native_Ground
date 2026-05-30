export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const apiKey = process.env.REPLICATE_API_TOKEN
  if (!apiKey) return res.status(500).json({ error: 'Replicate API token not configured' })

  const { prompt, negative_prompt } = req.body

  try {
    // Use SDXL-Lightning - fastest model, 4 steps, ~5 seconds
    const startRes = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${apiKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'wait=55'  // Ask Replicate to wait up to 55s before returning
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
          scheduler: "K_EULER",
          num_outputs: 1,
        }
      })
    })

    const prediction = await startRes.json()

    // If Replicate waited and it succeeded
    if (prediction.status === 'succeeded' && prediction.output) {
      return res.status(200).json({ output: prediction.output })
    }

    // Otherwise poll a few times
    if (prediction.id) {
      for (let i = 0; i < 20; i++) {
        await new Promise(r => setTimeout(r, 2000))
        const pollRes = await fetch(`https://api.replicate.com/v1/predictions/${prediction.id}`, {
          headers: { 'Authorization': `Token ${apiKey}` }
        })
        const pollData = await pollRes.json()
        if (pollData.status === 'succeeded') {
          return res.status(200).json({ output: pollData.output })
        }
        if (pollData.status === 'failed') {
          throw new Error(pollData.error || 'Generation failed')
        }
      }
    }

    throw new Error('Generation timed out - please try again')

  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const config = {
  maxDuration: 60,
}
