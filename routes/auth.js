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
                        var userInfo = {
                            name: `${user.firstName}`,
                            username: `${user.username}`,
                            zipCode: `${user.zipCode}`
                        }
                        // if user is found and password is right create a token
                        var token = jwt.sign(userInfo, settings.secret,
                        { expiresIn: '3h' });
                        // return the information including token as JSON
                        res.cookie('bikeAble', token, {httpOnly: true});
                        res.json({ success: true, token: token });
                    } else {
                        res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
                    }
                });
            }
        });
    });

router.get('/user', passport.authenticate('jwt', {failWithError: true, session: false}),
    function(req, res, next) {
        if (req.xhr) {res.json({name: req.user.firstName, zipCode: req.user.zipCode})};
    },
    function(err, req, res, next) {
        if (req.xhr) {return res.json(err);}
        return res.redirect('/');
    }
);

router.get('/user/zipcode', passport.authenticate('jwt', { session: false }),
    function(req, res, next) {
        res.send(req.user.zipCode);
    })

router.get('/user/routes', passport.authenticate('jwt', { session: false }),
    function(req, res, next) {
        res.send(req.user.routes);
    })

router.post('/user/routes', passport.authenticate('jwt', { session: false }),
    function(req, res, next) {
        User.findOne({
            username: req.user.username
        }, function (err, user) {
            
        })
    })

//Router for User
router.post('/bike', (req, res) => {
    Bike.create({
      bikeFrame: req.body.bikeFrame,
      bikeType: req.body.bikeType,
    }).then((dbPost) => res.json(dbPost));
  });








module.exports = router;