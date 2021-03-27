const express = require('express');

const router = express.Router();
router.get('/',(request,response)=>{
    response.render('home', {
        'nome':'Vinicius',
        'idade': 90
    });
});

module.exports = router;

