const passport = require('passport');
const User = require('../users/users.model');
const { Strategy, ExtractJwt } = require('passport-jwt');

passport.use(new Strategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        },
        function(token, done) {
            User.findOne({_id: token.sub}, function(err, user){
                if (err)    return done(err, false);
                if (user)   return done(null, user);
                return done(null, false);
            });
        }
    )
);