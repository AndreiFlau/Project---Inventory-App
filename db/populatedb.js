const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 ) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS instruments (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 ) NOT NULL,
  description VARCHAR ( 255 ),
  price INTEGER,
  category_id INTEGER,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

INSERT INTO categories (name) 
VALUES
  ('Guitars'),
  ('Pianos' ),
  ('Drums'),
  ('Flutes'),
  ('Electric Guitars');

INSERT INTO instruments (name, description, price, category_id)
VALUES
 ('Classical Guitar', 'A wooden guitar.', 150, 1),
 ('Grand Piano', 'A pretty big piano.', 1800, 2),
 ('Snare Drum', 'A single snare drum.', 70, 3),
 ('Piccolo', 'A half-size flute.', 120, 4),
 ('Stratocaster', 'Classic electric guitar.', 250, 5);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
