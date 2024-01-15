// app.js

const express = require('express');
const postsRouter = require('./routes/posts');
const { connectToMongoDB, closeMongoDBConnection } = require('./db');

const app = express();
const port = 3000;

app.use(express.json());
app.set('view engine', 'ejs'); // Set EJS as the template engine

// Use posts routes
app.use('/posts', postsRouter);

// Define a route for the root path
app.get('/', async (req, res) => {
  try {
    const db = await connectToMongoDB();
    const collection = db.collection('posts');

    // Fetch posts from MongoDB
    const posts = await collection.find({}).toArray();

    // Render the 'index' view with the posts data
    res.render('index', { posts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).send('Internal Server Error');
  } finally {
    closeMongoDBConnection();
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
