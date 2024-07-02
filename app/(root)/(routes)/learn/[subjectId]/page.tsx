'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCurrentUser } from '@/hooks/use-current-user';

enum Result {
  VERY_DIFFICULT = 'VERY_DIFFICULT',
  DIFFICULT = 'DIFFICULT',
  GOOD = 'GOOD',
  VERY_GOOD = 'VERY_GOOD'
}

interface ResultCounts {
  [Result.VERY_DIFFICULT]: number;
  [Result.DIFFICULT]: number;
  [Result.GOOD]: number;
  [Result.VERY_GOOD]: number;
}

interface Chapter {
  id: string;
  name: string;
  subjectId: string;
  totalFlashcards: number;
  answeredFlashcards: number;
  resultCounts: ResultCounts;
}

interface Subject {
  id: string;
  name: string;
}

interface LearnDetailsProps {
  params: { subjectId: string };
}

interface ProgressBarProps {
  resultCounts: ResultCounts;
  totalAnswered: number;
}

function ProgressBar({ resultCounts, totalAnswered }: ProgressBarProps): JSX.Element {
  const getWidth = (count: number): string => {
    return totalAnswered > 0 ? `${(count / totalAnswered) * 100}%` : '0%';
  };

  let accumulatedWidth = 0;

  const renderBar = (result: Result, color: string): JSX.Element => {
    const width = getWidth(resultCounts[result]);
    const style = {
      width: width,
      left: `${accumulatedWidth}%`
    };
    accumulatedWidth += (resultCounts[result] / totalAnswered) * 100;
    return <div className={`absolute top-0 h-2.5 rounded-full ${color}`} style={style}></div>;
  };

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700 relative">
      {renderBar(Result.VERY_DIFFICULT, 'bg-red-600')}
      {renderBar(Result.DIFFICULT, 'bg-yellow-400')}
      {renderBar(Result.GOOD, 'bg-blue-600')}
      {renderBar(Result.VERY_GOOD, 'bg-green-500')}
    </div>
  );
}

export default function LearnDetails({ params }: LearnDetailsProps): JSX.Element {
  const user = useCurrentUser();
  const [subject, setSubject] = useState<Subject | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (user) {
        try {
          const response = await fetch(`/api/subject/${params.subjectId}`, {
            headers: {
              'X-User-Email': user?.email || ''
            }
          });
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const data = await response.json();
          setSubject(data.subject);
          setChapters(data.chapters);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [user, params.subjectId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please sign in to view this page.</div>;
  }

  if (!subject || chapters.length === 0) {
    return <div>No data available.</div>;
  }

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
              <p>Answered: {Object.values(chapter.resultCounts).reduce((a, b) => a + b, 0)}</p>
              <p>Progress: {
                chapter.totalFlashcards > 0
                  ? ((chapter.answeredFlashcards / chapter.totalFlashcards) * 100).toFixed(2)
                  : '0'
              }%</p>
              <ProgressBar resultCounts={chapter.resultCounts} totalAnswered={chapter.answeredFlashcards} />
              <div className="text-xs mt-1">
                <span className="text-red-600">Very Difficult: {chapter.resultCounts[Result.VERY_DIFFICULT]}</span> |
                <span className="text-yellow-400"> Difficult: {chapter.resultCounts[Result.DIFFICULT]}</span> |
                <span className="text-blue-600"> Good: {chapter.resultCounts[Result.GOOD]}</span> |
                <span className="text-green-500"> Very Good: {chapter.resultCounts[Result.VERY_GOOD]}</span>
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
  );
}