import mongoose from 'mongoose'; 

import { app } from './app';
import { natsWrapper } from "./natsWrapper";

const PORT = 3000;

// Connect to MongoDB
const start = async() => {
    // Confirm presence of env variables
    if ( !process.env.JWT_KEY ) throw new Error('Missing env variable for JWT_KEY');
    if ( !process.env.MONGO_URI ) throw new Error('Missing env variable for MONGO_URI');
    if ( !process.env.NATS_CLIENT_ID ) throw new Error('Missing env variable for NATS_CLIENT_ID');
    if ( !process.env.NATS_URL ) throw new Error('Missing env variable for NATS_URL');
    if ( !process.env.NATS_CLUSTER_ID ) throw new Error('Missing env variable for NATS_CLUSTER_ID');

    const { MONGO_URI, NATS_CLIENT_ID, NATS_URL, NATS_CLUSTER_ID } = process.env;

    try {
        // Connect to NATS Client for Events
        await natsWrapper.connect(NATS_CLUSTER_ID, NATS_CLIENT_ID, NATS_URL)
        const { client } = natsWrapper;
        client.on('close', () => {
            console.log('NATS Client Exit')
            process.exit();
        });
        process.on('SIGINT', () => client.close());
        process.on('SIGTERM', () => client.close());

        // Connect to Mongoose
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true 
        });
        console.log('Connected to MongoDB')
    }
    catch ( err ) {
        console.log(err)
    };

    app.listen(PORT, () => console.log('Tickets Server listening on port ' + PORT));
};

start();