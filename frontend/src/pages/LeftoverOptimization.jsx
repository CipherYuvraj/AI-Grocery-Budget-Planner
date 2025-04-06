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
    
    // Filter out empty items
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
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Leftover Recipe Generator</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What's in your fridge?
            </label>
            
            {leftovers.map((item, index) => (
              <div key={index} className="flex mb-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleChangeItem(index, e.target.value)}
                  className="flex-grow p-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter a leftover ingredient"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveItem(index)}
                  className="bg-red-500 text-white p-2 rounded-r-md hover:bg-red-600 focus:outline-none"
                >
                  ✕
                </button>
              </div>
            ))}
            
            <button
              type="button"
              onClick={handleAddItem}
              className="mt-2 text-sm text-green-600 hover:text-green-800 focus:outline-none flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add another ingredient
            </button>
          </div>
          
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Get Recipe Ideas
          </button>
        </form>
      </div>
      
      {(isLoading || response || error) && (
        <ResponseCard
          title="Leftover Recipe Ideas"
          response={response}
          isLoading={isLoading}
          error={error}
        />
      )}
    </div>
  );
};

export default LeftoverOptimization;