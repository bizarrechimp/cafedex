import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

const options = {
  maxPoolSize: 10,
  minPoolSize: 5,
  retryWrites: true,
  directConnection: false,
  dbName: process.env.MONGODB_DB || 'cafedex',
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(process.env.MONGODB_URI, options);
    globalWithMongo._mongoClientPromise = client.connect()
      .then((client) => {
        console.log('NextAuth MongoDB adapter: Connected to database');
        return client;
      });
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(process.env.MONGODB_URI, options);
  clientPromise = client.connect()
    .then((client) => {
      console.log('NextAuth MongoDB adapter: Connected to database');
      return client;
    });
}

export default clientPromise;
