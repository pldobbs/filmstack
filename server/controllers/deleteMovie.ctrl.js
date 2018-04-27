var express = require("express");
var procedures = require('../procedures/deleteMovie.proc');
var router = express.Router();

router.route('/')
    .post(function(req, res) {
        return procedures.removeMovie(req.body.movieID, req.body.listID)
        .then(function(success) {
            res.send(success);
        }, function(err) {
            res.status(500).send(err);
        });
    });

module.exports = router;