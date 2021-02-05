const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');

router.get('/', function (req, res, next) {
    User.find((err, users) => {
        if (err) return next(err);
        res.json(users);
    });
});
