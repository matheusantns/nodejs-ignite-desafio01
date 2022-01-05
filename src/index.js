const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid')

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;
  const user = users.find((user) => user.username === username)

  if(!user) {
    return response.status(404).json({error: "User not found"})
  }

  request.user = user;

  return next();
}

app.post('/users', (request, response) => {
  const { name, username } = request.body;
  const verifyIfUserAlreadyExists = users.find((user) => user.username === username);

  if (verifyIfUserAlreadyExists) {
    return response.status(400).json({error: 'usuário já existente'})
  }

  const user = {
      id: uuidv4(),
      name,
      username,
      todos: []
  }

  users.push(user)

  return response.json(user).status(201).send()

});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  const { user } = request;

  return response.json(user.todos)
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  const { title, deadline } = request.body;
  const { user } = request;

  const todo = {
    id: uuidv4(),
    title,
    done: false,
    deadline: new Date(deadline),
    created_at: new Date()
  }

  user.todos.push(todo)

  return response.status(201).json(todo).send()
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  const { user } = request;
  const { title, deadline } = request.body;
  const todoId = request.params.id;

  const verifyIfTodoExists = user.todos.find((todo) => todo.id === todoId)

  if(!verifyIfTodoExists) {
    return response.status(404).json({error: 'todo não existente'})
  }

  const changedTodos = user.todos.map(todo => {
    if(todo.id === todoId) {
      return {
        ...todo,
        title,
        deadline: new Date(deadline)
      }
    } else {
      return todo
    }
  })

  user.todos = changedTodos

  return response.json(user.todos[0])

});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  const { user } = request;
  const todoId = request.params.id;

  const verifyIfTodoExists = user.todos.find((todo) => todo.id === todoId)

  if(!verifyIfTodoExists) {
    return response.status(404).json({error: 'todo não existente'})
  }

  const changedTodoDone = user.todos.map(todo => {
    if(todo.id === todoId) {
      return {
        ...todo,
        done: !todo.done
      };
    } else {
      return todo
    }
  })

  user.todos = changedTodoDone;

  return response.json(changedTodoDone[0])

});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  const { user } = request;
  const todoId = request.params.id;

  const verifyIfTodoExists = user.todos.find((todo) => todo.id === todoId)

  if(!verifyIfTodoExists) {
    return response.status(404).json({error: 'todo não existente'})
  }

  const filteredTodos = user.todos.filter(todo => todo.id !== todoId)

  user.todos = filteredTodos

  return response.status(204).json(user.todos)
});

module.exports = app;