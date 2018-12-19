const express = require('express');
const db = require('../db/connection');
const router = express.Router();

router.get('/', (req,res) => {
    if(!(req.session.user === undefined)){
        db.query('select FLAG from Users where id = ?',req.session.id,(err,result) => {
            if(err) throw err;
            if(!result){
                res.render('auth.ejs',{
                    user_id : req.session.user,
                    user_school : req.session.school
                });
            }
            else{
                res.redirect('/');
            }
        })
    }
})
.post('/', (req,res) => {
    const key = req.body.key; 
    db.query('select AUTHKEY from Users where ID = ?',req.session.id,(err,result) => {
        if(err) throw err;
        if(key === result){
            db.query('update Users set FLAG=1 where ID = ?',req.session.id);
            res.redirect('/');
        }
        else
            res.send('<script type="text/javascript">alert("인증키가 달라요(╥﹏╥)");window.location.reload();</script>');
    })
}) 

module.exports = router;
