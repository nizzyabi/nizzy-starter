import React from 'react';
import { ResultCounts, Result } from '@/types/flashcard'


interface ProgressBarProps {
  resultCounts: ResultCounts;
  totalAnswered: number;
}

export function ProgressBar({ resultCounts, totalAnswered }: ProgressBarProps): JSX.Element {
  const getWidth = (count: number): string => {
    return totalAnswered > 0 ? `${(count / totalAnswered) * 100}%` : '0%';
  };

  const renderBar = (result: Result, color: string, accumulatedWidth: number): JSX.Element => {
    const width = getWidth(resultCounts[result]);
    const style = {
      width: width,
      left: `${accumulatedWidth}%`
    };
    return <div className={`absolute top-0 h-2.5 rounded-full ${color}`} style={style}></div>;
  };

  let accumulatedWidth = 0;
  const bars = [
    { result: Result.VERY_DIFFICULT, color: 'bg-red-600' },
    { result: Result.DIFFICULT, color: 'bg-yellow-400' },
    { result: Result.GOOD, color: 'bg-blue-600' },
    { result: Result.VERY_GOOD, color: 'bg-green-500' }
  ];

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700 relative">
      {bars.map(({ result, color }) => {
        const bar = renderBar(result, color, accumulatedWidth);
        accumulatedWidth += (resultCounts[result] / totalAnswered) * 100;
        return bar;
      })}
    </div>
  );
}