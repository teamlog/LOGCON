const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const ejs = require('ejs');
const db = require('./db/con');
const app = express();
const session = require('express-session');
const indexRouter = require('./routes/index');
const rankRouter = require('./routes/rank');
const myPageRouter = require('./routes/mypage');
const noticeRouter = require('./routes/notice');
const loginRouter = require('./routes/login');
const problemRouter = require('./routes/problem');
const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');
const registerRouter = require('./routes/register');
const helmet = require('helmet');

//app.use(app.router);
//routes.initialize(app);
app.use('/', indexRouter);
app.use('/rank',rankRouter);
app.use('/mypage',myPageRouter);
app.use('/notice', noticeRouter);
app.use('/login',loginRouter);
app.use('/problem',problemRouter);
app.use('/auth',authRouter);
app.use('/admin',adminRouter);
app.use('/register',registerRouter);
app.set('view engine', 'html');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'html')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: '122345564fasdfafa54fsadaf', //사용자의 세션아이디 값
  resave: false,  //재접속 시 세션아이디 재발급x
  saveUninitialized: true,  //세션 사용 전까지 세션아이디 발급x
}));
app.use(express.static(path.join(__dirname, 'html')));
app.use(helmet()); 

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

app.listen(4000, () => {
  console.log("connect");
});

module.exports = app;