import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const api = {
  // Grocery suggestions
  getGrocerySuggestions: async (budget, preferences) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/grocery-suggestions`, {
        budget,
        preferences
      });
      return response.data.result;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to get grocery suggestions');
    }
  },
  
  // Replacement suggestions
  getReplacementSuggestions: async (itemName) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/replacement-suggestions`, {
        itemName
      });
      return response.data.result;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to get replacement suggestions');
    }
  },
  
  // Meal planner
  getMealPlan: async (budget, preferences) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/meal-planner`, {
        budget,
        preferences
      });
      return response.data.result;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to generate meal plan');
    }
  },
  
  // Leftover optimization
  getLeftoverMeals: async (leftovers) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/leftover-optimization`, {
        leftovers
      });
      return response.data.result;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to get leftover meal ideas');
    }
  },
  
  // Save plan
  savePlan: async (title, items) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/save-plan`, {
        title,
        items
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to save plan');
    }
  }
};

export default api;