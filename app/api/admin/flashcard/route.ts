import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.question || !body.answer || !body.chapterId) {
      console.log('Missing required fields:', { question: body.question, answer: body.answer, chapterId: body.chapterId });
      return NextResponse.json({ error: 'Question, answer, and chapterId are required' }, { status: 400 });
    }

    const flashcard = await db.flashcard.create({
      data: {
        question: body.question,
        answer: body.answer,
        hint: body.hint || '', // Dodajemy hint, który może być opcjonalny
        chapterId: body.chapterId,
      },
    });

    return NextResponse.json(flashcard);
  } catch (error) {
    console.error('Error in POST /api/admin/flashcard:', error);
    // Check if error object has a property `message`
    let err = error as Error;
    const errorMessage = err.message ? err.message : 'No details provided';
    return NextResponse.json({ error: 'Failed to create flashcard', details: errorMessage }, { status: 500 });
  }
}