const express = require('express');
const router = express.Router();
const db = require('../../models');
const Todo = db.Todo;
const User = db.User;

//GET login page
router.get('/login', (req, res) => {
  res.render('login');
});

//POST login a user
router.post('/login', (req, res) => {
  res.send('log in a user');
});

//GET register page
router.get('/register', (req, res) => {
  res.render('register');
});

//POST register a new user
router.post('/register', (req, res) => {
  console.log(req.body);
  const { name, email, password, confirmPassword } = req.body;
  User.create({ name, email, password }).then((user) => res.redirect('/'));
  //res.send('register a new user');
});

//GET logout user
router.get('/logout', (req, res) => {
  res.send('logout');
});

module.exports = router;
