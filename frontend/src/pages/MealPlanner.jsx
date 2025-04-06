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
  
  // Force light mode initially
  // eslint-disable-next-line no-unused-vars
  const [forceLightMode] = useState(true);
  
  // When component mounts, set light mode in localStorage
  React.useEffect(() => {
    localStorage.setItem('theme', 'light');
  }, []);

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
    <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black min-h-screen p-6 text-gray-200">
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-blue-400 mb-6 border-b-2 border-blue-500 pb-2">Weekly Meal Planner</h1>
            
            <div className="bg-gray-800 p-6 rounded-lg shadow-sm border border-slate-200 mb-8">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="budget" className="block text-sm font-bold text-yellow-300 mb-2">
                            Weekly Budget (₹)
                        </label>
                        <input
                            type="number"
                            id="budget"
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                            className="w-full p-3 border-2 border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-gray-200"
                            placeholder="Enter your weekly food budget"
                        />
                    </div>
                    
                    <PreferenceSelector preferences={preferences} setPreferences={setPreferences} />
                    
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 font-bold text-lg shadow-md transition-colors"
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
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg mt-6 border border-gray-700">
                    <h3 className="text-xl font-bold text-blue-400 mb-4 border-b border-blue-500 pb-2">Save This Meal Plan</h3>
                    <form onSubmit={handleSavePlan}>
                        <div className="mb-4">
                            <label htmlFor="planTitle" className="block text-sm font-bold text-gray-300 mb-2">
                                Plan Title
                            </label>
                            <input
                                type="text"
                                id="planTitle"
                                value={planTitle}
                                onChange={(e) => setPlanTitle(e.target.value)}
                                className="w-full p-3 border-2 border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-gray-200"
                                placeholder="Enter a title for your meal plan"
                            />
                        </div>
                        
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-bold shadow-md transition-colors"
                        >
                            Save Plan
                        </button>
                    </form>
                </div>
            )}
        </div>
    </div>
);
};

export default MealPlanner;