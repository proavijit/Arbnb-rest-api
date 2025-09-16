// seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs'); // Import the file system module
const Property = require('./models/Property');

// Load environment variables
dotenv.config();

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connection successful.');
    seedDB();
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// Function to seed the database
const seedDB = async () => {
  try {
    // Read and parse the JSON file
    const raw = fs.readFileSync("./data/sampleProperties.json", "utf-8");
    const propertiesData = JSON.parse(raw);

    // 1. Clear all existing data from the 'properties' collection
    await Property.deleteMany({});
    console.log('Existing properties deleted.');

    // 2. Insert the new data from the JSON file
    await Property.insertMany(propertiesData);
    console.log('New properties data seeded successfully!');

  } catch (err) {
    console.error('Error seeding data:', err);
  } finally {
    // Close the database connection
    mongoose.connection.close();
    console.log('MongoDB connection closed.');
  }
};
