// file for testing signup functionality
import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { User } from '../../models/user';


it('returns a 201 on successful signup', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password'
      })
      .expect(201);
  });

it('returns a 400 with an invalid email', async () => {
return request(app)
    .post('/api/users/signup')
    .send({
    email: 'alskdflaskjfd',
    password: 'password'
    })
    .expect(400);
});  

it('returns a 400 with an invalid password', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        email: 'alskdflaskjfd',
        password: 'p'
      })
      .expect(400);
  });

it('returns a 400 with missing email and password', async () => {
await request(app)
    .post('/api/users/signup')
    .send({
    email: 'test@test.com'
    })
    .expect(400);

await request(app)
    .post('/api/users/signup')
    .send({
    password: 'alskjdf'
    })
    .expect(400);
});

it('disallows duplicate emails', async () => {
  try {
    // First signup attempt - should succeed
    await request(app)
      .post('/api/users/signup')
      .send({
      email: 'test@test.com',
      password: 'password'
      })
      .expect(201);

    // Second signup attempt with the same email - should fail with 400
    await request(app)
      .post('/api/users/signup')
      .send({
      email: 'test@test.com',
      password: 'password'
      })
      .expect(400);
  } catch (error) {
    console.error('Test failed:', error);
    throw error;
  } finally {
    // Ensure database is cleaned up even if test fails
    await User.deleteMany({});
  }
});  // Increased timeout to 10 seconds

// signup.test.ts
it('sets a cookie after successful signup', async () => {
    const response = await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password'
      })
      .expect(201);
  
    expect(response.get('Set-Cookie')).toBeDefined();
  });


