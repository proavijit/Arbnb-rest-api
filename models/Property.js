// models/Property.js
const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: {
    type: {
      name: { type: String, required: true },
      coordinates: {
        type: [Number],
        required: true,
        index: '2dsphere'
      }
    },
    required: true
  },
  pricePerNight: { type: Number, required: true },
  images: { type: [String] },
  amenities: { type: [String] },
  guestCapacity: { type: Number, required: false }
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
