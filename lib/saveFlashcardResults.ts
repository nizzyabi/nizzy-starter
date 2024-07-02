import { db } from '@/lib/db';
import { UserFlashcardResult, Result } from '@prisma/client';

export async function saveFlashcardResult(
  userId: string,
  flashcardId: string,
  result: Result
): Promise<UserFlashcardResult> {
  const savedResult = await db.userFlashcardResult.upsert({
    where: {
      userId_flashcardId: {
        userId,
        flashcardId,
      },
    },
    update: {
      result,
    },
    create: {
      userId,
      flashcardId,
      result,
    },
  });

  if (!savedResult) {
    throw new Error('Failed to save flashcard result');
  }

  return savedResult;
}

export default saveFlashcardResult;
