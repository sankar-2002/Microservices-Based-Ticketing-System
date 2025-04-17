import mongoose from "mongoose";
import { app } from "./app";

//for running ingress host on localhost
//configure your hostname(anything) on your system in 
// C:\Windows\System32\Drivers\etc\hosts
//and add a line like this
// 127.0.0.1 ticketing.dev


const start = async () => {
  if(!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {}); 
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
  } 

  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
};

start();




