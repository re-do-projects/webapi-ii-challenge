const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send(`
        <p>Testing</p>
    `);
});

module.exports = server;