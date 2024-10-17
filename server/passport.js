import { User } from "./api/users";
import config from "./config";

const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const mongoose = require("mongoose");
// dotenv.config();

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.ACCESS_TOKEN_SECRET;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, jwt_payload => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
