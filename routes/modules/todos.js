const express = require('express');
const router = express.Router();
const db = require('../../models');
const Todo = db.Todo;

//GET show add a new todo page
router.get('/new', (req, res) => {
  res.render('new');
});

//POST create a new todo
router.post('/', (req, res) => {
  const UserId = req.user.id;
  const { name } = req.body;
  Todo.create({ name, UserId })
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err));
});

//GET show edit a todo page
router.get('/:id/edit', (req, res) => {
  const UserId = req.user.id;
  const id = req.params.id;
  Todo.findOne({ where: { id, UserId } })
    .then((todo) => res.render('edit', { todo: todo.toJSON() }))
    .catch((err) => console.log(err));
});

//PUT update a todo
router.put('/:id', (req, res) => {
  const UserId = req.user.id;
  const id = req.params.id;
  const { name, isDone } = req.body;
  Todo.findOne({ where: { id, UserId } })
    .then((todo) => {
      todo.name = name;
      todo.isDone = isDone === 'on';
      return todo.save();
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch((err) => console.log(err));
});

//GET show a single todo's detail
router.get('/:id', (req, res) => {
  const UserId = req.user.id;
  const id = req.params.id;
  return Todo.findOne({ where: { id, Us } })
    .then((todo) => res.render('detail', { todo: todo.toJSON() }))
    .catch((err) => console.log(err));
});

//DELETE delete a todo
router.delete('/:id', (req, res) => {
  const UserId = req.user.id;
  const id = req.params.id;
  return Todo.findOne({ where: { id, UserId } })
    .then((todo) => todo.destroy())
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err));
});

module.exports = router;
