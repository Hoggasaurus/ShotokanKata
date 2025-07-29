import React from 'react';
import { Kata } from '../types';

interface KataDisplayProps {
  kata: Kata;
  isNewest?: boolean;
  onClick?: () => void;
}

const KataDisplay: React.FC<KataDisplayProps> = ({ kata, isNewest = false, onClick }) => {
  // Use a subtle scale and border to highlight the newest kata
  const containerClasses = `
    w-full bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-500 ease-in-out
    ${isNewest ? 'border-2 border-red-500 transform scale-105' : 'border-2 border-transparent opacity-80'}
    ${onClick ? `cursor-pointer ${isNewest ? 'hover:brightness-110' : 'hover:opacity-100 hover:border-red-500/50'}` : ''}`;

  return (
    <div 
      className={containerClasses} 
      aria-label={`Kata: ${kata.name}`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-red-500 tracking-wider uppercase mb-1">{kata.name}</h2>
        <p className="text-md text-gray-400 italic">"{kata.translation}"</p>
      </div>
    </div>
  );
};

export default KataDisplay;
