const express = require('express');
const router = express.Router();
const {
  grocerySuggestions,
  replacementSuggestions,
  mealPlanner,
  leftoverOptimization,
  saveGroceryPlan,
} = require('../controllers/aicontroller');


router.post('/grocery-suggestions', grocerySuggestions);
router.post('/replacement-suggestions', replacementSuggestions);
router.post('/meal-planner', mealPlanner);
router.post('/leftover-optimization', leftoverOptimization);
router.post('/save-plan', saveGroceryPlan);

module.exports = router;
