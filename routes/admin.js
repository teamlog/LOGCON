const express = require('express');
const db = require('../db/connection');
const path = require('path');
const router  = express.Router();
const moment = require('moment');

router.get('/',(req,res) => {
    if(!(req.session.user == 'admin'))
        res.send('<script type="text/javascript">alert("관리자가 아니시군요?٩(๑`ȏ´๑)۶");window.location.href="/";</script>');
    else
        res.sendFile(path.join(__dirname,'../views', 'admin.html'));
})

router.get('/insertP',(req,res) => {
    if(!(req.session.user === 'admin'))
        res.send('<script type="text/javascript">alert("관리자가 아니시군요?٩(๑`ȏ´๑)۶");window.location.href="/";</script>');
    else
        res.sendFile(path.join(__dirname,'../views', 'insertP.html'));
})

router.get('/upNotice',(req,res) => {
    if(!(req.session.user === 'admin'))
        res.send('<script type="text/javascript">alert("관리자가 아니시군요?٩(๑`ȏ´๑)۶");window.location.href="/";</script>');
    else
    res.sendFile(path.join(__dirname,'../views', 'upNotice.html'));
})


router.post('/insertP',(req,res) => {
    const title = req.body.title;
    const content = req.body.content;
    const answer = req.body.answer;
    const score = req.body.score;
    db.query('insert into Problems (TITLE,CONTENTS,ANSWER,SCORE) values(?,?,?,?)',[title,content,answer,score]);  
})

router.post('/upNotice',(req,res) => {
    const title = req.body.title;
    const content = req.body.content;
    const time = moment().format('MMMM Do YYYY, h:mm:ss a');
    db.query('insert into Notice (TITLE,CONTENTS,TIME) values(?,?,?)',[title,content,time]);  
})

module.exports = router;