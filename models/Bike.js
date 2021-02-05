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
    }
});


BikeSchema.post('save', function(doc, next) {
    setTimeout(function() {
      console.log('post1');
      // Kick off the second post hook
      next();
    }, 10);
  });
  
  // Will not execute until the first middleware calls `next()`
  BikeSchema.post('save', function(doc, next) {
    console.log('post2');
    next();
  });

  module.exports = mongoose.model('Equipment', BikeSchema);










