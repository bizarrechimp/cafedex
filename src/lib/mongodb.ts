import { MongoClient, MongoClientOptions } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

const uri = process.env.MONGODB_URI;

const options: MongoClientOptions = {
  retryWrites: true,
  w: 'majority',
  serverSelectionTimeoutMS: 5000
};

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!global._mongoClientPromise) {
  const client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect()
    .then(async (client) => {
      // Test the connection
      await client.db('admin').command({ ping: 1 });
      console.log('MongoDB connection successful');
      return client;
    })
    .catch(error => {
      console.error('MongoDB connection error:', {
        name: error.name,
        message: error.message,
        code: error.code,
        codeName: error.codeName,
      });
      throw error;
    });
}

const clientPromise = global._mongoClientPromise;

export default clientPromise;