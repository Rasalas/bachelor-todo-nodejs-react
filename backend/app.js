const express = require('express');
const app = express();
const port = 3001;

app.get('/', (req, res) => {
  res.send('Hallo vom Backend!');
});

app.listen(port, () => {
  console.log(`Backend läuft auf http://localhost:${port}`);
});