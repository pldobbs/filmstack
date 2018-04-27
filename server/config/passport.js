var express = require('express');
var passport = require('passport');
var session = require('express-session');
var mySQLStore = require('express-mysql-session')(session);
var localStrategy = require('passport-local').Strategy;
var userProc = require('../procedures/users.proc');
var pool = require('./db').pool;
var utils = require('./utils');

function configurePassport(app) {
    passport.use (new localStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, function(username, password, done){
        userProc.readByUserName(username).then(function(user){
            if(!user){
                return done(null,false);
            }
            utils.checkPassword(password, user.password)
            .then(function(matches){
                if(matches){
                    return done(null, user);
                } else{
                    return done(null, false, {message: 'Wrong password, please try again'});
                }
            }, function(err){
            return done(err);
        });
    },function(err){
            return done(err);
        });
    }));
    

    passport.serializeUser(function(user,done){
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done){
        userProc.read(id).then(function(user){
            done(null,user);
        },function(err){
            done(err);
        });
    });
/*passport.deserializeUser(function(id, done){
            done(null,false)
        })*/

    var sessionStore = new mySQLStore({
        createDatabaseTable: true
    }, pool);

    app.use(session({
        secret: 'sdfljs',
        store: sessionStore,
        resave: false,
        saveUninitialized: false
    }));

    app.use(passport.initialize());
    app.use(passport.session());
}

module.exports = configurePassport;