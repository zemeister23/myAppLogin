const express = require('express');
const router = express.Router();

// ISLOGIN INIT
const isLogin = require('../helpers/isLogin').isLogin;
console.log(isLogin);

// Kartalarni Qoshish GET
router.get('/', (req,res) => {
    if (isLogin){
        res.render('dashboard', {
            title: "Karta Qo'shish Sahifasi",
        });
    } else{
        res.redirect('/page-error');
    }

});
// ERROR PAGE
router.get('/', (req,res) => {
    res.render('page-error', {
        titleError: "404 Sahifa Topilmadi",
    });
});

module.exports = router;
