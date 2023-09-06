// import type { NextApiRequest, NextApiResponse } from 'next';

// import { client } from '../../utils/client';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     const user = req.body;
    
//     client.createIfNotExists(user)
//         .then(()=>res.status(200).json('Login Success'))
//     }
// }

import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../utils/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
      const user = req.body;

      // Create the user document in Sanity
      const createdUser = await client.createIfNotExists(user);

      res.status(200).json({ message: 'Login Success', user: createdUser });
    
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
