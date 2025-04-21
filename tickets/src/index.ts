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

  if(!process.env.NATS_CLIENT_ID) {
    throw new Error('NATS_CLIENT_ID must be defined');
  }

  if(!process.env.NATS_URL) {
    throw new Error('NATS_URL must be defined');
  }

  if(!process.env.NATS_CLUSTER_ID) {
    throw new Error('NATS_CLUSTER_ID must be defined');
  }
  
  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID, //this should be the same as the one in the k8s cluster
      process.env.NATS_CLIENT_ID, //this should be the same as the one in the k8s cluster
      process.env.NATS_URL, //this should be the same as the one in the k8s cluster
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




