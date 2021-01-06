import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

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
    secure: process.env.NODE_ENV !== 'test'
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

export { app };
