const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const router = express.Router();

// User Schemasi Qabul Qilindi
const User = require('../models/User.js');

// User Royhatga Olish Sahifasi GET
router.get('/register/:id', (req,res) => {
     res.render('register',{
         title: "Ro'yhatga Olish Sahifasi",
         assosiyTitle: "Tizimdan Ro'yhatdan O'tish"
     });
    console.log(res);
});

// User Royhatga Olish Sahifasi POST
router.post('/register', (req,res) => {

    const ism = req.body.ism;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const password2 = req.body.password2;

    req.checkBody('ism', 'Ism Qismi Majburiy').notEmpty();
    req.checkBody('email', 'Email Qismi Majburiy').notEmpty();
    req.checkBody('email', 'Emailni Togri Kiriting').isEmail();
    req.checkBody('username', 'Username Qismi Majburiy').notEmpty();
    req.checkBody('password', 'Parol Qismi Majburiy').notEmpty();
    req.checkBody('password2', 'Parol Togri Kelmadi').equals(req.body.password);

    // ERROR CATCH
    const errors = req.validationErrors();

    if (errors){
        res.render('register', {
            title: 'Ro\'yhatga Olish Sahifasi(Iltimos Tekshiring)',
            errors
        });
    }else{
        const yangiUser = new User({
            ism,
            email,
            username,
            password
        });
        // PAROL CRYPTLANISHI
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(yangiUser.password, salt, (err, hash) => {
                if (err)
                    console.log(err);

                yangiUser.password = hash;
                yangiUser.save((err) => {
                    if (err){
                        console.log(err);
                    }
                    else{
                        req.flash('success','Muvaffaqiyatli Royhatdan Otdingiz. Tizimga Kirishingiz Mumkin.')
                        res.redirect('/user/signIn')
                    }
                })
            });
        });

    }

});
// User Kirish Sahifasi GET
router.get('/signIn', (req,res) => {
    res.render('signin',{
        title: "Tizimga Kirish Sahifasi",
        assosiyTitle: "Tizimga Kirish"
    });

});
// User Kirish Sahifasi POST
router.post('/signIn', (req,res,next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/user/signIn',
        failureFlash: true
    })(req,res,next);
});

// User Chiqish GET
router.get('/logOut', (req,res) => {
    req.logout();
});
module.exports = router;
