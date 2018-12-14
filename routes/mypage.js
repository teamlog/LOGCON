const express = require('express');
const router = express.Router();

router.get('/mypage',(req,res) => {
    con.query('select score,school,id from users where id = ?', req.session.id, (err,result) => {
        if (err) throw err;
        res.render('mypage.ejs',{
            id : result[0].id,
            school : result[0].school,
            score : result[0].score
        })
    })
})

module.exports = router;