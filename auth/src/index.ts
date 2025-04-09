import express from "express";
import { json } from "body-parser";

const app = express();
app.use(json());

//for running ingress host on localhost
//configure your hostname(anything) on your system in 
// C:\Windows\System32\Drivers\etc\hosts
//and add a line like this
// 127.0.0.1 ticketing.dev

app.get("/api/users/currentuser", (req, res) => {
  res.send("Hi there!"); 
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
