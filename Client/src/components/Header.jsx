import React from 'react';

export default function Header() {
  return (
    <header className="flex flex-wrap justify-between items-center py-6 px-4 md:px-8">
      {/* Logo */}
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
        MAGAZINE
      </h1>

      {/* Navigation */}
      <nav className="mt-4 md:mt-0">
        {/* Menu for larger screens */}
        <div className="hidden md:flex space-x-6">
          <a href="#" className="text-sm text-gray-500 hover:text-black">
            Magazine
          </a>
          <a href="#" className="text-sm text-gray-500 hover:text-black">
            Authors
          </a>
          <a href="#" className="text-sm text-gray-500 hover:text-black">
            Podcast
          </a>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex flex-col space-y-2">
          <a href="#" className="text-sm text-gray-500 hover:text-black">
            Magazine
          </a>
          <a href="#" className="text-sm text-gray-500 hover:text-black">
            Authors
          </a>
          <a href="#" className="text-sm text-gray-500 hover:text-black">
            Podcast
          </a>
        </div>
      </nav>
    </header>
  );
}
