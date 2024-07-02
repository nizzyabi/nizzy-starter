
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const subjectId = searchParams.get('subjectId');

  try {
    const chapters = await db.chapter.findMany({
      where: { id: subjectId || undefined },
    });
    console.log('Chapters fetched from database:', chapters); // Dodaj ten log
    return NextResponse.json({ chapters }); // Zwróć obiekt z tablicą chapters
  } catch (error) {
    console.error('Error in GET /api/chapters:', error);
    return NextResponse.json({ error: 'Failed to fetch chapters' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received data in API:', body); // Dodaj ten log

    if (!body.name || !body.subjectId) {
      console.log('Missing required fields:', { name: body.name, subjectId: body.subjectId });
      return NextResponse.json({ error: 'Name and subjectId are required' }, { status: 400 });
    }

    const chapter = await db.chapter.create({
      data: {
        name: body.name,
        subjectId: body.subjectId,
      },
    });

    console.log('Created chapter:', chapter); // Dodaj ten log
    return NextResponse.json(chapter);
  } catch (error) {
    console.error('Error in POST /api/chapter:', error);
    return NextResponse.json({ error: 'Failed to create chapter', details: error.message }, { status: 500 });
  }
}