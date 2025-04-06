const {
    getGrocerySuggestionsFromGroq,
    getReplacementSuggestionsFromGroq,
    getMealPlanFromGroq,
    getLeftoverMealsFromGroq,
    getPlanFeedbackFromGroq,
  } = require('../services/groq');
  const { saveNewPlan, getAllPlans } = require('../utils/planStorage');
  
  const grocerySuggestions = async (req, res) => {
    const { budget, preferences } = req.body;
  
    try {
      const aiResponse = await getGrocerySuggestionsFromGroq(budget, preferences);
      res.json({ result: aiResponse });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const replacementSuggestions = async (req, res) => {
    const { itemName } = req.body;
  
    if (!itemName) {
      return res.status(400).json({ error: 'Item name is required.' });
    }
  
    try {
      const aiResponse = await getReplacementSuggestionsFromGroq(itemName);
      res.json({ result: aiResponse });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const mealPlanner = async (req, res) => {
    const { budget, preferences } = req.body;
  
    if (!budget || !preferences) {
      return res.status(400).json({ error: 'Budget and preferences are required.' });
    }
  
    try {
      const aiResponse = await getMealPlanFromGroq(budget, preferences);
      res.json({ result: aiResponse });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const leftoverOptimization = async (req, res) => {
    const { leftovers } = req.body;
  
    if (!leftovers || !Array.isArray(leftovers)) {
      return res.status(400).json({ error: 'Leftovers must be an array.' });
    }
  
    try {
      const aiResponse = await getLeftoverMealsFromGroq(leftovers);
      res.json({ result: aiResponse });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const saveGroceryPlan = async (req, res) => {
    const { title, items } = req.body;
  
    if (!title || !items || !Array.isArray(items)) {
      return res.status(400).json({ error: 'Invalid request data' });
    }
  
    try {
      saveNewPlan({ title, items });
  
      // Optional AI feedback after saving the plan
      const aiFeedback = await getPlanFeedbackFromGroq({ title, items });
  
      res.json({
        message: '✅ Grocery plan saved successfully!',
        feedback: aiFeedback,
      });
    } catch (error) {
      console.error('❌ Error saving plan:', error);
      res.status(500).json({ error: 'Failed to save grocery plan.' });
    }
  };
  
  module.exports = {
    grocerySuggestions,
    replacementSuggestions,
    mealPlanner,
    leftoverOptimization,
    saveGroceryPlan,
  };
  