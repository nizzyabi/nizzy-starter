import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    const subject = await db.subject.update({
      where: { id: id },
      data: body,
    });
    return NextResponse.json(subject);
  } catch (error) {
    console.error('Error updating subject:', error);
    return NextResponse.json({ error: 'Failed to update subject' }, { status: 500 });
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  return NextResponse.json({ message: `Subject ID: ${params.id}` });
}