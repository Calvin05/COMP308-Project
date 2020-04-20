const config = require('./config');
const express = require('express');
const morgan = require('morgan'), 
compress = require('compression'),
bodyParser = require('body-parser'),
session = require('express-session')
methodOverride = require('method-override');

//Define the Express configuration method
module.exports = function() {
    var app = express();
    if(process.env.NODE_ENV = 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV ==='production') {
        app.use(compress());
    }
    app.use(bodyParser.urlencoded({
        extended:true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));
    app.set('views', './app/views');
    app.set('view engine', 'ejs')
    require('../app/routers/index.server.routes')(app);
    require('../app/routers/user.server.routes')(app);
    require('../app/routers/sign.server.routes')(app);
    app.use(express.static('./public'));
    return app;
};