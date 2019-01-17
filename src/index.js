const express = require('express');
const port = process.env.PORT || 3000;

const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Things are working!');
});

app.listen(port, () =>
  console.log(`w2d4 lecture running on :${port}`));
