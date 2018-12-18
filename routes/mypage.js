const express = require('express');
const db = require('../db/connection');
const router = express.Router();

router.get('/mypage',(req,res) => {
    if(!req.session.id){
        res.render('mypage.ejs',{
            id : 'geust',
            school : 'undefined',
            score : '0',
            coment : ' ' 
        })
    }
    else{
        db.query('select SCORE,ID,SCHOOL,PROFILE_COMENT from users where ID = ?', req.session.id, (err,result) => {
            if (err) throw err;
            res.render('mypage.ejs',{
                id : result[0].ID,
                school : result[0].SCHOOL,
                score : result[0].SCORE,
                coment : result[0].PROFILE_COMENT
            })
        })
    }
})

router.post('/mypage',(req,res) => {
    const ment = req.body.ment;
    const user = req.session.id;
    db.query('update Users set PROFILE_MENT=? where ID = ?',[ment,user]);
    res.send('<script type="text/javascript">alert("수정완료!ヽ(๑╹◡╹๑)ノ");window.location.reload();</script>');
})

module.exports = router;
