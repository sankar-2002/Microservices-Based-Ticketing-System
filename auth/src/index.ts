import express from "express";
import { json } from "body-parser";
import { currentUserRouter } from "./routes/current-user";
import { signupRouter } from "./routes/signup";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

//for running ingress host on localhost
//configure your hostname(anything) on your system in 
// C:\Windows\System32\Drivers\etc\hosts
//and add a line like this
// 127.0.0.1 ticketing.dev


app.listen(3000, () => {
  console.log("Listening on port 3000");
});
