import Database from "../database/database.js";
import ApiError from "../errors/ApiError.js";
import Entry from "../models/entry.js";

const SHORT_URL_BASE = "http:/localhost:3000";

console.log("Connecting to database...");
await Database.connect();
await Database.resetTable();

async function shutdown() {
  console.log("Disconnecting from database...");
  await Database.disconnect();
}

export default class Controller {
  static async addEntry(req, res, next) {
    const { longUrl, slug } = req.body;

    if (!longUrl || !slug) {
      next(ApiError.BadRequest("longUrl or slug not found in request body"));
      return;
    }

    if (!isValidHttpUrl(longUrl)) {
      next(ApiError.BadRequest(`'${longUrl}' is not a valid url`));
      return;
    }

    const shortUrl = `${SHORT_URL_BASE}/${slug}`;
    const entry = new Entry(slug, shortUrl, longUrl);

    try {
      await Database.addEntry(entry);
    } catch (err) {
      if (err.code === "ER_DUP_ENTRY") {
        next(ApiError.BadRequest(`'${slug}' is already in use`));
        return;
      }

      next(err);
    }

    res.send(entry.asJsonObject());
  }

  static async getAllEntries(req, res, next) {
    try {
      res.send(await Database.getAllEntries());
    } catch (err) {
      next(err);
    }
  }

  static async redirectToLongUrl(req, res, next) {
    try {
      const longUrl = await Database.getLongUrlWithSlug(req.params.slug);
      if (!longUrl) {
        throw new ApiError.NotFound(`'${slug}'' does not exist`);
      }
      res.redirect(longUrl);
    } catch (err) {
      next(err);
    }
  }
}

function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
