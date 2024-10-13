import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const response = await fetch("https://api.langflow.astra.datastax.com/lf/5b6e17c0-8fea-4c9f-9d0f-4fbe2d4890a1/api/v1/run/15da7b76-6a86-4ab0-9ec0-fd1bda124ad7?stream=false", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer AstraCS:xGEWCpqxQwFPijLUGoldFSaF:d2a8e104d7c8a6dfe62aa18090190631a3b05913c6f96d8fcfa5d40c2883f155'
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