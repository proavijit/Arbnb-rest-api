const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // ✅ import cors
const propertyRoutes = require('./routes/propertyRoutes');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Enable CORS for React frontend
app.use(cors({
  origin: 'http://localhost:3000', // ✅ React app URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

// --- MongoDB Connection ---
const MONGODB_URI = process.env.MONGO_URI;

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB Connected Successfully!'))
  .catch(err => console.error('MongoDB connection error:', err));

// --- Use Routes ---
// All routes will be prefixed with /api/properties
app.use('/api/properties', propertyRoutes);

// --- Start the server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
