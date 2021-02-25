var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var routeSchema = new Schema({
    start: {
        lat: { type: Number },
        lon: { type: Number },
        name: { type: String }
    },
    end: {
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

    directions: {
        type: Array
    },

    favorited: {
        type: Boolean,
        default: false
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }},
    {timestamps: true}
);

module.exports = mongoose.model('Route', routeSchema);