require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const formsRouter = require('./routes/forms');
const fillRouter = require('./routes/fill');
const answersRouter = require('./routes/answers');

const authMiddleware = require('./middlewares/auth');

const app = express();
const hbs = require('hbs');

hbs.registerHelper('ifeq', function (a, b, options) {
  if (a == b) { return options.fn(this); }
  return options.inverse(this);
});

hbs.registerHelper('ifne', function (a, b, options) {
  if (a != b) { return options.fn(this); }
  return options.inverse(this);
});

// connect to database
const { DB_HOST, DB_USER, DB_PASSWORD } = process.env;
mongoose.connect(`mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:27017/fibi`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
    if (!!err) console.error(err);
    console.log('Connected to database');
  }
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials', function (err) { });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'fibi',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// routes
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/forms', authMiddleware(), formsRouter);
app.use('/f', fillRouter);
app.use('/answers', answersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
