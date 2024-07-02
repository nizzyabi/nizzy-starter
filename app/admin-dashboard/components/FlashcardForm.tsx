'use client';

import React, { useState, useEffect } from 'react';
import { Flashcard } from '@prisma/client';

interface FlashcardFormProps {
  flashcard?: Flashcard;
  onSubmit: (flashcard: Omit<Flashcard, 'id'>) => void;
  chapterId: string;
}

export default function FlashcardForm({ flashcard, onSubmit, chapterId }: FlashcardFormProps) {
  const [formData, setFormData] = useState({ question: '', answer: '' });

  useEffect(() => {
    if (flashcard) {
      setFormData({ question: flashcard.question, answer: flashcard.answer });
    }
  }, [flashcard]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting formData:', formData);
    onSubmit({ ...formData, chapterId: chapterId });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-4">Flashcard Fields</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-1">Question</label>
            <input type="text" name="question" id="question" value={formData.question} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
            <textarea name="answer" id="answer" value={formData.answer} onChange={handleChange} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" />
          </div>
        </div>
      </div>
      <div>
        <button type="submit" className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          {flashcard ? 'Update Flashcard' : 'Create Flashcard'}
        </button>
      </div>
    </form>
  );
}