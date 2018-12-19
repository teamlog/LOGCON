const express = require('express');
const db = require('../db/connection');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  if((req.session.user === undefined)){
    res.redirect('/login');
  }
  else{
    db.query('select FLAG,SCORE,SCHOOL from Users where ID = ?',req.session.id,(err,result) => {
      if (err) throw err;
      if(!(result[0].FLAG)){
        res.render('index.ejs',{
          score : result[0].SCORE,
          user_id : req.session.user,
          user_school: result[0].SCHOOL
        });
      }
      else
        res.redirect('/auth');
    })
  }
});

module.exports = router;
