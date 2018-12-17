const express = require('express');
const db = require('../db/con');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  if(req.session.id)
    db.query('select FLAG from Users where ID = ?',req.session.id,(err,result) => {
      if (err) throw err;
      if(result)
        res.render('index.html');
      else
        res.redirect('/auth');
    })   
  else
    res.redirect('/login');
});

module.exports = router;
