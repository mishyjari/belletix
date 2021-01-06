import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';

import { app } from '../app';

// Declare global for signin function
declare global {
    namespace NodeJS {
        interface Global {
            getAuthCookie(): Promise<string[]>
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
global.getAuthCookie = async () => {
    const email = 'foo@bar.com';
    const password = 'password';

    const response = await request(app)
        .post('/api/users/signup')
        .send({ email, password })
        .expect(201)

    return response.get('Set-Cookie')
}