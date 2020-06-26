if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const usePassport = require('./config/passport');
const flash = require('connect-flash');
const routes = require('./routes');

//set handlebars as view engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }));
app.set('view engine', 'hbs');
//set express-session
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: true
  })
);

usePassport(app);
app.use(flash());
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user;
  res.locals.success_msg = req.flash('success_msg');
  res.locals.warning_msg = req.flash('warning_msg');
  res.locals.loginError = req.flash('error');
  next();
});

//set up bodyparser
app.use(express.urlencoded({ extended: false }));
//method override
app.use(methodOverride('_method'));
//express static
app.use(express.static('public'));

app.use(routes);

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
