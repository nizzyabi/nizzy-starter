import React from 'react';
import { db } from '@/lib/db'
import Link from 'next/link'

interface Chapter {
  id: string;
  name: string;
  subjectId: string;
  totalFlashcards: number;
  answeredFlashcards: number;
}

interface Subject {
  id: string;
  name: string;
}

interface LearnDetailsProps {
  params: { subjectId: string };
}

const LearnDetails: React.FC<LearnDetailsProps> = async ({ params }) => {
  const { subject, chapters } = await fetchSubjectAndChapters(params.subjectId);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="font-bold text-2xl mb-4">{`Subject: ${subject.name}`}</h1>
      <h2 className="font-bold text-xl mb-4">Chapters list:</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {chapters.map((chapter) => (
          <div key={chapter.id}
               className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{chapter.name}</h5>
            <div className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              <p>Total cards: {chapter.totalFlashcards}</p>
              <p>Answered: {chapter.answeredFlashcards}</p>
              <p>Progress: {
                chapter.totalFlashcards > 0
                  ? ((chapter.answeredFlashcards / chapter.totalFlashcards) * 100).toFixed(2)
                  : '0'
              }%</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                <div
                  className="bg-green-600 h-2.5 rounded-full dark:bg-green-500"
                  style={{
                    width: chapter.totalFlashcards > 0
                      ? `${(chapter.answeredFlashcards / chapter.totalFlashcards) * 100}%`
                      : '0%'
                  }}
                ></div>
              </div>
            </div>
            <Link href={`/learn/${chapter.subjectId}/chapter/${chapter.id}`}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Start Learning
              <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                   fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

async function fetchSubjectAndChapters(subjectId: string): Promise<{ subject: Subject, chapters: Chapter[] }> {
  const subject = await db.subject.findUnique({
    where: { id: subjectId }
  })
  if (!subject) {
    throw new Error('Subject not found')
  }

  const chapters = await db.chapter.findMany({
    where: { subjectId: subjectId },
    include: {
      Flashcard: {
        include: {
          results: true
        }
      }
    }
  })
  if (!chapters) {
    throw new Error('Chapters not found')
  }

  const chaptersWithStats = chapters.map(chapter => ({
    ...chapter,
    totalFlashcards: chapter.Flashcard.length,
    answeredFlashcards: chapter.Flashcard.filter(flashcard => flashcard.results.length > 0).length,
  }));

  return { subject, chapters: chaptersWithStats };
}

export default LearnDetails;