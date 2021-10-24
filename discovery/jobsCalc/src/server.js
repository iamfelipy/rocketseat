const express = require("express");
const server = express();
const routes = require("./routes");

//habilitar arquivos statics
server.use(express.static("public"));

// routes
server.use(routes);

server.listen(5500, () => console.log("funcionando"));
