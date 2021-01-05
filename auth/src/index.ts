import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose'; 
import cookieSession from 'cookie-session';


const PORT = 3000;

// Auth Routes
import { currentUserRouter } from './routes/currentuser';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/errorhandler';
import { NotFoundError } from './errors/notFoundError';

const app = express();

// Allow ingress proxying
app.set('trust proxy', true);

app.use(json());

// Configure cookie-session
app.use(
    cookieSession({
        signed: false,
        secure: true
    })
);

// Set app to use routers
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// Catch 404's with custom Not Found Error Handler
app.get('*', () => {
    throw new NotFoundError();
});

app.use(errorHandler);

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