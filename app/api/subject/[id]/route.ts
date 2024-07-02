import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { useCurrentUser } from '@/hooks/use-current-user'

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

  const chaptersWithStats = chapters.map(chapter => ({
    ...chapter,
    totalFlashcards: chapter.Flashcard.length,
    answeredFlashcards: userId
      ? chapter.Flashcard.filter(flashcard => flashcard.results.length > 0).length
      : 0,
  }));

  return NextResponse.json({ subject, chapters: chaptersWithStats })
}