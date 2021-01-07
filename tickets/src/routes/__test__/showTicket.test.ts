import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('Returns a 404 if ticket is not found', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    
    await request(app)
        .get(`/api/tickets/${id}`)
        .send()
        .expect(404)
});

it('Returns the ticket if found', async () => {
    const title = 'Title',
          price = 10;

    const { body } = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.getAuthCookie())
        .send({ title, price })
        .expect(201)

    const response = await request(app)
        .get(`/api/tickets/${body.id}`)
        .send()
        .expect(200)
    
    expect(response.body.title).toEqual(title)
    expect(response.body.price).toEqual(price)
})