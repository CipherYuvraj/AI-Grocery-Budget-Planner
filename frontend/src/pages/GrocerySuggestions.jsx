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
    <div className="min-h-screen p-6 bg-gradient-to-b from-gray-800 via-gray-900 to-black">
        <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-blue-400">
                    Grocery Suggestions
                </h1>
                <p className="text-slate-300 text-sm mt-1">Plan your shopping efficiently</p>
            </div>

            {/* Form Card */}
            <div className="bg-slate-800 rounded-lg shadow-sm border border-slate-200 mb-8">
                <div className="p-6">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label htmlFor="budget" className="block text-sm font-medium text-yellow-200 mb-2">
                                Budget (₹)
                            </label>
                            <input
                                type="number"
                                id="budget"
                                value={budget}
                                onChange={(e) => setBudget(e.target.value)}
                                className="w-full p-3 bg-white border border-slate-300 rounded-md text-slate-700 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your budget in rupees"
                            />
                        </div>

                        <PreferenceSelector preferences={preferences} setPreferences={setPreferences} />

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
                        >
                            Generate Suggestions
                        </button>
                    </form>
                </div>
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
    </div>
);
};

export default GrocerySuggestions;
