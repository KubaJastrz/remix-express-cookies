const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');

// Setup

const PORT = Number(process.env.PORT) || 6000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    name: 'express-session',
    cookie: {
      maxAge: 10000,
    },
  }),
);
app.disable('x-powered-by');

// Methods

app.post('/login', (req, res) => {
  req.session.regenerate((err) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }
    req.session.secret = getRandomInt(1, 100);
    req.session.save((err) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.sendStatus(201);
      }
    });
  });
});
app.post('/logout', (req, res) => {
  req.session.secret = undefined;
  req.session.save((err) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});
app.get('/secret', (req, res) => {
  if (req.session.secret) {
    res.send({ secret: req.session.secret });
  } else {
    res.sendStatus(401);
  }
});

// Listener

app.listen(PORT, () => {
  console.log(`Express app listening on http://localhost:${PORT}`);
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
