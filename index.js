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

    const db = client.db('testdb');
    const collection = db.collection('testcollection');

    const doc = { message: 'Hello, MongoDB!', createdAt: new Date() };
    console.log('Inserting document:', doc);

    const result = await collection.insertOne(doc);
    console.log('Inserted document ID:', result.insertedId);

    await client.close();
    console.log('Connection closed');
  } catch (err) {
    console.error('Error connecting or inserting:', err);
  }
}

start();