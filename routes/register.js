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
    var flag = 1;
    if(tmpId===''||tmpPwd===''||tmpEmail===''||tmpSchool)
        res.json({message: "입력되지 않은 값이 있습니다."});    
    else{
        db.query('select SCORE from Users where ID = ?', tmpId, (err, result) => {
            console.log('fuck');
			if(err) console.error(err);
			if(!(result.length==0))
      	        res.json({message: "중복되는 아이디입니다."});
            else 
                flag = 1;
        })
    }
    if(flag){
        db.query('select SCORE from Users where EMAIL = ?',tmpEmail, (error,results) => {
            if(error) throw error;
            if(!(results.length===0))
                res.json({message: "중복되는 이메일입니다."});
            else{
                const authkey = randomstring.generate();
                db.query('insert into Users (ID,PW,EMAIL,SCHOOL,AUTHKEY) values (?,?,?,?,?)',[tmpId,tmpPwd,tmpEmail,tmpSchool,authkey]);
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'teamlogsr@gamil.com', 
                        pass: 'teamlogzzang2017'
                    }
                });
                const mailOptions = {
                    from: 'teamlogsr@gmail.com',
                    to: tmpEmail ,
                    subject: 'LOGCON 인증',
                    text: '가입완료를 위해 <'+authStr+'> 를 입력해주세요'
                };
                transporter.sendMail(mailOptions, (err, response) => {
                    if(err){
                        console.log(err);
                        res.json({message: "error."});
                    }
                    else{
                        console.log(response);
                        res.json({message: "회원가입완료!"});
                    }   
                })    
            }
        })
    }
})

module.exports = router;
