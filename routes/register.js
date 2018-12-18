const express = require('express');
const randomstring = require('randomstring');
const nodemailer = require('nodemailer');
const db = require('../db/con');
const router = express.Router();

router.get('/register',(req,res) => {
    res.render('register.html');
})
.post('/register',(req,res) => {
    const tmpId = req.body.id;
    const tmpPwd = req.body.pwd;
    const tmpEmail = req.body.email;
    const tmpSchool = req.body.school
    if(tmpId===''||tmpPwd===''||tmpEmail===''||tmpSchool)
        res.send('<script type="text/javascript">alert("입력되지 않은 값이 있습니다.");window.location.reload();</script>');
    else{
        db.query('select SCORE from Users where ID = ?', tmpId, (err, result) => {
			if(err) throw err
			if(!(result.length===0))
      	        res.send('<script type="text/javascript">alert("중복되는 아이디입니다.");window.location.reload();</script>');
            else {
                const flag = 1;
      	    }
		})
        if(flag){
            db.query('select SCORE from Users where EMAIL = ?',tmpEmail, (err,result) => {
                if(err) throw err;
                if(!(result.length===0))
                    res.send('<script type="text/javascript">alert("중복되는 이메일입니다.");window.location.reload();</script>');
                else {
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
                        to: email ,
                        subject: 'LOGCON 인증',
                        text: '가입완료를 위해 <'+authStr+'> 를 입력해주세요'
                    };
                    transporter.sendMail(mailOptions, (err, response) => {
                        if(err){
                            console.log(err);
                            res.send('<script type="text/javascript">alert("error");window.location.href("login");</script>');
                        }
                        else{
                            console.log(response);
                            res.send('<script type="text/javascript">alert("회원가입 성공!");window.location.href="login";</script>');
                        }   
                    })    
                }
            })
        }
    }
})

module.exports = router;
