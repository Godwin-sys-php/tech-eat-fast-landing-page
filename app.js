const express = require("express");
const cors = require("cors");
const helmet = require('helmet');
const path = require('path');

const app = express();

app.use(cors()); // On accepte toute les requêtes de n'importe quelle serveur

app.use(helmet());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "html", "index.html"));
});

app.use(
  "/assets",
  express.static(path.join(__dirname, "html", "assets"))
);

module.exports = app;