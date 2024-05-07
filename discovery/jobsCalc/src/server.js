const express = require("express");
const server = express();
const routes = require("./routes");
const path = require("path");

//set view engine
//antes do ejs, por padrão ejs já usa a pasta src/view
server.set("view engine", "ejs");

//mudar a localização da views
server.set("views", path.join(__dirname, "views"));

//habilitar arquivos statics
server.use(express.static("public"));

//usar o req.body
server.use(express.urlencoded({extended: true}));

// routes
server.use(routes);

server.listen(process.env.PORT, () => console.log("funcionando"));
