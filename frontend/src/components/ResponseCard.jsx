import React from 'react';

const ResponseCard = ({ title, response, isLoading, error }) => {
  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg mt-6 border border-gray-800 relative overflow-hidden">
      {/* Decorative tech element */}
      <div className="absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-purple-600/10 rounded-full blur-xl"></div>
      
      <div className="relative z-10">
        <h2 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
          {title}
        </h2>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="relative">
              <div className="h-16 w-16 rounded-full border-t-4 border-b-4 border-cyan-400 animate-spin"></div>
              <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-t-4 border-b-4 border-purple-500 animate-spin animate-pulse opacity-70"></div>
            </div>
          </div>
        ) : error ? (
          <div className="text-red-400 p-5 bg-red-900/20 rounded-lg border border-red-800/50">
            <div className="flex items-start">
              <svg className="h-5 w-5 mr-2 mt-0.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p>{error}</p>
            </div>
          </div>
        ) : (
          <div className="prose max-w-full text-gray-300">
            <pre className="whitespace-pre-wrap bg-gray-800/50 p-5 rounded-lg border border-gray-700 text-gray-300 font-mono text-sm overflow-auto">{response}</pre>
          </div>
        )}
      </div>
      
      {/* Bottom decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-purple-600"></div>
    </div>
  );
};

export default ResponseCard;