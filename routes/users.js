const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const Bike = require('../models/Bike');


router.get('/', function (req, res, next) {
    User.find((err, equipment) => {
        if (err) return next(err);
        res.json(users);
    });

});



router.post('/bike', function (req, res) {
    console.log(  'bike: ', req.body);
    const data = req.body;
Bike.create (req.body).then (newBike => res.json(newBike))
    
});


      





    

    module.exports = router;

