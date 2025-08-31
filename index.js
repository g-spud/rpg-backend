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
    console.log('Connected to MongoDB');

    const db = client.db('testdb'); // Use your DB name
    const collection = db.collection('testcollection'); // Use any collection name

    // Insert a test document
    const result = await collection.insertOne({ message: 'Hello, MongoDB!', createdAt: new Date() });
    console.log('Inserted document:', result.insertedId);

    // Close the connection after insert
    await client.close();
    console.log('Connection closed');

  } catch (err) {
    console.error('Error connecting or inserting:', err);
  }
}


start();
