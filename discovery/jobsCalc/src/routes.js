const express = require("express");
const routes = express.Router();

//antes do ejs, por padrão ejs já usa a pasta src/view
const views = __dirname + "/views/";

const profile = {
    name: "Felipy",
    avatar: "https://avatars.githubusercontent.com/u/50622611?v=4",
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 8,
    "vacation-per-year": 4
}

//request, response
//tambem não preciso dizer o tipo de extensao para o ejs ele já sabe que a saida é html
// routes.get('/', (req, res) => res.sendFile(basePath+"/index.html"));
routes.get('/', (req, res) => res.render(views+"index"));
routes.get('/job', (req, res) => res.render(views+"job"));
routes.get('/job/edit', (req, res) => res.render(views+"job-edit"));
routes.get('/profile', (req, res) => res.render(views+"profile", {profile}));

module.exports = routes;