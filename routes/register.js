const express = require('express');
const randomstring = require('randomstring');
const nodemailer = require('nodemailer');
const db = require('../db/connection');
const crypto = require('crypto');
const router = express.Router();

router.get('/',(req,res) => {
    if(!(req.session.user === undefined)){
        res.render('register.ejs',{
            user_id : req.session.user,
            user_school : req.session.school
        });
    }
    else{
        res.render('register.ejs',{
            user_id : 'guest',
            user_school : 'undefined'
        })
    }
})
.post('/',(req,res) => {
    const tmpId = req.body.id;
    const pw = req.body.pw;
    const tmpEmail = req.body.email;
    const tmpSchool = req.body.school;
    var tmpGrade = req.body.grade;
    const tmpPwd = crypto.createHash('sha512').update(pw).digest('base64');
    function emailCheck(email){
        var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        if (email.match(regExp) != null) 
            return 1;
        else 
            return 0;
    }
    if(tmpGrade != 'h' && tmpGrade != 'm'){
        res.json({success : false});
    }
    if(tmpGrade === 'h'){
        tmpGrade = "고등학생";
    }
    if(tmpGrade === 'm'){
        tmpGrade = "중학생";
    }
    if(tmpId===''||tmpPwd===''||tmpEmail===''||tmpSchool === ''||tmpGrade === '')
        res.json({success: false});
    if(pw.length<8||pw.length>20||tmpId.length>20||tmpId.length<5)
        res.json({success:false})
    if(!((emailCheck(tmpEmail))))
        res.json({success:false});
    else{
        db.query('select SCORE from Users where ID = ?', tmpId, (err, result) => {
			if(err) console.error(err);
			if(!(result.length===0))
                res.json({success: false});
            else{
                db.query('select SCORE from Users where EMAIL = ?',tmpEmail, (error,results) => {
                    if(error) throw error;
                    if(!(results.length===0))
                        res.json({success: false});
                    else{
                        const authkey = randomstring.generate();
                        db.query('insert into Users (ID,PW,EMAIL,SCHOOL,AUTHKEY,GRADE) values (?,?,?,?,?,?)',[tmpId,tmpPwd,tmpEmail,tmpSchool,authkey,tmpGrade]);
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
            }
        })
    }
})

module.exports = router;
