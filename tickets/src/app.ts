import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { NotFoundError, errorHandler, currentUser } from '@mfrattaroli/common';

import { newTicketRouter } from './routes/newTicket';
import { showTicketRouter } from './routes/showTicket';
import { indexTicketRouter } from './routes/index';
import { updateTicketRouter } from './routes/updateTicket';

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

app.use(currentUser);

app.use(newTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

// Catch 404's with custom Not Found Error Handler
app.get('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
