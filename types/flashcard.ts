import { Flashcard, Result } from '@prisma/client'

export interface FlashcardsPageProps {
  chapterId: string;
}

export interface FlashcardsProps {
  flashcards: Flashcard[];
  userId: string;
}

export interface ResultCounts {
  [Result.VERY_DIFFICULT]: number;
  [Result.DIFFICULT]: number;
  [Result.GOOD]: number;
  [Result.VERY_GOOD]: number;
}

export interface Chapter {
  id: string;
  name: string;
  subjectId: string;
  totalFlashcards: number;
  answeredFlashcards: number;
  resultCounts: ResultCounts;
}

export interface Subject {
  id: string;
  name: string;
}

export interface User {
  email: string | null;
}

export { Result };