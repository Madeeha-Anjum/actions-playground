import { Router } from "express";
import Database from "./database.js";

const router = Router();

router.post("/shorten", async (req, res) => {
  const { url, slug } = req.body;

  try {
    await Database.addEntry({ slug, url });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      res.status(500).send({
        error: {
          code: 500,
          message: `slug '${slug}' is already in use`,
        },
      });

      return;
    }

    throw err;
  }

  res.send({ slug, url });
});

router.get("/entries", async (req, res) => {
  const entries = await Database.getAllEntries();

  res.send(entries);
});

router.delete("/reset-entries", async (req, res) => {
  await Database.resetTable();

  res.sendStatus(200);
});

export default router;
