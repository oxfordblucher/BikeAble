var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var BikeSchema = new Schema({
    modelName: {
        type: String
    },
    frame: {
        type: String
    },
    type: {
        type: String
    },
    gearset: {
        type: String
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    image: {
        type: String
    }
});

module.exports = mongoose.model('Bike', BikeSchema);










