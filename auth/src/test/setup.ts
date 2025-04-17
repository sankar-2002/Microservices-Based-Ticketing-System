import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import request from 'supertest';

declare global {
    var signin: () => Promise<string[]>;
  }



let mongo: any;
beforeAll(async () => { //this is run before all tests
  process.env.JWT_KEY = 'asdfasdf';
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => { //clear the database before each test
    if (mongoose.connection.db) {
      const collections = await mongoose.connection.db.collections();
  
      for (let collection of collections) {
        await collection.deleteMany({});
      }
    }
  });

afterAll(async () => { //this is run after all tests
    if (mongo) {
      await mongo.stop();
    }
    await mongoose.connection.close();
  });

global.signin = async () => {
    const email = 'test@test.com';
    const password = 'password';

    const response = await request(app)
        .post('/api/users/signup')
        .send({
        email,
        password
        })
        .expect(201);

    const cookie = response.get("Set-Cookie");

    if (!cookie) {
        throw new Error("Failed to get cookie from response");
    }

    return cookie;
};