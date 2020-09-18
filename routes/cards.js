const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Karta Schemasi Init
const Karta = require('../models/Card.js');

// Kartalarni Korish && Bosh Sahifa
router.get('/', (req,res) => {
    Karta.find({}, (e,cards) => {
        if (e)
            console.log(e)

        res.render('card_all',{
            title: 'Kartalar',
            cards,
            assosiyTitle: "Kartalar Sahifasi "
        });
    });
});

// Kartalarni Qoshish GET
router.get('/karta/qosh', (req,res) => {
    res.render('card_add', {
       title: "Karta Qo'shish Sahifasi",
        assosiyTitle: "Karta Qo'shish "
    });
});

// Karta Qoshish POST
router.post('/karta/qosh', (req,res) => {

    req.checkBody('raqami','Raqami Kiritishingiz Shart').notEmpty();
    req.checkBody('turi','Turi Kiritishingiz Shart').notEmpty();
    req.checkBody('egasi','Egasi Kiritishingiz Shart').notEmpty();
    req.checkBody('sarlavha','Izoh Kiritishingiz Shart').notEmpty();

    // ERROR CATCH

    const errors = req.validationErrors();

    if (errors){
        res.render('card_add', {
            title: 'Karta Qo\'shish Sahifasi',
            search: true,
            errors
        });
    }else{
        const karta = new Karta();

        karta.raqami = req.body.raqami;
        karta.turi = req.body.turi;
        karta.egasi = req.body.egasi;
        karta.sarlavha = req.body.sarlavha;

        karta.save((err) => {
            if (err){
                console.log(err);
            } else{
                req.flash('success',"Karta Qo'shildi");
                res.redirect('/');
            }

        })
    }
});

// Karta Profile GET
router.get('/karta/:id', (req,res) => {

    Karta.findById(req.params.id, (err, card) => {
       res.render('card_profile', {
           card,
           search: true,
           assosiyTitle: "Kartani O'zgartirish",
           rang: 'bg-danger'
       });
    });

});


// Karta Profile Edit GET
router.get('/karta/ozgartir/:id', (req,res) => {

    Karta.findById(req.params.id, (err, card) => {
        res.render('card_edit_profile', {
            title: 'Karta O\'zgartirish',
            card,
            search: true,
            assosiyTitle: "Kartani O'zgartirish"
        });
    });

});

// Karta Profile Edit POST
router.post('/karta/ozgartir/:id', (req,res) => {
    const card = {};

    card.raqami = req.body.raqami;
    card.turi = req.body.turi;
    card.egasi = req.body.egasi;
    card.sarlavha = req.body.sarlavha;

    const link = { _id: req.params.id };

    Karta.updateOne(link, card, (err) => {
        if (err)
            console.log(err);
        else{
            req.flash('success',"Karta O'zgartirildi");
            res.redirect('/');
        }

    });
});
// Karta Ochirish DELETE
router.delete('/karta/:id', (req,res) => {
    const link = req.body.raqami;
    //console.log(req.body)
    Karta.deleteOne(link, (err) => {
       if (err)
           console.log(err)

       req.flash('success',"Karta O'chirildi");
       res.send('Success');
    });

});
module.exports = router;
