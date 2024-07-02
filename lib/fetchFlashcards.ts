import { db } from '@/lib/db'
import { Flashcard } from '@prisma/client'

async function fetchFlashcards(chapterId: string): Promise<Flashcard[]> {
  const flashcards = await db.flashcard.findMany({
    where: { chapterId: chapterId },
  });

  if (!flashcards) {
    throw new Error('Flashcard not found!');
  }

  return flashcards;
}

export default fetchFlashcards;