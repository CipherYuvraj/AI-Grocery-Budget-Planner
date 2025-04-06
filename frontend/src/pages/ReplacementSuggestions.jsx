import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ResponseCard from '../components/ResponseCard';

const ReplacementSuggestions = () => {
  const [itemName, setItemName] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Force light mode initially
  useEffect(() => {
    localStorage.setItem('theme', 'light');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!itemName) {
      setError('Please enter an item name');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const res = await axios.post('http://localhost:5000/api/replacement-suggestions', {
        itemName
      });
      
      setResponse(res.data.result);
    } catch (err) {
      setError('Failed to get alternatives. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

return (
    <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black min-h-screen p-6 text-white">
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-blue-400 mb-6 border-b-2 border-blue-500 pb-2">
                Find Cheaper or Healthier Alternatives
            </h1>
            
            <div className="bg-gray-800 p-6 rounded-lg shadow-sm border border-slate-200 mb-8">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="itemName" className="block text-sm font-bold text-yellow-300 mb-2">
                            Grocery Item
                        </label>
                        <input
                            type="text"
                            id="itemName"
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                            className="w-full p-3 border-2 border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-gray-200"
                            placeholder="Enter a grocery item (e.g., olive oil, beef, cheese)"
                        />
                    </div>
                    
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-bold text-lg shadow-md transition-colors"
                    >
                        Find Alternatives
                    </button>
                </form>
            </div>
            
            {(isLoading || response || error) && (
                <ResponseCard
                    title="Alternative Suggestions"
                    response={response}
                    isLoading={isLoading}
                    error={error}
                />
            )}
        </div>
    </div>
);
};

export default ReplacementSuggestions;