import React, { useState, useEffect } from 'react';

const SavedPlans = () => {
  const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error] = useState('');
  useEffect(() => {
    setTimeout(() => {
      // Mock data
      const mockPlans = [
        {
          title: "Weekly Vegetarian Plan",
          items: [
            "Monday: Vegetable curry with rice",
            "Tuesday: Pasta with tomato sauce",
            "Wednesday: Lentil soup",
            "Thursday: Veggie stir fry",
            "Friday: Bean burritos",
            "Saturday: Eggplant parmesan",
            "Sunday: Vegetable biryani"
          ],
          createdAt: new Date().toISOString()
        },
        {
          title: "Budget Family Meals",
          items: [
            "Breakfast: Oatmeal with fruits",
            "Lunch: Rice and dal",
            "Dinner: Roti and mixed vegetables",
            "Snacks: Homemade popcorn, seasonal fruits"
          ],
          createdAt: new Date(Date.now() - 86400000).toISOString()
        }
      ];
      
      setPlans(mockPlans);
      setIsLoading(false);
    }, 1000);
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md text-red-800">
        <p>Error loading saved plans: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-400 mb-6">Saved Plans</h1>
      
      {plans.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-gray-600">You don't have any saved plans yet.</p>
          <p className="mt-2">
            <a href="/meal-planner" className="text-green-600 hover:text-green-800">
              Create your first meal plan →
            </a>
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {plans.map((plan, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold">{plan.title}</h2>
                <span className="text-sm text-gray-500">{formatDate(plan.createdAt)}</span>
              </div>
              <ul className="list-disc pl-5 mb-4">
                {plan.items.slice(0, 3).map((item, idx) => (
                  <li key={idx} className="text-gray-700">{item}</li>
                ))}
                {plan.items.length > 3 && (
                  <li className="text-gray-500">...and {plan.items.length - 3} more items</li>
                )}
              </ul>
              <div className="flex justify-end">
                <button className="text-green-600 hover:text-green-800 mr-4">
                  View Details
                </button>
                <button className="text-red-600 hover:text-red-800">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedPlans;