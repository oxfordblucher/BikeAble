var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var BikeSchema = new Schema({
    bikeFrame: {
        type: String
    },
    bikeType: {
        type: String,
        enum: ['hybrid', 'mountain', 'cyclocross', 'gravel', 'road']
    },
    tireWidth: {
        type: String
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model('Bike', BikeSchema);










