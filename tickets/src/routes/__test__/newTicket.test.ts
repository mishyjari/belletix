import request from 'supertest';

import { app } from '../../app';
import { Ticket } from '../../models/ticket';
import { natsWrapper } from "../../natsWrapper";

it('Has a POST route handler for /api/tickets', async () => {
    const res = await request(app)
        .post('/api/tickets')
        .send({})
    expect(res.status).not.toEqual(404);
});

it('Can only be access if user logged in', async () => {
    await request(app)
        .post('/api/tickets')
        .send({})
        .expect(401)
});

it('Returns a status other than 401 if user is logged in', async () => {
    const res = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.getAuthCookie())
        .send({})
    
        expect(res.status).not.toEqual(401)
});

it('Returns an error if invalid title is provided', async () => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.getAuthCookie())
        .send({
            title: '',
            price: 1
        })
        .expect(400)
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.getAuthCookie())
        .send({
            price: 1
        })
        .expect(400)
});

it('Returns an error if an invalid price is provided', async () => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.getAuthCookie())
        .send({
            title: 'Ticket',
            price: 'money'
        })
        .expect(400)
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.getAuthCookie())
        .send({
            title: 'Ticket',
            price: -1
        })
        .expect(400)
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.getAuthCookie())
        .send({
            title: 'Ticket'
        })
        .expect(400)
});

it('Creates a ticket with valid inputs', async () => {
    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);
    
    const res = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.getAuthCookie())
        .send({
            title: 'Title',
            price: 10
        })
        .expect(201)

    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);
    expect(tickets[0].price).toEqual(10);
    expect(tickets[0].title).toEqual('Title')
});

it('Publishes an event on ticket creation', async () => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.getAuthCookie())
        .send({
            title: 'Title',
            price: 10
        })
        .expect(201)
    
    expect(natsWrapper.client.publish).toHaveBeenCalled();
});