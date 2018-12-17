const express = require('express');
<<<<<<< HEAD
const db = require('../db/con');
=======
>>>>>>> bangseonghun
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  if(req.session.id)
<<<<<<< HEAD
    db.query('select FLAG from Users where ID = ?',req.session.id,(err,result) => {
      if (err) throw err;
      if(result)
        res.render('index.html');
      else
        res.redirect('/auth');
    })   
=======
    res.render('index.html');
>>>>>>> bangseonghun
  else
    res.redirect('/login');
});

module.exports = router;
