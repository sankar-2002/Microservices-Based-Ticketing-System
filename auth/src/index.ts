import { StateOverride } from './../node_modules/@types/whatwg-url/index.d';
import { json } from "body-parser";
import mongoose from "mongoose";
import { currentUserRouter } from "./routes/current-user";
import { signupRouter } from "./routes/signup";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { errorHandler } from "./middleware/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import express, { Request, Response, NextFunction } from "express";
import 'express-async-errors';
const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);


app.all('*', async (req, res) => {
  throw new NotFoundError();
});


app.use(errorHandler);

//for running ingress host on localhost
//configure your hostname(anything) on your system in 
// C:\Windows\System32\Drivers\etc\hosts
//and add a line like this
// 127.0.0.1 ticketing.dev


const start = async () => {
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




