import request from 'supertest';
import { app } from '../../app';

it('Returns a 201 status on successful signup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'foo@bar.com',
            password: 'password'
        })
        .expect(201)
});

it('Returns a 400 status code with an invalid email', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'foobarcom',
            password: 'password'
        })
        .expect(400)
});

it('Returns a 400 status code with an invalid password', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'foo@bar.com',
            password: 'pw'
        })
        .expect(400)
});

it('Returns a 400 status code with missing email or password', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'foo@bar.com'
        })
        .expect(400)
    return request(app)
        .post('/api/users/signup')
        .send({
            password: 'password'
        })
        .expect(400)
});

it('Does not allow duplicate email addresses', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'foo@bar.com',
            password: 'password'
        })
        .expect(201)
    return request(app)
    .post('/api/users/signup')
    .send({
        email: 'foo@bar.com',
        password: 'password'
    })
    .expect(400)
});

it('Sets a cookie on successful signup', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'foo@bar.com',
            password: 'password'
        })
        .expect(201);

    expect(response.get('Set-Cookie'))
        .toBeDefined();
});