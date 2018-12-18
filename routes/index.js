const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  if(req.session.id)
    res.render('index.html');
  else
    res.redirect('/login');
});

module.exports = router;
