const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://mohammadasgarpoor:VyJDm9yseMlEKFv4@firstcluster.qsmet13.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db('express-mongo-app'); 
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

function closeMongoDBConnection() {
  client.close();
  console.log('MongoDB connection closed');
}

module.exports = { connectToMongoDB, closeMongoDBConnection };