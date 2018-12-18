const express = require('express');
const db = require('../db/connection');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  if((req.session === undefined)){
    res.redirect('/login');
  }   
  else{
    db.query('select FLAG,SCORE,SCHOOL from Users where ID = ?',req.session.id,(err,result) => {
      if (err) throw err;
      if(result[0].FLAG){
        res.render('index.ejs',{
          score : result[0].SCORE,
          user_id : req.session.id,
          user_school: req.session.school
        });
      }
      else
        res.redirect('/auth');
    })
  }
});

module.exports = router;
