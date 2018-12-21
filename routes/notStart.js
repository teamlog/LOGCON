const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  if((req.session.user === undefined)){
    res.render('notStart.ejs',{
      user_id : 'guest',
      user_school: 'undefined',
      auth : true
    });
  }
  else{
    if(!(req.session.flag)){
        res.redirect('/auth');
        console.log(req.session.flag);
    }
    else{
        res.render('notStart.ejs',{
          user_id : req.session.user,
          user_school: req.session.school,
          auth : true
        })
      }
  }
});

module.exports = router;
