import React from 'react';
import fetchFlashcards from '@/lib/fetchFlashcards'
import Flashcards from '@/app/learn/_components/flashcards'
import { auth } from '@/auth'
import { Flashcard } from '@prisma/client'



export default async function FlashcardsPage({params,}: { params:{ chapterId:string };}) {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return <div>Please log in to see the view of flashcards</div>
  }

  const flashcards: Flashcard[] = await fetchFlashcards(params.chapterId);

  return (
    <div>
      <Flashcards flashcards={flashcards} userId={session.user.id} />
    </div>
  );
}