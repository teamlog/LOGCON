const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
const session = require('express-session');
const indexRouter = require('./routes/index');
const rankRouter = require('./routes/rank');
const myPageRouter = require('./routes/mypage');
const noticeRouter = require('./routes/notice');
const adminRouter = require('./routes/admin')
const registerRouter = require('./routes/register');
const authRouter = require('./routes/auth');

app.use('/', indexRouter);
app.use('/rank',rankRouter);
app.use('/mypage',myPageRouter);
app.use('/notice', noticeRouter);
app.use('/admin',adminRouter);
app.use('/register',registerRouter);
app.use('/auth',authRouter);

app.set('views', path.join(__dirname, 'views'));
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

app.listen(3000, () => {
  console.log("connect");
});