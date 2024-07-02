'use client';

import React, { useState } from 'react';
import { Flashcard } from '@prisma/client';
import FlashcardList from '@/app/(root)/(routes)/management/components/FlashcardList'
import FlashcardForm from '@/app/(root)/(routes)/management/components/FlashcardForm'
import { useCurrentUser } from '@/hooks/use-current-user'
import NotFound from '@/app/not-found'

export default function FlashcardManagement({ params }: { params: { id: string } }) {
  const [selectedFlashcard, setSelectedFlashcard] = useState<Flashcard | undefined>(undefined);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const user = useCurrentUser()

  if (!user || user.role !== 'ADMIN') {
    return <NotFound />
  }
  const handleEdit = (flashcard: Flashcard) => {
    setSelectedFlashcard(flashcard);
    setIsFormVisible(true);
  };

  const handleAddNew = () => {
    setSelectedFlashcard(undefined);
    setIsFormVisible(!isFormVisible);
  };

  const handleSubmit = async (flashcardData: Omit<Flashcard, 'id'>) => {
    try {
      console.log('Received flashcardData in FlashcardManagement:', flashcardData);
      const dataToSend = { ...flashcardData, chapterId: params.id };
      console.log('Data to send to API:', dataToSend);

      if (selectedFlashcard) {
        // Update existing flashcard
        const response = await fetch(`/api/admin/flashcard/${selectedFlashcard.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataToSend),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } else {
        // Create new flashcard
        const response = await fetch('/api/admin/flashcard', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataToSend),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }
      setSelectedFlashcard(undefined);
      setIsFormVisible(false);
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      console.error('Error submitting flashcard:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-red-600 shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black">Flashcard Management</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0 space-y-6">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Flashcard List</h2>
                <button
                  onClick={handleAddNew}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                >
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
              <div className="border-t border-gray-200">
                <FlashcardList
                  chapterId={params.id}
                  onEdit={handleEdit}
                  refreshTrigger={refreshTrigger}
                />
              </div>
            </div>
            {isFormVisible && (
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {selectedFlashcard ? 'Edit Flashcard' : 'Add New Flashcard'}
                  </h2>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                  <FlashcardForm flashcard={selectedFlashcard} onSubmit={handleSubmit} chapterId={params.id}/>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}