import express from "express";
import morgan from "morgan";
import Controller from "./controllers/Controller.js";
import ApiError from "./errors/ApiError.js";
import errorHandler from "./errors/error-handler.js";

const PORT = 6969;
const app = express();

app.use(express.json());
app.use(morgan("combined"));

app.get("/api/v1", (req, res) => {
  res.send({ message: "Welcome!" });
});

app.post("/api/v1/shorten", Controller.addEntry);

app.get("/api/v1/entries", Controller.getAllEntries);

app.post("/api/*", (req, res, next) => next(ApiError.NotFound()));

app.get("/api/*", (req, res, next) => next(ApiError.NotFound()));

app.get("/:slug", Controller.redirectToLongUrl);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
