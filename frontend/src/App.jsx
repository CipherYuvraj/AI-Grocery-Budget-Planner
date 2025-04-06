// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import GrocerySuggestions from './pages/GrocerySuggestions';
import ReplacementSuggestions from './pages/ReplacementSuggestions';
import MealPlanner from './pages/MealPlanner';
import LeftoverOptimization from './pages/LeftoverOptimization';
import SavedPlans from './pages/SavedPlans';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/grocery-suggestions" element={<GrocerySuggestions />} />
            <Route path="/replacement-suggestions" element={<ReplacementSuggestions />} />
            <Route path="/meal-planner" element={<MealPlanner />} />
            <Route path="/leftover-optimization" element={<LeftoverOptimization />} />
            <Route path="/saved-plans" element={<SavedPlans />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;