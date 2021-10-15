import { readFromDatabase, writeToDatabase } from "./fileHandler.js";
import express, { response } from "express";

const app = express();
const PORT = 3000;

app.get("/", (request, response) => {
  response.send("Hello World");
});

app.get("/api/urls", (request, response) => {
  response.send(readFromDatabase());
});

app.post("/api/shorten", (request, response) => {
  console.log(request.body);
  response.send("got it");
});

app.listen(PORT, () => {
  console.log(`Starting Server on http://localhost:${PORT}`);
});
