import { config } from 'dotenv';
import { resolve } from 'path';
import { MongoClient } from 'mongodb';

// Load .env.local file
config({ path: resolve(process.cwd(), '.env.local') });

// Verify environment variables are loaded
console.log('Environment check:');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');
console.log('MONGODB_DB:', process.env.MONGODB_DB ? 'Set' : 'Not set');

// Create MongoDB client directly for this script
const client = new MongoClient(process.env.MONGODB_URI!);

async function checkCollections() {
    try {
        console.log('Connecting to MongoDB...');
        await client.connect();
        const db = client.db(process.env.MONGODB_DB);

        console.log('Connected to database:', process.env.MONGODB_DB);

        // List all collections
        const collections = await db.listCollections().toArray();
        console.log('\nCollections in database:');
        collections.forEach((collection: { name: string }) => {
            console.log(`- ${collection.name}`);
        });

        // Check users collection specifically
        const usersCollection = db.collection('users');
        const userCount = await usersCollection.countDocuments();
        console.log('\nUsers collection:');
        console.log(`- Number of users: ${userCount}`);

        if (userCount > 0) {
            const users = await usersCollection.find({}).toArray();
            console.log('- First user:', JSON.stringify(users[0], null, 2));
        }

        // Check accounts collection
        const accountsCollection = db.collection('accounts');
        const accountCount = await accountsCollection.countDocuments();
        console.log('\nAccounts collection:');
        console.log(`- Number of accounts: ${accountCount}`);

        // Check sessions collection
        const sessionsCollection = db.collection('sessions');
        const sessionCount = await sessionsCollection.countDocuments();
        console.log('\nSessions collection:');
        console.log(`- Number of sessions: ${sessionCount}`);

        await client.close();
    } catch (error) {
        console.error('Error:', error);
        await client.close();
    }
}

checkCollections();
