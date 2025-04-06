import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="text-2xl font-bold flex items-center">
            <span className="mr-2">🛒</span> 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
              Budget Bytes
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-2">
            <Link to="/grocery-suggestions" className="px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 text-gray-300 hover:text-cyan-400">
              Grocery Suggestions
            </Link>
            <Link to="/replacement-suggestions" className="px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 text-gray-300 hover:text-purple-400">
              Find Alternatives
            </Link>
            <Link to="/meal-planner" className="px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 text-gray-300 hover:text-cyan-400">
              Meal Planner
            </Link>
            <Link to="/leftover-optimization" className="px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 text-gray-300 hover:text-indigo-400">
              Leftover Recipes
            </Link>
            <Link to="/saved-plans" className="px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 text-gray-300 hover:text-violet-400">
              Saved Plans
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              className="focus:outline-none text-gray-300 hover:text-white"
              onClick={toggleMenu}
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
                ) : (
                  <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-2 space-y-1 border-t border-gray-800">
            <Link 
              to="/grocery-suggestions" 
              className="block px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 text-gray-300 hover:text-cyan-400"
              onClick={toggleMenu}
            >
              Grocery Suggestions
            </Link>
            <Link 
              to="/replacement-suggestions" 
              className="block px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 text-gray-300 hover:text-purple-400"
              onClick={toggleMenu}
            >
              Find Alternatives
            </Link>
            <Link 
              to="/meal-planner" 
              className="block px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 text-gray-300 hover:text-cyan-400"
              onClick={toggleMenu}
            >
              Meal Planner
            </Link>
            <Link 
              to="/leftover-optimization" 
              className="block px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 text-gray-300 hover:text-indigo-400"
              onClick={toggleMenu}
            >
              Leftover Recipes
            </Link>
            <Link 
              to="/saved-plans" 
              className="block px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 text-gray-300 hover:text-violet-400"
              onClick={toggleMenu}
            >
              Saved Plans
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;