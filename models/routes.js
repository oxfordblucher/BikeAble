var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var routeSchema = new Schema({
    start: {
        lat: { type: Object },
        lon: { type: Object },
        name: { type: String }
    },
    finish: {
        lat: { type: Object },
        lon: { type: Object },
        name: { type: String }
    },

    waypoint: {
        type: Array,
        required: true
    },

});

module.exports = mongoose.model('Route', routeSchema);