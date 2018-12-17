const express = require('express');
const db = require('../db/con');
const router = express.Router();

router.get('/notice',(req,res) => {
    db.query('select * from Notice', (err,result) => {
        if (err) throw err;
        res.render('notice.ejs',{
            notice : result
        })
    })
})
module.exports = router;