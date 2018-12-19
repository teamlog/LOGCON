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
              res.json({success : false});
        }
        else {
      	    if (pw === result[0].PW){; 
                req.session.user = id;
                req.session.school = result[0].SCHOOL;
                req.session.flag = result[0].FLAG;
                req.session.score = result[0].SCORE;
                //console.log(req.session.user,req.session.school,pw);
                req.session.save(() => {
                    res.json({success : true});
			    })
            }
            else{
                res.json({success : false});
            }
        }    
    })
})

module.exports = router;
