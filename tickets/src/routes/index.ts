import express, { Request, Response } from 'express';

import { Ticket } from '../models/ticket';

const router = express.Router();

router.get('/api/tickets', async(req: Request, res: Response) => {
    
    try {
        const tickets = await Ticket.find({})
        res.send(tickets)
    }
    catch ( err ) {
        throw new Error(err)
    }
    
})

export { router as indexTicketRouter }