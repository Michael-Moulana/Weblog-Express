const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const bodyParser = require('body-parser')
const flash = require('connect-flash');
const session = require('express-session')


// app is an argument for the arrow function
// will return a method/function
module.exports = app => {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))
    const session = require('express-session')
    app.use(session({
        secret: 'your_secret_key',
        resave: false,
        saveUninitialized: true
    }))
    app.use(flash())
    app.engine('handlebars', hbs.engine())
    app.set('view engine', 'handlebars')
    app.set('views', path.join(__dirname, '../views'))
    app.use('/static', express.static(path.join(__dirname, '../../public')))

}