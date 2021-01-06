import mongoose from 'mongoose'; 

import { app } from './app';

const PORT = 3000;

// Connect to MongoDB
const start = async() => {
    // Confirm presence of env variables
    if ( !process.env.JWT_KEY ) throw new Error('Missing env variable for JWT_KEY')

    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true 
        });
        console.log('Connected to MongoDB')
    }
    catch ( err ) {
        console.log(err)
    };

    app.listen(PORT, () => console.log('Auth Server listening on port ' + PORT));
};

start();