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
        }).then((resp) => {
            res.json(resp)
        }).catch(err => {
            console.log(err);
        })
    })

router.post('/profiles', passport.authenticate('jwt', {session:false}), 
    function (req, res, next) {
        console.log(req.body.userId);
        DB.User.findById(mongoose.Types.ObjectId(req.body.userId))
            .then(resp => {
                res.json(resp);
            })
});

module.exports = router;
