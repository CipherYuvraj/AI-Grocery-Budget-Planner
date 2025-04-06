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
  const prompt = `Generate a grocery list for a budget of ₹${budget} with preferences: ${preferences.join(', ')}.
  
IMPORTANT FORMATTING INSTRUCTIONS:

1. Start with a brief one-sentence introduction about this grocery list
2. Present the list in a clean, organized format with categories
3. Use emoji icons for each category
4. Include estimated prices for each item
5. Format the output with clear spacing
6. Group similar items together
7. Keep the list realistic and balanced for the budget provided
8. End with a one-sentence closing tip related to the shopping list
9. DO NOT use stars or asterisks (*) in your response please dont decorate the headings 
10. DO NOT include any markdown formatting indicators  at the start or end
11. Do NOT Double Star the Headings `;

  
  return sendPromptToGroq(prompt);
};

// 🔄 For replacement suggestions
const getReplacementSuggestionsFromGroq = async (itemName) => {
  const prompt = `Suggest cheaper or healthier alternatives for ${itemName}.

IMPORTANT FORMATTING INSTRUCTIONS:
1. Start with a brief one-sentence introduction about these alternatives
2. List exactly 3 alternatives with bullet points
3. For each alternative, include: name, estimated price, and key benefits
4. Use a consistent format for all items
5. Include small emoji icons for visual appeal
6. Format with clear spacing between items
7. End with a brief one-sentence conclusion about making smart substitutions
8. DO NOT use stars or asterisks (*) in your response please dont decorate the headings 
9. DO NOT include any markdown formatting indicators at the start or end
11. Do NOT Double Star the Headings`;
  
  return sendPromptToGroq(prompt);
};

// 🍽️ For meal planner
const getMealPlanFromGroq = async (budget, preferences) => {
  const prompt = `Create a weekly meal plan for a budget of ₹${budget} with preferences: ${preferences.join(', ')}.

IMPORTANT FORMATTING INSTRUCTIONS:
1. Begin with a brief one-sentence introduction to this meal plan
2. Format as a 7-day plan with breakfast, lunch, and dinner for each day
3. Use day headers (Monday, Tuesday, etc.)
4. Include meal emojis for each meal type
5. Present in a clean, organized table-like format
6. Ensure all meals respect the budget constraints and preferences
7. End with a brief one-sentence tip about meal planning or preparation
8. DO NOT use stars or asterisks (*) in your response please dont decorate the headings 
9. DO NOT include any markdown formatting indicators at the start or end
11. Do NOT Double Star the Headings`;
  
  return sendPromptToGroq(prompt);
};

// 🍛 For leftover-based meals
const getLeftoverMealsFromGroq = async (leftovers) => {
  const formattedLeftovers = leftovers.join(', ');
  const prompt = `Create 3 meals using these leftovers: ${formattedLeftovers}.

IMPORTANT FORMATTING INSTRUCTIONS:
1. Start with a brief one-sentence introduction about reducing food waste
2. Present exactly 3 meal ideas with clear numbering
3. Format each meal with a creative name and emoji
4. Include a very brief (one line) description of how to prepare
5. Use decorative separators between meals
6. End with a brief one-sentence tip about using leftovers creatively
7. Keep all suggestions simple and quick to prepare
8. DO NOT use stars or asterisks (*) in your response please dont decorate the headings 
9. DO NOT include any markdown formatting indicators in the start or end
11. Do NOT Double Star the Headings `;
  
  return sendPromptToGroq(prompt);
};

// 📋 For plan feedback
const getPlanFeedbackFromGroq = async (plan) => {
  const prompt = `Review this grocery plan:
Title: ${plan.title}
Items: ${plan.items.join(', ')}

IMPORTANT FORMATTING INSTRUCTIONS:
1. Begin with a brief one-sentence overview of this grocery plan
2. Structure the feedback in 3 sections: "✅ What Works Well", "⚠️ Areas for Improvement", and "💡 Suggestions"
3. Use bullet points within each section
4. Keep feedback constructive and specific
5. Use visual separators between sections
6. End with a brief one-sentence summary or encouragement
7. Keep the total response concise and focused
8. DO NOT use stars or asterisks (*) in your response please dont decorate the headings 
9. DO NOT include any markdown formatting indicators at the start or end
11. Do NOT Double Star the Headings`;
  
  return sendPromptToGroq(prompt);
};

module.exports = {
  getGrocerySuggestionsFromGroq,
  getReplacementSuggestionsFromGroq,
  getMealPlanFromGroq,
  getLeftoverMealsFromGroq,
  getPlanFeedbackFromGroq,
};