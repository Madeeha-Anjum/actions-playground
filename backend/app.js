import "dotenv/config";
import express from "express";
import cors from "cors";
import morganBody from "morgan-body"; // for long, pretty api logs
// import morgan from "morgan"; // for short, pretty api logs

import apiRouter from "./apiRouter.js";
import Database from "./database.js";
import { getRequiredEnv } from "./helpers.js";

await Database.connect();

const app = express();
const port = getRequiredEnv("PORT");

app.use(
  cors({
    origin: getRequiredEnv("ALLOWED_CORS_ORIGIN"),
  })
);

// allow the app to parse json in the body
app.use(express.json());

// console log req and res in a pretty way
morganBody(app); // shows long, pretty api logs
// app.use(morgan("dev")); // shows shot, pretty api logs

// serve api docs
app.use("/", express.static("api-docs"));

// contains all the routes that start with /api/v2
app.use("/api/v2", apiRouter);

// Go to the shortened link
app.get("/:slug", async (req, res) => {
  const slug = req.params.slug;

  const entry = await Database.getEntryWithSlug({ slug });

  if (!entry) {
    res.status(404).send({
      error: {
        code: 404,
        message: `'${slug}' does not exist`,
      },
    });
    return;
  }

  res.redirect(entry.url);
});

const server = app.listen(port, () => {
  console.log(`🚀 App Listening on Port: ${port}`);
});

const gracefulShutdownHandler = function gracefulShutdownHandler(signal) {
  // https://blaipratdesaba.com/graceful-shutdown-of-node-js-express-applications-for-zero-downtime-deployments-31c2a3c32467
  console.log(`Caught ${signal}, gracefully shutting down`);

  setTimeout(() => {
    console.log("🤞 Shutting down application");

    // TODO: Disconnect from Database here
    Database.disconnect();

    // stop the server from accepting new connections
    server.close(function () {
      console.log("👋 All requests stopped, shutting down");
      // once the server is not accepting connections, exit
      process.exit();
    });
  }, 0);
};

// The SIGINT signal is sent to a process by its controlling terminal when a user wishes to interrupt the process.
process.on("SIGINT", gracefulShutdownHandler);

// The SIGTERM signal is sent to a process to request its termination.
process.on("SIGTERM", gracefulShutdownHandler);
