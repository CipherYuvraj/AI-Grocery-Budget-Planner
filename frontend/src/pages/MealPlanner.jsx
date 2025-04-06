import React, { useState } from 'react';
import axios from 'axios';
import PreferenceSelector from '../components/PreferenceSelector';
import ResponseCard from '../components/ResponseCard';

const MealPlanner = () => {
  const [budget, setBudget] = useState('');
  const [preferences, setPreferences] = useState([]);
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSaveForm, setShowSaveForm] = useState(false);
  const [planTitle, setPlanTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!budget) {
      setError('Please enter a budget');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const res = await axios.post('http://localhost:5000/api/meal-planner', {
        budget,
        preferences
      });
      
      setResponse(res.data.result);
      setShowSaveForm(true);
    } catch (err) {
      setError('Failed to generate meal plan. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePlan = async (e) => {
    e.preventDefault();
    
    if (!planTitle) {
      setError('Please enter a title for your plan');
      return;
    }
    
    try {
      // Extract items from the response text - this is a simplified approach
      // In a real app, you might want to parse the response more carefully
      const items = response.split('\n').filter(line => line.trim());
      
      await axios.post('http://localhost:5000/api/save-plan', {
        title: planTitle,
        items
      });
      
      alert('Meal plan saved successfully!');
      setPlanTitle('');
    } catch (err) {
      setError('Failed to save plan. Please try again.');
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Weekly Meal Planner</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
              Weekly Budget (₹)
            </label>
            <input
              type="number"
              id="budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Enter your weekly food budget"
            />
          </div>
          
          <PreferenceSelector preferences={preferences} setPreferences={setPreferences} />
          
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Generate Meal Plan
          </button>
        </form>
      </div>
      
      {(isLoading || response || error) && (
        <ResponseCard
          title="Your Weekly Meal Plan"
          response={response}
          isLoading={isLoading}
          error={error}
        />
      )}
      
      {showSaveForm && response && (
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h3 className="text-xl font-semibold mb-4">Save This Meal Plan</h3>
          <form onSubmit={handleSavePlan}>
            <div className="mb-4">
              <label htmlFor="planTitle" className="block text-sm font-medium text-gray-700 mb-2">
                Plan Title
              </label>
              <input
                type="text"
                id="planTitle"
                value={planTitle}
                onChange={(e) => setPlanTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Enter a title for your meal plan"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Save Plan
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default MealPlanner;