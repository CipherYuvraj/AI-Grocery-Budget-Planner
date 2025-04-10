// App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import GrocerySuggestions from './pages/GrocerySuggestions';
import ReplacementSuggestions from './pages/ReplacementSuggestions';
import MealPlanner from './pages/MealPlanner';
import LeftoverOptimization from './pages/LeftoverOptimization';
import SavedPlans from './pages/SavedPlans';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
 
    const savedTheme = localStorage.getItem('darkMode');
    return savedTheme ? JSON.parse(savedTheme) : true; 
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const baseClasses = "min-h-screen relative overflow-hidden transition-colors duration-300";
  const darkClasses = `${baseClasses} bg-black`;
  const lightClasses = `${baseClasses} bg-gray-50`;

  return (
    <Router>
      <div className={darkMode ? darkClasses : lightClasses}>
        {/* Toggle button */}
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

        {/* Background effects */}
        {darkMode ? (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f1f2c_1px,transparent_1px),linear-gradient(to_bottom,#0f1f2c_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-cyan-500/10 to-transparent"></div>
            <div className="absolute top-10 w-full h-96 bg-cyan-500/10 blur-3xl"></div>
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            <div className="absolute top-0 w-full h-64 bg-blue-50/30 blur-3xl"></div>
          </>
        )}

        {/* Actual content */}
        <div className="relative z-10">
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
      </div>
    </Router>
  );
}

export default App;
