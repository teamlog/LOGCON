const express = require('express');
const db = require('../db/connection');
const crypto = require('crypto');
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
    var tmpPw = req.body.pw;
    const pw = crypto.createHash('sha512').update(tmpPw).digest('base64');
    db.query('select *from Users where ID = ? and PW = ?' , [id,pw], (err, result) => {
		if (err) throw err;
        if(result.length === 0){
              res.json({success : false});
        }
        else {
            req.session.user = id;
            req.session.school = result[0].SCHOOL;
            req.session.flag = result[0].FLAG;
            req.session.score = result[0].SCORE;
            req.session.save(() => {
                res.json({success : true});
			})
        }  
    })
})

module.exports = router;
