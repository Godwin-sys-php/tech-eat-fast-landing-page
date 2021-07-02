const express = require("express");
const cors = require("cors");
const helmet = require('helmet');
const path = require('path');

const app = express();

app.use(cors()); // On accepte toute les requêtes de n'importe quelle serveur

app.use(helmet());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.set("Content-Security-Policy", "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'");
  next();
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.get('/application/*', function (req, res) {
   res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use(
  "/assets",
  express.static(path.join(__dirname, "assets"))
);


app.use('/web', (req, res, next) => {
   res.set("Content-Security-Policy", "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'");
   next();
}, (express.static(path.join(__dirname, 'build'))));

module.exports = app;
