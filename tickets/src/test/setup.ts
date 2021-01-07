import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import jwt from 'jsonwebtoken';

import { app } from '../app';

// Declare global for signin function
declare global {
    namespace NodeJS {
        interface Global {
            getAuthCookie(): string[];
        }
    }
}

// Open connection to mongoose memory server
let mongo: any;
beforeAll( async() => {
    process.env.JWT_KEY = 'imasecret';
    mongo = new MongoMemoryServer();
    const mongoUri = await mongo.getUri();

    await mongoose.connect( mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
});

// Reset memory db before each test
beforeEach( async () => {
    const collections = await mongoose.connection.db.collections();
    for ( let collection of collections ) {
        await collection.deleteMany({})
    }
});

// Close connection
afterAll( async () => {
    await mongo.stop();
    await mongoose.connection.close();
});

// Signin auth helper
global.getAuthCookie = () => {
    // Create a dummy JWT payload
    const payload = {
        id: mongoose.Types.ObjectId().toHexString(),
        email: 'foo@bar.com'
    };

    // Create JWT
    const token = jwt.sign(payload, process.env.JWT_KEY!);

    // Build session object
    const session = JSON.stringify({ jwt: token });
    const base64 = Buffer.from(session).toString('base64');

    // Return string that looks like a cookie
    return [`express:sess=${base64}`];
}