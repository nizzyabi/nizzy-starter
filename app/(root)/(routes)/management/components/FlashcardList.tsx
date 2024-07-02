import React, { useEffect, useState } from 'react'
import { Flashcard } from '@prisma/client'
import { useCurrentUser } from '@/hooks/use-current-user'
import NotFound from '@/app/not-found'

interface FlashcardListProps {
  onEdit: (flashcard: Flashcard) => void;
  refreshTrigger: number;
  chapterId: string;
}

export default function FlashcardList({ onEdit, refreshTrigger, chapterId }: FlashcardListProps) {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const user = useCurrentUser()

  if (!user || user.role !== 'ADMIN') {
    return <NotFound />
  }
  useEffect(() => {
    fetchFlashcards()
  }, [refreshTrigger, chapterId])


  const fetchFlashcards = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/admin/flashcard/${chapterId}`)
      const data = await response.json()
      if (Array.isArray(data)) {
        setFlashcards(data)
      } else if (data && typeof data === 'object' && Array.isArray(data.flashcard)) {
        setFlashcards(data.flashcard)
      } else {
        throw new Error('Received data is not in the expected format')
      }
    }catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error fetching chapters:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading chapters...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (flashcards.length === 0) {
    return <div>No chapters found.</div>;
  }

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Question</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Answer</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hint</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
      </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
      {flashcards.map((flashcard) => (
        <tr key={flashcard.id}>
          <td className="px-6 py-4 max-w-xs">
            <div className="truncate" title={flashcard.question}>{flashcard.question}</div>
          </td>
          <td className="px-6 py-4 max-w-xs">
            <div className="truncate" title={flashcard.answer}>{flashcard.answer}</div>
          </td>
          <td className="px-6 py-4 max-w-xs">
            <div className="truncate" title={flashcard.hint}>{flashcard.hint}</div>
          </td>
          <td className="px-6 py-4">
            <button onClick={() => onEdit(flashcard)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
          </td>
        </tr>
      ))}
      </tbody>
    </table>
  )
}