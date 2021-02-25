var mongoose = require('mongoose');
var passport = require('passport');
var settings = require('../config/settings');
require('../config/passport')(passport);
var express = require('express');
var router = express.Router();
var DB = require('../models');
var jwt = require('jsonwebtoken');

//router for signup
router.post('/register', function (req, res) {
    if (!req.body.user || !req.body.password) {
        res.json({ success: false, msg: 'Please pass username and password.' });
    } else {
        var newUser = new DB.User({
            firstName: req.body.firstName,
            username: req.body.user,
            email: req.body.email,
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
            email: req.body.email
        }, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
            } else {
                // check if password matches
                user.comparePassword(req.body.password, function (err, isMatch) {
                    if (isMatch && !err) {
                        var userInfo = {
                            name: `${user.firstName}`,
                            username: `${user.username}`,
                            email: `${user.email}`,
                            zipCode: `${user.zipCode}`
                        }
                        // if user is found and password is right create a token
                        var token = jwt.sign(userInfo, settings.secret,
                            { expiresIn: '3h' });
                        // return the information including token as JSON
                        res.cookie('bikeAble', token, { httpOnly: true });
                        res.json({ success: true, token: token, user: userInfo });
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
        if (req.xhr) { 
            res.json({ 
                name: req.user.firstName, 
                username: req.user.username,
                email: req.user.email,
                zipCode: req.user.zipCode
            }) 
        };
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
        const objId = mongoose.Types.ObjectId(req.user._id);
        DB.Route.find({ user: objId })
            .then(data => {
                res.json(data);
            })
    })

router.post('/user/route', passport.authenticate('jwt', { session: false }),

    function (req, res, next) {
        DB.Route.create({
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
        }).then(newRt => {
            DB.User.findByIdAndUpdate(
                req.user._id,
                {
                    $push: {
                        routes: {
                            _id: newRt._id
                        }
                    }
                },
                {new: true, useFindAndModify: false}
            )
        }).then(resp => {
            res.json({success: true})
        })
    });

//Router for User

router.post('/user/bike', passport.authenticate('jwt', { session: false }),
    function (req, res, next) {
        DB.Bike.create({
            modelName: req.body.modelName,
            frame: req.body.frame,
            type: req.body.type,
            gearset: req.body.gearset,
            owner: req.user._id
        }).then(newBike => {
            DB.User.findByIdAndUpdate(
                req.user._id
            ),
            {
                $push: {
                    bike: {
                        _id: newBike._id
                    }
                }
            },
            {new: true, useFindAndModify: false}
        }).then(resp => {
            res.json({success: true})
        })
    });

router.delete('/routes/:id', passport.authenticate('jwt', { session: false }),
    function (req, res, next) {
        const objId = mongoose.Types.ObjectId(req.params.id);
        console.log(req);
        DB.Route.deleteOne({ _id: objId })
            .then(dbRes => {
                DB.User.findByIdAndUpdate(
                    mongoose.Types.ObjectId(req.user._id)
                ),
                {
                    $pull: {
                        _id: objId
                    }
                },
                {new: true, useFindAndModify: false}
        }).then(resp => {
            res.json({success: true})
        })
    })

router.get('/messages', passport.authenticate('jwt', { session: false }),
    function (req, res, next) {
        const objId = mongoose.Types.ObjectId(req.user._id);
        DB.Message.find({to: objId})
            .then(data => {
                res.json(data)
            })
    })

router.get('/gear', passport.authenticate('jwt', { session: false }),
    function (req, res, next) {
        const objId = mongoose.Types.ObjectId(req.user._id);
        console.log(objId);
        DB.Bike.find({ owner: objId })
            .then(data => {
                res.json(data)
            })
    })

router.get('/logout',
    function (req, res, next) {
        res.cookie('bikeAble', 'none', {
            expires: new Date(Date.now() + 500),
            httpOnly: true
        })
        res.json({success: true})
    })

router.post('/routes/fav/:id', passport.authenticate('jwt', { session: false }),
    function (req, res, next) {
        const objId = mongoose.Types.ObjectId(req.params.id);
        DB.Route.updateOne({ _id: objId }, {favorited: true},
            function(err, resp) {
                if(err) throw err;
                res.json({success: true});
            })
    })
module.exports = router;