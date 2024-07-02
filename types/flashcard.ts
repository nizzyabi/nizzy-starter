import { Flashcard, Result } from '@prisma/client'

export interface FlashcardsPageProps {
  chapterId: string;
}

export interface FlashcardsProps {
  flashcards: Flashcard[];
  userId: string;
}

export { Result };