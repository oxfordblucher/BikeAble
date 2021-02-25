var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    bike: [{
        type: Schema.Types.ObjectId,
        ref: "Bike"
    }],
    routes: [{
        type: Schema.Types.ObjectId,
        ref: "Route"
    }],
    outgoing: [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }],
    incoming: [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }]},
    {timestamps: true}
);

UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

UserSchema.methods.getAllRoutes = function (req, res) {
    return Routes.find({ user: req.user.id });
}

module.exports = mongoose.model('User', UserSchema);