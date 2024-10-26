import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import User from "./api/users/user.js";
import config from "./config.js";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.ACCESS_TOKEN_SECRET,
};

export default function configurePassport(passport) {
  // Check if ACCESS_TOKEN_SECRET is defined
  if (!config.ACCESS_TOKEN_SECRET) {
    console.error("ACCESS_TOKEN_SECRET is not defined in the config file");
    return;
  }

  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => {
          console.error("Error in JwtStrategy:", err);
          return done(err, false);
        });
    })
  );
}
