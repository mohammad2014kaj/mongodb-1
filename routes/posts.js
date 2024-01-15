const express = require('express');
const { connectToMongoDB, closeMongoDBConnection } = require('../db');

const router = express.Router();

// Route to get all posts
router.get('/', async (req, res) => {
  try {
    const db = await connectToMongoDB();
    const collection = db.collection('posts');

    const posts = await collection.find({}).toArray();

    res.json(posts);
  } catch (error) {
    console.error('Error in /posts route:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  } finally {
    closeMongoDBConnection();
  }
});

module.exports = router;