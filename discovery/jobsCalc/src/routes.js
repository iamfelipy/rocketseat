const express = require("express");
const routes = express.Router();
const ProfileController = require("./controllers/ProfileController");
const JobController = require("./controllers/JobController");

//request, response
//tambem não preciso dizer o tipo de extensao para o ejs ele já sabe que a saida é html
// routes.get('/', (req, res) => res.sendFile(basePath+"/index.html")); o antigo,antes do ejs
routes.get('/', JobController.index);
routes.get('/job', JobController.create);
routes.post('/job', JobController.save);
routes.get('/job/:id', JobController.show);
routes.post('/job/:id', JobController.update);
routes.post('/job/delete/:id', JobController.delete);

routes.get('/profile', ProfileController.index);
routes.post('/profile', ProfileController.update);


module.exports = routes;