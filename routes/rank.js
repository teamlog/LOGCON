const express = require('express');
const router = express.Router();

router.get('/rank',(req,res) => {
    con.query('select score,school,id from users', (err,result) => {
        if (err) throw err;
        res.render('mypage.ejs',{
            users : result
        })
    })
})

module.exports = router;