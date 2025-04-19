import 'express-async-errors'; //always keep this at the top of the file to handle async errors in express
import { json } from "body-parser";
import cookieSession from 'cookie-session';
import { createTicketRouter } from './routes/new';
import { errorHandler } from "@grstickets/common";
import { NotFoundError } from "@grstickets/common";
import { currentUser } from "@grstickets/common";
import express, { Request, Response, NextFunction } from "express";

const app = express();

app.set('trust proxy', true); //this is for ingress-nginx to work with express
app.use(json()); // Parse JSON body first
app.use(cookieSession({
  signed: false,
  secure: process.env.NODE_ENV !== 'test', //set to true if using https if testing thisw will be false...
}));
app.use(currentUser); //this is for the current user middleware to work with express
app.use(createTicketRouter); // Route handlers after middleware setup

app.all('*', async (req, res) => {
  throw new NotFoundError();
});


app.use(errorHandler);

export { app };