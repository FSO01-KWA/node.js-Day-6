const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3002;  // 포트 번호 설정

console.log("서버 시작 준비 중...");

app.use(bodyParser.json());

let todos = [];

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.post('/todos', (req, res) => {
  const { task } = req.body;
  const newTodo = { id: todos.length + 1, task, completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.patch('/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id);
  const todo = todos.find(t => t.id === todoId);
  if (!todo) {
    return res.status(404).json({ message: '할 일을 찾을 수 없습니다.' });
  }
  todo.completed = true;
  res.json(todo);
});

app.delete('/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id);
  todos = todos.filter(t => t.id !== todoId);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
