'use client';

import React, { useState } from 'react';
import { FaLightbulb, FaCheck } from 'react-icons/fa';
import { Result, Flashcard } from '@prisma/client';

interface FlashcardsProps {
  flashcards: Flashcard[];
  userId: string;
}

const Flashcards: React.FC<FlashcardsProps> = ({ flashcards, userId }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : flashcards.length - 1));
    resetCard();
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < flashcards.length - 1 ? prevIndex + 1 : 0));
    resetCard();
  };

  const resetCard = () => {
    setShowHint(false);
    setShowAnswer(false);
  };

  const handleResultClick = async (result: Result) => {
    try {
      const response = await fetch('/api/flashcard/saveFlashcardResult', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          flashcardId: flashcards[currentIndex].id,
          result,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save result');
      }

      const savedResult = await response.json();
      console.log(`Result saved for flashcard ${flashcards[currentIndex].id}:`, savedResult);
      handleNext();
    } catch (error) {
      console.error('Error saving result:', error);
      // Możesz tu dodać jakiś komunikat dla użytkownika o błędzie
    }
  };

  if (flashcards.length === 0) {
    return <div>Nie znaleziony żadnych kart</div>;
  }

  const { question, hint, answer } = flashcards[currentIndex];

  return (
    <div className="p-4 bg-white shadow-md rounded-lg w-full max-w-md mx-auto mt-10">
      <h1 className="font-bold text-2xl mb-4">Karta</h1>
      <div className="mb-4">
        <p className="text-lg font-medium">Pytanie:</p>
        <p className="text-gray-700">{question}</p>
      </div>
      {!showHint && (
        <button
          onClick={() => setShowHint(true)}
          className="mb-4 flex items-center bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
        >
          <FaLightbulb className="mr-2" /> Pokaż podpowiedz
        </button>
      )}
      {showHint && (
        <div className="mb-4">
          <p className="text-lg font-medium">Podpowiedz:</p>
          <p className="text-gray-700">{hint}</p>
        </div>
      )}
      {!showAnswer && (
        <button
          onClick={() => setShowAnswer(true)}
          className="mb-4 flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          <FaCheck className="mr-2" /> Pokaż odpowiedz
        </button>
      )}
      {showAnswer && (
        <div className="mb-4">
          <p className="text-lg font-medium">Odpowiedz:</p>
          <p className="text-gray-700">{answer}</p>
        </div>
      )}
      {showAnswer && (
        <div className="mb-4">
          <p className="text-lg font-medium">Jak dobrze znasz odpowiedź?</p>
          <div className="flex justify-between mt-2">
            {Object.values(Result).map((result) => (
              <button
                key={result}
                onClick={() => handleResultClick(result)}
                className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 text-sm"
              >
                {resultTranslations[result] || result.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="flex justify-between">
        <button
          onClick={handlePrev}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Poprzednie
        </button>
        <button
          onClick={handleNext}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Następne
        </button>
      </div>
    </div>
  );
};

export default Flashcards;

const resultTranslations = {
  VERY_GOOD: 'Bardzo łatwe',
  GOOD: 'Łatwe',
  DIFFICULT: 'Trudne',
  VERY_DIFFICULT: 'Bardzo trudne'
};