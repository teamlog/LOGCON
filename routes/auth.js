const express = require('express');
const db = require('../db/connection');
const router = express.Router();

router.get('/', (req,res) => {
    if(!(req.session.user === undefined)){
        if(!(req.session.flag)){
            res.render('auth.ejs',{
                id:req.session.user,
                school : req.session.school
            });
        }
        else{
            res.redirect('/');
        }
    }
})
.post('/', (req,res) => {
    const key = req.body.key; 
    db.query('select AUTHKEY from Users where ID = ?',req.session.user,(err,result) => {
        if(err) throw err;
        if((key === result[0].AUTHKEY)){
            db.query('update Users set FLAG=1 where ID = ?',req.session.user);
            req.session.flag = 1;
            req.session.save(() => {
                res.redirect('/');
            })
        }
        else
            res.send('<script type="text/javascript">alert("인증키가 달라요(╥﹏╥)");window.location.reload();</script>');
    })
}) 

module.exports = router;
