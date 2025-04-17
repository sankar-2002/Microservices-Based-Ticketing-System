// signout.test.ts
import request from 'supertest';
import { app } from '../../app';

it('clears the cookie after signing out', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signout')
    .send({})
    .expect(200);

    const cookie = response.get("Set-Cookie");
    if (!cookie) {
      throw new Error("Expected cookie but got undefined.");
    }
  
    // Use regex to match cookie parts instead of exact string equality
    expect(cookie[0]).toMatch(/^session=/);  // Cookie name is 'session'
    expect(cookie[0]).toMatch(/path=\//);    // Path is '/'
    expect(cookie[0]).toMatch(/expires=Thu, 01 Jan 1970 00:00:00 GMT/);  // Expiry set to Unix epoch
    expect(cookie[0]).toMatch(/httponly/);   // HttpOnly flag is set
});