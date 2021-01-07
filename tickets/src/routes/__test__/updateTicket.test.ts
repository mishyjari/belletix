import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

import  { Ticket } from '../../models/ticket';

const exampleId = new mongoose.Types.ObjectId().toHexString();

const createTicket = () => {
    return request(app)
        .post('/api/tickets')
        .set('Cookie', global.getAuthCookie())
        .send({
            title: 'Title',
            price: 1
        });
};

it('Should return a 404 if provided ID does not exist', async() => {
    await request(app)
        .patch(`/api/tickets/${exampleId}`)
        .set('Cookie', global.getAuthCookie())
        .send({ 
            title: "New Title",
            price: 100
        })
        .expect(404)
});

it('Should return a 401 if the user is not logged in', async() => {
    await request(app)
        .patch(`/api/tickets/${exampleId}`)
        .send({ 
            title: "New Title",
            price: 100
        })
        .expect(401)
});

it('Should return a 401 if the ticket does not belong to the user', async() => {
    const ticket = await createTicket();
    const { title, price, id } = ticket.body;

    request(app)
        .patch(`/api/tickets/${id}`)
        .set('Cookie', global.getAuthCookie())
        .send({ 
            title: "New Title",
            price: 100
        })
        .expect(401)
    expect(title).toEqual('Title');
    expect(price).toEqual(1)
});

it('Should return a 400 if provided with an invalid title or price', async() => {
    const cookie = global.getAuthCookie();

    const { body } = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title: 'Title',
            price: 1
        });

    await request(app)
        .patch(`/api/tickets/${body.id}`)
        .set('Cookie', cookie)
        .send({
            title: '',
            price: 1
        })
        .expect(400)
    await request(app)
        .patch(`/api/tickets/${body.id}`)
        .set('Cookie', cookie)
        .send({
            price: 1
        })
        .expect(400)
    await request(app)
        .patch(`/api/tickets/${body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'Ticket',
            price: 'money'
        })
        .expect(400)
    await request(app)
        .patch(`/api/tickets/${body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'Ticket',
            price: -1
        })
        .expect(400)
    await request(app)
        .patch(`/api/tickets/${body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'Ticket'
        })
        .expect(400)
});

it('Updates the ticket if the user is logged in, owns the ticket all all data is valid', async() => {
    const cookie = global.getAuthCookie();

    const { body } = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title: 'Title',
            price: 1
        });

    await request(app)
        .patch(`/api/tickets/${body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'NewTitle',
            price: 2
        })
        .expect(201)

    const updatedResponse = await request(app)
        .get(`/api/tickets/${body.id}`)
        .send()
        .expect(200)

    const { price, title } = updatedResponse.body;
    expect(price).toEqual(2);
    expect(title).toEqual('NewTitle');
});