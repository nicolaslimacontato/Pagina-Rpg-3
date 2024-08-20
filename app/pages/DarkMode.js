// app/components/DarkModeToggle.js
"use client";

import { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button
      onClick={toggleDarkMode}
      className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
        darkMode ? 'bg-gray-700' : 'bg-yellow-400'
      }`}
    >
      <div
        className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
          darkMode ? 'translate-x-7 transition-delay-300' : ''
        }`}
      >
        {darkMode ? (
          <FaMoon className="text-yellow-400 m-1" />
        ) : (
          <FaSun className="text-gray-700 m-1" />
        )}
      </div>
    </button>
  );
}