const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../data/plans.json');

function getAllPlans() {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading plans.json:', error);
    return [];
  }
}

function saveNewPlan(newPlan) {
  const allPlans = getAllPlans();
  allPlans.push({
    ...newPlan,
    createdAt: new Date()
  });
  fs.writeFileSync(filePath, JSON.stringify(allPlans, null, 2));
}

module.exports = {
  getAllPlans,
  saveNewPlan,
};
