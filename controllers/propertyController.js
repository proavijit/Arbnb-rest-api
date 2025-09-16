// controllers/propertyController.js
const mongoose = require("mongoose");
const Property = require("../models/Property");

// ✅ Controller function to get all properties
exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    console.error("Error fetching properties:", err);
    res.status(500).json({ message: "Server error while fetching properties" });
  }
};

// ✅ Controller function to get a single property
exports.getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if id is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid property ID" });
    }

    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json(property);
  } catch (err) {
    console.error("Error fetching property:", err);
    res.status(500).json({ message: "Server error while fetching property" });
  }
};

// ✅ Controller function to create a new property
exports.createProperty = async (req, res) => {
  try {
    const newProperty = new Property(req.body);
    const savedProperty = await newProperty.save({ validateBeforeSave: true });
    res.status(201).json(savedProperty);
  } catch (err) {
    console.error("Error creating property:", err);
    res.status(400).json({ message: err.message });
  }
};

// ✅ Controller function for location-based search
exports.searchProperties = async (req, res) => {
  const { location, guests } = req.body;

  if (!location) {
    return res.status(400).json({ message: "Location name is required" });
  }

  const { adults = 0, children = 0 } = guests || {};
  const totalGuests = adults + children;

  try {
    const properties = await Property.find({
      "location.name": { $regex: location, $options: "i" },
      guestCapacity: { $gte: totalGuests },
    });

    res.json(properties);
  } catch (err) {
    console.error("Error searching properties:", err);
    res.status(500).json({ message: "Server error while searching properties" });
  }
};

// ✅ Controller function to get location suggestions
exports.getLocationSuggestions = async (req, res) => {
  const query = req.query.query || "";

  try {
    let filter = {};
    if (query.trim().length > 0) {
      filter = { "location.name": { $regex: query, $options: "i" } };
    }

    const suggestions = await Property.find(filter).distinct("location.name");
    res.json(suggestions);
  } catch (err) {
    console.error("Error fetching location suggestions:", err);
    res.status(500).json({ message: "Server error while fetching suggestions" });
  }
};
