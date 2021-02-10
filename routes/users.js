const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const Bike = require('../src/Components/models/Bike');


router.get('/', function (req, res, next) {
    User.find((err, equipment) => {
        if (err) return next(err);
        res.json(users);
    });

});

app.use(espress.json());
app.use(express.urlencoded({ extended: false}));

router.post('/bike', ()=> {
    console.log(  'bike: ', req.body);
    const data = req.body;

    const equipment = new equipment(data);

    
    //.save
    equipment.save((error) => {
        if (error) {
            res.status()
        } else {
            //equipment
            res.json({
                msg: 'Your equipment has been saved'
            });
        }
        
    });
});
    





    

    module.exports = router;

  