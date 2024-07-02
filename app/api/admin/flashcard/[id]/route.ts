import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const chapters = await db.flashcard.findMany({
      where: { chapterId: id },
    });
    return NextResponse.json(chapters);
  } catch (error) {
    console.error('Error in GET /api/subjects/[id]/chapters:', error);
    return NextResponse.json({ error: 'Failed to fetch chapters' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    const { question, hint, answer, chapterId } = body;

    const flashcard = await db.flashcard.update({
      where: { id: id },
      data: {
        question,
        hint,
        answer,
        chapterId
      },
    });

    return NextResponse.json(flashcard);
  } catch (error) {
    console.error('Error updating flashcard:', error);
    return NextResponse.json({ error: 'Failed to update flashcard' }, { status: 500 });
  }
}