const express = require("express");
const serverless = require("serverless-http");
const cors = require('cors');

const app = express();
app.use(cors({
  origin: '*'
}));
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    hello: "hi!"
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
