const express = require('express');
const router = express.Router();
const { connectToMongoDB, closeMongoDBConnection } = require('./db');

// Create a new blog document
router.post('/blogs', async (req, res, next) => {
  try {
    const db = await connectToMongoDB();
    const collection = db.collection('blogs');
    const result = await collection.insertOne(req.body);
    res.status(201).json({ message: 'Blog created', _id: result.insertedId });
  } catch (error) {
    next(error); // Pass the error to the next middleware (error handling middleware)
  } finally {
    closeMongoDBConnection();
  }
});

// Get all blogs
router.get('/blogs', async (req, res, next) => {
  try {
    const db = await connectToMongoDB();
    const collection = db.collection('blogs');
    const blogs = await collection.find({}).toArray();
    res.json(blogs);
  } catch (error) {
    next(error); // Pass the error to the next middleware (error handling middleware)
  } finally {
    closeMongoDBConnection();
  }
});

// Additional routes for updating and deleting...

module.exports = router;
