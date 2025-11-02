import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-6 bg-gray-900/50 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-10">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
            Gemini Image Editor
          </span>
        </h1>
        <p className="mt-1 text-sm text-gray-400">Powered by Gemini 2.5 Flash Image</p>
      </div>
    </header>
  );
};

export default Header;
