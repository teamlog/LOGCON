const express = require('express');
const router = express.Router();

router.get('/',(req,res) => {
    if(!(req.session.user)){
        res.render('help.ejs',{
            user_id : 'guest',
            user_school : 'undefined'
        })
    }
    else{
        res.render('help.ejs',{
            user_id : req.session.user,
            user_school : req.session.school
        })
    }
})

module.exports = router;