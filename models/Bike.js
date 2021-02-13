var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');


var BikeSchema = new Schema({
    bikeFrame: {
        type: String,
        required: true
    },
    bikeType: {
        type: String,
        required: true
    },
    tireWidth: {
        type: String,
        required: true
    }
});



  module.exports = mongoose.model('Bike', BikeSchema);










