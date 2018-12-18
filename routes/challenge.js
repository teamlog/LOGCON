const express = require('express');
const db = require('../db/connection');
const router = express.Router();

router.get('/:num',(req,res) => {
    pnum = req.params.num;
    db.query('select CONTENT,TITLE from Problems where id = ?',num,(err,result) => {
        if(err) throw err;
        if(!(req.session === undefined)){
            res.render('challenge.ejs',{
                info : result,
                user_id : req.session.id,
                user_school: req.session.school
            })
        }
        else{
            res.render('challenge.ejs',{
                info : result,
                user_id : 'guest',
                user_school: 'undefined'            
            })
        }
    })
})
router.post('/:num',(req,res) => {
    const pid = req.param.num;
    const user = req.session.id;
    const ans = req.body.answer;
    async function solveCheck(pid, user){
        try{
            const results = await db.query('select * from Solved where PID = ? and USER = ?',[pid,user]);
        }
        catch(err){
            console.error(err);
        }
        return results[0] ? 0:1;
    }
    db.query('select ANSWER,SCORE from Problems where PID = ?',(err,result) => {
        if(err) throw err;
        if(result === ans){
            if(solveCheck(pid,user)){
                db.query('update Users set SCORE = SCORE + ? where ID = ?',[result[0].SCORE,user]);
                res.send('<script type="text/javascript">alert("정답!!!٩(๑❛ワ❛๑)و");window.location.href("problemList");</script>');
            }
            else
                res.send('<script type="text/javascript">alert("이미 푼 문제에요...(o´ω｀o)");window.location.reload();</script>');
        }
        else
            res.send('<script type="text/javascript">alert("정답이 아니에요....૮(꒦ິ ˙̫̮ ꒦ິ)ა ");window.location.reload();</script>');
        
    })
})

router.get('/',(req,res) => {
    db.query('select TITLE from Problems',(err,result) => {
        if(err) throw err;
        if(!(req.session === undefined)){
            res.render('challenges.ejs',{
                title : result,
                user_id : req.session.id,
                user_school: req.session.school
            })
        }
        else{
            res.render('challenges.ejs',{
                title : result,
                user_id : 'guest',
                user_school : 'undefiend'
            })
        }
    })
})

module.exports = router;
