const express = require("express");
const serverless = require("serverless-http");
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(cors({
  origin: '*'
}));
const router = express.Router();

router.get("/", (req, res) => {
  
const db = mysql.createConnection({
    host: "aws.connect.psdb.cloud",
    port: 3306,
    user: "jbhbvlo7mnmdkxdflfoa",
    password: "pscale_pw_AJvaq9u0WV1ThxQyypEQMA4CQ7mAoWlZdKH33syj2OK",
    database: "app",
    ssl: {
        rejectUnauthorized: true,
    },
})

db.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    
    let select = 'SELECT * FROM contact_form LIMIT 30';

    db.query(select, function (err, results, fields) {
        if (err) {
            console.log(err.message);
        }
        res.json({
          hello: results
        });
    });

    db.end(function (err) {
        if (err) {
            return console.log(err.message);
        }
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
