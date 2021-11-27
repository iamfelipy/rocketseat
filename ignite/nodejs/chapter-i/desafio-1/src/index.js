const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  
  const {username} = request.headers;
  
  const user = users.find(user=>user.username==username);

  if(!user){
    return response.status(400).json({error: "User not found"});
  }

  request.user = user;

  return next();
}

//cria um novo usuário
app.post('/users', (request, response) => {

  const {name,username} = request.body;
  
  let userAlreadyExists = users.some(user=>user.username == username);
  
  if(userAlreadyExists){
    return response.status(400).json({error: 'User already exists'});
  }

  let newUser = { 
    id: uuidv4(), // precisa ser um uuid
    name, 
    username, 
    todos: []
  };
  
  users.push(newUser);

  response.status(201).json(newUser);
});

//retorna todas as tarefas de um usuário especifico
app.get('/todos', checksExistsUserAccount, (request, response) => {
  
  const {user} = request;

  return response.status(200).json(user.todos);
});

//criar um todo
app.post('/todos', checksExistsUserAccount, (request, response) => {
  
  const {user} = request;
  const {title, deadline} = request.body;

  const newTodo = { 
    id: uuidv4(), // precisa ser um uuid
    title,
    done: false, 
    deadline: new Date(deadline), 
    created_at: new Date()
  }

  user.todos.push(newTodo);

  return response.status(201).json(newTodo);
});

//atualizar o todo
app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  const {user} = request;
  const {id} = request.params;
  const {title, deadline} = request.body;

  const todoFound = user.todos.find(todo=>todo.id==id);

  if(!todoFound){
    return response.status(404).json({error: "Todo not exists"});
  }
  
  todoFound.title = title;
  todoFound.deadline = new Date(deadline);

  return response.status(200).json(todoFound);
});

//atualizar o estado da tarefa
app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  const {user} = request;
  const {id} = request.params;

  const todoFound = user.todos.find(todo=>todo.id==id);

  if(!todoFound){
    return response.status(404).json({error: "Todo not exists"});
  }
  
  todoFound.done = true;

  return response.status(200).json(todoFound);
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  
  const {user} = request;
  const {id} = request.params;

  const todoID = user.todos.findIndex(todo=>todo.id==id);

  if(todoID < 0){
    return response.status(404).json({error: "Todo not exists"});
  }
  
  user.todos.splice(todoID, 1);

  return response.status(204).json();
});

module.exports = app;