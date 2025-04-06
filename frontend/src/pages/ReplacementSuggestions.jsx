import React, { useState } from 'react';
import axios from 'axios';
import ResponseCard from '../components/ResponseCard';

const ReplacementSuggestions = () => {
  const [itemName, setItemName] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Find Cheaper or Healthier Alternatives</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="itemName" className="block text-sm font-medium text-gray-700 mb-2">
              Grocery Item
            </label>
            <input
              type="text"
              id="itemName"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Enter a grocery item (e.g., olive oil, beef, cheese)"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
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
  );
};

export default ReplacementSuggestions;