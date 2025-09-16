// controllers/propertyController.js
const Property = require('../models/Property');

// Controller function to get all properties
exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller function to get a single property
exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller function to create a new property
exports.createProperty = async (req, res) => {
  const newProperty = new Property(req.body);
  try {
    const savedProperty = await newProperty.save();
    res.status(201).json(savedProperty);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



// Controller function for location-based search
exports.searchProperties = async (req, res) => {
  const { location, guests } = req.body;

  if (!location) {
    return res.status(400).json({ message: "Location name is required" });
  }

  const { adults, children } = guests || {};
  const totalGuests = (adults || 0) + (children || 0);

  try {
    const properties = await Property.find({
      "location.name": { $regex: location, $options: "i" },  
      guestCapacity: { $gte: totalGuests }
    });

    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller function to get location suggestions
exports.getLocationSuggestions = async (req, res) => {
  const query = req.query.query || '';

  try {
    let filter = {};
    if (query.trim().length > 0) {
      // যদি search query থাকে
      filter = { "location.name": { $regex: query, $options: "i" } };
    }

    // distinct location names from properties collection
    const suggestions = await Property.find(filter).distinct("location.name");

    res.json(suggestions); 
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


