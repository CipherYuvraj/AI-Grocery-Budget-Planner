import React from 'react';

const ThemeToggle = ({ darkMode, setDarkMode }) => {
  return (
    <div className="fixed top-4 right-4 z-50">
      <label className="inline-flex items-center cursor-pointer">
        <span className="mr-3 text-sm font-medium text-white dark:text-gray-300">Light</span>
        <div className="relative">
          <input 
            type="checkbox" 
            className="sr-only peer"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:bg-cyan-500 transition-all"></div>
          <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white border border-gray-300 rounded-full transition-transform peer-checked:translate-x-full peer-checked:border-white"></div>
        </div>
        <span className="ml-3 text-sm font-medium text-white dark:text-gray-300">Dark</span>
      </label>
    </div>
  );
};

export default ThemeToggle;
