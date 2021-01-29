"use strict";
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var mongoose = require('mongoose');
var User = require('./models/user');
// const User = mongoose.model('users');
var config = require('./config');
// dotenv.config();
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.JWT_SECRET;
module.exports = function (passport) {
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        User.findById(jwt_payload.id)
            .then(function (user) {
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        })
            .catch(function (err) { return console.log(err); });
    }));
};
