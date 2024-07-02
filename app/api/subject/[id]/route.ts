import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const userEmail = request.headers.get('X-User-Email');

  const user = userEmail ? await db.user.findUnique({ where: { email: userEmail } }) : null;
  const userId = user ? user.id : null;

  const subject = await db.subject.findUnique({
    where: { id: params.id }
  });

  const chapters = await db.chapter.findMany({
    where: { subjectId: params.id },
    include: {
      Flashcard: {
        include: {
          results: {
            where: userId ? { userId: userId } : undefined
          }
        }
      }
    }
  });

  const chaptersWithStats = chapters.map(chapter => {
    const flashcardResults = chapter.Flashcard.flatMap(flashcard => flashcard.results);
    const totalAnswered = flashcardResults.length;
    const resultCounts = {
      VERY_DIFFICULT: flashcardResults.filter(r => r.result === 'VERY_DIFFICULT').length,
      DIFFICULT: flashcardResults.filter(r => r.result === 'DIFFICULT').length,
      GOOD: flashcardResults.filter(r => r.result === 'GOOD').length,
      VERY_GOOD: flashcardResults.filter(r => r.result === 'VERY_GOOD').length,
    };

    return {
      ...chapter,
      totalFlashcards: chapter.Flashcard.length,
      answeredFlashcards: totalAnswered,
      resultCounts: resultCounts,
    };
  });

  return NextResponse.json({ subject, chapters: chaptersWithStats })
}