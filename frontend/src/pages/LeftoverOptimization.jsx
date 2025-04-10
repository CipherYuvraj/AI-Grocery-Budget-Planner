import React, { useState } from 'react';
import axios from 'axios';
import ResponseCard from '../components/ResponseCard';

const LeftoverOptimization = () => {
  const [leftovers, setLeftovers] = useState(['']);
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAddItem = () => {
    setLeftovers([...leftovers, '']);
  };

  const handleRemoveItem = (index) => {
    const newLeftovers = [...leftovers];
    newLeftovers.splice(index, 1);
    setLeftovers(newLeftovers);
  };

  const handleChangeItem = (index, value) => {
    const newLeftovers = [...leftovers];
    newLeftovers[index] = value;
    setLeftovers(newLeftovers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const filteredLeftovers = leftovers.filter(item => item.trim());
    
    if (filteredLeftovers.length === 0) {
      setError('Please enter at least one leftover item');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const res = await axios.post('http://localhost:5000/api/leftover-optimization', {
        leftovers: filteredLeftovers
      });
      
      setResponse(res.data.result);
    } catch (err) {
      setError('Failed to get recipe suggestions. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

return (
    <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black min-h-screen p-6 text-white">
        <div className="max-w-3xl mx-auto">
            {/* Simple modern header */}
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-white">
                    Leftover Recipe Generator
                </h1>
                <p className="text-gray-400 text-sm mt-1">Transform your leftovers into delicious meals</p>
            </div>
            
            {/* Clean form card */}
            <div className="bg-gray-800 rounded-lg shadow-sm border border-slate-200 mb-8">
                <div className="p-6">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-yellow-300 mb-3">
                                What's in your fridge?
                            </label>
                            
                            {leftovers.map((item, index) => (
                                <div key={index} className="flex mb-3">
                                    <input
                                        type="text"
                                        value={item}
                                        onChange={(e) => handleChangeItem(index, e.target.value)}
                                        className="flex-grow p-3 border border-gray-600 rounded-l-md bg-gray-700 text-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter a leftover ingredient"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveItem(index)}
                                        className="bg-gray-700 text-gray-400 p-3 rounded-r-md hover:bg-gray-600 focus:outline-none"
                                        aria-label="Remove ingredient"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                            
                            <button
                                type="button"
                                onClick={handleAddItem}
                                className="mt-2 text-sm text-blue-400 hover:text-blue-500 focus:outline-none flex items-center"
                            >
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                                Add another ingredient
                            </button>
                        </div>
                        
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
                        >
                            Get Recipe Ideas
                        </button>
                    </form>
                </div>
            </div>
            
            {(isLoading || response || error) && (
                <ResponseCard
                    title="Your Recipe Ideas"
                    response={response}
                    isLoading={isLoading}
                    error={error}
                />
            )}
        </div>
    </div>
);
};

export default LeftoverOptimization;