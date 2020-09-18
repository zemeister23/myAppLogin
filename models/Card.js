const mongoose = require('mongoose');

// Karta Kiritish Schemasi
let cardsSchema = mongoose.Schema({
    raqami:{
      type: Number,
      required: true
    },
    turi: {
        type: String
    },
    egasi: {
        required: true,
        type: String
    },
    sarlavha: {
        type: String
    }
});
let Card = module.exports = mongoose.model('Card', cardsSchema)