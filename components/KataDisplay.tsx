import React from 'react';
import { Kata } from '../types';

interface KataDisplayProps {
  kata: Kata;
  isNewest?: boolean;
}

const KataDisplay: React.FC<KataDisplayProps> = ({ kata, isNewest = false }) => {
  // Use a subtle scale and border to highlight the newest kata
  const containerClasses = `
    w-full bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-500 ease-in-out
    ${isNewest ? 'border-2 border-red-500 transform scale-105' : 'border-2 border-transparent opacity-80'}`;

  return (
    <div className={containerClasses} aria-label={`Kata: ${kata.name}`}>
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-red-500 tracking-wider uppercase mb-1">{kata.name}</h2>
        <p className="text-md text-gray-400 italic">"{kata.translation}"</p>
      </div>
    </div>
  );
};

export default KataDisplay;