var express = require("express");
var procedures = require("../procedures/dashboard.proc");
var router = express.Router();

router.route('/:id')
    .get(function (req, res) {
        var response = {};
        return procedures.showMainList(req.params.id, "Main List").then(function (success) {
            response.mainList = success;
        }).then(procedures.showAllLists.bind(null, req.params.id)).then(function (success) {
            response.otherLists = success;
            res.send(response);
        }).catch(function (err) {
            console.log(err);
            res.status(500).send(err);
        });
    })

    .post(function(req, res) {
        return procedures.getSingleList(req.body.id, req.body.listid).then(function(success) {
            res.send({
                lists: success
            });
        }, function(err) {
            console.log(err);
            res.status(500).send(err);
        });
    });

router.route('/')
    .post(function (req, res) {
        return procedures.createList(req.body.name, req.body.userid).then(function (success) {
            res.send(success);
        }, function (err) {
            console.log(err);
            res.status(500).send(err);
        });
    });

module.exports = router;