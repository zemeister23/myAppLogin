const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const favicon = require('serve-favicon');

// Routes IMPORT
const cardsRouter = require('./routes/cards.js');
const usersRouter = require('./routes/users.js');

//SECRET JS INIT
const db_db = require('./cf/secret').db;

// Mongoose Connect
mongoose.connect(db_db,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
mongoose.set('useCreateIndex', true);


let db = mongoose.connection; // boglanish

// Mongo DB boglanganda
db.once('open',() => {
    console.log("MONGODB Ulandi");
});

// Mongo DB Error Boglanmaganda
db.on('error',(e) => {
    console.log("MONGODB Ulanmadi",e)
});
// EXPRESS CONSTURCTOR INIT
const app = express();

// EXPRESS FAVIOCON
app.use(favicon(path.join(__dirname, 'public', 'images/favicon.ico')))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json());

// EXPRESS STATIC FOLDER
app.use(express.static('public'));

// EXPRESS SESSION
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    //cookie: { secure: false }
}))

// EXPRESS MESSAGES
app.use(require('connect-flash')());
app.use( (req, res, next) => {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

// EXPRESS VALIDATOR
app.use(expressValidator({
    errorFormatter: (param, msg, value) => {
        let namespace = param.split('.')
            , root = namespace.shift()
            , formParam = root

        while(namespace.length){
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        }
    }
}))

// PASSPORT INIT
require('./cf/passport')(passport);

// PASSPORT USE
app.use(passport.initialize());
app.use(passport.session());

// Pug Init
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug');

app.get('*', (req,res,next) => { // * => ALL => HAMMASI
   res.locals.user = req.user || null;
   next();
});

// Card Route
app.use('/', cardsRouter);
// User Route
app.use('/user', usersRouter);

// App tinglanishi
app.listen(3000, () => {
    console.log("3000 Porti Ishga Tushdi")
});
