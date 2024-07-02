// app/admin-dashboard/components/ChapterList.tsx
import React, { useState, useEffect } from 'react';
import { Chapter } from '@prisma/client';
import Link from 'next/link';

interface ChapterListProps {
  subjectId: string;
  onEdit: (chapter: Chapter) => void;
  refreshTrigger: number;
}

export default function ChapterList({ subjectId, onEdit, refreshTrigger }: ChapterListProps) {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchChapters();
  }, [refreshTrigger, subjectId]);

  const fetchChapters = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/chapter/${subjectId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch chapters');
      }
      const data = await response.json();
      console.log('Received data:', data); // Dodaj ten log
      if (Array.isArray(data)) {
        setChapters(data);
      } else if (data && typeof data === 'object' && Array.isArray(data.chapters)) {
        setChapters(data.chapters);
      } else {
        throw new Error('Received data is not in the expected format');
      }
    } catch (err) {
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

  if (chapters.length === 0) {
    return <div>No chapters found.</div>;
  }

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edit</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Flashcards</th>
      </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
      {chapters.map((chapter) => (
        <tr key={chapter.id}>
          <td className="px-6 py-4 whitespace-nowrap">{chapter.name}</td>
          <td className="px-6 py-4 whitespace-nowrap">
            <button onClick={() => onEdit(chapter)} className="text-indigo-600 hover:text-indigo-900">
              Manage Chapter
            </button>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <Link href={`/management/flashcard/${chapter.id}`} className="text-green-600 hover:text-green-900">
              Manage Flashcards
            </Link>
          </td>
        </tr>
      ))}
      </tbody>
    </table>
  );
}