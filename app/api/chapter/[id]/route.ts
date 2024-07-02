import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    const chapter = await db.chapter.update({
      where: { id: id },
      data: body,
    });
    return NextResponse.json(chapter);
  } catch (error) {
    console.error('Error updating chapter:', error);
    return NextResponse.json({ error: 'Failed to update chapter' }, { status: 500 });
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const chapters = await db.chapter.findMany({
      where: { subjectId: id },
    });
    return NextResponse.json(chapters);
  } catch (error) {
    console.error('Error in GET /api/subjects/[id]/chapters:', error);
    return NextResponse.json({ error: 'Failed to fetch chapters' }, { status: 500 });
  }
}