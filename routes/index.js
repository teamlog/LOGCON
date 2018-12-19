const express = require('express');
const db = require('../db/connection');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  if((req.session.user === undefined)){
    res.render('index.ejs',{
      score : '0',
      user_id : 'guest',
      user_school: 'undefined',
      auth : 'true'
    });
  }
  else{
    db.query('select FLAG,SCORE,SCHOOL from Users where ID = ?',req.session.user,(err,result) => {
      if (err) throw err;
      if(!(result[0].FLAG)){
        res.render('index.ejs',{
          score : result[0].SCORE,
          user_id : req.session.user,
          user_school: result[0].SCHOOL,
          auth : 'true'
        });
      }
      else{
        res.render('index.ejs',{
          score : result[0].SCORE,
          user_id : req.session.user,
          user_school: result[0].SCHOOL,
          auth : 'false'
        })
      }
    })
  }
});

module.exports = router;
