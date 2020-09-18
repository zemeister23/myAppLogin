const mongoose = require('mongoose');

// Karta Kiritish Schemasi
let usersSchema = mongoose.Schema({
    ism:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        required: true, // TASHLAB KETISH MUMKIN EMAS
        type: String, // TURI
        unique: true // BIR XIL BOLISHI MUMKIN EMAS
    },
    password: {
        required: true,
        type: String
    },
});
let User = module.exports = mongoose.model('User', usersSchema)