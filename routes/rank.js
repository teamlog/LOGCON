const express = require('express');
const db = require('../db/con');
const router = express.Router();

router.get('/rank',(req,res) => {
    db.query('select SCORE,SCHOOL,ID,PROFILE_COMENT from Users', (err,result) => {
        if (err) throw err;
        if(req.session.id){
            res.render('rank.ejs',{
                users : result,
                user_id : req.session.id,
                user_school : req.session.school
            })
        }
        else{
            res.render('rank.ejs',{
                users : result,
                user_id : 'guest',
                user_school : 'undefined'
            })
        }
    })
})

module.exports = router;