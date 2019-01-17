require('dotenv').config();

const https = require('https');
const fs = require('fs');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const port = process.env.PORT || 3000;

const users = require('./user-service');

const app = express();
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieSession({
  secret: process.env.SESSION_SECRET,
  secure: true,
}));

app.get('/', (req, res) => {
  const user = users.find(x => x.id === +req.session.user_id);
  res.render('index', {
    username: user && user.name,
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.challenge(username, password);
  if (!user) {
    res.status(400).send('Invalid username or password.');  
  }

  req.session.user_id = user.id;
  res.redirect('/');
});

app.post('/logout', (req, res) => {
  req.session = null;
  res.redirect('/');
});

https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert'),
}, app)
  .listen(port, () => {
    console.log(`w2d4 lecture running on https://localhost:${port}`)
  });
