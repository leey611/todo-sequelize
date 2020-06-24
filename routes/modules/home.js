const express = require('express');
const router = express.Router();
const db = require('../../models');
const Todo = db.Todo;

router.get('/', (req, res) => {
  const UserId = req.user.id;
  return Todo.findAll({
    raw: true,
    nest: true,
    where: { UserId: UserId }
  })
    .then((todos) => res.render('home', { todos: todos }))
    .catch((err) => console.log(err));
});

module.exports = router;
