const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../../models/User');
const Bike = require('../../models/Bike');


router.get('/', function (req, res, next) {
    User.find((err, equipment) => {
        if (err) return next(err);
        res.json(users);
    });

});

router.post('/', function (req, res) {
    User.find(req.body, (err, data) => {
        if (err) return next(err);
        res.json(data);
    })

});


router.post('/bike', function (req, res) {
    console.log('bike: ', req.body);
    const data = req.body;
    Bike.create(req.body).then(newBike => res.json(newBike))

});

module.exports = router;
