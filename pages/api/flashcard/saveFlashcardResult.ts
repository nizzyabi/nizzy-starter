import { NextApiRequest, NextApiResponse } from 'next';
import { Result } from '@prisma/client';
import saveFlashcardResult from '@/lib/saveFlashcardResults'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId, flashcardId, result } = req.body;
  console.log('Received request:', { userId, flashcardId, result });
  if (!userId || !flashcardId || !result) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const savedResult = await saveFlashcardResult(userId, flashcardId, result as Result);
    res.status(200).json(savedResult);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save flashcard result ' + error});
  }
}