const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const db = require('../../models');
const Todo = db.Todo;
const User = db.User;

//GET login page
router.get('/login', (req, res) => {
  res.render('login');
});

//POST login a user
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  })
);

//GET register page
router.get('/register', (req, res) => {
  res.render('register');
});

//POST register a new user
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  if (!name || !email || !password || !confirmPassword) {
    return res.render('register', {
      registerError: { message: 'Please complete all the fields' },
      name,
      email,
      password,
      confirmPassword
    });
  }
  if (password !== confirmPassword) {
    return res.render('register', {
      registerError: { message: 'Please check the password' },
      name,
      email,
      password,
      confirmPassword
    });
  }
  User.findOne({ where: { email } }).then((user) => {
    if (user) {
      console.log('User already exists');
      return res.render('register', {
        registerError: { message: 'This email has been registered' },
        name,
        email,
        password,
        confirmPassword
      });
    }
    return bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hash) =>
        User.create({
          name,
          email,
          password: hash
        })
      )
      .then(() => {
        req.flash('success_msg', 'You can now log in!');
        res.redirect('/users/login');
      })
      .catch((err) => console.log(err));
  });
  //User.create({ name, email, password }).then((user) => res.redirect('/'));
  //res.send('register a new user');
});

//GET logout user
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'Logout successfully');
  res.redirect('/users/login');
});

module.exports = router;
