import mysql from "mysql2/promise";
import ApiError from "../errors/ApiError.js";
import Entry from "../models/entry.js";

const database = "link_shortener_db";
const table = "link_shortener_table";

export default class Database {
  static conn = null;

  static async resetTable() {
    const conn = await mysql.createConnection({
      host: "mysql",
      port: 3306,
      user: "root",
      password: "admin",
      database: database,
      multipleStatements: true,
    });

    await conn.query(`
        DROP TABLE IF EXISTS ${table};

        CREATE Table ${table} (
          slug VARCHAR(30) NOT NULL,
          short_url VARCHAR(255) NOT NULL,
          long_url VARCHAR(255) NOT NULL,
          PRIMARY KEY(slug)
        );
      `);
  }

  static async connect() {
    Database.conn = await mysql.createConnection({
      host: "mysql",
      port: 3306,
      user: "root",
      password: "admin",
      database: database,
      multipleStatements: true,
    });
  }

  static getAllEntries() {
    return Database.conn
      .execute(`SELECT * FROM ${table};`)
      .then(([rows, fields]) => rows)
      .then((rows) => {
        let entries = [];
        for (let row of rows) {
          const entry = new Entry(row.slug, row.short_url, row.long_url);
          entries.push(entry);
        }

        return entries;
      });
  }

  static addEntry(entry) {
    return Database.conn.execute(
      `INSERT INTO ${table} (slug, short_url, long_url) values (?, ?, ?)`,
      entry.asDatabaseValues()
    );
  }

  static getLongUrlWithSlug(slug) {
    return Database.conn
      .execute(`SELECT long_url FROM ${table} WHERE slug = ?;`, [slug])
      .then(([rows, fields]) => rows[0]?.long_url);
  }

  static disconnect() {
    return Database.conn.end();
  }
}
