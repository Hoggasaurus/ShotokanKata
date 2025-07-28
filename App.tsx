import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import KataDisplay from './components/KataDisplay';
import { SHOTOKAN_KATAS } from './constants';
import { Kata } from './types';

const App: React.FC = () => {
  const [selectedKata, setSelectedKata] = useState<Kata | null>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(true);

  const selectRandomKata = useCallback(() => {
    // Prevent re-triggering while an animation is already in progress
    if (isAnimating && selectedKata !== null) return;

    setIsAnimating(true);
    let iteration = 0;
    const interval = setInterval(() => {
      iteration++;
      const randomIndex = Math.floor(Math.random() * SHOTOKAN_KATAS.length);
      const randomKata = SHOTOKAN_KATAS[randomIndex];
      setSelectedKata(randomKata);

      if (iteration >= 10) { // Number of "spins"
        clearInterval(interval);
        const finalRandomIndex = Math.floor(Math.random() * SHOTOKAN_KATAS.length);
        setSelectedKata(SHOTOKAN_KATAS[finalRandomIndex]);
        setIsAnimating(false);
      }
    }, 100); // Speed of "spin"
  }, [isAnimating, selectedKata]);

  useEffect(() => {
    // Select the first kata when the component mounts
    selectRandomKata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Header />
      <main className="flex flex-col items-center justify-center w-full px-4 mt-4">
        <KataDisplay 
            kata={selectedKata}
            onClick={selectRandomKata}
            isAnimating={isAnimating}
        />
      </main>
      <footer className="w-full text-center p-4 mt-auto">
        <p className="text-xs text-gray-600">Built for Shotokan karateka worldwide. Oss!</p>
      </footer>
    </div>
  );
};

export default App;
