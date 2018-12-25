const express = require('express');
const nodemailer = require('nodemailer');
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
    else
        redirect('/');
})
.post('/', (req,res) => {
    const key = req.body.key; 
    db.query('select AUTHKEY from Users where ID = ?',req.session.user,(err,result) => {
        if(err) throw err;
        if((key === result[0].AUTHKEY)){
            db.query('update Users set FLAG=1 where ID = ?',req.session.user);
            req.session.flag = 1;
            req.session.save(() => {
                res.json({success : true});
            })
        }
        else
            res.json({success:false});
    })
})

router.get('/reSend',(req,res) => {
    if(!(req.session.user === undefined)){
        if(!(req.session.flag)){
            res.render('reSend.ejs',{
                id:req.session.user,
                school : req.session.school
            });
        }
        else{
            res.redirect('/');
        }
    }
    else
        redirect('/');
})

router.post('/reSend',(req,res) => {
    const email = req.body.email;
    db.query('select SCORE from User where EMAIL = ?',email,(err,result) => {
        if(err) console.log(err);
        if(!(result.length === 0))
            res.json({success : false});
        else{
            const authkey = randomstring.generate();
            db.query('update Users set AUTHKEY = ?, EMAIL = ? where ID = ?',[authkey,email,req.session.id]);
            res.json({success: true});
            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'teamlogsr@gmail.com', 
                    pass: 'teamlogzzang2017'
                }
            });
            const mailOptions = {
                from: 'teamlogsr@gmail.com',
                to: tmpEmail ,
                subject: 'LOGCON 인증',
                text: '가입완료를 위해 <'+authkey+'> 를 입력해주세요'
            };
            transporter.sendMail(mailOptions, (err, response) => {
                if(err)
                    console.log(err);
                else{
                    console.log('sibal',response);
                }   
            })
        }
    })
})

module.exports = router;
