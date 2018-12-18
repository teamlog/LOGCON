const express = require('express');
const db = require('../db/con');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  if(req.session.id)
    db.query('select FLAG,SCORE from Users where ID = ?',req.session.id,(err,result) => {
      if (err) throw err;
      if(result[0].FLAG)
        res.render('index.ejs',{
          score : result[0].SCORE
        });
      else
        res.redirect('/auth');
    })   
  else
    res.redirect('/login');
});

module.exports = router;
