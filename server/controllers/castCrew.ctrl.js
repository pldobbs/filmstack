var express = require("express");
var procedures = require("../procedures/castCrew.proc");
var router = express.Router();

router.route("/:id")
    .get(function (req, res) {
        return procedures.getCastCrew(req.params.id).then(function (success) {
            res.send(success);
            // console.log(success);
        }, function (err) {
            console.log(err);
            res.status(500).send(err);
        });
    });

module.exports = router;