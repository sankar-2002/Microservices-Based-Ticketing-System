import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';

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

  


