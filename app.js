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

app.use('/', indexRouter);
app.use('/rank',rankRouter);
app.use('/mypage',myPageRouter);
app.use('/notice', noticeRouter);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.set('view engine', 'ejs');

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: '122345564fasdfafa54fsadaf', //사용자의 세션아이디 값
  resave: false,  //재접속 시 세션아이디 재발급x
  saveUninitialized: true,  //세션 사용 전까지 세션아이디 발급x
}));
app.use(passport.initialize()); // passport 구동
app.use(passport.session()); // 세션 연결
app.use(express.static(path.join(__dirname, 'html')));

passportConfig(); 

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


var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
   /* User.findOne({ username: username }, (err, user) => {
      if (err)
         return done(err);
      if (!user)
        return done(null, false, { message: 'Incorrect username.' });
      if (!user.validPassword(password)) 
        return done(null, false, { message: 'Incorrect password.' });
      return done(null, user);
    });
  */
  }
));

app.post('/login', passport.authenticate('local', {
  successRedirect: '/', 
  failureRedirect: '/login' 
}));

module.exports = app;

app.listen(3000, () => {
  console.log("connect");
});