import React from 'react';
import { Kata } from '../types';

interface KataDisplayProps {
  kata: Kata | null;
  onClick: () => void;
  isAnimating: boolean;
}

const KataDisplay: React.FC<KataDisplayProps> = ({ kata, onClick, isAnimating }) => {
  if (!kata) {
    return (
      <div className="mt-8 text-center p-8 border-2 border-dashed border-gray-700 rounded-lg w-full max-w-xl min-h-[12rem] flex flex-col justify-center items-center">
        <p className="text-gray-400 text-lg">Preparing for your training...</p>
      </div>
    );
  }

  return (
    <div 
        className="mt-8 w-full max-w-xl bg-gray-800 rounded-xl shadow-2xl overflow-hidden animate-fade-in cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50"
        onClick={isAnimating ? undefined : onClick}
        onKeyDown={(e) => { if (!isAnimating && (e.key === 'Enter' || e.key === ' ')) onClick(); }}
        role="button"
        tabIndex={0}
        aria-live="polite"
        aria-label={`Current kata: ${kata.name}. Click to select a new one.`}
    >
      <div className="p-8 text-center min-h-[12rem] flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-red-500 tracking-wider uppercase mb-2">{kata.name}</h2>
        {!isAnimating && (
            <p className="text-center text-lg text-gray-400 italic animate-fade-in">"{kata.translation}"</p>
        )}
      </div>
      
       <style>{`
        .animate-fade-in {
            animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default KataDisplay;
