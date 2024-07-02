
'use client';

import React, { useState, useEffect } from 'react';
import { Chapter } from '@prisma/client';
import { useCurrentUser } from '@/hooks/use-current-user'
import NotFound from '@/app/not-found'

interface ChapterFormProps {
  chapter?: Chapter;
  subjectId: string;
  onSubmit: (chapter: Omit<Chapter, 'id'>) => void;
}

export default function ChapterForm({ chapter, subjectId, onSubmit }: ChapterFormProps) {
  const [formData, setFormData] = useState({ name: '', subjectId: subjectId });
  const user = useCurrentUser()

  if (!user || user.role !== 'ADMIN') {
    return <NotFound />
  }

  useEffect(() => {
    if (chapter) {
      setFormData({ name: chapter.name, subjectId: chapter.subjectId });
    } else {
      setFormData({ name: '', subjectId: subjectId });
    }
  }, [chapter, subjectId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting formData:', formData);
    onSubmit({...formData, subjectId: subjectId});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <input type="hidden" name="subjectId" value={formData.subjectId} />
      <div>
        <button
          type="submit"
          className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {chapter ? 'Update Chapter' : 'Create Chapter'}
        </button>
      </div>
    </form>
  );
}