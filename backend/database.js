import mysql from "mysql2/promise";

import { getRequiredEnv } from "./helpers.js";

const MYSQL_TABLE = getRequiredEnv("MYSQL_TABLE");

const connectionConfig = {
  host: getRequiredEnv("MYSQL_HOST"),
  port: getRequiredEnv("MYSQL_PORT"),
  user: getRequiredEnv("MYSQL_USER"),
  password: getRequiredEnv("MYSQL_PASSWORD"),
  database: getRequiredEnv("MYSQL_DATABASE"),
  multipleStatements: true,
};

export default class Database {
  static conn = null;

  static async connect() {
    Database.conn = await mysql.createConnection(connectionConfig);

    await Database.conn.query(`
      CREATE TABLE IF NOT EXISTS link_shortener_table (
        slug VARCHAR(30),
        url VARCHAR(255),
        PRIMARY KEY(slug)
      );
    `);
  }

  static async resetTable() {
    await Database.conn.query(`
      TRUNCATE TABLE ${MYSQL_TABLE};
  `);
  }

  static async addEntry({ slug, url }) {
    await Database.conn.query(
      `
      INSERT INTO ${MYSQL_TABLE} (slug, url)
      values (?, ?);
      `,
      [slug, url]
    );
  }

  static async getEntryWithSlug({ slug }) {
    const [results, fields] = await Database.conn.execute(
      `
      SELECT slug, url
      FROM link_shortener_table
      WHERE slug = ?;
      `,
      [slug]
    );

    if (results.length == 0) {
      return null;
    } else if (results.length > 1) {
      // Either one or zero results should be returned
      throw new Error(`More than one entry with slug '${slug}' returned`);
    }

    return results[0];
  }

  static async getAllEntries() {
    const [results, fields] = await Database.conn.execute(
      `
      SELECT slug, url
      FROM link_shortener_table;
      `
    );
    return results;
  }

  static async disconnect() {
    return Database.conn.end();
  }
}
