var express = require("express");
var passport = require('passport');
var procedures = require('../procedures/users.proc');
var authMw = require('../middleware/auth.mw');
var utils = require('../config/utils');

var router = express.Router();

router.post('/login', function(req, res, next){
    passport.authenticate('local', function(err, user, info){
        console.log(req.body.username + " ? " + req.body.password);
        if(err){
            console.log(err);
            return res.sendStatus(500);
        }
        if(!user){
            return res.status(401).send(info);
        }
        req.logIn(user,function(err){
            if(err){
                return res.status(500).send(err);
            } else{
                return res.send(user);
            }
        });
    }) (req,res,next);
});

// router.all('*', authMw.isLoggedIn);

router.get('/logout', function(req, res){
    req.session.destroy(function(){
        req.logOut();
        res.sendStatus(204);
    });
});

router.get('/me', authMw.isLoggedIn, function(req,res){
    res.send(req.user);
});

router.route('/:id')
    .get(function(req, res) {
        procedures.read(req.body.id).then(function(data) {
        // procedures.read().then(function(data) {
            res.send(data);
            // console.log(data);
        }, function(err) {
            console.log(err);
            res.sendStatus(500);
        });
    })
    .put(function(req,res){
        procedures.updateEmail(req.params.id, req.body.email).then(function(){
            if(req.body.password) {
                utils.encryptPassword(req.body.password)
                .then(function(hash) {
                    procedures.updatePassword(req.params.id, hash).then(function(){
                        res.sendStatus(204);
                    });
                });
            } else {
                res.sendStatus(204);
            }
        });
    })
    .delete(function(req,res){
        procedures.deleteUser(req.params.id).then(function(){
            res.sendStatus(204);
        }, function(err){
            console.log(err);
            res.status(500).send(err);
        });
    });

router.route("/")
    .get(function(req, res) {
        return procedures.all().then(function(success){
            res.send(success);
        }, function(err) {
            console.log(err);
            res.status(500).send(err);
        });
    })
    .post(function(req, res){
        utils.encryptPassword(req.body.password).then(function(hash) {
            procedures.write(req.body.username, req.body.email, hash)
            .then(function(id){
                res.send(id);
            }, function(err){
                console.log(err);
                res.status(500).send(err);
            });
        });
    });



/*
Useful little tip to maintain a user's session when they're already logged in
*/

module.exports = router;