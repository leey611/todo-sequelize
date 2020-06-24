const express = require('express');
const router = express.Router();

// use todos route
router.use('/todos/', require('./modules/todos'));
// use users route
router.use('/users', require('./modules/users'));
// use home route
router.use('/', require('./modules/home'));

module.exports = router;
