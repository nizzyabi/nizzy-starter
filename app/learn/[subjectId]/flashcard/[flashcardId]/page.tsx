// learn/[subjectId]/flashcard/[flashcardId]/page.tsx

import { db } from '@/lib/db'

export default async function FlashcardDetails({ params }: { params:{ flashcardId:string, subjectId:string }; }) {

  const { flashcard, results } = await fetchFlashcardAndResults(params.flashcardId);

  return (
    <div className="p-4">
      <h1 className="font-bold text-2xl mb-4">{`Flashcard question: ${flashcard.question}`}</h1>
      <h2 className="font-bold text-xl mb-4">Hint: {flashcard.hint}</h2>
      <h2 className="font-bold text-xl mb-4">Answer: {flashcard.answer}</h2>

      <h2 className="font-bold text-xl mb-4">Results:</h2>
      <div className="flex flex-col gap-4">

        {results.map((result, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-md p-4 cursor-pointer hover:border-blue-500"
          >
            <p className="text-center">{`User ID: ${result.userId}, Result: ${result.result}`}</p>
          </div>
        ))}

      </div>
    </div>
  )
}

async function fetchFlashcardAndResults(flashcardId: string) {
  // Load the flashcard data
  const flashcard = await db.flashcard.findUnique({
    where: { id: flashcardId }
  });
  if(!flashcard) {
    //@TODO fix it! Change for the 404 page
    throw new Error('Flashcard not found');
  }

  // Now load the results related to this flashcard
  const results = await db.userFlashcardResult.findMany({
    where: { flashcardId: flashcardId }
  });

  if(!results) {
    throw new Error('Result not found');
  }

  return { flashcard, results };
}
