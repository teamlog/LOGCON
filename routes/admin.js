const express = require('express');
const db = require('../db/connection');
const router  = express.Router();

router.get('/',(req,res) => {
    if(!(req.session.id === 'admin'))
        res.send('<script type="text/javascript">alert("관리자가 아니시군요?٩(๑`ȏ´๑)۶");window.location.href="/";</script>');
    else
        res.render('admin.html');
})

router.get('/insertP',(req,res) => {
    if(!(req.session.id === 'admin'))
        res.send('<script type="text/javascript">alert("관리자가 아니시군요?٩(๑`ȏ´๑)۶");window.location.href="/";</script>');
    else
        res.render('insertP.html');
})

router.get('/notice',(req,res) => {
    if(!(req.session.id === 'admin'))
        res.send('<script type="text/javascript">alert("관리자가 아니시군요?٩(๑`ȏ´๑)۶");window.location.href="/";</script>');
    else
        res.render('upNotice.html');
})


router.post('/insertP',(req,res) => {
    const title = req.body.title;
    const content = req.body.content;
    const answer = req.body.answer;
    const score = req.body.socre;
    db.query('insert (TITLE,CONTENT,ANSWER,SCORE) values(?,?,?,?)',[title,content,answer,score]);  
})

router.post('/notice',(req,res) => {
    const title = req.body.title;
    const content = req.body.content;
    db.query('insert (TITLE,CONTENT) values(?,?)',[title,content]);  
})

module.exports = router;