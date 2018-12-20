const express = require('express');
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
    if(!(req.session.flag)){
        res.redirect('/auth');
        console.log(req.session.flag);
    }
    else{
        res.render('index.ejs',{
          score : req.session.score,
          user_id : req.session.user,
          user_school: req.session.school
        })
      }
  }
});

module.exports = router;
