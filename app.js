var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin')
var usersRouter = require('./routes/users');
var middlewareRouter = require('./routes/middleware');
var routerTutorialRouter = require('./routes/router');
var errorHandlingRouter = require('./routes/error-handling');
var fileUploadRouter = require('./routes/file-upload');
var {mongoCrudRoter,mongoInstanceRoter} = require('./routes/mongoose-crud');

var app = express();

/** Database connection with mongoose */
mongoose.connect("mongodb://localhost/todos")//here todos is database name eti runtime db create korbe
 .then(()=>{
  console.log("mongodb connection succeed");
 })
 .catch((err)=>{
  console.log(err);
 })


/** Start express error middleware */

const errorMiddleware = (err,req,res,nex)=>{
  console.log(err.message);

  res.status(500).send(err.message);
}

middlewareRouter.use(errorMiddleware)
fileUploadRouter.use(errorMiddleware)

/** End express error middleware */


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/** start router register */
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin',adminRouter);
app.use('/middleware',middlewareRouter);
app.use('/router-tutorial',routerTutorialRouter);
app.use('/error-handling',errorHandlingRouter);
app.use('/file-upload',fileUploadRouter);
app.use('/mongo-crud',mongoCrudRoter);
app.use('/mongo-instance-method',mongoInstanceRoter)
/** end router register */


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
