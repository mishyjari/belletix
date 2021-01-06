import { currentUser } from './../../middlewares/currentUser';
import request from 'supertest';
import { app } from '../../app';



it('Returns current user when logged in', async () => {
    const cookie = await global.getAuthCookie();

    const response = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookie)
        .send()
        .expect(200)
    
    expect(response.body.currentUser.email).toEqual('foo@bar.com')
});

it('CurrentUser is null if not authenticated', async () => {
    const response = await request(app)
        .get('/api/users/currentuser')
        .send()
        .expect(200)
    expect(response.body.currentUser).toEqual(null)
})