const express = require('express');
const router = express.Router();

router.get('/notice',(req,res) => {
    con.query('select * from Notice', (err,result) => {
        if (err) throw err;
        res.render('notice.ejs',{
            notice : result
        })
    })
})
module.exports = router;