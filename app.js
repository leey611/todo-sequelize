const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const routes = require('./routes');

//set handlebars as view engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }));
app.set('view engine', 'hbs');
//set express-session
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false
  })
);

//set up bodyparser
app.use(express.urlencoded({ extended: false }));
//method override
app.use(methodOverride('_method'));
//express static
app.use(express.static('public'));

app.use(routes);

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
