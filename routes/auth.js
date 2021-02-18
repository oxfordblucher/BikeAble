var mongoose = require('mongoose');
var passport = require('passport');
var settings = require('../config/settings');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var DB = require('../models');


//router for signup
router.post('/register', function (req, res) {
    if (!req.body.username || !req.body.password) {
        res.json({ success: false, msg: 'Please pass username and password.' });
    } else {
        var newUser = new DB.User({
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
        DB.User.findOne({
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
                        res.cookie('bikeAble', token, { httpOnly: true });
                        res.json({ success: true, token: token });
                    } else {
                        console.log('Authentication failed backend');
                        res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
                    }
                });
            }
        });
    });

router.get('/user', passport.authenticate('jwt', { failWithError: true, session: false }),
    function (req, res, next) {
        if (req.xhr) { res.json({ name: req.user.firstName, zipCode: req.user.zipCode }) };
    },
    function (err, req, res, next) {
        if (req.xhr) { return res.json(err); }
        return res.redirect('/');
    }
);

router.get('/user/zipcode', passport.authenticate('jwt', { session: false }),
    function (req, res, next) {
        res.send(req.user.zipCode);
    })

router.get('/user/routes', passport.authenticate('jwt', { session: false }),
    function (req, res, next) {
        console.log(req.user);
        DB.Route.find({ user: req.user._id })
            .then(data => {
                console.log(data);
                res.send(data);
            })
    })

router.post('/user/route', passport.authenticate('jwt', { session: false }),
    function (req, res, next) {
        const newRoute = new DB.Route({
            start: {
                lat: req.body.start.lat,
                lon: req.body.start.lon,
                name: req.body.start.name
            },
            end: {
                lat: req.body.end.lat,
                lon: req.body.end.lon,
                name: req.body.end.name
            },
            waypoint: req.body.waypoint,
            user: req.user._id,
            directions: req.body.directions,
            summary: {
                distance: req.body.summary.distance,
                duration: req.body.summary.duration
            }
        });
        newRoute.save(function (err) {
            if (err) {
                console.log(err)
                return res.json({ success: false })
            }
            res.json({ sucess: true })
        })
    });

//Router for User
router.post('/user/bike', passport.authenticate('jwt', { session: false }),
    function (req, res, next) {
        DB.Bike.create({
            bikeFrame: req.body.bikeFrame,
            bikeType: req.body.bikeType,
            tireWidth: req.body.tireWidth,
            owner: req.user.id
        }).then((dbPost) => res.json(dbPost));
    });

router.delete('/routes/:id', passport.authenticate('jwt', { session: false }),
    function (req, res, next) {
        const objId = mongoose.Types.ObjectId(req.params.id);
        console.log(req);
        DB.Route.deleteOne({ _id: objId })
            .then(dbRes => res.json(dbRes))
            .catch(err => res.status(422).json(err));
    })



module.exports = router;