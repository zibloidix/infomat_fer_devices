require('./services/mongoose-connector');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const auth = require('./services/auth');

const indexRouter = require('./routes/index');
const devicesRouter = require('./routes/devices');
const usersRouter = require('./routes/users');
const lpusRouter = require('./routes/lpus');
const loginRouter = require('./routes/login');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use(auth);
app.use('/devices', devicesRouter);
app.use('/users', usersRouter);
app.use('/lpus', lpusRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
