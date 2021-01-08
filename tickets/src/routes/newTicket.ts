import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from '@mfrattaroli/common';

import { Ticket } from '../models/ticket';
import { TicketCreatedPublisher } from "../events/publishers/ticketCreatedPublisher";
import { natsWrapper } from '../natsWrapper';

const router = express.Router();

router.post('/api/tickets', requireAuth, [
    // Validate request data
    body('title')
        .not()
        .isEmpty()
        .withMessage('Title must be provided'),
    body('price')
        .isFloat({ gt: 0 })
        .withMessage('Price must be greater than zero')    
    ],
    validateRequest,
    async (req: Request, res: Response) => {
  
        // Create new ticket instance
        const { title, price } = req.body;
        const ticket = Ticket.build({ 
            title, 
            price, 
            userId: req.currentUser!.id 
        });
        await ticket.save();

        // Publish TicketCreated Event
        new TicketCreatedPublisher(natsWrapper.client).publish({
            id: ticket.id,
            ...ticket
        })

        res.status(201).send(ticket)
});

export { router as newTicketRouter };