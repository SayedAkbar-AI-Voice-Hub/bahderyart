
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ImageManager from './ImageManager';

const navItems = [
  { label: 'ARTWORKS', path: '/artworks' },
  { label: 'INDOOR', path: '/indoor' },
  { label: 'MAKING OF', path: '/making-of' },
  { label: 'ABOUT', path: '/about' },
  { label: 'CONTACT', path: '/contact' },
  { label: 'STORE', path: '/store' },
];

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <div className="min-h-screen flex flex-col font-light bg-white">
      <ImageManager />
      
      {/* Header with Branding and Navigation */}
      <header 
        className={`z-40 w-full px-8 py-10 flex flex-col lg:flex-row items-start justify-between gap-6 transition-all duration-700 ${
          isHome ? 'absolute top-0 text-white' : 'relative text-gray-900 border-b border-gray-50'
        }`}
      >
        {/* Branding: Name and Description stacked vertically */}
        <div className="flex flex-col">
          <Link 
            to="/" 
            className="text-3xl sm:text-4xl serif hover:opacity-70 transition-opacity whitespace-nowrap block leading-tight"
          >
            Bahadery Art
          </Link>
          <p className={`text-[10px] italic max-w-[220px] leading-snug mt-1 transition-opacity opacity-60 ${isHome ? 'text-white' : 'text-gray-500'}`}>
            Artist passionate about drawing, nature, science and history.
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-wrap items-center gap-x-6 sm:gap-x-8 lg:gap-x-10 mt-2 lg:mt-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-[10px] sm:text-[11px] tracking-[0.25em] font-medium transition-colors hover:opacity-50 ${
                pathname === item.path ? 'opacity-100 font-bold underline underline-offset-8' : 'opacity-80'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      {/* Content wrapper */}
      <main className={`flex-grow ${isHome ? 'h-screen' : 'max-w-7xl mx-auto w-full px-4 sm:px-8 py-12'}`}>
        {children}
      </main>

      {!isHome && (
        <footer className="py-20 border-t border-gray-100 flex flex-col items-center text-gray-400 text-[10px] tracking-[0.3em] uppercase">
          <div className="flex gap-8 mb-6">
            <a 
              href="https://www.instagram.com/nangialaibahadery1992/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-black transition-colors"
            >
              Instagram
            </a>
            <a 
              href="https://www.facebook.com/abdulwahid.bahaduri1/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-black transition-colors"
            >
              Facebook
            </a>
          </div>
          <p>&copy; {new Date().getFullYear()} Bahadery Art - All Rights Reserved</p>
        </footer>
      )}
    </div>
  );
};

export default Layout;
