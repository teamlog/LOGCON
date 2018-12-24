const express = require('express');
const db = require('../db/connection');
const router = express.Router();

router.get('/:num',(req,res) => {
    if(!(req.session === undefined)){
        if(!(req.session.flag))
            res.redirect('/auth');
        else{
            pnum = req.params.num;
            db.query('select CONTENTS,TITLE,SCORE,FILE_PATH from Problems where ID = ?',pnum,(err,result) => {
                if(err) throw err;
                res.render('challenge.ejs',{
                    info : result,
                    user_id : req.session.user,
                    user_school: req.session.school,
                    pid : pnum 
                 })
            })
        }
    }
    else
        res.redirect('/');
})
router.post('/:num',(req,res) => {
    const user = req.session.user;
    const ans = req.body.answer;
    db.query('select ANSWER,SCORE from Problems where ID = ?',pnum,(err,result) => {
        if(err) throw err;
        if(result[0].ANSWER === ans){
            db.query('select * from Solved where PID = ? and USER = ?',[pnum,user],(error,results) => {
                if(error) console.log(error);
                if(results.length === 0){
                    db.query('update Users set SCORE=? where ID = ?',[result[0].SCORE + req.session.score,user]);
                    db.query('insert into Solved (PID,USER) values (?,?)',[pnum,user]);
                    res.json({solve : "정답!!!٩(๑❛ワ❛๑)و"});
                }
                else{
                    res.json({solve : "복습은 아주 좋은거죠 하지만 점수는 없어요ㅎ⁽⁽◝( ˙ ꒳ ˙ )◜⁾⁾"});
                }
            })
        }
        else{
            res.json({solve : "정답이 아니에요....૮(꒦ິ ˙̫̮ ꒦ິ)ა"});
        }
        
    })
})

router.get('/',(req,res) => {
    db.query('select TITLE,SCORE from Problems',(err,result) => {
        if(err) throw err;
        if(!(req.session.user === undefined)){
            if(!(req.session.flag))
                res.redirect('/auth');
            else{
                res.render('challenges.ejs',{
                    info : result,
                    user_id : req.session.user,
                    user_school: req.session.school,
                })
            }
        }
        else
            res.redirect('/');
    })
})

module.exports = router;
