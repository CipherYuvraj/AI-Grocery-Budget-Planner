import React from 'react';

const PreferenceSelector = ({ preferences, setPreferences }) => {
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
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Dietary Preferences & Cuisines
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map(option => (
          <button
            key={option}
            type="button"
            onClick={() => togglePreference(option)}
            className={`px-3 py-1 rounded-full text-sm ${
              preferences.includes(option)
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-800'
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