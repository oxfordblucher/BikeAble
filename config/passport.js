var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

// load up the user model
var User = require('../models/User');
var settings = require('../config/settings'); // get settings file

module.exports = function (passport) {
    const cookierExtractor = (req) => {
        let token = null;
        if (req && req.cookies) {
            token = req.cookies['bikeAble'];
        }
        return token;
    }
    var opts = {};
    opts.jwtFromRequest = cookierExtractor;
    opts.secretOrKey = settings.secret;
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        User.findOne({ id: jwt_payload.id }, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));
};