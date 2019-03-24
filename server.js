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

server.get('/users/:id', (req, res) => {
  const { id } = req.params;

  userDb
    .getById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ err: 'error getting user' });
    });
});

server.post('/users', (req, res) => {
  const newUser = req.body;

  userDb
    .insert(newUser)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({ err: 'error adding user' });
    });
});

module.exports = server;
