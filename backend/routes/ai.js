const express = require('express');
const router = express.Router();

const {
  grocerySuggestions,
  replacementSuggestions,
  mealPlanner,
  leftoverOptimization,
} = require('../controllers/aicontroller');

router.post('/grocery-suggestions', grocerySuggestions);
router.post('/replacement-suggestions', replacementSuggestions);
router.post('/meal-planner', mealPlanner);
router.post('/leftover-optimization', leftoverOptimization);

module.exports = router;
