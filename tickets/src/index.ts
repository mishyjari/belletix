import mongoose from 'mongoose'; 

import { app } from './app';

const PORT = 3000;

// Connect to MongoDB
const start = async() => {
    // Confirm presence of env variables
    if ( !process.env.JWT_KEY ) throw new Error('Missing env variable for JWT_KEY');
    if ( !process.env.MONGO_URI ) throw new Error('Missing env variable for MONGO_URI');

    try {
        await mongoose.connect(process.env.MONGO_URI, {
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