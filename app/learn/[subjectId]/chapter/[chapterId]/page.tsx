import { db } from '@/lib/db'

export default async function ChapterPage({params}: {
  params:{ chapterId:string };
}) {

  const flashcards = await fetchFlashcards(params.chapterId);

  return (
    <div className="space-y-20 mt-32">
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col justify-center text-center lg:text-left ">
          <p className="mt-4 text-lg text-foreground">
            Hello from chapter page</p>

        </div>
      </div>
    </div>
  )
}

async function fetchFlashcards(chapterId:string) {
  const flashcards = await db.flashcard.findMany({
    where: {chapterId: chapterId}
  });

  if(!flashcards) {
    throw new Error("Flashcard not found!")
  }

  return flashcards;
}