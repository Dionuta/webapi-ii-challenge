const express = require("express");

const PostRouter = require("./post/post-router")

const server = express();

server.use(express.json());

server.use('/api/posts', PostRouter);

server.get('/', (req, res) => {
  res.send(`
    <h2>Dionuta's Post API</h>
    <p>Welcome to the Dionuta's Post API</p>
  `);
});



module.exports = server;