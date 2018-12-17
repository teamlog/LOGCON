const express = require('express');
const router = express.Router();

router.get('/login',(req,res) => {
    res.render('login.html');
})
.post('/login',(req,res)=>{
    const id = req.body.id;
    const pw = req.body.pwd;
    async function login(id, pw){
        try{
            const results = await con.query('select score from users where id = ? and pw = ?',[id,pw]);
        }
        catch(err){
            console.error(err);
        }
        return results[0] ? 1:0;
    }
    if (login(id,pw) === 1){
        req.session.user = req.body.id;
        req.session.save(() => {
            res.redirect('/');
        });
    }
    else
        res.send('<script type="text/javascript">alert("로그인 실패(ó﹏ò｡)");window.location.href("/");</script>');
})
