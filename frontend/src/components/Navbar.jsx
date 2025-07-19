// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, User, ChevronDown } from 'lucide-react';

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileOpen && !event.target.closest('.profile-dropdown')) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isProfileOpen]);

  const profileItems = [
    { name: 'Profile', href: '/profile' },
    { name: 'Settings', href: '/settings' },
    { name: 'Sign Out', href: '/logout' }
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      theme === 'dark' 
        ? 'bg-slate-900/95 border-slate-800' 
        : 'bg-white/95 border-slate-200'
    } backdrop-blur-md border-b`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2 group">
            <div className={`w-10 h-10 rounded-xl ${
              theme === 'dark' 
                ? 'bg-gradient-to-br from-blue-400 to-purple-500' 
                : 'bg-gradient-to-br from-blue-600 to-purple-600'
            } flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className={`text-2xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            } group-hover:text-blue-600 transition-colors duration-300`}>
              Prepify
            </span>
          </a>

          {/* Right Section: Theme & Profile */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-3 rounded-full transition-all duration-300 ${
                theme === 'dark' 
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white' 
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900'
              } hover:scale-110`}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>

            {/* Profile Dropdown */}
            <div className="relative profile-dropdown">
              <button
                onClick={toggleProfile}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                  theme === 'dark'
                    ? 'text-slate-300 hover:text-white hover:bg-slate-800'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {isProfileOpen && (
                <div className={`absolute right-0 mt-2 w-48 rounded-xl shadow-lg border ${
                  theme === 'dark'
                    ? 'bg-slate-800 border-slate-700'
                    : 'bg-white border-slate-200'
                } backdrop-blur-md animate-in fade-in-0 zoom-in-95 duration-200`}>
                  <div className="p-2">
                    {profileItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={`block px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          theme === 'dark'
                            ? 'text-slate-300 hover:text-white hover:bg-slate-700'
                            : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                        }`}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
