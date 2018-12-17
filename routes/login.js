const express = require('express');
<<<<<<< HEAD
const db = require('../db/con');
=======
>>>>>>> bangseonghun
const router = express.Router();

router.get('/login',(req,res) => {
    res.render('login.html');
})
.post('/login',(req,res)=>{
    const id = req.body.id;
    const pw = req.body.pwd;
    async function login(id, pw){
        try{
<<<<<<< HEAD
            const results = await db.query('select SCORE from Users where ID = ? and PW = ?',[id,pw]);
=======
            const results = await con.query('select score from users where id = ? and pw = ?',[id,pw]);
>>>>>>> bangseonghun
        }
        catch(err){
            console.error(err);
        }
        return results[0] ? 1:0;
    }
<<<<<<< HEAD
    if (login(id,pw)){
=======
    if (login(id,pw) === 1){
>>>>>>> bangseonghun
        req.session.user = req.body.id;
        req.session.save(() => {
            res.redirect('/');
        });
    }
    else
<<<<<<< HEAD
        res.send('<script type="text/javascript">alert("로그인 실패(ó﹏ò｡)");window.location.reload();</script>');
})

module.exports = router;
=======
        res.send('<script type="text/javascript">alert("로그인 실패(ó﹏ò｡)");window.location.href("/");</script>');
})
>>>>>>> bangseonghun
