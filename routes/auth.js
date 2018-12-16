const express = require('express');
const db = require('../db/con');
const router = express.Router();

router.get('/auth', (req,res) => {
    res.render('auth.html');
})
.post('/auth', (req,res) => {
    const key = req.body.key; 
    db.query('select AUTHKEY from Users where ID = ?',req.session.id,(err,result) => {
        if(key === result){
            db.query('update Users set FLAG=1 where ID = ?',req.session.id);
            res.redirect('/');
        }
        else
            res.send('<script type="text/javascript">alert("인증키가 달라요(╥﹏╥)");window.location.reload();</script>');
    })
}) 

