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
  
const db = mysql.createConnection({
    host: "aws.connect.psdb.cloud",
    port: 3306,
    user: "6sa6f3lkoy9" + sadas,
    password: ssdassa + "lYxIkmkMtE4ORo8UDzOwsFIaVjbf",
    database: "app",
    ssl: {
        rejectUnauthorized: true,
    },
})
var aqui = false;
db.connect((err) => {
  if (err) {
    return;
  } else {
    aqui = true;
  }
});


router.get("/", async(req, res) => {
  /*
  db.query('SELECT * FROM contact_form', (err, results, fields) => {
    if (!err) {
  return results;

    } else {

  return 'erro';
    }
  });
  
    res.json({
      message: output
    });
   */
   try {
    // Perform MySQL query asynchronously using promises or util.promisify
    const query = 'SELECT * FROM contact_form';
    const rows = await executeQuery(query);


    res.json(rows); // Send the results as JSON response
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: err });
  }
});

function executeQuery(query) {
  return new Promise((resolve, reject) => {
    db.query(query, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}


router.get("/hey", (req, res) => {
  res.json({
    hello: "out!"
  });
});

app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);
