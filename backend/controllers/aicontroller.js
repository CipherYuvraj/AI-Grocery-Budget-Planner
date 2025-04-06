// controllers/aiController.js

const grocerySuggestions = (req, res) => {
    const { budget, preferences } = req.body;
    res.json({
      message: '🛒 Working on grocery suggestions!',
      budget,
      preferences,
    });
  };
  
  const replacementSuggestions = (req, res) => {
    const { itemName } = req.body;
  
    if (!itemName) {
      return res.status(400).json({ error: 'Item name is required.' });
    }
  
    res.json({ message: `🔄 Suggesting cheaper alternatives for ${itemName}` });
  };
  
  const mealPlanner = (req, res) => {
    const { budget, preferences } = req.body;
    res.json({
      message: '🍽 Generating weekly meal plan...',
      budget,
      preferences,
    });
  };
  
  const leftoverOptimization = (req, res) => {
    const { leftovers } = req.body;
    res.json({
      message: '♻️ Creating meals using leftovers...',
      leftovers,
    });
  };
  
  module.exports = {
    grocerySuggestions,
    replacementSuggestions,
    mealPlanner,
    leftoverOptimization,
  };
  