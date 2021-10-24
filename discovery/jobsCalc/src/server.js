const express = require("express");
const server = express();

server.get('/', (request, response) => {
    return response.send('OIE!!!');
});

server.listen(5500, () => console.log('rodando'));
