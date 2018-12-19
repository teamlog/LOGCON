const express = require('express');
const router = express.Router();

router.get('/',(req,res) => {
    if(!(req.session.user)){
        res.render('help.ejs',{
            id : 'guest',
            school : 'undefined'
        })
    }
    else{
        res.render('help.ejs',{
            id : req.session.user,
            school : req.session.school
        })
    }
})