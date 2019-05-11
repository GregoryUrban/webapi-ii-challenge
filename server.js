// focal point of End Points

const express = require('express');

const dbRouter = require('./data/db-router');

const server = express();

server.use(express.json()); 
server.use('/api/db', dbRouter) // middleware
// server.use('api.users', dbRouter) // examples
// server.use('api.admins', dbRouter)


server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda db API</h>
    <p>Welcome to the Lambda db API</p>
  `);
});





module.exports = server;