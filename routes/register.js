const express = require('express');
const randomstring = require('randomstring');
const nodemailer = require('nodemailer');
const db = require('../db/connection');
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
    const tmpPwd = req.body.pw;
    const tmpEmail = req.body.email;
    const tmpSchool = req.body.school;
    function emailCheck(){
        var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        // 검증에 사용할 정규식 변수 regExp에 저장
        if (tmpEmail.match(regExp) != null) {
            return 1;
        }
        else {
            return 0;
        }
    }
    if(tmpId===''||tmpPwd===''||tmpEmail===''||tmpSchool === ''){
        res.json({message: "입력되지 않은 값이 있습니다."});
    }    
    if(emailCheck){
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
                        db.query('insert into Users (ID,PW,EMAIL,SCHOOL,AUTHKEY) values (?,?,?,?,?)',[tmpId,tmpPwd,tmpEmail,tmpSchool,authkey]);
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
                                res.json({success: false});
                            }   
                        })    
                    }
                })
            }
        })
    }
})

module.exports = router;
