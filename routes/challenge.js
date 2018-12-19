const express = require('express');
const db = require('../db/connection');
const router = express.Router();

router.get('/:num',(req,res) => {
    pnum = req.params.num;
    db.query('select CONTENTS,TITLE,SCORE from Problems where id = ?',pnum,(err,result) => {
        if(err) throw err;
        if(!(req.session === undefined)){
            if(!(req.session.flag))
                res.redirect('/auth');
            else{
                res.render('challenge.ejs',{
                    info : result,
                    user_id : req.session.user,
                    user_school: req.session.school,
                    pid : pnum 
                })
            }
        }
        else{
            res.redirect('/');
        }
    })
})
router.post('/:num',(req,res) => {
    const pid = req.param.num;
    const user = req.session.user;
    const ans = req.body.answer;
    function solveCheck(pid, user){
        db.query('select * from Solved where PID = ? and USER = ?',[pid,user],(err,result) => {
            if(err) throw err;
            if(result.length)
                return 0;
            else
                return 1;
        })
    }
    db.query('select ANSWER,SCORE from Problems where PID = ?',(err,result) => {
        if(err) throw err;
        if(result === ans){
            if(solveCheck(pid,user)){
                db.query('update Users set SCORE = SCORE + ? where ID = ?',[result[0].SCORE,user]);
                res.json({solve : "정답!!!٩(๑❛ワ❛๑)و"});
            }
            else
                res.json({solve : "복습은 아주 좋은거죠 하지만 점수는 없어요ㅎ⁽⁽◝( ˙ ꒳ ˙ )◜⁾⁾"});
        }
        else
            res.json({solve : "정답이 아니에요....૮(꒦ິ ˙̫̮ ꒦ິ)ა"});
        
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
        else{
            res.redirect('/');
        }
    })
})

module.exports = router;
