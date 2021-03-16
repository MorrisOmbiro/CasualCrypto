const express = require("express");
const serveStatic = require("serve-static");

const app = express();
const { CoindeskAPIClient } = require("coindesk");
const apiClient = CoindeskAPIClient.start("currentprice");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


app.get("/api/coinbase", (req, res) => {
  const response = apiClient
    .get()
    .then((response) => res.json(response))
    .catch((err) => console.error(err));
});

const port = process.env.PORT || 5000;


if (process.env.NODE_ENV === 'production') {
  // Exprees will serve up production assets
  app.use(express.static('build'));

  // Express serve up index.html file if it doesn't recognize route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.join('build', 'index.html'));
  });
}

app.listen(port);
console.log("app is running on port " + port);
