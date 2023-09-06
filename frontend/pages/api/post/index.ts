import type { NextApiRequest, NextApiResponse } from 'next';
import { allPostsQuery } from '../../../utils/queries';
import { client } from '../../../utils/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const query = allPostsQuery();
    const data = await client.fetch(query);
    res.status(200).json(data);
  } else if (req.method === 'POST') {
    const document = req.body;

    try {
      const createdDocument = await client.create(document);
      res.status(201).json(createdDocument); // Send the created document as response
    } catch (error) {
      console.error('Error creating document:', error);
      res.status(500).json({ error: 'Failed to create document' }); // Send error response
    }
  } else {
    res.status(405).end(); // Method not allowed
  }
}
