DROP DATABASE IF EXISTS link_shortener_db;
CREATE DATABASE link_shortener_db;

USE link_shortener_db;

DROP TABLE IF EXISTS link_shortener_table;

CREATE Table link_shortener_table (
  slug VARCHAR(30),
  short_url VARCHAR(255),
  long_url VARCHAR(255),
  PRIMARY KEY(slug)
);

INSERT INTO
  link_shortener_table (slug, short_url, long_url)
values
  (
    "1a2b",
    "https://localhost/1a2b",
    "https://google.com"
  );
  
  SELECT id, short_url, long_url
  FROM link_shortener_table
  WHERE id = "1a2b";