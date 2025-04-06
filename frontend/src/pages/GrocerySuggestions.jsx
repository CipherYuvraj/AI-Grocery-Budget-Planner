import React, { useState } from 'react';
import axios from 'axios';
import PreferenceSelector from '../components/PreferenceSelector';
import ResponseCard from '../components/ResponseCard';

const GrocerySuggestions = () => {
  const [budget, setBudget] = useState('');
  const [preferences, setPreferences] = useState([]);
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!budget) {
      setError('Please enter a budget');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const res = await axios.post('http://localhost:5000/api/grocery-suggestions', {
        budget,
        preferences
      });
      
      setResponse(res.data.result);
    } catch (err) {
      setError('Failed to get suggestions. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Grocery Suggestions</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
              Budget (₹)
            </label>
            <input
              type="number"
              id="budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Enter your budget in rupees"
            />
          </div>
          
          <PreferenceSelector preferences={preferences} setPreferences={setPreferences} />
          
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Get Suggestions
          </button>
        </form>
      </div>
      
      {(isLoading || response || error) && (
        <ResponseCard
          title="Your Grocery Suggestions"
          response={response}
          isLoading={isLoading}
          error={error}
        />
      )}
    </div>
  );
};

export default GrocerySuggestions;