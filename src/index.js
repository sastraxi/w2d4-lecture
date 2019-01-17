const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

const users = require('./user-service');

const app = express();
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  const user = users.find(x => x.id === +req.cookies.user_id);
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

  res.cookie('user_id', user.id);
  res.redirect('/');
});

app.post('/logout', (req, res) => {
  res.clearCookie('user_id');
  res.redirect('/');
});

app.listen(port, () =>
  console.log(`w2d4 lecture running on localhost:${port}`));
