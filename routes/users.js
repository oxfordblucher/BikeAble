const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const Bike = require('../models/Bike');


router.get('/', function (req, res, next) {
    User.find((err, users) => {
        if (err) return next(err);
        res.json(users);
    });

});

router.post('/bike', function (req, res, next) {
    var item = {
        bikeFrame: req.body.bikeFrame,
        bikeType: req.body.bikeType,
    };
});


    mongo.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection('Equipment').insertOne(item, function (err, result) {
            assert.equal(null, err);
            console.log('item has been inserted');
            db.close;
        });
    });

    res.redirect('/');


    

    module.exports = router;

  