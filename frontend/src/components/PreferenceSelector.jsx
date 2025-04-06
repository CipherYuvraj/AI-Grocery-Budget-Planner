import React from 'react';

const PreferenceSelector = () => {
  const [preferences, setPreferences] = React.useState([]);
  
  const options = [
    'Vegetarian', 'Vegan', 'Gluten-free', 'Low-carb', 
    'Keto', 'Dairy-free', 'Indian', 'Chinese', 
    'Italian', 'Mexican', 'Budget-friendly', 'Quick meals'
  ];

  const togglePreference = (option) => {
    if (preferences.includes(option)) {
      setPreferences(preferences.filter(item => item !== option));
    } else {
      setPreferences([...preferences, option]);
    }
  };

  return (
    <div className="mb-6 p-4 border-2 border-black rounded-lg bg-white">
      <label className="block text-lg font-bold text-black mb-3">
        Dietary Preferences & Cuisines
      </label>
      <div className="flex flex-wrap gap-3">
        {options.map(option => (
          <button
            key={option}
            type="button"
            onClick={() => togglePreference(option)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              preferences.includes(option)
                ? 'bg-black text-white shadow-md'
                : 'bg-gray-100 text-black border border-gray-300 hover:bg-gray-200'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PreferenceSelector;