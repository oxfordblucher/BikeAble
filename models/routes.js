var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var routeSchema = new Schema({
    start: {
        lat: { type: Number },
        lon: { type: Number },
        name: { type: String }
    },
    finish: {
        lat: { type: Number },
        lon: { type: Number },
        name: { type: String }
    },

    waypoint: {
        lat: { type: Number },
        lon: { type: Number }
    },

    summary: {
        distance: { type: Number },
        duration: { type: String }
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }

});

module.exports = mongoose.model('Route', routeSchema);