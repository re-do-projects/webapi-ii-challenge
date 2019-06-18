const express = require('express');

const server = express();

const postsRouter = require('./router/post-router.js');

server.use(express.json());
server.use('/api/posts', postsRouter);

server.get('/', (req, res) => {
    res.send(`
        <p>Testing</p>
    `);
});

module.exports = server;