const express = require("express");
const serverless = require("serverless-http");
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(cors({
  origin: '*'
}));
const router = express.Router();

var sadas = 'at54h9bey';
var ssdassa = 'pscale_pw_aOgSoWw5mJM4aPR';
  
const pool = mysql.createPool({
    connectionLimit: 10, // Adjust this value based on your requirements
    host: "aws.connect.psdb.cloud",
    user: "6sa6f3lkoy9" + sadas,
    password: ssdassa + "lYxIkmkMtE4ORo8UDzOwsFIaVjbf",
    database: "app",
    ssl: {
        rejectUnauthorized: true,
    },
});


router.get("/", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error acquiring MySQL connection:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    const query = 'SELECT * FROM contact_form';
    connection.query(query, (err, rows) => {
      connection.release(); // Release the connection back to the pool

      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: err });
        return;
      }

      // Process the query results
      res.json(rows);
    });
  });
});


router.get("/hey", (req, res) => {
  res.json({
    hello: "out!"
  });
});

app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);
