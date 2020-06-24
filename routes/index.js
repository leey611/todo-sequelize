const express = require('express');
const router = express.Router();
const { authenticator } = require('../middleware/auth');

// use users route
router.use('/users', require('./modules/users'));
// use todos route
router.use('/todos/', authenticator, require('./modules/todos'));
// use home route
router.use('/', authenticator, require('./modules/home'));

module.exports = router;
