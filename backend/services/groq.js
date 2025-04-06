const axios = require('axios');
require('dotenv').config();

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const sendPromptToGroq = async (prompt) => {
  try {
    const response = await axios.post(
      GROQ_API_URL,
      {
        model: 'llama3-70b-8192',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('❌ Groq API Error:', error.response?.data || error.message);
    throw new Error('Failed to get response from Groq API');
  }
};

// 🛒 For grocery suggestions
const getGrocerySuggestionsFromGroq = async (budget, preferences) => {
  const prompt = `Suggest a grocery list for someone who prefers ${preferences.join(', ')} within a budget of ₹${budget}. Keep it realistic and balanced.`;
  return sendPromptToGroq(prompt);
};

// 🔄 For replacement suggestions
const getReplacementSuggestionsFromGroq = async (itemName) => {
  const prompt = `Suggest cheaper or healthier alternatives for ${itemName}. List at least 3 options.`;
  return sendPromptToGroq(prompt);
};

// 🍽️ For meal planner
const getMealPlanFromGroq = async (budget, preferences) => {
  const prompt = `Generate a weekly meal plan for a budget of ₹${budget} with preferences: ${preferences.join(', ')}. Include breakfast, lunch, and dinner.`;
  return sendPromptToGroq(prompt);
};

// 🍛 For leftover-based meals
const getLeftoverMealsFromGroq = async (leftovers) => {
  const formattedLeftovers = leftovers.join(', ');
  const prompt = `Suggest 3 meals that can be made using these leftovers: ${formattedLeftovers}. Keep them simple and quick.`;
  return sendPromptToGroq(prompt);
};

// 📋 For plan feedback
const getPlanFeedbackFromGroq = async (plan) => {
  const prompt = `Review this grocery plan and suggest improvements:\nTitle: ${plan.title}\nItems: ${plan.items.join(', ')}. Be constructive.`;
  return sendPromptToGroq(prompt);
};

module.exports = {
  getGrocerySuggestionsFromGroq,
  getReplacementSuggestionsFromGroq,
  getMealPlanFromGroq,
  getLeftoverMealsFromGroq,
  getPlanFeedbackFromGroq,
};
