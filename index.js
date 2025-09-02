const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    return client.db('guestbook').collection('messages');
  } catch (err) {
    console.error('❌ Failed to connect to MongoDB', err);
  }
}

app.post('/api/messages', async (req, res) => {
  const collection = await connectDB();
  const { name, message } = req.body;

  if (!name || !message) {
    return res.status(400).json({ error: 'Name and message required' });
  }

  const doc = { name, message, createdAt: new Date() };
  const result = await collection.insertOne(doc);
  res.status(201).json({ insertedId: result.insertedId });
});

app.get('/api/messages', async (req, res) => {
  const collection = await connectDB();
  const messages = await collection.find().sort({ createdAt: -1 }).toArray();
  res.json(messages);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
