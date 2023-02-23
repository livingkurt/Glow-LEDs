import { User } from "./api/users";

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const config = require("./config");
// dotenv.config();

const opts: any = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.ACCESS_TOKEN_SECRET;

module.exports = (passport: { use: (arg0: any) => void }) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload: { id: any }, done: (arg0: null, arg1: boolean) => any) => {
      User.findById(jwt_payload.id)
        .then((user: any) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err: any) => console.log(err));
    })
  );
};

// module.exports = (passport: { use: (arg0: any) => void }) => {
//   passport.use(
//     new passport.use(
//       new FacebookStrategy(
//         {
//           clientID: "YOUR_FACEBOOK_CLIENT_ID",
//           clientSecret: "YOUR_FACEBOOK_CLIENT_SECRET",
//           callbackURL: "http://www.example.com/auth/facebook/callback"
//         },
//         (accessToken, refreshToken, profile, cb) => {
//           // find or create the user based on their Facebook profile
//           User.findOrCreate({ facebookId: profile.id }, (err, user) => {
//             return cb(err, user);
//           });
//         }
//       )
//     )
//   );
// };

// module.exports = (passport: { use: (arg0: any) => void }) => {
//   passport.use(
//     new passport.use(
//       new GoogleStrategy(
//         {
//           clientID: "YOUR_GOOGLE_CLIENT_ID",
//           clientSecret: "YOUR_GOOGLE_CLIENT_SECRET",
//           callbackURL: "http://www.example.com/auth/google/callback"
//         },
//         (accessToken, refreshToken, profile, cb) => {
//           // find or create the user based on their Google profile
//           User.findOrCreate({ googleId: profile.id }, (err, user) => {
//             return cb(err, user);
//           });
//         }
//       )
//     )
//   );
// };

// // configure passport to use the Facebook and Google strategies
// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: "YOUR_FACEBOOK_CLIENT_ID",
//       clientSecret: "YOUR_FACEBOOK_CLIENT_SECRET",
//       callbackURL: "http://www.example.com/auth/facebook/callback"
//     },
//     (accessToken, refreshToken, profile, cb) => {
//       // find or create the user based on their Facebook profile
//       User.findOrCreate({ facebookId: profile.id }, (err, user) => {
//         return cb(err, user);
//       });
//     }
//   )
// );

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: "YOUR_GOOGLE_CLIENT_ID",
//       clientSecret: "YOUR_GOOGLE_CLIENT_SECRET",
//       callbackURL: "http://www.example.com/auth/google/callback"
//     },
//     (accessToken, refreshToken, profile, cb) => {
//       // find or create the user based on their Google profile
//       User.findOrCreate({ googleId: profile.id }, (err, user) => {
//         return cb(err, user);
//       });
//     }
//   )
// );
