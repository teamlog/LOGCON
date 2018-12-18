const express = require('express');
const db = require('../db/connection');
const router = express.Router();

router.get('/login',(req,res) => {
    if(req.session.id){
        res.render('login.ejs',{
            user_id : req.session.id,
            user_school: req.session.school
        });
    }
    else{
        res.render('login.ejs',{
            user_id : 'guest',
            user_school : 'undefined'
        })
    }
})
.post('/login',(req,res)=>{
    const id = req.body.id;
    const pw = req.body.pwd;
    async function login(id, pw){
        try{
            const results = await db.query('select SCHOOL from Users where ID = ? and PW = ?',[id,pw]);
        }
        catch(err){
            console.error(err);
        }
        return results[0] ? results[0] : 0;
    }
    const userInfo = login(id,pw);
    if (userInfo){
        req.session.user = req.body.id;
        req.session.school = userInfo;
        req.session.save(() => {
            res.redirect('/');
        });
    }
    else
        res.send('<script type="text/javascript">alert("로그인 실패(ó﹏ò｡)");window.location.reload();</script>');
})

module.exports = router;
