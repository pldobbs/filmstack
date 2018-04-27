var express = require("express");
var procedures = require('../procedures/search.proc');
var router = express.Router();

router.route("/:query")
    .post(function (req, res) {
        console.log(req.body.query);
        return procedures.search(req.body.query).then(function (success) {
            // console.log(req.body);
            res.send(success);
            console.log(success);
        }, function (err) {
            // console.log(err);
            res.status(500).send(err);
        });
    });

module.exports = router;