import 'express-async-errors'; //always keep this at the top of the file to handle async errors in express
import { json } from "body-parser";
import cookieSession from 'cookie-session';
import { currentUserRouter } from "./routes/current-user";
import { signupRouter } from "./routes/signup";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { errorHandler } from "./middleware/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import express, { Request, Response, NextFunction } from "express";

const app = express();

app.set('trust proxy', true); //this is for ingress-nginx to work with express
app.use(cookieSession({
  signed: false,
  secure: process.env.NODE_ENV !== 'test', //set to true if using https if testing thisw will be false...
}));


app.use(json());

app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);


app.all('*', async (req, res) => {
  throw new NotFoundError();
});


app.use(errorHandler);

export { app };