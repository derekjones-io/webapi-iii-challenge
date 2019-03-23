const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const postDb = require('./data/helpers/postDb.js');
const userDb = require('./data/helpers/userDb.js');

const server = express();

server.use(express.json(), helmet(), morgan('dev'));

server.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to Node Blog!</h1>
    <p>This is a Derek Jones production.</p>
  `);
});

server.get('/users', (req, res) => {
  userDb
    .get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ err: 'error getting users' });
    });
});

module.exports = server;
