const express = require('express');
const router = express.Router();

// CHARTS
router.get('/', (req,res) => {
    res.render('charts', {
        title: "Charts Sahifasi",
    });
});

module.exports = router;
