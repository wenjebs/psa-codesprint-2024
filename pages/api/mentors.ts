import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const response = await fetch("https://api.langflow.astra.datastax.com/lf/28ca1e5c-12d4-4ec8-8652-1860f02b288d/api/v1/run/745aa2e4-0e5c-439b-8009-63275b4f02cf?stream=false", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer AstraCS:fcNxeHRLzXbiWkjSioJmSLKO:1b235533606bc556e1d7b8c58ec38b2b44bbea7cab437ec00524434ab4d1c6e0' // Replace with your actual token
        },
        body: JSON.stringify(req.body)
      });

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Error processing request' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}