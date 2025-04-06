import React, { useState, useEffect } from 'react';

const ResponseCard = ({ title, response, isLoading, error }) => {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Initialize theme from localStorage if available
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);
  
  // Toggle theme function
  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };
  
  // Dynamic theme classes
  const themeClasses = {
    card: isDarkMode 
      ? "bg-gray-900 border-gray-800 text-gray-200" 
      : "bg-white border-gray-200 text-gray-800",
    pre: isDarkMode 
      ? "bg-gray-800/70 border-gray-700 text-gray-200" 
      : "bg-gray-100/70 border-gray-300 text-gray-800",
    lineNumbers: isDarkMode 
      ? "bg-gray-900/50 border-gray-700 text-gray-500" 
      : "bg-gray-200/50 border-gray-300 text-gray-500",
  };

  return (
    <div className={`p-8 rounded-xl shadow-lg mt-8 border relative overflow-hidden ${themeClasses.card}`}>
      {/* Theme toggle button */}
      <div className="absolute top-4 right-4 z-20">
        <button 
          onClick={toggleTheme}
          className={`p-2 rounded-full transition-colors ${
            isDarkMode 
              ? "bg-gray-700 hover:bg-gray-600" 
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? (
            <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>
      </div>
      
      {/* Top decorative elements */}
      <div className="absolute -top-16 -right-16 w-40 h-40 bg-gradient-to-br from-cyan-500/20 to-purple-600/20 rounded-full blur-xl"></div>
      <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-gradient-to-tr from-blue-500/10 to-emerald-600/10 rounded-full blur-xl"></div>
     
      {/* Corner decorative elements */}
      <div className="absolute top-0 left-0 w-16 h-1 bg-gradient-to-r from-cyan-500 to-transparent"></div>
      <div className="absolute top-0 left-0 w-1 h-16 bg-gradient-to-b from-cyan-500 to-transparent"></div>
      <div className="absolute top-0 right-0 w-16 h-1 bg-gradient-to-l from-purple-500 to-transparent"></div>
      <div className="absolute top-0 right-0 w-1 h-16 bg-gradient-to-b from-purple-500 to-transparent"></div>
     
      <div className="relative z-10">
        {/* Title with animated gradient */}
        <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 inline-block pb-1 border-b border-gray-700">
          {title}
        </h2>
       
        {/* Content area */}
        <div className="mt-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-48">
              <div className="relative">
                <div className="h-16 w-16 rounded-full border-t-4 border-b-4 border-cyan-400 animate-spin"></div>
                <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-t-4 border-b-4 border-purple-500 animate-spin animate-pulse opacity-70"></div>
              </div>
            </div>
          ) : error ? (
            <div className="text-red-400 p-6 bg-red-900/20 rounded-lg border border-red-800/50">
              <div className="flex items-start">
                <svg className="h-6 w-6 mr-3 mt-0.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-lg">{error}</p>
              </div>
            </div>
          ) : (
            <div className="prose max-w-full">
              <pre className={`whitespace-pre-wrap p-6 rounded-lg border font-mono text-sm overflow-auto shadow-inner relative ${themeClasses.pre}`}>
                {/* Decorative code line numbers */}
                <div className={`absolute left-0 top-0 bottom-0 w-10 border-r flex flex-col items-end pr-2 pt-6 text-xs ${themeClasses.lineNumbers}`}>
                  {Array.from({ length: response.split('\n').length }).map((_, i) => (
                    <div key={i} className="leading-6">{i + 1}</div>
                  ))}
                </div>
                <div className="pl-12">{response}</div>
              </pre>
            </div>
          )}
        </div>
      </div>
     
      {/* Bottom decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-600 to-emerald-500"></div>
    </div>
  );
};

export default ResponseCard;