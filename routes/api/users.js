const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const DB = require('../../models');
var passport = require('passport');
require('../../config/passport')(passport);


router.post('/users', passport.authenticate('jwt', {session: false}),
    function(req, res, next) {
        DB.User.find({
            zipCode: req.body.zipCode
        }).then(resp => {
            res.json(resp.data)
        })
    })

router.post('/bike', function (req, res) {
    console.log('bike: ', req.body);
    const data = req.body;
    Bike.create(req.body).then(newBike => res.json(newBike))
});

module.exports = router;
