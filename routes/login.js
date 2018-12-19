const express = require('express');
const db = require('../db/connection');
const router = express.Router();

router.get('/',(req,res) => {
    if(!(req.session.user === undefined)){
        res.render('login.ejs',{
            user_id : req.session.user,
            user_school: req.session.school
        });
    }
    else{
        res.render('login.ejs',{
            user_id : 'guest',
            user_school : 'undefined'
        })
    }
})
.post('/',(req,res)=>{
    const id = req.body.id;
    const pw = req.body.pw;
    db.query('select *from Users where ID = ?', id, (err, result) => {
		if (err) throw err;
        if(result.length === 0){
              res.json({message:'존재하지 않는 아이디입니다.'});
              console.log('sibal');
        }
        else {
      	    if (pw === result[0].PW){                 
                console.log('sival'); 
                req.session.user = id;
                req.session.school = result[0].SCHOOL;
                console.log(req.session.user,req.session.school,pw);
                req.session.save(() => {
                    res.redirect('/');
			    })
            }
            else{
                res.json({message : "로그인 실패(ó﹏ò｡)"});
                console.log('seebal');
            }
        }    
    })
})

module.exports = router;
