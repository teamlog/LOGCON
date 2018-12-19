const express = require('express');
const db = require('../db/connection');
const router = express.Router();

router.get('/',(req,res) => {
    db.query('select * from Notice', (err,result) => {
        if (err) throw err;
        if(!(req.session.user === undefined)){
            res.render('notice.ejs',{
                notice : result,
                user_id : req.session.user,
                user_school: req.session.school
            })
        }
        else{
            res.render('notice.ejs',{
                user_id : 'guest',
                user_school : 'undefined',
                notice : result
            })
        }
    })
})
module.exports = router;