const express = require("express");

const app = express();

app.get('/', (req, res) => {
  res.send("<h1>Main Page</h1>")
})

app.get('/map', (req, res) => {
  res.sendFile(__dirname + "/templates/map.html");
})

app.listen(3000, () => {
  console.log("Hello World!");
})