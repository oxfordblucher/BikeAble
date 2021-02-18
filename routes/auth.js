var mongoose = require('mongoose');
var passport = require('passport');
var settings = require('../config/settings');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require("../models/User");


//router for signup
router.post('/register', function (req, res) {
    if (!req.body.username || !req.body.password) {
        res.json({ success: false, msg: 'Please pass username and password.' });
    } else {
        var newUser = new User({
            firstName: req.body.firstName,
            username: req.body.username,
            password: req.body.password,
            zipCode: req.body.zipCode
        });
        // save the user
        newUser.save(function (err) {
            if (err) {
                console.log(err)
                return res.json({ success: false, msg: 'Username already exists.' });
            }
            res.json({ success: true, msg: 'Successful created new user.' });
        });
    }
});

// router for login
router.post('/login',
    function (req, res) {
        console.log(req.body)
        User.findOne({
            username: req.body.username
        }, function (err, user) {
            if (err) throw err;
            console.log(user)
            if (!user) {
                res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
            } else {
                // check if password matches
                user.comparePassword(req.body.password, function (err, isMatch) {
                    if (isMatch && !err) {
                        // if user is found and password is right create a token
                        var token = jwt.sign(user.toJSON(), settings.secret);
                        // return the information including token as JSON
                        res.json({ success: true, token: 'JWT ' + token });
                    } else {
                        res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
                    }
                });
            }
        });
    });




//Router for User
router.post('/bike', (req, res) => {
    Bike.create({
        bikeFrame: req.body.bikeFrame,
        bikeType: req.body.bikeType,
    }).then((dbPost) => res.json(dbPost));
});

// Router for the bikeroutes
router.post('/routes', (req, res) => {
    route.create({
        // start lat and lon
        // finish lat and lon
        // optional waypoint
    }).then((dbPost) => res.json(dbPost));
});







module.exports = router;