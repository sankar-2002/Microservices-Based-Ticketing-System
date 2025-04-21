import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper"; //importing an instance of NatsWrapper

//for running ingress host on localhost
//configure your hostname(anything) on your system in 
// C:\Windows\System32\Drivers\etc\hosts
//and add a line like this
// 127.0.0.1 ticketing.dev


const start = async () => {
  if(!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  if(!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }
  
  try {
    await natsWrapper.connect(
      'ticketing',
      'randomId', //this should be unique for each instance of a service
      'http://nats-srv:4222' //this is the service name and port in the k8s cluster
    );
    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
    });
    
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    await mongoose.connect(process.env.MONGO_URI, {}); 
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
  } 


  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
};

start();




