import React from 'react';
import fetchFlashcards from '@/lib/fetchFlashcards'
import { auth } from '@/auth'
import { Flashcard } from '@prisma/client'
import Flashcards from '@/app/(root)/(routes)/learn/_components/flashcards'



export default async function FlashcardsPage({params,}: { params:{ chapterId:string, subjectId:string };}) {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return <div>Please log in to see the view of flashcards</div>
  }

  const flashcards: Flashcard[] = await fetchFlashcards(params.chapterId);

  return (
    <div>
      <Flashcards flashcards={flashcards} userId={session.user.id} subjectId={params.subjectId}/>
    </div>
  );
}