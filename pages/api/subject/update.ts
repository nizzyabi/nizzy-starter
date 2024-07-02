import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function PUT(request: Request) {
  console.log("DANE REQUESTU: " +request.body )
  try {
    const body = await request.json();
    const subject = await db.subject.update({
      where: { id: body.id },
      data: body,
    });
    return NextResponse.json(subject);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update subject' }, { status: 500 });
  }
}