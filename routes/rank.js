const express = require('express');
<<<<<<< HEAD
const db = require('../db/con');
const router = express.Router();

router.get('/rank',(req,res) => {
    db.query('select SCORE,SCHOOL,ID,PROFILE_COMENT from Users', (err,result) => {
=======
const router = express.Router();

router.get('/rank',(req,res) => {
    con.query('select score,school,id from users', (err,result) => {
>>>>>>> bangseonghun
        if (err) throw err;
        res.render('mypage.ejs',{
            users : result
        })
    })
})

module.exports = router;