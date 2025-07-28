import React from 'react';

const KarateIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500 mr-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="1"/>
        <path d="M9 20l3-6 3 6"/>
        <path d="M6 8l6 2 6-2"/>
        <path d="M12 10v4"/>
    </svg>
);

const Header: React.FC = () => {
  return (
    <header className="py-6 text-center">
        <div className="flex items-center justify-center">
            <KarateIcon />
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                Shotokan Kata Randomiser
            </h1>
        </div>
      <p className="text-gray-400 mt-2">Click the card to get a new random kata for your training.</p>
    </header>
  );
};

export default Header;
