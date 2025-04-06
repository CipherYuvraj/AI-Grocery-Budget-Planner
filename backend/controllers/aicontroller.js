// controllers/aiController.js
const axios = require('axios');

const grocerySuggestions = async (req, res) => {
  const { budget, preferences } = req.body;

  const prompt = `Suggest a grocery list for ₹${budget} for a ${preferences.join(", ")} diet.`;

  try {
    const response = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          model: 'llama3-70b-8192',
          messages: [
            {
              role: 'user',
              content: `Suggest a grocery list for ₹${budget} for a ${preferences.join(', ')} diet.`,
            },
          ],
          temperature: 0.7,
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
      

    const aiResponse = response.data.choices[0].message.content;
    res.json({ result: aiResponse });
  } catch (error) {
    console.error('❌ Groq API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get grocery suggestions.' });
  }};
  



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
  