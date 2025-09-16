// routes/propertyRoutes.js
const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');

// Define API routes
router.get('/suggestions', propertyController.getLocationSuggestions);
router.get('/', propertyController.getAllProperties);
router.post('/', propertyController.createProperty);
router.get('/:id', propertyController.getPropertyById);
router.post('/search', propertyController.searchProperties);

module.exports = router;
