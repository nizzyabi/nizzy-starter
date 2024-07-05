'use client';

import React, { useState } from 'react';
import { FaArrowLeft, FaLightbulb, FaSync, FaTimes, FaUndo } from 'react-icons/fa'
import { Result, Flashcard } from '@prisma/client';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface FlashcardsProps {
  flashcards: Flashcard[];
  userId: string;
  subjectId: string;
}

const Flashcards: React.FC<FlashcardsProps> = ({ flashcards, userId, subjectId }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  const handlePrev = (): void => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : flashcards.length - 1));
    setIsFlipped(false);
  };

  const handleNext = (): void => {
    setCurrentIndex((prevIndex) => (prevIndex < flashcards.length - 1 ? prevIndex + 1 : 0));
    setIsFlipped(false);
  };

  const handleFlip = (): void => {
    setIsFlipped(!isFlipped);
  };

  const handleResultClick = async (result: Result): Promise<void> => {
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
    return <div>Nie znaleziono żadnych kart</div>;
  }

  const { question, hint, answer } = flashcards[currentIndex];

  return (
    <div className="p-4 w-full max-w-3xl mx-auto mt-10 min-w-[500px] resize overflow-auto">
      <div className="flex justify-between items-center mb-4">
        <Link href={`/learn/${subjectId}`} className="inline-block">
          <button className="flex items-center text-blue-500 hover:text-blue-700">
            <FaArrowLeft className="mr-2" />
            Powrót do rozdziału
          </button>
        </Link>
        <button
          onClick={() => setShowHint(true)}
          className="flex items-center bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
        >
          <FaLightbulb className="scroll-mr-0.5" />
        </button>
      </div>

      <motion.div
        className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer"
        style={{ perspective: 1000 }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative h-96" style={{ transformStyle: 'preserve-3d' }} >
          {/* Front of the card */}
          <div className={`absolute w-full h-full backface-hidden ${isFlipped ? 'hidden' : ''}`}>
            <div className="p-6 h-full flex flex-col justify-between ">
              <h2 className="text-xl font-bold mb-4">Pytanie:</h2>
              <p className="text-gray-700 flex-grow">{question}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleFlip}
                className="mt-4 flex items-center justify-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 w-full"
              >
                <FaSync className="mr-2" /> Pokaż odpowiedź
              </motion.button>
            </div>
          </div>

          {/* Back of the card */}
          <div className={`absolute w-full h-full backface-hidden ${!isFlipped ? 'hidden' : ''}`} style={{ transform: 'rotateY(180deg)' }}>
            <div className="p-6 h-full flex flex-col justify-between">
              <div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleFlip}
                  className="mt-4 flex items-start bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-1/8"
                >
                  <FaUndo className="mr-2" />
                </motion.button>
                <h2 className="text-xl font-bold mb-4">Odpowiedź:</h2>
                <p className="text-gray-700">{answer}</p>
              </div>
              <div className="mt-4">
                <p className="text-lg font-medium mb-2">Jak dobrze znasz odpowiedź?</p>
                <div className="grid grid-cols-2 gap-2">
                  {Object.values(Result).map((result) => (
                    <motion.button
                      key={result}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleResultClick(result)}
                      className={`text-white px-3 py-2 rounded-lg hover:opacity-80 text-sm ${
                        result === 'VERY_GOOD' ? 'bg-green-500' :
                          result === 'GOOD' ? 'bg-blue-500' :
                            result === 'DIFFICULT' ? 'bg-yellow-500' :
                              result === 'VERY_DIFFICULT' ? 'bg-red-500' :
                                'bg-gray-500'
                      }`}
                    >
                      {resultTranslations[result] || result.replace('_', ' ')}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 gap-2 mt-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePrev}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Poprzednie
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Następne
        </motion.button>
      </div>

      {showHint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Podpowiedź</h2>
              <button
                onClick={() => setShowHint(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            <p className="text-gray-700">{hint}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Flashcards;

const resultTranslations: Record<Result, string> = {
  VERY_GOOD: 'Bardzo łatwe',
  GOOD: 'Łatwe',
  DIFFICULT: 'Trudne',
  VERY_DIFFICULT: 'Bardzo trudne'
};