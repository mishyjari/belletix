import request from 'supertest';
import { app } from '../../app';

it('Should fail when email that does not exist is supplied', async () => {
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'foo@bar.com',
            password: 'password'
        })
        .expect(400)
});

it('Should fail when incorrect password is supplied', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'foo@bar.com',
            password: 'password'
        })
        .expect(201)
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'foo@bar.com',
            password: 'wordpass'
        })
        .expect(400)
});

it('Should create a cookie on successful login', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'foo@bar.com',
            password: 'password'
        })
        .expect(201)
    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email: 'foo@bar.com',
            password: 'password'
        })
        .expect(200)

    expect(response.get('Set-Cookie'))
    .toBeDefined();
});