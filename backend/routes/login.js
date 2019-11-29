
const express = require('express')
const app = express()
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')

const path = require('path')

const users = [];  


function find(username) {
    return  users.find(user => user.username == username)

}
const initializePassport = require('./passport-config')
initializePassport(
    passport,
    find ,
    id => users.find(user => user.id === id)
)



app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())


app.route('/monitor').get( (req, res) => {
    res.send('monitorPage')
})


app.route('/login').post(checkNotAuthenticated ,passport.authenticate('local', {
        successRedirect: '/monitor',
        failureRedirect: '/' ,
        failureFlash: true
}));

app.route('/').get((req, res) => {
    res.send('loginPage');
})

app.route('/register').post(checkNotAuthenticated, (req, res) => {
    if (validateRegister(req.body.username)) {
        console.log("sucsses");
        users.push({
            id: Date.now().toString,
            username: req.body.username,
            password: req.body.password
        })
        res.status(200);
    } else {
        res.status(400);
        res.send('user is already exsits');       
    }
});


function validateRegister(username) {
    if (find(username)) {
        return false; 
    }
    return true; 
}

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}


app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = app;