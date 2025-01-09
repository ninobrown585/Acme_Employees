// imports here for express and pg
const e = require("express");
const express = require("express");
const app = express();
const PORT = 3000;
const pg = require("pg");
const client = new pg.Client(
   "postgres://postgres:nino@localhost:5432/acme_hr_db"
);

// static routes here (you only need these for deployment)
app.listen(PORT, async () => {
    console.log(`I am listening on port number ${PORT}`);
    try {
      await client.connect();
      const SQL = `DROP TABLE IF EXISTS users;
       CREATE TABLE users(
        id  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(100),
        is_admin BOOLEAN DEFAULT FALSE 
      );
          INSERT INTO users(name, is_admin) VALUES('Damien', true);
          INSERT INTO users(name, is_admin) VALUES('Sage', true);
          INSERT INTO users(name) VALUES('Amy');
          INSERT INTO users(name) VALUES('Fred');
      `;
      await client.query(SQL);
    } catch (error) {
      console.error(error);
    }
  });
  
  app.get("/", (req, res) => {
    res.status(200).json({ message: "This is my first route" });
  });

// app routes here
app.get("/getAllUsers", async (req, res) => {
    try {
      const SQL = `;
          SELECT * FROM users;
      `;
      const response = await client.query(SQL);
      res.status(200).json(response.rows);
    } catch (error) {
      console.error(error);
    }
  });

// create your init function
const start = () => {
    console.log("This is my start method");
  };

// init function invocation
start();