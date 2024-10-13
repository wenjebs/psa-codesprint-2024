import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  try {
    const { message } = req.body
    console.log('Received message:', message)

    if (!process.env.LANGFLOW_TOKEN) {
      throw new Error('LANGFLOW_TOKEN is not set')
    }

    const response = await fetch(
      "https://api.langflow.astra.datastax.com/lf/2304f197-34d2-41df-b94a-f22bba74c198/api/v1/run/ea9241c2-b818-45c6-9283-7475c444f364?stream=false",
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.LANGFLOW_TOKEN}`
        },
        body: JSON.stringify({
          input_value: message,
          output_type: "chat",
          input_type: "chat",
          tweaks: {
            "TextInput-xHl4C": {},
            "TextOutput-E1bip": {},
            "GoogleGenerativeAIModel-Ykv37": {},
            "ParseData-bpXWO": {},
            "File-KhwBZ": {},
            "Prompt-aVwyk": {}
          }
        })
      }
    )

    const data = await response.json()
    
    if (!response.ok) {
      console.error('Langflow API error:', JSON.stringify(data, null, 2))
      return res.status(response.status).json(data)
    }

    res.status(200).json(data)
  } catch (error) {
    console.error('Error in API route:', error)
    res.status(500).json({ error: 'Error processing your request', details: error.message })
  }
}