/*
import { NextApiRequest, NextApiResponse } from 'next'

class LangflowClient {
  private baseURL: string;
  private applicationToken: string;

  constructor(baseURL: string, applicationToken: string) {
    this.baseURL = baseURL;
    this.applicationToken = applicationToken;
  }

  async post(endpoint: string, body: any, headers: Record<string, string> = {"Content-Type": "application/json"}) {
    headers["Authorization"] = `Bearer ${this.applicationToken}`;
    headers["Content-Type"] = "application/json";
    const url = `${this.baseURL}${endpoint}`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
      });

      const responseMessage = await response.json();
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText} - ${JSON.stringify(responseMessage)}`);
      }
      return responseMessage;
    } catch (error) {
      console.error('Request Error:', error.message);
      throw error;
    }
  }

  async initiateSession(flowId: string, langflowId: string, inputValue: string, inputType = 'chat', outputType = 'chat', stream = false, tweaks = {}) {
    const endpoint = `/lf/${langflowId}/api/v1/run/${flowId}?stream=${stream}`;
    return this.post(endpoint, { input_value: inputValue, input_type: inputType, output_type: outputType, tweaks: tweaks });
  }

  async runFlow(flowIdOrName: string, langflowId: string, inputValue: string, inputType = 'chat', outputType = 'chat', tweaks = {}, stream = false) {
    try {
      const initResponse = await this.initiateSession(flowIdOrName, langflowId, inputValue, inputType, outputType, stream, tweaks);
      console.log('Init Response:', initResponse);
      return initResponse;
    } catch (error) {
      console.error('Error running flow:', error);
      throw error;
    }
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { inputValue, inputType = 'chat', outputType = 'chat', stream = false } = req.body;

  if (!inputValue) {
    return res.status(400).json({ message: 'inputValue is required' });
  }

  const flowIdOrName = 'ea9241c2-b818-45c6-9283-7475c444f364';
  const langflowId = '2304f197-34d2-41df-b94a-f22bba74c198';
  const applicationToken = process.env.LANGFLOW_TOKEN;

  if (!applicationToken) {
    return res.status(500).json({ message: 'LANGFLOW_TOKEN is not set' });
  }

  const langflowClient = new LangflowClient('https://api.langflow.astra.datastax.com', applicationToken);

  try {
    const tweaks = {
      "TextInput-xHl4C": {},
      "TextOutput-E1bip": {},
      "GoogleGenerativeAIModel-Ykv37": {},
      "ParseData-bpXWO": {},
      "File-KhwBZ": {},
      "Prompt-aVwyk": {}
    };

    const response = await langflowClient.runFlow(
      flowIdOrName,
      langflowId,
      inputValue,
      inputType,
      outputType,
      tweaks,
      stream
    );

    console.log('Full response:', JSON.stringify(response, null, 2));

    if (response && response.result && response.result.length > 0) {
      const message = response.result[0];
      return res.status(200).json({ message: message });
    } else {
      console.error('Unexpected response structure:', response);
      return res.status(500).json({ message: 'Unexpected response structure from Langflow' });
    }
  } catch (error) {
    console.error('Main Error', error.message);
    return res.status(500).json({ message: 'An error occurred while processing your request' });
  }
}
*/


import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const response = await fetch("https://api.langflow.astra.datastax.com/lf/2304f197-34d2-41df-b94a-f22bba74c198/api/v1/run/ea9241c2-b818-45c6-9283-7475c444f364?stream=false", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer AstraCS:ZXrrwfmfyRSpZxhpZeZClxYC:e050b731b93fdfb5f58a0030dbb428cc0351790df5eccb2accdf5f6204f50b8a' // Replace with your actual token
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