import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { 
    requireAuth, 
    validateRequest, 
    NotAuthorizedError, 
    NotFoundError 
} from '@mfrattaroli/common';

import { Ticket } from '../models/ticket';
import { TicketUpdatedPublisher } from "../events/publishers/ticketUpdatedPublisher";
import { natsWrapper } from "../natsWrapper";

const router = express.Router();

router.patch('/api/tickets/:id', requireAuth, [
    body('title')
        .not()
        .isEmpty()
        .withMessage('Title must be provided'),
    body('price')
        .isFloat({ gt: 0 })
        .withMessage('Price must be greater than zero')
    ],
    validateRequest,
    async ( req: Request, res: Response ) => {
        const { title, price } = req.body;
        const userId = req.currentUser!.id;

        const ticket = await Ticket.findById(req.params.id);
        if( !ticket ) throw new NotFoundError();

        if( ticket.userId !== userId ) throw new NotAuthorizedError();

        ticket.set({title, price});
        await ticket.save();
        
        new TicketUpdatedPublisher(natsWrapper.client).publish({
            id: ticket.id,
            ...ticket
        })

        res.status(201).send(ticket);
    }
)

export { router as updateTicketRouter }