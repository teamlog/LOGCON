const express = require('express');
const router = express.Router();

router.get('/',(req,res) => {
    if(!(req.session.user))
        res.render('notStart.ejs');
    else
        res.render('notStart.ejs');
})

module.exports = router;