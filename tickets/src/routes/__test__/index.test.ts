import { response } from 'express';
import request from 'supertest';
import { app } from '../../app';

const createTicket = () => {
    return request(app)
        .post('/api/tickets')
        .set('Cookie', global.getAuthCookie())
        .send({
            title: 'Title',
            price: 1
        });
};

it('Can fetch a list of tickets', async () => {
    await createTicket();
    await createTicket();
    await createTicket();

    const res = await request(app)
        .get('/api/tickets')
        .send()
        .expect(200)

    expect(res.body.length).toEqual(3)
});
