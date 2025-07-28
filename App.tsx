import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import KataDisplay from './components/KataDisplay';
import ActionButton from './components/ActionButton';
import { SHOTOKAN_KATAS } from './constants';
import { Kata } from './types';

const App: React.FC = () => {
  const [kataHistory, setKataHistory] = useState<Kata[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const addRandomKata = useCallback(() => {
    if (isGenerating) return;

    setIsGenerating(true);

    const randomIndex = Math.floor(Math.random() * SHOTOKAN_KATAS.length);
    const newKata: Kata = {
        ...SHOTOKAN_KATAS[randomIndex],
        id: `kata-${Date.now()}-${Math.floor(Math.random() * 1000)}` // More robust unique ID
    };

    // Add new kata to the top, and keep only the last 5
    setKataHistory(prevHistory => [newKata, ...prevHistory].slice(0, 5));

    setTimeout(() => {
      setIsGenerating(false);
    }, 500); // Prevent spam clicking & allow animation to be seen
  }, [isGenerating]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 pt-10 bg-gray-900 text-white antialiased">
      <Header />
      <main className="flex flex-col items-center w-full px-4 mt-8">
        <div className="mb-8">
          <ActionButton onClick={addRandomKata} disabled={isGenerating}>
            {isGenerating ? 'Generating...' : 'Generate New Kata'}
          </ActionButton>
        </div>

        {kataHistory.length === 0 ? (
          <div className="mt-8 text-center p-8 border-2 border-dashed border-gray-700 rounded-lg w-full max-w-xl min-h-[12rem] flex flex-col justify-center items-center">
            <p className="text-gray-400 text-lg">Click "Generate New Kata" to begin your training session.</p>
          </div>
        ) : (
          <div className="w-full max-w-xl space-y-6" role="list" aria-live="polite">
            <h3 className="text-xl font-semibold text-white mb-2 text-center">Your Training List (Last 5)</h3>
            {kataHistory.map((kata, index) => (
              <div key={kata.id} className="animate-slide-in" role="listitem">
                <KataDisplay 
                  kata={kata}
                  isNewest={index === 0}
                />
              </div>
            ))}
          </div>
        )}
      </main>
      <footer className="w-full text-center p-4 mt-auto">
        <p className="text-xs text-gray-600">Built for Shotokan karateka worldwide. Oss!</p>
      </footer>
       <style>{`
        .animate-slide-in {
            animation: slideIn 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
        }
        @keyframes slideIn {
            from { 
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
      `}</style>
    </div>
  );
};

export default App;