const express = require('express');
const router = express.Router();

router.get('/rank',(req,res) => {
    con.query('select SCORE,SCHOOL,ID,PROFILE_COMENT from Users', (err,result) => {
        if (err) throw err;
        res.render('mypage.ejs',{
            users : result
        })
    })
})

module.exports = router;