import React from 'react';
import { Link } from 'react-router-dom';

const FeatureCard = ({ title, description, icon, to, gradient }) => {
  return (
    <Link to={to} className="block">
      <div className={`rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${gradient}`}>
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-gray-100 opacity-90">{description}</p>
      </div>
    </Link>
  );
};

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 pt-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <h1 className="text-5xl font-extrabold p-2 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
                Budget Bytes
              </h1>
              <div className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full"></div>
            </div>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Smart grocery planning powered by AI that saves you money
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon="🛒"
            title="Grocery Suggestions"
            description="Get AI-powered grocery lists based on your budget and preferences"
            to="/grocery-suggestions"
            gradient="bg-gradient-to-br from-blue-600 to-blue-800"
          />
          <FeatureCard
            icon="🔄"
            title="Find Alternatives"
            description="Discover cheaper or healthier alternatives to your usual items"
            to="/replacement-suggestions"
            gradient="bg-gradient-to-br from-purple-600 to-purple-800"
          />
          <FeatureCard
            icon="🍽️"
            title="Meal Planner"
            description="Create weekly meal plans that fit your budget and dietary needs"
            to="/meal-planner"
            gradient="bg-gradient-to-br from-cyan-600 to-cyan-800"
          />
          <FeatureCard
            icon="🍛"
            title="Leftover Recipes"
            description="Transform leftovers into delicious new meals"
            to="/leftover-optimization"
            gradient="bg-gradient-to-br from-indigo-600 to-indigo-800"
          />
          <FeatureCard
            icon="📋"
            title="Saved Plans"
            description="View and manage your saved grocery plans"
            to="/saved-plans"
            gradient="bg-gradient-to-br from-violet-600 to-violet-800"
          />
          <div className="rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 p-6 flex flex-col justify-center items-center shadow-lg hover:shadow-xl transition-all border border-gray-700">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="text-xl font-bold mb-2 text-white">Coming Soon</h3>
            <p className="text-gray-100 opacity-90">More exciting features on the way!</p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 right-6 text-gray-400 text-sm">
        Developed by Yuvraj Udaywal, Taha, Yuvraj Singh
      </div>
    </div>
  );
};

export default Dashboard;