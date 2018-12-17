const express = require('express');
const db = require('../db/con');
const router  = express.Router();

router.get('/admin',(req,res) => {
    if(!(req.session.id === 'admin'))
        res.send('<script type="text/javascript">alert("관리자가 아니시군요?٩(๑`ȏ´๑)۶");window.location.href("/");</script>');
    else
        res.render('admin.html');
})

router.get('/admin/insertP',(req,res) => {
    if(!(req.session.id === 'admin'))
        res.send('<script type="text/javascript">alert("관리자가 아니시군요?٩(๑`ȏ´๑)۶");window.location.href("/");</script>');
    else
        res.render('insertP.html');
})

router.get('/admin/notice',(req,res) => {
    if(!(req.session.id === 'admin'))
        res.send('<script type="text/javascript">alert("관리자가 아니시군요?٩(๑`ȏ´๑)۶");window.location.href("/");</script>');
    else
        res.render('upNotice.html');
})


router.post('/admin/insertP',(req,res) => {
    const title = req.body.title;
    const content = req.body.content;
    const answer = req.body.answer;
    const score = req.body.socre;
    db.query('insert (TITLE,CONTENT,ANSWER,SCORE) values(?,?,?,?)',[title,content,answer,score]);  
})

router.post('/admin/notice',(req,res) => {
    const title = req.body.title;
    const content = req.body.content;
    db.query('insert (TITLE,CONTENT) values(?,?)',[title,content]);  
})
