import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const response = await fetch("https://api.langflow.astra.datastax.com/lf/28ca1e5c-12d4-4ec8-8652-1860f02b288d/api/v1/run/745aa2e4-0e5c-439b-8009-63275b4f02cf?stream=false", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer AstraCS:liSYYZDnIOjZNOGlpUTGGFJT:03b260283b31142a2dbed83d83299aa3980237c3fa079bd847666b748423399c'
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