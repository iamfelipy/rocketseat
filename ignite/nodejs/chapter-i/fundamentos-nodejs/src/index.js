const express = require('express');

const app = express();

/*
    HTTP VERBS
    GET - Buscar uma informação dentro do servidor
    POST - Inserir uma informação no servidor
    PUT - Alterar uma informação no servidor
    PATCH - Alterar uma informação especifica
    DELETE - Deletar uma informação no servidor
*/

app.get("/", (request, response)=>{
    response.json({message: "Oi, você é bilhonário, você acredita nisso?"})
});

app.listen(3333);