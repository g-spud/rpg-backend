const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection string
const uri = process.env.MONGODB_URI;  // Render will inject this

// Connect to MongoDB
const client = new MongoClient(uri);

async function start() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    // Example route
    app.get('/', (req, res) => {
      res.send('RPG Backend is live!');
    });

    // Use the Render-assigned port
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
}

start();
