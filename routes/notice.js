const express = require('express');
<<<<<<< HEAD
const db = require('../db/con');
const router = express.Router();

router.get('/notice',(req,res) => {
    db.query('select * from Notice', (err,result) => {
=======
const router = express.Router();

router.get('/notice',(req,res) => {
    con.query('select * from Notice', (err,result) => {
>>>>>>> bangseonghun
        if (err) throw err;
        res.render('notice.ejs',{
            notice : result
        })
    })
})
module.exports = router;