var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var msgSchema = new Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    to: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    subject: {
        type: String,
        required: true
    },

    message: {
        type: String,
        required: true
    }},
    {timestamps: true}
);

module.exports = mongoose.model('Message', msgSchema);