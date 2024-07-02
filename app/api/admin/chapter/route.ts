
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const subjectId = searchParams.get('subjectId');

  try {
    const chapters = await db.chapter.findMany({
      where: { id: subjectId || undefined },
    });

    return NextResponse.json({ chapters });
  } catch (error) {
    console.error('Error in GET /api/admin/chapters:', error);
    return NextResponse.json({ error: 'Failed to fetch chapters' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

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

    return NextResponse.json(chapter);
  } catch (error) {
    console.error('Error in POST /api/admin/chapter:', error);
    let err = error as Error
    const errorMessage = err.message ? err.message : 'No details provided';
    return NextResponse.json({ error: 'Failed to create chapter', details: errorMessage }, { status: 500 });
  }
}